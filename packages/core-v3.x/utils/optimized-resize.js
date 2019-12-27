/**
 * This helper adds two custom resize events to the window:
 * 1. `throttledResize`: uses `requestAnimationFrame` to throttle the rate at which resize event fires
 * 2. `debouncedResize`: fires *after* user has stopped resizing (for at least 300ms)
 *
 * In most cases, `debouncedResize` will have a more drastic rate limiting effect. Whereas, `throttledResize` is a minor optimization.
 */

import { debounce } from './debounce';

(function() {
  function addThrottledEvent(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  function addDebouncedEvent(type, name, obj) {
    obj = obj || window;

    obj.addEventListener(
      type,
      debounce(function() {
        obj.dispatchEvent(new CustomEvent(name));
      }),
    );
  }

  addThrottledEvent('resize', 'throttledResize');
  addDebouncedEvent('resize', 'debouncedResize');
})();
