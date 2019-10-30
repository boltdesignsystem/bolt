import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/*
    webpackMode: 'eager',
  */ './with-without.js');
});
