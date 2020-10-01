import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import classNames from 'classnames/bind';
import styles from './tab-panel.scss';

let cx = classNames.bind(styles);

@customElement('bolt-tab-panel')
class TabPanel extends withContext(BoltElement) {
  static get properties() {
    return {
      id: { type: String },
      inset: { type: String },
      panels: { type: Object },
      panelSpacing: { type: String },
      selected: { type: Boolean },
      selectedTab: { type: Number },
      uuid: { type: String },
    };
  }

  static get observedContexts() {
    return ['inset', 'panels', 'panelSpacing', 'selectedTab', 'uuid'];
  }

  contextChangedCallback(name, oldValue, value) {
    this[name] = value;
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
  }

  get panelIndex() {
    // Will return undefined until parent context is ready, e.g. if you call from `connectedCallback()`
    return this.panels && this.panels.indexOf(this);
  }

  setSelectedTab() {
    this.panels.forEach(item => {
      if (item !== this) {
        item.removeAttribute('selected');
        item.selected = false;
      } else {
        item.setAttribute('selected', '');
        item.selected = true;
      }
    });
  }

  updated(changedProperties) {
    super.updated && super.updated(changedProperties);
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'selectedTab' || propName === 'panels') {
        // Triger if either `selectedTab` or `panels` updates to keep selected attr in sync with context, triggers re-render
        if (!this.selected && this.panelIndex === this.selectedTab - 1) {
          this.setSelectedTab();
        }
      }
    });
  }

  render() {
    const index = this.panelIndex;

    // Selected prop overrides selectedTab state set on parent
    const isSelected = index === this.selectedTab - 1;

    const labelledById = this.id
      ? `tab-label-${this.id}`
      : `tab-label-${this.uuid}-${index + 1}`; // Use 1-based Id's
    const panelId = this.id || `tab-panel-${this.uuid}-${index + 1}`; // Use 1-based Id's

    const classes = cx('c-bolt-tab-panel', {
      [`c-bolt-tab-panel--spacing-${this.panelSpacing}`]: this.panelSpacing,
      [`c-bolt-tab-panel--inset`]: this.inset === 'on',
    });

    return html`
      <div class="${classes}">
        ${this.slotMap.get('label') && this.slotify('label')}
        ${this.slotMap.get('default') &&
          html`
            <div
              class="${cx('c-bolt-tab-panel__content')}"
              id="${panelId}"
              role="tabpanel"
              aria-expanded="${isSelected}"
              tabindex="0"
              aria-labelledby="${labelledById}"
            >
              ${this.slotify('default')}
            </div>
          `}
      </div>
    `;
  }
}

export { TabPanel };
