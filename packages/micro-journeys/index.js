import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-interactive-pathways' */ './src/interactive-pathways'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-interactive-pathway' */ './src/interactive-pathway'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-interactive-step' */ './src/interactive-step'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-svg-animations' */ './src/bolt-svg-animations/svg-animations'
    );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-character' */ './src/character'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-connection' */ './src/connection'
  );
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-cta' */ './src/cta');
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-status-dialogue-bar' */ './src/status-dialogue-bar'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-icon-group' */ './src/icon-group'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-two-character-layout' */ './src/two-character-layout'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-one-character-layout' */ './src/one-character-layout'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-one-character-layout' */ './src/one-character-layout'
    );
});
