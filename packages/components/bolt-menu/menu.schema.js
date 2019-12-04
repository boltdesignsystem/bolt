module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Menu',
  description: 'A vertical list of menu items. This component is usually used inside a popover container to provide additional actions.',
  type: 'object',
  // required: ['items'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-menu&gt; tag.',
    },
    items: {
      type: 'array',
      description: 'Generates an array of items, each item is a &lt;bolt-trigger&gt;. While the content prop for each item can accept anything custom content, plain text is the recommended format.',
      // properties: {
      //   url: {
      //     type: 'string',
      //   }
      // },
    },
    title: {
      type: 'string',
      description: 'Controls the inset spacing of each menu item.',
    },
    spacing: {
      type: 'string',
      description: 'Controls the inset spacing of each menu item.',
      enum: ['xsmall', 'small', 'medium'],
    },
  },
};
