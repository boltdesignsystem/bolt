import SmoothScroll from 'smooth-scroll';

// In the future, we could add support for links to modify options like scrollOffset, scrollOffset, etc.  However,
// we should provide options carefully-- only enable these after considering whether the use case that requires them
// is justified. In particular, this assumes a static navbar height, which is the case is practice, but subject to change.
const defaultScrollOffset = 45;
const defaultScrollSpeed = 750;

var scroll = new SmoothScroll('a[href^="#"]', {
  ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
  header: '.js-bolt-smooth-scroll-offset', // Selector for fixed headers (must be a valid CSS selector)

  // Speed & Easing
  offset: defaultScrollOffset, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
  speed: defaultScrollSpeed, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeInOutCubic', // Easing pattern to use

  // Callback API
  before () {}, // Callback to run before scroll
  after () {}, // Callback to run after scroll
});
