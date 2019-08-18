/**
 * Get the transition duration of a given element.
 * https://github.com/twbs/bootstrap/blob/master/js/src/util/index.js
 * @param {Element} element - Target element
 * @returns {number} - Target element's transition-duration in milliseconds
 */

export function getTransitionDuration(element) {
  if (!element) {
    return 0;
  }

  let { transitionDuration, transitionDelay } = window.getComputedStyle(
    element,
  );

  const floatTransitionDuration = parseFloat(transitionDuration);
  const floatTransitionDelay = parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];

  return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * 1000;
}
