import { triggerAnims } from '@bolt/components-animate/utils';
import handleResize from './handleResize';

/**
 * Event handler for click on block region, only fires
 * on icon or title click. Expands the block content.
 * Only works on mobile. To configure this, adjust mediaQuery.
 *
 * @param e {Event}
 */
const handleBlockTitleMobileAccordionClick = async e => {
  // @TODO replace with theme token.
  const mediaQuery = '(max-width: 1200px)';
  const expandedClass = 'c-pega-wwo__block-expanded';
  const animateClass = 'c-pega-wwo__block-contents';
  const targetIsIcon = e.target.nodeName === 'BOLT-ICON';
  const targetIsTitle = e.target.classList.contains('c-pega-wwo__block-title');
  const targetIsToggler = targetIsIcon || targetIsTitle;
  const isMobile = window.matchMedia(mediaQuery).matches;

  if (!targetIsToggler || !isMobile) {
    return;
  }

  // @TODO `closest()` may not be polyfilled/transpiled on IE.
  const parentBlock = e.target.closest('.c-pega-wwo__block');
  const targetIsExpanded = parentBlock.classList.contains(expandedClass);
  if (targetIsExpanded) {
    parentBlock.classList.remove(expandedClass);
    parentBlock.querySelector(`.${animateClass}`).triggerAnimOut();
    return;
  }
  const parentRegion = parentBlock.parentElement;
  const otherPreviouslyExpanded = parentRegion.querySelector(
    `.${expandedClass}`,
  );

  if (otherPreviouslyExpanded) {
    otherPreviouslyExpanded.classList.remove(expandedClass);
    await triggerAnims({
      animEls: [otherPreviouslyExpanded.querySelector(`.${animateClass}`)],
      stage: 'OUT',
    });
  }

  parentBlock.classList.add(expandedClass);
  parentBlock.querySelector(`.${animateClass}`).triggerAnimIn();

  handleResize(true, false)();
};

export default handleBlockTitleMobileAccordionClick;
