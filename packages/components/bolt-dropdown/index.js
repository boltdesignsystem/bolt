import { BoltDropdown } from './dropdown.js';

if (!customElements.get('bolt-dropdown')) {
  customElements.define(BoltDropdown.is, BoltDropdown);
}
