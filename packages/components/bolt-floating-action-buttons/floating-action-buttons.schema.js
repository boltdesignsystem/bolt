module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Floating Action Buttons',
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
        'Renders a list of buttons. Use the floating-action-buttons-ul.twig template to render a list.',
    },
    hide_on_load: {
      type: 'boolean',
      description:
        'Do not use this prop unless you plan on adding JavaScript to show the FAB based on custom logics. This prop toggles the <code>.c-bolt-floating-action-buttons--hidden</code> modifier class.',
      default: false,
    },
    show_on_scroll_position: {
      type: 'string',
      description:
        'This will leave the FAB hidden until the page is scrolled to a certain position. A percentage or pixel value must be passed here as a string (ie. "20%" or "200px").',
    },
  },
};
