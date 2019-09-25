module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Interactive Pathways',
  type: 'object',
  properties: {
    theme: {
      type: 'string',
      description: 'Sets the color theme used by an interactive pathway',
      default: '',
      enum: ['xlight', 'light', 'dark', 'xdark'],
    },
    customImageSrc: {
      type: 'string',
      description:
        'URL source for the image at the top of the pathway. Fallback is the two diamond logo.',
      default: '',
    },
    imageAlt: {
      type: 'string',
      description: 'Alt attribute for the image at the top of the pathway',
      default: 'Pega logo',
    },
  },
};
