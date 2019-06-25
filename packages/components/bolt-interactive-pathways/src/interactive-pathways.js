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

    self._updateActivePathwayAttributes = self._updateActivePathwayAttributes.bind(
      self,
    );
    self._clickNavMenuItem = self._clickNavMenuItem.bind(self);

    return self;
  }

  connectedCallback() {
    super.connectedCallback();
    this.pathways = this.querySelectorAll('bolt-interactive-pathway');

    // Make the first pathway the active pathway
    this.activePathway = this.pathways[0];
    this._updateActivePathwayAttributes();

    // @todo remove this temporary fix once SSR rendering/load performance has been addressed
    window.setTimeout(() => {
      this.style.display = 'block';
      this.style.opacity = '1';
      document.querySelectorAll('.temp-loading-pladeholder').forEach(node => {
        node.style.display = 'none';
      });
    }, 600);
  }

  _updateActivePathwayAttributes() {
    /** @type {HTMLElement[]}  */
    Array.from(this.pathways).forEach(pathway => {
      pathway === this.activePathway
        ? pathway.setAttribute('active', '')
        : pathway.removeAttribute('active');
    });
    // Update the title of the dropdown
  }

  /**
   * When a nav item is clicked, updates the active pathway
   * @private
   */
  _clickNavMenuItem(event) {
    // Get the menu-item associated pathway id from which the event originated
    const newActivePathwayId = event.path
      .find(node => node.className === 'c-bolt-interactive-pathways__menu-item')
      .getAttribute('data-associated-pathway-id');
    console.log('Wubba Lubba Dub Dub: newActivePathwayId', newActivePathwayId);
    // Update the activePathway
    this.activePathway = Array.from(this.pathways).find(
      pathway => pathway.getAttribute('id') === newActivePathwayId,
    );

    // Get the dropdownMenu once
    if (!this.dropdownMenu) {
      this.dropdownMenu = this.renderRoot.querySelector('bolt-dropdown');
    }
    // Reset the dropdown menu title to currently selected pathway
    this.dropdownMenu.setAttribute(
      'title',
      this.activePathway.slots['pathway-title'][0].innerHTML,
    );

    this._updateActivePathwayAttributes();
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-pathways', {
      [`c-bolt-interactive-pathways--disabled`]: disabled,
    });

    // We'll need this to dynamically generate the dropdown menu content, but its giving me trouble. Can't seem to get it to render as html and not a string
    // const dropDownMenuItems = html`
    //   ${Array.from(this.pathways).reduce((accumulator, pathway) => {
    //     return accumulator.concat(
    //       `<bolt-text class="c-bolt-interactive-pathways__menu-tiem">${
    //         pathway.querySelector('[slot="pathway-title"]').innerHTML
    //       }</bolt-text>`,
    //     );
    //   }, '')}
    // `;

    const dropDownMenu = html`
      <bolt-dropdown
        center
        title="${this.activePathway.querySelector('[slot="pathway-title"]')
          .innerHTML}"
      >
        <bolt-block-list>
          <bolt-text
            @click=${event => this._clickNavMenuItem(event)}
            data-associated-pathway-id="12345"
            class="c-bolt-interactive-pathways__menu-item"
            >Billing Disputes</bolt-text
          >
          <bolt-text
            @click=${event => this._clickNavMenuItem(event)}
            data-associated-pathway-id="54321"
            class="c-bolt-interactive-pathways__menu-item"
            >Complaints/ Disputes</bolt-text
          >
          <bolt-text
            @click=${event => this._clickNavMenuItem(event)}
            data-associated-pathway-id="32154"
            class="c-bolt-interactive-pathways__menu-item"
            >Warrenty Management</bolt-text
          >
        </bolt-block-list>
      </bolt-dropdown>
    `;

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <div class="c-bolt-interactive-pathways__header">
          <img
            src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/interactive-pathways-logo.png"
            alt="Two diamond logo"
          />
          <div class="c-bolt-interactive-pathways__nav">
            ${this.slot('interactive-pathways-lead-text')} ${dropDownMenu}
          </div>
        </div>

        ${this.title} ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
