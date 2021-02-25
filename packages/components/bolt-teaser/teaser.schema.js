const imageSchema = require('@bolt/components-image/image.schema.js');
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
    image: imageSchema,
    headline: headlineSchema,
    modal_id: {
      type: 'string',
      description: '',
    },
    modal_content: {
      type: 'object',
      description: '',
    },
    url: {
      type: 'string',
      description: '',
    },
    chip_list: chipListSchema,
  },
};
