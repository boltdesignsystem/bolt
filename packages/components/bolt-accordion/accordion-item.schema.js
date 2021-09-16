module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
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
    },
    inactive: {
      type: 'boolean',
      description:
        'Display item trigger as an inactive element. Item content will be collapsed and the toggle icon hidden.',
      default: false,
    },
    id: {
      type: 'string',
      description:
        'Unique identifier for each item, may be used for deep linking.',
    },
    open_label: {
      type: 'any',
      description: 'Accessible label for the open trigger to expand an item.',
      default: 'Open Accordion',
    },
    close_label: {
      type: 'any',
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
    uuid: {
      type: 'string',
      title: 'DEPRECATED',
      description:
        'Internal use only. Unique ID for an item, randomly generated if not provided.',
    },
  },
  definitions: {
    spacing: {
      enum: ['none', 'xsmall', 'small', 'medium', 'large'],
    },
  },
};
