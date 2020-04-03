/**
 * Generate unique a ID
 *
 * @returns {String} - A nine-character unique string
 */

export function getUniqueId() {
  // From: https://gist.github.com/gordonbrander/2230317...
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
  return Math.random().toString(36).substr(2, 9);
}
