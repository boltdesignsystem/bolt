// import css from '../../../scripts/utils/css.js';
// import { sizes as spacingSizes } from '../../../scripts/utils/spacing-sizes.js';

import {
  css,
  sizes as spacingSizes
} from '@bolt/core';



import { props, withComponent, define } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';
import { Preact } from 'preact';
import styles from './icon.scss';


// console.log(styles);
// import StyledMixin from '../../../scripts/utils/styled-mixin.js';

// const { ShadyCSS } = window;
// const $template = Symbol();

// function style(elem, css) {
//   const template = elem[$template] || (elem[$template] = document.createElement('template'));
//   template.innerHTML = `<style>${css}</style>`;
//   ShadyCSS.prepareTemplate(template, elem.localName);
//   return <style>{css}</style>;
// }


// import BoltComponent from './bolt-component';

import upperCamelCase from 'uppercamelcase';

import * as Icon from '@bolt/components-icons/dist';

const backgroundStyles = [
  'circle'
];


// const Component = withComponent(withPreact());

export default class BoltIcon extends withComponent(withPreact()) {
  static get is() {
    return 'bolt-icon';
  }

  static props = {
    name: props.string,
    size: props.string,
    background: props.string
  }

  renderCallback({ props }) {
    // const sizeNumber = cssClassForSize();
    const classes = css(
      'c-bolt-icon',
      props.size && spacingSizes[props.size]  ? `c-bolt-icon--${props.size}` : `c-bolt-icon--medium`,
      props.name ? `c-bolt-icon--${props.name}` : '',
      props.background && backgroundStyles.includes(props.background) ? `c-bolt-icon--has-${props.background}-background` : ''
    );

    const iconName = props.name ? upperCamelCase(props.name) : '';
    const size = props.size && spacingSizes[props.size] ? (spacingSizes[props.size].replace('rem', '') * 16 / 2) : spacingSizes['medium'];
    const IconTag = Icon[iconName];
    
    return (
      <div>
        <style>{styles[0][1]}</style>
        <IconTag className={classes} size={size} />
      </div>
    )
  }
}

customElements.define('bolt-icon', BoltIcon);
