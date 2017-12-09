import { define, props, withComponent } from 'skatejs';
import { eventHandler, withPreact } from '@bolt/core'; // Latest v. broken so using local version for now
import { h, render } from 'preact';

import styles from './button.scoped.scss';

@define
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

  get renderRoot() {
    return this;
  }
}
