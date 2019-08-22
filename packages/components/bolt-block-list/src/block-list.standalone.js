import { define, props } from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';

import styles from './block-list.scss';

@define
class BoltBlockList extends withPreact {
  static is = 'bolt-block-list';

  static props = {
    items: props.any,
  };

  constructor(self) {
    self = super(self);
    this.useShadow = false; // @todo: Get this working with shadowDOM + slots
    return self;
  }

  render() {
    const theItems = this.props.items.split(',');
    let finalItems = '';
    theItems.forEach(value => {
      finalItems += `<li class="c-bolt-block-list__item">${value}</li>`;
    });
    return (
      <span>
        {this.useShadow && <style>{styles[0][1]}</style>}
        <ul
          className="c-bolt-block-list"
          dangerouslySetInnerHTML={{ __html: finalItems }}
        />
      </span>
    );
  }
}

export { BoltBlockList };
