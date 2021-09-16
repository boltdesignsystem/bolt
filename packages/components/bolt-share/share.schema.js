module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Share',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['inline'],
      },
      {
        required: ['copyToClipboard'],
      },
    ],
  },
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    text: {
      type: 'any',
      default: 'Share this page',
      description: 'Defines the label text in front of the social icons.',
    },
    size: {
      type: 'string',
      default: 'medium',
      description: 'Controls the size of icons and spacing.',
      enum: ['small', 'medium'],
    },
    align: {
      type: 'string',
      default: 'start',
      description: 'Controls the horizontal alignment of label text and icons.',
      enum: ['start', 'center', 'end'],
    },
    opacity: {
      type: 'integer',
      default: 100,
      description: 'Controls the overall transparency of the share tool.',
      enum: [100, 80, 60, 40, 20],
    },
    sources: {
      type: 'array',
      description: 'Social media sources to share to.',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the social media source.',
            enum: ['facebook', 'twitter', 'linkedin', 'email'],
          },
          attributes: {
            type: 'object',
            description:
              'A Drupal-style attributes object with extra attributes to append to this component.',
          },
          url: {
            title: 'DEPRECATED',
            description:
              'Please pass the href value through the source attributes object.',
          },
        },
      },
    },
    display: {
      type: 'string',
      default: 'inline',
      description: 'Controls the display of the share options.',
      enum: ['inline', 'menu'],
    },
    copy_to_clipboard: {
      type: 'object',
      ref: 'copy-to-clipboard',
    },
    inline: {
      title: 'DEPRECATED',
      description:
        'Button version has been removed so this prop is no longer needed.',
    },
    copyToClipboard: {
      title: 'DEPRECATED',
      description: 'Please use copy_to_clipboard.',
    },
  },
};
