module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journeys Pathway',
  type: 'object',
  properties: {
    pathwayTitle: {
      type: 'string',
      description:
        'Title of the pathway. Appears in the dropdown menu of pathways.',
      default: 'New Pathway Title',
    },
  },
};
