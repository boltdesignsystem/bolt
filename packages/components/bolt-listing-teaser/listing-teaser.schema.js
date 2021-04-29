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
    signifier_wrap: {
      type: 'boolean',
      default: false,
      description:
        'Allow the content to wrap under the signifier when it runs out of space.',
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
    eyebrow_items: {
      type: 'array',
      description: 'Render an array of eyebrow text for the listing.',
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
  },
};
