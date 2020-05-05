import(/*  webpackChunkName: 'bolt-ul' */ './src/ul');
if (!window.customElements.get('bolt-li')) {
  import(
    /*

      webpackChunkName: 'bolt-li'
    */ '@bolt/components-li/src/li.js'
  );
}
