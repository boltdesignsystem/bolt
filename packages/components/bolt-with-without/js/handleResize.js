const handleResize = () => {
  // @TODO replace with theme token.
  const isMobile = window.matchMedia('(max-width: 1200px)').matches;
  const slideContentInner = Array.from(
    document.querySelectorAll('.c-pega-wwo__content--inner'),
  );
  const slidesContainer = document.querySelector(
    '.c-pega-wwo__swiper-container-wrapper',
  );

  if (isMobile) {
    const toggleRegionHeight = window.getComputedStyle(
      document.querySelector('.c-pega-wwo__title-and-toggle--wrapper'),
    ).height;
    const contentHeight = window.getComputedStyle(
      document.querySelector('.c-pega-wwo__content'),
    ).height;
    slideContentInner.forEach(el => {
      el.style.paddingTop = toggleRegionHeight;
    });
    slidesContainer.style.height = `${parseInt(contentHeight, 10) +
      parseInt(toggleRegionHeight, 10)}px`;
  } else {
    slideContentInner.forEach(el => {
      el.style.paddingTop = 0;
    });
    slidesContainer.style.height = '100%';
  }
};

export default handleResize;
