import './elements';
import { getData } from './data/get-data';

export * from './data';
export * from './polyfills';
export * from './renderers';
export * from './utils';

//// Add hook to auto re-render the root component.
if (typeof module.hot === 'object') {
  module.hot.accept(err => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}

window.bolt = window.bolt || {};

if (!window.bolt.meta && 'noModule' in document.createElement('script')) {
  const delay = 0;

  setTimeout(() => {
    getData('meta')
      .then(data => {
        window.bolt.meta = data;
      })
      .catch(console.log.bind(console));
  }, delay);
}
