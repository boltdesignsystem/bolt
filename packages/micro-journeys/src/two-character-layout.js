import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import {
  boltCharacterCenterClass,
  boltCharacterIs,
} from '@bolt/micro-journeys/src/character';
import { boltConnectionIs } from '@bolt/micro-journeys/src/connection';
import { triggerAnims } from '@bolt/components-animate/utils';
import {
  equalizeRelativeHeights,
  equalizeRelativeHeightsClass,
} from './utils/equalize-relative-heights';
import styles from './two-character-layout.scss';

let cx = classNames.bind(styles);

const boltTwoCharacterLayoutIs = 'bolt-two-character-layout';

@define
class BoltTwoCharacterLayout extends withLitHtml() {
  static is = boltTwoCharacterLayoutIs;

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    // Has the parent `bolt-interactive-step` attempted its animation of its children in?
    parentAnimationsTriggered: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.connection = this.querySelector(boltConnectionIs);
    self.characters = [...this.querySelectorAll(boltCharacterIs)];
    self.isInitialRender = true;
    return self;
  }

  /**
   * Make sure both pathway main images are at exactly the same height relative
   * to one another so a connection can be centered between them, while
   * preserving document flow by avoiding absolute positioning.
   */
  equalizeCharactersAndStyleConnection = () => {
    const eqHeightArgs = this.characters.map(character => {
      return {
        container: character,
        elToEqualize: character.renderRoot.querySelector(
          `.${boltCharacterCenterClass}`,
        ),
        paddingEqualizationTarget: character,
      };
    });

    equalizeRelativeHeights(
      eqHeightArgs,
      this.connection ? this.setConnectionWidth : null,
    );
    this.triggerUpdate();
  };

  animateContentIn = () => {
    const anims = this.querySelectorAll('bolt-animate');
    triggerAnims({ animEls: anims, stage: 'IN' });
    // Tell the parent step that it can now normally animate this element.
    this.dispatchEvent(
      new CustomEvent(`${BoltTwoCharacterLayout.is}:animation-initialized`, {
        bubbles: true,
      }),
    );
    this.isInitialRender = false;
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
      // Hack for chrome which gets confused by [slot='connection']
      // e.querySelector('bolt-animate[slot="connection"').style.display = 'flex';
    });
  };

  /**
   * Create a delay and return a promise.
   *
   * @param {int} timeoutAmount in MS
   * @return {Promise<unknown>}
   */
  delay = async timeoutAmount =>
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
  ensureComponentsRendered = async (attemptCount = 0) => {
    const attemptMax = 15;
    const attemptTimeout = 900;
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
      if (!character.classList.contains(equalizeRelativeHeightsClass)) {
        isEqualized = false;
      }
    });
    return isEqualized;
  };

  render() {
    const props = this.validateProps(this.props);
    const classes = cx('c-bolt-two-character-layout', {
      'c-bolt-two-character-layout__initial':
        !props.parentAnimationsTriggered && this.isInitialRender,
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

  /**
   * Make sure that the component is rendering for the first time and `bolt-character`s are ready.
   * Both characters have to be on the dom with width and height before this can run.
   * The problem is that this component connects and components report as rendered
   * before content is slotted. Thus, we have to wait for the parent to tell us
   * that it has attempted to animate content as a sign that we can actually
   * perform calculations against slotted elements that have height/width.
   * We only do this on initial render after we're told the parent has animated.
   * After this, `bolt-interactive-step` is in charge of animating `this` in and out.
   */
  rendered() {
    super.rendered();
    // The editor disconnects the old component and copies the HTML to an iframe.
    // Don't perform animations or calculations on an unconnected component.
    if (!this.isConnected) {
      return;
    }
    if (this.isInitialRender && this.parentAnimationsTriggered) {
      if (!this.areCharactersEqualized()) {
        this.ensureComponentsRendered()
          .then(() => {
            this.equalizeCharactersAndStyleConnection();
            this.animateContentIn();
          })
          .catch(e => console.error(e));
      } else {
        this.animateContentIn();
      }
    }
  }
}

export { BoltTwoCharacterLayout, boltTwoCharacterLayoutIs };
