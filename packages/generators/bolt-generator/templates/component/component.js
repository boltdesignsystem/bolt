export class Bolt{{ pascalCase name }} {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    console.log('This is a {{ name }} component.');
  }
}
