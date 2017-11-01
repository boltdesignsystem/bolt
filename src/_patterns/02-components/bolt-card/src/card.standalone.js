import { 
  // BoltComponent,
  utils
} from '@bolt/core';
// console.log(BoltComponent);

const css = utils.css.default;
import styles from './card.scss';

import { define, props, withComponent, withUpdate } from 'skatejs';
import { h, Component } from 'preact';
import withPreact from '@skatejs/renderer-preact';
// import Preact from 'preact';

// export type ClickHandler = HTMLElement.prototype.onclick;
// export type FocusHandler = typeof HTMLElement.prototype.onfocus;
// export type BlurHandler = typeof HTMLElement.prototype.onblur;
// export type KeyupHandler = typeof HTMLElement.prototype.onkeyup;

// export type CustomChangeHandler<T> = (event: CustomChangeEvent<T>) => any;
// export type CustomChangeEvent<T> = CustomEvent & { detail: { value: T } };


// Preact component we want to wrap in the web component.
// class BoltCardChildren extends Component {
//   render() {
//     const { children } = this.props;
//     return (
//       <div>Hello, {yell ? <strong>{children}</strong> : children}!</div>
//     );
//   }
// }



export default class BoltCard extends withComponent(withPreact()) {
  static get is() {
    return 'bolt-card';
  }

  static props = {
    name: props.string,
    url: props.string,
    theme: props.string
  }

  state = {
    isHovered: false
  };
  
  handleClick(e) {
    // e.preventDefault();
    console.log('click!');

    // console.log(this.state);
  }


  onmouseOver(e) {
    console.log('mouse enter');

    // state({ isHovered: true });

    // this.props.isHovered = true;

    // console.log(this.props);
    // this.state = { selected: i };
  }


  onMouseOut(e) {
    console.log('mouse leave');

    // this.state({ isHovered: false });
    // this.props.isHovered = false;

    // console.log(this.props);
    // this.state = { selected: i };
  }


  renderCallback({ props, state }) {
    const classes = css(
      'c-bolt-card',
      'test',
      props.url ? 'is-clickable' : '',
      state.isHovered === true ? 'is-hovered' : 'is-not-hovered'
    );

    return (
      <div 
        className={classes} 
        onClick={this.handleClick} 
        onmouseOver={this.onmouseOver}
        onMouseOut={this.onMouseOut}
      >
        <style>{styles[0][1]}</style>
        <slot />
      </div>
    )
  }
}

customElements.define('bolt-card', BoltCard);
