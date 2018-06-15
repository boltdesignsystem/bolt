import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.js';

export const smoothScroll = new SmoothScroll();

export const defaultScrollOptions = {
  ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
  header: '.js-bolt-smooth-scroll-offset', // Selector for fixed headers (must be a valid CSS selector)

  // Speed & Easing
  speed: 750, // Integer. How fast to complete the scroll in milliseconds
  offset: 45, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
  easing: 'easeInOutCubic', // Easing pattern to use

  // Callback API
  updateURL: true, // Update the URL on scroll
  popstate: true, // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)

  // Custom Events
  emitEvents: true, // Emit custom events
};



export function getScrollTarget(elem){
  let scrollElemHref = elem.getAttribute('href');
  scrollElemHref = scrollElemHref.replace('#', '');
  return document.getElementById(scrollElemHref);
}


const customScrollElems = document.querySelectorAll('a[href^="#"]');
for (var i = 0, len = customScrollElems.length; i < len; i++) {
  const scrollElem = customScrollElems[i];

  const customScrollElemTarget = scrollElem.getAttribute('href');
  const matchedScrollTarget = document.querySelectorAll(customScrollElemTarget);

  // only smooth scroll if hashed href matches with id on the page.
  if (matchedScrollTarget.length !== 0){
    // In the future, we could add support for links to modify options like scrollOffset, scrollOffset, etc.  However,
    // we should provide options carefully-- only enable these after considering whether the use case that requires them
    // is justified.
    //
    const scrollOptions = Object.assign({}, defaultScrollOptions, {
      offset: scrollElem.dataset.scrollOffset ? scrollElem.dataset.scrollOffset : defaultScrollOptions.offset,
    });

    const scrollTarget = getScrollTarget(scrollElem);

    if (scrollTarget) {
      scrollElem.addEventListener('click', function(event){
        smoothScroll.animateScroll(scrollTarget, scrollElem, scrollOptions);
      });
    }
  }
};
