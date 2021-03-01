export default class ClickHandler {
  constructor(el) {
    el.addEventListener('click', () => {
      this.handleClick(el);
    });
  }

  handleClick(el) {
    const handler = el.dataset.boltHandler;
    const target = el.dataset.boltTarget;

    if (handler) {
      const els = document.querySelectorAll(target);
      if (els.length) {
        els.forEach(el => {
          if (el[handler]) {
            el[handler]();
          }
        });
      } else if (window[handler]) {
        window[handler]();
      } else if (el[handler]) {
        el[handler]();
      }
    }
  }
}
