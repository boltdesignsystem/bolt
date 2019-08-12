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
    // @TODO fix problem where BG is transitions too quickly
    triggerAnims({ animEls: animInitOutEls, stage: 'OUT' });
    // Here we filter display:none bolt-animates b/c they break all subsequent.
    return triggerAnims({
      animEls: filterInvisibles(animInitEls),
      stage: 'IN',
    });
  };
};

const getCurriedBeforeSlideAnimation = (
  outGroupAttrVal,
  inGroupAttrVal,
  mainWrapper,
) => {
  return async () => {
    console.debug('triggered:BeforeSlideAnimation');
    const animOutEls = Array.from(
      mainWrapper.querySelectorAll(
        `bolt-animate[group="${outGroupAttrVal}"][out]`,
      ),
    );
    await triggerAnims({ animEls: filterInvisibles(animOutEls), stage: 'OUT' });
  };
};

const restorePrevSlideInactiveContentAfterSlideAnimation = async (
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
  await triggerAnims({ animEls: filterInvisibles(animOutEls), stage: 'OUT' });
};

const getCurriedAfterSlideAnimation = (
  outGroupAttrVal,
  inGroupAttrVal,
  mainWrapper,
) => {
  return async () => {
    console.debug('triggered:AfterSlideAnimation');
    const animInEls = Array.from(
      mainWrapper.querySelectorAll(
        `bolt-animate[group="${inGroupAttrVal}"][in]`,
      ),
    );

    restorePrevSlideInactiveContentAfterSlideAnimation(
      outGroupAttrVal,
      inGroupAttrVal,
      mainWrapper,
    );
    await triggerAnims({ animEls: filterInvisibles(animInEls), stage: 'IN' });
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
    if (withIsBecomingActive) {
      // In this case the checked button is With Pega, so transition to that slide first.
      wwoSwiper.on(
        'slideChangeEnd',
        getCurriedPageLoadAnimation(withIsBecomingActive, mainWrapper),
      );
      wwoSwiper.slideNext();
    } else {
      // Uncomment for debugging, to display all animations.
      // Array.from(document.querySelectorAll('bolt-animate[in]')).forEach((el) => {el.triggerAnimIn()});
      // Otherwise just fire the initial animation.
      getCurriedPageLoadAnimation(withIsBecomingActive, mainWrapper)();
    }
    // Fire the content initialization animations.
    getCurriedAfterSlideAnimation(
      outGroupAttrVal,
      inGroupAttrVal,
      mainWrapper,
    )();
  } else {
    wwoSwiper.on(
      'slideChangeTransitionEnd',
      getCurriedAfterSlideAnimation(
        outGroupAttrVal,
        inGroupAttrVal,
        mainWrapper,
      ),
    );
    // The event handler for swiper doesn't respect await, so trigger here directly.
    await getCurriedBeforeSlideAnimation(
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
