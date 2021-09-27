module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Text Link',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: 'any',
      description: 'Content of the text link.',
    },
    icon_before: {
      type: 'any',
      description:
        'Append an icon before the text. Icon element is recommended. However, &lt;img&gt; elements are also acceptable.',
    },
    icon_after: {
      type: 'any',
      description:
        'Append an icon after the text. Icon element is recommended. However, &lt;img&gt; elements are also acceptable.',
    },
    reversed_underline: {
      type: 'boolean',
      description:
        'Set the underline style to appear on hover instead of being always visible.',
      default: false,
    },
    expand_click_target: {
      type: 'boolean',
      description:
        'Expand the click target to cover up the entire area of its closest container that is not positioned static.',
      default: false,
    },
  },
};
