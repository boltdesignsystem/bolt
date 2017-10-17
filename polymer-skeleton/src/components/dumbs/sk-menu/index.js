
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import './../sk-menu-item';

import css from './style.postcss';
import template from './template.html';

export default class SkMenu extends PolymerElement {

  static get template() {
    return `<style>${css}</style> ${template}`;
  }
}

window.customElements.define('sk-menu', SkMenu);
