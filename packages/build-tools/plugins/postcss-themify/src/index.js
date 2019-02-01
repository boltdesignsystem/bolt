const postcss = require('postcss');
const fs = require('fs-extra');
const hexToRgba = require('hex-to-rgba');
const rgb2hex = require('rgb2hex');
const chokidar = require('chokidar');
const { BoltCache, getFileHash } = require('@bolt/build-tools/utils/cache');
const { minifyCSS } = require('./helpers/css.util');

const THEMIFY = 'bolt-themify';

let options;
let output;

let colorPaletteHash;
let isWatchingForChanges = false;

//----------------------------------------------------
function watchColorPaletteFile(filePath, callback) {
  chokidar
    .watch(filePath, {
      ignoreInitial: true,
    })
    .on('all', function(event, path, stats) {
      if (event === 'add' || event === 'change') {
        getFileHash(filePath, function(hash) {
          if (hash !== colorPaletteHash) {
            colorPaletteHash = hash;
            console.log('Color palette changed! Invalidating cache...');
            callback();
          }
        });
      }
    });
}

//----------------------------------------------------

/** Regex to get the value inside the themify parenthesis */
const themifyRegExp = /bolt-themify\(([^)]+)\)/gi;

/**
 * Define the method of color execution
 */
const ExecutionMode = {
  CSS_COLOR: 'CSS_COLOR',
  CSS_VAR: 'CSS_VAR',
};

const defaultOptions = {
  watchForChanges: false,
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

// /**
//  * Get the rgba as 88, 88, 33 instead rgba(88, 88, 33, 1)
//  * @param value
//  */
// function getRgbaNumbers(value) {
//   return hexToRgba(value)
//     .replace('rgba(', '')
//     .replace(', 1)', '');
// }

function colorPaletteDataExists() {
  try {
    return fs.statSync(options.fallback.jsonPath).isFile();
  } catch (e) {
    // Check exception. If ENOENT - no such file or directory ok, file doesn't exist.
    // Otherwise something else went wrong, we don't have rights to access the file, ...
    if (e.code !== 'ENOENT') {
      throw e;
    }

    return false;
  }
}

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

function getColorPalette(invalidateCache = false) {
  let colorPaletteData = BoltCache.get('palette');
  if (colorPaletteData === undefined || invalidateCache === true) {
    if (colorPaletteDataExists()) {
      colorPaletteData = fs.readFileSync(options.fallback.jsonPath, 'utf8');
      // console.log('updating cache...');
      BoltCache.set('palette', colorPaletteData);

      return JSON.parse(colorPaletteData);
    } else {
      throw new Error(
        "The `@bolt/themify` PostCSS plugin for `@bolt/build-tools` can't find the auto-generated JSON file that contains the data for Bolt's global color palette. This is necessary in order to generate the CSS Custom Properties fallback for older browsers! \n; Is `@bolt/global` the first item in your `.boltrc` file's global components array?",
      );
    }
  } else {
    // console.log('returning cached data!');
    return JSON.parse(colorPaletteData);
  }
}

function buildOptions(options) {
  if (!options) {
    throw new Error(`options is required.`);
  }
  return {
    ...defaultOptions,
    ...options,
  };
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
      options.palette = getColorPalette();
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
    options.palette = getColorPalette();
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
      if (alpha === '1') {
        return rgb2hex(underlineColor).hex;
      }
      // with custom alpha, convert it to rgba
      const rgbaColor = hexToRgba(rgb2hex(underlineColor).hex, alpha);
      return rgbaColor;
    default:
      if (alpha === 1) {
        return `rgba(var(--bolt-theme-${colorVar}), ${alpha})`;
        //return `var(--bolt-theme-${colorVar})`; // @todo: re-evaluate if hex values should ever get outputted here
      } else {
        return `rgba(var(--bolt-theme-${colorVar}), ${alpha})`;
      }
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
  const execModes = [ExecutionMode.CSS_COLOR];

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
            // let newDefaultVariationRule;
            // push the new rule into the right place,
            // so we can write them later to external file
            let rulesOutput = output[mode];

            if (variationName === defaultVariation) {
              newDefaultVariationRule = createFallbackRuleWithVariation(
                rule,
                variationName,
              );
              rulesOutput.push(newDefaultVariationRule);
            }

            const newRule = createFallbackRuleWithVariation(
              rule,
              variationName,
            );
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
  return postcss.decl({
    prop,
    value,
  });
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
  return postcss.rule({
    selector,
  });
}

/**
 * Create a new fallback-specific rule for the given variation, out of the original
 * @param rule
 * @param variationName
 */
function createFallbackRuleWithVariation(rule, variationName) {
  const selector = getSelectorName(rule, variationName, true);
  return postcss.rule({
    selector,
  });
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

  // console.log(variationName);

  if (isFallbackSelector) {
    return rule.selectors
      .map(selector => {
        let selectors = [];
        let initialSelector = `${selectorPrefix} ${selector}`;

        if (variationName === 'xlight') {
          selectors.push(selector);
        }

        selectors.push(initialSelector);
        selectors.push(`[class*="t-bolt-"] ${initialSelector}`);

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

/** Define the default variation */
const defaultVariation = ColorVariation.XLIGHT;

/** An array of variation values  */
const variationValues = Object.values(ColorVariation);

/** An array of all non-default variations */
const nonDefaultVariations = variationValues;

module.exports = postcss.plugin('postcss-bolt-themify', opts => {
  options = buildOptions(opts);

  if (options.watchForChanges === true && !isWatchingForChanges) {
    isWatchingForChanges = true;
    // console.log('watching for color palette changes...');
    watchColorPaletteFile(options.fallback.jsonPath, function() {
      let colorPaletteCache = getColorPalette(true);
      options.palette = colorPaletteCache;
    });
  }

  return root => {
    if (options.screwIE11 === false) {
      processFallbackRules(root);
    }

    /** mutate the existing rules **/
    processRules(root);
  };
});
