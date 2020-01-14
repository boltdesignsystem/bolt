const triggerSchema = require('@bolt/components-trigger/trigger.schema');
const buttonSchema = require('@bolt/components-button/button.schema');
const linkSchema = require('@bolt/components-link/link.schema');

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
      description: 'Renders the trigger of the tooltip as custom content.',
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
      default: 'auto',
    },
    uuid: {
      type: 'string',
      description:
        'Unique ID for the tooltip, randomly generated if not provided.',
    },
  },
};
