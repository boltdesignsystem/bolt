/**
 * @param {object} bounds An object with bounds data for the waypoint and
 *   scrollable parent
 * @return {string} The current position of the waypoint in relation to the
 *   visible portion of the scrollable parent. One of the constants `above`,
 *   `below`, `inside` or `invisible`.
 */
export function getCurrentPosition(bounds) {
  if (bounds.viewportBottom - bounds.viewportTop === 0) {
    return 'invisible';
  }

  // top is within the viewport
  if (
    bounds.viewportTop <= bounds.waypointTop &&
    bounds.waypointTop <= bounds.viewportBottom
  ) {
    return 'inside';
  }

  // bottom is within the viewport
  if (
    bounds.viewportTop <= bounds.waypointBottom &&
    bounds.waypointBottom <= bounds.viewportBottom
  ) {
    return 'inside';
  }

  // top is above the viewport and bottom is below the viewport
  if (
    bounds.waypointTop <= bounds.viewportTop &&
    bounds.viewportBottom <= bounds.waypointBottom
  ) {
    return 'inside';
  }

  if (bounds.viewportBottom < bounds.waypointTop) {
    return 'below';
  }

  if (bounds.waypointTop < bounds.viewportTop) {
    return 'above';
  }

  return 'invisible';
}
