module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Teaser',
  category: 'components',
  type: 'object',
  properties: {
    eyebrow: {
      type: 'object',
      description: 'Eyebrow text component',
      ref: 'headline',
    },
    headlines: {
      type: 'array',
      description: 'An array of headline component objects',
      items: {
        type: 'object',
        description: 'Headline text components',
        ref: 'headline',
      },
    },
    logo: {
      type: 'object',
      description: 'Bolt logo component',
      ref: 'logo',
    },
    content: {
      type: 'string',
      description: 'Body text of teaser',
    },
    contentItems: {
      type: 'array',
      description: 'Array of content item objects',
      items: {
        type: 'object',
      },
    },
    buttons: {
      type: 'array',
      description: 'An array of button component objects',
      items: {
        type: 'object',
        description: 'A button',
        ref: 'button',
      },
    },
  },
};
