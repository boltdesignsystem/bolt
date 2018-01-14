import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes
} from '@bolt/core';

import styles from './button.scss';
import spacingUtils from '@bolt/utilities-spacing/_utilities.spacing.scss';

export class BoltButton extends withComponent(withPreact()) {
  static is = 'bolt-button';

  static props = {
    style: props.string,
    size: props.string,
    rounded: props.boolean,
    iconOnly: props.boolean,
    onClick: props.string,
    onClickTarget: props.string
  }

  constructor() {
    super();
    // @TODO: check if shadow DOM supported + ShadyDOM polyfill loaded
    // if (!this.shadowRoot) {
    //   this.attachShadow({ mode: 'open' });
    // }

    const originalElem = this.querySelectorAll('.c-bolt-button')[0];

    if (originalElem) {
      originalElem.replaceWith(...originalElem.childNodes);
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.clickHandler);
  }

  clickHandler(event) {
    const clickMethod = this.props.onClick;
    const clickTarget = this.props.onClickTarget;

    if (clickMethod) {
      if (clickTarget) {
        const elems = document.querySelectorAll(`.${clickTarget}`);

        if (elems) {
          elems.forEach(function (elem) {
            if (elem[clickMethod]) {
              elem[clickMethod]();
            } else {
              // @TODO: handle call to undefined method
            }
          });
        }
      } else {
        if (this[clickMethod]) {
          this[clickMethod]();
        } else {
          // @TODO: handle call to undefined method
        }
      }
    }
  }

  render({ props }) {
    const classes = css(
      'c-bolt-button',
      props.size && spacingSizes[props.size] && spacingSizes[props.size] !== '' ? `c-bolt-button--${props.size}` : ``,
      this.props.style ? `c-bolt-button--${this.props.style}` : '',
      this.props.rounded ? `c-bolt-button--rounded` : '',
      this.props.iconOnly ? `c-bolt-button--icon-only` : '',
    );

    return (
      <div className={classes}>
        <style>
          {styles[0][1]}
          {spacingUtils[0][1]}
        </style>
        <slot />
      </div>
    )
  }
}

customElements.define(BoltButton.is, BoltButton);
