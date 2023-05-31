export class BoltTableElement {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    // 1. this.el is our table
    const table = this.el;
    // 2. returns the parent of our table
    const tableParent = table.parentNode;
    // 3. creates a new empty element in the DOM
    const tableWrapper = document.createElement('div');
    // 4. adds a class to the previously created element
    tableWrapper.classList.add('e-bolt-table-wrapper');
    // Add the full width class if the table contains the e-bolt-table--full-width class
    if (this.el.classList.contains('e-bolt-table--full-width')) {
      tableWrapper.classList.add('e-bolt-table-wrapper--full-width');
    }
    // 5. inserts our new created element (tableWrapper) to the DOM before the table. Since now it exist in the DOM but it's empty
    tableParent.insertBefore(tableWrapper, table);
    // 6. since our table already exist in the DOM, appendChild() moves it inside tableWrapper
    tableWrapper.appendChild(table);
  }
}