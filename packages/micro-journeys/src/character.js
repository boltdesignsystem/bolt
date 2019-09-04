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
  console.log('Hey super smart developer, you probably want this info -> ', {
    characterImage,
  });
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

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const {
      characterImage,
      characterCustomUrl,
      size,
      useIcon,
    } = this.validateProps(this.props);
    const classes = cx('c-bolt-character', `c-bolt-character--${size}`);

    const image =
      characterImage === 'custom'
        ? characterCustomUrl
        : resolveCharacterImage(characterImage);

    console.log('Hey super smart developer, you probably want this info -> ', {
      image,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--top"
        >
          ${this.slot('top')}
        </span>
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--left"
        >
          ${this.slot('left')}
        </span>
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--bottom"
        >
          ${this.slot('bottom')}
        </span>
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--right"
        >
          ${this.slot('right')}
        </span>
        <div class="c-bolt-character__main-image-wrapper">
          ${useIcon
            ? html`
                <span
                  class="c-bolt-character__slot c-bolt-character__slot--icon"
                >
                  <bolt-icon></bolt-icon>
                </span>
              `
            : html`
                <img
                  class="c-bolt-character__main-image"
                  src="${image}"
                  alt="Character Image"
                />
              `}
        </div>
        <span class="c-bolt-character__background">
          ${this.slot('background')}
        </span>
      </div>
    `;
  }
}

export { BoltCharacter };
