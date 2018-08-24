export * from './data';
export * from './elements';
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
