/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
export function queryShadowRoot(
  root,
  skipNode,
  isMatch,
  maxDepth = 20,
  depth = 0,
) {
  let matches = [];

  // If the depth is above the max depth, abort the searching here.
  if (depth >= maxDepth) {
    return matches;
  }

  // Traverses a slot element
  const traverseSlot = ($slot) => {
    // Only check nodes that are of the type Node.ELEMENT_NODE
    // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const assignedNodes = $slot
      .assignedNodes()
      .filter((node) => node.nodeType === 1);
    if (assignedNodes.length > 0) {
      return queryShadowRoot(
        assignedNodes[0].parentElement,
        skipNode,
        isMatch,
        maxDepth,
        depth + 1,
      );
    }

    return [];
  };

  // Go through each child and continue the traversing if necessary
  // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
  // Therefore we fallback to an empty array if it is undefined.
  const children = Array.from(root.children || []);
  for (const $child of children) {
    // Check if the node and its descendants should be skipped
    if (skipNode($child)) {
      // continue;
    }

    // If the child matches we always add it
    if (isMatch($child)) {
      matches.push($child);
    }

    if ($child.shadowRoot != null) {
      matches.push(
        ...queryShadowRoot(
          $child.shadowRoot,
          skipNode,
          isMatch,
          maxDepth,
          depth + 1,
        ),
      );
    } else if ($child.tagName === 'SLOT') {
      matches.push(...traverseSlot($child));
    } else {
      matches.push(
        ...queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1),
      );
    }
  }

  return matches;
}
