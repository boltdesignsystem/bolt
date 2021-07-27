module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Icon',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    name: {
      type: 'string',
      description: 'Name of Icon',
      default: 'none'
    },
    size: {
      type: 'string',
      description: 'Controls the size of the icon. Each size is set to a specific pixel value: 16px, 24px, 32px, and 38px. However, this prop is optional. When no size is specified, the icon is expected to act as an inline icon, which will grow or shrink depending on the font-size of its parent container.',
      enum: ['small', 'medium', 'large', 'xlarge']
    },
    color: {
      type: 'string',
      description: 'Icon color palette. Picking an option other than `auto` will override the default colors based on the color theme is placed within.',
      default: 'auto',
      enum: [
        'auto',
        'teal',
        'navy',
        'yellow',
        'orange',
        'gray',
        'pink',
        'berry',
        'wine',
        'violet'
      ]
    }
  },
};
