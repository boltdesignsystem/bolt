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
  required: ['link'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    link: {
      type: 'object',
      description:
        'Link of the navbar item. Pass a hash to the "href" attribute to link to an in-page section.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
        },
        content: {
          type: 'any',
          description: 'Content of the link.',
        },
        icon: iconSchema,
      },
    },
    current: {
      type: 'boolean',
      description: 'Automatically mark a Navlink as current',
      default: false,
    },
  },
};
