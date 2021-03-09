const headlineSchema = require('@bolt/components-headline/headline.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Teaser',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['headline'],
      },
    ],
  },
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
      enum: ['PDF', 'video', 'external-link'],
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
      type: 'object',
      description: '',
      properties: {
        content: {
          type: 'string',
          description:
            'A breif description of the intended link. Trimmed to 100 characters when displayed inside the signifier.',
        },
        show_on_hover: {
          type: 'boolean',
          default: false,
          description:
            'If set to true, will move the description out of the signifier area.',
        },
      },
    },
    time: {
      type: 'string',
      description:
        'Render time data (video duration or read time) for the resouce.',
    },
    like_button_attributes: {
      type: 'object',
      description: '',
    },
    share_menu: {
      type: 'any',
      description:
        'Render a popover share menu for the listing. Passing the Share component is mandatory.',
    },
    chip_list: {
      type: 'object',
      description: '',
    },
    status: {
      type: 'object',
      description: '',
      properties: {
        locked: {
          type: 'boolean',
          description:
            'Indicate if this teaser is showing a locked resource. It shows a lock icon in the upper left corner of the signifier.',
          default: false,
        },
        views: {
          type: 'string',
          description: 'Render the view count.',
        },
      },
    },
    // @TODO: meta or meta_items reserved for author and posted date info?
  },
};
