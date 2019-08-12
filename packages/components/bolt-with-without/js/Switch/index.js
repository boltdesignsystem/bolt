import { Switch } from './Switch.js';

// Export the Switch class so that users of this code can create new Switches by
// calling new SimpleSwitch.Switch()
export { Switch };

// Takes care of finding Switches within the site code.
export const init = function() {
  let x,
    _switch,
    switches = document.querySelectorAll("[data-type='simple-switch']");

  for (x = 0; x < switches.length; x++) {
    _switch = switches[x];

    /* eslint-disable no-new */
    new Switch({
      element: _switch,
    });
  }
};
