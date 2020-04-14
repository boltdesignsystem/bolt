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

  connectedCallback(){
    super.connectedCallback && super.connectedCallback();
    this.innerHTML = ''; // everything gets rendered based on the props passed in so no need to use a boatload of replace-with-children helpers
  }

  render() {
    const classes = cx('c-bolt-progress-bar', {
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
        aria-valuemin="${this.min || 0}"
        aria-valuemax="${this.max}"
        aria-valuenow="${this.value}"
        aria-label="${ifDefined(this.title)}"
      >
        ${this.title !== undefined
          ? html`
              <div class="c-bolt-progress-bar__title">${this.title}</div>
            `
          : ''}
        <div class="c-bolt-progress-bar__track">
          <span
            class="${fillClasses}"
            style="transform: translate3d(${valuePercent}%, 0, 0) translate3d(-100%, 0, 0);"
          >
          </span>
        </div>

        ${this.valuePosition !== 'none'
          ? html`
              <div class="c-bolt-progress-bar__value">
                ${this.valueText
                  ? this.valueText
                  : `${Math.round(valuePercent)}%`}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

export { BoltProgressBar };
