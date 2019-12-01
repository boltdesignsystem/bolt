import { withLitHtml } from './renderer-lit-html';

export class withLitEvents extends withLitHtml {
  connecting() {
    super.connecting && super.connecting();
    // Keep an object of listener types mapped to callback functions
    this._listeners = {};
  }

  disconnecting() {
    super.disconnecting && super.disconnecting();
    // Keep an object of listener types mapped to callback functions
    this._listeners = {};
  }

  /**
   * Register a new callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  on(type, handler) {
    if (typeof this._listeners[type] === 'undefined') {
      this._listeners[type] = [];
    }

    this._listeners[type].push(handler);

    return this;
  }

  /**
   * Unregister an existing callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  off(type, handler) {
    var index = this._listeners[type].indexOf(handler);

    if (index > -1) {
      this._listeners[type].splice(index, 1);
    }

    return this;
  }

  /**
   * Iterate over all registered handlers for given type and call them all with
   * the dialog element as first argument, event as second argument (if any).
   *
   * @access private
   * @param {string} type
   * @param {Event} event
   */
  _fire(type, ...props) {
    var listeners = this._listeners[type] || [];

    listeners.forEach(
      function(listener) {
        listener(this, props);
      }.bind(this),
    );
  }
};
