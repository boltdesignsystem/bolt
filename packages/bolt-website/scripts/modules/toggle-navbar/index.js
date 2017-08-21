
// document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelectorAll('.js-navbar-toggle')[0];
  var navbar = document.querySelectorAll('.js-navbar')[0];

  if (toggle){
    toggle.addEventListener('click', function(){
      toggle.classList.toggle('nav-is-hidden');
      navbar.classList.toggle('is-hidden');
    });
  }
// }, false);
