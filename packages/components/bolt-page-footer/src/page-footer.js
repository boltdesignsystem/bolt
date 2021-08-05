export class BoltPageFooter {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const headlineToggleTrigger = this.el.querySelectorAll(
      '[data-bolt-page-footer-toggle-trigger]',
    );
    headlineToggleTrigger.forEach(el => {
      el.addEventListener('click', event => {
        if (el.getAttribute('aria-expanded') === 'true') {
          el.setAttribute('aria-expanded', 'false');
        } else {
          el.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
}

const pageFooters = document.querySelectorAll('[data-bolt-page-footer]');

pageFooters.forEach(el => {
  const component = new BoltPageFooter(el);
});
