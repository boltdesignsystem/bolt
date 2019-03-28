let timeouts = new Map();

/**
 * Debounces a callback.
 * @param cb
 * @param ms
 * @param id
 */
export function debounce(cb, ms, id) {
  // Clear current timeout for id
  const timeout = timeouts.get(id);
  if (timeout != null) {
    window.clearTimeout(timeout);
  }

  // Set new timeout
  timeouts.set(
    id,
    window.setTimeout(() => {
      cb();
      timeouts.delete(id);
    }, ms),
  );
}
