import './components/version-selector/version-selector';
// import './components/schema-form'; // Component Explorer is temporarily disabled until we're done migrating our Twig Rendering Service to Now.sh v2
import './components/handle-iframe-height';
import './pages/pattern-lab/_patterns/02-components/card/__tests__';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/bolt-preact-test';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/bolt-lit-test';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/lazy-lit-test';
import './pages/pattern-lab/_patterns/04-pages/99999-bolt-dev-sandbox/editor-integration';
import { enableAnimDemos } from './pages/pattern-lab/_patterns/06-experiments/animate/animate-demo-helpers.js';
enableAnimDemos();

// Component-specific examples that need to get compiled:
import '@bolt/components-typeahead/__demos__/dynamically-fetch-data/typeahead.dynamically-fetch-data';
import '@bolt/components-typeahead/__demos__/navigate-to-search-results/typeahead.navigate-to-search-results';
import '@bolt/components-typeahead/__demos__/navigate-to-exact-result/typeahead.navigate-to-exact-result';

// demo to show how to add custom icons automatically
import './assets/icons/custom-arrow-left-colored.svg';
import './assets/icons/custom-users.svg';

// here if you need pl only JS
// document.addEventListener('DOMContentLoaded', () => {
//   /**
//    * Docs Edit README Link > Simple edit hover effect
//    */
//   const editLink = document.getElementsByClassName(
//     'c-bds-docs__page-nav__link',
//   );
//   const editWrap = document.getElementsByClassName('c-bds-docs__lead');

//   function toggleEditOn() {
//     editWrap[0].classList.add('edit-this-readme');
//   }

//   function toggleEditOff() {
//     editWrap[0].classList.remove('edit-this-readme');
//   }

//   if (editLink[0]) {
//     editLink[0].addEventListener('mouseover', toggleEditOn, false);
//   }

//   if (editWrap[0]) {
//     editLink[0].addEventListener('mouseout', toggleEditOff, false);
//   }

//   /**
//    * Make sure all external facing links open in a new tab in PL.
//    * Important as external links can behave strangely within the iframe setup of PL.
//    */
//   const docsSiteLinks = document.querySelectorAll('a');
//   for (var i = 0, len = docsSiteLinks.length; i < len; i++) {
//     const linkElem = docsSiteLinks[i];
//     const href = linkElem.getAttribute('href');
//     if (href) {
//       if (href.startsWith('http')) {
//         linkElem.setAttribute('target', '_blank');
//       }
//     }
//   }
// });
