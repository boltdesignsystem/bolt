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

  /**
   * Percent of current progress relative to whole progress bar (max - min)
   * @see https://github.com/vaadin/vaadin-progress-bar/blob/next/src/vaadin-progress-mixin.ts#L90 for reference
   *
   * @param {number} value - the current value
   * @param {number} min - the minimum allowed value
   * @param {number} max - the maximum allowed value
   * @returns {number} normalized value between 0 and 1
   */
  _normalizeValue(value, min, max) {
    let nV;

    if (!value && value !== 0) {
      nV = 0;
    } else if (min >= max) {
      nV = max;
    } else {
      nV = (value - min) / (max - min);
      nV = Math.min(Math.max(nV, 0), 1);
    }
    return nV;
  }

  render() {
    const classes = cx('c-bolt-progress-bar', {
      [`c-bolt-progress-bar--animated`]: this.animated,
      [`c-bolt-progress-bar--${this.valuePosition}`]: this.valuePosition,
    });

    const fillClasses = cx('c-bolt-progress-bar__fill', {
      [`c-bolt-progress-bar__fill--at-max`]: this.value >= this.max,
    });

    const adjustedValue = Math.min(Math.max(this.value, this.min), this.max);
    const percentComplete = Math.round(
      this._normalizeValue(this.value, this.min, this.max) * 100,
    );

    const displayedValue =
      this.valueFormat === 'percent'
        ? `${percentComplete}%`
        : `${adjustedValue} of ${this.max}`; // @todo: shouldn't `of` be translatable here? If so, how do we want to handle this?

    return html`
      <div
        role="progressbar"
        class="${classes}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuenow="${adjustedValue}"
        aria-label="${displayedValue}"
      >
        <div class="c-bolt-progress-bar__track">
          <span
            class="${fillClasses}"
            style="transform: translate3d(${percentComplete}%, 0, 0) translate3d(-100%, 0, 0);"
          >
          </span>
        </div>
        <div class="c-bolt-progress-bar__value">${displayedValue}</div>
      </div>
    `;
  }
}

export { BoltProgressBar };
