const chipListSchema = require('@bolt/components-chip-list/chip-list.schema.js');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Teaser',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-teaser&gt; tag.',
    },
    image: {
      type: 'object',
      description: '',
    },
    headline: {
      type: 'object',
      description: '',
      properties: {
        text: {
          type: 'string',
          description: '',
        },
        link_attributes: {
          type: 'object',
          description: '',
        },
      },
    },
    description: {
      type: 'string',
      description: '',
    },
    premium: {
      type: 'boolean',
      description: '',
    },
    horizontal: {
      type: 'boolean',
      description: '',
    },
    show_description: {
      type: 'boolean',
      default: false,
      description: '',
    },
    type: {
      type: 'string',
      enum: ['pdf', 'video', 'article'],
    },
    chip_list: chipListSchema,
    meta_items: {
      type: 'array',
      description: 'Render an array of meta data for the listing.',
    },
    like_button: {
      type: 'object',
      description: '',
    },
    share_menu: {
      type: 'any',
      description:
        'Render a popover share menu for the listing. Passing the Share component is mandatory.',
    },
  },
};
