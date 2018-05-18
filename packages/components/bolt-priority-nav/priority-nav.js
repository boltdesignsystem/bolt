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

const offsettolerance = 5; // Extra wiggle room when calculating how many items can fit
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
      <span class="c-bolt-priority-nav__show-text">
        More
      </span>
      <span class="c-bolt-priority-nav__show-icon">
        <bolt-icon name="chevron-down"></bolt-icon>
      </span>
    </button>
    <div class="c-bolt-priority-nav__dropdown">
      <ul class="c-bolt-priority-nav__list c-bolt-priority-nav__dropdown-list">
        ${primary.innerHTML}
      </ul>
    </div>
  </li>
`)
const priorityDropdown = container.querySelector('.c-bolt-priority-nav__dropdown');
const dropdownItems = priorityDropdown.querySelectorAll('li');
const allItems = container.querySelectorAll('li');
const moreLi = primary.querySelector('.c-bolt-priority-nav__show-more');
const moreBtn = moreLi.querySelector('.c-bolt-priority-nav__show-button');

moreBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isOpen = !isOpen;

  console.log(`is open: ${isOpen}`);

  if (isOpen){
    container.setAttribute('open', true);
    containerTabs.classList.add('c-bolt-priority-nav--show-dropdown');
    moreBtn.classList.add('is-active');
    moreBtn.setAttribute('aria-expanded', true);
  } else {
    container.removeAttribute('open');
    containerTabs.classList.remove('c-bolt-priority-nav--show-dropdown');
    moreBtn.classList.remove('is-active');
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
    if (primaryWidth + offsettolerance >= stopWidth + item.offsetWidth) {
      stopWidth += item.offsetWidth;
    } else {
      item.classList.add('is-hidden');
      hiddenItems.push(i);
    }
  });

  // toggle the visibility of More button and items in Secondary
  if(!hiddenItems.length) {
    isOpen = false;
    container.removeAttribute('open');
    moreLi.classList.add('is-hidden');
    containerTabs.classList.remove('c-bolt-priority-nav--show-dropdown');
    moreBtn.classList.remove('is-active');
    moreBtn.setAttribute('aria-expanded', false);
  }
  else {
    dropdownItems.forEach((item, i) => {
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


// hide Secondary on the outside click

document.addEventListener('click', (e) => {
  let el = e.target
  while(el) {
    if(el === priorityDropdown || el === moreBtn) {
      return;
    }
    el = el.parentNode;
  }

  isOpen = false;
  containerTabs.classList.remove('c-bolt-priority-nav--show-dropdown');
  container.removeAttribute('open');
  moreBtn.classList.remove('is-active');
  moreBtn.setAttribute('aria-expanded', false);
});


// Create a custom 'optimizedResize' event that works just like window.resize but is more performant because it
// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function () {
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
  // such as scroll.
  throttle('resize', 'optimizedResize');
})();


window.addEventListener('optimizedResize', doAdapt); // adapt on window resize