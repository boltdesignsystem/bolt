module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Dialogue',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-dialogue&gt; tag.',
    },
    title: {
      type: 'any',
      description: 'Title of Example.',
    },
    content: {
      type: 'any',
      description: 'The main Example content.',
    },
    width: {
      type: 'string',
      description: 'Controls the width of the dialogue container.',
      enum: ['full', 'regular', 'optimal', 'auto'],
      default: 'optimal',
    },
    spacing: {
      type: 'string',
      description: 'Controls the spacing around the dialogue container.',
      enum: ['none', 'small', 'medium', 'large'],
      default: 'medium',
    },
    persistent: {
      type: 'boolean',
      description:
        'Enables the modal to be persistent. This will eliminate ways to close the modal and it is up to the author to provide a custom link to close the modal or redirect to another page within the modal content. Must be used in tandem with the <code>persistent_return_url</code> prop.',
      default: false,
    },
    theme: {
      type: 'string',
      description: 'Controls the color theme of the dialogue container.',
      enum: ['none', 'xlight', 'light', 'dark', 'xdark'],
      default: 'light',
    },
  },
};
