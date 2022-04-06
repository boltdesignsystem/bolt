module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Notifications Header Action',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outermost container.',
    },
    icon: {
      type: 'any',
      description:
        'Render an icon for the action. Icon element set to medium size is expected here.',
    },
    label: {
      type: 'any',
      description: 'Render a text label for the action.',
    },
  },
};
