// import { lazyQueue } from '@bolt/lazy-queue';

// lazyQueue(['bolt-modal-replacement'], async () => {
//   await import(/* webpackChunkName: 'bolt-modal' */ './src/modal');
// });

import('./src/modal');

// const navbars = document.querySelectorAll('.c-bolt-navbar');

// if (navbars.length) {
//   import(/* webpackChunkName: 'bolt-navbar' */ './src/navbar').then(
//     ({ BoltNavbar }) => {
//       navbars.forEach(el => {
//         const navbarComponent = new BoltNavbar(el);
//       });
//     },
//   );
// }
