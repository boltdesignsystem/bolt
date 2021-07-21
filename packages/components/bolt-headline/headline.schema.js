const elementSchemas = require('@bolt/element/element.schemas');
const { url, target } = elementSchemas.boltActionElement.properties;

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Headline',
  type: 'object',
  required: ['text'],
  properties: {
    text: {
      type: ['string', 'object', 'array'],
      description: 'Renderable text content of the headline.',
    },
    tag: {
      type: 'string',
      description: 'Set the semantic HTML tag for the headline.',
      default: 'p',
      enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'cite', 'div'],
    },
    align: {
      description: 'Set the text alignment of the headline.',
      type: 'string',
      enum: ['left', 'center', 'right'],
    },
    weight: {
      type: 'string',
      description: 'Set the weight of the headline.',
      default: 'regular',
      enum: ['light', 'bold', 'regular', 'semibold'],
    },
    style: {
      type: 'string',
      description: 'Set the style fo the headline.',
      default: 'normal',
      enum: ['normal', 'italic'],
    },
    size: {
      type: 'string',
      description: 'Set the size of the headline.',
      default: 'medium',
      enum: [
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
    autoshrink: {
      type: 'boolean',
      description:
        'Automatically shrink the font size used in the `xxxlarge` headline size when 60 or more characters are used.',
      default: true,
    },
    target,
    transform: {
      type: 'string',
      description: 'Text transformation.',
      enum: ['uppercase', 'lowercase', 'capitalize'],
    },
    url,
    icon: {
      description:
        "Bolt icon. Accepts either 1) an icon name as a string 2) an icon object as expected by `@bolt-components-icon` or 3) the string 'none' to explicitly remove default icons",
      anyOf: [
        {
          type: 'object',
          ref: '@bolt-components-icon/icon.schema.json',
        },
        {
          type: 'string',
          enum: ['none'],
        },
        {
          type: 'string',
          ref: '@bolt-components-icon/icon.schema.json#/properties/name',
        },
      ],
    },
    quoted: {
      type: 'boolean',
      description: 'Adds quoted styling to text.',
    },
    numberText: {
      description:
        'Text that displays in a small circle to the left of the main Headline text. Providing content will trigger the bullet to appear.',
      type: ['string', 'number'],
    },
    numberColor: {
      description:
        'The optional background color of the Headline bullet. Uses inherited theme colors if unspecified.',
      type: 'string',
      enum: ['teal', 'indigo', 'orange', 'purple'],
    },
  },
};
