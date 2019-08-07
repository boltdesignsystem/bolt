import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './interactive-pathways.scss';
// import schema from '../interactive-pathways.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathways extends withLitHtml() {
  static is = 'bolt-interactive-pathways';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    activePathwayId: {
      ...props.number,
      ...{ default: 0 },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;

    return self;
  }

  connectedCallback() {
    super.connectedCallback();

    this.dropdownMenu = this.renderRoot.querySelector('bolt-dropdown');

    this.style.display = 'block';
    this.style.opacity = '1';
    document.querySelectorAll('.temp-loading-placeholder').forEach(node => {
      node.style.display = 'none';
    });
  }

  /**
   * Respond to a dropdown click. Only react to clicks on a menu item. Update the active
   * status of all the child pathways if active pathway is changed.
   *
   * @param event
   */
  handleMenuItemClick = event => {
    if (event.target.tagName !== 'BOLT-TEXT') {
      return;
    }
    const { activePathwayId: oldActivePathwayId } = this;
    const newActivePathwayId = event.target.getAttribute('assocPathwayId');

    if (oldActivePathwayId === newActivePathwayId) {
      return;
    }

    this.activePathwayId = newActivePathwayId;

    // Trigger update in child pathways.
    this._getPathways().forEach(pathway => {
      pathway.activePathwayId = newActivePathwayId;
    });
  };

  /**
   * Gets all the HTML bolt-interactive-pathway's on the page
   *
   * @returns {HTMLElement[]}
   * @private
   */
  _getPathways = () => {
    return Array.from(this.querySelectorAll('bolt-interactive-pathway'));
  };

  /**
   *
   * @param {int} id the pathwayId of the pathway to return
   * @returns {HTMLElement}
   * @private
   */
  _getActivePathwayById = (id = null) => {
    // This pattern is because (id = this.state.activePathwayId) triggers undef func error.
    id = id === null ? this.activePathwayId : id;
    return this._getPathways().find(
      el => el.getAttribute('pathwayId') === `${id}`,
    );
  };

  /**
   * gets the litHTML for the dropdown menu items.
   * @returns {TemplateResult[]}
   * @private
   */
  _renderPathwaysDropdownMenuItems = () => {
    return Array.from(this._getPathways()).map((item, i) => {
      const pathwayId = item.getAttribute('pathwayId');
      return html`
        <bolt-text
          assocPathwayId="${pathwayId}"
          class="c-bolt-interactive-pathways__menu-item"
          ?active=${pathwayId === this.activePathwayId}
        >
          ${item.querySelector('[slot="pathway-title"]').innerText}
        </bolt-text>
      `;
    });
  };

  /**
   * Gets the litHTML for the dropdown menu
   *
   * @return {TemplateResult}
   */
  _renderPathwaysDropdownMenu = () => {
    return html`
      <bolt-dropdown
        center
        title="${this._getActivePathwayById().querySelector(
          '[slot="pathway-title"]',
        ).innerText}"
        @click=${this.handleMenuItemClick}
      >
        <bolt-block-list>
          ${this._renderPathwaysDropdownMenuItems()}
        </bolt-block-list>
      </bolt-dropdown>
    `;
  };

  render() {
    const classes = cx('c-bolt-interactive-pathways');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <div class="c-bolt-interactive-pathways__header">
          <img
            src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/interactive-pathways-logo.png"
            alt="Two diamond logo"
          />
          <div class="c-bolt-interactive-pathways__nav">
            ${this.slot('interactive-pathways-lead-text')}
            ${this._renderPathwaysDropdownMenu()}
          </div>
        </div>

        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
