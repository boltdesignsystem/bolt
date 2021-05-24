module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar',
  type: 'object',
  properties: {
    title: {
      type: 'any',
      description:
        'Content of navbar title. Navbar title template expected here. Although, custom custom allowed.',
    },
    content: {
      type: 'any',
      description:
        'Content of navbar. Navbar list is expected here. Although, custom content is allowed.',
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
      enum: ['xsmall', 'small', 'medium'],
      default: 'small',
    },
    uuid: {
      type: 'string',
      description:
        'Unique ID for the navbar, randomly generated if not provided.',
    },
  },
};
