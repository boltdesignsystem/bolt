import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './radio-switch.scss';
// let cx = classNames.bind(styles);

@define
class BoltRadioSwitch extends withLitHtml() {
  static is = 'bolt-radio-switch';

  // static props = {
  //   schema: props.object,
  //   formData: props.object,
  //   template: props.string,
  //   initialLayout: props.any, //PropTypes.oneOf(['vertical', 'horizontal']),
  // };

  constructor(props) {
    super(props);
    this.useShadow = false;
    this.onFormChange = this.onFormChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  onFormChange(value) {
    const changeCaseElements = document.querySelectorAll('bolt-change-case');
    const schemaTable = this.closest('bolt-schema-table');
    if (value === 'wc') {
      changeCaseElements.forEach(element => {
        element.setAttribute('mode', 'kebab');
      });
    } else {
      changeCaseElements.forEach(element => {
        element.setAttribute('mode', 'camel');
      });
    }

    if (schemaTable) {
      let docsTypeClassToAdd;
      let docsTypeClassToRemove;
      if (value === 'wc') {
        docsTypeClassToAdd = 'is-wc';
        docsTypeClassToRemove = 'is-twig';
      } else {
        docsTypeClassToAdd = 'is-twig';
        docsTypeClassToRemove = 'is-wc';
      }

      schemaTable.classList.add(docsTypeClassToAdd);
      schemaTable.classList.remove(docsTypeClassToRemove);
    }
  }

  render() {
    this.onFormChange('twig');

    return html`
      ${this.addStyles([styles])}
      <ul class="c-bolt-radio-switch">
        <li class="c-bolt-radio-switch__item">
          <input
            value="twig"
            class="c-bolt-radio-switch__input reset"
            type="radio"
            name="radioSwitch"
            id="radio1"
            checked
            @change=${e => this.onFormChange(e.target.value)}
          />
          <label class="c-bolt-radio-switch__label" for="radio1">Twig</label>
        </li>

        <li class="c-bolt-radio-switch__item">
          <input
            value="wc"
            class="c-bolt-radio-switch__input reset"
            type="radio"
            name="radioSwitch"
            id="radio2"
            @change=${e => this.onFormChange(e.target.value)}
          />
          <label class="c-bolt-radio-switch__label" for="radio2"
            >Web Component</label
          >
          <div aria-hidden="true" class="c-bolt-radio-switch__toggle">
            <span class="c-bolt-radio-switch__marker"></span>
          </div>
        </li>
      </ul>
    `;
  }
}
