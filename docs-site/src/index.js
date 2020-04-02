import { lazyQueue } from '@bolt/lazy-element';

import './components/version-selector';

// demo to show how to add custom icons automatically
import './assets/icons/custom-arrow-left-colored.svg';
import './assets/icons/custom-users.svg';

lazyQueue([], async () => {
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
