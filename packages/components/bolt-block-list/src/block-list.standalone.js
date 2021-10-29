import {
  BoltElement,
  unsafeCSS,
  html,
  customElement,
  unsafeHTML,
} from '@bolt/element';

// import styles from './block-list.scss';
// import schema from '../block-list.schema';

@customElement('bolt-block-list')
class BoltBlockList extends BoltElement {
  // Note: this component uses a custom <script> tag to write `items` data to the custom element (@see block-list.twig).
  // The JS does not actually use the schema, commenting out for now. This component will likely be removed or replaced.

  // static schema = schema;

  // static get properties() {
  //   return {
  //     ...this.props,
  //   };
  // }

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.items = this.items || [];
  }

  render() {
    return html`
      <ul class="c-bolt-block-list">
        ${this.items && this.items.length >= 1
          ? this.items.map(
              item =>
                html`
                  <li class="c-bolt-block-list__item">${unsafeHTML(item)}</li>
                `,
            )
          : ''}
      </ul>
    `;
  }
}

export { BoltBlockList };
