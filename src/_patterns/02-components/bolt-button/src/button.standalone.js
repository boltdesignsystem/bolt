import {
  // BoltComponent,
  spacingSizes,
  utils
} from '@bolt/core';

import {
  // ColoredProps,
  // css,
  // cssClassForColorType,
  // DisabledProps,
  // GenericEvents,
  // prop,
  shadyCssStyles
} from '@bolt/core-common';

const css = utils.css.default;

import { props, withComponent, define, h } from 'skatejs';
// import withPreact from '@skatejs/renderer-preact';
// import { Preact } from 'preact';
import styles from './button.scss';
// const Component = withComponent();
// const sizes = spacingSizes.spacingSizes;

// import upperCamelCase from 'uppercamelcase';

// import * as Icon from '@bolt/components-icons';

// const backgroundStyles = [
//   'circle'
// ];

@shadyCssStyles()
export default class BoltButton extends withComponent() {
  static get is() {
    return 'bolt-button';
  }

  static props = {
    name: props.string,
    style: props.style
    // size: props.string,
    // background: props.string
  }

  connectedCallback() {
    // const { background, color, margin, padding } = this.context;
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          background: ${background};
          color: ${color};
          display: block;
          margin: ${margin};
          padding: ${padding};
        }
      </style>
      <slot></slot>
    `;
  }

  renderCallback() {

    const className = css(
      'c-bolt-button',
      props.style ? `c-bolt-button--${props.style}` : '',
      // colorClass,
      // {
      //   'c-button--ghost': ghost && !color,
      //   'c-button--close': close,
      //   'c-button--block': block,
      // }
    );

    console.log('render callback');

    // const classes = css(
    //   'c-bolt-button',
      
    //   // props.size && sizes[props.size] && sizes[props.size] !== ''  ? `c-bolt-icon--${props.size}` : ``,
    //   // props.background && backgroundStyles.includes(props.background) ? `c-bolt-icon--has-${props.background}-background` : ''
    // );

    // const iconName = props.name ? upperCamelCase(props.name) : '';
    // const size = props.size && sizes[props.size] ? (sizes[props.size].replace('rem', '') * 16 / 2) : sizes['medium'];
    // const IconTag = Icon[iconName];
    
    return (
      <div>
        <style>{styles[0][1]}</style>
        <slot />
      </div>
    )
  }
}

customElements.define('bolt-button', BoltButton);
