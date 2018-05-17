const removeNewLineRegex = /(\r\n|\n|\r)/gm;

/**
 * Minify the JSON
 * @param jsonStr
 * @return {any | string | void}
 */
export function minifyJSON(jsonStr) {
  return jsonStr && jsonStr.trim().replace(removeNewLineRegex, '');
}
