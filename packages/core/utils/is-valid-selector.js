/**
 * Helper function to check if a particular class or ID selector is valid
 * Inspired by {@link https://github.com/jquery/sizzle/blob/3116795bba9a0c3d624e0718006b25aa5568d4cb/src/sizzle.js#L131|Sizzle} and {@link https://stackoverflow.com/a/17103651|Stack Overflow}
 *
 * @param {string} full ID or class selector to test against, including the # or .
 */
export function isValidSelector(selector) {
  // If the selector is an ID (starts with a hash), make sure it conforms to the rules of ID selectors (can't start with a number)
  const validSelectorRegex = /^(?:#([A-Za-z][-A-Za-z0-9_:.]+)|(\w+)|\.([\w-]+))$/;

  if (validSelectorRegex.exec(selector) === null) {
    return false;
  } else {
    return true;
  }
}
