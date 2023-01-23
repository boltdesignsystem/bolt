import { createRoot } from 'react-dom/client';
import Notifications from '@bolt/react-components/Notifications';
import ErrorBoundary from '@bolt/react-components/ErrorBoundary';
import ErrorFallback from '@bolt/react-components/Notifications/ErrorFallback';
import hoverintent from 'hoverintent';
import notificationElements from './notification-elements';
import './notification-feed.scss';

class NotificationFeed {
  constructor(opts) {
    if (!opts) return;

    this.handleEscapeKeypress = this.handleEscapeKeypress.bind(this);
    this.handleExternalClick = this.handleExternalClick.bind(this);

    this.setup(opts);
  }

  setup(opts) {
    if (!opts) return;

    const { rootElement, ...otherOpts } = opts;

    if (!rootElement) return;

    const { container, button, popover, root } = notificationElements();

    this.container = container;
    this.button = button;

    popover.append(root);
    container.append(button, popover);
    rootElement.append(container);

    this.addHoverHandler();
    button.addEventListener('click', () => {
      this.togglePopover();
    });

    if (rootElement) {
      const reactRoot = createRoot(root);
      reactRoot.render(
        <ErrorBoundary fallback={<ErrorFallback {...otherOpts} />}>
          <Notifications isToolbar={true} {...otherOpts} />
        </ErrorBoundary>,
      );
    }
  }

  addHoverHandler() {
    const opts = {
      timeout: 200,
      interval: 50,
    };

    hoverintent(
      this.container,
      () => {
        this.showPopover();
      },
      () => {
        this.hidePopover();
      },
    ).options(opts);
  }

  togglePopover() {
    if (this.button.getAttribute('aria-expanded') !== 'true') {
      this.showPopover();
    } else {
      this.hidePopover();
    }
  }

  showPopover() {
    if (this.button.getAttribute('aria-expanded') !== 'true') {
      this.button.setAttribute('aria-expanded', 'true');
    }

    document.addEventListener('click', this.handleExternalClick);
    document.addEventListener('keyup', this.handleEscapeKeypress);
  }

  hidePopover() {
    this.button.setAttribute('aria-expanded', 'false');

    document.removeEventListener('click', this.handleExternalClick);
    document.removeEventListener('keyup', this.handleEscapeKeypress);
  }

  getKey(e) {
    if (e.key !== undefined) {
      return e.key;
    } else if (e.keyCode !== undefined) {
      return e.keyCode;
    }
  }

  handleEscapeKeypress(e) {
    if (this.getKey(e) === 'Escape' || this.getKey(e) === 27) {
      this.button.focus();
      this.hidePopover();
    }
  }

  handleExternalClick(e) {
    if (this.container.contains(e.target)) {
      return;
    }

    this.hidePopover();
  }
}

export default NotificationFeed;
