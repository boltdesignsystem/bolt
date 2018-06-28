const themeToggleButtons = document.querySelectorAll('.pl-js-theme-toggle');


const targetOrigin = window.location.protocol === 'file:' ?
  '*' :
  window.location.protocol + '//' + window.location.host;

let currentTheme = document.querySelector('body').classList.contains('pl-c-body--theme-dark') ? 'dark' : 'light';


for (var i = 0, len = themeToggleButtons.length; i < len; i++) {
  const themeToggle = themeToggleButtons[i];

 themeToggle.addEventListener('click', function () {
   if (currentTheme === 'dark'){
     currentTheme = 'light';
   } else {
     currentTheme = 'dark';
   }
    document.querySelector('body').classList.toggle('pl-c-body--theme-dark');
    document.querySelector('body').classList.toggle('pl-c-body--theme-light');

    let obj = JSON.stringify({
      event: 'patternLab.toggleTheme',
      theme: currentTheme,
    });

    document.querySelector('.pl-js-iframe').contentWindow.postMessage(obj, targetOrigin);

 });
};