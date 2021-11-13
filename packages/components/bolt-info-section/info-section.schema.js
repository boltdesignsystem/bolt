module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Info Section',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent container.',
    },
    label: {
      type: 'object',
      description: 'Label of the info section.',
      properties: {
        content: {
          type: 'any',
          description: 'Set the label text.',
        },
        tag: {
          type: 'any',
          description: 'Set the semantic heading level.',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      },
    },
    content: {
      type: 'any',
      description: 'Content of the info section.',
    },
    details_link: {
      type: 'object',
      description: 'Render a link or button that leads to more details.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the details link element.',
        },
        content: {
          type: 'any',
          description: 'Set the details link text.',
        },
      },
    },
    open: {
      type: 'boolean',
      description:
        'Set the info section to open by default. This only applies when the viewport is below the medium breakpoint.',
      default: false,
    },
  },
};
