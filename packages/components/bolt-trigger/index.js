if (!window.customElements.get('bolt-trigger')) {
  import(/*

      webpackChunkName: 'bolt-trigger'
    */ './src/trigger');
}
