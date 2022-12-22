// Import Swiper and modules
import Swiper, { Navigation, Pagination } from 'swiper';

export class BoltSlideshow {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const swiper = new Swiper('.c-bolt-slideshow', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.c-bolt-slideshow__navigation-next',
        prevEl: '.c-bolt-slideshow__navigation-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
}
