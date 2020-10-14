const elementSchemas = require('@bolt/element/element.schemas');

const { ...onClickProps } = elementSchemas.boltActionElement.properties;

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Link',
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
      description:
        'Renderable content (i.e. a string, render array, or included pattern) for the link.',
    },
  },
};
