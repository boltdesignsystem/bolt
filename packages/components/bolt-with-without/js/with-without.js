import Swiper from 'swiper';
import * as SimpleSwitch from './Switch';
import handleBlockTitleMobileAccordionClick from './accordion';
import handleResize from './handleResize';
import handleActiveRegionChange from './handleActiveRegionChange';

// Set up the resize listener which helps with some of the abs. pos. stuff.
handleResize();
window.addEventListener('resize', handleResize);

// Initialize the with/without slide-toggle.
const toggleInputClass = '#c-pega-wwo__toggle-input';
SimpleSwitch.init();

// Initialize the swiper for sliding between with and without.
const wwoSwiper = new Swiper('.c-pega-wwo__swiper-container', {
  speed: 500,
  spaceBetween: 0,
});

// Initialize the page.
handleActiveRegionChange(
  document.querySelector(toggleInputClass).checked,
  wwoSwiper,
  true,
);

// Wire up the toggler to the event region switcher.
document
  .querySelector('#c-pega-wwo__toggle-input')
  .addEventListener('change', e => {
    handleActiveRegionChange(e.target.checked, wwoSwiper);
  });

// Initialize the accordion.
document.querySelectorAll('.c-pega-wwo__region-blocks').forEach(el => {
  el.addEventListener('click', handleBlockTitleMobileAccordionClick);
});

