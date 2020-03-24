/* eslint-disable no-unused-expressions */
import { supportsAdoptingStyleSheets } from 'lit-element/lib/css-tag.js';
import { camelCase } from 'camel-case/dist.es2015/index.js';
import { paramCase } from 'param-case/dist.es2015/index.js';
import { Slotify } from './Slotify.js';
import {
  renderAndRenderedEvents,
  lazyStyles,
  conditionalShadowDom,
} from './lib/decorators';

// @jsonSchemaProps() // @todo: move schema prop logic into decorator
@renderAndRenderedEvents()
@lazyStyles()
@conditionalShadowDom()
class BoltElement extends Slotify {
  constructor() {
    super();

    if (this.constructor.defaultProps) {
      for (const key in this.constructor.defaultProps) {
        let value = this.constructor.defaultProps[key];
        this[key] = value;
      }
    }
  }

  static get props() {
    if (!this.schema) {
      return {};
    }

    const props = {};
    for (const key in this.schema.properties) {
      let property = this.schema.properties[key];

      if (
        !property.title ||
        (!property.title.includes('deprecated') &&
          !property.title.includes('DEPRECATED'))
      ) {
        const propName = camelCase(key);

        let propType;

        switch (property.type) {
          case 'boolean':
            propType = Boolean;
            break;
          case 'string':
            propType = String;
            break;
          case 'number':
            propType = Number;
            break;
          case 'array':
            propType = Array;
            break;
          case 'object':
            propType = Object;
            break;
          case undefined:
            propType = String;
            break;
          default:
            propType = Object;
            break;
        }

        props[propName] = {
          type: propType,
          reflect:
            property.type === 'boolean' || property.reflect ? true : false,
          attribute: paramCase(propName),
        };
      }
    }

    return props;
  }

  static get defaultProps() {
    if (!this.schema) {
      return {};
    }

    const defaultProps = {};

    for (const key in this.schema.properties) {
      let property = this.schema.properties[key];

      if (
        !property.title ||
        (!property.title.includes('deprecated') &&
          !property.title.includes('DEPRECATED'))
      ) {
        if (property.default) {
          defaultProps[camelCase(key)] = property.default;
        }
      }
    }

    return defaultProps;
  }

  // patch to https://github.com/Polymer/lit-element/blob/master/src/lit-element.ts#L208
  // as a temp workaround to constructible stylesheets not working when
  // rendering inside + outside an iframe. Filing a bug with lit-element shortly!
  update(changedProperties) {
    super.update(changedProperties);

    // When native Shadow DOM is used but adoptedStyles are not supported
    // (or can't be used -- ex. attached to more than one document), insert
    // styling after rendering to ensure adoptedStyles have highest priority.
    if (
      supportsAdoptingStyleSheets &&
      this.renderRoot.adoptedStyleSheets &&
      this.renderRoot.adoptedStyleSheets.length === 0
    ) {
      this._needsShimAdoptedStyleSheets = false;
      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
}

export { BoltElement };
