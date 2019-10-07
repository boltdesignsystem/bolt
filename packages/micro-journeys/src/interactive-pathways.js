import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitContext, html, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import debounce from 'lodash.debounce';
import themes from '@bolt/global/styles/06-themes/_themes.all.scss';
import styles from './interactive-pathways.scss';
import schema from './interactive-pathways.schema';
// @TODO this default image should be located in schema
import pathwaysLogo from './images/interactive-pathways-logo.png';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathways extends withLitContext() {
  static is = 'bolt-interactive-pathways';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  static get providedContexts() {
    return {
      theme: { property: 'theme' },
    };
  }

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    self.activePathwayIndex = -1;
    self.pathways = [];
    self._hasBeenInViewport = false;
    self._isVisible = false;
    self.dropdownActive = false;
    self._handleClosingEvent = this._handleClosingEvent.bind(this);
    self._isReady = false;

    this.checkChildrenAndRender = debounce(done => {
      this.pathways = this.getPathways();
      this.triggerUpdate();
      // using callback since debounced promises require a different library that's not already in Bolt
      if (done) setTimeout(done, 0);
    }, 150);

    self.addEventListener(
      'bolt-interactive-pathway:connected',
      this.handlePathwayConnect,
    );
    self.addEventListener(
      'bolt-interactive-pathway:disconnected',
      this.handlePathwayDisconnect,
    );
    self.addEventListener('bolt-interactive-pathway:title-updated', () => {
      this.checkChildrenAndRender();
    });

    return self;
  }

  connecting() {
    //Hide dropdown on ESC keypress
    document.addEventListener('keydown', this._handleClosingEvent);
    document.addEventListener('click', this._handleClosingEvent);
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.opacity = 1;

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this._hasBeenInViewport = true;
              if (this._isReady) {
                this.beginItAll();
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        },
      );

      observer.observe(this);
    } else {
      // If IntersectionObserver is not available (i.e. IE11) the alternative is debounced scroll event listeners that would add even more JS burden; it's not worth it - showing first step right away instead
      this._hasBeenInViewport = true;
      if (this._isReady) {
        this.beginItAll();
      }
    }
  }

  beginItAll() {
    this.showPathway(0);
  }

  disconnecting() {
    document.removeEventListener('keydown', this._handleClosingEvent);
    document.removeEventListener('click', this._handleClosingEvent);
  }

  /**
   * @param {Event} event
   */
  handlePathwayConnect(event) {
    this.checkChildrenAndRender(() => {
      if (this.activePathwayIndex === -1) {
        this._isReady = true;
        if (this._hasBeenInViewport) {
          this.beginItAll();
        }
      }
    });
  }

  /**
   * @param {Event} event
   */
  _handleClosingEvent = function(event) {
    // Close dropdown on ESC keypress or clicks outside of the dropdown
    if (
      (this.dropdownActive && event.which === 27) ||
      event.type === 'click' ||
      event.type === 'tap'
    ) {
      this.dropdownActive = false;
      this.triggerUpdate();
    }
  };

  /**
   * @param {Event} event
   */
  handlePathwayDisconnect(event) {
    this.checkChildrenAndRender();
  }

  /**
   * Gets all the HTML bolt-interactive-pathway's on the page
   * @returns {BoltInteractivePathway[]}
   */
  getPathways = () => {
    return Array.prototype.slice.call(
      this.querySelectorAll('bolt-interactive-pathway'),
    );
  };

  showPathway(index) {
    if (this.activePathwayIndex !== -1) {
      const currentPathway = this.pathways[this.activePathwayIndex];
      if (!currentPathway) {
        console.error('no current pathway found');
        return;
      }
      currentPathway.setActive(false);
    }
    const newPathway = this.pathways[index];
    newPathway.setActive(true);
    this.activePathwayIndex = index;
    this.triggerUpdate();
  }

  toggleDropdown(event) {
    this.dropdownActive = !this.dropdownActive;
    event.stopPropagation();
    this.triggerUpdate();
  }

  render() {
    const props = this.validateProps(this.props);
    // @TODO fix https://github.com/bolt-design-system/bolt/issues/1460

    const classes = cx('c-bolt-interactive-pathways', {
      [`t-bolt-${props.theme}`]: !!props.theme,
    });

    const titles = this.pathways.map((pathway, i) => pathway.getTitle());

    const menuItems = titles.map((title, i) => {
      const isActiveItem = i === this.activePathwayIndex;
      const menuItemTextColor = isActiveItem
        ? 'color: #0074B3; --bolt-theme-text: #0074B3;'
        : 'color: rgb(0, 0, 0); --bolt-theme-text: rgb(0, 0, 0);';

      return html`
        <li class="c-bolt-interactive-pathways__menu-container__item">
          <bolt-text
            class="c-bolt-interactive-pathways__menu-item${isActiveItem
              ? ' c-bolt-interactive-pathways__menu-item--active'
              : ''}"
            font-weight="semibold"
            font-size="xsmall"
            @click=${() => {
              this.showPathway(i);
              setTimeout(() => {
                try {
                  let boltMicroJourneyDropdown;
                  let boltMicroJourneyDropdownButton;
                  boltMicroJourneyDropdown = this.renderRoot
                    ? this.renderRoot.querySelector(
                        'bolt-micro-journeys-dropdown',
                      )
                    : null;
                  if (boltMicroJourneyDropdown) {
                    boltMicroJourneyDropdownButton = boltMicroJourneyDropdown.renderRoot
                      ? boltMicroJourneyDropdown.renderRoot.querySelector(
                          'button',
                        )
                      : null;
                  }
                  if (boltMicroJourneyDropdownButton) {
                    boltMicroJourneyDropdownButton.click();
                  }
                } catch {
                  console.error('Autoclose of micro-journey dropdown failed');
                }
              });
            }}
            style=${menuItemTextColor}
          >
            ${isActiveItem
              ? html`
                  <bolt-icon size="medium" name="check"></bolt-icon>
                `
              : ''}
            ${title}
          </bolt-text>
        </li>
      `;
    });

    const dropdown = html`
      <nav class="c-bolt-interactive-pathways__menu-dropdown">
        <h3
          class="c-bolt-interactive-pathways__heading ${this.dropdownActive
            ? `--active`
            : ``}"
        >
          <button
            class="c-bolt-interactive-pathways__dropdown-trigger"
            @click=${e => this.toggleDropdown(e)}
          >
            ${titles[this.activePathwayIndex]}
            <bolt-icon
              style=${this.dropdownActive ? `transform: rotate(-180deg)` : ``}
              name="chevron-down"
            ></bolt-icon>
          </button>
        </h3>
        <ol
          class="c-bolt-interactive-pathways__menu-container  ${this
            .dropdownActive
            ? 'active'
            : ''}"
        >
          ${menuItems}
        </ol>
      </nav>
    `;

    const singleTitle = html`
      <bolt-text
        class="c-bolt-interactive-pathways__single-title"
        subheadline
        font-size="xxlarge"
      >
        ${this.pathways.length > 0 ? this.pathways[0].getTitle() : ''}
      </bolt-text>
    `;

    return html`
      ${this.addStyles([styles, themes])}
      <div class="${classes}">
        <div class="c-bolt-interactive-pathways__header">
          <bolt-image
            no-lazy
            sizes="auto"
            src="${props.customImageSrc || pathwaysLogo}"
            alt="${props.imageAlt}"
          ></bolt-image>
          <div class="c-bolt-interactive-pathways__nav">
            <div class="c-bolt-interactive-pathways__nav--inner">
              <span class="c-bolt-interactive-pathways__nav-text"
                >${this.slot('interactive-pathways-lead-text')}
              </span>
              ${this.pathways.length > 1 ? dropdown : singleTitle}
            </div>
          </div>
        </div>

        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
