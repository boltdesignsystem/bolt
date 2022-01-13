export class BoltSatellite {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  show() {
    // @TODO: navbar has ready state conventions.
    this.el.setAttribute('ready', 'true');
  }

  showOnScroll(revealData) {
    var scrollPosition = window.scrollY;
    var value = parseInt(revealData, 10);
    var revealPosition = 0;

    // @TODO: is this unecessarily comprehensive?
    var pageHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
    );

    if (revealData.includes('px')) {
      revealPosition = value;
    } else if (revealData.includes('%')) {
      // set a pixel value based on the percentage value.
      revealPosition = pageHeight * (value / 100);
    }

    window.addEventListener('scroll', () => {
      // prevent this from firing more than once.
      if (this.el.getAttribute('ready') !== 'true') {
        scrollPosition = window.scrollY;
        if (revealPosition > 0 && scrollPosition >= revealPosition) {
          this.show();
        }
      }
    });
  }

  toggleRevealChildren() {
    // @TODO: refactor with states?
    if (
      this.el.firstElementChild.getAttribute('data-reveal-children') === 'false'
    ) {
      this.el.firstElementChild.setAttribute('data-reveal-children', 'true');
    } else {
      this.el.firstElementChild.setAttribute('data-reveal-children', 'false');
    }
  }

  init() {
    if (this.el.getAttribute('data-show-on-scroll')) {
      this.showOnScroll(this.el.getAttribute('data-show-on-scroll'));
    } else if (this.el.getAttribute('data-show-on-load') != null) {
      this.show();
    }

    this.el.lastElementChild.onclick = () => {
      if (
        this.el.lastElementChild.classList.contains('c-bolt-satellite__more')
      ) {
        this.toggleRevealChildren();
      }
    };
  }
}
