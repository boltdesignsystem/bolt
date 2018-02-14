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
// export spacingUtils from '@bolt/utilities-spacing/_utilities.spacing.scss';
const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
    <style>
      ${styles[0][1]}
    </style>
    <slot></slot>
  `;


@define
export class BoltButton extends withComponent(withPreact()) {
  static is = 'bolt-button';

  static props = {
    color: props.string,
    disabled: props.boolean,
    size: props.string,
    width: props.string,
    rounded: props.boolean,
    align: props.string,
    url: props.string,
    iconOnly: props.boolean,
    isHover: props.boolean,  // test hover psuedo state
    isActive: props.boolean, // test active psuedo state
    isFocus: props.boolean,  // test focus psuedo state
    onClick: props.string,
    onClickTarget: props.string
  }

  constructor() {
    super();
    // @TODO: check if shadow DOM supported + ShadyDOM polyfill loaded
    // if (!this.shadowRoot) {
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
      this.props.color ? `c-bolt-button--${this.props.color}` : '',
      this.props.iconOnly ? `c-bolt-button--icon-only` : '',
      this.props.rounded ? `c-bolt-button--rounded` : '',
      this.props.size ? `c-bolt-button--${this.props.size}` : '',
      this.props.width ? `c-bolt-button--${this.props.width}` : '',
      this.props.align ? `c-bolt-button--${this.props.align}` : '',

      // Test out psuedo states via prop values
      this.props.isHover ? `c-bolt-button--hover` : '',
      this.props.isActive ? `c-bolt-button--active` : '',
      this.props.isFocus ? `c-bolt-button--focus` : '',
    );


    const originalElem = this.querySelectorAll('.js-bolt-pre-rendered')[0];

    let replacement;
    let replacementTag = 'button';

    if (this.props.url){
      replacementTag = 'a';
    }

    if (originalElem) {
      this.innerHTML = originalElem.innerHTML;

    //   // // originalElem.className = 'c-bolt-button__inner';
    //   // // Create a replacement tag of the desired type
    //   replacement = document.createElement(replacementTag);

    //   // Grab all of the original's attributes, and pass them to the replacement
    //   for (var i = 0, l = originalElem.attributes.length; i < l; ++i) {
    //     var nodeName = originalElem.attributes.item(i).nodeName;
    //     var nodeValue = originalElem.attributes.item(i).nodeValue;

    //     replacement.setAttribute(nodeName, nodeValue);
    //   }

    //   // Persist contents
    //   replacement.innerHTML = originalElem.innerHTML;

    //   originalElem.parentNode.replaceChild(replacement, originalElem);

    //   replacement.className = '';
    }

    const ButtonTag = this.props.url ? 'a' : 'button';

    let disabled = this.props.disabled ? { 'disabled': 'disabled' } : {};
    let active = this.props.active ? { 'active': 'disabled' } : {};

    // {spacingUtils[0][1]}
    return (
      <ButtonTag className={classes} {...disabled}>
        <style>
          {styles[0][1]}
        </style>
        <slot />
      </ButtonTag>
    )
  }
}

if (module.hot) {
  module.hot.accept();
}