import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes,
  renderToString,
  hasNativeShadowDomSupport
} from '@bolt/core';

import styles from './button.scss';
// import spacingUtils from '@bolt/utilities-spacing/_utilities.spacing.scss';

@define
export class BoltButton extends withComponent(withPreact()) {
  static is = 'bolt-button';

  static props = {
    color: props.string,
    size: props.string,
    rounded: props.boolean,
    iconOnly: props.boolean,
    disabled: props.boolean,
    size: props.string,
    width: props.string,
    align: props.string,
    url: props.string,
    onClick: props.string,
    onClickTarget: props.string,
    isHover: props.boolean,  // test hover psuedo state
    isActive: props.boolean, // test active psuedo state
    isFocus: props.boolean,  // test focus psuedo state
  }

  constructor(element) {
    super(element);
    this.useShadow = hasNativeShadowDomSupport;
    const originalElem = this.querySelectorAll('.c-bolt-button')[0];

    if (originalElem) {
      originalElem.className = 'c-bolt-button__inner';
    }

    if (!this.useShadow) {
      if (originalElem) {
        this.fallbackText = originalElem.innerHTML;
      } else {
        this.fallbackText = this.innerHTML;
      }
    }
  }

  connectedCallback(){
    // Set default button states
    this.state = {
      isMouseActive: false,
      isFocused: false,
      isFirstRender: true
    };

  /**
   * 1. Handles external click event hooks
   * 2. Handles internal focus and click events relating to conditionally toggling focus state
   * 3. Note: `focus` here won't work in IE 11
   */
    this.addEventListener('click', this.clickHandler); /* [1] */
    this.addEventListener('mousedown', this.mousedownHandler); /* [2] */
    this.addEventListener('focusin', this.focusHandler); /* [2, 3] */

    if (!this.useShadow) {
      this.enableTransitions = false;
      const self = this;

      setTimeout(function () {
        const buttonElem = self.querySelector('.c-bolt-button');

        if (buttonElem) {
          self.enableTransitions = true;
          buttonElem.classList.remove('u-bolt-transitionless');
          self.render(self.props, self.enableTransitions = true);
        }
      }, 300);
    } else {
      this.enableTransitions = true;
    }
  }

  disconnectedCallback(){
    this.removeEventListener('click', this.clickHandler);
    this.removeEventListener('mousedown', this.mousedownHandler);
    this.removeEventListener('focusin', this.focusHandler);
  }


  // Handle conditionally toggling state classes based on interaction. Based on https://marcysutton.com/button-focus-hell/ and https://jmperezperez.com/outline-focus-ring-a11y/ and https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
  mousedownHandler(event){
    const elem = this; // Needed for scoping the setTimeout

    elem.state.isMouseActive = true;
    setTimeout(function () {
      elem.state.isMouseActive = false;
    }, 100);
  }

  focusHandler(event) {
    if (this.state.isMouseActive === false) {
      this.state.isFocused = true;
      this.renderRoot.firstChild.classList.add('is-focused');

      this.addEventListener('blur', this.blurHandler);
    }
  }

  blurHandler(event) {
    this.state.isFocused = false;
    // this.render(this.props, this.state);
    this.renderRoot.firstChild.classList.remove('is-focused');

    this.removeEventListener('blur', this.blurHandler);
  }


  // Attach external events declaratively
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

  render({ props, enableTransitions }) {
    const classes = css(
      'c-bolt-button',
      this.props.size ? `c-bolt-button--${this.props.size}` : '',
      this.props.color ? `c-bolt-button--${this.props.color}` : '',
      this.props.rounded ? `c-bolt-button--rounded` : '',
      this.props.iconOnly ? `c-bolt-button--icon-only` : '',
      this.props.width ? `c-bolt-button--${this.props.width}` : '',
      this.props.align ? `c-bolt-button--${this.props.align}` : 'c-bolt-button--center',
      this.enableTransitions === false ? 'u-bolt-transitionless' : '',

      // Test out psuedo states via prop values
      this.props.isHover ? `c-bolt-button--hover` : '',
      this.props.isActive ? `c-bolt-button--active` : '',
      this.props.isFocus ? `c-bolt-button--focus` : ''
    );


    // Depending on if the user natively supports the ShadowDom, conditionally render a slot or psuedo-slot polyfill we're manually handling here.
    let buttonText;
    if (this.useShadow){
      buttonText = <slot />;
    } else {
      buttonText = <span className="c-bolt-button__inner" dangerouslySetInnerHTML={{ __html: this.fallbackText }} />
    }

    return (
      <div className={classes}>
        {this.useShadow &&
          <style>
            {styles[0][1]}
          </style>
        }
        { buttonText }
      </div>
    )
  }
}


