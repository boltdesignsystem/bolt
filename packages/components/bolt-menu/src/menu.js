import { supportsCSSVars } from '@bolt/core/utils';
import classNames from 'classnames/dedupe';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import menuStyles from './menu.scss';
import schema from '../menu.schema';

let cx = classNames.bind(menuStyles);

@customElement('bolt-menu')
class BoltMenu extends BoltElement {
  static get properties() {
    return {
      // ratio: String,
      // _ratioW: String, // internal only prop for handling the width-specific data from the ratio prop
      // _ratioH: String, // internal only prop for handling the height-specific data from the ratio prop
      // aspectRatioHeight: {
      //   type: Number, // deprecated - will be removed in Bolt v3.0
      //   attribute: 'aspect-ratio-height',
      // },
      // aspectRatioWidth: {
      //   type: Number, // deprecated - will be removed in Bolt v3.0
      //   attribute: 'aspect-ratio-width',
      // },
      spacing: String,
      noCssVars: {
        type: Boolean,
        attribute: 'no-css-vars',
      },
    };
  }

  constructor() {
    super();
    this.noCssVars = supportsCSSVars ? false : true;
  }

  static get styles() {
    return [unsafeCSS(menuStyles)];
  }

  render() {
    // @todo: automatic schema validation?
    const spacing = this.spacing || schema.properties.spacing.default;

    const classes = cx('c-bolt-menu__title', {
      [`c-bolt-menu__title--spacing-${spacing}`]: spacing,
    });

    return html`
      <div class="${cx(`c-bolt-menu`)}">
        ${this.templateMap.get('title') &&
          html`
            <div class="${classes}">
              ${this.slotify('title')}
            </div>
          `}
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltMenu };
