// const triggerSchema = require('@bolt/components-trigger/trigger.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Popover',
  description:
    'A small overlay that opens on demand.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-menu&gt; tag.',
    },
    trigger: {
      type: 'any',
      description: 'Renders the trigger of the popover.',
    },
    content: {
      type: 'any',
      description: 'Renders the content of the popover.',
    },
    placement: {
      type: 'string',
      description: 'Sets the preferred placement of the popover. The actual placement of the popover will be automatically adjusted based on the space available on screen.',
      enum: ['auto', 'top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right'],
      default: 'bottom-left',
    },
    spacing: {
      type: 'string',
      description: 'Controls the spacing around the popover content.',
      enum: ['none', 'xsmall', 'small', 'medium'],
      default: 'small',
    },
    nowrap: {
      type: 'boolean',
      description: 'Prevents the text in the content of the popover to wrap to a second line.',
    },
  },
};
