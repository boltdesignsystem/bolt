const iconSchema = require('@bolt/components-icon/icon.schema.json');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Action Element',
  type: 'object',
  required: ['onClick', 'onClickTarget'],
  properties: {
    disabled: {
      type: 'boolean',
      default: false,
    },
    onClickTarget: {
      type: 'string',
      description: 'Target on which to call the onClick method.',
    },
    onClick: {
      type: 'string',
      description:
        'Function name to be called by the click action. Must exist on the onClickTarget.',
    },
    url: {
      type: 'string',
    },
    target: {
      type: 'string',
    },
  },
};
