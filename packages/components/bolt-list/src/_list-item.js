import { html, customElement } from '@bolt/element';
import { props } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitContext } from '@bolt/core/renderers/renderer-lit-html';
import styles from './_list-item.scss';

let cx = classNames.bind(styles);

@customElement('bolt-list-item')
class BoltListItem extends withLitContext {
  static props = {
    last: props.boolean,
  };

  connectedCallback() {
    super.connectedCallback();
  }

  static get observedContexts() {
    return ['tag', 'spacing', 'inset', 'separator', 'display', 'align'];
  }

  contextChangedCallback(name, oldValue, value) {
    this.triggerUpdate();
  }

  render() {
    const { tag, spacing, inset, separator, display, align } = this.context;
    const { last } = this.props;

    const classes = cx('c-bolt-list-item', {
      [`c-bolt-list-item--display-${display}`]: display,
      [`c-bolt-list-item--spacing-${spacing}`]: spacing !== 'none',
      [`c-bolt-list-item--separator-${separator}`]: separator !== 'none',
      [`c-bolt-list-item--align-${align}`]: align,
      [`c-bolt-list-item--last-item`]: last,
      [`c-bolt-list-item--inset`]: inset,
    });

    return html`
      ${this.addStyles([styles])}
      ${tag === 'ul' || tag === 'ol'
        ? html`
            <li class="${classes}">${this.slot('default')}</li>
          `
        : html`
            <span class="${classes}">${this.slot('default')} </span>
          `}
    `;
  }
}

export { BoltListItem };
