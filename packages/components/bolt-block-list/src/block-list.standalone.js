import {
  h,
  render,
  define,
  props,
  withComponent,
  hasNativeShadowDomSupport,
  withPreact,
} from '@bolt/core';

import styles from './block-list.scss';

@define
export class BoltBlockList extends withPreact(withComponent()) {
  static is = 'bolt-block-list';

  static props = {
    items: props.any,
  };

  constructor() {
    super();
    this.useShadow = hasNativeShadowDomSupport;
  }

  render() {
    const theItems = this.props.items.split(',');
    let finalItems = '';
    theItems.forEach((value) => {
      finalItems += `<li class="c-bolt-block-list__item">${value}</li>`;
    });
    return (
      <span>
        <style>{styles[0][1]}</style>
        <ul className="c-bolt-block-list">
          <span dangerouslySetInnerHTML={{ __html: finalItems }} />
        </ul>
      </span>
    );
  }
}
