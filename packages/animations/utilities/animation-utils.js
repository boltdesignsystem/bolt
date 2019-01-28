import debounce from 'lodash.debounce';

/**
 * @return {boolean}
 */
export function inIframe() {
  return window.location !== window.parent.location;
}

/**
 * Get array of HTMLElements from CSS selector
 * Fires `document.querySelectorAll` but returns an Array instead of a NodeList
 * @param {string} selector
 * @return {HTMLElement[]}
 */
export function query(selector) {
  return [].slice.call(document.querySelectorAll(selector));
}

/**
 * Trigger animations on this element.
 * Adds data attribute and triggers event handlers
 * @param {HTMLElement} el - The element
 * @todo trigger event `anim-trigger`
 */
export function triggerAnimation(el) {
  if (el.getAttribute('data-anim-triggered') !== 'yes') {
    // console.log(`triggering...`);
    el.setAttribute('data-anim-triggered', 'yes');

    // if (window.CustomEvent) {
    //   const event = new CustomEvent('anim-trigger', {detail: {some: 'data'}});
    // } else {
    //   const event = document.createEvent('CustomEvent');
    //   event.initCustomEvent('anim-trigger', true, true, {some: 'data'});
    // }
    //
    // el.dispatchEvent(event);
  }
}

/**
 * @param {HTMLElement} el - The element
 * @return {boolean}
 */
export function isElementInViewport(el) {
  // const isInIframe = inIframe();
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const {
    innerHeight,
    innerWidth,
    top: { innerHeight: clientHeight, innerWidth: clientWidth },
  } = window;
  // console.table({
  //   isInIframe,
  //   top,
  //   left,
  //   bottom,
  //   right,
  //   innerHeight,
  //   innerWidth,
  //   clientHeight,
  //   clientWidth,
  // });

  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= (innerHeight || clientHeight) &&
    right <= (innerWidth || clientWidth)
  );
}

/**
 * @param {HTMLElement[]} items
 */
export function triggerVisibleAnimations(items) {
  items.forEach(item => {
    if (isElementInViewport(item)) {
      // console.log('is Visible');
      triggerAnimation(item);
    } else {
      // console.log('is NOT Visible');
    }
  });
}

export function watchForOnViewAnims() {
  const elementsToTrigger = query('[data-anim-trigger="view"]');
  if (!elementsToTrigger.length > 0) {
    return;
  }
  const doIt = debounce(() => triggerVisibleAnimations(elementsToTrigger), 300);

  // placing function call at bottom of call stack so other function can finish up first
  setTimeout(doIt, 0);

  window.top.document.addEventListener('scroll', () => {
    doIt();
  });
  document.addEventListener('resize', () => {
    doIt();
  });
}
