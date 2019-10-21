import Swiper from 'swiper';
import handleBlockTitleMobileAccordionClick from './accordion';
import handleResize from './handleResize';
import {
  triggerActiveRegionChange,
  handleActiveRegionChangeRequest,
} from './handleActiveRegionChange';
import blurEdgeFocus from './blurEdgeFocus';

const fireInitialAnimations = (toggleInputs, checkedValue, wwoSwiper) => {
  // Pushed to bottom of call stack b/c w/o shadowdom enabled it breaks if not.
  // Set up the resize listener which helps with some of the abs. pos. stuff.
  handleResize()();
  setTimeout(() => {
    // Initialize the page.
    triggerActiveRegionChange(
      toggleInputs[0].id === checkedValue,
      wwoSwiper,
      true,
    );
    // Force just the size-setting event to set height properly after dom loaded to fix content overlap bug on tablet.
    // We want height to be accurate as soon as possible *and* afterward, so this lightweight double-check should stay.
    handleResize(true, false)();
  }, 0);
};

(() => {
  const toggleInputsWrapper = document.getElementById('c-pega-wwo__toggle');

  // short-circuit all the things if no toggler is found.
  if (!toggleInputsWrapper) {
    return;
  }

  const toggleInputs = Array.from(
    document.querySelectorAll('.c-pega-www__toggle-input'),
  );

  // Get accurate height as soon as possible.
  handleResize(true, false)();
  window.addEventListener('resize', handleResize());

  // This was moved from a checkbox to a radio.
  const checkedValue = 'w';

  // Initialize the swiper for sliding between with and without.
  const wwoSwiper = new Swiper('#c-pega-wwo__swiper-container', {
    speed: 500,
    spaceBetween: 0,
    noSwiping: true,
  });

  // Wire up the toggler to the event region switcher.
  toggleInputs.forEach(el => {
    el.addEventListener('change', e => {
      handleActiveRegionChangeRequest(e.target.id === 'w', wwoSwiper);
      blurEdgeFocus();
    });
  });

  // Add animation start and end event listeners to keep event from firing while in progress.
  const animControllerEl = document.querySelector('#c-pega-wwo__wrapper');

  if (animControllerEl) {
    animControllerEl.addEventListener('animateStart', e => {
      e.target.setAttribute('anim-in-progress', 1);
    });

    animControllerEl.addEventListener('animateEnd', e => {
      e.target.removeAttribute('anim-in-progress');
      // If the animation state doesn't match the state of the toggle, transition.
      const activeAttr = animControllerEl.getAttribute('active');
      const checkedRadio = toggleInputs.find(input => input.checked);
      if (checkedRadio.id !== activeAttr) {
        handleActiveRegionChangeRequest(
          checkedRadio.id === checkedValue,
          wwoSwiper,
        );
      }
    });
  }

  // Initialize the accordion.
  document.querySelectorAll('.c-pega-wwo__region-blocks').forEach(el => {
    el.addEventListener('click', handleBlockTitleMobileAccordionClick);
  });

  // Set up the modals.
  const learnMoreModal = document.querySelector(
    '.c-pega-www__modal--learn-more',
  );
  const learnMoreVideo = document.querySelector(
    '.c-pega-www__video--learn-more',
  );

  if (learnMoreModal) {
    learnMoreModal.addEventListener('modal:show', function() {
      if (learnMoreVideo) {
        learnMoreVideo.play();
      }
    });

    learnMoreModal.addEventListener('modal:hide', function() {
      if (learnMoreVideo) {
        learnMoreVideo.pause();
      }
    });
  }

  // Only fire initial animations on intersection.
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.5) {
            fireInitialAnimations(toggleInputs, checkedValue, wwoSwiper);
            observer.unobserve(toggleInputsWrapper);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 50px 0px',
        threshold: 1,
      },
    );
    observer.observe(toggleInputsWrapper);
  } else {
    fireInitialAnimations(toggleInputs, checkedValue, wwoSwiper);
  }
})();
