import {
  props,
  define,
  hasNativeShadowDomSupport,
  equalizeRelativeHeights,
  persistentlyAttemptToEqualizeRelativeHeights,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import {
  boltCharacterRootClass,
  boltCharacterCenterClass,
  boltCharacterConnectionClass,
} from '@bolt/micro-journeys/src/character';
import styles from './two-character-layout.scss';

let cx = classNames.bind(styles);

@define
class BoltTwoCharacterLayout extends withLitHtml() {
  static is = 'bolt-two-character-layout';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.addEventListener(
      'bolt-character:connected',
      this.handleComponentConnect,
    );
    self.addEventListener(
      'bolt-connection:connected',
      this.handleComponentConnect,
    );
    self.connectedComponentCount = 0;
    return self;
  }

  handleComponentConnect(event) {
    this.connectedComponentCount++;
    if (this.connectedComponentCount >= this.requiredComponentCount) {
      this.componentsHaveConnected();
    }
  }

  /**
   * Make sure both pathway main images are at exactly the same height relative
   * to one another so a connection can be centered between them, while
   * preserving document flow by avoiding absolute positioning.
   */
  componentsHaveConnected() {
    this.boltCharacters = [...this.querySelectorAll('bolt-character')];
    const eqHeightArgs = this.boltCharacters.map(el => {
      return {
        container: el,
        elToEqualize: el.renderRoot.querySelector(
          `.${boltCharacterCenterClass}`,
        ),
        paddingEqualizationTarget: el.renderRoot.querySelector(
          `.${boltCharacterRootClass}`,
        ),
      };
    });
    persistentlyAttemptToEqualizeRelativeHeights(
      eqHeightArgs,
      this.setConnectionWidth,
      0,
      3,
      true,
    );
  }

  /**
   * Set the width of `bolt-connection` so it spans from one `bolt-character` to
   * `bolt-character`. Note: requires page refresh.
   */
  setConnectionWidth = () => {
    this.boltCharacters.forEach((e, i) => {
      const connection = e.querySelector('bolt-connection');
      const nextCharacter = this.boltCharacters[i + 1];
      if (connection && nextCharacter) {
        const nextCharacterCenter = nextCharacter.renderRoot.querySelector(
          `.${boltCharacterCenterClass}`,
        );
        // @TODO figure out why that 50% calculation is off by 10px (getBoundingClientRect().x is not at fault)
        connection.style.minWidth = `calc(${nextCharacterCenter.getBoundingClientRect()
          .x -
          connection.getBoundingClientRect().x -
          10}px + 50%)`;
      }
    });
  };

  render() {
    const classes = cx('c-bolt-two-character-layout');
    this.requiredComponentCount =
      // @ts-ignore
      !!this.slot('character--left') + !!this.slot('character--right');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-two-character-layout__character-row">
          <span
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--left"
          >
            ${this.slot('character--left')}
          </span>
          <span
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--right"
          >
            ${this.slot('character--right')}
          </span>
        </div>
      </div>
    `;
  }
}

export { BoltTwoCharacterLayout };
