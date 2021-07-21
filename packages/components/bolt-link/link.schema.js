const iconSchema = require('@bolt/components-icon/icon.schema.json');
const elementSchemas = require('@bolt/element/element.schemas');

iconSchema.properties = {
  position: {
    description: 'Where to position the icon within the link.',
    type: 'string',
    default: 'after',
    enum: ['before', 'after'],
  },
  ...iconSchema.properties,
};

iconSchema.description =
  'Icon data as expected by the icon component. Accepts an additional position prop that determines placement within the link.';

// @TODO Move the 'disabled' prop out of BoltActionElement and into button instead. For now, simply omit it here.
const {
  url,
  target,
  disabled,
  ...onClickProps
} = elementSchemas.boltActionElement.properties;

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Link',
  description: 'Text link.',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['href'],
      },
      {
        required: ['isHeadline'],
      },
      {
        required: ['onClick'],
      },
      {
        required: ['onClickTarget'],
      },
    ],
  },
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    text: {
      type: ['string', 'object', 'array'],
      description:
        'Renderable content (i.e. a string, render array, or included pattern) for the link.',
    },
    url,
    target,
    type: {
      description: 'Determines the button tag type for semantic buttons',
      type: 'string',
      default: 'button',
      enum: ['button', 'submit', 'reset'],
    },
    display: {
      type: 'string',
      description:
        'Display either an inline link or flex link (icons can hang on either side).',
      enum: ['inline', 'flex', 'block'],
      default: 'inline',
    },
    valign: {
      type: 'string',
      description: 'Controls the vertical alignment of text and icon.',
      enum: ['center', 'start'],
      default: 'center',
    },
    is_headline: {
      type: 'boolean',
      description:
        'Whether this link should get special headline styling treatment.',
    },
    icon: iconSchema,
    ...onClickProps,
    href: {
      title: 'DEPRECATED',
      description: 'Use url instead.',
    },
    isHeadline: {
      title: 'DEPRECATED',
      description: 'Use is_headline instead.',
    },
  },
};
