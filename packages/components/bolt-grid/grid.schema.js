module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Grid',
  description: 'A flexible 12-column grid with responsive breakpoint options.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    gutter: {
      type: 'string',
      description: 'Spacing between the columns of the grid.',
      default: 'medium',
      enum: ['none', 'small', 'medium', 'large'],
    },
    row_gutter: {
      type: 'string',
      description: 'Spacing between the rows of the grid.',
      default: 'medium',
      enum: ['none', 'small', 'medium', 'large'],
    },
    items: {
      type: 'array',
      description: 'Array of grid items to render inside the grid.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal-style attributes object with extra attributes to append to this component.',
        },
        content: {
          type: ['string', 'object', 'array'],
          description: 'Content to render inside each grid item.',
        },
        valign: {
          type: 'string',
          description: 'Vertical alignment of the grid item itself.',
          default: 'start',
          enum: ['start', 'center', 'end'],
        },
        column_start: {
          type: 'string',
          description:
            'The vertical starting point of the grid item. This accepts any number from `1` to `12`, and their perspective responsive variations for advanced usage, for example, `6@small` means the column start is set at 6 for any browser width larger and equal to the small breakpoint. This prop is required to make the grid work in Internet Explorer.',
          default: 'auto',
        },
        column_span: {
          type: 'string',
          description:
            'The number of columns the grid item should span across. This accepts any number from `1` to `12`, and their perspective responsive variations for advanced usage, for example, `6@small` means the column span is set at 6 for any browser width larger and equal to the small breakpoint.',
          default: 'auto',
        },
        row_start: {
          type: 'string',
          description:
            'The horizontal starting point of the grid item. This prop is required to make the grid work in Internet Explorer.',
          default: 'auto',
        },
        row_span: {
          type: 'string',
          description: 'The number of rows the grid item should span across.',
          default: 1,
        },
      },
    },
  },
};
