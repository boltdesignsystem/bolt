/**
 * Immutably renames object keys
 * https://medium.com/front-end-weekly/immutably-rename-object-keys-in-javascript-5f6353c7b6dd
 *
 * @param {String} oldKey - The name of the key to be renamed
 * @param {String} newKey - The name it will be renamed it to
 * @param {Object} object - The object that contains the old key name
 * @returns {Object} - A new object with one renamed key
 */

export const renameKey = (oldKey, newKey, { [oldKey]: value, ...object }) => ({
  [newKey]: value,
  ...object,
});
