// Note: These modules are included everywhere, so keep it light. Otherwise,
// consider adding to a component where JS will be loaded only when needed.
import ClickHandler from './src/click-handler';
import Calculator from './src/calculator';

const Modules = { ClickHandler, Calculator };
const elements = document.querySelectorAll('[data-module]');

/**
 * Instantiates a Class on DOM element with matching`[data-module]` attribute.
 * @example
 * // Instantiates Class `Foo()` on `<div>`
 * <div data-module="Foo"></div>
 */
Array.from(elements).forEach(el => {
  const Module = Modules[el.dataset.module];
  if (typeof Module === 'function') {
    const dataModule = new Module(el);
  }
});
