const iconSchema = require('@bolt/components-icon/icon.schema.json');
const elementSchemas = require('@bolt/element/element.schemas');
const { url, target } = elementSchemas.boltActionElement.properties;

iconSchema.properties = {
  position: {
    description: 'Where to position the icon within the button',
    type: 'string',
    default: 'after',
    enum: ['before', 'after'],
  },
  ...iconSchema.properties,
};

iconSchema.description =
  'Icon data as expected by the icon component. Accepts an additional position prop that determines placement within the Navbar Item.';

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar item',
  type: 'object',
  required: ['text'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    active: {
      type: 'boolean',
      description: 'Automatically mark a Navlink as active',
      default: false,
    },
    text: {
      type: 'any',
      description: 'Renderable text content for the link.',
    },
    url,
    target,
    icon: iconSchema,
  },
};
