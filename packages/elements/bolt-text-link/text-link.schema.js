const elementSchemas = require('@bolt/element/element.schemas');

const { ...onClickProps } = elementSchemas.boltActionElement.properties;

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Text Link',
  description: 'An underlined text link.',
  type: 'object',
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
    icon_position: {
      type: 'string',
      description:
        "When passing icon as part of the content, use this prop to properly indicate the icon's position.",
      enum: ['before', 'after', 'before-and-after'],
    },
  },
};
