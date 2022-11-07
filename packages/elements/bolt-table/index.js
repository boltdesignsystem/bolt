const tableElements = document.querySelectorAll('.e-bolt-table');

if (tableElements.length) {
  import(/* webpackChunkName: 'bolt-table-element' */ './src/table.js').then(
    ({ BoltTableElement }) => {
      tableElements.forEach(el => {
        if (!el.parentNode.classList.contains('e-bolt-table-wrapper')) {
          const component = new BoltTableElement(el);
        }
      });
    },
  );
}
