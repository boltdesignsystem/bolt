module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Hero',
  description: 'Prominently display content and imagery within a Band',
  type: 'object',
  properties: {
    content: {
      type: ['string', 'array', 'object'],
      description: 'The content to display in the Hero',
    },
    theme: {
      type: 'string',
      description: 'Color theme to use within the Hero.',
      default: 'none',
      enum: ['xlight', 'light', 'dark', 'xdark', 'none'],
    },
    background: {
      type: 'string',
      description:
        'The path to a background image that displays underneath the content / foreground image in the Hero.',
    },
    image: {
      type: 'string',
      description:
        'The path to a foreground image that  displays along-side the other Hero content.',
    },
    imageAlign: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      description: "Adjusts the Hero Image's horizontal alignment",
      default: 'center',
    },
    imageValign: {
      type: 'string',
      description: "Adjusts the Hero Image's vertical alignment",
      default: 'middle',
      enum: ['top', 'middle', 'bottom'],
    },
    imageMinWidth: {
      description: 'Customizes the min width of the Hero Image',
      default: 'none',
      type: 'string',
    },
    imageMaxWidth: {
      description: 'Customizes the maximum width of the Hero Image',
      default: '450px',
      type: 'string',
    },
    reverseOrder: {
      type: 'boolean',
      description:
        'Reverses the order on larger screens (desktop) so the image comes first (left column) and the content comes second (right column).',
      default: false,
    },
  },
};
