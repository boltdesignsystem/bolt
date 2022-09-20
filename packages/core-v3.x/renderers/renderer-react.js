import { withComponent, props } from 'skatejs';
import { createElement as h } from 'react';
import { createRoot } from 'react-dom/client';
import { BoltBase, shadow } from './bolt-base';

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

export class withReact extends BoltBase {
  get props() {
    // We override props so that we can satisfy most use
    // cases for children by using a slot.
    return _extends({}, super.props, {
      isServer: {
        ...props.boolean,
        ...{ default: bolt.isServer },
      },
      isClient: {
        ...props.boolean,
        ...{ default: bolt.isClient },
      },
      children: h('slot', null),
    });
  }

  renderStyles(styles) {
    if (styles) {
      return this.useShadow && <style>{styles}</style>;
    }
  }

  renderer(root, call) {
    if (!this.reactRoot) {
      this.reactRoot = createRoot(root);
    }

    // Note: I don't know if `this._renderRoot` is ever used
    this._renderRoot = root;

    // Note: I don't know if `this._reactDom` is ever used, BUT
    // `this.reactRoot.render(call())` is what renders our React component.
    this._reactDom = this.reactRoot.render(call());
  }

  get renderRoot() {
    return super.renderRoot || shadow(this);
  }
}
