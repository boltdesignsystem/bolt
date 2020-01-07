import { html, customElement } from '@bolt/element';
import { withContext, props } from '@bolt/core-v3.x/utils';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './tab-panel.scss';
import { TabsContext } from '../tabs';

let cx = classNames.bind(styles);

@customElement('bolt-tab-panel')
class TabPanel extends withContext(withLitHtml) {
  static props = {
    selected: props.boolean,
  };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [
      [TabsContext, 'inset'],
      [TabsContext, 'panelSpacing'],
      [TabsContext, 'uuid'],
      [TabsContext, 'selectedIndex'],
      [TabsContext, 'tabPanels'],
    ];
  }

  constructor(self) {
    self = super(self);

    return self;
  }

  get panelIndex() {
    // Will return undefined until parent context is ready, e.g. if you call from `connectedCallback()`
    return (
      this.context.tabPanels && Array.from(this.context.tabPanels).indexOf(this)
    );
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.context = this.contexts.get(TabsContext);
  }

  setSelectedTab() {
    Array.from(this.context.tabPanels).forEach(item => {
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
    const { uuid, selectedIndex, panelSpacing, inset } = this.context;

    const index = this.panelIndex;

    // Selected prop overrides selectedTab state set on parent
    const isSelected = index === selectedIndex;

    // Use 1-based index for IDs
    const labelledById = `tab-label-${uuid}-${index + 1}`;
    const panelId = `tab-panel-${uuid}-${index + 1}`;

    const classes = cx('c-bolt-tab-panel', {
      [`c-bolt-tab-panel--spacing-${panelSpacing}`]: panelSpacing,
      [`c-bolt-tab-panel--inset`]: inset === 'on',
    });

    const contentClasses = cx('c-bolt-tab-panel__content');

    const slotMarkup = name => {
      switch (name) {
        case 'label':
          return name in this.slots
            ? this.slot(name)
            : html`
                <slot name="${name}" />
              `;

        default:
          return name in this.slots
            ? html`
                <div
                  class="${contentClasses}"
                  id="${panelId}"
                  role="tabpanel"
                  aria-expanded="${isSelected}"
                  tabindex="0"
                  aria-labelledby="${labelledById}"
                >
                  ${this.slot('default')}
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

  rendered() {
    super.rendered && super.rendered();

    const { selected } = this.validateProps(this.props);

    // Keep selected attr in sync with context, triggers re-render
    if (!selected && this.panelIndex === this.context.selectedIndex) {
      this.setSelectedTab();
    }
  }

  render() {
    return html`
      ${this.addStyles([styles])} ${this.template()}
    `;
  }
}

export { TabPanel };
