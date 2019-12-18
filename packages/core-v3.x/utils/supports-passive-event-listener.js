/* Feature detection for passive event listeners to improve scrolling performance in browsers supporting it (ie. Chrome) - test based off of https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners */

let isPassiveSupported = false;

try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get() {
        isPassiveSupported = true;
        return true;
      },
    }),
  );
} catch (err) {}

export const passiveSupported = isPassiveSupported;
