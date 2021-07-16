module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '{{ titleCase name }}',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this element.',
    },
    content: {
      type: 'any',
      description: 'Content of the {{ lowerCase name }}.',
    },
  },
};
