import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
  declarativeClickHandler,
  sanitizeBoltClasses,
} from '@bolt/core';

import styles from './button.scss';
// @todo Salem, since this imports something that imports '@bolt/core', please make sure this doesn't add a huge amount in the wrong place - Evan
import visuallyhiddenUtils from '@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss';


/**
  * The ReplaceWithChildren is a helper component used for prerendering components (ex. temp CSS
  * classes) that need to get removed when the component's JS kicks in. Once that happens, this
  * component automatically replaces itself with the component's child nodes.
  */
@define
export class ReplaceWithChildren extends BoltComponent() {
  static is = 'replace-with-children';

  constructor(self) {
    self = super(self);
    return self;
  }

  connecting(){
    this.replaceElementWithChildren();
  }

  replaceElementWithChildren(){
    const parentElement = this.parentElement;

    if(!parentElement){
      Error('The <replace-with-children> element needs a parent element to append to!');
    }

    // Originally was this.replaceWith(...this.childNodes) but IE11 doesn't like that
    while(this.firstChild){
      parentElement.appendChild(this.firstChild);
    }
    if (parentElement){
      parentElement.removeChild(this);
    }
  }
}


@define
class BoltButton extends BoltComponent() {
  static is = 'bolt-button';

  static props = {
    color: props.string,
    text: props.string,
    size: props.string,
    rounded: props.boolean,
    iconOnly: props.boolean,
    size: props.string,
    width: props.string,
    align: props.string,
    transform: props.string,

    disabled: props.boolean,

    target: props.string,
    url: props.string,

    isHover: props.boolean,  // test hover psuedo state
    isActive: props.boolean, // test active psuedo state
    isFocus: props.boolean,  // test focus psuedo state

    onClick: props.string, // Managed by base class
    onClickTarget: props.string, // Managed by base class
  }

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  connecting() {
    this.addEventListener('click', this.clickHandler);
  }

  disconnecting() {
    this.removeEventListener('click', this.clickHandler);
  }

  // Attach external events declaratively
  clickHandler(event) {
    declarativeClickHandler(this);
  }

  render({ props, state }) {
    // Setup the combo of classes to apply based on state + extras added
    const classes = css(
      'c-bolt-button',
      this.props.size ? `c-bolt-button--${this.props.size}` : '',
      this.props.color ? `c-bolt-button--${this.props.color}` : 'c-bolt-button--primary',
      this.props.rounded ? 'c-bolt-button--rounded' : '',
      this.props.iconOnly ? 'c-bolt-button--icon-only' : '',
      this.props.width ? `c-bolt-button--${this.props.width}` : '',
      this.props.align ? `c-bolt-button--${this.props.align}` : 'c-bolt-button--center',
      this.props.align ? `c-bolt-button--${this.props.transform}` : '',
      this.props.disabled ? 'c-bolt-button--disabled' : '',

      // Test out psuedo states via prop values
      this.props.isHover ? 'c-bolt-button--hover' : '',
      this.props.isActive ? 'c-bolt-button--active' : '',
      this.props.isFocus ? 'c-bolt-button--focus' : '',
    );

    /**
     * Given that our base HyperHTML Class is configured to automatically organizing top level children into separate slot buckets (ie.
     * `this.slots.default`) AND we need to apply padding styles to the <button> or <link> getting passed in, we need to identify which Dom Node in
     * our default Slot is the one we should apply our component classes to.
     *
     * If for some reason a container can't be found (ex. if creating a `<bolt-button color="primary">Hello World</bolt-button>` element by hand),
     * We'll need to generate a wrapper container + figure out if this should be a <button> or <a> tag
    */

    let childElementIndex = null;
    this.slots.default.forEach(function (item, i) {
      if (item.nodeType === 1) {
        childElementIndex = i;
      }
    });

    if (childElementIndex !== null){
      let sanitizedClasses = sanitizeBoltClasses(this.slots.default[childElementIndex]);
      this.slots.default[childElementIndex].className = `${sanitizedClasses} ${classes}`;
    }

    // Decide on if the rendered button tag should be a <button> or <a> tag, based on if a URL exists OR if a link was passed in from the getgo
    const hasUrl = this.props.url.length > 0 && this.props.url !== 'null';

    // Assign default target attribute value if one isn't specified
    const urlTarget = this.props.target && hasUrl ? this.props.target : '_self';


    let buttonElement;

    if (childElementIndex !== null){
      buttonElement = this.hyper.wire(this) `
        ${this.slot('default')}
      `;
    } else if (childElementIndex === null && hasUrl) {
      buttonElement = this.hyper.wire(this) `
        <a href="${this.props.url}" class="${classes}" target="${urlTarget}">
          ${this.slot('default')}
        </a>
      `;
    } else {
      buttonElement = this.hyper.wire(this) `
        <button class="${classes}">
          ${this.slot('default')}
        </button>
      `;
    }

    // Add inline <style> tag automatically if Shadow DOM is natively supported
    return this.html`
      ${ this.addStyles([styles, visuallyhiddenUtils]) }
      ${ buttonElement }
    `;
  }
}
