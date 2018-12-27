import 'iframe-resizer/js/iframeResizer.contentWindow.min.js';

// automatically remove the min-height default set to the body element when viewing PL pages from inside an iframe on the docs site, but via a utility class
window.iFrameResizer = {
  readyCallback() {
    document.body.classList.add('u-bolt-min-height-none');
  },
};
