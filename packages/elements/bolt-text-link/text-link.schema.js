const elementSchemas = require('@bolt/element/element.schemas');

const { ...onClickProps } = elementSchemas.boltActionElement.properties;

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Text Link',
  description: 'Underlined text that indicates interactivity.',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: ['string', 'object', 'array'],
      description: 'Content of the text link.',
    },
    display: {
      type: 'string',
      description:
        'Display either an inline text link or block text link (takes up full width of its parent container).',
      enum: ['inline', 'block'],
      default: 'inline',
    },
    icon_before: {
      type: 'object',
      description:
        'Render an icon before the text. Icon component is recommended.',
    },
    icon_after: {
      type: 'object',
      description:
        'Render an icon after the text. Icon component is recommended.',
    },
    reversed_underline: {
      type: 'boolean',
      description:
        'Set the underline style to appear on hover instead of regular state.',
      default: 'false',
    },
    button: {
      type: 'boolean',
      description: 'Set the semantic HTML tag to <button>.',
      default: 'false',
    },
  },
};
