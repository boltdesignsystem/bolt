module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Button',
  description: 'A graphical element that indicates interactivity.',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: 'object',
      description: 'Content of the button.',
    },
    icon_before: {
      type: 'object',
      description:
        'Append an icon before the button content. Icon component is recommended, however, &lt;img&gt; elements are also acceptable.',
    },
    icon_after: {
      type: 'object',
      description:
        'Append an icon after the button content. Icon component is recommended, however, &lt;img&gt; elements are also acceptable.',
    },
    link: {
      type: 'boolean',
      description: 'Set the semantic HTML tag to &lt;a&gt;.',
      default: false,
    },
  },
};
