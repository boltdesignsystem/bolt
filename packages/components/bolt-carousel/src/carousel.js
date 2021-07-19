import { html, unsafeCSS, customElement, BoltElement } from '@bolt/element';
import classNames from 'classnames/bind';
// Import Swiper and modules
import {
  Swiper,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/js/swiper.esm.js';

// Install modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

import schema from '../carousel.schema';
import styles from '../index.scss';

import '@bolt/core-v3.x/utils/optimized-resize';

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

@customElement('bolt-carousel')
class BoltCarousel extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      slideOffsetBefore: {
        type: Boolean,
        attribute: 'slide-offset-before',
      },
      slideOffsetAfter: {
        type: Boolean,
        attribute: 'slide-offset-after',
      },
      thumbs: {
        type: Object,
      },
    };
  }

  static useShadow = false;

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor() {
    super();
    this.onSlideChange = this.onSlideChange.bind(this);
    this.disableSwipingIfAllSlidesAreVisible = this.disableSwipingIfAllSlidesAreVisible.bind(
      this,
    );
    this.conditionallyDisableButtons = this.conditionallyDisableButtons.bind(
      this,
    );
    this.reInitCarousel = this.reInitCarousel.bind(this);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    window.addEventListener('throttledResize', this.reInitCarousel);

    const nextButton = this.querySelector('[slot="next-btn"]');
    const prevButton = this.querySelector('[slot="previous-btn"]');

    if (nextButton) {
      nextButton.setAttribute('tabindex', '-1');
    }

    if (prevButton) {
      prevButton.setAttribute('tabindex', '-1');
    }
  }

  init() {
    this.swiper = new Swiper(
      this.renderRoot.querySelector('.c-bolt-carousel'),
      {
        ...this.options,
      },
    );

    this.configureSlidesPerGroup();
    this.disableSwipingIfAllSlidesAreVisible();
  }

  // recalculates the ideal # of slides to display when the overal carousel width changes
  // @todo: update to only reinitialize when the data for this changes
  reInitCarousel() {
    const calculatedSlidesPerView = this.calculateSlidesPerView(
      this.slidesPerView,
    );

    // Only re-initialize if slidesPerView changes
    if (this.options.slidesPerView === calculatedSlidesPerView) {
      this.swiper.update();
    } else {
      this.options.slidesPerView = calculatedSlidesPerView;

      this.calculateSlidesPerViewBreakpoints();

      // track the currently active slide so the new swiper instance
      const currentlyActiveSlide = this.swiper.activeIndex;
      this.options.initialSlide = currentlyActiveSlide;

      this.swiper.destroy(false, true);
      this.options.thumbs = this.thumbs;

      this.init();
    }
  }

  findIdealNumberOfSlides(desiredNumberOfSlides) {
    const availableWidth = this.getBoundingClientRect().width;
    const spaceBetween = this.spaceBetweenConfig;
    const minWidth = this.noMinWidth ? 0 : 240; // @todo: update to pull in this min-width automatically
    let realisticNumberOfSlides = 'auto';

    // adjust the requested # of slides based on the min / max number set
    if (this.slidesPerView <= this.maxSlidesPerView) {
      desiredNumberOfSlides = this.slidesPerView;
    } else {
      desiredNumberOfSlides = this.maxSlidesPerView;
    }

    for (
      let i = 1;
      i <= desiredNumberOfSlides && i <= this.maxSlidesPerView;
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
    } else if (idealNumberOfSlides) {
      slidesPerView = idealNumberOfSlides;
    } else {
      slidesPerView = 1;
    }

    return this.findIdealNumberOfSlides(slidesPerView);
  }

  calculateSlidesPerViewBreakpoints() {
    for (let i = 1; i < this.maxSlidesPerView; i++) {
      const bpNumber = boltBreakpoints[Object.keys(boltBreakpoints)[i]].replace(
        'px',
        '',
      );
      this.options.breakpoints[bpNumber] = {
        slidesPerView: this.calculateSlidesPerView(i === 1 || i === 2 ? 2 : i),
        spaceBetween: this.spaceBetweenConfig,
      };

      // @todo: uncomment or refactor when enabling "stack" mode
      // spaceBetween: this.stacked
      //   ? i <= 3
      //     ? smallOverlap + spacingUnit
      //     : i === 4
      //     ? mediumOverlap + spacingUnit
      //     : largeOverlap + spacingUnit
      //   : spacingUnit,
      // };
    }
  }

  configureSlidesPerGroup() {
    // opt out of the default slidesPerGroup behavior if being used as an image gallery
    if (this.mode === 'gallery' || this.mode === 'gallery-thumbnail') {
      return;
    }

    if (this.swiper.params.slidesPerView === 'auto') {
      // If `slidesPerView` is still equal to 'auto', the carousel was probably hidden on load. Just set `slidesPerGroup` to `1` for now, must be an integer.
      this.swiper.params.slidesPerGroup = 1;
    } else if (this.slidesPerGroup && this.slidesPerGroup === 'auto') {
      this.swiper.params.slidesPerGroup = parseInt(
        this.swiper.params.slidesPerView,
        10,
      );
    } else if (this.slidesPerGroup && this.slidesPerGroup !== 'auto') {
      // make sure slidesPerGroup can't be set to a number greater than total # of slides visible
      const slidesPerGroup = parseInt(this.slidesPerGroup, 10);
      if (slidesPerGroup <= parseInt(this.swiper.params.slidesPerView, 10)) {
        this.swiper.params.slidesPerGroup = slidesPerGroup;
      } else {
        this.swiper.params.slidesPerGroup = parseInt(
          this.swiper.params.slidesPerView,
          10,
        );
      }
    } else {
      this.swiper.params.slidesPerGroup = 1;
    }

    this.options.slidesPerGroup = this.swiper.params.slidesPerGroup;

    // Must call `update()` after setting slidesPerGroup for the change to take effect
    this.swiper.update();
  }

  firstUpdated(props) {
    if (this.noJs) {
      return;
    }

    const self = this;

    if (this.offsetHeight) {
      // Set flag so that carousel will not be re-initialized unnecessarily on update()
      this.isVisible = true;
    } else {
      // If not visible, add attribute so that it can be found by other components and updated manually.
      this.setAttribute('will-update', '');
    }

    const spacingUnit =
      window.getComputedStyle(document.body).fontSize.replace('px', '') * 2;

    this.spaceBetweenConfig;

    switch (this.spaceBetween) {
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
      thumbs: this.thumbs,
      watchOverflow: true,
      roundLengths: true,
      a11y: {
        enabled: true,
        prevSlideMessage: this.prevSlideMessage,
        nextSlideMessage: this.nextSlideMessage,
        firstSlideMessage: this.firstSlideMessage,
        lastSlideMessage: this.lastSlideMessage,
        paginationBulletMessage: this.paginationBulletMessage,
        notificationClass: 'c-bolt-carousel__notification',
      },
      initialSlide: this.initialSlide ? this.initialSlide : 0,
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
        nextEl: this.renderRoot.querySelector('.c-bolt-carousel__button--next'),
        prevEl: this.renderRoot.querySelector(
          '.c-bolt-carousel__button--previous',
        ),
        disabledClass: 'c-bolt-carousel__button--disabled',
        hiddenClass: 'c-bolt-carousel__button--hidden',
      },
      pagination: this.noPagination
        ? false
        : {
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
        hide: !this.freeScroll && this.noScrollbar,
        el: this.renderRoot.querySelector('.c-bolt-carousel__scrollbar'),
        draggable: true,
        lockClass: 'c-bolt-carousel__scrollbar-lock',
        dragClass: 'c-bolt-carousel__scrollbar-drag',
      },
      breakpointsInverse: true,
      breakpoints: {},
      grabCursor: true,
      loop: false,
      // loop: this.loop, // @todo: re-enable once related re-rendering bugs addressed
      autoplay: this.autoplay
        ? {
            delay: 5000,
          }
        : false,
      centeredSlides: false,
      centerInsufficientSlides: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      threshold: 3,
      centeredSlides: this.slideAlign === 'center' ? true : false,
      effect: this.fade ? 'fade' : 'slide',
      freeMode: this.freeScroll, //@todo: re-enable when adding free-scroll prop options
      slidesPerView: this.calculateSlidesPerView(this.slidesPerView),

      // If not visible, observer will automatically re-int when element is shown
      // Swiper's 'observer' feature uses rAF so it should be pretty performant, but let's still keep an eye on it (https://github.com/nolimits4web/swiper/pull/2731)
      observer: !this.isVisible, // Set to true to enable Mutation Observer on Swiper and its elements
      observeParents: !this.isVisible, // Set to true if you also need to watch Mutations for Swiper parent elements
      on: {
        update: () => {
          // If `observer` has been set, carousel now has height, and the `isVisible` flag has not yet been switched, reinit the carousel with some updated options
          if (this.options.observer && this.offsetHeight && !this.isVisible) {
            // Set the flag so that this block is only ever run once
            this.isVisible = true;
            // Turn off the observers, not needed once properly initialized
            this.options.observer = false;
            this.options.observeParents = false;

            this.reInitCarousel();
          }

          this.dispatchEvent(
            new CustomEvent('bolt:layout-size-changed', {
              bubbles: true,
            }),
          );
        },
        slideChange: () => {
          this.onSlideChange();
        },
      },
    };

    this.calculateSlidesPerViewBreakpoints();

    if (!this._wasInitiallyRendered) {
      this.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: 0,
      });

      this.classList.add('is-ready');

      const slides = Array.from(this.querySelectorAll('bolt-carousel-slide'));
      slides.forEach(slide => {
        slide.classList.add('c-bolt-carousel__slide');
        slide.classList.add('is-ready');
      });

      this.init();
    } else {
      if (this.swiper) {
        // update swiper if component re-rendered
        this.swiper.update();
      }
    }

    super.firstUpdated && super.firstUpdated(props);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    this.isVisible = false;

    window.removeEventListener('throttledResize', this.reInitCarousel);
  }

  updated(props) {
    super.updated && super.updated(props);
    this.swiper && this.swiper.update();

    if (this.swiper && !this.noPagination) {
      this.swiper.pagination.update();
    }
  }

  // Public method called by Tabs and Accordion when DOM changes and Carousel needs to update
  updateLayout() {
    this.swiper?.update();
  }

  onSlideChange() {
    this.disableSwipingIfAllSlidesAreVisible();
  }

  conditionallyDisableButtons() {
    if (this.options.navigation) {
      const nextButton = this.querySelector('[slot="next-btn"]');
      const prevButton = this.querySelector('[slot="previous-btn"]');

      const nextEl = this.renderRoot.querySelector(
        '.c-bolt-carousel__button--next',
      );
      const prevEl = this.renderRoot.querySelector(
        '.c-bolt-carousel__button--previous',
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

  buttonDownHandler() {
    this.classList.add('is-pressed');
  }

  buttonUpHandler() {
    this.classList.remove('is-pressed');
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
    // const props = this.validateProps(this.props);

    const classes = cx('c-bolt-carousel', {
      [`c-bolt-carousel--disabled`]: this.disabled,
      [`c-bolt-carousel--overflow`]: this.overflow,
      [`c-bolt-carousel--no-overflow`]: !this.overflow,
    });

    const wrapperClasses = cx('c-bolt-carousel__wrapper');

    const prevButton = cx(
      'c-bolt-carousel__button',
      'c-bolt-carousel__button--previous',
      {
        [`c-bolt-carousel__button--hidden`]: this.noNavButtons,
        [`c-bolt-carousel__button--${this.navButtonPosition || 'inner'}`]: this
          .navButtonPosition,
      },
    );

    const nextButton = cx(
      'c-bolt-carousel__button',
      'c-bolt-carousel__button--next',
      {
        [`c-bolt-carousel__button--hidden`]: this.noNavButtons,
        [`c-bolt-carousel__button--${this.navButtonPosition || 'inner'}`]: this
          .navButtonPosition,
      },
    );

    const buttonTemplate = iconName => html`
      <span
        class="e-bolt-button
        e-bolt-button--medium
        e-bolt-button--border-radius-full
        e-bolt-button--secondary
        e-bolt-button--icon-only"
        aria-hidden="true"
      >
        <span class="e-bolt-button__icon-center">
          <bolt-icon size="large" name="${iconName}"></bolt-icon>
        </span>
      </span>
    `;

    return html`
      <div class="${classes}">
        <div class="${wrapperClasses}">
          ${this.slotify('default')}
        </div>
        ${this.freeScroll
          ? this.noScrollbar
            ? ''
            : html`
                <div class="c-bolt-carousel__scrollbar"></div>
              `
          : this.noPagination
          ? ''
          : html`
              <div class="c-bolt-carousel__pagination"></div>
            `}
      </div>

      ${this.noNavButtons === true
        ? ''
        : html`
            <div
              class="${prevButton}"
              @mousedown=${this.buttonDownHandler}
              @mouseup=${this.buttonUpHandler}
            >
              ${this.slotMap.get('previous-btn')
                ? this.slotify('previous-btn')
                : buttonTemplate('chevron-left')}
            </div>
            <div
              class="${nextButton}"
              @mousedown=${this.buttonDownHandler}
              @mouseup=${this.buttonUpHandler}
            >
              ${this.slotMap.get('next-btn')
                ? this.slotify('next-btn')
                : buttonTemplate('chevron-right')}
            </div>
          `}
    `;
  }
}

@customElement('bolt-carousel-slide')
class BoltCarouselSlide extends BoltElement {
  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-carousel-slide');

    return html`
      <div class="${classes}">${this.slotify('default')}</div>
    `;
  }
}

export { BoltCarousel, BoltCarouselSlide };
