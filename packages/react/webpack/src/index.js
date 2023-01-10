// publicPath must be imported first, @see https://webpack.js.org/guides/public-path/#on-the-fly
import '@bolt/react-components/Notifications/publicPath';
// import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Notifications from '@bolt/react-components/Notifications';
import ErrorBoundary from '@bolt/react-components/ErrorBoundary';
import ErrorFallback from '@bolt/react-components/Notifications/ErrorFallback';
import '@bolt/starter-kit/dist/build/bolt-global.js';

class NotificationFeed {
  constructor(opts) {
    if (!opts) return;
    this.setup(opts);
  }

  setup(opts) {
    if (!opts) return;
    const { rootElement } = opts;
    // Load in-page Notification Feed app
    // const selector = '#notification-feed-app';
    // const target = document.querySelector(selector);

    // if (target) {
    //   const root = createRoot(target);
    //   root.render(
    //     <ErrorBoundary fallback={<ErrorFallback {...opts} />}>
    //       <Notifications {...opts} />
    //     </ErrorBoundary>,
    //     target,
    //   );
    // } else {
    //   console.warn(`Selector '${selector}' not found`);
    // }

    if (rootElement) {
    } else {
      console.warn('`rootElement` is required');
    }

    // Load toolbar Notification Feed app
    const toolbarTarget = document.querySelector(rootElement);

    if (toolbarTarget) {
      const toolbarRoot = createRoot(toolbarTarget);
      toolbarRoot.render(
        <ErrorBoundary fallback={<ErrorFallback isToolbar={true} {...opts} />}>
          <Notifications isToolbar={true} {...opts} />
        </ErrorBoundary>,
      );
    } else {
      console.warn(`Selector '${rootElement}' not found`);
    }
  }
}

if (typeof window.pegaComponents === 'undefined') {
  window.pegaComponents = {};
}

window.pegaComponents.NotificationFeed = NotificationFeed;

// const MyComponent = function () {
//   const [foo, setFoo] = useState(1);
//   return <div>dd</div>;
// };

// const toolbarTarget = document.querySelector('#notification-feed-toolbar-app');

// if (toolbarTarget) {
//   const toolbarRoot = createRoot(toolbarTarget);
//   toolbarRoot.render(<MyComponent />);
// } else {
//   console.warn(`Selector '${'#notification-feed-toolbar-app'}' not found`);
// }
