/* eslint-disable no-unused-vars, no-param-reassign */
import { LitElement, html, customElement } from 'lit-element';
import { store } from '../../store.js'; // connect to the Redux store.
import { updateTestMode } from '../../actions/app.js'; // redux actions needed
import { updateArchiveMode } from '../../actions/app.js'; // redux actions needed
import styles from './pl-toggle-test.scss?external';

@customElement('pl-toggle-test')
class TestToggle extends LitElement {
  constructor(self) {
    self = super(self);
    // self.handleClick = self.handleClick.bind(self);
    return self;
    // self.targetOrigin =
    //   window.location.protocol === 'file:'
    //     ? '*'
    //     : window.location.protocol + '//' + window.location.host;
    // return self;
  }

  static get properties() {
    return {
      testMode: {
        attribute: true,
        type: Boolean,
      },
      archiveMode: {
        attribute: true,
        type: Boolean,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    styles.use();

    const state = store.getState();
    this.testMode = state.app.testMode || false;
    this.archiveMode = state.app.archiveMode || false;

    this.__storeUnsubscribe = store.subscribe(() =>
      this._stateChanged(store.getState()),
    );
    this._stateChanged(store.getState());

    store.dispatch(updateTestMode(this.testMode));
    store.dispatch(updateArchiveMode(this.archiveMode));
  }

  toggleFolders() {
    store.dispatch(updateTestMode(!this.testMode));
    store.dispatch(updateArchiveMode(!this.archiveMode));
  }

  disconnectedCallback() {
    this.__storeUnsubscribe && this.__storeUnsubscribe();
    styles.unuse();

    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  _stateChanged(state) {
    if (this.testMode !== state.app.testMode) {
      this.testMode = state.app.testMode;
    }
    if (this.archiveMode !== state.app.archiveMode) {
      this.archiveMode = state.app.archiveMode;
    }
  }

  render() {
    return html`
      <pl-button
        class="pl-c-tools__action pl-c-toggle-test__action"
        title="Toggle Hidden Folders"
        @click="${() => this.toggleFolders()}"
        >${this.testMode ? 'Hide' : 'Show'} Archive and Test Folders
        <pl-icon slot="after" name="test"></pl-icon>
      </pl-button>
    `;
  }
}

export { TestToggle };
