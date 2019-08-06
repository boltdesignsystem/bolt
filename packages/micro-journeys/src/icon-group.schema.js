const iconSchema = require('@bolt/components-icon/icon.schema.json');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journey Icon Group',
  type: 'object',
  required: ['size'],
  properties: {
    attributes: {
      type: 'object',
      description:
          'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    iconOneName: {
      type: 'string',
      description: 'Name of first icon.',
      default: 'eye',
      enum: ['', ...iconSchema.properties.name.enum],
    },
    iconTwoName: {
      type: 'string',
      description: 'Name of second icon.',
      default: 'eye',
      enum: ['', ...iconSchema.properties.name.enum],
    },
    iconThreeName: {
      type: 'string',
      description: 'Name of third icon.',
      default: 'eye',
      enum: ['', ...iconSchema.properties.name.enum],
    },
    iconColor: {
      type: 'string',
      description: 'Color of all icons.',
      default: 'teal',
    },
    iconBackgroundColor: {
      type: 'string',
      description: 'Background color of all icons.',
      default: 'white',
    },
  },
};
