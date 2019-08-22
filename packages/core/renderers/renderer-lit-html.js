import { html, render } from 'lit-html';

import {
  withComponent,
  shadow,
  props,
  hasNativeShadowDomSupport,
  findParentTag,
} from '../utils';
import { BoltBase } from './bolt-base';

export { html, render } from 'lit-html';

class _withLitHtml extends BoltBase {
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

  constructor() {
    super();
    this.html = html;
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
    super.renderer && super.renderer();
    render(call(), root);
  }
}

export class withLitHtml extends withComponent(_withLitHtml) {}
