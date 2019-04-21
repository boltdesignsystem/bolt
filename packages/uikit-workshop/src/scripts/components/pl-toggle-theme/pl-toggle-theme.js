import { define, props } from 'skatejs';
import { h } from 'preact';

import { store } from '../../store.js'; // connect to the Redux store.
import { updateThemeMode } from '../../actions/app.js'; // redux actions needed
import { BaseComponent } from '../base-component.js';
import SunIcon from '../../../icons/sun.svg';
import MoonIcon from '../../../icons/moon.svg';

@define
class ThemeToggle extends BaseComponent {
  static is = 'pl-toggle-theme';

  constructor(self) {
    self = super(self);
    self.useShadow = false;
    self.targetOrigin =
      window.location.protocol === 'file:'
        ? '*'
        : window.location.protocol + '//' + window.location.host;
    return self;
  }

  connected() {
    const state = store.getState();
    this.themeMode = state.app.themeMode || 'dark';
    store.dispatch(updateThemeMode(this.themeMode));
  }

  static props = {
    themeMode: props.string,
  };

  _stateChanged(state) {
    this.themeMode = state.app.themeMode;
    this.iframeElement = document.querySelector('.pl-js-iframe');

    if (this.iframeElement) {
      const obj = JSON.stringify({
        event: 'patternLab.stateChange',
        state,
      });
      this.iframeElement.contentWindow.postMessage(obj, this.targetOrigin);
    }
  }

  render({ themeMode }) {
    const toggleThemeMode = this.themeMode !== 'dark' ? 'dark' : 'light';
    return (
      <div class="pl-c-toggle-theme">
        <button
          class="pl-c-tools__action pl-c-toggle-theme__action"
          title="Switch Theme"
          onClick={_ => store.dispatch(updateThemeMode(toggleThemeMode))}
        >
          <span class="pl-c-tools__action-text">Switch Theme</span>

          <span class="pl-c-tools__action-icon">
            {themeMode === 'dark' ? (
              <MoonIcon height={20} width={20} viewBox="0 0 24 24" fill="currentColor" />
            ) : (
              <SunIcon height={20} width={20} viewBox="0 0 24 24" fill="currentColor" />
            )}
          </span>
        </button>
      </div>
    );
  }
}

export { ThemeToggle };
