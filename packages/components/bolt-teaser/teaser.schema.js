const headlineSchema = require('@bolt/components-headline/headline.schema');
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
    gutter: {
      type: 'string',
      description:
        'Set the spacing in between columns for horizontal and responsive layouts.',
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    type: {
      type: 'string',
      description:
        'Set the type of teaser. A play button will display with the video teaser signifier.',
      enum: ['pdf', 'video', 'article'],
    },
    signifier: {
      type: 'object',
      description:
        'Set the signifier for the teaser. It accepts plain <img> element, image component and icon component.',
    },
    eyebrow_text: {
      type: 'string',
      description: 'Set the helper info above the headline.',
    },
    headline: {
      type: 'object',
      description:
        'Set the headline text, size, and the block link that covers the entire teaser.',
      properties: {
        text: headlineSchema.properties.text,
        tag: headlineSchema.properties.tag,
        size: headlineSchema.properties.size,
        link_attributes: {
          type: 'object',
          description:
            'A Drupal-style attributes object with extra attributes to append to the headline link.',
        },
      },
    },
    subheadline: {
      type: 'object',
      description: 'Set the subheadline text and size.',
      properties: {
        text: {
          type: 'string',
          description: 'Set the subheadline text content.',
        },
        size: {
          type: 'string',
          description: 'Set the size of the subheadline.',
          default: 'large',
          enum: ['xxlarge', 'xlarge', 'large'],
        },
      },
    },
    description: {
      type: 'string',
      description:
        'A breif description of the intended link. Trimmed to 100 characters when displayed inside the signifier.',
    },
    show_description: {
      type: 'boolean',
      default: false,
      description:
        'If set to true, will move the description out of the signifier area.',
    },
    meta: {
      type: 'string',
      description: 'Render meta data for the resouce.',
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
    chip_list: chipListSchema,
    views: {
      type: 'string',
      description: 'Render the view count.',
    },
    premium: {
      type: 'boolean',
      description:
        'Indicate if this teaser is showing a premium resource. It shows a premium tag in the upper left corner of the signifier.',
      default: false,
    },
    featured: {
      type: 'boolean',
      description:
        'Indicate if this teaser is showing a featured resource. If no eyebrow text value is passed, the word "Featured" will appear as the eyebrow text.',
      default: false,
    },
  },
};
