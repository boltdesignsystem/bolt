module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journey Icon Group',
  type: 'object',
  required: ['size'],
  properties: {
    step: {
      title: 'Step',
      description: 'A step along a micro journey',
      type: 'string',
      default: '1',
    },
    active: {
      title: 'Active',
      description: 'Is this step current active',
      type: 'boolean',
      default: false,
    },
  },
};
