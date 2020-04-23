import(/*  webpackChunkName: 'bolt-unordered-list' */ './src/ol');

if (!window.customElements.get('bolt-li')) {
  import(
    /*
      webpackChunkName: 'bolt-li'
    */ '@bolt/components-li/src/li.js'
  );
}
