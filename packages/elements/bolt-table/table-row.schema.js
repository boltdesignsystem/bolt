module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table Row',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'object',
      description:
        'Generates a single table row &lt;tr&gt; element. Use table-cell.twig to render table cells inside the table row.',
    },
  },
};
