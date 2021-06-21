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
      alias: 'href',
    },
    target: {
      type: 'string',
      description:
        'A valid HTML target attribute to modify the behavior when clicking this element.  Only valid when "url" is also present.',
      enum: ['_blank', '_self', '_parent', '_top', 'framename'],
      default: '_self',
    },
    disabled: {
      type: 'boolean',
      description:
        'Whether the click action should be disabled for this element.',
      default: false,
    },
    on_click: {
      type: 'string',
      description:
        'When used with on_click_target, an event to fire on the targeted elements when this element is clicked.  When used without on_click_target, arbitrary javascript to execute when this element is clicked.',
    },
    on_click_target: {
      type: 'string',
      description:
        'Requires on_click.  A CSS selector for elements that the on_click event will fire on when this element is clicked.',
    },
    onClick: {
      title: 'DEPRECATED',
      description: 'Use on_click instead.',
    },
    onClickTarget: {
      title: 'DEPRECATED',
      description: 'Use on_click_target instead.',
    },
  },
};
