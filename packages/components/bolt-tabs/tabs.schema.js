module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Tabs',
  type: 'object',
  properties: {
    panels: {
      type: 'array',
      description:
        'All of the tab panels. Each panel should contain a label and content.',
      items: {
        type: 'object',
        properties: {
          label: {
            type: 'any',
            description: 'Tab label used in the navigation. Twig only.',
            default: 'Tab',
          },
          content: {
            type: ['string', 'object', 'array'],
            description: 'Tab panel content.',
          },
          selected: {
            type: 'boolean',
            description:
              'Set active state on tab. Only one active tab allowed at a time. Defaults to first tab.',
            default: false,
          },
          id: {
            type: 'string',
            description:
              'Unique identifier for each tab label, may be used for deep linking.',
          },
        },
      },
    },
    align: {
      description: 'Horizontal alignment of tab labels.',
      type: 'string',
      enum: ['start', 'center', 'end'],
      default: 'start',
    },
    label_spacing: {
      type: 'string',
      description: 'Set label spacing.',
      default: 'small',
      enum: ['small', 'medium'],
    },
    panel_spacing: {
      type: 'string',
      description: 'Set panel spacing.',
      default: 'small',
      enum: ['none', 'small', 'medium'],
    },
    inset: {
      type: 'string',
      description: 'Controls spacing placement on tab labels and panels.',
      default: 'auto',
      enum: ['auto', 'on', 'off'],
    },
    selected_tab: {
      type: 'integer',
      description:
        'Set selected tab by number. To select the second tab, set to 2.',
      default: 1,
      minimum: 1,
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
