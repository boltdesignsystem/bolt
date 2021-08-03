module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Holy Grail Sidebar',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description: 'Render content of the primary sidebar.',
    },
    trigger_icon: {
      type: 'string',
      description:
        'Set the icon of the trigger button that is shown in smaller viewports.',
    },
    trigger_label: {
      type: 'string',
      description:
        'Set the text of the trigger button that is shown in smaller viewports.',
    },
  },
};
