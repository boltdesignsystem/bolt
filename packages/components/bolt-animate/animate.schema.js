const { animationNames, easings } = require('./animate.meta');

module.exports = {
  title: 'Animate',
  type: 'object',
  properties: {
    initialAppearance: {
      type: 'string',
      title: 'Initial Appearance',
      default: 'hidden',
      enum: ['default', 'hidden'],
    },

    in: {
      type: 'string',
      title: 'Build In Animation Name',
      default: 'none',
      enum: animationNames.buildIns.map(a => a.value),
    },
    inDuration: {
      type: 'number',
      title: 'Build In Duration',
      description: 'Set in milliseconds',
      default: 500,
    },
    inDelay: {
      type: 'number',
      title: 'Build In Delay',
      description: 'Set in milliseconds',
      default: 0,
    },
    inEasing: {
      type: 'string',
      title: 'Build In Easing',
      enum: easings.map(e => e.value),
      default: 'ease',
    },
    inOrder: {
      type: 'number',
      default: 1,
    },

    idle: {
      type: 'string',
      title: 'Idle Animation Name',
      default: 'none',
      enum: animationNames.idles.map(a => a.value),
    },
    idleDuration: {
      type: 'number',
      title: 'Idle Animation Duration (before repeating)',
      description: 'Set in milliseconds',
      default: 500,
    },
    idleDelay: {
      type: 'number',
      title: 'Idle Delay',
      description: 'Set in milliseconds',
      default: 0,
    },

    out: {
      type: 'string',
      title: 'Build Out Animation Name',
      default: 'none',
      enum: animationNames.buildOuts.map(a => a.value),
    },
    outDuration: {
      type: 'number',
      title: 'Build Out Duration',
      description: 'Set in milliseconds',
      default: 500,
    },
    outDelay: {
      type: 'number',
      title: 'Build Out Delay',
      description: 'Set in milliseconds',
      default: 0,
    },
    outEasing: {
      type: 'string',
      title: 'Build Out Easing',
      enum: easings.map(e => e.value),
      default: 'ease',
    },
    outOrder: {
      type: 'number',
      default: 1,
    },
  },
};
