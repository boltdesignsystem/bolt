import { define } from '@bolt/core/utils';

@define
class ssrKeep extends HTMLElement {
  static is = 'ssr-keep';

  get for() {
    return this.getAttribute('for');
  }

  connectedCallback() {
    if (bolt.isServer) {
      return;
    }

    const target = this.closest(this.for);

    if (target) {
      if (!target.ssrKeep) {
        target.ssrKeep = [this];
      } else {
        target.ssrKeep.push(this);
      }
    }
  }
}

export { ssrKeep };
