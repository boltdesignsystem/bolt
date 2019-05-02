import { props, define } from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
const changeCase = require('change-case');

@define
class BoltChangeCase extends withLitHtml() {
  static is = 'bolt-change-case';

  static props = {
    mode: props.string,
  };

  constructor(props) {
    super(props);
    this.useShadow = false;
  }

  render() {
    switch (this.props.mode) {
      case 'camel':
        return html`
          ${changeCase.camelCase(this.textContent)}
        `;
      case 'kebab':
        return html`
          ${changeCase.paramCase(this.textContent)}
        `;
      case 'snake':
        return html`
          ${changeCase.snakeCase(this.textContent)}
        `;
      default:
        return html`
          ${this.textContent}
        `;
    }
  }
}
