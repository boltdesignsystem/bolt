const postcss = require('postcss');
const fs = require('fs-extra');
const hexToRgba = require('hex-to-rgba');
const rgb2hex = require('rgb2hex');
const { minifyCSS } = require('./helpers/css.util');
const THEMIFY = 'themify';

let output;

const defaultOptions = {
  classPrefix: '',
  screwIE11: true,
  fallback: {
    cssPath: null,
  },
};

/** supported color variations */
const ColorVariation = {
  XLIGHT: 'xlight',
  LIGHT: 'light',
  DARK: 'dark',
  XDARK: 'xdark',
};

function getColorPalette(options) {
  // make sure we have a palette
  let data;

  // @todo: revisit caching the JSON data if it hasn't changed; disable caching when doing local development (ie. non-prod mode) so the generated CSS works as expected.
  data = fs.readFileSync(options.fallback.jsonPath, 'utf8');

  if (!data) {
    throw new Error(
      "The `@bolt/themify` PostCSS plugin for `@bolt/build-tools` can't find the auto-generated JSON file that contains the data for Bolt's global color palette. This is necessary in order to generate the CSS Custom Properties fallback for older browsers! \n; Is `@bolt/global` the first item in your `.boltrc` file's global components array?",
    );
  } else {
    return JSON.parse(data);
  }
}

function buildOptions(options) {
  if (!options) {
    throw new Error(`options is required.`);
  }
  return { ...defaultOptions, ...options };
}

/**
 *
 * @param {string} filePath
 * @param {string} output
 * @returns {Promise<any>}
 */
function writeToFile(filePath, output) {
  return fs.outputFileSync(filePath, output);
}


/** Define the default variation */
const defaultVariation = ColorVariation.LIGHT;

/** An array of variation values  */
const variationValues = Object.values(ColorVariation);

/** An array of all non-default variations */
const nonDefaultVariations = variationValues;

function themify(options) {
  /** Regex to get the value inside the themify parenthesis */
  const themifyRegExp = /themify\(([^)]+)\)/gi;

  /**
   * Define the method of color execution
   */
  const ExecutionMode = {
    CSS_COLOR: 'CSS_COLOR',
    CSS_VAR: 'CSS_VAR',
  };

  options = buildOptions(options);

  return root => {
    // process fallback CSS, without mutating the rules
    if (options.screwIE11 === false) {
      processFallbackRules(root);
    }

    /** mutate the existing rules **/
    processRules(root);
  };

  /**
   * @example themify({"light": ["primary-0", 0.5], "dark": "primary-700"})
   * @example themify({"light": "primary-0", "dark": "primary-700"})
   * @example linear-gradient(themify({"color": "primary-200", "opacity": "1"}), themify({"color": "primary-300", "opacity": "1"}))
   * @example themify({"light": ["primary-100", "1"], "dark": ["primary-100", "1"]})
   * @example 1px solid themify({"light": ["primary-200", "1"], "dark": ["primary-200", "1"]})
   */
  function getThemifyValue(propertyValue, execMode) {
    /** Remove the start and end ticks **/
    propertyValue = propertyValue.replace(/'/g, '');
    const colorVariations = {};

    function normalize(value, variationName) {
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch (ex) {
        throw new Error(`fail to parse the following expression: ${value}.`);
      }

      const currentValue = parsedValue[variationName];

      /** For example: background-color: themify((light: primary-100)); */
      if (!currentValue) {
        throw new Error(`${value} has one variation.`);
      }

      // convert to array
      if (!Array.isArray(currentValue)) {
        // color, alpha
        parsedValue[variationName] = [currentValue, 1];
      } else if (!currentValue.length || !currentValue[0]) {
        throw new Error('Oops. Received an empty color!');
      }

      if (!options.palette) {
        options.palette = getColorPalette(options);
      }
      return parsedValue[variationName];
    }

    // iterate through all variations
    variationValues.forEach(variationName => {
      // replace all 'themify' tokens with the right string
      colorVariations[variationName] = propertyValue.replace(
        themifyRegExp,
        (occurrence, value) => {
          // parse and normalize the color
          const parsedColor = normalize(value, variationName);
          // convert it to the right format
          return translateColor(parsedColor, variationName, execMode);
        },
      );
    });

    return colorVariations;
  }

  /**
   * Get the underline color, according to the execution mode
   * @param colorArr two sized array with the color and the alpha
   * @param variationName the name of the variation. e.g. light / dark
   * @param execMode
   */
  function translateColor(colorArr, variationName, execMode) {
    const [colorVar, alpha] = colorArr;

    // returns the real color representation
    if (!options.palette) {
      options.palette = getColorPalette(options);
    }

    const underlineColor = options.palette[variationName][colorVar];

    if (!underlineColor) {
      // variable is not mandatory in non-default variations
      if (variationName !== defaultVariation) {
        return null;
      }
      throw new Error(
        `The variable name '${colorVar}' doesn't exists in your palette.`,
      );
    }

    switch (execMode) {
      case ExecutionMode.CSS_COLOR:
        // with default alpha - just returns the color
        if (alpha === 1) {
          return rgb2hex(underlineColor).hex;
        } else {
          return hexToRgba(rgb2hex(underlineColor).hex, alpha);
        }
      default:
        return `var(--bolt-theme-${colorVar})`;
    }
  }

  /**
   * Walk through all rules, and replace each themify occurrence with the corresponding CSS variable.
   * @example background-color: themify(primary-300, 0.5) => background-color: rgba(var(--primary-300),0.6)
   * @param root
   */
  function processRules(root) {
    root.walkRules(rule => {
      if (!hasThemify(rule.toString())) {
        return;
      }

      let aggragatedSelectorsMap = {};
      let aggragatedSelectors = [];

      let createdRules = [];
      const variationRules = {
        [defaultVariation]: rule,
      };

      rule.walkDecls(decl => {
        const propertyValue = decl.value;
        if (!hasThemify(propertyValue)) return;

        const property = decl.prop;

        const variationValueMap = getThemifyValue(
          propertyValue,
          ExecutionMode.CSS_VAR,
        );
        const defaultVariationValue = variationValueMap[defaultVariation];
        decl.value = defaultVariationValue;

        // indicate if we have a global rule, that cannot be nested
        const createNonDefaultVariationRules = isAtRule(rule);

        // don't create extra CSS for global rules
        if (createNonDefaultVariationRules) {
          return;
        }

        // create a new declaration and append it to each rule
        nonDefaultVariations.forEach(variationName => {
          const currentValue = variationValueMap[variationName];

          // variable for non-default variation is optional
          if (!currentValue || currentValue === 'null') {
            return;
          }

          // when the declaration is the same as the default variation,
          // we just need to concatenate our selector to the default rule
          if (currentValue === defaultVariationValue) {
            const selector = getSelectorName(rule, variationName);

            // append the selector once
            if (!aggragatedSelectorsMap[variationName]) {
              aggragatedSelectorsMap[variationName] = true;
              aggragatedSelectors.push(selector);
            }
          } else {
            // creating the rule for the first time
            if (!variationRules[variationName]) {
              const clonedRule = createRuleWithVariation(rule, variationName);
              variationRules[variationName] = clonedRule;
              // append the new rule to the array, so we can append it later
              createdRules.push(clonedRule);
            }

            const variationDecl = createDecl(
              property,
              variationValueMap[variationName],
            );
            variationRules[variationName].append(variationDecl);
          }
        });
      });

      if (aggragatedSelectors.length) {
        rule.selectors = [...rule.selectors];

        // Don't add extra redundant CSS selectors to every component using CSS vars
        // rule.selectors = [...rule.selectors, ...aggragatedSelectors];
      }

      // append each created rule
      if (createdRules.length) {
        createdRules.forEach(r => root.append(r));
      }
    });
  }

  /**
   * indicate if we have a global rule, that cannot be nested
   * @param rule
   * @return {boolean}
   */
  function isAtRule(rule) {
    return rule.parent && rule.parent.type === 'atrule';
  }

  /**
   * Walk through all rules, and generate a CSS fallback for legacy browsers.
   * One file is created for full compatibility:
   *  1. A CSS file, contains all the rules with the original color representation.
   * @param root
   */
  function processFallbackRules(root) {
    // an output for each execution mode

    // Reuse existing output in memory -- fixes issues with build "forgetting" about CSS vars previously working in IE 11 when compiling more than one thing at a time.
    if (!output) {
      output = {
        [ExecutionMode.CSS_COLOR]: [],
      };
    }

    // define which modes need to be processed
    const execModes = [
      ExecutionMode.CSS_COLOR,
    ];

    walkFallbackAtRules(root, execModes, output);
    walkFallbackRules(root, execModes, output);

    writeFallbackCSS(output);
  }

  function writeFallbackCSS(output) {
    // write the CSS & JSON to external files
    if (output[ExecutionMode.CSS_COLOR].length) {
      // write CSS fallback;
      const fallbackCss = output[ExecutionMode.CSS_COLOR].join('');
      writeToFile(options.fallback.cssPath, minifyCSS(fallbackCss));
    }
  }

  function walkFallbackAtRules(root, execModes, output) {
    root.walkAtRules(atRule => {
      if (atRule.nodes && hasThemify(atRule.toString())) {
        execModes.forEach(mode => {
          const clonedAtRule = atRule.clone();

          clonedAtRule.nodes.forEach(rule => {
            rule.walkDecls(decl => {
              const propertyValue = decl.value;

              // replace the themify token, if exists
              if (hasThemify(propertyValue)) {
                const colorMap = getThemifyValue(propertyValue, mode);
                decl.value = colorMap[defaultVariation];
              }
            });
          });

          let rulesOutput = output[mode];
          rulesOutput.push(clonedAtRule);
        });
      }
    });
  }

  function walkFallbackRules(root, execModes, output) {
    root.walkRules(rule => {
      if (isAtRule(rule) || !hasThemify(rule.toString())) {
        return;
      }

      const ruleModeMap = {};

      rule.walkDecls(decl => {
        const propertyValue = decl.value;

        if (!hasThemify(propertyValue)) return;

        const property = decl.prop;

        execModes.forEach(mode => {
          const colorMap = getThemifyValue(propertyValue, mode);

          // lazily creating a new rule for each variation, for the specific mode
          if (!ruleModeMap.hasOwnProperty(mode)) {
            ruleModeMap[mode] = {};

            variationValues.forEach(variationName => {
              let newRule;
              if (variationName === defaultVariation) {
                newRule = cloneEmptyRule(rule);
              } else {
                newRule = createFallbackRuleWithVariation(rule, variationName);
              }

              // push the new rule into the right place,
              // so we can write them later to external file
              let rulesOutput = output[mode];
              rulesOutput.push(newRule);

              ruleModeMap[mode][variationName] = newRule;
            });
          }

          // create and append a new declaration
          variationValues.forEach(variationName => {
            const underlineColor = colorMap[variationName];
            if (underlineColor && underlineColor !== 'null') {
              const newDecl = createDecl(property, colorMap[variationName]);
              ruleModeMap[mode][variationName].append(newDecl);
            }
          });
        });
      });
    });
  }

  function createDecl(prop, value) {
    return postcss.decl({ prop, value });
  }

  /**
   * check if there's a themify keyword in this declaration
   * @param propertyValue
   */
  function hasThemify(propertyValue) {
    return propertyValue.indexOf(THEMIFY) > -1;
  }

  /**
   * Create a new rule for the given variation, out of the original rule
   * @param rule
   * @param variationName
   */
  function createRuleWithVariation(rule, variationName) {
    const selector = getSelectorName(rule, variationName);
    return postcss.rule({ selector });
  }

  /**
   * Create a new fallback-specific rule for the given variation, out of the original
   * @param rule
   * @param variationName
   */
  function createFallbackRuleWithVariation(rule, variationName) {
    const selector = getSelectorName(rule, variationName, true);
    return postcss.rule({ selector });
  }

  /**
   * Get a selector name for the given rule and variation, deliberately increasing
   * the CSS class's specificity when generating CSS selectors for IE 11 so we can
   * account for specificity conflicts when nesting themed components inside other
   * themes.
   * @param rule
   * @param variationName
   * @param isFallbackSelector
   */
  function getSelectorName(rule, variationName, isFallbackSelector = false) {
    const selectorPrefix = `.${options.classPrefix || ''}${variationName}`;

    if (isFallbackSelector) {
      return rule.selectors
        .map(selector => {
          let selectors = [];
          let initialSelector = `${selectorPrefix} ${selector}`;

          selectors.push(initialSelector);

          variationValues.forEach(name => {
            selectors.push(
              `.${options.classPrefix || ''}${name} ${initialSelector}`,
            );
          });

          return selectors.join(',');
        })
        .join(',');
    } else {
      return rule.selectors
        .map(selector => {
          return `${selectorPrefix} ${selector}`;
        })
        .join(',');
    }
  }

  function cloneEmptyRule(rule, overrideConfig) {
    const clonedRule = rule.clone(overrideConfig);
    // remove all the declaration from this rule
    clonedRule.removeAll();
    return clonedRule;
  }
}

/**
 * Generating a SASS definition file with the palette map and the CSS variables.
 * This file should be injected into your bundle.
 */

module.exports = {
  themify: postcss.plugin('boltThemify', themify),
};
