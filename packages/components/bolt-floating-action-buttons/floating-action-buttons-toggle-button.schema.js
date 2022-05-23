const buttonSchema = require('@bolt/elements-button/button.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Floating Action Buttons Toggle Button',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: buttonSchema.properties.content,
    hierarchy: buttonSchema.properties.hierarchy,
    size: buttonSchema.properties.size,
    border_radius: buttonSchema.properties.border_radius,
  },
};
