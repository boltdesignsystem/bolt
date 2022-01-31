const responsiveTables = document.querySelectorAll('.c-bolt-responsive-table');

if (responsiveTables.length) {
  import(/* webpackChunkName: 'bolt-responsive-table' */ './src/responsive-table').then(
    ({ BoltResponsiveTable }) => {
      responsiveTables.forEach(el => {
        const responsiveTableComponent = new BoltResponsiveTable(el);
      });
    },
  );
}
