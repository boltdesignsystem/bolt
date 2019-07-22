import * as grapesjs from 'grapesjs'; // eslint-disable-line no-unused-vars
import buttonSchema from '@bolt/components-button/button.schema.yml';
import textSchema from '@bolt/components-text/text.schema.yml';
import iconSchema from '@bolt/components-icon/icon.schema.yml';
import blockquoteSchema from '@bolt/components-blockquote/blockquote.schema.yml';
import chipSchema from '@bolt/components-chip/chip.schema.yml';
import imageSchema from '@bolt/components-image/image.schema.yml';
import { animationNames } from '@bolt/components-interactive-step/src/animation-meta';
import kebabCase from 'param-case';

class SchemaPropToTraitError extends Error {}
class EditorRegisterBoltError extends Error {}

/**
 * @typedef {Object} SchemaProp - JSON schema individual property
 * @prop {string} type one of 'boolean' or 'string' (if `enum` then select else text field)
 * @prop {string} [title]
 * @prop {string} [description]
 * @prop {string[]} [enum] all the `<option>`s for the `<select>`, requires `type: 'string'`
 * @prop {string} [default]
 */

/**
 * @typedef {Object} JsonSchema
 * @prop {string} [title]
 * @prop {string} [description]
 * @prop {string[]} [required]
 * @prop {{ [key: string]: SchemaProp }} properties
 */

/**
 * @param {Object} opt
 * @param {SchemaProp} opt.prop JSON Schema Prop
 * @param {string} [opt.name] machine name of value, will be passed to web components as HTML attributes; will be kebab-cased
 * @returns {GrapeTrait}
 * @throws {SchemaPropToTraitError}
 */
function convertSchemaPropToTrait({ name, prop }) {
  /** @type {GrapeTrait} */
  const trait = {
    label: prop.title || name,
    name: kebabCase(name),
    type: 'text',
  };

  if (prop.default) trait.default = prop.default;

  switch (prop.type) {
    case 'string':
      if (prop.enum) {
        trait.type = 'select';
        trait.options = prop.enum;
      } else {
        trait.type = 'text';
      }
      break;
    case 'boolean':
      trait.type = 'checkbox';
      break;
    case 'number':
      trait.type = 'number';
      break;
    default:
      console.error({ prop, name });
      throw new SchemaPropToTraitError(
        `Cannot convert schema prop "${trait.label}" of type "${prop.type}" to trait`,
      );
  }
  return trait;
}

/**
 * @param {grapesjs.Editor} editor
 * @returns {void}
 */
export function setupBolt(editor) {
  const {
    /** @type {grapesjs.DomComponents} */
    DomComponents,
    /** @type {grapesjs.BlockManager} */
    BlockManager,
  } = editor;

  /**
   * @param {Object} opt
   * @param {string} opt.name i.e. `bolt-button`
   * @param {JsonSchema} [opt.schema]
   * @param {string} [opt.initialContent] HTML for when block is added
   * @param {string} [opt.category='Bolt Component']
   * @param {boolean | string} [opt.draggable=true] Indicates if it's possible to drag the component inside others. Can use CSS selectors
   * @param {boolean | string} [opt.droppable=false] Indicates if it's possible to drop other components inside. Can use CSS selectors
   * @param {boolean} [opt.editable=true] Allow to edit the content of the component (used on Text components).
   * @param {boolean} [opt.highlightable=true]
   * @param {boolean} [opt.registerBlock=true] Register as a GrapesJS Block in addition to Component? If so, allows the user to add it from menu.
   * @param {string[]} [opt.propsToTraits=[]] Json Schema properties keys to auto-add to traits via `convertSchemaPropToTrait`
   * @param {GrapeTrait[]} [opt.extraTraits=[]] Full Trait objects that need more custom attention than `propsToTraits`
   * @returns {{ component: Object, block: Object }} instances from registering @todo fill out types
   * @see {convertSchemaPropToTrait}
   */
  function registerBoltComponent({
    name,
    schema = { properties: {} },
    initialContent = '<span>Hello World</span>',
    category = 'Bolt Component',
    draggable = true,
    droppable = false,
    editable = true,
    highlightable = true,
    registerBlock = true,
    propsToTraits = [],
    extraTraits = [],
  }) {
    // if (!schema && !schema.properties) {
    //   throw new EditorRegisterBoltError(
    //     `Registering "${name} failed due to missing schema`,
    //   );
    // }

    const { title, description, properties } = schema;

    const traitsFromProps = propsToTraits.map(propName => {
      const prop = properties[propName];

      if (!prop) {
        console.log({ schema });
        throw new EditorRegisterBoltError(
          `Prop "${propName} does not exist on schema for "${name}"`,
        );
      }

      return convertSchemaPropToTrait({ prop, name: propName });
    });

    const component = DomComponents.addType(name, {
      isComponent: el => el.tagName === name.toUpperCase(),
      model: {
        defaults: {
          type: name,
          tagName: name,
          draggable,
          droppable,
          editable,
          highlightable,
          traits: [...traitsFromProps, ...extraTraits],
        },
      },
    });

    if (registerBlock) {
      const block = BlockManager.add(name, {
        label: `<span title="${description}">${title || name}</span>`,
        category,
        select: true,
        content: {
          type: name,
          components: [initialContent],
        },
      });

      return {
        component,
        block,
      };
    }

    return {
      component,
      block: null,
    };
  }

  // schema has it as `style` but web component uses it as `color` since `style` is a reserved HTML attribute; see http://vjira2:8080/browse/BDS-721 & http://vjira2:8080/browse/BDS-1104
  const colorTrait = convertSchemaPropToTrait({
    prop: buttonSchema.properties.style,
    name: 'color',
  });
  colorTrait.label = 'Color';

  registerBoltComponent({
    name: 'bolt-button',
    schema: buttonSchema,
    initialContent: `<span>Button</span>`,
    propsToTraits: ['size', 'width', 'border_radius'],
    extraTraits: [colorTrait],
  });

  registerBoltComponent({
    name: 'bolt-text',
    schema: textSchema,
    initialContent: `<span>Text</span>`,
    propsToTraits: [
      'align',
      'color',
      'display',
      'eyebrow',
      'font-family',
      'font-size',
      'font-style',
      'font-weight',
      'headline',
      'letter-spacing',
      'line-height',
      'quoted',
      'subheadline',
      'tag',
      'text-transform',
      'text',
      'url',
    ],
  });

  registerBoltComponent({
    name: 'bolt-icon',
    schema: iconSchema,
    initialContent: `<span></span>`,
    propsToTraits: ['size', 'name', 'background', 'color'],
  });

  registerBoltComponent({
    name: 'bolt-blockquote',
    schema: blockquoteSchema,
    droppable: true,
    initialContent: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
    propsToTraits: ['size', 'alignItems', 'border', 'indent', 'fullBleed'],
    extraTraits: [
      convertSchemaPropToTrait({
        name: 'author-name',
        prop: blockquoteSchema.properties.author.properties.name,
      }),
      convertSchemaPropToTrait({
        name: 'author-title',
        prop: blockquoteSchema.properties.author.properties.title,
      }),
    ],
  });

  registerBoltComponent({
    name: 'bolt-chip',
    schema: chipSchema,
    initialContent: `<span>Placeholder</span>`,
    propsToTraits: ['url'],
  });

  registerBoltComponent({
    name: 'bolt-image',
    schema: imageSchema,
    initialContent: `<span>Placeholder</span>`, // @todo set
    propsToTraits: ['src', 'alt', 'no_lazy', 'cover'],
    extraTraits: [
      {
        name: 'ratio',
        label: 'Ratio',
        type: 'text',
        default: '4/3',
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-interactive-step',
    draggable: false,
    droppable: '[slot]',
    editable: false,
    highlightable: false,
    registerBlock: false,
    extraTraits: [
      // {
      //   name: 'speaker-position',
      //   label: 'Speaker Position',
      //   type: 'select',
      //   default: 'left',
      //   options: ['left', 'right'],
      // },
      // {
      //   name: 'customer-disposition',
      //   label: 'Customer Disposition',
      //   type: 'select',
      //   default: 'happy',
      //   options: ['happy', 'neutral', 'sad'],
      // },
    ],
  });

  registerBoltComponent({
    name: 'bolt-interactive-pathways',
    draggable: false,
    droppable: false,
    editable: false,
    highlightable: false,
    registerBlock: false,
  });

  registerBoltComponent({
    name: 'bolt-interactive-pathway',
    draggable: false,
    droppable: false,
    editable: false,
    highlightable: false,
    registerBlock: false,
  });

  registerBoltComponent({
    name: 'bolt-animation-wrapper',
    draggable: false,
    droppable: true,
    editable: true,
    highlightable: true,
    registerBlock: false,
    extraTraits: [
      {
        name: 'bolt-animation-name',
        label: 'Animation Name',
        type: 'select',
        default: 'none',
        options: ['none', ...animationNames],
      },
      {
        name: 'bolt-animation-duration',
        label: 'Animation Duration',
        type: 'number',
        default: 500,
      },
      {
        name: 'bolt-animation-delay',
        label: 'Animation Delay',
        type: 'number',
        default: 0,
      },
      {
        name: 'bolt-animation-function',
        label: 'Animation Function',
        type: 'select',
        options: [
          {
            name: 'Linear',
            value: 'linear',
          },
          {
            value: 'ease-in',
            name: 'Ease In',
          },
          {
            value: 'ease-out',
            name: 'Ease Out',
          },
          {
            value: 'ease-in-out',
            name: 'Ease In Out',
          },
        ],
      },
    ],
  });
}
