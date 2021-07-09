const headlineSchema = require('@bolt/components-headline/headline.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Listing Teaser',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    layout: {
      type: 'string',
      description:
        'Set the layout of the listing teaser based on the use case.',
      enum: ['vertical', 'horizontal', 'responsive'],
      default: 'horizontal',
    },
    gutter: {
      type: 'string',
      description:
        'Set the spacing in between the signifier and the rest of the content.',
      enum: ['small', 'medium', 'large'],
      default: 'small',
    },
    signifier: {
      type: 'any',
      description:
        'Set a visual signifier for the listing. An icon or decorative image usually goes here.',
    },
    headline: {
      type: 'object',
      description: 'Render the headline of the listing.',
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
      type: 'any',
      description:
        'Render the subheadline of the listing. This appears below the headline.',
    },
    eyebrow_items: {
      type: 'array',
      description:
        'Render an array of eyebrow text for the listing. This appears above the headline',
    },
    meta_items: {
      type: 'array',
      description: 'Render an array of meta data for the listing.',
    },
    status: {
      type: 'object',
      description: 'Set the status of the listing.',
      properties: {
        solved: {
          type: 'boolean',
          default: false,
          description: 'Mark the listing as solved.',
        },
        solved_label: {
          type: 'string',
          description: 'Set a custom label for the "solved indicator".',
        },
        locked: {
          type: 'boolean',
          default: false,
          description: 'Mark the listing as locked.',
        },
        locked_label: {
          type: 'string',
          description: 'Set a custom label for the "locked indicator".',
        },
        replies: {
          type: 'string',
          description: 'Set the count of replies.',
        },
        views: {
          type: 'string',
          description: 'Set the count of views.',
        },
      },
    },
    action_menu: {
      type: 'any',
      description:
        'Render a popover action menu for the listing. Passing the Menu component is recommended.',
    },
    share_menu: {
      type: 'any',
      description:
        'Render a popover share menu for the listing. Passing the Share component is mandatory.',
    },
    custom_menu: {
      type: 'any',
      description:
        'Render a custom popover menu. This is completely freeform, unlike the pre-defined props like action_menu and share_menu. Assemble the popover and the menu components, and pass them to this prop.',
    },
    description: {
      type: 'any',
      description:
        'Render a short description for the listing. Listing summary usually goes here. Do not pass links here unless absolutely necessary.',
    },
    warning: {
      type: 'any',
      description:
        'Render warning text for the listing, which appears below the "description" content. Do not pass links here unless absolutely necessary.',
    },
    chip_list: {
      type: 'object',
      description:
        'Render a list of related chips for the resource.  Passing the Chip List component is mandatory.',
    },
    reply: {
      type: 'any',
      description: 'Render a preview of a reply to the post.',
    },
    callout: {
      type: 'object',
      description: 'Render a callout section to feature important notes.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal-style attributes object with extra attributes to append to the callout container.',
        },
        content: {
          type: 'any',
          description: 'Render the content of the callout.',
        },
      },
    },
    variant: {
      type: 'string',
      description: 'Set the style variant of the listing teaser.',
      enum: ['transparent', 'card'],
      default: 'transparent',
    },
    inset_spacing: {
      type: 'string',
      description:
        'Set the inset spacing of the listing teaser. This only applies to card variant.',
      enum: ['xsmall', 'small', 'medium'],
      default: 'medium',
    },
  },
};
