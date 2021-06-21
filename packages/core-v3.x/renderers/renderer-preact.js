import { withComponent, props } from 'skatejs';
import { h, render } from 'preact';
import { BoltBase, shadow } from './bolt-base';
export { default as Markup } from './preact-markup.js';
export { Fragment, h } from 'preact';

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

export class withPreact extends BoltBase {
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
    this._renderRoot = root;
    this._preactDom = render(call(), root);
  }

  get renderRoot() {
    return super.renderRoot || shadow(this);
  }
}
