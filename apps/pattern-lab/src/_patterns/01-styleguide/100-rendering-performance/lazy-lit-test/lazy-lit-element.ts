import { LitElement } from '@polymer/lit-element';
export * from '@polymer/lit-element';
export { customElement } from '@polymer/lit-element/lib/decorators.js';

const STATE_UPDATE_REQUESTED = 1 << 2;

const resolveUrgentUpdate = Symbol();

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

export function withLazyLitElement(Base = HTMLElement) {
  return class extends LazyLitElement {}
};

export function withLitElement(Base = HTMLElement) {
  return class extends LitElement {}
};


export class LazyLitElement extends LitElement {
  static lazyRender = true;

  [resolveUrgentUpdate]: () => void;

  requestUrgenUpdate() {
    this.requestUpdate();
    if (this[resolveUrgentUpdate] !== undefined) {
      this[resolveUrgentUpdate]!();
    }
  }

  /**
   * Patch UpdatingElement's _invalidate to make it call _scheduleUpdate
   */
  protected async _invalidate() {
    if (!(this as any)._hasRequestedUpdate) {
      // mark state updating...
      (this as any)._updateState =
        (this as any)._updateState | STATE_UPDATE_REQUESTED;
      let resolve: (r: boolean) => void;
      (this as any)._updatePromise = new Promise(res => (resolve = res));
      await (this as any)._scheduleUpdate();
      // (this as any)._validate();
      resolve!(!(this as any)._hasRequestedUpdate);
    }
    return this.updateComplete;
  }

  async _scheduleUpdate() {
    if (LazyLitElement.lazyRender == true) {
      // Create a Promise that resolves on setTimeout timing, or when
      // requestUrgenUpdate() is called.
      // In a real implementation of a lazy-rendering element we'd want to
      // use a scheduler so we have more control over how many tasks are run
      // per frame, but using the task queue directly works well enough for
      // this demo.
      await new Promise(res => {
        setTimeout(res);
        this[resolveUrgentUpdate] = res;
      });
    } else {
      await 0;
    }
    (this as any)._validate();
  }
}
