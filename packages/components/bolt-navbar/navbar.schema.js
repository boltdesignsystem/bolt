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
          type: 'any',
          description:
            'Title text should be plain-text but may contain some HTML.',
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
        url: {
          type: 'string',
          description:
            'Make the Navbar title a link, used only on Pattern Lab homepage',
          hidden: true,
        },
        content: {
          type: 'any',
          description:
            'Additional content to appear after the Navbar title text.',
        },
      },
    },
    center: {
      type: 'boolean',
      description:
        'Determines if you want the Navbar content to be center aligned or not',
    },
    full_bleed: {
      type: 'boolean',
      default: true,
      description:
        'If set to true, the Navbar will take the full width of the page.',
    },
    content: {
      type: 'any',
      description: 'Content of the Navbar. Navbar-items are expected here.',
    },
    moreText: {
      type: 'string',
      description:
        'Button text that displays when the Priority+ Nav Dropdown is displayed.',
      default: 'More',
    },
    offset: {
      type: 'integer',
      description:
        '(Inherited from nav-indicator) Number of pixels taken up by sticky items at the top of the page.  Used for smooth scroll and gumshoe.',
    },
    // sticky: {
    //   type: 'boolean',
    //   description:
    //     'When enabled, TOC will automatically use sticky positioning + add a `top` offset style based on the height of the `scrollOffsetSelector` plus the `scrollOffset` (if defined),',
    // },
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
  },
};
