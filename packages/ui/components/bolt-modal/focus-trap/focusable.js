/**
 * Returns whether the element is hidden.
 * @param $elem
 */
export function isHidden($elem) {
  return (
    $elem.hasAttribute('hidden') ||
    ($elem.hasAttribute('aria-hidden') &&
      $elem.getAttribute('aria-hidden') !== 'false') ||
    // A quick and dirty way to check whether the element is hidden.
    // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
    // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
    // we won't be able to catch it here. We accept it due to the huge performance benefits.
    $elem.style.display === `none` ||
    $elem.style.opacity === `0` ||
    $elem.style.visibility === `hidden` ||
    $elem.style.visibility === `collapse`
  );
}

/**
 * Returns whether the element is disabled.
 * @param $elem
 */
export function isDisabled($elem) {
  return (
    $elem.hasAttribute('disabled') ||
    ($elem.hasAttribute('aria-disabled') &&
      $elem.getAttribute('aria-disabled') !== 'false')
  );
}

/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
export function isFocusable($elem) {
  // Discard elements that are removed from the tab order.
  if (
    $elem.getAttribute('tabindex') === '-1' ||
    isHidden($elem) ||
    isDisabled($elem)
  ) {
    return false;
  }

  return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute('tabindex') ||
    // Anchor tags or area tags with a href set
    (($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) &&
      $elem.hasAttribute('href')) ||
    // Form elements which are not disabled
    $elem instanceof HTMLButtonElement ||
    $elem instanceof HTMLInputElement ||
    $elem instanceof HTMLTextAreaElement ||
    $elem instanceof HTMLSelectElement ||
    // IFrames
    $elem instanceof HTMLIFrameElement
  );
}
