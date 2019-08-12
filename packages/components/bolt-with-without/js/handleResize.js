const handleResize = () => {
  // @TODO replace with theme token.
  const isMobile = window.matchMedia('(max-width: 1200px)').matches;
  const slideContentInner = Array.from(
    document.querySelectorAll('.c-pega-wwo__content--inner'),
  );

  if (isMobile) {
    const toggleRegionHeight = window.getComputedStyle(
      document.querySelector('.c-pega-wwo__title-and-toggle--wrapper'),
    ).height;
    slideContentInner.forEach(el => {
      el.style.paddingTop = toggleRegionHeight;
    });
  } else {
    slideContentInner.forEach(el => {
      el.style.paddingTop = 0;
    });
  }
};

export default handleResize;
