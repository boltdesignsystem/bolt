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
    value: {
      type: 'number',
      description:
        'Typically represents the value (from 0 to 100) of the percentage progressed.',
      default: 0,
    },
    min: {
      type: 'number',
      description:
        "The minimum value allowed in the Progress Bar; used to calculate the amount that's currently filled in.",
      default: 0,
    },
    max: {
      type: 'number',
      description:
        "The maximum value allowed in the Progress Bar; used to calculate the amount that's filled in.",
      default: 100,
    },
    title: {
      description: 'Optional text that displays above the Progress Bar.',
      type: 'string',
    },
    valuePosition: {
      description:
        'The position where the value text is displayed -- to the side, on top, or hidden entirely.',
      type: 'string',
      default: 'outside',
      enum: ['outside', 'top', 'none'],
    },
    valueText: {
      description:
        'Alternative text description of the current progress value to display instead of the percentage default. Ex. "1 out of 5"',
      type: 'string',
    },
    animated: {
      type: 'boolean',
      description:
        'Enables the animated background to better indicate active progress. Note: this will also automatically set "striped" to true when enabled.',
    },
    striped: {
      type: 'boolean',
      description: 'Enables displaying a striped background.',
    },
  },
};
