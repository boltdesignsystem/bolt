module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Results Graph',
  type: 'object',
  properties: {
    graph_items: {
      type: 'array',
      description:
        'The individual boxes the will be displayed in the results graph component. Each will have content and a color choice.',
      items: {
        type: 'object',
        properties: {
          number: {
            type: 'string',
            description: 'The number value that the graph box will display.',
          },
          description: {
            type: 'string',
            description:
              'The description that will display below the number in the graph box.',
          },
          color: {
            type: 'string',
            description: 'The background color of the graph box',
            enum: ['grey', 'indigo', 'teal', 'orange', 'yellow'],
          },
        },
      },
    },
  },
};
