import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-typeahead'], async () => {
  await import(
    /*  webpackChunkName: 'bolt-docs-site--typeahead-demos' */ './typeahead-demos'
  );
});

import './pages/pattern-lab/_patterns/50-pages/99999-bolt-dev-sandbox/editor-integration'; // lazy-queue used internally so not using it here

lazyQueue(['bolt-select'], async () => {
  await import(
    /*  webpackChunkName: 'bolt-docs-site--version-selector' */ './components/version-selector/version-selector'
  );
});

lazyQueue(['bolt-animate'], async () => {
  await import(
    /*  webpackChunkName: 'bolt-docs-site--animate-demos' */ './animate-demos'
  );
});

// remaining (misc) docs site-related code that isn't attached to a particular selector
lazyQueue([], async () => {
  await import('./custom-icons');

  await import(
    /*  webpackChunkName: 'bolt-docs-site--analytics-autotrack' */ '@bolt/analytics-autotrack'
  );
});

// Academy-specific JS demoing the Mission Completed form's button re-activating
const missionRatingInputs = document.querySelectorAll(
  '.js-mission-rating-input',
);
const missionRatingSubmit = document.querySelector('.js-mission-rating-submit');

for (const missionRatingInput of missionRatingInputs) {
  missionRatingInput.addEventListener('input', e => {
    if (missionRatingInput.validity.valid && e.target.value !== 'on') {
      missionRatingSubmit.removeAttribute('disabled');
    } else {
      missionRatingSubmit.setAttribute('disabled', '');
    }
  });
}

if (missionRatingSubmit) {
  missionRatingSubmit.addEventListener('click', e => {
    if (!missionRatingSubmit.hasAttribute('disabled')) {
      e.preventDefault();

      window.location.href =
        '/pattern-lab/patterns/50-pages-60-academy-05-pages-t1-landing-pages-mission-landing--test-with-modal-02-t1-mission-landing--test-with-modal--after-submit/50-pages-60-academy-05-pages-t1-landing-pages-mission-landing--test-with-modal-02-t1-mission-landing--test-with-modal--after-submit.html';
    }
  });
}

// Quick-filters-specific JS demoing the overflow scroll behavior of the filter menu
const quickFiltersScroll = el => {
  if (!el) return;

  const wrapper = el.closest('.js-base-quick-filters-scroll-wrapper');

  function handleScroll() {
    const wrapperWidth = wrapper.offsetWidth;
    const buffer = 1; // Use buffer due to sub-pixel rounding differences between scroll and wrapper width
    const notStart = el.scrollLeft > buffer;
    const notEnd = el.scrollLeft < el.scrollWidth - wrapperWidth - buffer;
    const isOverflowing = el.scrollWidth > wrapperWidth;

    if (isOverflowing) {
      wrapper.classList.add('is-overflowing');
      if (notStart) {
        wrapper.classList.add('not-start');
      } else {
        wrapper.classList.remove('not-start');
      }
      if (notEnd) {
        wrapper.classList.add('not-end');
      } else {
        wrapper.classList.remove('not-end');
      }
    } else {
      wrapper.classList.remove('is-overflowing');
      wrapper.classList.remove('not-start');
      wrapper.classList.remove('not-end');
    }
  }

  el.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });

  handleScroll(); // Call once onload to setup initial classes
};

const quickFiltersScrollEl = document.querySelector(
  '.js-base-quick-filters-scroll',
);

if (quickFiltersScrollEl) {
  quickFiltersScroll(quickFiltersScrollEl);
}
