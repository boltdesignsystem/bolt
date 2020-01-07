import { containsAny } from './contains-any';

export function watchForComponentMutations(element) {
  // Automatically re-render if the component's children get externally modified (ex. a new icon gets injected)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(function(mutation) {
      if (mutation.removedNodes.length > 0) {
        const itemsRemoved = [].slice.call(mutation.removedNodes); // grab items removed + convert to array

        for (let i = 0; i < element.slots.length; i++) {
          if (containsAny(element.slots[slot[i]], itemsRemoved)) {
            for (let j = 0; j < itemsRemoved.length; j++) {
              const itemRemoved = itemsRemoved[j];
              element.slots[slot] = element.slots[slot].filter(
                slottedItem => slottedItem !== itemRemoved,
              );
            }
          }
        }
      } else {
        const itemsAdded = [].slice.call(mutation.addedNodes); // grab items added + convert to array

        for (let i = 0; i < itemsAdded.length; i++) {
          const itemAdded = itemsAdded[i];
          const slotName = itemAdded.getAttribute
            ? itemAdded.getAttribute('slot')
            : null;

          if (!slotName) {
            element.slots.default.push(itemAdded);
          } else if (element.slots[slotName]) {
            element.slots[slotName].push(itemAdded);
          } else {
            element.slots[slotName] = [];
            element.slots[slotName].push(itemAdded);
          }
        }
      }

      element.triggerUpdate(); // automatically trigger an update with the component when externally mutated so slots + classes added re-render as expected.
    });
  });

  return observer;
}
