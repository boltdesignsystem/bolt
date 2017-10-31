/*! Built with http://stenciljs.com */
App.loadComponents(

/**** module id (dev mode) ****/
"test-app",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
import { TestApp } from './node_modules/@stencil/router/dist/collection/components/__tests__/test-app.js';
import { TestDemoFour } from './node_modules/@stencil/router/dist/collection/components/__tests__/test-demo-four.js';
import { TestDemoSix } from './node_modules/@stencil/router/dist/collection/components/__tests__/test-demo-six.js';
import { TestDemoThree } from './node_modules/@stencil/router/dist/collection/components/__tests__/test-demo-three.js';

exports['TEST-APP'] = TestApp;
exports['TEST-DEMO-FOUR'] = TestDemoFour;
exports['TEST-DEMO-SIX'] = TestDemoSix;
exports['TEST-DEMO-THREE'] = TestDemoThree;
},


/***************** test-app *****************/
[
/** test-app: tag **/
"TEST-APP"

],

/***************** test-demo-four *****************/
[
/** test-demo-four: tag **/
"TEST-DEMO-FOUR",

/** test-demo-four: members **/
[
  [ "history", /** prop **/ 1 ],
  [ "match", /** prop **/ 1 ],
  [ "pages", /** prop **/ 1 ]
]

],

/***************** test-demo-six *****************/
[
/** test-demo-six: tag **/
"TEST-DEMO-SIX",

/** test-demo-six: members **/
[
  [ "history", /** prop **/ 1 ],
  [ "match", /** prop **/ 1 ],
  [ "pages", /** prop **/ 1 ]
]

],

/***************** test-demo-three *****************/
[
/** test-demo-three: tag **/
"TEST-DEMO-THREE",

/** test-demo-three: members **/
[
  [ "history", /** prop **/ 1 ],
  [ "match", /** prop **/ 1 ],
  [ "pages", /** prop **/ 1 ]
]

]
)