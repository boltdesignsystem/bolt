import { computeOffsetPixels } from './computeOffsetPixels';

/**
 * @param {Element} element The waypoint element to be tracked
 * @param {Element} context The scrollable context in which the element may appear
 * @param {string|number} topOffset An offset amount for the top boundary, use `px or %`
 * @param {string|number} bottomOffset An offset amount for the bottom boundary, use `px or %`
 * @return {object} An object with bounds data for the waypoint and scrollable parent
 */
export function getBounds(
  element,
  context = window,
  topOffset = 0,
  bottomOffset = 0,
) {
  if (!element) return;

  const { top, bottom } = element.getBoundingClientRect();

  // Only tested with `window` context so far
  let contextHeight = context.innerHeight;
  let contextScrollTop = 0;

  const topOffsetPx = computeOffsetPixels(topOffset, contextHeight);
  const bottomOffsetPx = computeOffsetPixels(bottomOffset, contextHeight);
  const contextBottom = contextScrollTop + contextHeight;

  return {
    waypointTop: top,
    waypointBottom: bottom,
    viewportTop: contextScrollTop + topOffsetPx,
    viewportBottom: contextBottom - bottomOffsetPx,
  };
}
