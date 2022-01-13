module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Satellite',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-satellite&gt; tag.',
    },
    content: {
      type: 'any',
      description:
        'The main content. Typically, this will be a number of icon-only buttons.',
    },
    position: {
      type: 'string',
      description:
        'The desired location of the floating element. The static option is used solely for testing purposes.',
      enum: ['bottom-right', 'middle-right', 'top-right', 'static'],
      default: 'bottom-right',
    },
    stash: {
      type: 'number',
      description:
        'The number of items visisble when a "more" button is needed. It can be set to 0 to turn off the button.',
      enum: [1, 2, 3, 0],
      default: 2,
    },
    showOnLoad: {
      type: 'boolean',
      description:
        'Please leave this set to true unless you plan on adding javascript to show the element yourself.',
      default: true,
    },
    showOnScroll: {
      type: 'string',
      description:
        'This will leave the element hidden until the page is scrolled to a certain position. A percentage or px value must be passed here as a string. ie. "200px" or "20%".',
    },
  },
};
