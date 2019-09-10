import { triggerAnims } from '@bolt/components-animate/utils';
import pierceShadowDomEls from './shadowDomPiercingHacks';

const setActiveRegionAttr = (inactiveToRemove, activeToSet) => {
  const mainWrapper = document.querySelector('#c-pega-wwo__wrapper');
  mainWrapper.setAttribute('active', activeToSet);
};

/*
 * Filter els by likely invisibility.
 * Triggering animations on els with display: none parents breaks all subsequent animations.
 * Based on @https://davidwalsh.name/offsetheight-visibility
 */
const filterInvisibles = els => {
  return els.filter(el => el.offsetHeight > 0);
};

const getCurriedPageLoadAnimation = mainWrapper => {
  return () => {
    console.debug('triggered:InitialAnimation');
    const animInitOutEls = Array.from(
      mainWrapper.querySelectorAll('bolt-animate[group="initial"][out]'),
    );
    const animInitEls = Array.from(
      mainWrapper.querySelectorAll('bolt-animate[group="initial"][in]'),
    );
    triggerAnims({ animEls: animInitOutEls, stage: 'OUT' });
    // Here we filter display:none bolt-animates b/c they break all subsequent.
    return triggerAnims({
      animEls: filterInvisibles(animInitEls),
      stage: 'IN',
    });
  };
};

const getCurriedAnimateContentOut = (
  outGroupAttrVal,
  inGroupAttrVal,
  mainWrapper,
) => {
  return async () => {
    console.debug('triggered:BeforeSlideAnimation');
    const animOutEls = Array.from(
      mainWrapper.querySelectorAll(
        `bolt-animate[group="${outGroupAttrVal}"][out]:not([type="in-effect-only"])`,
      ),
    );
    // console.log('getCurriedAnimateContentOut', filterInvisibles(animOutEls));
    await triggerAnims({
      animEls: filterInvisibles(animOutEls),
      stage: 'OUT',
      debug: true,
    });
  };
};

/**
 *
 * Trigger "out" on "in-effect-only" animations.
 * There is a class of animations "in-effect-only" which do not animate out visible.
 * Instead, these must be animated out manually so they can be animated back in.
 *
 * @param groupAttrVal
 * @param mainWrapper
 * @returns {void}
 */
const triggerAnimateOutOnInOnlyContent = async (groupAttrVal, mainWrapper) => {
  console.debug('triggered:triggerAnimateOutOnInOnlyContent');
  const animOutEls = Array.from(
    mainWrapper.querySelectorAll(
      `bolt-animate[group="${groupAttrVal}"][type="in-effect-only"]`,
    ),
  );
  document
    .querySelector(`#c-pega-wwo__self-drawing-circle[group="${groupAttrVal}"]`)
    .triggerAnimOut();

  console.debug('triggering:triggerAnimateOutOnInOnlyContent animInEls');
  await triggerAnims({
    animEls: filterInvisibles(animOutEls),
    stage: 'OUT',
    debug: true,
  });
  console.debug('triggered done:triggerAnimateOutOnInOnlyContent animInEls');

};

const triggerAnimateInOnInOnlyContent = async inGroupAttrVal => {
  console.debug('triggered:triggerAnimateInOnInOnlyContent');
  const animOutEls = Array.from(
    document.querySelectorAll(
      `bolt-animate[group="${inGroupAttrVal}"][type="in-effect-only"]`,
    ),
  );

  console.log('triggerAnimateInOnInOnlyContent animInEls', animOutEls);
  await triggerAnims({
    animEls: filterInvisibles(animOutEls),
    stage: 'IN',
    debug: true,
  });
};

/**
 *
 * Trigger "in" on "out-effect-only" animations.
 * There is a class of animations "out-effect-only" which are only supposed to
 * trigger when the content is leaving, or on content "out". These must become
 * visible again before we slide into that content and/or attempt to trigger
 * a different animation within a potentially faded-out area.
 *
 * @param groupAttrVal
 * @param mainWrapper
 * @returns {void}
 */
const triggerAnimateInOnOutOnlyContent = async (groupAttrVal, mainWrapper) => {
  console.debug('triggerAnimateInOnOutOnlyContent');
  const animOutEls = Array.from(
    mainWrapper.querySelectorAll(
      `bolt-animate[group="${groupAttrVal}"][type="out-effect-only"]`,
    ),
  );

  // console.log(' triggerAnimateInOnOutOnlyContent animOutEls', animOutEls);
  await triggerAnims({
    animEls: filterInvisibles(animOutEls),
    stage: 'IN',
    debug: true,
  });
};

const getCurriedAnimateContentIn = (inGroupAttrVal, mainWrapper) => {
  return async () => {
    console.debug('triggered:AnimateContentIn ');

    const animInEls = Array.from(
      mainWrapper.querySelectorAll(
        `bolt-animate[group="${inGroupAttrVal}"][in]:not([type="out-effect-only"])`,
      ),
    );

    setTimeout(() => {
      document
        .querySelector(
          `#c-pega-wwo__self-drawing-circle[group="${inGroupAttrVal}"]`,
        )
        .triggerAnimIn();
    }, 0);
    // console.log('AnimateContentIn', animInEls);

    await triggerAnims({
      animEls: filterInvisibles(animInEls),
      stage: 'IN',
      debug: true,
    });

    console.log('about to dispatch animateEnd', mainWrapper);
    mainWrapper.dispatchEvent(
      new CustomEvent('animateEnd', {
        bubbles: false,
      }),
    );
  };
};

const restoreContentBeforeSlideIn = async (inGroupAttrVal, mainWrapper) => {
  await triggerAnimateInOnOutOnlyContent(inGroupAttrVal, mainWrapper);
  await triggerAnimateOutOnInOnlyContent(inGroupAttrVal, mainWrapper);
  return true;
};

/**
 * Controls the animation in/out of active with/without (w/wo) region.
 *
 * @param {boolean} checked: whether or not the input is checked.
 * @param {Swiper} wwoSwiper: Initialized instance of a Swiper.
 * @param {boolean} init: Whether or not this is the initial, i.e. page load animation.
 *
 * @return {void}
 */
const triggerActiveRegionChange = async (checked, wwoSwiper, init = false) => {
  const mainWrapper = document.querySelector('#c-pega-wwo__wrapper');
  mainWrapper.dispatchEvent(
    new CustomEvent('animateStart', {
      bubbles: false,
    }),
  );
  const withIsBecomingActive = checked;
  // w stands for with, wo stands for without
  const inGroupAttrVal = withIsBecomingActive ? 'w' : 'wo';
  const outGroupAttrVal = withIsBecomingActive ? 'wo' : 'w';
  setActiveRegionAttr(outGroupAttrVal, inGroupAttrVal);

  if (init) {
    pierceShadowDomEls(mainWrapper);

    getCurriedPageLoadAnimation(mainWrapper)();

    if (withIsBecomingActive) {
      // In this case the checked button is With Pega, so transition to that slide first.
      wwoSwiper.once(
        'slideChangeEnd',
        getCurriedPageLoadAnimation(mainWrapper),
      );
      wwoSwiper.slideNext();
    }

    // Fire the content initialization animations.
    getCurriedAnimateContentIn(inGroupAttrVal, mainWrapper)();
  } else {
    // The event handler for swiper doesn't respect await, so trigger here directly.

    await restoreContentBeforeSlideIn(inGroupAttrVal, mainWrapper);
    await getCurriedAnimateContentOut(
      outGroupAttrVal,
      inGroupAttrVal,
      mainWrapper,
    )();

    wwoSwiper.once(
      'slideChangeTransitionEnd',
      getCurriedAnimateContentIn(inGroupAttrVal, mainWrapper),
    );
    if (withIsBecomingActive) {
      wwoSwiper.slideNext();
    } else {
      wwoSwiper.slidePrev();
    }
  }
  return true;
};

const handleActiveRegionChangeRequest = (checked, wwoSwiper) => {
  const animControllerEl = document.querySelector('#c-pega-wwo__wrapper');
  const animIsInProgress = !!animControllerEl.getAttribute('anim-in-progress');

  if (animIsInProgress) {
    return;
  }
  triggerActiveRegionChange(checked, wwoSwiper);
};

export {
  triggerAnimateInOnInOnlyContent,
  triggerActiveRegionChange,
  handleActiveRegionChangeRequest,
};
