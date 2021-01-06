import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import Handorgel from 'handorgel';
import classNames from 'classnames/bind';
import styles from './dropdown.scss';
import schema from './dropdown.schema';

let cx = classNames.bind(styles);

@customElement('bolt-dropdown')
class BoltDropdown extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      autoOpen: {
        type: Boolean,
      },
      toggleText: {
        type: String,
      },
      primaryUuid: {
        type: String,
      },
      secondaryUuid: {
        type: String,
      },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  constructor() {
    super();

    this.state = {
      open: this.autoOpen ? this.autoOpen : false,
      collapse: this.collapse ? this.collapse : false,
    };

    this.uuid = '12345';
    return this;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    const contentInner = this.querySelector('.c-bolt-dropdown__content-inner');
    const originalDropdown = this.querySelector('.c-bolt-dropdown');
    const originalInput = this.querySelector('.c-bolt-dropdown__state');

    if (contentInner && originalDropdown) {
      if (originalInput) {
        originalInput.parentNode.removeChild(originalInput);
      }

      originalDropdown.replaceWith(...contentInner.childNodes);
    }

    const elem = this;

    window.addEventListener('resize', function() {
      elem.autoHeight();
    });

    this.addEventListener('activateLink', this.close);
  }

  autoHeight() {
    if (this.contentElem) {
      if (this.collapse && window.matchMedia('(min-width: 600px)').matches) {
        this.contentElem.classList.add('c-bolt-dropdown--height-auto');
      } else if (this.collapse) {
        this.contentElem.classList.remove('c-bolt-dropdown--height-auto');
      }
    }
  }

  close() {
    const elem = this;
    setTimeout(function() {
      elem.dropdown.folds[0].close();
    }, 300);
  }

  get open() {
    return this.state.open;
    // this.dropdown.folds[0].close();
  }

  // Sets the `active` state for the current custom element
  set open(value) {
    /* Properties can be set to all kinds of string values. This
     * makes sure it’s converted to a proper boolean value using
     * JavaScript’s truthiness & falsiness principles.
     */

    if (value && value === true) {
      this.state.open = true;
      this.setAttribute('open', 'open');
    } else {
      this.removeAttribute('open');
    }
  }

  dropdownHeader() {
    const dropdownHeaderClasses = cx(
      'c-bolt-dropdown__header',
      this.center ? 'c-bolt-dropdown__header--center' : '',
    );

    const dropdownTitle = this.slotMap.get('title')
      ? this.slotify('title')
      : this.title
      ? this.title
      : '';

    return html`
      <h3 class="${dropdownHeaderClasses}">
        <button class="c-bolt-dropdown__header-button">
          ${dropdownTitle}

          <span class="c-bolt-dropdown__header-icons">
            <div class="c-bolt-dropdown__header-icons-inner">
              <span
                class="c-bolt-dropdown__header-icon c-bolt-dropdown__header-icon--open"
              >
                <bolt-icon name="chevron-down"></bolt-icon>
              </span>

              <span
                class="c-bolt-dropdown__header-icon c-bolt-dropdown__header-icon--close"
              >
                <bolt-icon name="chevron-up"></bolt-icon>
              </span>
            </div>
          </span>
        </button>
      </h3>
    `;
  }

  render() {
    const classes = cx(
      'c-bolt-dropdown',
      this.collapse ? 'c-bolt-dropdown--collapse@small' : '',
    );

    return html`
      <div class="${classes}" id="${this.uuid}">
        ${this.dropdownHeader()}
        <div class="c-bolt-dropdown__content">
          <div class="c-bolt-dropdown__content-inner">
            ${this.slotify('default')}
          </div>
        </div>
      </div>
    `;
  }

  updated() {
    super.updated && super.updated();

    this.contentElem = this.renderRoot.querySelector(
      '.c-bolt-dropdown__content',
    );

    this.autoHeight();

    this.dropdown = new Handorgel(
      this.renderRoot.querySelector('.c-bolt-dropdown'),
      {
        // whether multiple folds can be opened at once
        multiSelectable: true,
        // whether the folds are collapsible
        collapsible: true,

        // whether ARIA attributes are enabled
        ariaEnabled: true,
        // whether W3C keyboard shortcuts are enabled
        keyboardInteraction: true,
        // whether to loop header focus (sets focus back to first/last header when end/start reached)
        carouselFocus: true,

        // attribute for the header or content to open folds at initialization
        initialOpenAttribute: 'data-open',
        // whether to use transition at initial open
        initialOpenTransition: true,
        // delay used to show initial transition
        initialOpenTransitionDelay: 200,

        // header/content class if fold is open
        headerOpenClass: 'c-bolt-dropdown__header--open',
        contentOpenClass: 'c-bolt-dropdown__content--open',

        // header/content class if fold has been opened (transition finished)
        headerOpenedClass: 'c-bolt-dropdown__header--opened',
        contentOpenedClass: 'c-bolt-dropdown__content--opened',

        // header/content class if fold has been focused
        headerFocusClass: 'c-bolt-dropdown__header--focus',
        contentFocusClass: 'c-bolt-dropdown__content--focus',

        // header/content class if fold is disabled
        headerDisabledClass: 'c-bolt-dropdown__header--disabled',
        contentDisabledClass: 'c-bolt-dropdown__content--disabled',

        // header/content class if no transition should be active (applied on resize)
        headerNoTransitionClass: 'c-bolt-dropdown__header--notransition',
        contentNoTransitionClass: 'c-bolt-dropdown__content--notransition',
      },
    );
  }
}

export { BoltDropdown };
