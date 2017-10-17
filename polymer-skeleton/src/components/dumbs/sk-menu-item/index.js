
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import css from './style.postcss';
import template from './template.html';

export default class SkMenuItem extends PolymerElement {

  static get template() {
    return `<style>${css}</style> ${template}`;
  }
}

window.customElements.define('sk-menu-item', SkMenuItem);
