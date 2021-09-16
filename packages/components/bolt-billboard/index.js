const billboards = document.querySelectorAll('.c-bolt-billboard');

if (billboards.length) {
  import(/* webpackChunkName: 'bolt-billboard' */ './src/billboard').then(
    ({ BoltBillboard }) => {
      billboards.forEach(el => {
        const billboardComponent = new BoltBillboard(el);
      });
    },
  );
}
