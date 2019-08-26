module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journeys Dropdown',
  type: 'object',
  required: ['size'],
  properties: {
    center: {
      type: 'boolean',
      description: '`True` to hide toggle until mobile screen size',
      default: 'false',
    },
    title: {
      type: 'string',
      description: 'The toggle title text',
    },
    collapse: {
      type: 'boolean',
      description: '`True` to hide toggle until mobile screen size',
      default: 'false',
    },
    content: {
      type: 'any',
      description: '**All of the items in the dropdown** -- generally works by including `@bolt-components-nav/nav.twig` with `links` array of objects containing `text` & `url`',
    },
    iconBackgroundColor: {
      type: 'string',
      description: 'Background color of all icons.',
      default: 'white',
    },
  },
};
