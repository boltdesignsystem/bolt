// Documentation options can be found here https://github.com/nosir/cleave.js/blob/master/doc/options.md
import Cleave from 'cleave.js';

export default class Calculator {
  constructor(el) {
    this.el = el;
    this.form = this.el.parentNode;
    this.config = {
      cleaveAmountOptions: {
        prefix: '$',
        numeral: true,
        signBeforePrefix: true,
        numeralThousandsGroupStyle: 'thousand',
      },
      cleaveNumberOptions: {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
      },
      cleavePercentOptions: {
        numeral: true,
        prefix: '%',
        tailPrefix: true,
      },
    };
    this.bindEvents();
  }

  bindEvents() {
    // On input keyup
    const inputs = this.form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keyup', e => {
        const inputType = inputs[i].closest('[data-type]').dataset.type;
        switch (inputType) {
          case 'amount':
            const cleaveAmount = new Cleave(
              e.currentTarget,
              this.config.cleaveAmountOptions,
            );
            break;
          case 'percent':
            const cleavePercent = new Cleave(
              e.currentTarget,
              this.config.cleavePercentOptions,
            );
            break;
          default:
            const cleaveNumber = new Cleave(
              e.currentTarget,
              this.config.cleaveNumberOptions,
            );
        }
      });
    }
  }
}
