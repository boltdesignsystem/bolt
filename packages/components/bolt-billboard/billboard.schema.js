const layoutSchema = require('@bolt/layouts-layout/layout.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Billboard',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-billboard&gt; tag.',
    },
    content: {
      type: 'any',
      description: 'The main content.',
    },
    template: layoutSchema.properties.template,
    theme: {
      type: 'string',
      description: 'Controls the theme of the Billboard.',
      default: 'light',
    },
    supplement: {
      type: 'any',
      description: 'Additional content, usually an image.',
    },
    supplement_valign: {
      type: 'string',
      description: 'Controle the vertical alignment of the suppplement item.',
      enum: ['start', 'center', 'end', 'start-offset', 'end-offset'],
      default: 'start',
    },
    size: {
      type: 'string',
      description:
        'Set the spacing between layout items and the layout padding.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge'],
      default: 'large',
    },
    background_image: {
      type: 'any',
      description:
        'An object to be used as a background that displays underneath the content / foreground in the Billboard.',
    },
    center_content: {
      type: 'boolean',
      description:
        'Used to center the main content. Must use a single column template for this to work.',
      default: false,
    },
    reverse_order: {
      type: 'boolean',
      description: 'Controle the order of the content and supplement items.',
      default: false,
    },
  },
};
