module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar',
  type: 'object',
  properties: {
    title: {
      type: 'object',
      description:
        'Navbar title. Icon is optional. Tag can be set to h1 to h6 depending on the page.',
      properties: {
        content: {
          type: 'any',
          default: 'Go to',
          description:
            'Title text. Should be plain-text but may contain some HTML. Defaults to "Go to" on small screens if empty.',
        },
        tag: {
          type: 'string',
          default: 'h2',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
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
        link: {
          type: 'object',
          description:
            'Make the Navbar title a link, used only on Pattern Lab homepage.',
          hidden: true,
          properties: {
            attributes: {
              type: 'object',
              description:
                'A Drupal attributes object. Applies extra HTML attributes to the parent element. Add "href" attribute here.',
            },
          },
        },
      },
    },
    links: {
      type: 'any',
      description: 'Content of navbar links. Navbar ul is expected here.',
    },
    content: {
      type: 'any',
      description:
        'Custom navbar content. Content provided here will replace title and links.',
    },
    theme: {
      type: 'string',
      description:
        "Color theme. Can be set to 'none' for a transparent background.",
      default: 'dark',
      enum: ['xlight', 'light', 'dark', 'xdark', 'none'],
    },
    center: {
      type: 'boolean',
      description:
        'Determines if you want the Navbar content to be center aligned or not',
    },
    width: {
      type: 'string',
      description:
        'Control the width of the navbar. Full will span the entire screen width ignoring any wrapper or page max-width.',
      enum: ['full', 'auto'],
      default: 'full',
    },
    more_text: {
      type: 'string',
      description:
        'Button text that displays when the overflow menu is displayed.',
      default: 'More',
    },
    offset: {
      type: 'integer',
      description:
        'Number of pixels taken up by sticky items at the top of the page, used for smooth scroll.',
    },
    static: {
      type: 'boolean',
      default: false,
      description: 'Set the navbar to be static instead of sticky.',
    },
    scroll_offset_selector: {
      type: 'string',
      description:
        'Selects one or more elements on the page, offset navbar and smooth scrolling by the total height of the element(s). Must be a valid CSS selector.',
    },
    scroll_offset: {
      type: 'integer',
      description:
        'Additional offset for navbar and smooth scrolling, integer converted to pixel value.',
    },
    spacing: {
      type: 'string',
      description: 'Controls the inset spacing of the navbar',
      enum: ['none', 'xsmall', 'small', 'medium'],
      default: 'small',
    },
    uuid: {
      type: 'string',
      description:
        'Unique ID for the navbar, randomly generated if not provided.',
    },
  },
};
