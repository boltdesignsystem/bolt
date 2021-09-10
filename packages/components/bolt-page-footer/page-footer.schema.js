module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Footer',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    description: {
      type: 'any',
      description:
        'Accept any types of value, plain text is the simplest usage.',
    },
    primary_nav: {
      type: 'any',
      description:
        'Render the primary navigation. Use page-footer-nav-ul.twig to render each set of navigation list.',
    },
    secondary_nav: {
      type: 'any',
      description:
        'Render the secondary navigation. Use page-footer-nav-ul.twig to render each set of navigation list.',
    },
  },
};
