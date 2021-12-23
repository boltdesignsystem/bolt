export class BoltSatellite {
  constructor(el) {
    // move to props?
    this.showOnLoad = true;

    if (!el) return;
    this.el = el;
    this.init();
  }

  show() {
    // navbar has ready state conventions
    this.el.setAttribute('ready', 'true');
  }

  showOnScroll() {
    var scrollPosition = window.scrollY;

    window.addEventListener('scroll', () => {
      // prevent this firing more than once
      if (this.el.getAttribute('ready') !== 'true') {
        scrollPosition = window.scrollY;
        // attach a pixel value for when the component should show
        if (scrollPosition >= 200) {
          this.show();
        }
      }
    });
  }

  init() {
    if (this.showOnLoad) {
      this.show();
    }

    // refactor ↓

    this.el.querySelector('.c-bolt-satellite__more > *').onclick = function() {
      revealChildren();
    };

    function revealChildren() {
      if (
        document
          .querySelector('.c-bolt-satellite__content')
          .getAttribute('data-reveal-children') === 'false'
      ) {
        document
          .querySelector('.c-bolt-satellite__content')
          .setAttribute('data-reveal-children', 'true');
      } else {
        document
          .querySelector('.c-bolt-satellite__content')
          .setAttribute('data-reveal-children', 'false');
      }
    }
  }
}
