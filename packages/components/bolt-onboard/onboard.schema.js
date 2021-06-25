module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Onboard',
  description: 'This is description',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-onboard&gt; tag.',
    },
    content: {
      type: 'any',
      description: 'Renders provided text of the "onboard component".',
    },
    status: {
      type: 'string',
      description:
        'Sets the status that the "onboard component" is trying to convey.',
      enum: ['warning', 'success', 'information'],
      default: 'information',
    },
    size: {
      type: 'string',
      description: 'Controls the vertical spacing of the "onboard component".',
      default: 'default',
      enum: ['default', 'medium', 'large'],
    },
    radius: {
      type: 'string',
      description: 'Controls the vertical spacing of the "onboard component".',
      default: 'none',
      enum: ['none', 'medium', 'full'],
    },
  },
};
