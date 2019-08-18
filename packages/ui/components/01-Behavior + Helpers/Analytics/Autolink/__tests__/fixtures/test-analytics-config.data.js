window.bolt = window.bolt || {};
window.bolt.autolink = {
  domains: ['google.com', 'brightcove.com'],
};

// or an inline script
const TRACKING_ID = 'UA-127403924-1';

// eslint-disable-next-line no-return-assign
window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

ga('create', TRACKING_ID, 'auto', { allowLinker: true });
ga('send', 'pageview');
ga('set', 'transport', 'beacon');
ga('require', 'linker');
ga('linker:autoLink', window.bolt.autolink.domains);
