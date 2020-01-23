const triggerSchema = require('@bolt/components-trigger/trigger.schema');
const buttonSchema = require('@bolt/components-button/button.schema');
const linkSchema = require('@bolt/components-link/link.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Tooltip',
  description: 'Floating label that briefly describes an element.',
  type: 'object',
  required: ['trigger', 'content'],
  not: {
    anyOf: [
      {
        required: ['direction'],
      },
      {
        required: ['noWrap'],
      },
      {
        required: ['spacing'],
      },
    ],
  },
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-tooltip&gt; tag.',
    },
    trigger: {
      type: 'any',
      description: 'Renders the trigger of the tooltip.',
    },
    content: {
      type: 'any',
      description:
        'Renders the content of the tooltip. Plain text is preferred because this is supposed to be a simple label. For passing more complex content and actions, please use Popover instead.',
    },
    placement: {
      type: 'string',
      description:
        'Sets the preferred placement of the tooltip. The actual placement of the tooltip will be automatically adjusted based on the space available on screen.',
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
    uuid: {
      type: 'string',
      description:
        'Unique ID for the tooltip, randomly generated if not provided.',
    },
    boundary: {
      type: 'string',
      description: 'Optionally allows you to specify a parent element selector to use as an outer boundary when calculating placement.',
    },
    direction: {
      type: 'any',
      title: 'DEPRECATED',
      description: 'This prop is deprecated. Please use placement instead.',
    },
    noWrap: {
      type: 'any',
      title: 'DEPRECATED',
      description: 'This prop is deprecated. Please stop using it.',
    },
    spacing: {
      type: 'any',
      title: 'DEPRECATED',
      description: 'This prop is deprecated. Please stop using it.',
    },
  },
};
