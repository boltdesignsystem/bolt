// This file is _not_ used by Drupal. It is only included in our static
// front-end demos to mimic a Drupal environment.
window.Drupal = {
  behaviors: {},
  locale: {},
};

Drupal.checkPlain = function (str) {
  str = str
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  return str;
};

Drupal.formatString = function (str, args) {
  var processedArgs = {};
  Object.keys(args || {}).forEach(function (key) {
    switch (key.charAt(0)) {
      case '@':
        processedArgs[key] = Drupal.checkPlain(args[key]);
        break;

      case '!':
        processedArgs[key] = args[key];
        break;

      default:
        processedArgs[key] = Drupal.theme('placeholder', args[key]);
        break;
    }
  });
  return Drupal.stringReplace(str, processedArgs, null);
};

Drupal.stringReplace = function (str, args, keys) {
  if (str.length === 0) {
    return str;
  }

  if (!Array.isArray(keys)) {
    keys = Object.keys(args || {});
    keys.sort(function (a, b) {
      return a.length - b.length;
    });
  }

  if (keys.length === 0) {
    return str;
  }

  var key = keys.pop();
  var fragments = str.split(key);

  if (keys.length) {
    for (var i = 0; i < fragments.length; i++) {
      fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
    }
  }

  return fragments.join(args[key]);
};

Drupal.t = function (str, args, options) {
  options = options || {};
  options.context = options.context || '';

  if (
    typeof drupalTranslations !== 'undefined' &&
    drupalTranslations.strings &&
    drupalTranslations.strings[options.context] &&
    drupalTranslations.strings[options.context][str]
  ) {
    str = drupalTranslations.strings[options.context][str];
  }

  if (args) {
    str = Drupal.formatString(str, args);
  }

  return str;
};
