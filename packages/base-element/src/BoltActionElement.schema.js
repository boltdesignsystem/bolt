module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Action Element',
  description:
    'A starting point for components that have an "action" (e.g. button, link, etc.)',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      description:
        'If present, users will be directed to this URL when clicking this element.',
    },
    target: {
      type: 'string',
      description:
        'A valid HTML target attribute to modify the behavior when clicking this element.  Only valid when "url" is also present.',
      enum: ['_blank', '_self', '_parent', '_top', 'framename'],
    },
    disabled: {
      type: 'boolean',
      description:
        'Whether the click action should be disabled for this element.',
      default: false,
    },
    onClick: {
      type: 'string',
      description:
        'When used with onClickTarget, an event to fire on the targeted elements when this element is clicked.  When used without onClickTarget, arbitrary javascript to execute when this element is clicked.',
    },
    onClickTarget: {
      type: 'string',
      description:
        'Requires onClick.  A CSS selector for elements that the onClick event will fire on when this element is clicked.',
    },
  },
};
