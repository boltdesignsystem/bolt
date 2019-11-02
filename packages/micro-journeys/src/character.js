import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
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

@define
class BoltCharacter extends withLitHtml() {
  static is = 'bolt-character';

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
  }

  render() {
    const props = this.validateProps(this.props);
    const hasSideContent = !!this.slots['left'] || !!this.slots['right'];
    const classes = cx(rootClass, `${rootClass}--${props.size}`, {
      [`${rootClass}__has-background`]: !!this.slots['background'],
      [`${rootClass}__has-side-content`]: hasSideContent,
    });

    const image =
      props.characterImage === 'custom'
        ? props.characterCustomUrl
        : resolveCharacterImage(props.characterImage);

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${this.slots['top'] &&
          html`
            <span
              class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--top"
            >
              ${this.slot('top')}
            </span>
          `}
        ${hasSideContent
          ? html`
              <span
                class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--left"
              >
                ${this.slot('left')}
              </span>
            `
          : ''}
        <div class="${rootClass}__center--wrapper">
          <div class="${centerClass}">
            ${props.useIcon
              ? html`
                  <span
                    class="${rootClass}__slot ${rootClass}__slot--icon--wrapper"
                  >
                    <bolt-icon class="${rootClass}__slot--icon"></bolt-icon>
                  </span>
                `
              : html`
                  <img
                    class="${rootClass}__main-image"
                    src="${image}"
                    alt="Character Image"
                  />
                `}
            ${this.slots['background'] &&
              html`
                <span class="${rootClass}__background">
                  ${this.slot('background')}
                </span>
              `}
            ${this.slots['connection'] &&
              html`
                <span
                  class="${rootClass}__slot ${rootClass}__slot--connection"
                >
                  ${this.slot('connection')}
                </span>
              `}
          </div>
        </div>
        ${hasSideContent
          ? html`
              <span
                class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--right"
              >
                ${this.slot('right')}
              </span>
            `
          : ''}
        ${this.slots['bottom'] &&
          html`
            <span
              class="${rootClass}__slot ${rootClass}__slot--cardinal ${rootClass}__slot--bottom"
            >
              ${this.slot('bottom')}
            </span>
          `}
      </div>
    `;
  }
}

export { BoltCharacter, centerClass as boltCharacterCenterClass, rootClass as boltCharacterRootClass, connectionClass as boltCharacterConnectionClass};
