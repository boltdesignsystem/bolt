export class BoltPageFooter {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const linkToggleTrigger = this.el.querySelectorAll(
      '[data-bolt-page-footer-toggle-trigger]',
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

  // toggleAccordion = () => {
  //   const accTrigger = this.el.getElementsByClassName(
  //     'c-page-footer__nav-trigger',
  //   );
  //   for (let i = 0; i < accTrigger.length; i++) {
  //     accTrigger[i].addEventListener('click', function() {
  //       //Toggle aria-expanded
  //       let ariaExpanded = this.getAttribute('aria-expanded');
  //       if (ariaExpanded === 'true') {
  //         ariaExpanded = 'false';
  //       } else {
  //         ariaExpanded = 'true';
  //       }
  //       this.setAttribute('aria-expanded', ariaExpanded);
  //       //Toggle accordion panels
  //       // const panel = this.nextElementSibling;
  //       // if (panel.style.maxHeight) {
  //       //   panel.style.maxHeight = null;
  //       // } else {
  //       //   panel.style.maxHeight = panel.scrollHeight + 'px';
  //       // }
  //     });
  //   }
  // };
}

const pageFooterNavs = document.querySelectorAll('[data-bolt-page-footer-nav]');

pageFooterNavs.forEach(el => {
  const component = new BoltPageFooter(el);
});
