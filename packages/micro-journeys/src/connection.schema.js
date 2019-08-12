module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Micro Journey Connection',
  type: 'object',
  properties: {
    connectionUrl: {
      type: 'string',
      description:
        'A string to the url for the svg that makes up the connection image.',
      default:
        'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/animated-bands-ltr.png',
    },
  },
};
