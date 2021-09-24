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
      description:
        'Content of the nav list. Use page-footer-nav-li.twig to render each link.',
    },
    category: {
      type: 'string',
      description:
        'Set the category for the nav list. Only needed for social links, language links, and legal links.',
      enum: ['social', 'language', 'legal'],
    },
    headline: {
      type: 'object',
      description:
        'Headline of the nav list. This must be set for each nav list.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
        },
        content: {
          type: 'any',
          description: 'Set the headline for the nav list.',
        },
        tag: {
          type: 'string',
          description: 'Set the semantic HTML tag for the headline.',
          default: 'h3',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      },
    },
  },
};
