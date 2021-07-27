export class BoltPageFooter {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const toggleAccordion = this.toggleAccordion();
  }

  toggleAccordion = () => {
    const accTrigger = this.el.getElementsByClassName(
      'c-page-footer__nav-trigger',
    );
    for (let i = 0; i < accTrigger.length; i++) {
      accTrigger[i].addEventListener('click', function() {
        //Toggle aria-expanded
        let ariaExpanded = this.getAttribute('aria-expanded');
        if (ariaExpanded === 'true') {
          ariaExpanded = 'false';
        } else {
          ariaExpanded = 'true';
        }
        this.setAttribute('aria-expanded', ariaExpanded);
        //Toggle accordion panels
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  };
}
