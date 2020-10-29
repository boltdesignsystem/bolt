const triggerSchema = require('@bolt/components-trigger/trigger.schema');

/* eslint-disable camelcase */
const {
  display,
  no_outline,
  ...modifiedTriggerProps
} = triggerSchema.properties;

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Menu',
  description:
    'A vertical list of menu items. This component is usually used inside a popover container to provide additional actions.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-menu&gt; tag.',
    },
    items: {
      type: 'array',
      description:
        'Generates an array of items, each item is a &lt;bolt-trigger&gt;. While the content prop for each item can accept anything custom content, plain text is the recommended format.',
      items: {
        type: 'object',
        description:
          'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-menu&gt; tag.',
        properties: {
          ...modifiedTriggerProps,
          icon_before: {
            type: 'object',
            description:
              'Append an icon before the text. Icon component is recommended.',
          },
          icon_after: {
            type: 'object',
            description:
              'Append an icon after the text. Icon component is recommended.',
          },
        },
      },
    },
    title: {
      type: 'string',
      description: 'Controls the inset spacing of each menu item.',
    },
    spacing: {
      type: 'string',
      description: 'Controls the inset spacing of each menu item.',
      enum: ['xsmall', 'small', 'medium'],
      default: 'small',
    },
  },
};
