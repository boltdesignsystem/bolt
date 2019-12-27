/**
 * @typedef EqualizeRelativeHeightArgItem
 *
 * @prop {HTMLElement} container
 * @prop {HTMLElement} elToEqualize
 * @prop {HTMLElement} paddingEqualizationTarget
 */

export const equalizeRelativeHeightsKey = 'boltIsEqualized';

/**
 *
 * @param {EqualizeRelativeHeightArgItem} item
 *
 * @return {boolean} if all elements on item have width.
 */
const validateItem = item => {
  const { container, elToEqualize, paddingEqualizationTarget } = item;
  return (
    !!container.offsetWidth &&
    !!paddingEqualizationTarget.offsetWidth &&
    !!elToEqualize.offsetWidth
  );
};

/**
 * Validate that all parameters passed to `equalizeRelativeHeightsParams` have
 * width.
 *
 * @param {EqualizeRelativeHeightArgItem[]} items
 *
 * @throws {Error} when container, elToEqualize, or paddingEqualizationTarget have no offsetWidth.
 */
const validateParamsForEqualizeRelativeHeights = items => {
  items.forEach((item, i) => {
    const { container, elToEqualize, paddingEqualizationTarget } = item;
    if (!validateItem(item)) {
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
 * @param {boolean} debug: whether or not to print debug info to console.
 */
export const equalizeRelativeHeights = (
  items,
  callback = null,
  shouldValidate = true,
  debug = false,
) => {
  try {
    if (shouldValidate) {
      validateParamsForEqualizeRelativeHeights(items);
    }
    let indexOfLongest = null;
    items.forEach((item, i) => {
      const { container, elToEqualize } = item;
      item.relativeOffsetTop =
        elToEqualize.getBoundingClientRect().top -
        container.getBoundingClientRect().top;
      indexOfLongest = indexOfLongest === null ? i : indexOfLongest;
      indexOfLongest =
        items[indexOfLongest].relativeOffsetTop < item.relativeOffsetTop
          ? i
          : indexOfLongest;
    });

    // Add padding to the shorter ones to equalize the height.
    items.forEach((item, i) => {
      const { paddingEqualizationTarget, relativeOffsetTop } = item;
      if (paddingEqualizationTarget[equalizeRelativeHeightsKey] === true) {
        return;
      }
      if (indexOfLongest !== i) {
        // Remove 'calc': Nested calcs in IE work fine if wrapped only in parens.
        const previousPadding = `${paddingEqualizationTarget.style.paddingTop ||
          '0px'}`.replace('calc', '');
        paddingEqualizationTarget.style.paddingTop = `calc(${items[
          indexOfLongest
        ].relativeOffsetTop - relativeOffsetTop}px + ${previousPadding})`;
      }
      paddingEqualizationTarget[equalizeRelativeHeightsKey] = true;
    });
    if (callback) {
      callback();
    }
  } catch (e) {
    console.warn(e);
    if (debug) {
      console.debug('items:', items);
    }
  }
};
