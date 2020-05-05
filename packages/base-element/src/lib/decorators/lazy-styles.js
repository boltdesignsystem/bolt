import styleInjector from '../style-injector';

/**
 * A Class decorator that automatically renders to the Light DOM if/when Shadow DOM is unsupported
 *
 * @returns {Class} - The extended Class with an updated createRenderRoot method + hooks to opt out of rendering to Shadow DOM even after initially rendering
 */
const lazyStylesClass = clazz => {
  return class extends clazz {
    connectedCallback() {
      super.connectedCallback && super.connectedCallback();

      this.lazyStyles = this.constructor.lazyStyles;

      if (this.lazyStyles && this.noShadow) {
        styleInjector(...this.lazyStyles).add();
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();

      if (this.lazyStyles && this.noShadow) {
        styleInjector(...this.lazyStyles).remove();
      }
    }
  };
};

/**
 * A conditional Shadow DOM decorator for the old (legacy) decorator syntax
 */
const legacyLazyStyles = clazz => {
  return lazyStylesClass(clazz);
};

/**
 * A conditional Shadow DOM decorator for the new decorator syntax
 */
const standardLazyStyles = descriptor => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return lazyStylesClass(clazz);
    },
  };
};

/**
 * Class decorator factory that defines the decorated class as a custom element.
 */
export const lazyStyles = () => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyLazyStyles(classOrDescriptor)
    : standardLazyStyles(classOrDescriptor);
