const elementSchemas = require('@bolt/element/element.schemas');

const {
  url,
  target,
  disabled,
  // @todo convert BoltActionElement props to be snake case
  onClick,
  onClickTarget,
} = elementSchemas.boltActionElement.properties;

disabled.description =
  'Make trigger unusable and un-clickable. Only applies to `button`.';

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Trigger',
  description:
    'Triggers add button or link behavior to any content without the default button or link styles.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: ['string', 'array', 'object'],
      description: 'Main content of the trigger (Twig only).',
    },
    url,
    target,
    type: {
      description: 'Determines the button tag type for semantic buttons',
      type: 'string',
      default: 'button',
      enum: ['button', 'submit', 'reset'],
    },
    cursor: {
      description: 'Type of cursor shown on hover.',
      type: 'string',
      default: 'pointer',
      enum: ['auto', 'pointer', 'zoom-in', 'zoom-out'],
    },
    on_click: onClick,
    on_click_target: onClickTarget,
    display: {
      type: 'string',
      description: 'Set the display property',
      default: 'inline',
      enum: ['inline', 'block'],
    },
    no_outline: {
      type: 'boolean',
      description: 'Turn off the default outline on focus',
      default: false,
    },
    disabled,
  },
};
