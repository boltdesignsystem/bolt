import './utils/postmessage';
import './components/modal-styleguide';
import './components/pl-search/pl-search.iframe-helper'; // communicates with the main <pl-search> component via the PL iframe

// automatically remove the min-height default set to the body element when viewing PL pages from inside an iframe on the docs site, but via a utility class

let oldThemingClass = '';

window.iFrameResizer = {
  readyCallback: function(){
    // var myId = window.parentIFrame.getId();
    // console.log('The ID of the iFrame in the parent page is: '+myId);
    // console.log(window.parentIFrame);
  },

  // messageCallback(message) {

  //   if (oldThemingClass !== ''){
  //     document.querySelector('html').classList.remove(oldThemingClass);
  //   }

  //   oldThemingClass = `t-bolt-x${message.app.themeMode}`;
  //   document.querySelector('html').classList.add(`t-bolt-x${message.app.themeMode}`);
  // },
};

import 'iframe-resizer/js/iframeResizer.contentWindow.min.js'; // automatically syncs inner iFrame height with main Pattern Lab page

// import { loadPolyfills } from './utils/polyfills';

// loadPolyfills.then(res => {
//   import(/* webpackMode: 'lazy', webpackChunkName: 'pl-state-helper' */ './components/pl-state-helper/pl-state-helper');
// });


// automatically remove the min-height default set to the body element when viewing PL pages from inside an iframe on the docs site, but via a utility class
// window.iFrameResizer = {
//   messageCallback(message) {
//     console.log(message);
//     // document.body.classList.add('u-bolt-min-height-none');
//   },
// };