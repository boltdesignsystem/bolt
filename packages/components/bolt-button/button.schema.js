const iconSchema = require('@bolt/components-icon/icon.schema.json');
const elementSchemas = require('@bolt/element/element.schemas');

iconSchema.properties = {
  position: {
    description: 'Where to position the icon within the button',
    type: 'string',
    default: 'after',
    enum: ['before', 'after'],
  },
  ...iconSchema.properties,
};

iconSchema.description =
  'Icon data as expected by the icon component. Accepts an additional position prop that determines placement within the button.';

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Button',
  description: 'Buttons are the core of our action components.',
  type: 'object',
  required: ['text'],
  not: {
    anyOf: [
      {
        required: ['itemAlignment'],
      },
      {
        required: ['tag'],
      },
      {
        required: ['style'],
      },
      {
        required: ['rounded'],
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
      description: 'Text inside the button.',
      type: 'string',
    },
    transform: {
      type: 'string',
      description: 'Transforms the button text to various cases.',
      default: 'none',
      enum: ['uppercase', 'lowercase', 'capitalize', 'none'],
    },
    type: {
      description: 'Determines the button tag type for semantic buttons',
      type: 'string',
      enum: ['button', 'submit', 'reset'],
    },
    size: {
      type: 'string',
      description: 'Size of the button.',
      default: 'medium',
      enum: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    hierarchy: {
      type: 'string',
      description: 'Style of the button determined by information hierarchy.',
      default: 'primary',
      enum: ['primary', 'secondary', 'tertiary', 'text'],
    },
    width: {
      type: 'string',
      description: 'Controls the width of the button.',
      default: 'auto',
      enum: ['auto', 'full', 'full@small'],
    },
    border_radius: {
      type: 'string',
      description: 'Rounds the corners of the button.',
      default: 'regular',
      enum: ['regular', 'full'],
    },
    align: {
      description:
        'Horizontal alignment of items (text and icon) inside the button. Note: the values left and right are deprecated, use start and end instead.',
      type: 'string',
      default: 'center',
      enum: ['start', 'center', 'end'],
    },
    icon: iconSchema,
    iconOnly: {
      type: 'boolean',
      description:
        'Make the button to display only the icon and hide the text (which is still required). You are required to pass both text and icon data for this option to work.',
      default: false,
      required: ['icon'],
    },
    ...elementSchemas.boltActionElement.properties,
    itemAlignment: {
      title: 'DEPRECATED',
      description: 'Use the align parameter instead.',
    },
    rounded: {
      title: 'DEPRECATED',
      description: 'Use the border_radius parameter instead.',
    },
    tag: {
      title: 'DEPRECATED',
      description: 'Switch to using the new type prop instead.',
      type: 'string',
      enum: ['a', 'link', 'button', 'submit', 'reset'],
      default: 'button',
    },
    style: {
      title: 'DEPRECATED',
      type: 'string',
      description: 'Switch to using the new hierarchy prop instead.',
      default: 'primary',
      enum: ['primary', 'secondary', 'tertiary', 'text'],
    },
  },
};
