import styles from './button.scoped.scss';

import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(res => {
  import(/* webpackMode: 'lazy', webpackChunkName: 'bolt-button' */ './button.standalone');
});