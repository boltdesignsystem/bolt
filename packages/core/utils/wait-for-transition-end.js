// Calculates which CSS transition property is the final one transitioning -- useful for animation complete callbacks. Inspired by https://stackoverflow.com/a/40534650

export function getValues(str) {
  return str
    .replace(/[A-Z]/gi, '')
    .split(', ')
    .map(parseFloat);
}

export function getMaxTransitionProp(el) {
  var style = window.getComputedStyle(el);
  var props = style.transitionProperty.split(', ');

  var delays = getValues(style.transitionDelay);
  var durations = getValues(style.transitionDuration);
  var totals = durations.map(function(v, i) {
    return v + delays[i];
  });

  var maxIndex = totals.reduce(
    function(res, cur, i) {
      if (res.val > cur) {
        res.val = cur;
        res.i = i;
      }
      return res;
    },
    {
      val: -Infinity,
      i: 0,
    },
  ).i;

  return props[maxIndex];
}

export const waitForTransitionEnd = function(el, cb) {
  var lastProp = getMaxTransitionProp(el);
  return function(e) {
    if (e.propertyName === lastProp) {
      cb(e);
    }
  };
};
