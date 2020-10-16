const elementSchemas = require('@bolt/element/element.schemas');

const { ...onClickProps } = elementSchemas.boltActionElement.properties;

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Text Link',
  description: 'An underlined text link.',
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
      type: 'any',
      description: 'Render an icon before the text.',
    },
    icon_after: {
      type: 'any',
      description: 'Render an icon after the text.',
    },
    reversed_underline: {
      type: 'boolean',
      description:
        'Reversed underline sets the underline to appear on hover instead of regular state.',
      default: 'false',
    },
  },
};
