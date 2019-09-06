import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
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
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    this.activePathwayIndex = 0;

    return self;
  }

  connectedCallback() {
    super.connectedCallback();
    // @todo remove
    setTimeout(() => {
      // wait till children are mounted before trying to find them
      setTimeout(() => {
        this.style.opacity = 1;
        this.showPathway(0);
      }, 0);
    });
  }

  /**
   * Gets all the HTML bolt-interactive-pathway's on the page
   * @returns {BoltInteractivePathway[]}
   */
  getPathways = () => {
    return Array.from(this.querySelectorAll('bolt-interactive-pathway'));
  };

  showPathway(index) {
    const pathways = this.getPathways();
    const currentPathway = pathways[this.activePathwayIndex];
    currentPathway.setActive(false);
    const newPathway = pathways[index];
    newPathway.setActive(true);
    this.activePathwayIndex = index;
    this.triggerUpdate();
  }

  render() {
    const classes = cx('c-bolt-interactive-pathways');

    const pathways = this.getPathways();
    const titles = pathways.map((pathway, i) => pathway.getTitle());

    const menuItems = titles.map((title, i) => {
      const isActiveItem = i === this.activePathwayIndex;
      return html`
        <bolt-text
          class="c-bolt-interactive-pathways__menu-item"
          font-weight="semi-bold"
          @click=${() => this.showPathway(i)}
        >
          ${isActiveItem ? html`<bolt-icon name="check"></bolt-icon>` : ''}
          ${title}
        </bolt-text>
      `;
    });

    const menu = html`
      <bolt-micro-journeys-dropdown
        center
        title="${titles[this.activePathwayIndex]}"
      >
        <div class="c-bolt-interactive-pathways__menu-container">
          ${menuItems}
        </div>
      </bolt-micro-journeys-dropdown>
    `;

    const singleTitle = html`
      <bolt-text
        class="c-bolt-interactive-pathways__single-title"
        font-weight="semibold"
        font-size="xxlarge"
      >
        ${pathways.length > 0 ? pathways[0].getTitle() : ""}
      </bolt-text>
    `;

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-interactive-pathways__header">
          <img
            src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/interactive-pathways-logo.png"
            alt="Two diamond logo"
          />
          <div class="c-bolt-interactive-pathways__nav">
            <div class="c-bolt-interactive-pathways__nav--inner">
              <span class="c-bolt-interactive-pathways__nav-text"
                >${this.slot('interactive-pathways-lead-text')}</span
              >
              ${pathways.length > 1 ? menu : singleTitle}
            </div>
          </div>
        </div>

        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
