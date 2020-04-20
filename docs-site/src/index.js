import { lazyQueue } from '@bolt/lazy-queue';

import './components/version-selector';

// demo to show how to add custom icons automatically

lazyQueue([], async () => {
  await import('./custom-icons');
  await import(
    /* webpackChunkName: "docs-site--editor-integration" */
    './pages/pattern-lab/_patterns/04-pages/99999-bolt-dev-sandbox/editor-integration'
  );
  await import(
    /* webpackChunkName: "docs-site--card-deprecated-tests" */
    './pages/pattern-lab/_patterns/02-components/card-deprecated/__tests__'
  );
  await import(
    /* webpackChunkName: "docs-site--animate-demos" */ './animate-demos'
  );
  await import(
    /* webpackChunkName: "docs-site--typeahead-demos" */ './typeahead-demos'
  );
  await import(
    /* webpackChunkName: "docs-site--autotrack" */ '@bolt/analytics-autotrack'
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
