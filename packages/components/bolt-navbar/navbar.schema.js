const navbarItemSchema = require('./navbar-item.schema.js');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar',
  type: 'object',
  properties: {
    theme: {
      type: 'string',
      description:
        "Color theme. Can be set to 'none' for a transparent background.",
      default: 'dark',
      enum: ['xlight', 'light', 'dark', 'xdark', 'none'],
    },
    title: {
      type: 'object',
      description:
        'Navbar title. Icon is optional. Tag can be set to h1 to h6 depending on the page.',
      properties: {
        tag: {
          type: 'string',
          default: 'h2',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        text: {
          type: 'string',
        },
        icon: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the (optional) icon to be used.',
            },
          },
        },
        hide_title: {
          type: 'string',
          description:
            'Set the breakpoint at which you wish to hide the title text.',
          enum: ['from-xsmall-bp', 'from-small-bp'],
        },
      },
    },
    center: {
      type: 'boolean',
      description:
        'Determines if you want the Navbar content to be center aligned or not',
    },
    width: {
      type: 'string',
      description:
        "Adjusts the Navbar's overall maximum width behavior -- either filling up the entire browser's total screen width (full) or just the component's parent container width (auto).",
      default: 'full',
      enum: ['full', 'auto'],
    },
    items: {
      type: 'array',
      description: 'Array of Navbar Items',
      items: navbarItemSchema,
    },
    moreText: {
      type: 'string',
      description:
        '(Inherited from nav-priority) Button text that displays when the Priority+ Nav Dropdown is displayed.',
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
    uuid: {
      type: 'string',
      description:
        'Unique ID for the navbar, randomly generated if not provided.',
    },
    links: {
      title: 'DEPRECATED',
      description: 'Use `items` instead.',
      type: 'array',
      items: navbarItemSchema,
    },
  },
};
