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
// Expanded button
const expandedButtons = document.querySelectorAll(
  '.js-bolt-page-header-expanded-button',
);
expandedButtons.forEach(el => {
  el.addEventListener('click', e => {
    if (el.getAttribute('aria-expanded') !== 'true') {
      const self = el;
      expandedButtons.forEach(el => {
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

// Expanded nav link
const expandedNavLinks = document.querySelectorAll(
  '.js-bolt-page-header-expanded-nav-link',
);
expandedNavLinks.forEach(el => {
  el.addEventListener('click', e => {
    if (el.getAttribute('aria-expanded') !== 'true') {
      el.setAttribute('aria-expanded', 'true');
      e.currentTarget
        .closest('.js-bolt-page-header-expanded-nav-list')
        .classList.add('is-covered');
    } else {
      el.setAttribute('aria-expanded', 'false');
      e.currentTarget
        .closest('.js-bolt-page-header-expanded-nav-list')
        .classList.remove('is-covered');
    }
  });
});

// Main nav toggle
// const mainNavToggle = document.getElementById(
//   'js-bolt-page-header-main-nav-toggle',
// );
// if (mainNavToggle) {
//   mainNavToggle.addEventListener('click', e => {
//     const mainNav = document.getElementById('js-bolt-page-header-main-nav');
//     if (mainNav) {
//       mainNav.classList.toggle('is-expanded');
//     }
//   });
// }
