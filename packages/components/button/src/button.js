import styles from './button.scoped.scss';

import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./button.standalone.js');
});