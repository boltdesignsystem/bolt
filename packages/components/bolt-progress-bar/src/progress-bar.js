import { unsafeCSS, html, customElement, BoltElement } from '@bolt/element';
import classNames from 'classnames/bind';
import progressStyles from './progress-bar.scss';
//import schema from '../progress-bar.schema.yml';

let cx = classNames.bind(progressStyles);

@customElement('bolt-progress-bar')
class BoltProgressBar extends BoltElement {
  static get styles() {
    return [unsafeCSS(progressStyles)];
  }

  static get properties() {
    return {
      title: {
        type: String,
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
      },
      value: {
        type: Number,
      },
      indeterminate: {
        type: Boolean,
      },
      animated: {
        type: Boolean,
      },
      striped: {
        type: Boolean,
      },
      valueText: {
        type: String,
        attribute: 'value-text',
      },
      valuePosition: {
        type: String,
        attribute: 'value-position',
      },
    };
  }

  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.value = 0;
  }

  render() {
    const classes = cx('c-bolt-progress-bar', {
      [`c-bolt-progress-bar--indeterminate`]: this.indeterminate,
      [`c-bolt-progress-bar--striped`]: this.striped || this.animated,
      [`c-bolt-progress-bar--animated`]: this.animated,
      [`c-bolt-progress-bar--${this.valuePosition || 'outside'}`]: this
        .valuePosition
        ? this.valuePosition
        : 'outside',
    });

    const fillClasses = cx('c-bolt-progress-bar__fill', {
      [`c-bolt-progress-bar__fill--at-max`]: this.value >= this.max,
      [`c-bolt-progress-bar__fill--at-min`]: this.value <= this.min,
    });

    if (this.value > this.max) {
      this.value = this.max;
    } else if (this.value < this.min) {
      this.value = this.min;
    }

    const valuePercent =
      this.value === 0 || this.max === 0
        ? this.value
        : (this.value / this.max) * 100;

    return html`
      <div
        role="progressbar"
        class="${classes}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.value}"
        aria-label="${this.title}"
      >
        ${this.title &&
          html`
            <div class="c-bolt-progress-bar__title">${this.title}</div>
          `}
        <div class="c-bolt-progress-bar__value">
          ${this.valueText ? this.valueText : `${this.value}%`}
        </div>
        <div class="c-bolt-progress-bar__track">
          <span
            class="${fillClasses}"
            style="transform: translate3d(${valuePercent}%, 0, 0) translate3d(-100%, 0, 0);"
          >
          </span>
        </div>
      </div>
    `;
  }
}

export { BoltProgressBar };
