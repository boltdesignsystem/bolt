let JSONFallbackCache;
let _hasNativeSupport;

export type Theme = {
  [name: string]: {
    [variable: string]: string;
  };
};

/**
 *
 * @param {string} path
 */
export function loadCSS(path: string, callback) {
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('link');
  style.href = path;
  style.rel = 'stylesheet';
  style.onload = callback;
  head.appendChild(style);
}

/**
 *
 * @param {string} style
 */
export function injectStyle(style: string) {
  /** Don't replace the style tag, otherwise you will remove the old changes */
  if (hasNativeCSSProperties()) {
    inject();
  } else {
    /** Use the same style tag as we replace all either way */
    const styleTag = document.getElementById('themify') as HTMLLinkElement;
    if (!styleTag) {
      inject();
    } else {
      styleTag.innerHTML = style;
    }
  }

  function inject() {
    let node = document.createElement('style');
    node.id = 'themify';
    node.innerHTML = style;
    document.head.appendChild(node);
  }
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
export function _generateNewVariables(customTheme: Theme) {
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
export function hasNativeCSSProperties() {
  if (_hasNativeSupport != null) {
    return _hasNativeSupport;
  }

  _hasNativeSupport = (window as any).CSS && (window as any).CSS.supports && (window as any).CSS.supports('--fake-var', 0);

  return _hasNativeSupport;
}

/**
 * Load the CSS fallback file on load
 */
export function loadCSSVariablesFallback(path: string, cb) {
  if (!hasNativeCSSProperties()) {
    loadCSS(path, cb);
  }
}

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
 * @param customTheme
 */
export function replaceColors(fallbackJSONPath, customTheme, palette) {
  if (customTheme) {
    if (hasNativeCSSProperties()) {
      const newColors = _generateNewVariables(customTheme);
      injectStyle(newColors);
    } else {
      const replace = JSONFallback => {
        JSONFallbackCache = JSONFallback;
        _handleUnSupportedBrowsers(customTheme, palette, JSONFallbackCache);
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
export function _handleUnSupportedBrowsers(customTheme, palette, JSONFallback) {
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

  return finalOutput;
}

/**
 * Omit the rgb and braces from rgb
 * rgb(235, 246, 244) => 235, 246, 244
 * @param rgb
 * @returns {string}
 */
function normalizeRgb(rgb: string) {
  return rgb.replace('rgb(', '').replace(')', '');
}

/**
 *
 * @param color
 * @returns {*}
 */
function normalizeColor(color: string) {
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
function isHex(color: string) {
  return color.indexOf('#') > -1;
}

/**
 *
 * @param color
 * @returns {boolean}
 */
function isRgb(color: string) {
  return color.indexOf('rgb') > -1;
}

/**
 *
 * @param hex
 * @param alpha
 * @returns {string}
 */
function hexToRGB(hex: string, alpha = false) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    if (alpha) {
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, ${alpha})`;
    }
    return `rgb(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')})`;
  }

  throw new Error('Bad Hex');
}

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
        if (!target[key])
          Object.assign(target, {
            [key]: {}
          });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
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
function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

module.exports = {
  replaceColors,
  loadCSSVariablesFallback,
  _handleUnSupportedBrowsers,
  _generateNewVariables
};
