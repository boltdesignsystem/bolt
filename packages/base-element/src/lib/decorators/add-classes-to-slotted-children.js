/**
 * A Class decorator that adds the `addClassesToSlottedChildren` method -- this allows BoltElement components to easily add classes to slotted children
 *
 * @returns {Object} - The original Class with new addClassesToSlottedChildren method.
 */
const addSlottedChildrenMethod = clazz => {
  return class extends clazz {
    /**
     * Automatically adds classes for the first and last slotted item (in the default slot) to help with tricky ::slotted selectors
     * @param {string[]} slotNames an array of slot names as strings
     */
    addClassesToSlottedChildren(slotNames = ['default']) {
      // console.log(this.slotMap);
      if (this.slotMap) {
        const applyClasses = slotName => {
          if (!this.slotMap.get(slotName)) return;

          const currentSlot = [];

          const items = this.slotMap.get(slotName);
          items.forEach(item => {
            if (item.tagName) {
              item.classList.remove('is-first-child');
              item.classList.remove('is-last-child'); // clean up existing classes
              currentSlot.push(item);
            }
          });

          if (currentSlot[0]) {
            currentSlot[0].classList.add('is-first-child');

            if (currentSlot.length === 1) {
              currentSlot[0].classList.add('is-last-child');
            }
          }

          if (currentSlot[currentSlot.length - 1]) {
            currentSlot[currentSlot.length - 1].classList.add('is-last-child');
          }
        };

        slotNames.forEach(name => applyClasses(name));
      }
    }
  };
};

const legacyAddSlottedChildren = clazz => {
  return addSlottedChildrenMethod(clazz);
};

const standardAddSlottedChildren = descriptor => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return addSlottedChildrenMethod(clazz);
    },
  };
};

// output the correct decorator syntax depending on the the env being compiled
export const slottedChildrenDecorator = () => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyAddSlottedChildren(classOrDescriptor)
    : standardAddSlottedChildren(classOrDescriptor);
