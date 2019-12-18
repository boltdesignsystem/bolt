import { html, customElement } from '@bolt/element';
import { props } from '@bolt/core-v3.x/utils';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './stack.scss';

let cx = classNames.bind(styles);

@customElement('bolt-stack')
class BoltStack extends withLitHtml {
  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-stack', {
      [`c-bolt-stack--disabled`]: disabled,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltStack };
