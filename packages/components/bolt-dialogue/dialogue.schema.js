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
      default: 'optimal',
      enum: ['full', 'regular', 'optimal', 'auto'],
    },
    theme: {
      type: 'string',
      description: 'Controls the color theme of the modal container.',
      enum: ['none', 'xlight', 'light', 'dark', 'xdark'],
      default: 'light',
    },
  },
};
