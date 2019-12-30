module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table of Content',
  description: 'Table of Content.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-toc&gt; tag.',
    },
  },
};
