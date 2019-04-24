import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import Swiper from 'swiper';
import styles from './carousel.scss';
import schema from '../carousel.schema.yml';

let cx = classNames.bind(styles);

// @todo: re-wire to point to actual breakpoint data
const boltBreakpoints = {
  xxsmall: '320px',
  xsmall: '400px',
  small: '600px',
  medium: '800px',
  large: '1000px',
  xlarge: '1200px',
  xxlarge: '1400px',
  xxxlarge: '1920px',
};

// const slides = document.querySelectorAll('bolt-carousel-slide');

// let observerOptions = {
//   root: this,
//   rootMargin: '10px',
//   threshold: [0.4],
// };

// const slideObserver = new IntersectionObserver(
//   intersectionCallback,
//   observerOptions,
// );

// function intersectionCallback(entries) {
//   entries.forEach(function(entry) {
//     console.log(entry);
//   });
// }

// slides.forEach(slide => {
//   // if (self.firstVisibleChild === '') {
//   slideObserver.observe(slide);
//   // }

//   //   console.log(slide.getBoundingClientRect());
//   //   const slideDimensions = slide.getBoundingClientRect();
//   //   const offsetLeft = slideDimensions.left;
//   //   const slideWidth = slideDimensions.width;

//   //   // console.log(offsetLeft >= 0 || Math.abs(offsetLeft) < slideWidth / 2);

//   //   if (offsetLeft >= 0 || Math.abs(offsetLeft) < slideWidth / 2) {
//   //     self.firstVisibleChild = slide;
//   //     self.firstVisibleChildIndex = Array.from(
//   //       slide.parentNode.children,
//   //     ).indexOf(slide);

//   //     self.firstVisibleChild.scrollIntoView({
//   //       behavior: 'auto',
//   //       block: 'end',
//   //       inline: 'start',
//   //     });
//   //   }
//   // }
// });

@define
class BoltCarousel extends withLitHtml() {
  static is = 'bolt-carousel';

  static props = {
    slidesPerView: props.string,
    spaceBetween: props.string,
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
    stacked: props.boolean,
    noJs: props.boolean,
    initialSlide: props.number,
    noSnap: props.noSnap,
    noNavButtons: props.boolean,
    noPagination: props.boolean,
    noScrollbar: props.boolean,
    hideNavButtons: props.boolean,
    navPosition: props.string,
    loop: props.boolean,
    autoplay: props.boolean,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = false;
    self.schema = schema;
    self.onSlideChange = self.onSlideChange.bind(self);
    self.conditionallyDisableButtons = self.conditionallyDisableButtons.bind(
      self,
    );
    return self;
  }

  // init() {
  //   this.swiper = new Swiper('.swiper-container', {
  //     a11y: {
  //       prevSlideMessage: 'Previous slide',
  //       nextSlideMessage: 'Next slide',
  //     },
  //   });
  // }

  connecting() {
    super.connecting && super.connecting();

    const nextButton = this.querySelector('[slot="next-btn"]');
    const prevButton = this.querySelector('[slot="previous-btn"]');

    if (nextButton) {
      nextButton.setAttribute('tabindex', '-1');
    }

    if (prevButton) {
      prevButton.setAttribute('tabindex', '-1');
    }
  }

  rendered() {
    if (this.props.noJs) {
      return;
    }

    const spacingUnit =
      window.getComputedStyle(document.body).fontSize.replace('px', '') * 2;
    // console.log(spacingUnit);

    const small = boltBreakpoints.small.replace('px', '');
    const medium = boltBreakpoints.medium.replace('px', '');
    const large = boltBreakpoints.large.replace('px', '');
    const xlarge = boltBreakpoints.xlarge.replace('px', '');

    const smallOverlap = spacingUnit * -1;
    const mediumOverlap = smallOverlap * 1.5;
    const largeOverlap = mediumOverlap * 1.5;

    let overlapSize;

    // const smallBreakpointSize = window.matchMedia(`min-width: ${boltBreakpoints.small}`).matches;
    const isMediumBreakpoint = window.matchMedia(
      `min-width: ${boltBreakpoints.medium}`,
    ).matches;
    const isLargeBreakpoint = window.matchMedia(
      `min-width: ${boltBreakpoints.large}`,
    ).matches;

    if (isMediumBreakpoint === true) {
      overlapSize = mediumOverlap;
    } else if (isLargeBreakpoint === true) {
      overlapSize = largeOverlap;
    } else {
      overlapSize = smallOverlap;
    }

    // const slides = this.querySelectorAll('bolt-carousel-slide');

    // slides.forEach(slide => {
    //   console.log(slide.scrollLeft);
    // });
    // let observers = [];
    // let slides;
    // let observer;

    // let firstVisibleChildIndex = '';
    // let firstVisibleChild = '';

    // function intersectionCallback(entries) {
    //   entries.forEach(function(entry) {
    //     let box = entry.target;
    //     let visiblePct = Math.floor(entry.intersectionRatio * 100);

    //     if (firstVisibleChild === '' && visiblePct >= 80) {
    //       firstVisibleChildIndex = Array.from(
    //         entry.target.parentNode.children,
    //       ).indexOf(entry.target);
    //       firstVisibleChild = entry.target;

    //       slides.forEach(slide => {
    //         observers[0].unobserve(slide);
    //         console.log('stop observing');
    //         // console.log(slide);
    //       });

    //       self.scrollLeft = firstVisibleChild.getBoundingClientRect().left;
    //       console.log(firstVisibleChild.getBoundingClientRect().left);
    //     }

    //     // console.log(entry.target);

    //     // box.querySelector(".topLeft").innerHTML = visiblePct;
    //     // box.querySelector(".topRight").innerHTML = visiblePct;
    //     // box.querySelector(".bottomLeft").innerHTML = visiblePct;
    //     // box.querySelector(".bottomRight").innerHTML = visiblePct;
    //   });
    // }

    // document.scrollingElement.scrollLeft =
    let spaceBetweenConfig;

    switch (this.props.spaceBetween) {
      case 'large':
        spaceBetweenConfig = spacingUnit * 2;
        break;
      case 'small':
        spaceBetweenConfig = spacingUnit / 2;
        break;
      case 'none':
        spaceBetweenConfig = 0;
        break;
      case 'medium':
      default:
        spaceBetweenConfig = spacingUnit;
        break;
    }

    console.log(spaceBetweenConfig);
    console.log(this.props.spaceBetween);

    const numberOfChildren = Array.from(
      this.querySelectorAll('bolt-carousel-slide'),
    ).length;

    this.options = {
      initialSlide: this.props.initialSlide ? this.props.initialSlide : 0,
      containerModifierClass: 'c-bolt-carousel--',
      slideClass: 'c-bolt-carousel__slide',
      slideVisibleClass: 'c-bolt-carousel__slide--visible',
      wrapperClass: 'c-bolt-carousel__wrapper',
      slidesPerView:
        this.props.slidesPerView === 'auto'
          ? 'auto'
          : this.props.loop &&
            this.props.slidesPerView &&
            numberOfChildren >= this.props.slidesPerView
          ? this.props.slidesPerView
          : this.props.loop &&
            this.props.slidesPerView &&
            numberOfChildren < this.props.slidesPerView
          ? numberOfChildren
          : this.props.slidesPerView
          ? this.props.slidesPerView
          : 1,
      navigation: {
        nextEl: this.renderRoot.querySelector('.c-bolt-carousel__btn--next'),
        prevEl: this.renderRoot.querySelector(
          '.c-bolt-carousel__btn--previous',
        ),
        disabledClass: 'c-bolt-carousel__btn--disabled',
        hiddenClass: 'c-bolt-carousel__btn--hidden',
      },
      pagination: {
        el: this.renderRoot.querySelector('.c-bolt-carousel__pagination'),
        clickable: true,
        type: 'bullets',
        bulletClass: 'c-bolt-carousel__pagination__bullet',
        bulletActiveClass: 'c-bolt-carousel__pagination__bullet--active',
        modifierClass: 'c-bolt-carousel__pagination--',
        hiddenClass: 'c-bolt-carousel__pagination--hidden',
        clickableClass: 'c-bolt-carousel__pagination--clickable',
        lockClass: 'c-bolt-carousel__pagination--locked',
      },
      // spaceBetween: this.props.stacked
      //   ? overlapSize - spacingUnit * 2
      //   : spacingUnit,
      spaceBetween: spaceBetweenConfig,
      scrollbar: {
        hide: false,
        el: this.renderRoot.querySelector('.c-bolt-carousel__scrollbar'),
        draggable: true,
        lockClass: 'c-bolt-carousel__scrollbar-lock',
        dragClass: 'c-bolt-carousel__scrollbar-drag',
      },
      breakpointsInverse: true,
      breakpoints: {},
      grabCursor: true,
      loop: this.props.loop,
      // loopAdditionalSlides: 4,
      // loopedSlides: 4,
      autoplay: this.props.autoplay
        ? {
            delay: 5000,
          }
        : false,
      // loopFillGroupWithBlank: true,
      // centerInsufficientSlides
      touchEventsTarget: 'wrapper',
      centeredSlides: false,
      centerInsufficientSlides: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      mousewheel: {
        invert: true,
        releaseOnEdges: false,
        forceToAxis: true,
        // sensitivity: 1,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
        // onlyInViewport: false,
      },
      freeMode: props.noSnap,
      // freeModeSticky: true,
      // freeModeMomentumVelocityRatio: 1.2,
      // freeModeMomentumRatio: 1.2,
      // freeModeMinimumVelocity: 0.,
      // slidesOffsetBefore: spacingUnit.replace('px', '') * 2,
      //   // when window width is <= 320px
      //   [small]]: {
      //     slidesPerView: 2,
      //     // spaceBetween: 10
      //   },
      //   // when window width is <= 480px
      //   `${medium}`: {
      //     slidesPerView: 3,
      //     spaceBetween: 20
      //   },
      //   // when window width is <= 640px
      //   large: {
      //     slidesPerView: 4,
      //     spaceBetween: 30
      //   },
      //   xlarge: {
      //     slidesPerView: 5,
      //   }
      // }
    };

    for (let i = 1; i < 6; i++) {
      const bpNumber = boltBreakpoints[Object.keys(boltBreakpoints)[i]].replace(
        'px',
        '',
      );
      this.options.breakpoints[bpNumber] = {
        slidesPerView:
          this.props.slidesPerView === '1'
            ? 1
            : this.props.slidesPerView === 'auto'
            ? 'auto'
            : this.props.slidesPerView && this.props.slidesPerView <= 4
            ? this.props.slidesPerView
            : i === 1 || i === 2
            ? 2
            : this.props.loop && numberOfChildren >= i
            ? i
            : this.props.loop && numberOfChildren < i
            ? numberOfChildren
            : i,
        spaceBetween: spaceBetweenConfig,
        // spaceBetween: this.props.stacked
        //   ? i <= 3
        //     ? smallOverlap + spacingUnit
        //     : i === 4
        //     ? mediumOverlap + spacingUnit
        //     : largeOverlap + spacingUnit
        //   : spacingUnit,
      };
    }

    console.log(this.options);

    if (!this._wasInitiallyRendered) {
      this.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: 0,
      });

      this.classList.add('is-ready');

      for (const slide of this.querySelectorAll('bolt-carousel-slide')) {
        slide.classList.add('c-bolt-carousel__slide');
        slide.classList.add('is-ready');
      }

      this.swiper = new Swiper(
        this.renderRoot.querySelector('.c-bolt-carousel'),
        {
          ...this.options,
        },
      );

      this.disableSwipingIfAllSlidesVisible();
      this.conditionallyDisableButtons();

      this.swiper.on('slideChange', this.onSlideChange);
      this.swiper.on('transitionStart', this.conditionallyDisableButtons);
    }
  }

  conditionallyDisableButtons() {
    // console.log(nextButton);
    // console.log(prevButton);
    // if (this.options.navigation.nextEl.getAttribute('aria-disabled')){
    //   console.log('disable next button');
    //   this.options.navigation.nextEl.querySelector('bolt-button').setAttribute('disabled', '');
    // } else {
    //   console.log('enable next button');
    //   this.options.navigation.nextEl.querySelector('bolt-button').removeAttribute('disabled');
    // }
    if (this.options.navigation) {
      const nextButton = this.querySelector('[slot="next-btn"]');
      const prevButton = this.querySelector('[slot="previous-btn"]');

      const nextEl = this.renderRoot.querySelector(
        '.c-bolt-carousel__btn--next',
      );
      const prevEl = this.renderRoot.querySelector(
        '.c-bolt-carousel__btn--previous',
      );

      if (prevButton && prevEl) {
        if (prevEl.getAttribute('aria-disabled') === 'true') {
          prevButton.disabled = true;
          prevButton.setAttribute('disabled', '');
        } else if (prevEl.getAttribute('aria-disabled') === 'false') {
          prevButton.disabled = false;
          prevButton.removeAttribute('disabled');
        }
      }

      if (nextButton && nextEl) {
        if (nextEl.getAttribute('aria-disabled') === 'true') {
          nextButton.disabled = true;
          nextButton.setAttribute('disabled', '');
        } else if (nextEl.getAttribute('aria-disabled') === 'false') {
          nextButton.disabled = false;
          nextButton.removeAttribute('disabled');
        }
      }
    }
  }

  disableSwipingIfAllSlidesVisible() {
    // this.shouldButtonsBeHidden =
    //   this.swiper.isBeginning === true && this.swiper.isEnd === true;
    this.canNavButtonsBeHidden =
      this.canNavButtonsBeHidden || this.props.hideNavButtons === false;

    if (this.swiper.isBeginning === true && this.swiper.isEnd === true) {
      this.swiper.allowTouchMove = false;
      this.swiper.grabCursor = false;
      // this.hideNavButtons = true;
      this.swiper.unsetGrabCursor();

      // if (this.hideNavButtons === false && this.canNavButtonsBeTempHidden) {
      //   this.hideNavButtons = true;
      // }
    } else {
      this.swiper.allowTouchMove = true;
      this.swiper.grabCursor = true;
      this.swiper.setGrabCursor();
    }

    // if (this.hideNavButtons === true && this.canNavButtonsBeTempHidden) {
    //   this.hideNavButtons = false;
    // }
    // this.hideNavButtons = false;
    if (this._wasManuallyUpdated === true) {
      this._wasManuallyUpdated = false;
    } else {
      // console.log(this.hideNavButtons === false);
      if (
        this.swiper.isBeginning === true &&
        this.swiper.isEnd === true &&
        this.canNavButtonsBeHidden === true &&
        this.hideNavButtons === false
      ) {
        console.log('hide nav buttons');
        this._wasManuallyUpdated = true;
        this.hideNavButtons = true;
        this.updated();
      } else if (
        this.canNavButtonsBeHidden &&
        this.hideNavButtons === true &&
        (this.swiper.isBeginning === false || this.swiper.isEnd === false)
      ) {
        console.log('show nav buttons');
        this._wasManuallyUpdated = true;
        this.hideNavButtons = false;
        this.updated();
      } else {
        // console.log(this.swiper.isBeginning === true);
        // console.log(this.swiper.isEnd === true);
        // console.log(this.canNavButtonsBeHidden);
        // console.log('do not do anything to nav buttons');
      }
    }
  }

  // disableButtonOnSlideChange() {
  //   console.log(this.swiper);
  // }

  onSlideChange() {
    this.disableSwipingIfAllSlidesVisible();
    // this.disableButtonOnSlideChange();
  }

  // onNavigationHide() {
  //   console.log('onNavigationHide');
  // }

  // navigationShow() {
  //   console.log('navigationShow');
  // }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-carousel', {
      [`c-bolt-carousel--disabled`]: disabled,
    });

    const prevButton = cx(
      'c-bolt-carousel__btn',
      'c-bolt-carousel__btn--previous',
      {
        [`c-bolt-carousel__btn--hidden`]: this.props.hideNavButtons,
        [`c-bolt-carousel__btn--${this.props.navPosition || 'inner'}`]: this
          .props.navPosition,
      },
    );

    const nextButton = cx(
      'c-bolt-carousel__btn',
      'c-bolt-carousel__btn--next',
      {
        [`c-bolt-carousel__btn--hidden`]: this.props.hideNavButtons,
        [`c-bolt-carousel__btn--${this.props.navPosition || 'inner'}`]: this
          .props.navPosition,
      },
    );

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-carousel__wrapper">
          ${this.slot('default')}
        </div>

        ${this.props.noNavButtons === true
          ? ''
          : html`
              <div class="${prevButton}">
                ${this.slot('previous-btn')}
              </div>
              <div class="${nextButton}">
                ${this.slot('next-btn')}
              </div>
            `}
        ${this.props.noPagination === true
          ? ''
          : html`
              <div class="c-bolt-carousel__pagination"></div>
            `}
        ${this.props.noScrollbar === true || this.props.loop === true
          ? ''
          : html`
              <div class="c-bolt-carousel__scrollbar"></div>
            `}
      </div>
    `;
  }
}

@define
class BoltCarouselSlide extends withLitHtml() {
  static is = 'bolt-carousel-slide';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    return self;
  }

  render() {
    const classes = cx('c-bolt-carousel-slide', {
      // [`c-bolt-carousel--disabled`]: disabled,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltCarousel, BoltCarouselSlide };
