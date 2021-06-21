import { declarativeClickHandler } from '@bolt/core-v3.x/utils';

export default class ClickHandler {
  constructor(el) {
    this.el = el;
    this.setupClickHandler();
  }

  setupClickHandler() {
    // The original `declarativeClickHandler` was designed for web components,
    // where props are automatically turned into node data. We're adapting it
    // to work with non-WCs by manually setting that data from attributes.

    this.el.onClick = this.el.dataset.onClick;
    this.el.onClickTarget = this.el.dataset.onClickTarget;

    this.el.addEventListener('click', () => {
      declarativeClickHandler(this.el);
    });
  }
}
