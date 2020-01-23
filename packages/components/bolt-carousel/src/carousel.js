import { props, hasNativeShadowDomSupport } from '@bolt/core-v3.x/utils';
import { html, customElement } from '@bolt/element';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import changeCase from 'change-case';

// Import Swiper and modules
import {
  Swiper,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/js/swiper.esm.js';

// Install modules
Swiper.use([Navigation, Pagination, Scrollbar, A11y]);

import styles from '../index.scss';
import originalSchema from '../carousel.schema.yml';

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

const carouselProps = {};
const schemaPropKeys = Object.keys(originalSchema.properties);

function setWebComponentProperty(propertyName, propertyType, property) {
  return {
    ...props[propertyType],
    // Set to '', not null, or validator will not delete empty props
    ...{ default: property.default ? property.default : '' },
  };
}

for (const key of schemaPropKeys) {
  const property = originalSchema.properties[key];

  // Skip props with type "object" and "array". They are Twig-only. Breaking IE11.
  if (property.type !== 'object' && property.type !== 'array') {
    const propertyName = changeCase.camelCase(key);
    const propertyType =
      typeof property.type === 'object' && property.type.length > 1
        ? 'string'
        : property.type === 'integer'
        ? 'number'
        : property.type;

    carouselProps[propertyName] = setWebComponentProperty(
      propertyName,
      propertyType,
      property,
    );
  }
}

@customElement('bolt-carousel')
class BoltCarousel extends withLitHtml {
  static props = {
    ...carouselProps,
    slideOffsetBefore: props.boolean,
    slideOffsetAfter: props.boolean,
    thumbs: {
      ...props.object,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = false;
    self.schema = originalSchema;
    self.onSlideChange = self.onSlideChange.bind(self);
    self.disableSwipingIfAllSlidesAreVisible = self.disableSwipingIfAllSlidesAreVisible.bind(
      self,
    );
    self.conditionallyDisableButtons = self.conditionallyDisableButtons.bind(
      self,
    );
    self.reInitCarousel = self.reInitCarousel.bind(self);
    return self;
  }

  connecting() {
    super.connecting && super.connecting();

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
      this.props.slidesPerView,
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
      this.options.thumbs = this.props.thumbs;

      this.init();
    }
  }

  findIdealNumberOfSlides(desiredNumberOfSlides) {
    const availableWidth = this.getBoundingClientRect().width;
    const spaceBetween = this.spaceBetweenConfig;
    const minWidth = this.props.noMinWidth ? 0 : 240; // @todo: update to pull in this min-width automatically
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

  configureSlidesPerGroup() {
    // opt out of the default slidesPerGroup behavior if being used as an image gallery
    if (this.mode === 'gallery' || this.mode === 'gallery-thumbnail') {
      return;
    }

    if (this.swiper.params.slidesPerView === 'auto') {
      // If `slidesPerView` is still equal to 'auto', the carousel was probably hidden on load. Just set `slidesPerGroup` to `1` for now, must be an integer.
      this.swiper.params.slidesPerGroup = 1;
    } else if (
      this.props.slidesPerGroup &&
      this.props.slidesPerGroup === 'auto'
    ) {
      this.swiper.params.slidesPerGroup = parseInt(
        this.swiper.params.slidesPerView,
        10,
      );
    } else if (
      this.props.slidesPerGroup &&
      this.props.slidesPerGroup !== 'auto'
    ) {
      // make sure slidesPerGroup can't be set to a number greater than total # of slides visible
      const slidesPerGroup = parseInt(this.props.slidesPerGroup, 10);
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

  rendered() {
    if (this.props.noJs) {
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
      thumbs: this.props.thumbs,
      watchOverflow: true,
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
        nextEl: this.renderRoot.querySelector('.c-bolt-carousel__button--next'),
        prevEl: this.renderRoot.querySelector(
          '.c-bolt-carousel__button--previous',
        ),
        disabledClass: 'c-bolt-carousel__button--disabled',
        hiddenClass: 'c-bolt-carousel__button--hidden',
      },
      pagination: this.props.noPagination
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
        hide: !this.props.freeScroll && this.props.noScrollbar,
        el: this.renderRoot.querySelector('.c-bolt-carousel__scrollbar'),
        draggable: true,
        lockClass: 'c-bolt-carousel__scrollbar-lock',
        dragClass: 'c-bolt-carousel__scrollbar-drag',
      },
      breakpointsInverse: true,
      breakpoints: {},
      grabCursor: true,
      loop: false,
      // loop: this.props.loop, // @todo: re-enable once related re-rendering bugs addressed
      autoplay: this.props.autoplay
        ? {
            delay: 5000,
          }
        : false,
      centeredSlides: false,
      centerInsufficientSlides: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slideToClickedSlide: true,
      threshold: 3,
      centeredSlides: this.props.slideAlign === 'center' ? true : false,
      effect: this.props.fade ? 'fade' : 'slide',
      freeMode: this.props.freeScroll, //@todo: re-enable when adding free-scroll prop options
      slidesPerView: this.calculateSlidesPerView(this.props.slidesPerView),

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

    super.rendered && super.rendered();
  }

  disconnecting() {
    super.disconnecting && super.disconnecting();

    this.isVisible = false;

    window.removeEventListener('throttledResize', this.reInitCarousel);
  }

  update() {
    this.swiper && this.swiper.update();
  }

  // make sure the pagination tracking keeps updating accurately when the component re-renders
  updating(newProps) {
    if (this.swiper && !this.props.noPagination) {
      this.swiper.pagination.update();
    }
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
    const props = this.validateProps(this.props);


    const classes = cx('c-bolt-carousel', {
      [`c-bolt-carousel--disabled`]: props.disabled,
      [`c-bolt-carousel--overflow`]: this.props.overflow,
      [`c-bolt-carousel--no-overflow`]: !this.props.overflow,
    });

    const wrapperClasses = cx('c-bolt-carousel__wrapper');

    const prevButton = cx(
      'c-bolt-carousel__button',
      'c-bolt-carousel__button--previous',
      {
        [`c-bolt-carousel__button--hidden`]: this.props.noNavButtons,
        [`c-bolt-carousel__button--${this.props.navButtonPosition ||
          'inner'}`]: this.props.navButtonPosition,
      },
    );

    const nextButton = cx(
      'c-bolt-carousel__button',
      'c-bolt-carousel__button--next',
      {
        [`c-bolt-carousel__button--hidden`]: this.props.noNavButtons,
        [`c-bolt-carousel__button--${this.props.navButtonPosition ||
          'inner'}`]: this.props.navButtonPosition,
      },
    );

    const buttonTemplate = (text, iconName) => html`
      <bolt-button
        size="medium"
        border-radius="full"
        color="secondary"
        icon-only
      >
        ${text}
        <bolt-icon size="large" slot="before" name="${iconName}"></bolt-icon>
      </bolt-button>
    `;

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="${wrapperClasses}">
          ${this.slot('default')}
        </div>
        ${this.props.freeScroll
          ? this.props.noScrollbar
            ? ''
            : html`
                <div class="c-bolt-carousel__scrollbar"></div>
              `
          : this.props.noPagination
          ? ''
          : html`
              <div class="c-bolt-carousel__pagination"></div>
            `}
      </div>

      ${this.props.noNavButtons === true
        ? ''
        : html`
            <div
              class="${prevButton}"
              @mousedown=${this.buttonDownHandler}
              @mouseup=${this.buttonUpHandler}
            >
              ${this.slots['previous-btn']
                ? this.slot('previous-btn')
                : buttonTemplate('Previous', 'chevron-left')}
            </div>
            <div
              class="${nextButton}"
              @mousedown=${this.buttonDownHandler}
              @mouseup=${this.buttonUpHandler}
            >
              ${this.slots['next-btn']
                ? this.slot('next-btn')
                : buttonTemplate('Next', 'chevron-right')}
            </div>
          `}
    `;
  }
}

@customElement('bolt-carousel-slide')
class BoltCarouselSlide extends withLitHtml {
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
