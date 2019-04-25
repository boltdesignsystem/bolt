import Handorgel from 'handorgel';
import Fold from 'handorgel/src/js/fold';

export class Accordion extends Handorgel {
  update() {
    this.folds = [];
    const items =
      this.options.items && this.options.items.length
        ? this.options.items
        : this.element.children;

    for (let i = 0, itemsLength = items.length; i < itemsLength; i += 2) {
      const header = items[i];
      const content = items[i + 1];

      // get fold instance if there is already one
      let fold = header.handorgelFold;

      // create new one when header and content exist
      if (!fold && header && content) {
        fold = new Fold(this, header, content);
      }

      if (fold) {
        this.folds.push(fold);
      }
    }
  }
}
