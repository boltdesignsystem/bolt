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
  },
};
