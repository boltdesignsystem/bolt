import {
  unsafeCSS,
  html,
  customElement,
  BoltElement,
  ifDefined,
} from '@bolt/element';
import classNames from 'classnames/bind';
import progressStyles from './progress-bar.scss';
import schema from '../progress-bar.schema.js';

let cx = classNames.bind(progressStyles);

@customElement('bolt-progress-bar')
class BoltProgressBar extends BoltElement {
  static get styles() {
    return [unsafeCSS(progressStyles)];
  }

  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.innerHTML = ''; // everything gets rendered based on the props passed in so no need to use a boatload of replace-with-children helpers
  }

  render() {
    const classes = cx('c-bolt-progress-bar', {
      [`c-bolt-progress-bar--animated`]: this.animated,
    });

    const fillClasses = cx('c-bolt-progress-bar__fill', {
      [`c-bolt-progress-bar__fill--at-max`]: this.value >= this.max,
    });

    const fillPosition = Math(((this.value - this.max) / this.max) * 100);

    const percentComplete = Math.round(
      ((this.max - (this.max - this.value)) / this.max) * 100,
    );

    const displayedValue =
      this.valueFormat === 'percent'
        ? `${percentComplete}%`
        : `${this.value} / ${this.max}`;

    return html`
      <div
        role="progressbar"
        class="${classes}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.value}"
        aria-label="${displayedValue}"
      >
        <div class="c-bolt-progress-bar__track">
          <span
            class="${fillClasses}"
            style="transform: translate3d(${fillPosition}%, 0, 0);"
          >
          </span>
        </div>
        <div class="c-bolt-progress-bar__value">${displayedValue}</div>
      </div>
    `;
  }
}

export { BoltProgressBar };
