
import { props, withComponent, define } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';
import { Preact } from 'preact';
import StyledMixin from '../../../00-utils/util/styled-mixin.js';
import css from '../../../00-utils/util/css.js';

import upperCamelCase from 'uppercamelcase';
import styles from './icon.scss';
import { sizes as spacingSizes } from '../../../00-utils/util/spacing-sizes.js';
import * as Icon from '../../bolt-icons/dist';


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
    size: props.string
  }

  renderCallback({ props }) {
    // const sizeNumber = cssClassForSize();
    const classes = css(
      'c-bolt-icon',
      props.size && spacingSizes[props.size]  ? `c-bolt-icon--${props.size}` : `c-bolt-icon--medium`,
      props.name ? `c-bolt-icon--${props.name}` : ''
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
