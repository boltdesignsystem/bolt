import { camelCase } from 'camel-case/dist.es2015/index';
import { paramCase } from 'param-case/dist.es2015/index';

/**
 * A Class decorator that extends the LitElement to support using a JSON schema for automatically configuring component props.
 *
 * @param {Class} clazz - The original Class to extend
 * @returns {Class} - The extended Class with this.props + default props auto-added
 */
const jsonSchemaPropsDecorator = clazz => {
  return class extends clazz {
    constructor() {
      super();

      // set the WC's prop defaults based on the schema defaults
      if (this.constructor.defaultProps) {
        for (const key in this.constructor.defaultProps) {
          let value = this.constructor.defaultProps[key];
          this[key] = value;
        }
      }
    }

    // uses the static schema data passed to to generate default property data
    static get props() {
      this.defaultProps = {};

      if (!this.schema) {
        return {};
      }

      const props = {};
      for (const key in this.schema.properties) {
        let property = this.schema.properties[key];

        // Bolt uses `title` to mark properties as deprecated
        const isDeprecated = property.title
          ?.toLowerCase()
          .includes('deprecated');

        // these schema props are never used by Web Components, only by Twig
        const twigOnlyProps = [
          'attributes',
          'content',
          'items',
          'children',
          'style',
        ];
        const isTwigOnly = twigOnlyProps.includes(key.toLowerCase());

        // skip deprecated and Twig-only props
        if (!isDeprecated && !isTwigOnly) {
          const propName = camelCase(key);

          if (property.default || property.default === 0) {
            this.defaultProps[propName] = property.default;
          }

          let propType;

          // map the JSON schema property type to LitElement property types
          // see https://lit-element.polymer-project.org/guide/properties#declare for more info
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

            // @todo: re-evaluate this switch default for handling `any` + multi-types
            default:
              propType = Object;
              break;
          }

          props[propName] = {
            type: propType,
            reflect: property.reflect ? true : false,
            attribute: paramCase(propName),
          };

          // BoltActionElement props use the `alias` key for `convertInitialTags` decorator
          if (property.alias) {
            props[propName].alias = property.alias;
          }
        }
      }

      return props;
    }
  };
};

const legacyJsonSchemaPropsDecorator = clazz => {
  return jsonSchemaPropsDecorator(clazz);
};

const standardJsonSchemaPropsDecorator = descriptor => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return jsonSchemaPropsDecorator(clazz);
    },
  };
};

/**
 * Class decorator factory that adds JSON schema support to the LitElement-based web component
 * Automatically uses the appropriate decorator syntax based on what's supported / how the code is being compiled.
 */
export const jsonSchemaProps = () => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyJsonSchemaPropsDecorator(classOrDescriptor)
    : standardJsonSchemaPropsDecorator(classOrDescriptor);
