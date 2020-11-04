module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Text',
  type: 'object',
  required: ['text'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    text: {
      type: 'string',
      description: 'Text content of the headline.',
    },
    tag: {
      type: 'string',
      description: 'HTML semantic tags.',
      default: 'p',
      enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span'],
    },
    display: {
      type: 'string',
      description: 'Inline text or a block of text.',
      default: 'block',
      enum: ['inline', 'block'],
    },
    color: {
      type: 'string',
      description: 'Text color in context of theme colors.',
      default: 'theme-body',
      enum: ['theme-headline', 'theme-body'],
    },
    align: {
      description: 'Text alignment.',
      type: 'string',
      default: 'inherit',
      enum: ['inherit', 'start', 'center', 'end'],
    },
    opacity: {
      type: 'number',
      description: 'Opacity level.',
      default: 100,
      enum: [100, 80, 60, 40, 20],
    },
    quoted: {
      type: 'boolean',
      description: 'Quoted text.',
      default: false,
      enum: [true, false],
    },
    'line-height': {
      type: 'string',
      description: 'Line height in context of the typographic design.',
      default: 'regular',
      enum: ['tight', 'regular', 'loose'],
    },
    'letter-spacing': {
      type: 'string',
      description: 'Letter spacing in context of the typographic design.',
      default: 'regular',
      enum: ['narrow', 'regular', 'wide'],
    },
    'text-transform': {
      type: 'string',
      description:
        'Transform controls the type case. Please note that capitalize would capitalize the first letter of each word, it is not the same as title case.',
      default: 'regular',
      enum: ['regular', 'uppercase', 'lowercase', 'capitalize'],
    },
    'font-family': {
      type: 'string',
      description: 'Font family in context of the typographic design.',
      default: 'body',
      enum: ['headline', 'body', 'code'],
    },
    'font-size': {
      type: 'string',
      description: 'Font size in context of the typographic design.',
      default: 'medium',
      enum: [
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        'xxxlarge',
      ],
    },
    'font-weight': {
      type: 'string',
      description: 'Font weight in context of the typographic design.',
      default: 'regular',
      enum: ['regular', 'semibold', 'bold'],
    },
    'font-style': {
      type: 'string',
      description: 'Emphasized text.',
      default: 'regular',
      enum: ['regular', 'italic'],
    },
    headline: {
      type: 'boolean',
      description:
        'A preset for headlines in context of the typographic design.',
      default: false,
      enum: [true, false],
    },
    subheadline: {
      type: 'boolean',
      description:
        'A preset for subheadlines in context of the typographic design.',
      default: false,
      enum: [true, false],
    },
    eyebrow: {
      type: 'boolean',
      description: 'A preset for eyebrow in context of the typographic design.',
      default: false,
      enum: [true, false],
    },
    url: {
      type: 'string',
      description: 'If provided, turns headline into a link to given url.',
    },
    util: {
      type: 'array',
      description:
        'Each item in the array will build a utility class. No need to include `u-bolt-`. **For the web component** use comma separated string.',
    },
  },
};
