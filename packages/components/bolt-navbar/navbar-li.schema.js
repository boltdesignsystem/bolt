const iconSchema = require('@bolt/elements-icon/icon.schema.json');

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
  'Icon data as expected by the icon element. Accepts an additional position prop that determines placement within the Navbar Item.';

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar li',
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
      description: 'Automatically mark a navbar link as current',
    },
  },
};
