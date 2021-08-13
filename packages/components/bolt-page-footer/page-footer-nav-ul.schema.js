module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Footer Nav ul',
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
      description: 'Content of page footer nav ul. Nav li are expected here.',
    },
    category: {
      type: 'string',
      description: 'Indicate which set of navigation this nav ul is rendering.',
      enum: ['social', 'language', 'legal'],
    },
    headline: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'Title of the Ul Nav',
        },
        tag: {
          type: 'string',
          default: 'h3',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      },
    },
  },
};
