import {
  withContext,
  define,
  props,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './tab-panel.scss';
import { TabsContext } from '../tabs';

let cx = classNames.bind(styles);

@define
class TabPanel extends withContext(withLitHtml()) {
  static is = 'bolt-tab-panel';

  static props = {
    selected: props.boolean,
    panelSpacing: props.string,
  };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [
      [TabsContext, 'spacing'],
      [TabsContext, 'inset'],
      [TabsContext, 'uuid'],
      [TabsContext, 'selectedIndex'],
      [TabsContext, 'tabPanels'],
      [TabsContext, 'useShadow'],
    ];
  }

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;

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
    this.useShadow = this.context.useShadow; // Inherit useShadow from `bolt-tabs`
  }

  setSelectedTab() {
    Array.from(this.context.tabPanels).forEach(item => {
      if (item !== this) {
        item.removeAttribute('selected');
      } else {
        item.setAttribute('selected', '');
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
    const { uuid, selectedIndex, spacing, inset } = this.context;
    const { panelSpacing } = this.validateProps(this.props);

    const index = this.panelIndex;

    // Selected prop overrides selectedTab state set on parent
    const isSelected = index === selectedIndex;

    // Use 1-based index for IDs
    const labelledById = `tab-label-${uuid}-${index + 1}`;
    const panelId = `tab-panel-${uuid}-${index + 1}`;

    // Give preference to `panelSpacing`, fallback to `spacing`
    const spacingOption = panelSpacing || spacing;
    const classes = cx('c-bolt-tab-panel', {
      [`c-bolt-tab-panel--spacing-${spacingOption}`]: spacingOption,
      [`c-bolt-tab-panel--inset`]: inset,
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
