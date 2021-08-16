module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page footer',
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
      description: 'Primary content of page footer.',
    },
    description: {
      type: 'any',
      description: 'Description.',
    },
    primary_nav: {
      type: 'any',
      description:
        'Primary content of page footer (main nav with internal Pega.com links).',
    },
    secondary_nav: {
      type: 'any',
      description:
        'Secondary content of page footer (utilitis, privacy policy, etc.).',
    },
  },
};
