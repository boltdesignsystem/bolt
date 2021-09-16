module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Video',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['isBackgroundVideo'],
      },
    ],
  },
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    videoId: {
      type: ['string', 'number'],
      description: 'Brightcove ID for this video.',
    },
    playerId: {
      type: 'string',
      description: 'Brightcover Player ID.',
    },
    accountID: {
      type: ['string', 'number'],
      description: 'ID of the Brightcove account that owns the video.',
    },
    videoUuid: {
      type: 'string',
      description:
        'A unique identifying string, randomly generated if not provided.',
    },
    share_description: {
      type: 'any',
      description: 'A custom title to use in the share overlay',
      default: 'Share This Video',
    },
    ratio: {
      type: 'boolean',
      description: 'Maintain video ratio.',
    },
    collapsed: {
      type: 'boolean',
      description: 'Should the video be collapsed on load.',
    },
    showMeta: {
      type: 'boolean',
      description: 'Should the video show meta data.',
      default: true,
    },
    showMetaTitle: {
      type: 'boolean',
      description: 'Should the video show meta title.',
      default: true,
    },
    controls: {
      type: 'boolean',
      description: 'Should the video controls be available.',
      default: true,
    },
    autoplay: {
      type: 'boolean',
      description: 'Should the video auto-play on load.',
      default: false,
    },
    loop: {
      type: 'boolean',
      description: 'Should the video loop.',
      default: false,
    },
    on_init: {
      type: 'string',
      description:
        'The `on_init` config allows for an external Javascript function inlined on the page to add any 3rd party scripts or video plugins to a `<bolt-video>` player instance when initializing. Please see the new recommended `enabled_plugins` and `disabled_plugins` options below.',
    },
    default_plugins: {
      type: 'array',
      readonly: true,
      description:
        'An array of the default `<bolt-video>` player plugins that are globally enabled by default.',
      enum: ['playback'],
      hidden: true,
    },
    available_plugins: {
      type: 'array',
      readonly: true,
      description:
        'The built-in `<bolt-video>` player plugins that are availble to be used in any player instance without requiring the use of any extra Javascript.',
      enum: ['playback', 'social', 'email', 'cue'],
      hidden: true,
    },
    enabled_plugins: {
      type: 'string',
      description:
        'Space-separated list of built-in `<bolt-video>` plugins for Brightcove to enable. Current include `social`, `email`, `playback`, nd `cue`. For examp: `<bolt-video enabled-plugins="cue social email playback">`.',
    },
    disabled_plugins: {
      type: 'string',
      description:
        'Space-separated list of any built-in `<bolt-video>` plugins for Brightcove to disable. Used to opt-out of any video plugins that re enabled by default (ex. the `playback` plugin). For examp: `<bolt-video disabled-plugins="playback">`.',
    },
    errorMessage: {
      type: 'string',
      description:
        "A custom message to be display upon a brigthcove error,  will default to 'This video didnt load correctly. Refresh page to view.' is this field is left blank.",
    },
    isBackgroundVideo: {
      title: 'DEPRECATED',
      description: 'Background video feature will be removed with Bolt v3.0',
    },
  },
};
