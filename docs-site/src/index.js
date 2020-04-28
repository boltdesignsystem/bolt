import(
  /* webpackChunkName: 'bolt-version-selector' */ './components/version-selector/version-selector'
);
import(/* webpackChunkName: 'bolt-autolink' */ '@bolt/analytics-autolink');

import(
  /* webpackChunkName: 'bolt-autotrack' */ '@bolt/analytics-autotrack'
);

import './pages/pattern-lab/_patterns/02-components/card-deprecated/__tests__';

import(
  /* webpackChunkName: 'bolt-editor-integration' */ './pages/pattern-lab/_patterns/04-pages/99999-bolt-dev-sandbox/editor-integration'
);

import { enableAnimDemos } from './pages/pattern-lab/_patterns/06-experiments/animate/animate-demo-helpers.js';
enableAnimDemos();

// Component-specific examples that need to get compiled:
import(/* webpackChunkName: 'bolt-typeahead-demos' */ './typeahead-demos');

// demo to show how to add custom icons automatically
import './assets/icons/custom-arrow-left-colored.svg';
import './assets/icons/custom-users.svg';

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
