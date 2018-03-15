import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes,
  hasNativeShadowDomSupport,
  supportsCSSVars,
  colorContrast,
  rgb2hex,
} from '@bolt/core';

import PubSub from 'pubsub-js';
import upperCamelCase from 'uppercamelcase';
import * as Icons from '@bolt/components-icons';
import styles from './icon.scss';


const backgroundStyles = [
  'circle',
  'square',
];

const colors = [
  'teal',
  'blue',
];


@define
export class BoltIcon extends withPreact(withComponent()) {
  static is = 'bolt-icon';

  static props = {
    name: props.string,
    size: props.string,
    background: props.string,
    color: props.string,

    // programatically spell out the contrast color that needs to get used
    contrastColor: props.string,
  }

  state = {
    primaryColor: null,
    secondaryColor: null,
  }

  constructor() {
    super();
    this.useShadow = hasNativeShadowDomSupport;
    this.useCssVars = supportsCSSVars;
  }

  connectedCallback() {
    const elem = this;

    // listen for page changes to decide when colors need to get recalculated
    if (!this.useCssVars) {
      const checkIfColorChanged = function (msg, data) {
        /**
         * The container with the class change contains this particular icon element so
         * we should double-check the color contrast values.
         */
        if (data.target.contains(elem)) {
          const recalculatedSecondaryColor = colorContrast(
            rgb2hex(window.getComputedStyle(elem).getPropertyValue('color')),
          );

          elem.setAttribute('contrast-color', recalculatedSecondaryColor);
          elem.state.secondaryColor = recalculatedSecondaryColor;
        }
      };

      const colorObserver = PubSub.subscribe('component.icon', checkIfColorChanged);
    }
  }

  render({ props, state }) {
    const { size, name, color, background, contrastColor } = this.props;

    const classes = css(
      'c-bolt-icon',
      size && spacingSizes[size] && spacingSizes[size] !== '' ? `c-bolt-icon--${size}` : '',
      name ? `c-bolt-icon--${name}` : '',
      color && colors.includes(color) ? `c-bolt-icon--${color}` : '',
    );


    const backgroundClasses = css(
      'c-bolt-icon__background-shape',
      background && backgroundStyles.includes(background) ? `c-bolt-icon__background-shape--${background}` : '',
    );

    const iconClasses = css(
      'c-bolt-icon__icon',
    );

    const Icon = name ? upperCamelCase(name) : '';
    const IconTag = Icons[Icon];

    const iconSize = size && spacingSizes[size] ?
      spacingSizes[size].replace('rem', '') * (16 / 2) :
      spacingSizes.medium.replace('rem', '') * (16 / 2);


    if (supportsCSSVars) {
      this.state.primaryColor = 'var(--bolt-theme-icon, var(--bolt-theme-text, currentColor))';
      this.state.secondaryColor = 'var(--bolt-theme-background, #fff)';
    } else {
      this.state.primaryColor = 'currentColor';
      this.state.primaryColorComputed = rgb2hex(window.getComputedStyle(this).getPropertyValue('color'));

      if (contrastColor) {
        this.state.secondaryColor = contrastColor;
      } else {
        this.state.secondaryColor = colorContrast(this.state.primaryColorComputed);
      }
    }

    return (
      <div className={classes}>
        {this.useShadow &&
          <style>{styles[0][1]}</style>
        }
        <IconTag
          className={iconClasses}
          size={iconSize}
          bgColor={this.state.primaryColor}
          fgColor={this.state.secondaryColor}
        />

        {background && size === 'xlarge' &&
          <span className={backgroundClasses}></span>
        }
      </div>
    );
  }
}


/**
 * If CSS Vars are unsupported, listen for class changes on the page to selectively
 * decide when to check to see if an icon component's color should change.
 */
const observedElements = [];

// Observe body + children for changes, but only once.
if (!supportsCSSVars && !observedElements.includes(document.body)) {
  observedElements.push(document.body);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        // publish a topic asyncronously
        PubSub.publish('component.icon', { event: 'color-change', target: mutation.target });
      }
    });
  });

  // Attach the mutation observer to the body to listen for className changes
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: [
      'class',
    ],
    attributeOldValue: false,
    childList: false,
    subtree: true,
  });
}
