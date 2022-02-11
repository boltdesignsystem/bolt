module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Button',
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
      description: 'Content of the button.',
    },
    icon_before: {
      type: 'any',
      description:
        'Append an icon before the button content. Icon element is recommended. However, &lt;img&gt; elements are also acceptable.',
    },
    icon_after: {
      type: 'any',
      description:
        'Append an icon after the button content. Icon element is recommended. However, &lt;img&gt; elements are also acceptable.',
    },
    icon_only: {
      type: 'any',
      description:
        'Append an icon to the button content and visually hide the text content. This prop trumps icon_before and icon_after.',
    },
    icon_only_tooltip: {
      type: 'string',
      description:
        'A simple CSS tooltip to be used in tandem with the icon_only prop. The text will be taken from the content prop.',
      enum: ['none', 'left', 'center', 'right'],
      default: 'none',
    },
    hierarchy: {
      type: 'string',
      description:
        'Style the button appropriately based on information hierarchy.',
      default: 'primary',
      enum: ['primary', 'secondary', 'tertiary', 'transparent'],
    },
    size: {
      type: 'string',
      description: 'Control the font-size and padding of the button.',
      default: 'medium',
      enum: ['xsmall', 'small', 'medium', 'large'],
    },
    border_radius: {
      type: 'string',
      description: 'Control the border radius of the button.',
      default: 'small',
      enum: ['small', 'large', 'full'],
    },
    display: {
      type: 'string',
      description: 'Control the display of the button.',
      default: 'inline',
      enum: ['inline', 'block', 'inline@from-small'],
    },
  },
};
