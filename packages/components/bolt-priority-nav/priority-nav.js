import {
  h,
  render,
  define,
  props,
  BoltComponent,
  css,
  spacingSizes,
  hasNativeShadowDomSupport,
} from '@bolt/core';

/*
  Consider using these polyfills to broaden browser support:
    — https://www.npmjs.com/package/classlist-polyfill
    — https://www.npmjs.com/package/nodelist-foreach-polyfill
*/

let isOpen = false;

const container = document.querySelector('bolt-priority-nav');
const containerTabs = container.querySelector('.c-bolt-priority-nav');
const primary = container.querySelector('.c-bolt-priority-nav__primary');
const primaryItems = container.querySelectorAll('.c-bolt-priority-nav__primary > .c-bolt-priority-nav__item:not(.c-bolt-priority-nav__item--show-more)');
containerTabs.classList.add('is-ready');
container.classList.add('is-ready');

// insert "more" button and duplicate the list

primary.insertAdjacentHTML('beforeend', `
  <li class="c-bolt-priority-nav__item c-bolt-priority-nav__show-more">
    <button type="button" aria-haspopup="true" aria-expanded="false" class="c-bolt-priority-nav__button c-bolt-priority-nav__show-button">
      More <span class="c-bolt-priority-nav__show-icon">
        <bolt-icon name="chevron-down"></bolt-icon>
      </span>
    </button>
    <ul class="c-bolt-priority-nav__list c-bolt-priority-nav__secondary">
      ${primary.innerHTML}
    </ul>
  </li>
`)
const secondary = container.querySelector('.c-bolt-priority-nav__secondary');
const secondaryItems = secondary.querySelectorAll('li');
const allItems = container.querySelectorAll('li');
const moreLi = primary.querySelector('.c-bolt-priority-nav__show-more');
const moreBtn = moreLi.querySelector('.c-bolt-priority-nav__show-button');

moreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isOpen = !isOpen;

  console.log(`is open: ${isOpen}`);

  if (isOpen){
    container.setAttribute('open', true);
    containerTabs.classList.add('c-bolt-priority-nav--show-secondary');
    moreBtn.setAttribute('aria-expanded', true);
  } else {
    container.removeAttribute('open');
    containerTabs.classList.remove('c-bolt-priority-nav--show-secondary');
    moreBtn.setAttribute('aria-expanded', false);
  }

});

// adapt tabs

const doAdapt = () => {
  container.classList.add('is-resizing');

  // reveal all items for the calculation
  allItems.forEach((item) => {
    item.classList.remove('is-hidden');
  });

  // hide items that won't fit in the Primary
  let stopWidth = moreBtn.offsetWidth;
  let hiddenItems = [];

  // console.log(primary.closest('.c-bolt-navbar__nav').offsetWidth);
  const primaryWidth = primary.offsetWidth;
  primaryItems.forEach((item, i) => {
    if(primaryWidth >= stopWidth + item.offsetWidth) {
      stopWidth += item.offsetWidth;
    } else {
      item.classList.add('is-hidden');
      hiddenItems.push(i);
    }
  })

  // toggle the visibility of More button and items in Secondary
  if(!hiddenItems.length) {
    isOpen = false;
    container.removeAttribute('open');
    moreLi.classList.add('is-hidden');
    containerTabs.classList.remove('c-bolt-priority-nav--show-secondary');
    moreBtn.setAttribute('aria-expanded', false);
  }
  else {
    secondaryItems.forEach((item, i) => {
      if(!hiddenItems.includes(i)) {
        item.classList.add('is-hidden');
      }
    })
  }

  // if (isOpen) {
  container.classList.remove('is-resizing');
  // }
}

doAdapt() // adapt immediately on load
window.addEventListener('resize', doAdapt); // adapt on window resize

// hide Secondary on the outside click

document.addEventListener('click', (e) => {
  let el = e.target
  while(el) {
    if(el === secondary || el === moreBtn) {
      return;
    }
    el = el.parentNode;
  }

  isOpen = false;
  containerTabs.classList.remove('c-bolt-priority-nav--show-secondary');
  container.removeAttribute('open');
  moreBtn.setAttribute('aria-expanded', false);
})