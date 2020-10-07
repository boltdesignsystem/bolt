import {
  lazyDefinitions,
  lazyDefinitionObserver,
  registerUndefinedCustomElements,
} from './lazy-definition-observer';
import { idleQueue } from './idle-queue';

lazyDefinitionObserver.observe(document.body, {
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

// exports an async-friendly function allowing you lazily register and load one or more custom element tags on the fly
export const lazyQueue = async (tagsToObserve = [], callback) => {
  if (tagsToObserve && tagsToObserve.length > 0) {
    let tagFound = false;

    // check to see if a particular tag already exists on the page
    tagsToObserve.forEach(tag => {
      if (tagFound === false) {
        tagFound = document.querySelector(tag) ? true : false;
      }
    });

    if (tagFound) {
      await callback();
    } else {
      // for definitions that don't have any tags already present, register the definition to keep an eye out for later on
      idleQueue.pushTask(() => {
        tagsToObserve.map(tag => {
          lazyDefinitions.set(tag, callback);
        });

        // after lazily registering one or more tags, double-check to see if that tag has already been encountered
        registerUndefinedCustomElements();
      });
    }
  } else {
    // if no componentSelectors are passed along, add to the queue to be processed immediately
    idleQueue.pushTask(async () => {
      await callback();
    });
  }
};
