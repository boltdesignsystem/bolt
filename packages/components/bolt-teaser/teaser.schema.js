const chipListSchema = require('@bolt/components-chip-list/chip-list.schema.js');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Teaser',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-teaser&gt; tag.',
    },
    layout: {
      type: 'string',
      description: '',
      enum: ['vertical', 'horizontal', 'responsive'],
      default: 'vertical',
    },
    image: {
      type: 'object',
      description: 'The image to fill the thumbnail, accepts rendered images.',
    },
    premium: {
      type: 'boolean',
      description:
        'If set to true, shows a premium tag in the upper left corner of the thumbnail',
      default: false,
    },
    type: {
      type: 'string',
      description:
        'Will add an icon to the bottom left corner of the thumbnail to denote teaser type.',
      enum: ['pdf', 'video', 'article'],
    },
    eyebrow_text: {
      type: 'string',
      description: 'Used to put an eyebrow above the headline.',
    },
    headline: {
      type: 'object',
      description:
        'Used to set the headline text, size, and the link for the entire teaser.',
      properties: {
        text: {
          type: 'string',
          description: '',
        },
        size: {
          type: 'string',
          description: 'Set the size of the headline.',
          default: 'large',
          enum: ['large', 'xlarge'],
        },
        link_attributes: {
          type: 'object',
          description: '',
        },
      },
    },
    meta_items: {
      type: 'array',
      description: 'Render an array of meta data for the listing.',
    },
    like_button: {
      type: 'object',
      description: 'Pass a rendered button to display.',
    },
    share_menu: {
      type: 'any',
      description:
        'Render a popover share menu for the listing. Passing the Share component is mandatory.',
    },
    description: {
      type: 'string',
      description:
        'A breif description of the intended link. Trimmed to 100 characters when displayed inside the thumbnail.',
    },
    show_description: {
      type: 'boolean',
      default: false,
      description:
        'If set to true, will move the description out of the thumbnail area.',
    },
    chip_list: chipListSchema,
  },
};
