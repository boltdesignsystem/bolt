import './components/version-selector/version-selector';
// import './components/schema-form'; // Component Explorer is temporarily disabled until we're done migrating our Twig Rendering Service to Now.sh v2
import './components/handle-iframe-height';
import './pages/pattern-lab/_patterns/02-components/card/__tests__';
import './pages/pattern-lab/_patterns/01-visual-styles/30-animations';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/bolt-preact-test';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/bolt-lit-test';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/lazy-lit-test';
import './pages/pattern-lab/_patterns/04-pages/99999-bolt-dev-sandbox/editor-integration';
import { triggerAnims } from '@bolt/components-animate/utils';

[...document.getElementsByClassName('demo-animate')].forEach(animDemo => {
  let triggeredIn = false;
  const trigger = animDemo.querySelector('.demo-animate__trigger');
  const wrapper = animDemo.querySelector('.demo-animate__wrapper');
  const getAnimEls = () => wrapper.getElementsByTagName('bolt-animate');
  // const animEls = Array.from(getAnimEls());
  // const animEls = Array.from(animDemo.querySelectorAll('bolt-animate'));

  trigger.addEventListener('click', () => {
    // const animEls = getAnimEls();
    const animEls = Array.from(getAnimEls());
    console.log(animEls.length, animEls);
    const stage = triggeredIn ? 'OUT' : 'IN';
    console.log({ stage });
    triggerAnims({ animEls, stage }).then(() => {
      console.log('all done')
    });
    trigger.innerText = `Trigger Animations ${triggeredIn ? 'IN' : 'OUT'}`;
    triggeredIn = !triggeredIn;
  });
});

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
