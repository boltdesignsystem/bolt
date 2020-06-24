module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Teaser',
  category: 'components',
  type: 'object',
  properties: {
    eyebrow: {
      type: 'string',
      ref: 'headline',
    },
    headlines: {
      type: 'array',
      description: 'An array of headline component objects',
      items: {
        type: 'string',
        ref: 'headline',
      },
    },
    logo: {
      type: 'string',
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
        type: 'string',
        ref: 'button',
      },
    },
  },
};
