module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Profile Avatar Edit Button',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent container.',
    },
    content: {
      type: 'any',
      description: 'Set the button text.',
    },
  },
};
