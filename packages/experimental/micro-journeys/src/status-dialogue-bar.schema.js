const iconSchema = require('@bolt/components-icon/icon.schema.json');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journy Status Dialogue Bar',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    iconName: {
      type: 'string',
      description: 'Icon name.',
      default: 'mobility',
      enum: ['-none-', ...iconSchema.properties.name.enum],
    },
    isAlertMessage: {
      type: 'boolean',
      description: 'Is this an alert message? Changes it to error red.',
      default: false,
    },
    dialogueArrowDirection: {
      type: 'string',
      description: 'Direction of the dialogue arrow direction.',
      enum: ['up', 'down', 'left', 'right', 'none'],
      default: 'none',
    },
  },
};
