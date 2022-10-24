module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Dialog',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: 'any',
      description:
        'Renders the dialog content. The dialog-header.twig, dialog-body.twig, and dialog-footer.twig components are expected here.',
    },
    width: {
      type: 'string',
      description: 'Controls the width of the dialog.',
      enum: ['full', 'regular', 'optimal', 'auto'],
      default: 'optimal',
    },
    spacing: {
      type: 'string',
      description:
        'Controls the inset spacing of the dialog header, body, and footer.',
      enum: ['none', 'small', 'medium', 'large'],
      default: 'medium',
    },
    persistent: {
      type: 'boolean',
      description:
        'Enables the dialog to be persistent. This will eliminate ways to close the dialog and it is up to the author to provide a custom link to close the dialog or redirect to another page within the dialog content.',
      default: false,
    },
    transparent: {
      type: 'boolean',
      description:
        'Renders a transparent background for the dialog. Only use this when building an image or video only modal without any text. Do not pass header and footer as text will not be legible with a transparent background.',
      default: false,
    },
  },
};
