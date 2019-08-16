import Swiper from 'swiper';
import handleBlockTitleMobileAccordionClick from './accordion';
import handleResize from './handleResize';
import {
  triggerActiveRegionChange,
  handleActiveRegionChangeRequest,
} from './handleActiveRegionChange';

// Set up the resize listener which helps with some of the abs. pos. stuff.
handleResize();
window.addEventListener('resize', handleResize);

// Initialize the with/without slide-toggle.
const toggleInputClass = '#c-pega-wwo__toggle';

// Initialize the swiper for sliding between with and without.
const wwoSwiper = new Swiper('.c-pega-wwo__swiper-container', {
  speed: 500,
  spaceBetween: 0,
  noSwiping: true,
});

// Pushed to bottom of call stack b/c w/o shadowdom enabled it breaks if not.
setTimeout(() => {
  // Initialize the page.
  triggerActiveRegionChange(
    document.querySelector(toggleInputClass).checked,
    wwoSwiper,
    true,
  );
}, 0);

// Wire up the toggler to the event region switcher.
document.querySelector(toggleInputClass).addEventListener('change', e => {
  handleActiveRegionChangeRequest(e.target.checked, wwoSwiper);
});

// Add animation start and end event listeners to keep event from firing while in progress.
const animControllerEl = document.querySelector('#c-pega-wwo__wrapper');
animControllerEl.addEventListener('animateStart', e => {
  e.target.setAttribute('anim-in-progress', 1);
});
animControllerEl.addEventListener('animateEnd', e => {
  e.target.removeAttribute('anim-in-progress');
  const activeAttr = animControllerEl.getAttribute('active');
  const checkedStateOfAnimation = activeAttr === 'w';
  const input = document.querySelector(toggleInputClass);
  if (input.checked !== checkedStateOfAnimation) {
    handleActiveRegionChangeRequest(input.checked, wwoSwiper);
  }
});

// Initialize the accordion.
document.querySelectorAll('.c-pega-wwo__region-blocks').forEach(el => {
  el.addEventListener('click', handleBlockTitleMobileAccordionClick);
});

const learnMoreModal = document.querySelector('.c-pega-www__modal--learn-more');
const learnMoreVideo = document.querySelector('.c-pega-www__video--learn-more');

learnMoreModal.addEventListener('modal:show', function() {
  learnMoreVideo.play();
});

learnMoreModal.addEventListener('modal:hide', function() {
  learnMoreVideo.pause();
});
