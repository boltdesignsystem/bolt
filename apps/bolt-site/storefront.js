function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function throttle(func, wait, scope) {
  wait || (wait = 250);
  var last,
    deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
      args = arguments;
    if (last && now < last + wait) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        func.apply(context, args);
      }, wait);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
}

var toggleScrollClass = throttle(function() {
  theHeader = document.getElementsByClassName('storefront-docs-header');
  if (window.scrollY > 100) {
    theHeader[0].classList.add('scrolled');
  } else {
    theHeader[0].classList.remove('scrolled');
  }
}, 250);

window.addEventListener('load', toggleScrollClass);
window.addEventListener('scroll', toggleScrollClass);