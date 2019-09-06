import { define } from '@bolt/core/utils';
import { html } from '@bolt/core';
import { BoltDropdown } from '@bolt/components-dropdown/dropdown';
import styles from '@bolt/micro-journeys/src/micro-journeys-dropdown.scss';

@define
class MicroJourneysDropdown extends BoltDropdown {
  static is = 'bolt-micro-journeys-dropdown';

  render() {
    /*TODO:  the use of super.render() seems to be crashing the browser, this pattern isn't used
      in otherareas where a bolt component is extended.  
    */
    return html`
      ${super.render()}${this.addStyles([styles])}
    `;
  }
}

export { MicroJourneysDropdown };
