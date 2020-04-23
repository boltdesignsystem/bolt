import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /*  webpackChunkName: 'bolt-interactive-pathways' */ './src/interactive-pathways'
  );
  import(
    /*  webpackChunkName: 'bolt-interactive-pathway' */ './src/interactive-pathway'
  );
  import(
    /*  webpackChunkName: 'bolt-interactive-step' */ './src/interactive-step'
  );
  import(
    /*  webpackChunkName: 'bolt-svg-animations' */ './src/bolt-svg-animations/svg-animations'
  );
  import(/*  webpackChunkName: 'bolt-character' */ './src/character');
  import(/*  webpackChunkName: 'bolt-connection' */ './src/connection');
  import(/*  webpackChunkName: 'bolt-cta' */ './src/cta');
  import(
    /*  webpackChunkName: 'bolt-status-dialogue-bar' */ './src/status-dialogue-bar'
  );
  import(
    /*  webpackChunkName: 'bolt-two-character-layout' */ './src/two-character-layout'
  );
  import(
    /*  webpackChunkName: 'bolt-one-character-layout' */ './src/one-character-layout'
  );
  import(
    /*  webpackChunkName: 'bolt-one-character-layout' */ './src/one-character-layout'
  );
});
