// @todo: WIP

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Link',
  description: 'Text link.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-menu&gt; tag.',
    },
    text: {
      type: 'any',
      description: 'Renders the text content for the link.',
    },
    display: {
      type: 'string',
      description:
        'Display either an inline link or flex link (icons can hang on either side).',
      enum: ['inline', 'flex'],
      default: 'inline',
    },
    valign: {
      type: 'string',
      description: 'Controls the vertical alignment of text and icon.',
      enum: ['center', 'start'],
      default: 'center',
    },
    url: {
      type: 'string',
      description:
        'Contains a URL that the link points to. This may also be passed as part of `attributes`',
    },
    target: {
      type: 'string',
      description:
        'Specifies where to display the linked URL. This may also be passed as part of `attributes`',
    },
    isHeadline: {
      type: 'boolean',
      description:
        'Whether this link should get special headline styling treatment.',
    },
  },
};
