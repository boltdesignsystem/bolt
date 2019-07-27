const SimpleSwitch = require('a-simple-switch');

/**
 * Sets the active region: Without Pega if checked=false, With Pega if checked=true
 *
 * @param {boolean} checked
 *
 * @return {void}
 */
const setActiveRegion = checked => {
  const activeWoClass = 'c-pega-wwo__active-wo';
  const activeWClass = 'c-pega-wwo__active-w';
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');
  mainWrapper.classList.add(checked ? activeWClass : activeWoClass);
  mainWrapper.classList.remove(checked ? activeWoClass : activeWClass);
};

window.onload = () => {
  const toggleInputClass = '#c-pega-wwo__toggle-input';
  SimpleSwitch.init();
  setActiveRegion(document.querySelector(toggleInputClass).checked);
  console.log(document.querySelector(toggleInputClass));
  document
    .querySelector('#c-pega-wwo__toggle-input')
    .addEventListener('change', e => {
      setActiveRegion(e.target.checked);
    });
};
