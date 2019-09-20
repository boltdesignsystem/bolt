const themeClasses = [
  't-bolt-xlight',
  't-bolt-light',
  't-bolt-medium',
  't-bolt-dark',
  't-bolt-xdark',
];

/**
 * @param {Object} opt
 * @param {HTMLElement} opt.space
 * @return {string} class name added
 */
export const getClosestTheme = ({ space }) => {
  const defaultTheme = 't-bolt-light';
  let themeClass = defaultTheme;
  const themeContextEl = space.closest(`.${themeClasses.join(', .')}`);
  if (themeContextEl) {
    themeContextEl.classList.forEach(className => {
      if (themeClasses.includes(`${className}`)) {
        themeClass = className;
      }
    });
  }
  return themeClass;
};

/**
 * Watch for class changes to body or child of body found to contain any of the the bolt theme class, fire event if so.
 *
 * @return {void}
 */
export const themeMutationObserver = () => {
  // Make sure there's only one observer, and it exists as class in this browser. Yes, it works on IE 11.
  if (!MutationObserver || window.boltThemeMutationObserver) {
    return;
  }

  const observerConfig = { attributes: true, childList: true, subtree: true };

  const observerCallback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        const changedTheme = themeClasses.find(className =>
          mutation.target.classList.contains(className),
        );
        if (changedTheme) {
          const event = new CustomEvent('boltThemeHasChanged', {
            detail: changedTheme,
          });
          document.body.dispatchEvent(event);
        }
      }
    }
  };

  window.boltThemeMutationObserver = new MutationObserver(observerCallback);
  const targetNode = document.body;
  window.boltThemeMutationObserver.observe(targetNode, observerConfig);
};
