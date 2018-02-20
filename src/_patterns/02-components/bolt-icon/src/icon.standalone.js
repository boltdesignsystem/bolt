import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes,
  hasNativeShadowDomSupport
} from '@bolt/core';

import upperCamelCase from 'uppercamelcase';

import styles from './icon.scss';
import * as Icon from '@bolt/components-icons';

const backgroundStyles = [
  'circle',
  'square'
];

const colors = [
  'teal',
  'blue'
]


@define
export class BoltIcon extends withComponent(withPreact()) {
  static is = 'bolt-icon';

  static props = {
    name: props.string,
    size: props.string,
    background: props.string,
    color: props.string
  }

  constructor(element){
    super(element);
    this.useShadow = hasNativeShadowDomSupport;
  }

  render({ props }) {
    const classes = css(
      'c-bolt-icon',
      props.size && spacingSizes[props.size] && spacingSizes[props.size] !== '' ? `c-bolt-icon--${props.size}` : ``,
      props.name ? `c-bolt-icon--${props.name}` : '',
      props.color && colors.includes(props.color) ? `c-bolt-icon--${props.color}` : ``
    );


    const backgroundClasses = css(
      'c-bolt-icon__background',
      props.background && backgroundStyles.includes(props.background) ? `c-bolt-icon__${props.background}-background` : ''
    )

    const iconClasses = css(
      'c-bolt-icon__icon',
    )

    const iconName = props.name ? upperCamelCase(props.name) : '';
    const size = props.size && spacingSizes[props.size] ? spacingSizes[props.size].replace('rem', '') * 16 / 2 : spacingSizes['medium'].replace('rem', '') * 16 / 2;
    const IconTag = Icon[iconName];

    return (
      <div className={classes}>
        {this.useShadow &&
          <style>{styles[0][1]}</style>
        }
        <IconTag className={iconClasses} size={size} />
        {props.background && props.size == "xlarge" &&
          <span class={backgroundClasses}></span>
        }
      </div>
    )
  }
}
