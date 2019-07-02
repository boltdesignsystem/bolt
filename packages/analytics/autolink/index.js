import URLSearchParams from '@ungap/url-search-params'; // URLSearchParams poly for older browsers

// trackedCrossDomains is an array of external domains that we want to add external GA autolink tracking to.
// We use this to check if any components being rendered (or re-rendered) contain external links to one of these domains.
// This allows us to automatically add the GA linker autotracking functionality to the URL, regardless on when / where / how it's being rendered.
window.bolt = window.bolt || {};
window.bolt.autolink = window.bolt.autolink || {};

/**
 * @typedef {object} MouseEvent - click event
 * @typedef {object} CustomEvent - the custom event fired by a web component
 * @typedef {object} HTMLElement - HTML DOM node
 */

/**
 * @param  {array} trackers - an array of one or more GA trackers (ex. ga.getAll()); only the first gets used.
 * @param {HTMLElement} link- the specific anchor tag to decorate with GA's autolink query string
 */
function updateComponentAnchor(trackers, link) {
  // grab the url's query string
  var queryString = link.href.split('?')[1];
  const urlParams = new URLSearchParams(queryString);

  // simple check to see if the url is an external url AND doesn't already contain a _ga string. If so, auto decorate the link's href and update.
  var a = new RegExp('/' + window.location.host + '/');
  if (!a.test(link.href) && !urlParams.has('_ga')) {
    // This is an external link
    const linker = new window.gaplugins.Linker(trackers[0]);
    const destinationUrl = linker.decorate(link.href);
    link.setAttribute('href', destinationUrl);
  }
}

/**
 * @param  {MouseEvent} e - the mouse event fired
 * @param  {HTMLElement} elem - the bolt component being clicked on
 */
function handleClickTracking(e, elem) {
  let link;

  // make sure we have a reference to the link being clicked
  if (elem.renderRoot) {
    const renderRoot = elem.renderRoot;
    link = renderRoot.querySelector('a'); // reference to the component (which may or may not be the actual link) being clicked
  } else {
    link = e.target;
  }
  const trackers = ga.getAll();

  try {
    window.bolt.autolink.domains =
      window.drupalSettings.google_analytics.trackCrossDomains;
  } catch {
    // default domains to track if no global data defined
    window.bolt.autolink.domains = window.bolt.autolink.domains || [];
  }

  // make sure trackers exist + the click target is a link with an href
  if (trackers.length && link && link.href) {
    // if the trackedCrossDomains config exists, only update links with urls that point to one of these external domains.
    // if not, apply GA autolink behavior to all external links
    try {
      if (
        window.bolt.autolink.domains.some(function(v) {
          return link.href.indexOf(v) >= 0;
        })
      ) {
        updateComponentAnchor(trackers, link);
      }
    } catch (err) {
      // trackedCrossDomains is likely undefined so assume we're tracking all external links
      updateComponentAnchor(trackers, link);
    }
  }
}

/**
 * @param  {CustomEvent} e - the Bolt component's custom 'rendered' event fired
 */
function onComponentRender(e) {
  // return early if GA's gaplugins and GA doesn't exist.
  if (!window.gaplugins && !window.ga) {
    return;
  }

  // get a reference to the main Bolt component that's rendering / re-rendering.
  const elem = e.target;

  // ignore components not yet booted up
  if (elem.renderRoot) {
    // check to see if the component even contains a link that would require click tracking
    // NOTE: this check could be adjusted to target only specific Bolt components
    // ex. if elem.tagName === 'BOLT-BUTTON' || elem.tagName === 'BOLT-NAVLINK' || elem.tagName === 'BOLT-LINK'
    const hasInternalAnchor = elem.renderRoot.querySelector('a');

    if (hasInternalAnchor) {
      // remove event listeners if the component had previously rendered.
      if (elem._wasInitiallyRendered) {
        elem.removeEventListener('click', e => handleClickTracking(e, elem));
      }

      elem.addEventListener('click', e => handleClickTracking(e, elem));
    }
  }
}

document.addEventListener('rendered', onComponentRender);
