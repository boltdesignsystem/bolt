export class BoltInfoSection {
  static infoSections = [];

  constructor(el) {
    if (!el) return;
    this.el = el;
    this.toggleButton = this.el.querySelector(
      '.js-bolt-info-section-toggle-button',
    );
    if (this.toggleButton) {
      this.isExpanded =
        this.toggleButton.getAttribute('aria-expanded') === 'true';
      this.init();
    }
  }

  expandSection() {
    this.toggleButton.setAttribute('aria-expanded', true);
    this.isExpanded = true;
  }

  collapseSection() {
    this.toggleButton.setAttribute('aria-expanded', false);
    this.isExpanded = false;
  }

  init() {
    if (!BoltInfoSection.infoSections.includes(this)) {
      BoltInfoSection.infoSections.push(this);
    }

    this.toggleButton.addEventListener('click', e => {
      if (this.isExpanded) {
        this.collapseSection();
      } else {
        const otherSections = BoltInfoSection.infoSections.filter(
          section => section !== this,
        );
        otherSections.forEach(section => section.collapseSection());
        this.expandSection();
      }
    });
  }
}
