import { IdleQueue } from 'idlize/IdleQueue.mjs';

export const lazyDefinitions = new Map();
const lazyDefinitionObserver = new MutationObserver(records => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
      while (walker.nextNode() !== null) {
        let tagName = walker.currentNode.tagName.toLowerCase();
        const lazyDefinition = lazyDefinitions.get(tagName);
        if (lazyDefinition !== undefined) {
          lazyDefinitions.delete(tagName);

          if (
            (tagName.includes('bolt-') &&
              !window.customElements.get(tagName)) ||
            !tagName.includes('bolt-')
          ) {
            (async () => {
              await lazyDefinition();
            })();
          }
        }
      }
    }
  }
});

lazyDefinitionObserver.observe(document, {
  childList: true,
  subtree: true,
});

const originalAttachShadow = HTMLElement.prototype.attachShadow;
HTMLElement.prototype.attachShadow = function(options) {
  const shadow = originalAttachShadow.call(this, options);
  lazyDefinitionObserver.observe(shadow, {
    childList: true,
    subtree: true,
  });
  return shadow;
};

const idleQueue = new IdleQueue({
  // defaultMinTaskTime: 40, // Only run if there's lots of time left.
  ensureTasksRun: true,
});

export const lazyQueue = async (componentTagNames, callback) => {
  let elemFound = false;

  componentTagNames.forEach(element => {
    if (elemFound === false) {
      elemFound = document.querySelector(element) ? true : false;
    }
  });

  if (elemFound) {
    await callback();
  } else {
    idleQueue.pushTask(() => {
      componentTagNames.map(tagname => {
        lazyDefinitions.set(tagname, callback);
      });
    });
  }
};
