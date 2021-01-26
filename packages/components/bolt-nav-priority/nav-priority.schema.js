module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Nav Priority',
  type: 'object',
  properties: {
    links: {
      type: 'array',
      description: 'Array of Priority Nav links.',
      items: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
        },
      },
    },
    moreText: {
      type: 'string',
      description:
        'Button text that displays when the Priority+ Nav Dropdown is displayed',
      default: 'More',
    },
    offset: {
      type: 'integer',
      description:
        '(Inherited from nav-indicator) Number of pixels taken up by sticky items at the top of the page.  Used for smooth scroll and gumshoe.',
    },
    sticky: {
      type: 'boolean',
      description:
        'When enabled, TOC will automatically use sticky positioning + add a `top` offset style based on the height of the `scrollOffsetSelector` plus the `scrollOffset` (if defined),',
    },
    scrollOffsetSelector: {
      type: 'string',
      description:
        'Selects a fixed element on the page, offsets smooth scrolling by the height of that element. Must be a valid CSS selector.',
    },
    scrollOffset: {
      type: 'integer',
      description:
        'Additional offset for smooth scrolling, integer converted to pixel value.',
    },
  },
};
