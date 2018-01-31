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

@define
export class BoltButton extends withComponent(withPreact()) {
  static is = 'bolt-button';

  static props = {
    color: props.string,
    size: props.string,
    rounded: props.boolean,
    iconOnly: props.boolean,
    onClick: props.string,
    onClickTarget: props.string
  }

  constructor(element) {
    super(element);
    // this.attachShadow({ mode: 'open' });

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
      this.props.size ? `c-bolt-button--${this.props.size}` : '',
      this.props.color ? `c-bolt-button--${this.props.color}` : '',
      this.props.rounded ? `c-bolt-button--rounded` : '',
      this.props.iconOnly ? `c-bolt-button--icon-only` : '',
    );

    const originalElem = this.querySelectorAll('.c-bolt-button')[0];

    if (originalElem){
      originalElem.className = 'c-bolt-button__inner';
    }

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
