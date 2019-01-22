// if (window.self !== window.top) {
//   import('iframe-resizer/js/iframeResizer.contentWindow.min.js');

//   // automatically remove the min-height default set to the body element when viewing PL pages from inside an iframe on the docs site, but via a utility class
//   window.iFrameResizer = {
//     readyCallback() {
//       // document.documentElement.classList.add('u-bolt-min-height-none');
//       // document.body.classList.add('u-bolt-min-height-none');
//     },
//   };
// } else {
//   import('iframe-resizer/src/iframeResizer.js').then(module => {
//     const iFrameResize = module.default;
//     iFrameResize({
//       checkOrigin: false,
//     });
//   });
// }
