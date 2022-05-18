const headlineSchema = require('@bolt/components-headline/headline.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Teaser',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    layout: {
      type: 'string',
      description: 'Set the layout of the teaser based on the use case.',
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
    signifier: {
      type: 'object',
      description:
        'Set the signifier for the teaser. It accepts plain <img> element, the Image component, and the Icon element.',
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
          default: 'xlarge',
          enum: ['xxlarge', 'xlarge', 'large'],
        },
        tag: {
          type: 'string',
          description: 'Set the semantic HTML tag for the subheadline.',
          default: 'p',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
        },
      },
    },
    description: {
      type: 'object',
      description: 'Set a brief description of the resource.',
      properties: {
        content: {
          type: 'string',
          description: 'Content of the description..',
        },
        show_on_hover: {
          type: 'boolean',
          default: false,
          description:
            'If set to true, the description will appear as an overlay above the signifier.',
        },
      },
    },
    time: {
      type: 'string',
      description:
        'Use for PDF/articles teasers for estimating reading time. If you choose Video Thumbnail as a signifier do not use this prop since it will conflict with the Video Thumbnail`s <code>duration</code> prop.',
    },
    like: {
      type: 'object',
      description: 'Render the like button. Link element is expected here.',
    },
    share: {
      type: 'object',
      description: 'Render the share button. Share menu is expected here.',
    },
    download: {
      type: 'object',
      description: 'Render the download link. Link element is expected here.',
    },
    chip_list: {
      type: 'object',
      description:
        'Render a list of related chips for the resource.  Passing the Chip List component is mandatory.',
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
    variant: {
      type: 'string',
      description: 'Set the style variant of the teaser.',
      enum: ['transparent', 'card'],
      default: 'transparent',
    },
    type: {
      title: 'DEPRECATED',
      type: 'string',
      description:
        'This prop is deprecated, please stop using it. Instead of <code>type: video</code>, use Video Thumbnail component as a signifier to open a video modal.',
      enum: ['pdf', 'video', 'external-link'],
    },
    // @TODO: meta or meta_items reserved for author and posted date info?
  },
};
