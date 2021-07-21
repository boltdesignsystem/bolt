module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Holy Grail Layout',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description: 'The main content area of the layout.',
    },
    sidebar: {
      type: 'object',
      description: 'The primary sidebar of the layout.',
      properties: {
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
        auto_width: {
          type: 'boolean',
          description:
            'Allow the sidebar to have no defined width, the content inside will dictate the width.',
        },
      },
    },
    secondary_sidebar: {
      type: 'object',
      description: 'The secondary sidebar of the layout.',
      properties: {
        content: {
          type: 'any',
          description: 'Render content of the secondary sidebar.',
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
        auto_width: {
          type: 'boolean',
          description:
            'Allow the sidebar to have no defined width, the content inside will dictate the width.',
        },
      },
    },
    gutter: {
      type: 'string',
      description: 'Set the horizontal spacing in between desktop columns.',
      enum: ['none', 'small', 'medium', 'large'],
      default: 'large',
    },
    padding_top: {
      type: 'string',
      description: 'Set the top padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge'],
      default: 'none',
    },
    padding_bottom: {
      type: 'string',
      description: 'Set the bottom padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge'],
      default: 'none',
    },
    full_bleed: {
      type: 'boolean',
      description:
        'Force the layout to be full bleed (span edge to edge of browser width).',
    },
  },
};
