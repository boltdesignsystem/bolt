/* eslint-disable */

let JSONFallbackCache;

/**
 *
 * @param path
 */
function loadJSON(url, cb) {
  const req = new XMLHttpRequest();
  req.overrideMimeType('application/json');
  req.open('GET', url, true);
  req.onload = function() {
    cb(JSON.parse(req.responseText));
  };
  req.send(null);
}

/**
 *
 * @param path
 */
function loadCSS(path) {
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('link');
  style.href = path;
  style.id = 'themify-ie';
  style.type = 'text/css';
  style.rel = 'stylesheet';
  head.appendChild(style);
}

/**
 *
 * @param style
 */
function injectStyle(style) {
  var node = document.createElement('style');
  node.id = 'themify';
  node.innerHTML = style;
  document.head.appendChild(node);
}

/**
 *
 * .dark {
 *   --primary-100: 30, 24, 33;
 * }
 *
 * :root {
 *   --primary-100: 22, 21, 22;
 * }
 *
 * @param customTheme
 * @returns {string}
 */
function generateNewVariables(customTheme) {
  // First, we need the variations [dark, light]
  const variations = Object.keys(customTheme);
  return variations.reduce((finalOutput, variation) => {
    // Next, we need the variation keys [primary-100, accent-100]
    const variationKeys = Object.keys(customTheme[variation]);

    const variationOutput = variationKeys.reduce((acc, variable) => {
      const value = normalizeColor(customTheme[variation][variable]);
      return (acc += `--${variable}: ${value};`);
    }, '');

    return (finalOutput += `${variation === 'light' ? ':root' : '.' + variation}{${variationOutput}}`);
  }, '');
}

/**
 *
 * @returns {boolean}
 */
function hasNativeCSSProperties() {
  return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
}

/**
 * Load the CSS fallback file on load
 */
function loadCSSVariablesFallback(fallbackPath) {
  if (!hasNativeCSSProperties()) {
    loadCSS(fallbackPath);
  }
}

/**
 *
 * @param customTheme
 */
function replaceColors(fallbackJSONPath, customTheme) {
  if (customTheme) {
    if (hasNativeCSSProperties()) {
      const newColors = generateNewVariables(customTheme);
      injectStyle(newColors);
    } else {
      const replace = JSONFallback => {
        JSONFallbackCache = JSONFallback;
        handleUnSupportedBrowsers(customTheme, JSONFallbackCache);
      };
      if (JSONFallbackCache) {
        replace(JSONFallbackCache);
      } else {
        loadJSON(fallbackJSONPath, replace);
      }
    }
  }
}

/**
 *
 * @param customTheme
 */
function handleUnSupportedBrowsers(customTheme, JSONFallback) {
  const themifyRegExp = /%\[(.*?)\]%/gi;
  const merged = mergeDeep(palette, customTheme);

  let finalOutput = Object.keys(customTheme).reduce((acc, variation) => {
    let value = JSONFallback[variation].replace(themifyRegExp, (occurrence, value) => {
      const [variation, variable, opacity] = value.replace(/\s/g, '').split(',');
      const color = merged[variation][variable];
      const normalized = hexToRGB(color, opacity);
      return normalized;
    });

    return (acc += value);
  }, '');

  injectStyle(finalOutput);
}

/**
 * Omit the rgb and braces from rgb
 * rgb(235, 246, 244) => 235, 246, 244
 * @param rgb
 * @returns {string}
 */
function normalizeRgb(rgb) {
  return rgb.replace('rgb(', '').replace(')', '');
}

/**
 *
 * @param color
 * @returns {*}
 */
function normalizeColor(color) {
  if (isHex(color)) {
    return normalizeRgb(hexToRGB(color));
  }

  if (isRgb(color)) {
    return normalizeRgb(color);
  }

  return color;
}

/**
 *
 * @param color
 * @returns {boolean}
 */
function isHex(color) {
  return color.indexOf('#') > -1;
}

/**
 *
 * @param color
 * @returns {boolean}
 */
function isRgb(color) {
  return color.indexOf('rgb') > -1;
}

/**
 *
 * @param hex
 * @param alpha
 * @returns {string}
 */
function hexToRGB(hex, alpha = false) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

var palette = {
  light: {
    'primary-700': '#303030',
    'primary-600': '#383838',
    'primary-500': '#505050',
    'primary-400': '#666a6b',
    'primary-300': '#9ca0a0',
    'primary-200': '#cccece',
    'primary-100': '#f2f2f4',
    'primary-50': '#f8f8f9',
    'primary-0': '#ffffff',
    'accent-700': '#096796',
    'accent-600': '#0a87c6',
    'accent-500': '#04a2d6',
    'accent-400': '#00bee8',
    'accent-300': '#4cd1ef',
    'accent-200': '#96e1ed',
    'accent-100': '#e6f9fc'
  },
  dark: {
    'primary-700': '#ffffff',
    'primary-600': '#f8f8f9',
    'primary-500': '#f2f2f4',
    'primary-400': '#cccece',
    'primary-300': '#9ca0a0',
    'primary-200': '#666a6b',
    'primary-100': '#505050',
    'primary-50': '#383838',
    'primary-0': '#303030',
    'accent-700': '#e6f9fc',
    'accent-600': '#96e1ed',
    'accent-500': '#4cd1ef',
    'accent-400': '#00bee8',
    'accent-300': '#04a2d6',
    'accent-200': '#0a87c6',
    'accent-100': '#096796'
  }
};

/**
 *
 * @param target
 * @param sources
 * @returns {*}
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 *
 * @param item
 * @returns {*|boolean}
 */
function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
