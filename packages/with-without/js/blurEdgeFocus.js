// This is a hack to remove focus on the Edge browser, which draws an unmodifiable outline around checkboxes.

const blurEdgeFocus = () => {
  if (
    navigator.userAgent.indexOf('Edge') >= 0 &&
    window.matchMedia('(any-hover: hover)').matches
  ) {
    document.activeElement.blur();
  }
};

export default blurEdgeFocus;
