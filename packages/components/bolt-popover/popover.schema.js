const triggerSchema = require('@bolt/components-trigger/trigger.schema');
const buttonSchema = require('@bolt/components-button/button.schema');
const linkSchema = require('@bolt/components-link/link.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Popover',
  description: 'A small overlay that opens on demand.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-popover&gt; tag.',
    },
    trigger: {
      type: 'object',
      description: 'Renders the trigger of the popover.',
    },
    content: {
      type: 'any',
      description: 'Renders the content of the popover.',
    },
    placement: {
      type: 'string',
      description:
        'Sets the preferred placement of the popover. The actual placement of the popover will be automatically adjusted based on the space available on screen.',
      enum: [
        'auto',
        'top-start',
        'top',
        'top-end',
        'left-start',
        'left',
        'left-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
      ],
      default: 'bottom',
    },
    spacing: {
      type: 'string',
      description: 'Controls the spacing around the popover content.',
      enum: ['none', 'xsmall', 'small', 'medium'],
      default: 'small',
    },
    boundary: {
      type: 'string',
      description:
        "Optionally allows you to specify a parent element's CSS selector to use as an outer boundary when calculating placement.",
    },
    fallbackPlacements: {
      type: 'array',
      description:
        "An array of different placement options that Popper.js should try if there isn't enough space for the ideal placement. Normally this defaults to all placement options however this lets you limit the options to pick from in certain situations.",
    },
    uuid: {
      type: 'string',
      description: 'Unique ID for popover, randomly generated if not provided.',
    },
  },
};
