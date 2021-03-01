const imageSchema = require('@bolt/components-image/image.schema.js');
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
    image: imageSchema,
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
    type: {
      type: 'string',
      enum: ['pdf', 'video', 'article'],
    },
    chip_list: chipListSchema,
  },
};
