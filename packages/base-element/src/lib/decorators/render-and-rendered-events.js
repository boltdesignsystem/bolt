/**
 * A Class decorator that extends the LitElement `firstUpdated` and `updated` lifecycle events,
 * adding a `ready` and `rendered` custom events for other components to hook into
 *
 * @param {Class} clazz - The original Class to extend
 * @returns {Class} - The extended Class with added events when rendering + updating
 */
const renderEventsClass = clazz => {
  return class extends clazz {
    firstUpdated(changedProperties) {
      this._wasInitiallyRendered = true; // legacy internal prop used internally by many of Bolt's Web Components
      super.firstUpdated && super.firstUpdated(changedProperties);

      // Fired only once, when the component has finished rendering for the first time.
      this.dispatchEvent(
        new CustomEvent('ready', {
          detail: {
            name: this.tagName.toLowerCase(),
            shadowDom: this.noShadow ? false : true,
          },
          bubbles: true,
        }),
      );
    }

    updated(changedProps) {
      super.updated && super.updated(changedProps);

      this.dispatchEvent(
        new CustomEvent('rendered', {
          detail: {
            name: this.tagName.toLowerCase(),
            shadowDom: this.noShadow ? false : true,
          },
          bubbles: true,
        }),
      );
    }
  };
};

const legacyRenderEventDecorator = clazz => {
  return renderEventsClass(clazz);
};

const standardRenderEventDecorator = descriptor => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return renderEventsClass(clazz);
    },
  };
};

/**
 * Class decorator factory that adds `render` and `rendered` custom events to the LitElement-based web component
 * Automatically uses the appropriate decorator syntax based on what's supported / how the code is being compiled.
 */
export const renderAndRenderedEvents = () => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyRenderEventDecorator(classOrDescriptor)
    : standardRenderEventDecorator(classOrDescriptor);
