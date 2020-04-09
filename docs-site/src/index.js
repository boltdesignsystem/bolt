import './components/version-selector/version-selector';
// import './components/schema-form'; // Component Explorer is temporarily disabled until we're done migrating our Twig Rendering Service to Now.sh v2
import './components/handle-iframe-height';
import './pages/pattern-lab/_patterns/02-components/card-deprecated/__tests__';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/bolt-preact-test';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/bolt-lit-test';
// import './pages/pattern-lab/_patterns/01-styleguide/100-rendering-performance/lazy-lit-test';
import './pages/pattern-lab/_patterns/04-pages/99999-bolt-dev-sandbox/editor-integration';
import { enableAnimDemos } from './pages/pattern-lab/_patterns/06-experiments/animate/animate-demo-helpers.js';
enableAnimDemos();

// Component-specific examples that need to get compiled:
import '@bolt/components-typeahead/__demos__/dynamically-fetch-data/typeahead.dynamically-fetch-data';
import '@bolt/components-typeahead/__demos__/navigate-to-search-results/typeahead.navigate-to-search-results';
import '@bolt/components-typeahead/__demos__/navigate-to-exact-result/typeahead.navigate-to-exact-result';

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
