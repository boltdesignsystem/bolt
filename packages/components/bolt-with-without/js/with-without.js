import { triggerAnims } from '@bolt/components-animate/utils';
import * as SimpleSwitch from 'a-simple-switch';
import Swiper from 'swiper';

const setActiveRegionClass = (inactiveToRemove, activeToSet) => {
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');
  const activeWoClass = 'c-pega-wwo__active-';
  mainWrapper.classList.add(`${activeWoClass}${activeToSet}`);
  mainWrapper.classList.remove(`${activeWoClass}${inactiveToRemove}`);
};

const setFullHeightEls = mainWrapper => {
  // Push it to the end of the stack, after shadowdom render.
  setTimeout(() => {
    const elsToSetFullHeight = Array.from(
      mainWrapper.querySelectorAll('.c-pega-wwo__shadow-height-inherit'),
    );
    elsToSetFullHeight.forEach(el => {
      const shadowChild = Array.from(el.shadowRoot.children).find(el =>
        el.classList.contains('c-bolt-animate'),
      );
      shadowChild.style.height = 'inherit';
    });

    mainWrapper
      .querySelectorAll('.c-pega-wwo__shadow-height-full')
      .forEach(el => {
        const shadowChild = Array.from(el.shadowRoot.children).find(el =>
          el.classList.contains('c-bolt-animate'),
        );
        shadowChild.style.height = '100%';
      });

    // @TODO fix this. Demo coming. Serious hack.
    mainWrapper
      .querySelectorAll('.c-pega-wwo__title bolt-animate')
      .forEach(el => {
        const shadowChild = Array.from(el.shadowRoot.children).find(el =>
          el.classList.contains('c-bolt-animate'),
        );
        shadowChild.style.zIndex = 12;
      });
  }, 0);
};

/*
 * Filter els by likely invisibility.
 * Triggering animations on els with display: none parents breaks all subsequent animations. Based on @https://davidwalsh.name/offsetheight-visibility
 */
const filterInvisibles = els => {
  return els.filter(el => el.offsetHeight > 0);
};

/**
 * Event handler for click on block region, only fires
 * on icon or title click. Expands the block content.
 * Only works on mobile. To configure this, adjust mediaQuery.
 *
 * @param e {Event}
 */
const handleBlockTitleMobileAccordionClick = e => {
  // @TODO replace with theme token.
  const mediaQuery = '(max-width: 1200px)';
  const expandedClass = 'c-pega-wwo__block-expanded';
  const targetIsIcon = e.target.nodeName === 'BOLT-ICON';
  const targetIsTitle = e.target.classList.contains('c-pega-wwo__block-title');
  const targetIsToggler = targetIsIcon || targetIsTitle;
  const isMobile = window.matchMedia(mediaQuery).matches;

  if (!targetIsToggler || !isMobile) {
    return;
  }

  // @TODO remove tight coupling between markup and this.
  const parentBlock = e.target.parentElement.parentElement;
  const isExpanded = parentBlock.classList.contains(expandedClass);
  const animEls = [parentBlock.querySelector('.c-pega-wwo__block-contents')];

  if (isExpanded) {
    parentBlock.classList.remove(expandedClass);
  } else {
    parentBlock.classList.add(expandedClass);
  }
  triggerAnims({ animEls, stage: isExpanded ? 'OUT' : 'IN' });
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
    console.log('animInEls', animInEls);
    console.log('WATCHNOW');

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
 * @param {boolean} checked Is the input checked?
 * @param {boolean} init Is this the initial, i.e. page load animation?
 *
 * @return {void}
 */
const handleActiveRegionChange = async (checked, init = false) => {
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');

  const withIsBecomingActive = checked;
  // w stands for with, wo stands for without
  const inGroupAttrVal = withIsBecomingActive ? 'w' : 'wo';
  const outGroupAttrVal = withIsBecomingActive ? 'wo' : 'w';
  setActiveRegionClass(outGroupAttrVal, inGroupAttrVal);

  if (init) {
    setFullHeightEls(mainWrapper);
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

const toggleInputClass = '#c-pega-wwo__toggle-input';
SimpleSwitch.init();

const wwoSwiper = new Swiper('.c-pega-wwo__swiper-container', {
  speed: 500,
  spaceBetween: 0,
});

handleActiveRegionChange(
  document.querySelector(toggleInputClass).checked,
  true,
);
document
  .querySelector('#c-pega-wwo__toggle-input')
  .addEventListener('change', e => {
    handleActiveRegionChange(e.target.checked);
  });

document
  .querySelector('.c-pega-wwo__region-blocks')
  .addEventListener('click', handleBlockTitleMobileAccordionClick);
