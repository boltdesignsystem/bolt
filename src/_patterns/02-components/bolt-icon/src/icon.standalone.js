import {
  // BoltComponent,
  spacingSizes,
  utils
} from '@bolt/core';

const css = utils.css.default;

import { props, withComponent, define } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';
import { Preact } from 'preact';
import styles from './icon.scss';

const sizes = spacingSizes.spacingSizes;

import upperCamelCase from 'uppercamelcase';

import * as Icon from '@bolt/components-icons';

const backgroundStyles = [
  'circle'
];


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
    const classes = css(
      'c-bolt-icon',
      props.size && sizes[props.size] && sizes[props.size] !== ''  ? `c-bolt-icon--${props.size}` : ``,
      props.name ? `c-bolt-icon--${props.name}` : '',
      props.background && backgroundStyles.includes(props.background) ? `c-bolt-icon--has-${props.background}-background` : ''
    );

    const iconName = props.name ? upperCamelCase(props.name) : '';
    const size = props.size && sizes[props.size] ? (sizes[props.size].replace('rem', '') * 16 / 2) : sizes['medium'];
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
