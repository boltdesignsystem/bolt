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
    onClick: props.string,
    onClickTarget: props.string
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
    this.addEventListener('click', this.clickHandler);

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

  render({ props, enableTransitions }) {
    const classes = css(
      'c-bolt-button',
      this.props.size ? `c-bolt-button--${this.props.size}` : '',
      this.props.color ? `c-bolt-button--${this.props.color}` : '',
      this.props.rounded ? `c-bolt-button--rounded` : '',
      this.props.iconOnly ? `c-bolt-button--icon-only` : '',
      enableTransitions === false ? 'u-bolt-transitionless' : ''
    );

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


