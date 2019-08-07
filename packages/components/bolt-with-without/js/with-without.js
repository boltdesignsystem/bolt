import { triggerAnims } from '@bolt/components-animate/utils';
const SimpleSwitch = require('a-simple-switch');

const setActiveRegionClass = (inactiveToRemove, activeToSet) => {
  const mainWrapper = document.querySelector('.c-pega-wwo__wrapper');
  const activeWoClass = 'c-pega-wwo__active-';
  mainWrapper.classList.add(`${activeWoClass}${activeToSet}`);
  mainWrapper.classList.remove(`${activeWoClass}${inactiveToRemove}`);
};

const setFullHeightEls = mainWrapper => {
  const elsToSetFullHeight = Array.from(
    mainWrapper.querySelectorAll('.c-pega-wwo__shadow-height-inherit'),
  );
  elsToSetFullHeight.forEach(el => {
    const shadowChild = Array.from(el.shadowRoot.children).find(el =>
      el.classList.contains('c-bolt-animate'),
    );
    shadowChild.style.height = 'inherit';
  });
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
  console.log('Cleek', e);
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
      setFullHeightEls(mainWrapper);
      console.log('animInitEls', animInitEls);
      await triggerAnims({ animEls: animInitEls, stage: 'IN' });
    } else {
      console.log('animout', animOutEls);
      triggerAnims({ animEls: animOutEls, stage: 'OUT' });
      setActiveRegionClass(outGroupAttrVal, inGroupAttrVal);
    }
    // TODO set up phpstorm debugger to figure out why this is not working
    console.log('WATCHNOW', animInEls);
    triggerAnims({ animEls: filterInvisibles(animInEls), stage: 'IN' });
  }, 0);
};

const toggleInputClass = '#c-pega-wwo__toggle-input';
SimpleSwitch.init();
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
