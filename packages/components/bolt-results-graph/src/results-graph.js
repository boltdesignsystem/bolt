import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './results-graph.scss';
import schema from '../results-graph.schema';

let cx = classNames.bind(styles);

@customElement('bolt-results-graph')
class BoltResultsGraph extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-results-graph', {
      [`c-bolt-results-graph--disabled`]: this.disabled,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltResultsGraph };
