/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

const hasOwn = {}.hasOwnProperty;

let styles;

export function bind(localStyles) {
  styles = localStyles;
  return classNames;
}

export function classNames(...args) {
  let classes = [];

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  // if CSS Modules enabled, automatically map the CSS selector to the mangled classname (what classnames/bind was _supposed_ to already do...)
  if (styles) {
    if (styles.locals) {
      classes = classes.map(selector =>
        styles.locals[selector] ? styles.locals[selector] : selector,
      );
    }
  }

  return classes.join(' ');
}

const defaultFunction = {
  bind,
  classNames,
};

export default defaultFunction;
