import lozad from 'lozad';

const observer = lozad('.js-lazyload', {
  rootMargin: '10px 0px', // syntax similar to that of CSS Margin
  threshold: 0.1, // ratio of element convergence
  load: function (el) {
    if (el.dataset.src) {
      el.src = el.dataset.src;
    }
    if (el.dataset.srcset) {
      el.srcset = el.dataset.srcset;
    }
    if (el.dataset.backgroundImage) {
      el.style.backgroundImage = 'url(' + el.dataset.backgroundImage + ')';
    }

    el.classList.remove('is-lazyloading');
    el.classList.add('is-lazyloaded');
  }
});
observer.observe();


// imgLoad.onload = () => {
//   element.dataset.loaded = true;
// }