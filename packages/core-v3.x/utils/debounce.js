/**
 * Debounce limits the rate at which a function can fire by waiting until that function has ceased to be invoked for N milliseconds.
 * @callback {function} func - Function called after a delay
 * @param {number} [delay=300] - Time to wait (in milliseconds) before calling function
 * @returns {function} - The callback function
 */
export function debounce(func, delay = 300) {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}
