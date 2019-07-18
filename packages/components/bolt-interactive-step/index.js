import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-interactive-step' */ './src/interactive-step'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-two-character-chat' */ './src/two-character-chat'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-connection' */ './src/connection'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-animation-wrapper' */ './src/animation-wrapper'
  );
});
