module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Dialog',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-dialog&gt; tag.',
    },
    content: {
      type: 'any',
      description:
        'The dialog-header, dialog-body, and dialog-footer components.',
    },
    width: {
      type: 'string',
      description: 'Controls the width of the dialog.',
      enum: ['full', 'regular', 'optimal', 'auto'],
      default: 'optimal',
    },
    spacing: {
      type: 'string',
      description: 'Controls the spacing around the dialog.',
      enum: ['none', 'small', 'medium', 'large'],
      default: 'medium',
    },
    persistent: {
      type: 'boolean',
      description:
        'Enables the dialog to be persistent. This will eliminate ways to close the dialog and it is up to the author to provide a custom link to close the dialog or redirect to another page within the dialog content.',
      default: false,
    },
    theme: {
      type: 'string',
      description: 'Controls the color theme of the dialog.',
      enum: ['xlight', 'light', 'dark', 'xdark'],
      default: 'xlight',
    },
  },
};
