/** @jsx h */
import { withComponent, props } from 'skatejs';
import { BoltBase } from './bolt-base';
import { h, render } from 'preact';
export { default as Markup } from './preact-markup.js';
export { Fragment, h } from 'preact';

export function withPreact(Base = HTMLElement) {
  return class extends withComponent(BoltBase(Base)) {
    get props() {
      // We override props so that we can satisfy most use
      // cases for children by using a slot.
      return {
        ...super.props,
        isServer: {
          ...props.boolean,
          ...{ default: bolt.isServer },
        },
        isClient: {
          ...props.boolean,
          ...{ default: bolt.isClient },
        },
      };
    }

    constructor(...args) {
      super(...args);
    }

    renderStyles(styles) {
      if (styles) {
        return this.useShadow && <style>{styles}</style>;
      }
    }

    renderer(root, call) {
      this._renderRoot = root;
      render(
        call(),
        this._renderRoot,
      );
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
    }
  };
}
