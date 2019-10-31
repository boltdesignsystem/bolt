/* eslint-disable class-methods-use-this */

const Slotify = Base =>
  class extends Base {
    templateMap = new Map();

    assignSlotToContent(child) {
      return child.getAttribute ? child.getAttribute('slot') || 'default' : 'default';
    }

    isEmptyTextNode(child) {
      return child && (!child.textContent || !child.textContent.trim());
    }

    addChildToTemplateMap(slot, child) {
      if (!slot) return;

      if (!this.templateMap.has(slot)) {
        this.templateMap.set(slot, [child]);
      } else {
        this.templateMap.set(slot, [...this.templateMap.get(slot), child]);
      }
    }

    // Save a reference to the pseudoSlot content before lit-element renders
    saveSlots() {
      Array.from(this.childNodes).forEach(child => {
        const slot = this.assignSlotToContent(child);

        if (!child.textContent || child.textContent.trim().length > 0) {
          this.addChildToTemplateMap(slot, child);
        } else if (slot && child instanceof HTMLElement) {
          this.addChildToTemplateMap(slot, child);
        }
      });
    }

    update(changedProperties) {
      if (!this.hasUpdated) {
        this.saveSlots();
      }

      super.update(changedProperties);
    }

    slotify(slot = 'default', defaultContent) {
      const slotContent = this.templateMap.get(slot);

      // render slots when using Shadow DOM
      if (this.shadowRoot && slotContent) {
        const realSlot = document.createElement('slot');
        if (slot !== 'default') {
          realSlot.setAttribute('name', slot);
        }
        return realSlot;
      }

      if (slotContent && slotContent.content) {
        return slotContent.content;
      }
      if (slotContent && slotContent.childNodes) {
        return Array.from(slotContent.childNodes);
      }
      if (slotContent) {
        return slotContent;
      }
      if (defaultContent) {
        return defaultContent;
      }

      return null;
    }
  };

export {
  Slotify,
};
