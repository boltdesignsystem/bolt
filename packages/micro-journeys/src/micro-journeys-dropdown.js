import { css, define } from '@bolt/core/utils';
import { html } from '@bolt/core';
import { BoltDropdown } from '@bolt/components-dropdown/dropdown';
import microJourneyStyles from '@bolt/micro-journeys/src/micro-journeys-dropdown.scss';
import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from '@bolt/components-dropdown/dropdown.scss';

@define
class MicroJourneysDropdown extends BoltDropdown {
  static is = 'bolt-micro-journeys-dropdown';

  render() {
    const classes = css(
      'c-bolt-dropdown',
      this.props.collapse ? 'c-bolt-dropdown--collapse@small' : '',
    );

    const dropdownChildren = this.slots.default
      ? this.slot('default')
      : this.props.children
      ? this.props.children
      : '';

    return html`
      ${this.addStyles([styles, heightUtils, microJourneyStyles])}
      <div class="${classes}" id="${this.uuid}">
        ${this.dropdownHeader()}
        <div class="c-bolt-dropdown__content">
          <div class="c-bolt-dropdown__content-inner">${dropdownChildren}</div>
        </div>
      </div>
    `;
  }
}

export { MicroJourneysDropdown };
