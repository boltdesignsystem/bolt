export class BoltInfoSection {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    console.log('This is a info-section component.');
  }
}
