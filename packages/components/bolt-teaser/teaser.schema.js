const headlineSchema = require('@bolt/components-headline/headline.schema.js');
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
    image_trigger: {
      type: 'object',
      description: '',
    },
    text_trigger: {
      type: 'object',
      description: '',
    },
    modal: {
      type: 'object',
      description: '',
    },
    chip_list: chipListSchema,
  },
};
