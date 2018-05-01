// Based on https://github.com/webcomponents/webcomponentsjs/blob/master/entrypoints/webcomponents-hi-ce-index.js

/*
 * Polyfills loaded: Custom Elements
 * Used in: Safari 10, Firefox once SD is shipped
 */


/**
   * 1. Workaround to prevent double `@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js`
   * polyfills from getting loaded in Chrome if a Bolt build and a namespaced PW build
   * get loaded at the same time.
   */

import 'document-register-element'; /* [1] */
