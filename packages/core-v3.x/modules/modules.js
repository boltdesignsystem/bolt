// Reminder: These modules are included everywhere, intended to be lightweight.
import ClickHandler from './src/click-handler';

const modules = {
  'click-handler': ClickHandler,
};
const elements = document.querySelectorAll('[data-bolt-module]');

/**
 * Instantiates a Class on DOM element with matching kebab-case `[data-bolt-module]` attribute.
 * @example
 * // Instantiates Class `Foo()` on `<div>`
 * <div data-module="foo"></div>
 */
Array.from(elements).forEach(el => {
  const Module = modules[el.dataset.boltModule];
  if (typeof Module === 'function') {
    const dataModule = new Module(el);
  }
});
