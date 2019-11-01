/* eslint-disable no-unused-expressions */
import { LitElement } from 'lit-element';
import { Slotify } from './Slotify.js';
import {
  renderAndRenderedEvents,
  lazyStyles,
  conditionalShadowDom,
} from './lib/decorators';

@renderAndRenderedEvents()
@lazyStyles()
@conditionalShadowDom()
class BoltElement extends Slotify(LitElement) {}

export { BoltElement };
