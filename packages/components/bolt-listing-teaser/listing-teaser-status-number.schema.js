module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Listing teaser status number',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent container.',
    },
    number: {
      type: 'any',
      description: 'Set the number value.',
    },
    label: {
      type: 'any',
      description: 'Set the label text related to the number value.',
    },
  },
};
