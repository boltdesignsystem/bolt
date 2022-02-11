module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Floating Action Buttons',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-floating-action-buttons&gt; tag.',
    },
    content: {
      type: 'any',
      description:
        'The main content. Typically, this will be a number of icon-only buttons.',
    },
    position: {
      type: 'string',
      description: 'The desired location of the floating element.',
      enum: ['bottom-right', 'middle-right', 'top-right'],
      default: 'bottom-right',
    },
    show_on_load: {
      type: 'boolean',
      description:
        'Please leave this set to true unless you plan on adding javascript to show the element yourself.',
      default: true,
    },
    show_on_scroll: {
      type: 'string',
      description:
        'This will leave the element hidden until the page is scrolled to a certain position. A percentage or px value must be passed here as a string. ie. "200px" or "20%".',
    },
  },
};
