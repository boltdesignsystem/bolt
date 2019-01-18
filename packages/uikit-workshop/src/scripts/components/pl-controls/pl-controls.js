import { define, props } from 'skatejs';
import { h } from 'preact';

const classNames = require('classnames');
import { urlHandler, patternName } from '../../utils';

import { store } from '../../store.js'; // connect to redux
import { BaseComponent } from '../base-component.js';

import { ViewportSize } from '../pl-viewport-size/pl-viewport-size';
import { ViewportSizeList } from '../pl-viewport-size-list/pl-viewport-size-list';

@define
class Controls extends BaseComponent {
  static is = 'pl-controls';

  constructor(self) {
    self = super(self);
    self.useShadow = false;
    return self;
  }

  _stateChanged(state) {
    this.pxSize = state.app.viewportPx;
    this.emSize = state.app.viewportEm;
    this.triggerUpdate();
  }

  connected() {
    const state = store.getState();
    this.pxSize = state.app.viewportPx;
    this.emSize = state.app.viewportEm;
    // store.dispatch(updateThemeMode(this.themeMode));
  }

  render() {
    const { ishControlsHide } = window.ishControls;
    // const { pxSize, emSize } = 

    return (
      <div className="pl-c-controls">
        <ViewportSize px={this.pxSize} em={this.emSize} />
        <ViewportSizeList {...ishControlsHide} />
        <pl-tools-menu />
      </div>
    );
  }
}

export { Controls };
