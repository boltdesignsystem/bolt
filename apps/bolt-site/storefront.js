function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function throttle(func, wait, scope) {
  wait || (wait = 250);
  let last,
    deferTimer;
  return function () {
    const context = scope || this;

    let now = +new Date(),
      args = arguments;
    if (last && now < last + wait) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        func.apply(context, args);
      }, wait);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
}

const toggleScrollClass = throttle(() => {
  theHeader = document.getElementsByClassName('storefront-docs-header');
  if (window.scrollY > 100) {
    theHeader[0].classList.add('scrolled');
  } else {
    theHeader[0].classList.remove('scrolled');
  }
}, 250);

window.addEventListener('load', toggleScrollClass);
window.addEventListener('scroll', toggleScrollClass);
