import { triggerAnimateInOnInOnlyContent } from './handleActiveRegionChange';

const handleResize = () => {
  // @TODO replace with theme token.
  const isMobile = window.matchMedia('(max-width: 1200px)').matches;
  const slideContentInner = Array.from(
    document.querySelectorAll('.c-pega-wwo__content--inner'),
  );
  const container = document.querySelector('.c-pega-wwo__wrapper');

  const activeSlideString = container.classList.contains(
    'c-pega-wwo__active-wo',
  )
    ? 'wo'
    : 'w';

  triggerAnimateInOnInOnlyContent(activeSlideString);

  if (isMobile) {
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
};

export default handleResize;
