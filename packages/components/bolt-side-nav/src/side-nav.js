export class BoltSideNav {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const linkToggleTrigger = this.el.querySelectorAll(
      '[data-bolt-side-nav-toggle-trigger]',
    );
    linkToggleTrigger.forEach(el => {
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

const sideNavs = document.querySelectorAll('[data-bolt-side-nav]');

sideNavs.forEach(el => {
  const component = new BoltSideNav(el);
});
