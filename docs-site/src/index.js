import { lazyQueue } from '@bolt/lazy-queue';

// Component-specific examples and demos that need to get compiled:
lazyQueue(['bolt-card'], async () => {
  await import(
    /*  webpackChunkName: 'bolt-docs-site--deprecated-card-tests' */ './pages/pattern-lab/_patterns/02-components/card-deprecated/__tests__'
  );
});

lazyQueue(['bolt-typeahead'], async () => {
  await import(
    /*  webpackChunkName: 'bolt-docs-site--typeahead-demos' */ './typeahead-demos'
  );
});

import './pages/pattern-lab/_patterns/04-pages/99999-bolt-dev-sandbox/editor-integration'; // lazy-queue used internally so not using it here

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

// Blueprint-specific JS demoing the Mission Completed form's button re-activating
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
        '/pattern-lab/patterns/03-blueprints-05-pages-t1-landing-pages-mission-landing--test-with-modal-02-t1-mission-landing--test-with-modal--after-submit/03-blueprints-05-pages-t1-landing-pages-mission-landing--test-with-modal-02-t1-mission-landing--test-with-modal--after-submit.html';
    }
  });
}
