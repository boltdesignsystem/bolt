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

/**
 * @param  {object} component - reference to the base parent component; used for cleaning up event listener
 * @param  {object} element - the element that's being transitioned
 * @param  {function} callback - function to run after transition finished
 */
export const waitForTransitionEnd = function(component, element, callback) {
  const lastProp = getMaxTransitionProp(element);
  return function(event) {
    if (event.propertyName === lastProp) {
      callback(component, element, event);
    }
  };
};
