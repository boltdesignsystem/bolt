const SimpleSwitch = require('a-simple-switch');

/**
 * Sets the active region: Without Pega if checked=false, With Pega if checked=true
 *
 * @param {boolean} checked
 *
 * @return {void}
 */
const setActiveRegion = (checked, shouldToggleAnimations) => {
  const activeWoClass = 'c-pega-wwo__active-wo';
  const activeWClass = 'c-pega-wwo__active-w';
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');
  mainWrapper.classList.add(checked ? activeWClass : activeWoClass);
  mainWrapper.classList.remove(checked ? activeWoClass : activeWClass);
};

// const toggleAnimations = (classToActivate, classToDeactivate) => {
//   const animationClasses = ['c-pega-wwo__sm-circle'];
//   const animationAttribute = 'data-anim-triggered';
//   animationClasses.forEach((animationClass) => {
//     const activateEl = document.querySelector(`.${classToActivate} .${animationClass}`);
//     if (activateEl) {
//       activateEl.setAttribute(animationAttribute, 'yes');
//     }
//     const deActivateEl = document.querySelector(`.${classToDeactivate} .${animationClass}`);
//     if (deActivateEl) {
//       deActivateEl.setAttribute(animationAttribute, 'yes');
//     }
//   });
// };

window.onload = () => {
  setTimeout(() => {
    const toggleInputClass = '#c-pega-wwo__toggle-input';
    SimpleSwitch.init();
    setActiveRegion(document.querySelector(toggleInputClass).checked);
    document
      .querySelector('#c-pega-wwo__toggle-input')
      .addEventListener('change', e => {
        setActiveRegion(e.target.checked);
      });
  }, 4000);
};
