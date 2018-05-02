/* eslint-disable */
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.js';

import fontFace from '@bolt/core/styles/01-settings/settings-font-face/_settings-font-face';


(function () {
  var fontsLoadedClass = 'js-fonts-loaded';

  // Optimization for Repeat Views
  if (sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill) {
    document.documentElement.className += ` ${fontsLoadedClass}`;
    return;
  }

  let fontStacks = [];

  for (const name in fontFace) {
    // console.log(item);

    // const name =
    const item = fontFace[name];
    // console.log(fontFace[item]);

    fontStacks[name] = new FontFaceObserver(item.fontFamily, {
      weight: item.weight,
      style: item.style
    });
  }

  console.log(fontStacks);

  // var openSansRegular = );

  // var openSansItalic = new FontFaceObserver('Open Sans', {
  //   weight: 400,
  //   style: 'italic'
  // });

  // var openSansSemiBold = new FontFaceObserver('Open Sans', {
  //   weight: 600
  // });

  // var openSansExtraBold = new FontFaceObserver('Open Sans', {
  //   weight: 800
  // });

  // var openSansExtraBoldItalic = new FontFaceObserver('Open Sans', {
  //   weight: 800,
  //   style: 'italic'
  // });

  Promise.all(
    [
      fontStacks.forEach((fontStackItem) => {
        return fontStackItem.load();
      })
    ]
    //   fontStacks.forEach((fontStackItem) => {
    //   fontStackItem.load();
    // })
    // [

    // openSansRegular.load(),
    // openSansItalic.load(),
    // openSansSemiBold.load(),
    // openSansExtraBold.load(),
    // openSansExtraBoldItalic.load()

  ).then(function () {
    document.documentElement.className += ` ${fontsLoadedClass}`;

    // Optimization for Repeat Views
    sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill = true;
  });
})();
