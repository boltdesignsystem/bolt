import { triggerAnimateInOnInOnlyContent } from './handleActiveRegionChange';

let lastWindowHeight;
let lastWindowWidth;

const handleResize = (shouldForce = false, shouldTriggerAnims = true) => {
  return () => {
    // To fix Edge firing resize constantly.
    if (!shouldForce) {
      const heightHasChanged =
        window.innerHeight && window.innerHeight !== lastWindowHeight;
      const widthHasChanged =
        window.innerWidth && window.innerWidth !== lastWindowWidth;
      if (!widthHasChanged && !heightHasChanged) {
        return; // bail if no change.
      }
    }

    lastWindowHeight = window.innerHeight;
    lastWindowWidth = window.innerWidth;

    // @TODO replace with theme token.
    const isMobile = window.matchMedia('(max-width: 800px)').matches;
    const isDesktop = window.matchMedia('(min-width: 1201px)').matches;
    const isTablet = !isDesktop && !isMobile;

    const container = document.querySelector('.c-pega-wwo__wrapper');

    const slideContentInner = Array.from(
      document.querySelectorAll('.c-pega-wwo__content--inner'),
    );

    if (shouldTriggerAnims) {
      const activeSlideString = container.classList.contains(
        'c-pega-wwo__active-wo',
      )
        ? 'wo'
        : 'w';
      triggerAnimateInOnInOnlyContent(activeSlideString);
    }

    if (isTablet || isMobile) {
      const toggleRegionHeight = window.getComputedStyle(
        document.querySelector('.c-pega-wwo__title-and-toggle--wrapper'),
      ).height;

      const contents = document.querySelectorAll('.c-pega-wwo__content');
      let greatestHeight = 0;
      contents.forEach(el => {
        const height = parseInt(window.getComputedStyle(el).height, 10);
        greatestHeight = height > greatestHeight ? height : greatestHeight;
      });
      container.style.height = `${greatestHeight +
      parseInt(toggleRegionHeight, 10)}px`;
      slideContentInner.forEach(el => {
        el.style.paddingTop = toggleRegionHeight;
      });
    } else {
      slideContentInner.forEach(el => {
        el.style.paddingTop = 0;
      });
      container.style.height = '100%';
    }
  }
};

export default handleResize;
