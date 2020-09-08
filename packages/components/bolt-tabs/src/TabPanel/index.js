import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { props } from '@bolt/core-v3.x/utils';
import { withContext } from 'wc-context';
import classNames from 'classnames/bind';
import styles from './tab-panel.scss';
// import { TabsContext } from '../tabs';
import schema from '../../tabs.schema';

let cx = classNames.bind(styles);

@customElement('bolt-tab-panel')
class TabPanel extends withContext(BoltElement) {
  // static props = {
  //   id: props.string,
  //   selected: props.boolean,
  // };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  // static get consumes() {
  //   return [
  //     [TabsContext, 'inset'],
  //     [TabsContext, 'panel_spacing'],
  //     [TabsContext, 'uuid'],
  //     [TabsContext, 'selectedIndex'],
  //     [TabsContext, 'tabPanels'],
  //   ];
  // }

  // constructor(self) {
  //   self = super(self);

  //   return self;
  // }

  static get properties() {
    return {
      inset: { type: String },
      panelSpacing: { type: String },
      tabPanels: { type: Object },
      uuid: { type: String },
      selectedIndex: { type: Number },
      id: props.string,
      selected: props.boolean,
    };
  }

  static get observedContexts() {
    return ['inset', 'panelSpacing', 'tabPanels', 'uuid', 'selectedIndex'];
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
    return this.tabPanels && Array.from(this.tabPanels).indexOf(this);
  }

  setSelectedTab() {
    Array.from(this.tabPanels).forEach(item => {
      if (item !== this) {
        item.removeAttribute('selected');
        item.selected = false;
      } else {
        item.setAttribute('selected', '');
        item.selected = true;
      }
    });

    // @todo: Do we need this? For now, let data flow always from parent.
    // this.dispatchEvent(
    //   new CustomEvent('tabs:setSelectedTab', {
    //     detail: {
    //       selectedIndex: this.panelIndex,
    //     },
    //     bubbles: true,
    //   }),
    // );
  }

  template() {
    // const { uuid, selectedIndex, panelSpacing, inset } = this.context;

    const index = this.panelIndex;

    // Selected prop overrides selectedTab state set on parent
    const isSelected = index === this.selectedIndex;

    const labelledById = this.id
      ? `tab-label-${this.id}`
      : `tab-label-${this.uuid}-${index + 1}`; // Use 1-based Id's
    const panelId = this.id || `tab-panel-${this.uuid}-${index + 1}`; // Use 1-based Id's

    const classes = cx('c-bolt-tab-panel', {
      [`c-bolt-tab-panel--spacing-${this.panelSpacing}`]: this.panelSpacing,
      [`c-bolt-tab-panel--inset`]: this.inset === 'on',
    });

    const contentClasses = cx('c-bolt-tab-panel__content');

    const slotMarkup = name => {
      switch (name) {
        case 'label':
          return this.slotMap.get(name)
            ? this.slotify(name)
            : html`
                <slot name="${name}" />
              `;

        default:
          return this.slotMap.get(name)
            ? html`
                <div
                  class="${contentClasses}"
                  id="${panelId}"
                  role="tabpanel"
                  aria-expanded="${isSelected}"
                  tabindex="0"
                  aria-labelledby="${labelledById}"
                >
                  ${this.slotify('default')}
                </div>
              `
            : html`
                <slot />
              `;
      }
    };

    const innerSlots = [slotMarkup('label'), slotMarkup('default')];

    return html`
      <div class="${classes}">${innerSlots}</div>
    `;
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    // const { selected } = this.validateProps(this.props);
    const selected = this.selected;

    // Keep selected attr in sync with context, triggers re-render
    if (!selected && this.panelIndex === this.selectedIndex) {
      this.setSelectedTab();
    }
  }

  render() {
    return html`
      ${this.template()}
    `;
  }
}

export { TabPanel };
