/**
 * @typedef EqualizeRelativeHeightArgItem
 *
 * @prop {HTMLElement} container
 * @prop {HTMLElement} elToEqualize
 * @prop {HTMLElement} paddingEqualizationTarget
 */

/**
 * Validate that all parameters passed to `equalizeRelativeHeightsParams` have
 * width.
 *
 * @param {EqualizeRelativeHeightArgItem[]} items
 *
 * @throws {Error} when container, elToEqualize, or paddingEqualizationTarget have no offsetWidth.
 */
export const validateParamsForEqualizeRelativeHeights = items => {
  items.forEach((item, i) => {
    const { container, elToEqualize, paddingEqualizationTarget } = item;
    if (
      !container.offsetWidth ||
      !paddingEqualizationTarget.offsetWidth ||
      !elToEqualize.offsetWidth
    ) {
      throw new Error(
        `Element provided to equalizeRelativeHeights has no width. container: ${container.offsetWidth}, elToEqualize: ${elToEqualize.offsetWidth}, paddingEqualizationTarget: ${paddingEqualizationTarget.offsetWidth}`,
      );
    }
  });
};

/**
 * Equalize the height of 2+ `elToEqualize` relative to `container` by
 * adding top padding to `paddingEqualizationTarget`.
 * Note: sets a new dom property relativeOffsetTop on container.
 *
 * @param {EqualizeRelativeHeightArgItem[]} items
 * @param {function|null} callback: optional callback to call after success.
 * @param {boolean} shouldValidate: whether or not to validate all item properties with validateParamsForEqualizeRelativeHeights.
 */
export const equalizeRelativeHeights = (
  items,
  callback = null,
  shouldValidate = true,
) => {
  try {
    if (shouldValidate) {
      validateParamsForEqualizeRelativeHeights(items);
    }
    let indexOfLongest = null;
    items.forEach((item, i) => {
      const { container, elToEqualize } = item;
      item.relativeOffsetTop =
        elToEqualize.getBoundingClientRect().y -
        container.getBoundingClientRect().y;
      indexOfLongest = indexOfLongest === null ? i : indexOfLongest;
      indexOfLongest =
        items[indexOfLongest].relativeOffsetTop < item.relativeOffsetTop
          ? i
          : indexOfLongest;
    });

    // Add padding to the shorter ones to equalize the height.
    items.forEach((item, i) => {
      if (indexOfLongest !== i) {
        const { paddingEqualizationTarget, relativeOffsetTop } = item;
        // Remove 'calc': Nested calcs in IE work fine if wrapped only in parens.
        const previousPadding = `${paddingEqualizationTarget.style.paddingTop ||
          '0px'}`.replace('calc', '');
        paddingEqualizationTarget.style.paddingTop = `calc(${items[
          indexOfLongest
        ].relativeOffsetTop - relativeOffsetTop}px + ${previousPadding})`;
      }
    });
    if (callback) {
      callback();
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Attempt to trigger equalizeRelativeHeights `tryLimit` number of times. This
 * is to make sure elements have actually been added to the DOM before we
 * rely on their height and width.
 *
 * @param {EqualizeRelativeHeightArgItem[]} items
 * @param {function|null} callback: optional callback to call after success.
 * @param {number} tryCount: the number of times attempted already.
 * @param {number} tryLimit: the number of times to try to validate before erroring out.
 * @param {boolean} debug: whether or not to print debug info to console.
 */
export const persistentlyAttemptToEqualizeRelativeHeights = (
  items,
  callback,
  tryCount = 0,
  tryLimit = 3,
  debug = false,
) => {
  try {
    validateParamsForEqualizeRelativeHeights(items);
    equalizeRelativeHeights(items, callback, false);
  } catch (e) {
    tryCount++;
    if (debug) {
      console.debug(
        `debug:persistentlyAttemptToEqualizeRelativeHeights:tryCount: ${tryCount}`,
        items,
      );
    }
    if (tryCount <= tryLimit) {
      window.requestAnimationFrame(() => {
        persistentlyAttemptToEqualizeRelativeHeights(items, callback, tryCount);
      });
    } else {
      // Simply call it to trigger error if tryLimit was reached.
      equalizeRelativeHeights(items, true);
    }
  }
};
