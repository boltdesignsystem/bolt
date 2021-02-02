module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Post',
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
        'Set a visual signifier for the post. An icon or decorative image usually goes here.',
    },
    headline: {
      type: 'object',
      description: 'Render the headline of the post.',
      properties: {
        text: {
          type: 'string',
          description: 'Set the text of the headline.',
        },
        tag: {
          type: 'string',
          description: 'Set the semantic HTML tag for the headline.',
        },
        size: {
          type: 'string',
          description: 'Set the size of the headline.',
        },
        link_attributes: {
          type: 'object',
          description:
            'A Drupal-style attributes object with extra attributes to append to the headline link.',
        },
      },
    },
    meta_items: {
      type: 'array',
      description: 'Render an array of meta data for the post.',
    },
    status: {
      type: 'object',
      description: 'Set the status of the post.',
      properties: {
        solved: {
          type: 'boolean',
          description: 'Mark the post as solved.',
        },
        solved_label: {
          type: 'string',
          description: 'Set a custom label for the "solved indicator".',
        },
        locked: {
          type: 'boolean',
          description: 'Mark the post as locked.',
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
        favorited: {
          type: 'boolean',
          description: 'Mark the post as favorited.',
        },
        subscribed: {
          type: 'boolean',
          description: 'Mark the post as subscribed.',
        },
      },
    },
    show_actions: {
      type: 'object',
      description: 'Render a popover action menu for the post.',
      properties: {
        reply: {
          type: 'boolean',
          description: 'Show the reply action.',
        },
        favorite: {
          type: 'boolean',
          description:
            'Show the favorite action. Label for this action is updated according to the status of the post.',
        },
        subscribe: {
          type: 'boolean',
          description:
            'Show the subscribe action. Label for this action is updated according to the status of the post.',
        },
      },
    },
    more_info: {
      type: 'string',
      description:
        'Render more information for the post. Short post summary usually goes here. No links should be passed here.',
    },
    warning: {
      type: 'string',
      description:
        'Render warning text for the post, which appears below the "more info" content. No links should be passed here.',
    },
  },
};
