const pierceShadowDomEls = mainWrapper => {
  // Push it to the end of the stack, after shadowdom render.
  setTimeout(() => {
    const elsToSetFullHeight = Array.from(
      mainWrapper.querySelectorAll('.c-pega-wwo__shadow-height-inherit'),
    );
    elsToSetFullHeight.forEach(el => {
      const shadowChild = Array.from(el.renderRoot.children).find(el =>
        el.classList.contains('c-bolt-animate'),
      );
      shadowChild.style.height = 'inherit';
    });

    mainWrapper
      .querySelectorAll('.c-pega-wwo__shadow-height-full')
      .forEach(el => {
        const shadowChild = Array.from(el.renderRoot.children).find(el =>
          el.classList.contains('c-bolt-animate'),
        );
        shadowChild.style.height = '100%';
      });

    // @TODO fix this.
    mainWrapper
      .querySelectorAll('.c-pega-wwo__title bolt-animate')
      .forEach(el => {
        const shadowChild = Array.from(el.renderRoot.children).find(el =>
          el.classList.contains('c-bolt-animate'),
        );
        shadowChild.style.zIndex = 12;
      });
  }, 0);
};

export default pierceShadowDomEls;
