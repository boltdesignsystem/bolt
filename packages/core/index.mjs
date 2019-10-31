import './elements/elements.js';
import { getData } from './data/get-data';

export * from './data';
// export * from './polyfills';
export * from './renderers';
export * from './utils';

//// Add hook to auto re-render the root component.
// if (typeof module.hot === 'object') {
//   module.hot.accept(err => {
//     if (err) {
//       console.error('Cannot apply HMR update.', err);
//     }
//   });
// }

window.bolt = window.bolt || {};

if (!window.bolt.meta) {
  // selecting a long delay since this isn't super important
  const delay = 5000;

  setTimeout(() => {
    getData('meta')
      .then(data => {
        window.bolt.meta = data;
      })
      .catch(console.log.bind(console));
  }, delay);
}
