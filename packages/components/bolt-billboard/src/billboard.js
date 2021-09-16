export class BoltBillboard {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    console.log('This is a billboard component.');
  }
}
