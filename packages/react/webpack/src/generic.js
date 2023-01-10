// publicPath must be imported first, @see https://webpack.js.org/guides/public-path/#on-the-fly
import '../../react/components/publicPath';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '../../react/components/ErrorBoundary';

import Notifications from '../../react/components/Notifications';
import ErrorFallback from '../../react/components/ErrorFallback';

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
        toolbarTarget,
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
