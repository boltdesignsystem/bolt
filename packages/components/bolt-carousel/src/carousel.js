import {
  renameKey,
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import changeCase from 'change-case';
import Swiper from 'swiper';
import styles from '../index.scss';
import originalSchema from '../carousel.schema.yml';

let cx = classNames.bind(styles);
let wasCarouselResizerAdded = false;

function addBoltCarouselResizer() {
  if (wasCarouselResizerAdded === false) {
    wasCarouselResizerAdded = true;

    // Create a custom 'optimizedResize' event that works just like window.resize but is more performant because it
    // won't fire before a previous event is complete.
    // This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
    (function() {
      function throttle(type, name, obj) {
        obj = obj || window;
        let running = false;

        function func() {
          if (running) {
            return;
          }
          running = true;
          requestAnimationFrame(function() {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
          });
        }
        obj.addEventListener(type, func);
      }

      // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
      // such as scroll.
      throttle('resize', 'carousel:resize');
    })();
  } else {
    // console.log('carouselResizer already Added');
  }
}

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

const carouselProps = {};
const schemaPropKeys = Object.keys(originalSchema.properties);

for (const key of schemaPropKeys) {
  const property = originalSchema.properties[key];
  const propertyName = changeCase.camelCase(key);
  const propertyType =
    typeof property.type === 'object' && property.type.length > 1
      ? 'string'
      : property.type === 'integer'
      ? 'number'
      : property.type;

  if (property.default) {
    carouselProps[propertyName] = {
      ...props[propertyType],
      ...{ default: property.default },
    };
  } else {
    carouselProps[propertyName] = {
      ...props[propertyType],
    };
  }
}

@define
class BoltCarousel extends withLitHtml() {
  static is = 'bolt-carousel';

  static props = {
    ...carouselProps,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = false;
    self.schema = originalSchema;
    self.onSlideChange = self.onSlideChange.bind(self);
    self.hideArrowsIfAllSlidesAreVisible = self.hideArrowsIfAllSlidesAreVisible.bind(
      self,
    );
    self.disableSwipingIfAllSlidesAreVisible = self.disableSwipingIfAllSlidesAreVisible.bind(
      self,
    );
    self.conditionallyDisableButtons = self.conditionallyDisableButtons.bind(
      self,
    );
    self.resizeCarousel = self.resizeCarousel.bind(self);
    return self;
  }

  connecting() {
    super.connecting && super.connecting();
    addBoltCarouselResizer();
    window.addEventListener('carousel:resize', this.resizeCarousel);

    const nextButton = this.querySelector('[slot="next-btn"]');
    const prevButton = this.querySelector('[slot="previous-btn"]');

    if (nextButton) {
      nextButton.setAttribute('tabindex', '-1');
    }

    if (prevButton) {
      prevButton.setAttribute('tabindex', '-1');
    }
  }

  // recalculates the ideal # of slides to display when the overal carousel width changes
  // @todo: update to only reinitialize when the data for this changes
  resizeCarousel() {
    this.options.slidesPerView = this.calculateSlidesPerView(
      this.props.slidesPerView,
    );
    this.calculateSlidesPerViewBreakpoints();

    // track the currently active slide so the new swiper instance
    const currentlyActiveSlide = this.swiper.activeIndex;
    this.options.initialSlide = currentlyActiveSlide;

    // destroy the current swiper instance and regenerate with the updated config options
    this.swiper.destroy(false, true);
    this.swiper = new Swiper(
      this.renderRoot.querySelector('.c-bolt-carousel'),
      {
        ...this.options,
      },
    );
  }

  findIdealNumberOfSlides(desiredNumberOfSlides) {
    const availableWidth = this.getBoundingClientRect().width;
    const spaceBetween = this.spaceBetweenConfig;
    const minWidth = 240; // @todo: update to pull in this min-width automatically
    let realisticNumberOfSlides = 'auto';

    // adjust the requested # of slides based on the min / max number set
    if (this.props.slidesPerView <= this.props.maxSlidesPerView) {
      desiredNumberOfSlides = this.props.slidesPerView;
    } else {
      desiredNumberOfSlides = this.props.maxSlidesPerView;
    }

    for (
      let i = 1;
      i <= desiredNumberOfSlides && i <= this.props.maxSlidesPerView;
      i++
    ) {
      if (i * minWidth + i * spaceBetween <= availableWidth) {
        realisticNumberOfSlides = i;
      }
    }

    return realisticNumberOfSlides;
  }

  // calculates how many slides per view should get used based on the # of children, the slidesPerView config, whether or not the carousel is looping, and the overall carousel size
  calculateSlidesPerView(idealNumberOfSlides) {
    let slidesPerView;

    if (idealNumberOfSlides === 'auto' || idealNumberOfSlides === 1) {
      slidesPerView = 1;
    } else if (
      this.props.loop &&
      idealNumberOfSlides &&
      this.numberOfChildren >= idealNumberOfSlides
    ) {
      slidesPerView = idealNumberOfSlides;
    } else if (
      this.props.loop &&
      idealNumberOfSlides &&
      this.numberOfChildren < idealNumberOfSlides
    ) {
      slidesPerView = this.numberOfChildren;
    } else if (idealNumberOfSlides) {
      slidesPerView = idealNumberOfSlides;
    } else {
      slidesPerView = 1;
    }

    return this.findIdealNumberOfSlides(slidesPerView);
  }

  calculateSlidesPerViewBreakpoints() {
    // let slidesPerViewBreakpoints = {};
    for (let i = 1; i < this.props.maxSlidesPerView; i++) {
      const bpNumber = boltBreakpoints[Object.keys(boltBreakpoints)[i]].replace(
        'px',
        '',
      );
      this.options.breakpoints[bpNumber] = {
        slidesPerView: this.calculateSlidesPerView(i === 1 || i === 2 ? 2 : i),
        spaceBetween: this.spaceBetweenConfig,
      };

      // @todo: uncomment or refactor when enabling "stack" mode
      // spaceBetween: this.props.stacked
      //   ? i <= 3
      //     ? smallOverlap + spacingUnit
      //     : i === 4
      //     ? mediumOverlap + spacingUnit
      //     : largeOverlap + spacingUnit
      //   : spacingUnit,
      // };
    }
  }

  rendered() {
    if (this.props.noJs) {
      return;
    }

    const spacingUnit =
      window.getComputedStyle(document.body).fontSize.replace('px', '') * 2;

    this.spaceBetweenConfig;

    switch (this.props.spaceBetween) {
      case 'large':
        this.spaceBetweenConfig = spacingUnit * 2;
        break;
      case 'small':
        this.spaceBetweenConfig = spacingUnit / 2;
        break;
      case 'none':
        this.spaceBetweenConfig = 0;
        break;
      case 'medium':
      default:
        this.spaceBetweenConfig = spacingUnit;
        break;
    }

    this.numberOfChildren = Array.from(
      this.querySelectorAll('bolt-carousel-slide'),
    ).length;

    this.options = {
      a11y: {
        enabled: true,
        prevSlideMessage: this.props.prevSlideMessage,
        nextSlideMessage: this.props.nextSlideMessage,
        firstSlideMessage: this.props.firstSlideMessage,
        lastSlideMessage: this.props.lastSlideMessage,
        paginationBulletMessage: this.props.paginationBulletMessage,
        notificationClass: 'c-bolt-carousel__notification',
      },
      initialSlide: this.props.initialSlide ? this.props.initialSlide : 0,
      slideActiveClass: 'c-bolt-carousel__slide--active',
      slideNextClass: 'c-bolt-carousel__slide--next',
      slidePrevClass: 'c-bolt-carousel__slide--previous',
      containerModifierClass: 'c-bolt-carousel--',
      slideClass: 'c-bolt-carousel__slide',
      slideVisibleClass: 'c-bolt-carousel__slide--visible',
      wrapperClass: 'c-bolt-carousel__wrapper',
      notificationClass: 'c-bolt-carousel__notification',
      // @todo: refactor slidesPerView logic into standalone function
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
      spaceBetween: this.spaceBetweenConfig,
      scrollbar: {
        hide: !this.props.freeScroll,
        el: this.renderRoot.querySelector('.c-bolt-carousel__scrollbar'),
        draggable: true,
        lockClass: 'c-bolt-carousel__scrollbar-lock',
        dragClass: 'c-bolt-carousel__scrollbar-drag',
      },
      breakpointsInverse: true,
      breakpoints: {},
      grabCursor: true,
      loop: this.props.loop,
      autoplay: this.props.autoplay
        ? {
            delay: 5000,
          }
        : false,
      // touchEventsTarget: 'wrapper',
      centeredSlides: false,
      centerInsufficientSlides: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      // mousewheel: {
      //   invert: true,
      //   releaseOnEdges: false,
      //   forceToAxis: true,
      // },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      centeredSlides: this.props.slideAlign === 'center' ? true : false,
      effect: this.props.fade ? 'fade' : 'slide',
      freeMode: this.props.freeScroll, //@todo: re-enable when adding free-scroll prop options
      slidesPerView: this.calculateSlidesPerView(this.props.slidesPerView),
    };

    this.calculateSlidesPerViewBreakpoints();

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

      this.hideArrowsIfAllSlidesAreVisible();
      this.disableSwipingIfAllSlidesAreVisible();
      this.swiper.on('slideChange', this.onSlideChange);
    } else {
      // update swiper if component re-rendered
      this.swiper.update();
    }
  }

  // make sure the pagination tracking keeps updating accurately when the component re-renders
  updating(newProps) {
    if (this.swiper) {
      this.swiper.pagination.update();
    }
  }

  onSlideChange() {
    this.hideArrowsIfAllSlidesAreVisible();
    this.disableSwipingIfAllSlidesAreVisible();
  }

  conditionallyDisableButtons() {
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

  hideArrowsIfAllSlidesAreVisible() {
    this.canNavButtonsBeHidden =
      this.canNavButtonsBeHidden || this.props.noPrevNextButtons === false;

    if (this._wasManuallyUpdated === true) {
      this._wasManuallyUpdated = false;
    } else {
      if (
        this.swiper.isBeginning === true &&
        this.swiper.isEnd === true &&
        this.canNavButtonsBeHidden === true &&
        this.noPrevNextButtons === false
      ) {
        this._wasManuallyUpdated = true;
        this.noPrevNextButtons = true;
        this.updated();
      } else if (
        this.canNavButtonsBeHidden &&
        this.noPrevNextButtons === true &&
        (this.swiper.isBeginning === false || this.swiper.isEnd === false)
      ) {
        this._wasManuallyUpdated = true;
        this.noPrevNextButtons = false;
        this.updated();
      }
    }
  }

  disableSwipingIfAllSlidesAreVisible() {
    if (this.swiper.isBeginning === true && this.swiper.isEnd === true) {
      this.swiper.allowTouchMove = false;
      this.swiper.grabCursor = false;
      this.swiper.unsetGrabCursor();
    } else {
      this.swiper.allowTouchMove = true;
      this.swiper.grabCursor = true;
      this.swiper.setGrabCursor();
    }
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const props = this.validateProps(this.props);

    const classes = cx('c-bolt-carousel', {
      [`c-bolt-carousel--disabled`]: props.disabled,
    });

    const prevButton = cx(
      'c-bolt-carousel__btn',
      'c-bolt-carousel__btn--previous',
      {
        [`c-bolt-carousel__btn--hidden`]: this.props.noPrevNextButtons,
        [`c-bolt-carousel__btn--${this.props.navPosition || 'inner'}`]: this
          .props.navPosition,
      },
    );

    const nextButton = cx(
      'c-bolt-carousel__btn',
      'c-bolt-carousel__btn--next',
      {
        [`c-bolt-carousel__btn--hidden`]: this.props.noPrevNextButtons,
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

        ${this.props.noPrevNextButtons === true
          ? ''
          : html`
              <div class="${prevButton}">
                ${this.slot('previous-btn')}
              </div>
              <div class="${nextButton}">
                ${this.slot('next-btn')}
              </div>
            `}
        ${this.props.freeScroll
          ? ''
          : html`
              <div class="c-bolt-carousel__pagination"></div>
            `}
        ${this.props.freeScroll
          ? html`
              <div class="c-bolt-carousel__scrollbar"></div>
            `
          : ''}
      </div>
    `;
  }
}

@define
class BoltCarouselSlide extends withLitHtml() {
  static is = 'bolt-carousel-slide';

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const classes = cx('c-bolt-carousel-slide');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltCarousel, BoltCarouselSlide };
