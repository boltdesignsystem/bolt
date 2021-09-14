module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Code Snippet',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this element.',
    },
    content: {
      type: 'any',
      description: 'Content of the code snippet.',
    },
    lang: {
      type: 'string',
      description:
        'Code language of the content. Each language comes with its unique syntax highlights.',
      default: 'html',
      enum: [
        'markup',
        'html',
        'xml',
        'svg',
        'mathml',
        'ssml',
        'atom',
        'rss',
        'javascript',
        'js',
        'clike',
        'css',
        'scss',
        'twig',
        'java',
        'json',
        'rest',
        'bash',
        'shell',
        'csv',
        'docker',
        'dockerfile',
        'http',
        'jsx',
        'tsx',
        'md',
        'markdown',
        'yml',
        'yaml',
      ],
    },
    custom_lang_label: {
      type: 'any',
      description:
        'Custom language label. Only use this if the actual language label is not desired.',
    },
    mode: {
      type: 'string',
      description:
        'Toggle between light and dark syntax highlights, or turn it off. This works independently of Bolt color themes.',
      default: 'light',
      enum: ['light', 'dark', 'none'],
    },
    hide_copy: {
      type: 'boolean',
      description: 'Hide copy to clipboard from the code snippet header.',
    },
    hide_lang_label: {
      type: 'boolean',
      description: 'Hide the language label from the code snippet header.',
    },
  },
};
