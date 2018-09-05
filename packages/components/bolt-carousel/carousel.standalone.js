import {
  define,
  props,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
} from '@bolt/core';

import Swiper from 'swiper';
import carouselStyles from './carousel.scss';

@define
class BoltCarousel extends BoltComponent() {
  static is = 'bolt-carousel';

  static props = {
    autoplay: props.any,
    disable_auto_on_interaction: props.boolean,
    space_between: props.number,
    nosnap: props.boolean,
    slides_per_view: props.number,
    slides_per_view_tablet: props.number,
    slides_per_view_mobile: props.number,
    center: props.boolean,
    slides: props.array,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    // this.useShadow = hasNativeShadowDomSupport;
    this.useShadow = false;
    return self;
  }

  template() {
    const classes = css('c-bolt-carousel swiper-container');
    const slideWrapperClasses = css('c-bolt-carousel__wrapper swiper-wrapper');
    const paginationClasses = css(
      'c-bolt-carousel__pagination swiper-pagination',
    );
    const buttonPrevClasses = css(
      'c-bolt-carousel__navigation c-bolt-carousel__navigation--prev swiper-button-prev',
    );
    const buttonNextClasses = css(
      'c-bolt-carousel__navigation c-bolt-carousel__navigation--next swiper-button-next',
    );

    const carouselChildren = this.slots.default
      ? this.slot('default')
      : this.props.slides
        ? this.props.slides
        : '';

    return this.hyper.wire(this.props)`
      <div class=${classes}>
        <div class=${slideWrapperClasses}>
          ${carouselChildren}
        </div>
        <div class=${paginationClasses}></div>
        <div class=${buttonPrevClasses}></div>
        <div class=${buttonNextClasses}></div>
      </div>
    `;
  }

  prepareBreakpoints(props) {
    if (
      props.slides_per_view_tablet === 0 &&
      props.slides_per_view_mobile === 0
    ) {
      return false;
    }

    const breakpoints = {};

    if (props.slides_per_view_tablet) {
      breakpoints[800] = { slidesPerView: props.slides_per_view_tablet };
    }

    if (props.slides_per_view_mobile) {
      breakpoints[400] = { slidesPerView: props.slides_per_view_mobile };
    }

    return breakpoints;
  }

  render({ props, state }) {
    this.boltCarouselTemplate = document.createDocumentFragment();
    this.boltCarouselTemplate.appendChild(this.template());

    const autoplay = Number.isInteger(Number(props.autoplay))
      ? {
          delay: props.autoplay,
          disableOnInteraction: props.disable_auto_on_interaction,
        }
      : false;

    const breakpoints = this.prepareBreakpoints(props);

    this.boltCarousel = new Swiper(
      this.boltCarouselTemplate.querySelector('.swiper-container'),
      {
        loop: true,
        spaceBetween: props.space_between,
        slidesPerView: props.slides_per_view,
        centeredSlides: props.center,
        freeMode: props.nosnap,
        autoplay,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: this.boltCarouselTemplate.querySelector('.swiper-pagination'),
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: this.boltCarouselTemplate.querySelector(
            '.swiper-button-next',
          ),
          prevEl: this.boltCarouselTemplate.querySelector(
            '.swiper-button-prev',
          ),
        },
        breakpoints,
      },
    );

    return this.html`
      ${this.addStyles([carouselStyles])}
      ${this.boltCarouselTemplate}
    `;
  }
}
