module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Type',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this element.',
    },
    content: {
      type: 'string',
      description: 'Content of the type element.',
    },
    tag: {
      type: 'string',
      description:
        'Set the semantic tag for the type element. Use <code>span</code> for inline text; use <code>p</code>, <code>h1</code>, <code>h2</code>, <code>h3</code>, <code>h4</code>, <code>h5</code>, <code>h6</code>, or <code>div</code> for block text. There is no restrictions with this prop, developers must understand semantic HTML to apply the appropriate tag based on the use case.',
      default: 'p',
    },
    size: {
      type: 'string',
      description:
        'Control the font-size. If size is not defined or set to auto, font-size inherits from parent container.',
      default: 'auto',
      enum: [
        'auto',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        'xxxlarge',
      ],
    },
    hierarchy: {
      type: 'string',
      description:
        'Control the hierarch of text. Each option comes with specific typographic styles.',
      default: 'body',
      enum: ['body', 'headline', 'subheadline', 'eyebrow'],
    },
  },
};
