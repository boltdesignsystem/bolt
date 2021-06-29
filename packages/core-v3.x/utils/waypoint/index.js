// Adapted from https://github.com/civiccc/react-waypoint
import { getBounds } from './getBounds';
import { getCurrentPosition } from './getCurrentPosition';
import { IS_DEV } from '../environment';

export class Waypoint {
  constructor(opts) {
    this.options = {
      /**
       * `items` is an array of objects. Each object contains two keys:
       *   - `element` is the element monitored as it scrolls in and out of the boundary area.
       *   - `trigger` is the link or actionable element associated with this element (optional).
       */
      items: [],

      /**
       * `topOffset` can either be a number, in which case it's a distance from the
       * top of the container in pixels, or a string value. Valid string values are
       * of the form "20px", which is parsed as pixels, or "20%", which is parsed
       * as a percentage of the height of the containing element.
       * For instance, if you pass "-20%", and the containing element is 100px tall,
       * then the waypoint will be triggered when it has been scrolled 20px beyond
       * the top of the containing element.
       */
      topOffset: '0px',

      /**
       * `bottomOffset` is like `topOffset`, but for the bottom of the container.
       */
      bottomOffset: '0px',

      /**
       * `stickyOffset` offsets both `topOffset` and `bottomOffset` by a given pixel
       *  amount. It accounts for fixed elements positioned at the top of the viewport.
       */
      stickyOffset: '0px',

      /**
       * Function called when waypoint enters viewport
       */
      onEnter() {},

      /**
       * Function called when waypoint leaves viewport
       */
      onLeave() {},

      /**
       * Function called when waypoint position changes
       */
      onPositionChange() {},

      /**
       * Use this prop to get debug information in the console log. This slows
       * things down significantly, so it should only be used during development.
       */
      debug: false,

      /**
       * User options
       */
      ...opts,
    };

    this.setup();
  }

  setup() {
    this.updateWaypoints = this.updateWaypoints.bind(this);
    window.addEventListener('scroll', this.updateWaypoints, { passive: true });
    window.addEventListener('resize', this.updateWaypoints, { passive: true });

    // Listen for smooth-scroll events
    this.logScrollEvent = this.logScrollEvent.bind(this);
    document.addEventListener('scrollStart', this.logScrollEvent, false);
    document.addEventListener('scrollStop', this.logScrollEvent, false);
    document.addEventListener('scrollCancel', this.logScrollEvent, false);

    this.updateWaypoints();
  }

  destroy() {
    window.removeEventListener('scroll', this.updateWaypoints, {
      passive: true,
    });
    window.removeEventListener('resize', this.updateWaypoints, {
      passive: true,
    });

    document.removeEventListener('scrollStart', this.logScrollEvent, false);
    document.removeEventListener('scrollStop', this.logScrollEvent, false);
    document.removeEventListener('scrollCancel', this.logScrollEvent, false);
  }

  // Smooth scroll events triggered by clicking menu items
  logScrollEvent(event) {
    if (event.type === 'scrollStart') {
      this.scrolling = true;
    } else if (event.type === 'scrollStop' || event.type === 'scrollCancel') {
      // Wait before unsetting the scrolling flag as waypoint events may fire
      // at same time as `scrollStop` event, avoids race condition
      setTimeout(() => {
        this.scrolling = false;
      }, 100);
    }
  }

  updateWaypoints() {
    this.options.items.forEach(item => {
      this.checkWaypoint(item);
    });
  }

  checkWaypoint(item) {
    if (this.scrolling) return;

    const { trigger, element, position } = item;
    const bounds = getBounds(
      element,
      window,
      this.options.topOffset,
      this.options.bottomOffset,
      this.options.stickyOffset,
    );
    const currentPosition = getCurrentPosition(bounds);
    const previousPosition = item._previousPosition;

    // Save previous position as early as possible to prevent cycles
    item._previousPosition = currentPosition;

    if (previousPosition === currentPosition) return;

    const callbackArg = {
      trigger,
      element,
      currentPosition,
      previousPosition,
      waypointTop: bounds.waypointTop,
      waypointBottom: bounds.waypointBottom,
      viewportTop: bounds.viewportTop,
      viewportBottom: bounds.viewportBottom,
    };

    this.options.onPositionChange(callbackArg);

    if (currentPosition === 'inside') {
      this.options.onEnter(callbackArg);
    } else if (previousPosition === 'inside') {
      this.options.onLeave(callbackArg);
    }

    // Display waypoint boundaries on screen if debug is `true` (only ever IN_DEV!)
    if (IS_DEV && this.options.debug) {
      this.setBoundaryDebugger(bounds);
    }
  }

  setBoundaryDebugger({ viewportTop, viewportBottom }) {
    const top = `${viewportTop}px`;
    const bottom = `${window.innerHeight - viewportBottom}px`;

    if (!this.marker) {
      this.marker = document.createElement('div');
      this.marker.setAttribute(
        'style',
        `position: fixed; bottom: ${bottom}; top: ${top}; width: 100%; border: 1px solid red; opacity: 0.5; pointer-events: none;`,
      );
      document.body.appendChild(this.marker);
    } else {
      this.marker.style.top = top;
      this.marker.style.bottom = bottom;
    }
  }
}
