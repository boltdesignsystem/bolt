const SimpleSwitch = require('a-simple-switch');

/**
 * Sets the active region: Without Pega if checked=false, With Pega if checked=true
 *
 * @param {boolean} checked
 *
 * @return {void}
 */
const setActiveRegion = (checked) => {
  setTimeout(() => {
    const activeWoClass = 'c-pega-wwo__active-wo';
    const activeWClass = 'c-pega-wwo__active-w';
    // Use a different class for animations bc dom skips render/animations on display:none--so no transition
    // const activeAnimWoClass = 'c-pega-wwo__active-anim-wo';
    // const activeAnimWClass = 'c-pega-wwo__active-anim-w';
    const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');
    mainWrapper.classList.add(checked ? activeWClass : activeWoClass);
    mainWrapper.classList.remove(checked ? activeWoClass : activeWClass);
    // Both requestAnimationFrame and setTimeout are required to make sure animClass is added after activeClass.
    // window.requestAnimationFrame(() => {
    //   setTimeout(() => {
    //     mainWrapper.classList.add(checked ? activeAnimWClass : activeAnimWoClass);
    //     mainWrapper.classList.remove(checked ? activeAnimWoClass : activeAnimWClass);
    //   }, 0);
    // });
  }, 0);
};

const toggleInputClass = '#c-pega-wwo__toggle-input';
SimpleSwitch.init();
setActiveRegion(document.querySelector(toggleInputClass).checked);
document
  .querySelector('#c-pega-wwo__toggle-input')
  .addEventListener('change', e => {
    setActiveRegion(e.target.checked);
  });
