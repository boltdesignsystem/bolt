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
const toggleInputClass = '.c-pega-www__toggle-input';
// This was moved from a checkbox to a radio.
const checkedValue = 'w';

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
    document.querySelector(toggleInputClass).id === checkedValue,
    wwoSwiper,
    true,
  );
}, 0);

// Wire up the toggler to the event region switcher.
Array.from(document.querySelectorAll(toggleInputClass)).forEach(el => {
  el.addEventListener('change', e => {
    handleActiveRegionChangeRequest(e.target.id === 'w', wwoSwiper);
  });
});

// Add animation start and end event listeners to keep event from firing while in progress.
const animControllerEl = document.querySelector('#c-pega-wwo__wrapper');

animControllerEl.addEventListener('animateStart', e => {
  e.target.setAttribute('anim-in-progress', 1);
});

animControllerEl.addEventListener('animateEnd', e => {
  e.target.removeAttribute('anim-in-progress');
  // If the animation state doesn't match the state of the toggle, transition.
  const activeAttr = animControllerEl.getAttribute('active');
  const checkedRadio = Array.from(
    document.querySelectorAll(toggleInputClass),
  ).find(input => input.checked);
  if (checkedRadio.id !== activeAttr) {
    handleActiveRegionChangeRequest(input.id === checkedValue, wwoSwiper);
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
