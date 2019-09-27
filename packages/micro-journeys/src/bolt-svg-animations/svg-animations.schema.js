module.exports = {
  title: 'Micro Journey Connection',
  type: 'object',
  properties: {
    speed: {
      type: 'string',
      description: 'Speed of the animation, typically rotation.',
      default: '4000',
    },
    animType: {
      type: 'string',
      description: 'Type of predefined animated SVG to use.',
      enum: [
        'connectionBand',
        'tripleConnectionBand',
        'orbit',
        'radar',
        'automation',
      ],
      default: 'connectionBand',
    },
    direction: {
      type: 'string',
      default: 'left',
      enum: ['left', 'right'],
      description:
        'Direction of animation, currently only available on Connection Band',
    },
    theme: {
      type: 'string',
      enum: ['light', 'dark'],
      default: '',
      description:
        'control color scheme of component, not applicable to all animTypes',
    },
  },
};
