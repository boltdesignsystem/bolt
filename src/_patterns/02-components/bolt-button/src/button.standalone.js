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



export class BoltButton extends withComponent(withPreact()) {
  static is = 'bolt-button';

  static props = {
    onClick: props.string,
    onClickTarget: props.string
  }

  clickHandler(event){
    const clickMethod = this.props.onClick;
    const clickTarget = this.props.onClickTarget;

    if (clickMethod){
      if (clickTarget){
        const elems = document.querySelectorAll(`.${clickTarget}`);

        if (elems){
          elems.forEach(function (elem) {
            elem[clickMethod]();
          });
        }
      } else {
        this[clickMethod]();
      }
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.clickHandler);
  }

  // get renderRoot() {
  //   return this;
  // }

  render() {
    return (
      <slot />
    )
  }
}

customElements.define(BoltButton.is, BoltButton);
