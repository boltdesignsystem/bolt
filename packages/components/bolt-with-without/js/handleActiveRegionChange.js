import { triggerAnims } from '@bolt/components-animate/utils';
import pierceShadowDomEls from './shadowDomPiercingHacks';

const setActiveRegionClass = (inactiveToRemove, activeToSet) => {
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');
  const activeWoClass = 'c-pega-wwo__active-';
  mainWrapper.classList.add(`${activeWoClass}${activeToSet}`);
  mainWrapper.classList.remove(`${activeWoClass}${inactiveToRemove}`);
};

/*
 * Filter els by likely invisibility.
 * Triggering animations on els with display: none parents breaks all subsequent animations. Based on @https://davidwalsh.name/offsetheight-visibility
 */
const filterInvisibles = els => {
  return els.filter(el => el.offsetHeight > 0);
};

const getCurriedPageLoadAnimation = (withIsBecomingActive, mainWrapper) => {
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
    console.log('getCurriedAnimateContentOut', filterInvisibles(animOutEls));
    await triggerAnims({
      animEls: filterInvisibles(animOutEls),
      stage: 'OUT',
      debug: true,
    });
    triggerAnimateOutOnInOnlyContent(
      outGroupAttrVal,
      inGroupAttrVal,
      mainWrapper,
    );
  };
};

/**
 *
 * Trigger "out" on "in-effect-only" animations.
 * There is a class of animations "in-effect-only" which do not animate out visible.
 * Instead, these must be animated out manually so they can be animated back in.
 *
 * @param outGroupAttrVal
 * @param inGroupAttrVal
 * @param mainWrapper
 * @returns {void}
 */
const triggerAnimateOutOnInOnlyContent = async (
  outGroupAttrVal,
  inGroupAttrVal,
  mainWrapper,
) => {
  console.debug('triggered:triggerAnimateOutOnInOnlyContent');
  const animOutEls = Array.from(
    mainWrapper.querySelectorAll(
      `bolt-animate[group="${outGroupAttrVal}"][type="in-effect-only"]`,
    ),
  );
  // mainWrapper.querySelectorAll(
  //   `bolt-animate[group="${outGroupAttrVal}"][type="in-effect-only"]`,
  // );

  console.log('triggerAnimateOutOnInOnlyContent animInEls', animOutEls);
  await triggerAnims({
    animEls: filterInvisibles(animOutEls),
    stage: 'OUT',
    debug: true,
  });
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
 * @param outGroupAttrVal
 * @param inGroupAttrVal
 * @param mainWrapper
 * @returns {void}
 */
const triggerAnimateInOnOutOnlyContent = async (
  outGroupAttrVal,
  inGroupAttrVal,
  mainWrapper,
) => {
  console.debug('triggered:RestoreInactiveContentAfterSlideAnimation');
  const animOutEls = Array.from(
    mainWrapper.querySelectorAll(
      `bolt-animate[group="${outGroupAttrVal}"][type="out-effect-only"]`,
    ),
  );
  // mainWrapper.querySelectorAll(
  //   `bolt-animate[group="${outGroupAttrVal}"][type="in-effect-only"]`,
  // );

  console.log(
    ' restorePrevSlideInactiveContentAfterSlideAnimation animOutEls',
    animOutEls,
  );
  await triggerAnims({
    animEls: filterInvisibles(animOutEls),
    stage: 'IN',
    debug: true,
  });
};

const getCurriedAnimateContentIn = (
  outGroupAttrVal,
  inGroupAttrVal,
  mainWrapper,
) => {
  return async () => {
    console.debug('triggered:AfterSlideAnimation');
    triggerAnimateInOnOutOnlyContent(
      outGroupAttrVal,
      inGroupAttrVal,
      mainWrapper,
    );
    const animInEls = Array.from(
      mainWrapper.querySelectorAll(
        `bolt-animate[group="${inGroupAttrVal}"][in]:not([type="out-effect-only"])`,
      ),
    );

    await triggerAnims({
      animEls: filterInvisibles(animInEls),
      stage: 'IN',
      debug: true,
    });
  };
};

/**
 * Controls the animation in/out of active with/without (w/wo) region.
 *
 * @param {boolean} checked: Whether or not the input is checked.
 * @param {Swiper} wwoSwiper: Initialized instance of a Swiper.
 * @param {boolean} init: Whether or not this is the initial, i.e. page load animation.
 *
 * @return {void}
 */
const handleActiveRegionChange = async (checked, wwoSwiper, init = false) => {
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');

  const withIsBecomingActive = checked;
  // w stands for with, wo stands for without
  const inGroupAttrVal = withIsBecomingActive ? 'w' : 'wo';
  const outGroupAttrVal = withIsBecomingActive ? 'wo' : 'w';
  setActiveRegionClass(outGroupAttrVal, inGroupAttrVal);

  if (init) {
    pierceShadowDomEls(mainWrapper);

    getCurriedPageLoadAnimation(withIsBecomingActive, mainWrapper)();

    if (withIsBecomingActive) {
      // In this case the checked button is With Pega, so transition to that slide first.
      wwoSwiper.once(
        'slideChangeEnd',
        getCurriedPageLoadAnimation(withIsBecomingActive, mainWrapper),
      );
      wwoSwiper.slideNext();
    }

    // Fire the content initialization animations.
    getCurriedAnimateContentIn(outGroupAttrVal, inGroupAttrVal, mainWrapper)();
  } else {
    wwoSwiper.once(
      'slideChangeTransitionEnd',
      getCurriedAnimateContentIn(outGroupAttrVal, inGroupAttrVal, mainWrapper),
    );
    // The event handler for swiper doesn't respect await, so trigger here directly.
    await getCurriedAnimateContentOut(
      outGroupAttrVal,
      inGroupAttrVal,
      mainWrapper,
    )();
    if (withIsBecomingActive) {
      wwoSwiper.slideNext();
    } else {
      wwoSwiper.slidePrev();
    }
  }
};

export default handleActiveRegionChange;
export { triggerAnimateInOnInOnlyContent };
