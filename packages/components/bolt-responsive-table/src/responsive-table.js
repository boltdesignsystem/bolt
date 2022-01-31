export class BoltResponsiveTable {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    console.log('This is a responsive-table component.');
  }
}
