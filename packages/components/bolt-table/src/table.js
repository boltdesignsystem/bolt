export class BoltResponsiveTable {
  constructor(el) {
    if (!el) return;
    this.el = el;
  }
}

const responsiveTable = document.querySelectorAll('.js-bolt-table');

responsiveTable.forEach(el => {
  const component = new BoltResponsiveTable(el);
});
