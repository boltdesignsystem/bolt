import SmoothScroll from 'smooth-scroll';

const scroll = new SmoothScroll('a[href*="#"]', {
    // Selectors
    ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
    header: null, // Selector for fixed headers (must be a valid CSS selector)

    // Speed & Easing
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    offset: 20, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
    easing: 'easeInOutCubic', // Easing pattern to use

    // Callback API
    before: function () { console.log('smooth-scroll-before') }, // Callback to run before scroll
    after: function () { console.log('smooth-scroll-after'); } // Callback to run after scroll
});

console.log(scroll);
