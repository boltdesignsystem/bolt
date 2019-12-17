module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Tooltip',
  description: 'Floating label that briefly describes an element.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-menu&gt; tag.',
    },
    trigger: {
      type: 'any',
      description: 'Renders the trigger of the tooltip.',
    },
    content: {
      type: 'any',
      description: 'Renders the content of the tooltip.',
    },
    placement: {
      type: 'string',
      description:
        'Sets the preferred placement of the tooltip. The actual placement of the tooltip will be automatically adjusted based on the space available on screen.',
      enum: [
        'auto',
        'top-left',
        'top',
        'top-right',
        'left-top',
        'left',
        'left-bottom',
        'right-top',
        'right',
        'right-bottom',
        'bottom-left',
        'bottom',
        'bottom-right',
      ],
      default: 'bottom-left',
    },
    spacing: {
      type: 'string',
      description: 'Controls the inset spacing of the tooltip content.',
      enum: ['none', 'xsmall', 'small', 'medium'],
      default: 'xsmall',
    },
    wrap: {
      type: 'boolean',
      description:
        'Allows the text in the content of the tooltip to wrap to a second line.',
      default: false,
    },
    uuid: {
      type: 'string',
      description: 'Unique ID for tooltip, randomly generated if not provided.',
    },
  },
};
