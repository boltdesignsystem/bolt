import {
  observeContext,
  unobserveContext,
  registerProvidedContext,
  notifyContextChange,
} from './wc-context.core';

const initializedElements = new WeakSet();

const withContext = Base => {
  return class extends Base {
    get context() {
      // eslint-disable-next-line no-return-assign
      return this.__wcContext || (this.__wcContext = {});
    }

    connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      const observedContexts = this.constructor.observedContexts;
      if (observedContexts) {
        observedContexts.forEach(context => observeContext(this, context));
      }

      if (!initializedElements.has(this)) {
        const providedContextConfigs = this.constructor.providedContexts;
        if (providedContextConfigs) {
          const providedContexts =
            this.__wcProvidedContexts || (this.__wcProvidedContexts = {});
          const mappedProps =
            this.__wcMappedProps || (this.__wcMappedProps = {});
          Object.keys(providedContextConfigs).forEach(name => {
            const config = providedContextConfigs[name];
            const property =
              typeof config === 'string' ? config : config.property;
            providedContexts[name] = property ? this[property] : config.value;
            if (property) {
              mappedProps[name] = property;
            }
            registerProvidedContext(this, name, providedContexts);
          });
        }
        initializedElements.add(this);
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
      const observedContexts = this.constructor.observedContexts;
      if (observedContexts) {
        observedContexts.forEach(context => unobserveContext(this, context));
      }
    }

    updated(props) {
      super.updated && super.updated(props);
      const mappedProps = this.__wcMappedProps;
      if (mappedProps) {
        const providedContexts =
          this.__wcProvidedContexts || (this.__wcProvidedContexts = {});
        Object.keys(mappedProps).forEach(contextName => {
          const property = mappedProps[contextName];
          if (property in props) {
            const value = this[property];
            providedContexts[contextName] = value;
            notifyContextChange(this, contextName, value);
          }
        });
      }
    }
  };
};

export { withContext };
