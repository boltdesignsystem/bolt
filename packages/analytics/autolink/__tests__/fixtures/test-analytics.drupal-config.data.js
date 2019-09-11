// example configuration of how data used to mock up the GA config getting used in Drupal
window.drupalSettings = {
  google_analytics: {
    trackCrossDomains: ['web.dev'],
  },
};

const TRACKING_ID = 'UA-127403924-1';

// eslint-disable-next-line no-return-assign
window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

ga('create', TRACKING_ID, 'auto', { allowLinker: true });
ga('send', 'pageview');
ga('set', 'transport', 'beacon');
ga('require', 'linker');
ga('linker:autoLink', window.drupalSettings.google_analytics.trackCrossDomains);
