
import { props, withComponent, define } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';
import { Preact } from 'preact';
import StyledMixin from '../../../scripts/utils/styled-mixin.js';
import css from '../../../scripts/utils/css.js';

import upperCamelCase from 'uppercamelcase';
import styles from './icon.scss';
import { sizes as spacingSizes } from '../../../scripts/utils/spacing-sizes.js';
import * as Icon from '../../bolt-icons/dist';

const backgroundStyles = [
  'circle'
];


const Component = withComponent(withPreact());

export default class BoltIcon extends StyledMixin(Component) {
  static get is() {
    return 'bolt-icon';
  }

  static get styleSheet() {
    return styles;
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
    const size = props.size && spacingSizes[props.size] ? spacingSizes[props.size] : spacingSizes['medium'];
    const IconTag = Icon[iconName];
  
    return (
      <IconTag className={classes} size={size} />
    );
  }
}

define(BoltIcon);
