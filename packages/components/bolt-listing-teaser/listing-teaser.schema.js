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
    reply: {
      type: 'any',
      description: 'Render a preview of a reply to the post.',
    },
  },
};
