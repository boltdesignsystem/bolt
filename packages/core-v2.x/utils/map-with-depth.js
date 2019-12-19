// ported from https://github.com/rexxars/react-refractor/blob/master/src/mapChildren.js
/**
 * Utility function to help recursively process over nested DOM nodes, slotted content, or an AST tree
 * @param {number} depth - the level of depth of the AST tree being transformed
 * @returns {any} - returns the react-renderable bit of DOM
 */
export function mapWithDepth(depth, cb) {
  return function mapChildrenWithDepth(child) {
    return mapChild(child, depth, cb);
  };
}

/**
 * Utility function to help render a specific AST tree child into the VDOM
 * @param {any} child - the AST tree child being converted
 * @param {number} i - the index of the AST child?
 * @param {number} depth - depth of the current AST tree child?
 * @returns {any} - returns the child element of the AST tree being react-renderable
 */
export function mapChild(child, depth, cb) {
  if (cb) {
    cb(child, depth);
  }

  return child;
}

export default mapWithDepth;
