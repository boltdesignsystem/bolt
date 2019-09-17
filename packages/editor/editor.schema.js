module.exports = {
  title: 'Editor',
  type: 'object',
  required: ['content', 'styles', 'scripts'],
  properties: {
    content: {
      type: 'string',
      description: 'HTML content to edit',
    },
    styles: {
      type: 'array',
      description: 'URL paths to CSS files that the editable content requires',
      items: {
        type: 'string',
      },
    },
    scripts: {
      type: 'array',
      description: 'URL paths to JS files that the editable content requires',
      items: {
        type: 'string',
      },
    },
    id: {
      type: 'string',
      description:
        'ID for this content. Useful for saving back to a data store like Drupal by passing in the paragraph ID. ID emitted in save event.',
    },
  },
};
