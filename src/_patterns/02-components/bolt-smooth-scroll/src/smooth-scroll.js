import SmoothScroll from 'smooth-scroll';

const scroll = new SmoothScroll();

const defaultScrollOffset = 0;
const defaultScrollSpeed = 500;

const customScrollElems = document.querySelectorAll('a[href*="#"]');
customScrollElems.forEach(elem => {
    const scrollElem = elem;
    const scrollOffset = scrollElem.dataset.scrollOffset ? scrollElem.dataset.scrollOffset : defaultScrollOffset;
    const scrollSpeed = scrollElem.dataset.scrollSpeed ? scrollElem.dataset.scrollSpeed : defaultScrollSpeed;

    const scrollOptions = {
        ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
        header: '.js-bolt-smooth-scroll-offset', // Selector for fixed headers (must be a valid CSS selector)

        // Speed & Easing
        speed: scrollSpeed, // Integer. How fast to complete the scroll in milliseconds
        offset: scrollOffset, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
        easing: 'easeInOutCubic', // Easing pattern to use

        // Callback API
        before: function () {}, // Callback to run before scroll
        after: function () {} // Callback to run after scroll
    };

    let scrollElemHref = scrollElem.getAttribute('href');
    scrollElemHref = scrollElemHref.replace('#', '');

    const scrollTarget = document.getElementById(scrollElemHref);

    if (scrollTarget) {
        scrollElem.addEventListener('click', function(){
            scroll.animateScroll(scrollTarget, scrollElem, scrollOptions);
        });
    }
});
