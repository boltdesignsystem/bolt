module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Figure',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    media: {
      type: 'object',
      description:
        'Pass in any renderable media content via the `media.content` prop.',
      not: {
        anyOf: [
          {
            required: ['image'],
          },
          {
            required: ['icon'],
          },
          {
            required: ['video'],
          },
          {
            required: ['table'],
          },
        ],
      },
      properties: {
        content: {
          type: 'any',
          description: 'Figure media content, e.g image, icon, video, etc.',
        },
      },
    },
    caption: {
      type: ['string', 'object', 'array'],
      description: 'Caption for the figure.',
    },
  },
};
