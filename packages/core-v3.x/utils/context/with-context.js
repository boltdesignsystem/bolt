export class ContextGetter {
  constructor(el) {
    this.el = el;
    this._cache = new Map();
  }

  get(Context) {
    const ctor = this.el.constructor;

    if (
      (ctor.consumes &&
        ctor.consumes.find((ctxAndProps) => ctxAndProps[0] === Context)) ||
      (ctor.provides && ctor.provides.includes(Context))
    ) {
      if (this._cache.has(Context)) return this._cache.get(Context);

      let node = this.el;

      do {
        if (
          node.constructor.provides &&
          node.constructor.provides.includes(Context)
        ) {
          let context = node._providedContexts.get(Context);

          if (!context) {
            context = new Context();
            node._providedContexts.set(Context, context);
          }

          this._cache.set(Context, context);

          return context;
        }
      } while ((node = node.parentNode || node.host));

      // Special prop `contextIsOptional` prevents error if node.parentNode w/context is not found.
      if (!Context.contextIsOptional) {
        throw new Error('Context not found');
      }
    } else throw new Error('Not consuming or providing the specified context');
  }

  clear() {
    this._cache.clear();
  }
}

export function withContext(Base = HTMLElement) {
  return class extends Base {
    constructor(self) {
      self = super(self);

      if (self.constructor.provides) {
        self._providedContexts = new Map();
        for (const Context of self.constructor.provides) {
          if (!self._providedContexts.has(Context))
            self._providedContexts.set(Context, new Context());
        }
      }
    }

    connectedCallback() {
      super.connectedCallback && super.connectedCallback();

      if (this.constructor.consumes || this.constructor.provides) {
        this.contexts = new ContextGetter(this);
      }

      if (this.constructor.consumes) {
        this._contextCallbacks = new Map();

        for (const contextDescriptor of this.constructor.consumes) {
          const Context = contextDescriptor[0];
          const context = this.contexts.get(Context);
          const observedProps = contextDescriptor.slice(1);
          const callback = () => this.updated();
          this._contextCallbacks.set(context, callback);
          context.observe(observedProps, callback);
        }
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();

      if (this.constructor.consumes) {
        for (const [context, callback] of this._contextCallbacks)
          context.unobserve(callback);

        this._contextCallbacks = null;
        this.contexts.clear();
      }
    }
  };
}
