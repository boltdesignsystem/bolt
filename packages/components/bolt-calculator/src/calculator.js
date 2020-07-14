// Documentation options can be found here https://github.com/nosir/cleave.js/blob/master/doc/options.md
import Cleave from 'cleave.js';

import styles from './calculator.scss';
// import schema from '../calculator.schema';

export default class Calculator {
  constructor(el) {
    this.el = el;
    this.form = this.el.querySelector('form');
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
        let inputValue = inputs[i].value;
        switch (inputs[i].closest('fieldset').dataset.type) {
          case 'amount':
            console.log('amount');
            const cleaveAmount = new Cleave(
              e.currentTarget,
              this.config.cleaveAmountOptions,
            );
            break;
          case 'percent':
            console.log('percent');
            const cleavePercent = new Cleave(
              e.currentTarget,
              this.config.cleavePercentOptions,
            );
            break;
          default:
            console.log('number');
            const cleaveNumber = new Cleave(
              e.currentTarget,
              this.config.cleaveNumberOptions,
            );
        }
      });
    }

    // On Submit
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.submit(e);
    });
  }

  results() {
    // Process the submit data and output in the results template
  }

  submit(e) {
    // On submit grab all the data from the fields to be be submitted
    console.log(e);
  }

  validation() {
    // Need to provide validation before the calcultor is submitted
  }
}
