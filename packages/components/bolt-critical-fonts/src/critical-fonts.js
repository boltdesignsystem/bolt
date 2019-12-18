import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.js';
import fontStack from './font-stacks.bolt.json';

const fontsLoadedClass = 'js-fonts-loaded';
const observers = [];

// if (!sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill){
Object.keys(fontStack).forEach(font => {
  const { fontFamily, src, ...data } = fontStack[font];
  const obs = new FontFaceObserver(fontStack[font].fontFamily, data);

  observers.push(obs.load());
});

Promise.all(observers)
  .then(() => {
    document.documentElement.classList.add(fontsLoadedClass);

    // Optimization for Repeat Views
    sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill = true;
  })
  .catch(err => {
    console.warn('Some critical font are not available:', err);
  });
// }
