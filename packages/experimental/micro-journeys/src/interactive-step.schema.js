module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journeys Pathway',
  type: 'object',
  properties: {
    tabTitle: {
      type: 'string',
      description: 'Title of the step.',
      default: 'New Step Title',
    },
  },
};
