import { html } from 'lit-html';
import { withComponent } from 'skatejs';
import withLitHtml from '@skatejs/renderer-lit-html';

class MyComponent extends withComponent(withLitHtml()) {
  renderCallback() {
    return html`Hello, <slot />!`;
  }
}