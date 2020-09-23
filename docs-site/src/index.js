import { lazyQueue } from '@bolt/lazy-queue';

// Component-specific examples and demos that need to get compiled:
lazyQueue(['bolt-card'], async () => {
  await import(
    /*  webpackChunkName: 'bolt-docs-site--deprecated-card-tests' */ './pages/pattern-lab/_patterns/40-components/card-deprecated/__tests__'
  );
});

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

// PAGE HEADER WIP CODE (REMOVE LATER)
//
// Expanded buttons
const pageHeaderExpandedButtons = document.querySelectorAll(
  '.js-bolt-page-header-expanded-button',
);
pageHeaderExpandedButtons.forEach(el => {
  el.addEventListener('click', e => {
    if (el.getAttribute('aria-expanded') !== 'true') {
      const self = el;
      pageHeaderExpandedButtons.forEach(el => {
        if (el !== self) {
          el.setAttribute('aria-expanded', 'false');
        }
      });
      el.setAttribute('aria-expanded', 'true');
      document.querySelector('body').classList.add('u-bolt-overflow-hidden');
    } else {
      el.setAttribute('aria-expanded', 'false');
      document.querySelector('body').classList.remove('u-bolt-overflow-hidden');
    }
  });
});

// Nested nav links
const pageHeaderNestedNavListTriggers = document.querySelectorAll(
  '.js-bolt-page-header-nested-nav-list-trigger',
);
pageHeaderNestedNavListTriggers.forEach(el => {
  el.addEventListener('click', e => {
    const closestList = e.currentTarget.closest(
      '.js-bolt-page-header-nested-nav-list',
    );
    const closestListItem = e.currentTarget.closest(
      '.js-bolt-page-header-nav-list-item',
    );

    if (el.getAttribute('aria-expanded') !== 'true') {
      el.setAttribute('aria-expanded', 'true');
      closestList?.classList.add('is-covered');
      closestListItem?.classList.add('is-expanded');
    } else {
      el.setAttribute('aria-expanded', 'false');
      closestList?.classList.remove('is-covered');
      closestListItem?.classList.remove('is-expanded');
    }

    // @todo: Set aria-hidden attributes on other list-items if current one is expanded
    // const allListItems = document.querySelectorAll(
    //   '.js-bolt-page-header-nav-list-item',
    // );
    // const expandedItems = document.querySelectorAll(
    //   '.js-bolt-page-header-nav-list-item.is-expanded',
    // );

    // if (expandedItems.length) {
    //   allListItems.forEach(el => {
    //     if (
    //       el.classList.contains('is-expanded') ||
    //       el.closest('.is-expanded')
    //     ) {
    //       el.removeAttribute('aria-hidden');
    //     } else {
    //       el.setAttribute('aria-hidden', true);
    //     }
    //   });
    // } else {
    //   allListItems.forEach(el => {
    //     el.removeAttribute('aria-hidden');
    //   });
    // }
  });
});
