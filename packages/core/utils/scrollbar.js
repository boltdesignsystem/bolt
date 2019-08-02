/**
 * Determine whether or not the BODY has a visible scrollbar
 * @returns {Boolean} - Returns true if element has scrollbar
 */
export const bodyHasScrollbar = () => {
  const bodyRect = document.body.getBoundingClientRect();
  return bodyRect.left + bodyRect.right < window.innerWidth;
};

// https://davidwalsh.name/detect-scrollbar-width
/**
 * Get scrollbar width by temporarily adding element with scrollbar to page then removing it
 * @returns {number} - Width of the scrollbar in pixels, without unit, e.g 15
 */
export const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'c-bolt-modal__scrollbar-measure';
  scrollDiv.style.cssText =
    'position: absolute; top: -9999px; width: 100px; height: 100px; overflow: scroll;';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth =
    scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

// Technique inspired by Bootstrap Modal: https://github.com/twbs/bootstrap/blob/master/js/src/modal/modal.js
/**
 * Set padding on a given element equal to the browser's scrollbar width, used to prevent content shifting when scrollbars are turned off, e.g. when a modal opens
 * @param {HTMLElement} element - The target element
 * @param {(string\|number)} scrollbarWidth - The scrollbar width, with or without unit, e.g. 15 or 15px
 */
export const setScrollbarPadding = (element, scrollbarWidth) => {
  if (!element) {
    return;
  }

  const originalPaddingRight = element.style.paddingRight;
  const calculatedPadding = window.getComputedStyle(element)['padding-right'];

  // Save original padding value for later
  element.originalPaddingRight = originalPaddingRight;
  element.style.paddingRight =
    parseFloat(calculatedPadding) + scrollbarWidth + 'px';
};

/**
 * Reset padding on a given element, will remove current padding style and restore original padding style if necessary, used after modal closes
 * @param {HTMLElement} element - The target element
 */
export const resetScrollbarPadding = element => {
  if (!element) {
    return;
  }

  if (typeof element.originalPaddingRight === 'undefined') {
    element.style.paddingRight = '';
  } else {
    element.style.paddingRight = element.originalPaddingRight; // Restore original padding value
  }
};
