import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* 
    webpackMode: 'eager', 
    webpackChunkName: 'bolt-radio-switch' 
  */ './radio-switch.js');

  import(/* 
    webpackMode: 'eager', 
    webpackChunkName: 'bolt-change-case' 
  */ './change-case.js');
});

// const radioSwitches = Array.from(
//   document.querySelectorAll('bolt-radio-switch input'),
// );

// radioSwitches.forEach(radioSwitch => {
//   radioSwitch.addEventListener('change', changeHandler);
// });

// function changeHandler(event) {
//   if (this.value === 'twig') {
//     console.log('value', 'twig');
//   } else if (this.value === 'wc') {
//     console.log('value', 'wc');
//   }
// }
