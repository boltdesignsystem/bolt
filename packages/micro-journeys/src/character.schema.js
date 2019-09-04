module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journey Character',
  type: 'object',
  required: ['size'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    size: {
      type: 'string',
      description: 'Character Size.',
      default: 'small',
      enum: ['small', 'medium', 'large'],
    },
    characterImage: {
      type: 'string',
      description: 'Pre-defined package image.',
      enum: ['customer-happy', 'customer-neutral', 'customer-sad', 'customer-surprise', 'pega-rep', 'u-comm-plus', 'custom'],
      default: 'customer-happy',
      enumName: ['Customer Happy', 'Customer Neutral', 'Customer Sad', 'Customer Surprise', 'Pega Rep', 'U-comm Plus', 'Custom Url (use custom url field)']
    },
    characterCustomUrl: {
      type: 'string',
      description: 'URL of a custom image.',
      default:
        'https://www.fillmurray.com/g/200/200',
    },
    useIcon: {
      type: 'boolean',
      description: 'Use a bolt-icon in place of an image Url.',
    },
  },
};
