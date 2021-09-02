const dialogs = document.querySelectorAll('.c-bolt-dialog');

if (dialogs.length) {
  import(/* webpackChunkName: 'bolt-dialog' */ './src/dialog').then(
    ({ BoltDialog }) => {
      dialogs.forEach(el => {
        const dialogComponent = new BoltDialog(el);
      });
    },
  );
}
