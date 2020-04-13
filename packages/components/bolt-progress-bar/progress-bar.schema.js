module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Progress Bar',
  description: 'Visually indicates the quantity or progression of an activity.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-progress-bar&gt; tag.',
    },
    // Label indicating how the progress bar should be announced to the user
    title: {
      description: 'Text that displays above the Progress Bar.',
      type: 'string',
    },
    variant: {
      description: 'Style variant of the Progress Bar',
      type: 'string',
      enum: ['error', 'success', 'info', 'default'],
    },
    valuePosition: {
      description: 'The position where the value text gets displayed.',
      type: 'string',
      default: 'outside',
      enum: ['outside', 'top', 'none'],
    },
    valueText: {
      description: 'Text description of current progress value to display instead of percentage.',
      type: 'string',
    },
    size: {
      description: 'The size of the Progress Bar component',
      type: 'string',
      enum: ['small', 'medium'],
      default: 'small',
    },
    min: {
      type: 'number',
      description:
        "The minimum value for the progress bar, used to calculate the amount that's filled in.",
      default: 0,
    },
    max: {
      type: 'number',
      description:
        "The maximum value for the progress bar, used to calculate the amount that's filled in.",
      default: 100,
    },
    value: {
      type: 'number',
      description:
        'Represents the value (from 0 to 100) of the percentage progressed.',
      default: 0,
    },
    animated: {
      type: 'boolean',
      description:
        'Enable the animated background. Also automatically sets "striped" to true',
    },
    striped: {
      type: 'boolean',
      description: 'Enables displaying a striped background.',
    },
    // animated: {
    //   type: 'Boolean',
    //   description:
    //     'Animates ',
    //   default: 0,
    // },
  },
};
