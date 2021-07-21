/* eslint-disable no-return-assign */
// // Import the individual autotrack plugins you want to use.
import 'autotrack/lib/plugins/clean-url-tracker';
import 'autotrack/lib/plugins/media-query-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/page-visibility-tracker';
// import { stateListener } from '@bolt/core-v3.x/renderers/bolt-base';

// // trackedCrossDomains is an array of external domains that we want to add external GA autolink tracking to.
// // We use this to check if any components being rendered (or re-rendered) contain external links to one of these domains.
// // This allows us to automatically add the GA linker autotracking functionality to the URL, regardless on when / where / how it's being rendered.
// let trackedCrossDomains;
// try {
//   trackedCrossDomains = window.drupalSettings.google_analytics.trackCrossDomains;
// } catch {
//   trackedCrossDomains = [];
// }

// /**
//  * The tracking ID for your Google Analytics property.
//  * https://support.google.com/analytics/answer/1032385
//  */
const TRACKING_ID = 'UA-127403924-1';

// /**
//  * Bump this when making backwards incompatible changes to the tracking
//  * implementation. This allows you to create a segment or view filter
//  * that isolates only data captured with the most recent tracking changes.
//  */
const TRACKING_VERSION = '2';

// /**
//  * A default value for dimensions so unset values always are reported as
//  * something. This is needed since Google Analytics will drop empty dimension
//  * values in reports.
//  */
const NULL_VALUE = '(not set)';

// /**
//  * A mapping between custom dimension names and their indexes.
//  */
const dimensions = {
  TRACKING_VERSION: 'dimension1',
  CLIENT_ID: 'dimension2',
  WINDOW_ID: 'dimension3',
  HIT_ID: 'dimension4',
  HIT_TIME: 'dimension5',
  HIT_TYPE: 'dimension6',
  HIT_SOURCE: 'dimension7',
  VISIBILITY_STATE: 'dimension8',
  URL_QUERY_PARAMS: 'dimension9',
  BREAKPOINT: 'dimension10',
  SELECTED_PAGE: 'dimension11',
  PINNED_DEMO: 'dimension12',
};

// /**
//  * A mapping between custom metric names and their indexes.
//  */
const metrics = {
  PAGE_LOADS: 'metric1',
  PAGE_VISIBLE_TIME: 'metric2',
};

// document.addEventListener('rendered', onComponentRender);

// /**
//  * Initializes all the analytics setup. Creates trackers and sets initial
//  * values on the trackers.
//  */
export const init = () => {
  // Initialize the command queue in case analytics.js hasn't loaded yet.
  window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));
  createTracker();
  trackErrors();
  trackCustomDimensions();
  requireAutotrackPlugins();

  //   stateListener.on('change', onStateChange);
};

// // const externalDomainsToTrack = ["on24.com","brightcove.net","brightcove.com","cvent.com", "github.com"];

// function onComponentRender(e) {
//   const elem = e.target;
//   // const onStateChange = (oldState, newState, propsChanged, elem) => {
//   let destinationLink;

//   function updateComponentAnchor(trackers, anchor) {
//     var linker = new window.gaplugins.Linker(trackers[0]);
//     const destinationUrl = linker.decorate(anchor.getAttribute('href'));
//     anchor.setAttribute('href', destinationUrl);
//   }

//   function handleButtonClickAnalytics(e) {
//     // console.log(`clicked ${elem} with link`);
//     // console.log(e);
//     // e.preventDefault();
//     // console.log(`clicked ${elem} with link`);
//     // ga('linker:decorate', destinationLink);

//     var trackers = ga.getAll();
//     if (trackers.length) {
//       const renderRoot = elem.renderRoot;
//       const link = renderRoot.querySelector('a');

//       const originalUrl = link.getAttribute('href');

//       try {
//         if (
//           trackedCrossDomains.some(function(v) {
//             return originalUrl.indexOf(v) >= 0;
//           })
//         ) {
//           updateComponentAnchor(trackers, link);
//         }
//       } catch (err) {
//         // trackedCrossDomains is undefined so assuming we are tracking all external links

//         // grab the url's query string
//         var queryString = link.href.split('?')[1];
//         const urlParams = new URLSearchParams(queryString);

//         // simple check to see if the url is an external url AND doesn't already contain a _ga string
//         var a = new RegExp('/' + window.location.host + '/');
//         if (!a.test(link.href) && !urlParams.has('_ga')) {
//           // This is an external link
//           updateComponentAnchor(trackers, link);
//         }
//       }
//     }
//     // ga(function(tracker) {

//     //   // var linkerParam = tracker.get('linkerParam');

//     //   // console.log(linkerParam);
//     // });

//     // console.log(destinationLink);
//   }

//   if (elem.renderRoot) {
//     if (
//       elem.tagName === 'BOLT-BUTTON' ||
//       elem.tagName === 'BOLT-NAVLINK' ||
//       elem.tagName === 'BOLT-LINK'
//     ) {
//       destinationLink = elem.renderRoot.querySelector('a');

//       if (destinationLink) {
//         if (elem._wasInitiallyRendered) {
//           console.log('was previously rendered');
//           destinationLink.removeEventListener(
//             'click',
//             handleButtonClickAnalytics,
//           );
//         }

//         destinationLink.addEventListener('click', handleButtonClickAnalytics);
//       }
//     }
//   }
// }

// const onStateChange = (oldState, newState, propsChanged, elem) => {
//   // const onStateChange = (oldState, newState, propsChanged, elem) => {
//   // let destinationLink;
//   // onComponentRender({
//   //   target: elem,
//   // });
//   // function handleButtonClickAnalytics(e) {
//   //   console.log(`clicked ${elem} with link`);
//   //   ga('linker:decorate', destinationLink);
//   // }
//   // if (elem.renderRoot) {
//   //   if (
//   //     elem.tagName === 'BOLT-BUTTON' ||
//   //     elem.tagName === 'BOLT-NAVLINK' ||
//   //     elem.tagName === 'BOLT-LINK'
//   //   ) {
//   //     destinationLink = elem.renderRoot.querySelector('a');
//   //     if (destinationLink) {
//   //       if (elem._wasInitiallyRendered) {
//   //         destinationLink.removeEventListener(
//   //           'click',
//   //           handleButtonClickAnalytics,
//   //         );
//   //       }
//   //       destinationLink.addEventListener('click', handleButtonClickAnalytics);
//   //     }
//   //   }
//   // }
//   // // Adds click handler that decorates `destinationLink`.
//   // destinationLink.addEventListener('click', function() {
//   //   ga('linker:decorate', destinationLink);
//   // });
//   // if (changedProps.has('pinnedDemo')) {
//   // }
//   // ga('send', 'event', {
//   //     eventCategory: 'Pinned Demo',
//   //     eventAction: 'change',
//   //     eventLabel: state.pinnedDemo,
//   //   });
//   // ga('create', 'UA-XXXXX-Y', 'auto');
//   // ga('set', dimensions.SELECTED_PAGE, state.selectedPage);
//   // ga('send', {
//   //   hitType: 'pageview',
//   //   page: window.location.pathname,
//   // });
//   // ga('set', dimensions.PINNED_DEMO, state.pinnedDemo);
//   // if (changedProps.has('selectedPage')) {
//   //   ga('send', 'pageview');
//   // }
//   // if (changedProps.has('pinnedDemo')) {
//   //   ga('send', 'event', {
//   //     eventCategory: 'Pinned Demo',
//   //     eventAction: 'change',
//   //     eventLabel: state.pinnedDemo,
//   //   });
//   // }
//   // if (changedProps.has('isSidebarDragging')) {
//   //   if (!state.isSidebarDragging) {
//   //     ga('send', 'event', {
//   //       eventCategory: 'Sidebar',
//   //       eventAction: 'drag',
//   //       eventLabel: state.sidebarWidth,
//   //       eventValue: state.sidebarWidth,
//   //     });
//   //   }
//   // }
//   // if (changedProps.has('isSidebarHidden')) {
//   //   if (state.isSidebarHidden) {
//   //     ga('send', 'event', {
//   //       eventCategory: 'Sidebar',
//   //       eventAction: 'hide',
//   //     });
//   //   } else {
//   //     ga('send', 'event', {
//   //       eventCategory: 'Sidebar',
//   //       eventAction: 'show',
//   //     });
//   //   }
//   // }
//   // if (changedProps.has('isNavSidebarCollapsed')) {
//   //   if (state.isNavSidebarCollapsed) {
//   //     ga('send', 'event', {
//   //       eventCategory: 'Nav',
//   //       eventAction: 'collapse',
//   //     });
//   //   } else {
//   //     ga('send', 'event', {
//   //       eventCategory: 'Nav',
//   //       eventAction: 'uncollapse',
//   //     });
//   //   }
//   // }
//   // if (changedProps.has('isNavDrawerOpen')) {
//   //   if (state.isNavDrawerOpen) {
//   //     ga('send', 'event', {
//   //       eventCategory: 'Nav',
//   //       eventAction: 'open',
//   //     });
//   //   }
//   // }
// };

// /**
//  * Tracks a JavaScript error with optional fields object overrides.
//  * This function is exported so it can be used in other parts of the codebase.
//  * E.g.:
//  *
//  *    `fetch('/api.json').catch(trackError);`
//  *
//  * @param {(Error|Object)=} err
//  * @param {Object=} fieldsObj
//  */
export const trackError = (err = {}, fieldsObj = {}) => {
  ga(
    'send',
    'event',
    Object.assign(
      {
        eventCategory: 'Error',
        eventAction: err.name || '(no error name)',
        eventLabel: `${err.message}\n${err.stack || '(no stack trace)'}`,
        nonInteraction: true,
      },
      fieldsObj,
    ),
  );
};

/**
 * Creates the trackers and sets the default transport and tracking
 * version fields. In non-production environments it also logs hits.
 */
const createTracker = () => {
  ga('create', TRACKING_ID, 'auto', { allowLinker: true });

  ga('send', 'pageview');

  //   // Ensures all hits are sent via `navigator.sendBeacon()`.
  ga('set', 'transport', 'beacon');

  //   // Loads the Linker plugin
  ga('require', 'linker');

  let trackedDomains = [];
  try {
    trackedDomains = window.drupalSettings.google_analytics.trackCrossDomains;
  } catch {
    // default domains to track if no global data defined
    trackedDomains = window.bolt.autolink.domains || [];
  }

  if (trackedDomains.length >= 1) {
    ga('linker:autoLink', trackedDomains);
  }

  //   // Log hits in non-production environments.
  // if (process.env.NODE_ENV !== 'production') {
  //     ga('set', 'sendHitTask', function(model) {
  //       let paramsToIgnore = [
  //         'v',
  //         'did',
  //         't',
  //         'tid',
  //         'ec',
  //         'ea',
  //         'el',
  //         'ev',
  //         'a',
  //         'z',
  //         'ul',
  //         'de',
  //         'sd',
  //         'sr',
  //         'vp',
  //         'je',
  //         'fl',
  //         'jid',
  //       ];

  //       let hitType = model.get('&t');
  //       let hitPayload = model.get('hitPayload');
  //       let hit = hitPayload
  //         .split('&')
  //         .map(decodeURIComponent)
  //         .filter(item => {
  //           const [param] = item.split('=');
  //           return !(
  //             param.charAt(0) === '_' || paramsToIgnore.indexOf(param) > -1
  //           );
  //         });

  //       let parts = [model.get('&tid'), hitType];
  //       if (hitType === 'event') {
  //         parts = [
  //           ...parts,
  //           model.get('&ec'),
  //           model.get('&ea'),
  //           model.get('&el'),
  //         ];
  //         if (model.get('&ev')) parts.push(model.get('&ev'));
  //       }

  //       // eslint-disable-next-line no-console
  //       console.log(...parts, hit);
  //     });
  //   }
};

// /**
//  * Tracks any errors that may have occured on the page prior to analytics being
//  * initialized, then adds an event handler to track future errors.
//  */
const trackErrors = () => {
  // Errors that have occurred prior to this script running are stored on
  // `window.__e.q`, as specified in `index.html`.
  const loadErrorEvents = (window.__e && window.__e.q) || [];

  const trackErrorEvent = evt => {
    // Use a different eventCategory for uncaught errors.
    const fieldsObj = { eventCategory: 'Uncaught Error' };

    // Ignore the ResizeObserver loop limit exceeded error.
    // if (evt.message.includes('ResizeObserver loop limit exceeded')) {
    //   return;
    // }

    // Some browsers don't have an error property, so we fake it.
    const err = evt.error || {
      message: `${evt.message} (${evt.lineno}:${evt.colno})`,
    };

    trackError(err, fieldsObj);
  };

  // Replay any stored load error events.
  for (let evt of loadErrorEvents) {
    trackErrorEvent(evt);
  }

  // Add a new listener to track event immediately.
  window.addEventListener('error', trackErrorEvent);
};

/**
 * Sets a default dimension value for all custom dimensions on all trackers.
 */
const trackCustomDimensions = () => {
  // Sets a default dimension value for all custom dimensions to ensure
  // that every dimension in every hit has *some* value. This is necessary
  // because Google Analytics will drop rows with empty dimension values
  // in your reports.
  Object.keys(dimensions).forEach(key => {
    ga('set', dimensions[key], NULL_VALUE);
  });

  // Adds tracking of dimensions known at page load time.
  ga(tracker => {
    // const {selectedPage, pinnedDemo} = getState();
    tracker.set({
      // General dimensions
      [dimensions.TRACKING_VERSION]: TRACKING_VERSION,
      [dimensions.CLIENT_ID]: tracker.get('clientId'),
      [dimensions.WINDOW_ID]: uuid(),
      // Demo dimensions
      // [dimensions.SELECTED_PAGE]: selectedPage,
      // [dimensions.PINNED_DEMO]: pinnedDemo,
    });
  });

  // Adds tracking to record each the type, time, uuid, and visibility state
  //   // of each hit immediately before it's sent.
  ga(tracker => {
    const originalBuildHitTask = tracker.get('buildHitTask');
    tracker.set('buildHitTask', model => {
      const qt = model.get('queueTime') || 0;
      model.set(dimensions.HIT_TIME, String(new Date() - qt), true);
      model.set(dimensions.HIT_ID, uuid(), true);
      model.set(dimensions.HIT_TYPE, model.get('hitType'), true);
      model.set(dimensions.VISIBILITY_STATE, document.visibilityState, true);

      originalBuildHitTask(model);
    });
  });
};

/**
 * Requires select autotrack plugins and initializes each one with its
 * respective configuration options.
 */
const requireAutotrackPlugins = () => {
  //   ga('require', 'cleanUrlTracker', {
  //     stripQuery: true,
  //     queryDimensionIndex: getDefinitionIndex(dimensions.URL_QUERY_PARAMS),
  //     trailingSlash: 'add',
  //   });
  ga('require', 'mediaQueryTracker', {
    definitions: [
      {
        name: 'Breakpoint',
        dimensionIndex: getDefinitionIndex(dimensions.BREAKPOINT),
        items: [
          { name: 'XS', media: 'all' },
          { name: 'SM', media: '(min-width: 24em)' },
          { name: 'MD', media: '(min-width: 36em)' },
          { name: 'LG', media: '(min-width: 48em)' },
          { name: 'XL', media: '(min-width: 60em)' },
        ],
      },
    ],
  });
  ga('require', 'outboundLinkTracker', {
    linkSelector: '.c-bolt-navbar-item__link',
  });

  ga('require', 'pageVisibilityTracker', {
    sendInitialPageview: true,
    pageLoadsMetricIndex: getDefinitionIndex(metrics.PAGE_LOADS),
    visibleMetricIndex: getDefinitionIndex(metrics.PAGE_VISIBLE_TIME),
    timeZone: 'America/New_York',
    fieldsObj: { [dimensions.HIT_SOURCE]: 'pageVisibilityTracker' },
  });
};

/**
 * Accepts a custom dimension or metric and returns it's numerical index.
 * @param {string} definition The definition string (e.g. 'dimension1').
 * @return {number} The definition index.
 */
const getDefinitionIndex = definition => +/\d+$/.exec(definition)[0];

/**
 * Generates a UUID.
 * https://gist.github.com/jed/982883
 * @param {string|undefined=} a
 * @return {string}
 */
const uuid = function b(a) {
  return a
    ? // eslint-disable-next-line no-bitwise
      (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

init();
