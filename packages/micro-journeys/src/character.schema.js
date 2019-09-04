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
      description: 'URL of the character image.',
      default:
          'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/customer-happy.png',
    },
    characterCustomUrl: {
      type: 'string',
      description: 'URL of the character image.',
      default:
        'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/customer-happy.png',
    },
    useIcon: {
      type: 'boolean',
      description: 'Use a bolt-icon in place of an image Url.',
    },
  },
};
