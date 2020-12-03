import { computeOffsetPixels } from './computeOffsetPixels';

/**
 * @param {Element} element The waypoint element to be tracked
 * @param {Element} context The scrollable context in which the element may appear
 * @param {string|number} topOffset An offset amount for the top boundary, use `px or %`
 * @param {string|number} bottomOffset An offset amount for the bottom boundary, use `px or %`
 * @param {string|number} stickyOffset An offset amount for sticky elements, use `px or %`
 * @return {object} An object with bounds data for the waypoint and scrollable parent
 */
export function getBounds(
  element,
  context = window,
  topOffset = 0,
  bottomOffset = 0,
  stickyOffset = 0,
) {
  if (!element) return;

  const { top, bottom } = element.getBoundingClientRect();

  // Only tested with `window` context so far
  let contextHeight = context.innerHeight;
  let contextScrollTop = 0;

  const topOffsetPx = computeOffsetPixels(topOffset, contextHeight);
  const bottomOffsetPx = computeOffsetPixels(bottomOffset, contextHeight);
  const stickyOffsetPx = computeOffsetPixels(stickyOffset, contextHeight);
  const contextBottom = contextScrollTop + contextHeight;

  // Set a ceiling for the "bottom" viewport value to ensure it's always within the visible viewport.
  // If requirements change and we want a negative "bottom", this can be remove or reworked.
  const stickyOffsetBottomPx =
    bottomOffsetPx > stickyOffsetPx ? stickyOffsetPx : 0;

  return {
    waypointTop: top,
    waypointBottom: bottom,
    viewportTop: contextScrollTop + topOffsetPx + stickyOffsetPx,
    viewportBottom: contextBottom - bottomOffsetPx + stickyOffsetBottomPx,
  };
}
