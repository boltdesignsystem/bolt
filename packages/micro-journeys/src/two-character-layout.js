import {
  props,
  define,
  hasNativeShadowDomSupport,
  equalizeRelativeHeights,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import {
  boltCharacterCenterClass,
  boltCharacterIs,
} from '@bolt/micro-journeys/src/character';
import { boltConnectionIs } from '@bolt/micro-journeys/src/connection';
import { triggerAnims } from '@bolt/components-animate/utils';
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
    parentAnimationsTriggered: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.hasConnection = !!this.querySelector(boltConnectionIs);
    self.requiredComponentCount = self.hasConnection ? 3 : 2;
    self.renderedComponentCount = 0;
    self.isInitialRender = true;
    return self;
  }

  /**
   * Callback for when child components report ready. Figure out if they're
   * characters and count them if so. Then attempt to initialize.
   *
   * @param event
   */
  handleChildrenReady(event) {
    if (
      event.detail.name !== boltCharacterIs &&
      event.detail.name !== boltConnectionIs
    ) {
      return;
    }
    this.renderedComponentCount++;
    if (this.isConnected) {
      this.attemptCharactersAreReadyInitialization();
    }
  }

  /**
   * Make sure that the component is rendering for the first time and `bolt-character`s are ready.
   * Both characters have to be on the dom with width and height before this can run.
   * The problem is that this component connects and components report as rendered
   * before content is slotted. Thus, we have to wait for the parent to tell us
   * that it has attempted to animate content as a sigh that we can actually
   * perform calculations against slotted elements that have height/width.
   * We only do this on initial render after we're told the parent has animated.
   * After this, bolt-interactive-step is in charge of animating this in and out.
   */
  attemptCharactersAreReadyInitialization() {
    const charsAreReady =
      this.renderedComponentCount >= this.requiredComponentCount;
    if (
      this.parentAnimationsTriggered &&
      charsAreReady &&
      this.isInitialRender
    ) {
      this.charactersAreReadyInitialization();
      this.isInitialRender = false;
    }
  }

  connected() {
    this.addEventListener('ready', this.handleChildrenReady);
  }

  disconnecting() {
    if (this.parentAnimationsTriggered && !this.isInitialRender) {
      this.removeEventListener('ready', this.handleChildrenReady);
    }
  }

  /**
   * Make sure both pathway main images are at exactly the same height relative
   * to one another so a connection can be centered between them, while
   * preserving document flow by avoiding absolute positioning.
   */
  charactersAreReadyInitialization = async () => {
    const anims = this.querySelectorAll('bolt-animate');
    this.boltCharacters = [...this.querySelectorAll(boltCharacterIs)];
    const eqHeightArgs = this.boltCharacters.map(character => {
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
      this.hasConnection ? this.setConnectionWidth : null,
    );
    this.triggerUpdate();

    triggerAnims({ animEls: anims, stage: 'IN' });
    // Tell the parent step that it can now normally animate this element.
    this.dispatchEvent(
      new CustomEvent(`${BoltTwoCharacterLayout.is}:animation-initialized`, {
        bubbles: true,
      }),
    );
  };

  /**
   * Set the width of `bolt-connection` if present so it spans from one `bolt-character` to
   * `bolt-character`. Note: requires page refresh.
   */
  setConnectionWidth = () => {
    this.boltCharacters.forEach((e, i) => {
      const connection = e.querySelector(boltConnectionIs);
      const nextCharacter = this.boltCharacters[i + 1];
      if (connection && nextCharacter) {
        const nextCharacterCenter = nextCharacter.renderRoot.querySelector(
          `.${boltCharacterCenterClass}`,
        );
        connection.style.minWidth = `calc(${nextCharacterCenter.getBoundingClientRect()
          .x - connection.getBoundingClientRect().x}px + 50%)`;
      }
    });
  };

  render() {
    const props = this.validateProps(this.props);
    if (this.isInitialRender) {
      this.attemptCharactersAreReadyInitialization();
    }
    const classes = cx('c-bolt-two-character-layout', {
      'c-bolt-two-character-layout__initial':
        !props.parentAnimationsTriggered && this.isInitialRender,
    });
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

export { BoltTwoCharacterLayout, boltTwoCharacterLayoutIs };
