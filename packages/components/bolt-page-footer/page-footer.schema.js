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
      description: 'Headline of the page footer.',
    },
    description: {
      type: 'any',
      description:
        'Accept any types of value, plain text is the simplest usage.',
    },
    primary_nav: {
      type: 'any',
      description: 'Primary content of page footer (pega links, social links).',
    },
    secondary_nav: {
      type: 'any',
      description:
        'Secondary content of page footer (utilitis links, privacy policy links, etc.).',
    },
  },
};
