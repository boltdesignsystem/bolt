module.exports = {
  type: 'object',
  properties: {
    trigger: {
      type: ['string', 'object', 'array'],
      description: 'Trigger content of an item.',
      default: 'Toggle Accordion',
    },
    content: {
      type: ['string', 'object', 'array'],
      description: 'Expandable content of an item.',
    },
    open: {
      type: 'boolean',
      description: 'Automatically expand an item on page load.',
      default: false,
      enum: [true, false],
    },
    inactive: {
      type: 'boolean',
      description:
        'Display item trigger as an inactive element. Item content will be collapsed and the toggle icon hidden.',
      default: false,
    },
    uuid: {
      type: 'string',
      description: 'Unique ID for an item, randomly generated if not provided.',
    },
    open_label: {
      type: 'string',
      description: 'Accessible label for the open trigger to expand an item.',
      default: 'Open Accordion',
    },
    close_label: {
      type: 'string',
      description:
        'Accessible label for the close trigger to collapse an item.',
      default: 'Close Accordion',
    },
    trigger_spacing: {
      type: 'string',
      hidden: true,
      description:
        'Overrides the default trigger spacing (by default, inherited from the parent bolt-accordion)',
      $ref: '#/definitions/spacing',
    },
    content_spacing: {
      type: 'string',
      hidden: true,
      description:
        'Overrides the default content spacing (by default, inherited from the parent bolt-accordion)',
      $ref: '#/definitions/spacing',
    },
  },
  definitions: {
    spacing: {
      enum: ['none', 'xsmall', 'small', 'medium', 'large'],
    },
  },
};
