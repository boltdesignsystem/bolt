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
    loop: props.boolean,
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
    const classes = css('c-bolt-carousel', 'swiper-container');

    const slideWrapperClasses = css(
      'c-bolt-carousel__wrapper',
      'swiper-wrapper',
    );

    const paginationClasses = css(
      'c-bolt-carousel__pagination swiper-pagination',
    );
    const buttonPrevClasses = css(
      'c-bolt-carousel__navigation',
      'c-bolt-carousel__navigation--prev',
      'swiper-button-prev',
    );
    const buttonNextClasses = css(
      'c-bolt-carousel__navigation',
      'c-bolt-carousel__navigation--next',
      'swiper-button-next',
    );

    return this.html`
      ${this.addStyles([carouselStyles])}
      <div class=${classes}>

        <div class=${slideWrapperClasses}>
          ${this.slot('default')}
        </div>

        <div class=${paginationClasses}></div>

        <div class=${buttonPrevClasses}>
          <bolt-button icon-only color="text">
            <div>
              <bolt-icon name="chevron-left" size="large"></bolt-icon>
            </div>
          </bolt-button>
        </div>
        <div class=${buttonNextClasses}>
          <bolt-button icon-only color="text">
            <div>
              <bolt-icon name="chevron-right" size="large"></bolt-icon>
            </div>
          </bolt-button>
        </div>
      </div>
    `;
  }

  rendered() {
    const autoplay = Number.isInteger(Number(this.props.autoplay))
      ? {
          delay: this.props.autoplay,
          disableOnInteraction: this.props.disable_auto_on_interaction,
        }
      : false;

    const breakpoints = this.prepareBreakpoints(props);

    this.boltCarousel = new Swiper(
      this.renderRoot.querySelector('.swiper-container'),
      {
        loop: this.props.loop,
        spaceBetween: this.props.space_between,
        slidesPerView: this.props.slides_per_view,
        centeredSlides: this.props.center,
        freeMode: this.props.nosnap,
        autoplay,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: this.renderRoot.querySelector('.swiper-pagination'),
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: this.renderRoot.querySelector('.swiper-button-next'),
          prevEl: this.renderRoot.querySelector('.swiper-button-prev'),
        },
        breakpoints,
      },
    );
  }
}
