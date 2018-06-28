const layoutToggleButtons = document.querySelectorAll('.pl-js-layout-toggle');


for (var i = 0, len = layoutToggleButtons.length; i < len; i++) {
  const layoutToggle = layoutToggleButtons[i];

  layoutToggle.addEventListener('click', function () {
    console.log('click');
    document.querySelector('body').classList.toggle('pl-c-body--theme-sidebar');
 });
};