// This is a hack to remove focus on the Edge browser, which draws an unmodifiable outline around checkboxes.

const blurEdgeFocus = () => {
  if (navigator.userAgent.indexOf('Edge') >= 0) {
    document.activeElement.blur();
  }
};

export default blurEdgeFocus;
