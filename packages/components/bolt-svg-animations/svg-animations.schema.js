module.exports = {
  title: 'Micro Journey Connection',
  type: 'object',
  properties: {
    speed: {
      type: 'string',
      description: 'Speed of the animation, typically rotation.',
      default: '1000',
    },
    animType: {
      type: 'string',
      description: 'Type of predefined animated SVG to use.',
      enum: ['connectionBand'],
      default: 'connectionBand',
    },
    direction: {
      type: 'string',
      default: 'left',
      enum: ['left', 'right'],
      description:
        'Direction of animation, currently only available on Connection Band',
    },
  },
};
