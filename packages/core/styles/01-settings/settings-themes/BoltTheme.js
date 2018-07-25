const Color = require('color');
const changeKeys = require('changecase-objects');

const { BaseTheme, ThemeDefaults } = require('./BoltBaseTheme');

function CreateTheme(themeProps, baseTheme = BaseTheme) {
  var handler = {
    get(obj, prop) {
      return prop in obj
        ? Color(obj[prop]).hex()
        : ThemeDefaults[prop]
          ? Color(ThemeDefaults[prop]).hex()
          : null;
    },
  };

  if (baseTheme) {
    let descriptors = Object.keys(baseTheme).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(baseTheme, key);
      return descriptors;
    }, {});

    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(baseTheme).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(baseTheme, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(themeProps, descriptors);
  }

  const newTheme = new Proxy(themeProps, handler);
  return newTheme;
}

function kebabCase(string) {
  var result = string;

  // Convert camelCase capitals to kebab-case.
  result = result.replace(/([a-z][A-Z0-9])/g, function(match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  });

  // Convert non-camelCase capitals to lowercase.
  result = result.toLowerCase();

  // Convert non-alphanumeric characters to hyphens
  result = result.replace(/[^-a-z0-9]+/g, '-');

  // Remove hyphens from both ends
  result = result.replace(/^-+/, '').replace(/-$/, '');

  return result;
}

function ExportTheme(originalTheme) {
  let newTheme = {};

  Object.keys(originalTheme).forEach(function(key) {
    newTheme[kebabCase(key)] = originalTheme[key];
  });
  return newTheme;
}

module.exports = {
  CreateTheme,
  ExportTheme,
};
