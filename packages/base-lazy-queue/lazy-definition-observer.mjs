export const lazyDefinitions = new Map();
export const undefinedCustomElements = new Set();

// mutation observer to keep an eye out for new custom elements to load any JS registered
export const lazyDefinitionObserver = new MutationObserver(records => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
      // @todo: keep iterating on this ^ to further filter everything BUT actual Nodes with tags (ex. no text nodes)
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
      let currentNode = walker.currentNode;

      // walk through the nodes added to pick out any custom elements
      while (currentNode) {
        if (currentNode.tagName) {
          let tagName = currentNode.tagName.toLowerCase();

          // find custom element tags that haven't yet been registered
          if (tagName.includes('-') && !window.customElements.get(tagName)) {
            const lazyDefinition = lazyDefinitions.get(tagName);
            if (lazyDefinition !== undefined) {
              lazyDefinitions.delete(tagName);
              if (undefinedCustomElements.has(tagName)) {
                undefinedCustomElements.delete(tagName);
              }
              (async () => {
                await lazyDefinition();
              })();
            } else {
              undefinedCustomElements.add(tagName);
            }
            // @todo: consider if we should allow other tags and/or other selectors to be registered (perf impact?)
            // } else {
            //   console.log(undefinedCustomElements);
            //   undefinedCustomElements.add(tagName);
          }
        }
        currentNode = walker.nextNode();
      }
    }
  }
});

// when registering a new component to be lazy-loaded, double-check to see if that custom element tag has already been encountered
export function registerUndefinedCustomElements() {
  if (undefinedCustomElements.size === 0) return;

  // cross reference the custom element tags already encountered with the registered tag definitions that haven't booted up yet
  const customElementsToRegister = Array.from(
    undefinedCustomElements,
  ).filter(tag => lazyDefinitions.get(tag));

  for (let tagName of customElementsToRegister) {
    const lazyDefinition = lazyDefinitions.get(tagName);
    if (lazyDefinition !== undefined) {
      lazyDefinitions.delete(tagName);
      undefinedCustomElements.delete(tagName);

      if (!window.customElements.get(tagName)) {
        (async () => {
          await lazyDefinition();
        })();
      }
    }
  }
}
