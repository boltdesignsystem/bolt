import { html, customElement } from '@bolt/element';
import {
  props,
  hasNativeShadowDomSupport,
  convertSchemaToProps,
} from '@bolt/core-v3.x/utils';
import { withLitHtml } from '@bolt/core-v3.x/renderers';
import classNames from 'classnames/bind';
import schema from './character.schema';
import styles from './character.scss';
import customerHappy from './images/customer-happy.png';
import customerNeutral from './images/customer-neutral.png';
import customerSad from './images/customer-sad.png';
import customerSurprise from './images/customer-surprise.png';
import pegaRep from './images/pega-rep.png';
import uCommPlus from './images/u-comm-plus.png';

let cx = classNames.bind(styles);

const resolveCharacterImage = characterImage => {
  switch (characterImage) {
    case 'customer-neutral':
      return customerNeutral;
    case 'customer-sad':
      return customerSad;
    case 'customer-surprise':
      return customerSurprise;
    case 'pega-rep':
      return pegaRep;
    case 'u-comm-plus':
      return uCommPlus;
    default:
    case 'customer-happy':
      return customerHappy;
  }
};

const rootClass = 'c-bolt-character';
const centerClass = `${rootClass}__center`;
const connectionClass = `${rootClass}__slot--connection`;
const boltCharacterIs = 'bolt-character';

@customElement('bolt-character')
class BoltCharacter extends withLitHtml {
  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent(`${BoltCharacter.is}:connected`, {
          bubbles: true,
        }),
      );
    }, 0);
    this.isInTwoCharLayout = !!this.closest('bolt-two-character-layout');
  }

  render() {
    const props = this.validateProps(this.props);
    const hasRightContent = this.slots['right'] && this.slots['right'].length;
    const hasLeftContent = this.slots['left'] && this.slots['left'].length;
    const hasSideContent = hasLeftContent || hasRightContent;
    const hasBothSideContent = hasLeftContent && hasRightContent;

    const classes = cx(rootClass, `${rootClass}--${props.size}`, {
      [`${rootClass}__has-background-padding`]: props.backgroundPadding,
      [`${rootClass}__has-side-content`]: hasSideContent,
      [`${rootClass}__has-both-side-content`]: hasBothSideContent,
      [`${rootClass}__has-one-side-content`]:
        hasSideContent && !hasBothSideContent,
      [`${rootClass}__is-in-two-character-layout`]: this.isInTwoCharLayout,
      [`${rootClass}__has-bottom-slot-constrained`]: props.constrainBottomSlot,
    });

    const image =
      props.characterImage === 'custom'
        ? props.characterCustomUrl
        : resolveCharacterImage(props.characterImage);

    const bottomSlot = html`
      <div
        class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--bottom"
      >
        <div class="c-bolt-micro-journeys-flex-aspect">
          ${this.slot('bottom')}
        </div>
      </div>
    `;

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${this.slots['top'] &&
          html`
            <div
              class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--top"
            >
              <div class="c-bolt-micro-journeys-flex-aspect">
                ${this.slot('top')}
              </div>
            </div>
          `}
        <div class="${rootClass}__center-inline--wrapper">
          ${hasSideContent
            ? html`
                <div
                  class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--left"
                >
                  <div class="c-bolt-micro-journeys-flex-aspect">
                    ${this.slot('left')}
                  </div>
                </div>
              `
            : ''}
          <div class="${rootClass}__center--wrapper">
            <div class="${centerClass}">
              ${props.useIcon
                ? html`
                    <div
                      class="${rootClass}__slot ${rootClass}__slot--icon--wrapper"
                    >
                      <bolt-icon class="${rootClass}__slot--icon"></bolt-icon>
                    </div>
                  `
                : html`
                    <div
                      class="${rootClass}__main-image--wrapper c-bolt-micro-journeys-flex-aspect"
                    >
                      <img
                        class="${rootClass}__main-image"
                        src="${image}"
                        alt="Character Image"
                      />
                    </div>
                  `}
              ${this.slots['background'] &&
                html`
                  <div class="${rootClass}__background">
                    ${this.slot('background')}
                  </div>
                `}
              ${this.slots['connection'] &&
                html`
                  <div class="${rootClass}__slot ${connectionClass}">
                    ${this.slot('connection')}
                  </div>
                `}
            </div>
            ${props.constrainBottomSlot && this.slots['bottom']
              ? bottomSlot
              : ''}
          </div>
          ${hasSideContent
            ? html`
                <div
                  class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--right"
                >
                  <div class="c-bolt-micro-journeys-flex-aspect">
                    ${this.slot('right')}
                  </div>
                </div>
              `
            : ''}
        </div>
        ${!props.constrainBottomSlot && this.slots['bottom'] ? bottomSlot : ''}
      </div>
    `;
  }
}

export {
  BoltCharacter,
  centerClass as boltCharacterCenterClass,
  boltCharacterIs,
};
