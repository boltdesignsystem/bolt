import { BoltDropdown } from '@bolt/components-dropdown/dropdown';
import { hasNativeShadowDomSupport } from '@bolt/core';

class MicroJourneysDropdown extends BoltDropdown {
  static is = 'bolt-micro-journeys-dropdown';

  constructor(self) {
    self = super(self);

    console.log('in DropDownMicroJourneys');
    console.log(this);
    console.log(self);

    this.useShadow = hasNativeShadowDomSupport;

    this.state = {
      open: this.props.autoOpen ? this.props.autoOpen : false,
      collapse: this.props.collapse ? this.props.collapse : false,
    };

    this.uuid = '12345';
    return self;
  }
}

export { MicroJourneysDropdown };
