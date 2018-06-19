import SmoothScroll from 'smooth-scroll/src/js/smooth-scroll.js';
import { isValidSelector } from '@bolt/core';

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


// Find all possible hash links on the page that COULD be smooth scrollable
// note: because you can't use regex in querySelectors, we instead find all hash-links
const customScrollElems = document.querySelectorAll('a[href^="#"]');

//convert our NodeList to an array (can't filter otherwise)
const customScrollElemsArray = Array.from(customScrollElems);

// go through our array of results and filter out only the ones that are valid selectors. // in this case, valid selectors = valid HTML5 id names which omits hash bang links, etc.
let filteredCustomScrollElems = customScrollElemsArray.filter(element => isValidSelector(element.getAttribute('href')));

for (var i = 0, len = filteredCustomScrollElems.length; i < len; i++) {
  const scrollElem = filteredCustomScrollElems[i];

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
