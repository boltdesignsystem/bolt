import * as SimpleSwitch from './Switch';
import Swiper from 'swiper';
import handleBlockTitleMobileAccordionClick from './accordion';
import handleResize from './handleResize';
import handleActiveRegionChange from './handleActiveRegionChange';

const toggleInputClass = '#c-pega-wwo__toggle-input';
SimpleSwitch.init();

const wwoSwiper = new Swiper('.c-pega-wwo__swiper-container', {
  speed: 500,
  spaceBetween: 0,
});

handleActiveRegionChange(
  document.querySelector(toggleInputClass).checked,
  wwoSwiper,
  true,
);
document
  .querySelector('#c-pega-wwo__toggle-input')
  .addEventListener('change', e => {
    handleActiveRegionChange(e.target.checked, wwoSwiper);
  });

document.querySelectorAll('.c-pega-wwo__region-blocks').forEach(el => {
  el.addEventListener('click', handleBlockTitleMobileAccordionClick);
});
handleResize();
window.addEventListener('resize', handleResize);
