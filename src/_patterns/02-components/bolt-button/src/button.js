import { define, props, withComponent } from 'skatejs';
import { eventHandler, withPreact } from '@bolt/core'; // Latest v. broken so using local version for now
import { h, render } from 'preact';
import { value } from 'yocss';
import { thisExpression } from 'babel-types';

// import styles from './_button.scss';

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
    console.log('connected callback');

    this.addEventListener('click', this.clickHandler);
    
    // }
    // Add keyboard event for enter key or space to mimic anchor functionality
    // elem.addEventListener(`keypress`, function (e) {
    //   if (e.which !== 13 && e.which !== 32) return;
    //   // Prevent default action of element
    //   e.preventDefault();
    //   // Run state function
    //   eventHandler(this);
    // });
  }

  get renderRoot() {
    return this;
  }

  doThis(){
    console.log('do this event on click');
  }
}

  // <bolt-button on-click="doThis"
  // renderCallback() {
  //   const className = css(
  //     'c-bolt-button',
  //     this.theme ? `c-bolt-button--${this.theme}` : '',
  //     this.size && sizes[this.size] ? `c-bolt-button--${this.size}` : ''
  //   );

  //   return (
  //     <button class={className}>
  //       <span class="c-bolt-button__item">
  //         <slot />
  //       </span>
  //     </button>
  //   );
  // }
