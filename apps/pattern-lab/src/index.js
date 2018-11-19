import './_patterns/02-components/card/__tests__';
import './_patterns/01-styleguide/100-rendering-performance/bolt-preact-test';
import './_patterns/01-styleguide/100-rendering-performance/bolt-lit-test';
import './_patterns/01-styleguide/100-rendering-performance/lazy-lit-test';

import 'core-js/modules/es6.string.starts-with';
import 'iframe-resizer/js/iframeResizer.contentWindow.min.js';

// automatically remove the min-height default set to the body element when viewing PL pages from inside an iframe on the docs site, but via a utility class
window.iFrameResizer = {
  readyCallback() {
    document.body.classList.add('u-bolt-min-height-none');
  },
};

// here if you need pl only JS
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Docs Edit README Link > Simple edit hover effect
   */
  const editLink = document.getElementsByClassName(
    'c-bolt-docs__page-nav__link',
  );
  const editWrap = document.getElementsByClassName('c-bolt-docs__lead');

  function toggleEditOn() {
    editWrap[0].classList.add('edit-this-readme');
  }

  function toggleEditOff() {
    editWrap[0].classList.remove('edit-this-readme');
  }

  if (editLink[0]) {
    editLink[0].addEventListener('mouseover', toggleEditOn, false);
  }

  if (editWrap[0]) {
    editLink[0].addEventListener('mouseout', toggleEditOff, false);
  }

  /**
   * Make sure all external facing links open in a new tab in PL.
   * Important as external links can behave strangely within the iframe setup of PL.
   */
  const docsSiteLinks = document.querySelectorAll('a');
  for (var i = 0, len = docsSiteLinks.length; i < len; i++) {
    const linkElem = docsSiteLinks[i];
    const href = linkElem.getAttribute('href');
    if (href) {
      if (href.startsWith('http')) {
        linkElem.setAttribute('target', '_blank');
      }
    }
  }
});
