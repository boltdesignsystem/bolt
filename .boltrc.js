const path = require('path');

const config = {
  openServerAtStart: true,
  env: 'drupal',
  buildDir: './www/build',
  dataDir: './www/build/data',
  wwwDir: './www',
  startPath: '/',
  verbosity: 2,
  webpackDevServer: {
    enabled: true,
  },
  sourceMaps: false,
  enableCache: false,
  components: {
    global: [
      {
        name: 'global',
        scss: require.resolve('@bolt/global/styles/index.scss'),
      },
      {
        name: 'core',
        scss: require.resolve('@bolt/core/styles/index.scss'),
      },
      {
        name: 'icon',
        scss: require.resolve('@bolt/components-icon/src/icon.scss'),
      },
      {
        name: 'text',
        scss: require.resolve('@bolt/components-text/index.scss'),
      },
      {
        name: 'dropdown',
        scss: require.resolve('@bolt/components-dropdown/dropdown.scss'),
      },
      {
        name: 'page',
        scss: require.resolve('@bolt/components-page-footer/page-footer.scss'),
      },
      {
        name: 'image',
        scss: require.resolve('@bolt/components-image/index.scss'),
      },
      {
        name: 'trigger',
        scss: require.resolve('@bolt/components-trigger/index.scss'),
      },
      {
        name: 'grid',
        scss: require.resolve('@bolt/components-grid/index.scss'),
      },
      {
        name: 'tooltip',
        scss: require.resolve('@bolt/components-tooltip/index.scss'),
      },
      {
        name: 'figure',
        scss: require.resolve('@bolt/components-figure/index.scss'),
      },
      {
        name: 'logo',
        scss: require.resolve('@bolt/components-logo/src/logo.scss'),
      },
      { name: 'ol', scss: require.resolve('@bolt/components-ol/index.scss') },
      {
        name: 'link',
        scss: require.resolve('@bolt/components-link/index.scss'),
      },
      {
        name: 'sticky',
        scss: require.resolve('@bolt/components-sticky/src/sticky.scss'),
      },
      {
        name: 'carousel',
        scss: require.resolve('@bolt/components-carousel/index.scss'),
      },
      {
        name: 'pagination',
        scss: require.resolve('@bolt/components-pagination/index.scss'),
      },
      {
        name: 'site',
        scss: require.resolve('@bolt/components-site/site.scss'),
      },
      {
        name: 'navbar',
        scss: require.resolve('@bolt/components-navbar/src/navbar.scss'),
      },
      {
        name: 'video',
        scss: require.resolve('@bolt/components-video/index.scss'),
      },
      {
        name: 'background',
        scss: require.resolve(
          '@bolt/components-background/src/background.scss',
        ),
      },
      {
        name: 'list',
        scss: require.resolve('@bolt/components-list/index.scss'),
      },
      {
        name: 'headline',
        scss: require.resolve('@bolt/components-headline/src/headline.scss'),
      },
      {
        name: 'band',
        scss: require.resolve('@bolt/components-band/index.scss'),
      },
      {
        name: 'accordion',
        scss: require.resolve('@bolt/components-accordion/index.scss'),
      },
      {
        name: 'chip',
        scss: require.resolve('@bolt/components-chip/index.scss'),
      },
      { name: 'ul', scss: require.resolve('@bolt/components-ul/index.scss') },
      {
        name: 'share',
        scss: require.resolve('@bolt/components-share/index.scss'),
      },
      {
        name: 'breadcrumb',
        scss: require.resolve(
          '@bolt/components-breadcrumb/src/breadcrumb.scss',
        ),
      },
      {
        name: 'stack',
        scss: require.resolve('@bolt/components-stack/index.scss'),
      },
      {
        name: 'modal',
        scss: require.resolve('@bolt/components-modal/index.scss'),
      },
      {
        name: 'teaser',
        scss: require.resolve('@bolt/components-teaser/src/teaser.scss'),
      },
      {
        name: 'form',
        scss: require.resolve('@bolt/components-form/src/form.scss'),
      },
      { name: 'li', scss: require.resolve('@bolt/components-li/index.scss') },
      {
        name: 'blockquote',
        scss: require.resolve('@bolt/components-blockquote/index.scss'),
      },
      {
        name: 'navlink',
        scss: require.resolve('@bolt/components-navlink/navlink.scss'),
      },
      {
        name: 'placeholder',
        scss: require.resolve('@bolt/components-placeholder/placeholder.scss'),
      },
      {
        name: 'button',
        scss: require.resolve('@bolt/components-button/index.scss'),
      },
      {
        name: 'card',
        scss: require.resolve('@bolt/components-card/src/card.scss'),
      },
      {
        name: 'table',
        scss: require.resolve('@bolt/components-table/index.scss'),
      },
      {
        name: 'ratio',
        scss: require.resolve('@bolt/components-ratio/index.scss'),
      },
      {
        name: 'search-filter',
        scss: require.resolve(
          '@bolt/components-search-filter/search-filter.scss',
        ),
      },
      {
        name: 'device-viewer',
        scss: require.resolve(
          '@bolt/components-device-viewer/src/device-viewer.scss',
        ),
      },
      {
        name: 'button-group',
        scss: require.resolve(
          '@bolt/components-button-group/src/button-group.scss',
        ),
      },
      {
        name: 'nav-priority',
        scss: require.resolve(
          '@bolt/components-nav-priority/nav-priority.scss',
        ),
      },
      {
        name: 'block-list',
        scss: require.resolve(
          '@bolt/components-block-list/src/block-list.scss',
        ),
      },
      {
        name: 'code-snippet',
        scss: require.resolve(
          '@bolt/components-code-snippet/src/code-snippet.scss',
        ),
      },
      {
        name: 'copy-to',
        scss: require.resolve(
          '@bolt/components-copy-to-clipboard/src/copy-to-clipboard.scss',
        ),
      },
      {
        name: 'nav-indicator',
        scss: require.resolve(
          '@bolt/components-nav-indicator/nav-indicator.scss',
        ),
      },
      {
        name: 'background-shapes',
        scss: require.resolve(
          '@bolt/components-background-shapes/src/background-shapes.scss',
        ),
      },
      {
        name: 'critical-fonts',
        scss: require.resolve(
          '@bolt/components-critical-fonts/src/critical-fonts.scss',
        ),
      },
      {
        name: 'page-header',
        scss: require.resolve(
          '@bolt/components-page-header/src/page-header.scss',
        ),
      },
      {
        name: 'action-blocks',
        scss: require.resolve('@bolt/components-action-blocks/index.scss'),
      },
      {
        name: 'docs-site',
        scss: require.resolve('./docs-site/src/index.scss'),
      }
    ],
    individual: [],
  }
};

config.copy = [
  {
    from: path.join(__dirname, 'public/index.html'),
    to: path.join(
      __dirname,
      config.wwwDir,
    ),
    flatten: true,
  }
];

module.exports = config;
