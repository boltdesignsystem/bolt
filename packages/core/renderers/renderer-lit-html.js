import { html, render } from 'lit-html';
import { withChildren, withLifecycle, withUpdate, withRenderer } from 'skatejs';
import { withContext } from 'wc-context/skatejs';

import {
  withComponent,
  shadow,
  props,
  hasNativeShadowDomSupport,
  findParentTag,
} from '../utils';
import { BoltBase } from './bolt-base';

export { html, render } from 'lit-html';

export const withLit = (Base = HTMLElement) =>
  class extends Base {
    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline links

    static props = {
      onClick: props.string,
      onClickTarget: props.string,
      isServer: {
        ...props.boolean,
        ...{ default: bolt.isServer },
      },
      isClient: {
        ...props.boolean,
        ...{ default: bolt.isClient },
      },
    };

    constructor(...args) {
      super(...args);
    }

    renderStyles(styles) {
      if (styles) {
        // [1]
        // prettier-ignore
        return html`<style>${styles}</style>`;
      }
    }

    slot(name) {
      if (typeof this.slots[name] === 'undefined') {
        this.slots[name] = [];
      }

      // [1]
      // prettier-ignore
      if (this.useShadow && hasNativeShadowDomSupport) {
        if (name === 'default') {
          return html`<slot />`;
        } else {
          return html`<slot name="${name}" />`;
        }
      } else {
        if (name === 'default') {
          return html`${this.slots.default}`;
        } else if (this.slots[name] && this.slots[name] !== []) {
          return html`${this.slots[name]}`;
        } else {
          return ''; // No slots assigned so don't return any markup.
          console.log(`The ${name} slot doesn't appear to exist...`);
        }
      }
    }

    renderer(root, call) {
      render(call(), root);
    }
  };

export function withLitHtml(Base = HTMLElement) {
  return class extends withLit(withComponent(BoltBase(Base))) {};
}

export const withLitContext = (Base = HTMLElement) =>
  withLit(
    withContext(
      withLifecycle(withChildren(withUpdate(withRenderer(BoltBase(Base))))),
    ),
  );
