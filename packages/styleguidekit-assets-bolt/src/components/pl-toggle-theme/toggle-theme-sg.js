/*!
 * Modal for the Viewer Layer
 * For both annotations and code/info
 *
 * Copyright (c) 2016 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * @requires url-handler.js
 * @requires data-saver.js
 *
 */

// import { urlHandler, DataSaver } from '@pattern-lab/utils';
// import { panelsViewer } from '@pattern-lab/ui-panels-viewer';
// import $ from 'jquery';
// import { Dispatcher } from '@pattern-lab/utils/eventemitter';

export const themeToggle = {
  // set up some defaults
  // active: false,
  // switchText: true,
  // template: 'info',
  // patternData: {},
  previousTheme: '',
  targetOrigin:
    window.location.protocol === 'file:'
      ? '*'
      : window.location.protocol + '//' + window.location.host,

  /**
   * ask the pattern for info so we can open the modal window and populate it
   * @param  {Boolean}      if the dropdown text should be changed
   */
  // queryPattern: function(switchText) {
  //   // note that the modal is active and set switchText
  //   if (switchText === undefined || switchText) {
  //     switchText = true;
  //     DataSaver.updateValue('modalActive', 'true');
  //     themeToggle.active = true;
  //   }

  //   // send a message to the pattern
  //   let obj = JSON.stringify({
  //     event: 'patternLab.patternQuery',
  //     switchText: switchText,
  //   });
  //   document
  //     .querySelector('.pl-js-iframe')
  //     .contentWindow.postMessage(obj, themeToggle.targetOrigin);
  // },

  /**
   * toggle the comment pop-up based on a user clicking on the pattern
   * based on the great MDN docs at https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
   * @param  {Object}      event info
   */
  receiveIframeMessage: function(event) {
    var els, i;

    // does the origin sending the message match the current host? if not dev/null the request
    if (
      window.location.protocol !== 'file:' &&
      event.origin !== window.location.protocol + '//' + window.location.host
    ) {
      return;
    }

    var data = {};

    try {
      data =
        typeof event.data !== 'string' ? event.data : JSON.parse(event.data);
    } catch (e) {}

      console.log('receiveIframeMessage');
      console.log(data.event);
      console.log(data);



    if (data.event !== undefined && data.event == 'patternLab.toggleTheme') {

      if (this.previousThemeClass){
        document.querySelector('body').classList.remove(this.previousThemeClass);
      }

      const newThemeClass = `pl-c-body--theme-${data.theme}`;

      this.previousThemeClass = newThemeClass;


      document.querySelector('body').classList.toggle(newThemeClass);

      // document.querySelector('body').classList.toggle('pl-c-body--theme-dark');
    }



    //   if (
    //     themeToggle.active === false &&
    //     data.patternpartial !== undefined &&
    //     data.patternpartial.indexOf('viewall-') === 0 &&
    //     config.defaultShowPatternInfo !== undefined &&
    //     config.defaultShowPatternInfo
    //   ) {
    //     themeToggle.queryPattern(false);
    //   } else if (themeToggle.active === true) {
    //     themeToggle.queryPattern();
    //   }
    // } else if (
    //   data.event !== undefined &&
    //   data.event == 'patternLab.patternQueryInfo'
    // ) {
    //   // refresh the modal if a new pattern is loaded and the modal is active
    //   themeToggle.refresh(
    //     data.patternData,
    //     data.iframePassback,
    //     data.switchText
    //   );
    // } else if (
    //   data.event !== undefined &&
    //   data.event == 'patternLab.annotationNumberClicked'
    // ) {
    //   // slide to a given annoation
    //   themeToggle.slideToAnnotation(data.displayNumber);
    // }
  },
};

// // when the document is ready make sure the modal is ready
// $(document).ready(function() {
//   themeToggle.onReady();
// });

window.addEventListener('message', themeToggle.receiveIframeMessage, false);
