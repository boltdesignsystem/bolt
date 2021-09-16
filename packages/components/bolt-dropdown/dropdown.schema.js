module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Dropdown',
  type: 'object',
  properties: {
    title: {
      type: 'any',
      description: 'The toggle title text',
    },
    center: {
      type: 'boolean',
      description: '`True` to center the toggle title',
      default: false,
    },
    collapse: {
      type: 'boolean',
      description: '`True` to hide toggle until mobile screen size',
      default: false,
    },
    content: {
      type: 'any',
      description:
        '**All of the items in the dropdown** -- generally works by including `@bolt-components-nav/nav.twig` with `links` array of objects containing `text` & `url`',
    },
  },
};
