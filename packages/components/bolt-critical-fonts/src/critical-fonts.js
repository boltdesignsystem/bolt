/* eslint-disable */
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.js';
import fontStacks from './font-stacks.bolt.json';


(function () {
  const fontsLoadedClass = 'js-fonts-loaded';

  // Optimization for Repeat Views
  if (sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill) {
    document.documentElement.classList.add(fontsLoadedClass);
    return;
  }

  console.log('heyo');

  // Build an array of FontFaceObserver load functions for each font family
  let observerloadFunctions =  [];
  for (let key in fontStacks) {
    const fontStack = fontStacks[key];
    const observer = new FontFaceObserver(fontStack.fontFamily, {
      weight: fontStack.weight,
      style: fontStack.style
    });

    observerloadFunctions.push(observer.load);
  }

  Promise.all(observerloadFunctions).then(function () {
    document.documentElement.classList.add(fontsLoadedClass);

    // Optimization for Repeat Views
    sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill = true;
  });
})();
