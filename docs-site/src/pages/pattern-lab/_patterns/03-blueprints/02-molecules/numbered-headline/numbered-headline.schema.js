module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Numbered Headline',
  description:
    'A variation of the Headline component that can display a numbered bullet. Included by default in the @bolt/blueprints package.',
  type: 'object',
  properties: {
    numberText: {
      description: "The text to display in the Numbered Headline's bullet",
      type: 'string',
    },
    numberColor: {
      description: "The background color of the Numbered Headline's bullet",
      type: 'string',
      enum: ['teal', 'indigo', 'orange', 'purple'],
    },
  },
};
