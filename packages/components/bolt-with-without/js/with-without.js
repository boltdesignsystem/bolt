import { triggerAnims } from '@bolt/components-animate/utils';
const SimpleSwitch = require('a-simple-switch');

const setActiveRegionClass = (inactiveToRemove, activeToSet) => {
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');
  const activeWoClass = 'c-pega-wwo__active-';
  mainWrapper.classList.add(`${activeWoClass}${activeToSet}`);
  mainWrapper.classList.remove(`${activeWoClass}${inactiveToRemove}`);
};

/**
 * Controls the animation in/out of active with/without (w/wo) region.
 *
 * @param {boolean} checked
 *
 * @return {void}
 */
const handleActiveRegionChange = (checked, init = false) => {
  setTimeout(async () => {
    const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');

    // w stands for with, wo stands for without
    const inGroupAttrVal = checked ? 'w' : 'wo';
    const outGroupAttrVal = checked ? 'wo' : 'w';
    if (init) {
      setActiveRegionClass(outGroupAttrVal, inGroupAttrVal);
    }
    const animInitOutEls = !init
      ? []
      : Array.from(
          mainWrapper.querySelectorAll('bolt-animate[group="initial"][out]'),
        );
    const animInitEls = !init
      ? []
      : Array.from(
          mainWrapper.querySelectorAll('bolt-animate[group="initial"][in]'),
        );
    const animInEls = Array.from(
      mainWrapper.querySelectorAll(
        `bolt-animate[group="${inGroupAttrVal}"][in]`,
      ),
    );
    const animOutEls = init
      ? []
      : Array.from(
          mainWrapper.querySelectorAll(
            `bolt-animate[group="${outGroupAttrVal}"][out]`,
          ),
        );

    if (init) {
      triggerAnims({ animEls: animInitOutEls, stage: 'OUT' });

      await triggerAnims({ animEls: animInitEls, stage: 'IN' });
    } else {
      console.log('animout', animOutEls);
      triggerAnims({ animEls: animOutEls, stage: 'OUT' });
      setActiveRegionClass(outGroupAttrVal, inGroupAttrVal);
    }
    // TODO set up phpstorm debugger to figure out why this is not working
    console.log('animInEls', animInEls);
    triggerAnims({ animEls: animInEls, stage: 'IN' });
  }, 0);
};

const toggleInputClass = '#c-pega-wwo__toggle-input';
SimpleSwitch.init();
handleActiveRegionChange(document.querySelector(toggleInputClass).checked, true);
document
  .querySelector('#c-pega-wwo__toggle-input')
  .addEventListener('change', e => {
    handleActiveRegionChange(e.target.checked);
  });
