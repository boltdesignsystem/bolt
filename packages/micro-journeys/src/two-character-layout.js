import { html, customElement } from '@bolt/element';
import { props, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml } from '@bolt/core';
import classNames from 'classnames/bind';
import {
  boltCharacterCenterClass,
  boltCharacterIs,
} from '@bolt/micro-journeys/src/character';
import { boltConnectionIs } from '@bolt/micro-journeys/src/connection';
import { triggerAnims } from '@bolt/components-animate/utils';
import {
  equalizeRelativeHeights,
  equalizeRelativeHeightsKey,
} from './utils/equalize-relative-heights';
import styles from './two-character-layout.scss';

let cx = classNames.bind(styles);

const boltTwoCharacterLayoutIs = 'bolt-two-character-layout';

@customElement('bolt-two-character-layout')
class BoltTwoCharacterLayout extends withLitHtml {
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
    return self;
  }

  connected() {
    this.connection = this.querySelector(boltConnectionIs);
    this.characters = [...this.querySelectorAll(boltCharacterIs)];
  }

  /**
   * Make sure both pathway main images are at exactly the same height relative
   * to one another so a connection can be centered between them, while
   * preserving document flow by avoiding absolute positioning.
   */
  equalizeCharactersAndStyleConnection = async () => {
    const eqHeightArgs = this.characters.map(character => {
      return {
        container: character,
        elToEqualize: character.renderRoot.querySelector(
          `.${boltCharacterCenterClass}`,
        ),
        paddingEqualizationTarget: character,
      };
    });

    await this.delay(0);
    return equalizeRelativeHeights(
      eqHeightArgs,
      this.connection ? this.setConnectionWidth : null,
    );
  };

  triggerAnimIns = async () => {
    if (!this.areCharactersEqualized()) {
      try {
        await this.ensureComponentsRendered();
        await this.equalizeCharactersAndStyleConnection();
        this.triggerUpdate();
        return this._triggerAnimIns();
      } catch (e) {
        console.error(e);
      }
    } else {
      return this._triggerAnimIns();
    }
  };

  _triggerAnimIns = async () => {
    const animEls = this.querySelectorAll('bolt-animate');
    triggerAnims({ animEls, stage: 'IN' });
    this.connection.refreshLinearGradient();
  };

  /**
   * Set the width of `bolt-connection` if present so it spans from one `bolt-character` to
   * `bolt-character`. Note: requires page refresh.
   */
  setConnectionWidth = () => {
    this.characters.forEach((e, i) => {
      const connection = e.querySelector('bolt-animate[slot="connection"');
      const nextCharacter = this.characters[i + 1];
      if (connection && nextCharacter) {
        const nextCharacterCenter = nextCharacter.renderRoot.querySelector(
          `.${boltCharacterCenterClass}`,
        );
        connection.style.minWidth = `calc(${nextCharacterCenter.getBoundingClientRect()
          .left - connection.getBoundingClientRect().left}px + 50%)`;
        connection.renderRoot.querySelector('.c-bolt-connection__main-image');
      }
    });
  };

  /**
   * Create a delay and return a promise.
   *
   * @param {int} timeoutAmount in MS
   * @return {Promise<unknown>}
   */
  delay = timeoutAmount =>
    new Promise(resolve => {
      setTimeout(resolve, timeoutAmount);
    });

  /**
   * Ensure with recursive promises that the `bolt-character`s and `bolt-connection`
   * are rendered. This is necessary because bolt element ready
   * event fires after JS render but before render to the actual DOM.
   *
   * @param attemptCount
   * @return {Promise<Promise|Promise>}
   */
  ensureComponentsRendered = (attemptCount = 0) => {
    const attemptMax = 15;
    const attemptTimeout = 250;
    return new Promise((resolve, reject) => {
      if (attemptMax <= attemptCount) {
        return reject(
          new Error(
            "Uh oh. Characters didn't render to the dom in a timely fashion.",
          ),
        );
      }
      if (this.areComponentsRendered()) {
        return resolve(true);
      } else {
        // I realize this seems primitive, but it is the best way.
        this.delay(attemptTimeout).then(() => {
          return this.ensureComponentsRendered(attemptCount + 1);
        });
      }
    });
  };

  /**
   * Check the `bolt-character`s and `bolt-connection` to see if they have
   * offsetHeight, that is, if they are painted in the browser yet.
   *
   * @return {boolean} if all required components have offsetHeight.
   */
  areComponentsRendered = () => {
    this.characters.forEach(character => {
      if (!character.offsetHeight) {
        return false;
      }
    });
    if (this.connection) {
      if (!this.connection.offsetHeight) {
        return false;
      }
    }
    return true;
  };

  /**
   * Check to see if `bolt-character`s have had their heights equalized.
   *
   * @return {boolean} true if equalized else false.
   */
  areCharactersEqualized = () => {
    let isEqualized = true;
    this.characters.forEach(character => {
      if (!character[equalizeRelativeHeightsKey]) {
        isEqualized = false;
      }
    });
    return isEqualized;
  };

  render() {
    const props = this.validateProps(this.props);
    const classes = cx('c-bolt-two-character-layout', {
      'c-bolt-two-character-layout__initial': !this.areCharactersEqualized(),
    });
    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-two-character-layout__character-row">
          <div
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--left"
          >
            ${this.slot('character--left')}
          </div>
          <div
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--right"
          >
            ${this.slot('character--right')}
          </div>
        </div>
      </div>
    `;
  }
}

export { BoltTwoCharacterLayout, boltTwoCharacterLayoutIs };
