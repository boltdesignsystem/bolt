module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Floating Action Buttons UL',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description:
        'Renders a list of buttons. Use the floating-action-buttons-li.twig template to render each list item.',
    },
  },
};
