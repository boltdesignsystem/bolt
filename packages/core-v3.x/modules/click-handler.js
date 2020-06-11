import { declarativeClickHandler } from '@bolt/core-v3.x/utils';

console.log('@click-handler');

const selector = '.js-click-handler';
const elements = document.querySelectorAll(selector);

Array.from(elements).forEach(el => {
  el.onClick = el.getAttribute('on-click');
  el.onClickTarget = el.getAttribute('on-click-target');
  el.onClickSelector = el.getAttribute('on-click-selector');
  el.addEventListener('click', () => {
    declarativeClickHandler(el);
  });
});
