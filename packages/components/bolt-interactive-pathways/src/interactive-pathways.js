import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './interactive-pathways.scss';
import schema from '../interactive-pathways.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathways extends withLitHtml() {
  static is = 'bolt-interactive-pathways';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
    title: {
      ...props.string,
      ...{ default: '' },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = schema;

    self._updateActivePathwayAttributes = self._updateActivePathwayAttributes.bind(self);
    self._handleMenuItemClick = self._handleMenuItemClick.bind(self);

    return self;
  }

  connectedCallback() {
    super.connectedCallback();
    this.pathways = this.querySelectorAll('bolt-interactive-pathway');

    // Make the first pathway the active pathway
    this.activePathway = this.pathways[0];
    this._updateActivePathwayAttributes();

    // Remove timeout and see if it works.
    // @todo remove this temporary fix once SSR rendering/load performance has been addressed
    window.setTimeout(() => {
      this.style.display = 'block';
      this.style.opacity = '1';
      document.querySelectorAll('.temp-loading-placeholder').forEach(node => {
        node.style.display = 'none';
      });
    }, 600);
  }

  _updateActivePathwayAttributes() {
    /** @type {HTMLElement[]}  */
    Array.from(this.pathways).forEach(pathway => {
      pathway === this.activePathway
        ? pathway.setAttribute('active', 1)
        : pathway.removeAttribute('active');
    });
    // Update the title of the dropdown
  }

  /**
   * When a nav item is clicked, updates the active pathway
   * @private
   */
  _handleMenuItemClick(event) {
    console.log('event', event.target);
    // Get the menu-item associated pathway id from which the event originated
    // const newActivePathwayId = event.path
    //   .find(node => node.className === 'c-bolt-interactive-pathways__menu-item')
    //   .getAttribute('data-associated-pathway-id');
    // Update the activePathway
    this.activePathway = event.target;

    // Get the dropdownMenu once
    if (!this.dropdownMenu) {
      this.dropdownMenu = this.renderRoot.querySelector('bolt-dropdown');
    }
    // Reset the dropdown menu title to currently selected pathway
    this.dropdownMenu.setAttribute(
      'title',
      this.activePathway.slots['pathway-title'][0].innerHTML,
    );

    Array.from(this.pathways).forEach(pathway => {
      pathway === this.activePathway
        ? pathway.setAttribute('active', 1)
        : pathway.removeAttribute('active');
    });
  }

  _getPathwaysDropdownMenuItems() {
    return Array.from(this.pathways).map((item, i) => {
      return html`
        <bolt-text
          data-associated-pathway-id="${i}"
          class="c-bolt-interactive-pathways__menu-item"
        >
          ${item.querySelector('[slot="pathway-title"]').innerText}
        </bolt-text>
      `;
    });
  }

  _getPathwaysDropdownMenu() {
    return html`
      <bolt-dropdown
        center
        title="${this.activePathway.querySelector('[slot="pathway-title"]').innerText}"
        @click=${this._handleMenuItemClick}
      >
        <bolt-block-list>
          ${this._getPathwaysDropdownMenuItems()}
        </bolt-block-list>
      </bolt-dropdown>
    `;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-pathways', {
      [`c-bolt-interactive-pathways--disabled`]: disabled,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <div class="c-bolt-interactive-pathways__header">
        <!-- @TODO make the source a real boy.-->
          <img
            src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/interactive-pathways-logo.png"
            alt="Two diamond logo"
          />
          <div class="c-bolt-interactive-pathways__nav">
            ${this.slot('interactive-pathways-lead-text')}
            ${this._getPathwaysDropdownMenu()}
          </div>
        </div>

        ${this.title} ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
