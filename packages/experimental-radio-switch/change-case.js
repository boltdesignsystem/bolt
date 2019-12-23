import { props } from '@bolt/core-v3.x/utils';
import { customElement, html } from '@bolt/element';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
const changeCase = require('change-case');

@customElement('bolt-change-case')
class BoltChangeCase extends withLitHtml {
  static props = {
    mode: props.string,
  };

  constructor(props) {
    super(props);
    this.useShadow = false;
  }

  render() {
    switch (this.props.mode) {
      case 'kebab':
        return html`
          ${changeCase.paramCase(this.textContent)}
        `;
      case 'snake':
        return html`
          ${changeCase.snakeCase(this.textContent)}
        `;
      case 'camel':
      default:
        return html`
          ${changeCase.camelCase(this.textContent)}
        `;
      // return html`
      //   ${this.textContent}
      // `;
    }
  }
}
