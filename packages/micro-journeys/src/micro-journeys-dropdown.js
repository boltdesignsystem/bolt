import { define } from '@bolt/core/utils';
import { html } from '@bolt/core';
import { BoltDropdown } from '@bolt/components-dropdown/dropdown';
import styles from '@bolt/micro-journeys/src/micro-journeys-dropdown.scss';

@define
class MicroJourneysDropdown extends BoltDropdown {
  static is = 'bolt-micro-journeys-dropdown';

  render() {
    return html`
      ${super.render()}${this.addStyles([styles])}
    `;
  }
}

export { MicroJourneysDropdown };
