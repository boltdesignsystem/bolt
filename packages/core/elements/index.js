import { polyfillLoader } from '../polyfills';

polyfillLoader.then(res => {
  if (!window.customElements.get('replace-with-children')) {
    import(
      /* 
      webpackMode: 'eager', 
      webpackChunkName: 'replace-with-children' 
    */ './replace-with-children'
    );
  }

  if (!window.customElements.get('replace-with-grandchildren')) {
    import(
      /*
      webpackMode: 'eager',
      webpackChunkName: 'replace-with-grandchildren'
    */ './replace-with-grandchildren'
    );
  }

  if (!window.customElements.get('ssr-keep')) {
    import(
      /*
      webpackMode: 'eager',
      webpackChunkName: 'ssr-keep'
    */ './ssr-keep'
    );
  }

  if (!window.customElements.get('bolt-action')) {
    import(
      /*
      webpackMode: 'eager',
      webpackChunkName: 'bolt-action'
    */ './bolt-action'
    );
  }
});
