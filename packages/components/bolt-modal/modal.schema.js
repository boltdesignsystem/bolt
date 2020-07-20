module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Modal',
  type: 'object',
  properties: {
    attributes: {
      title: 'Attributes (Twig-only)',
      type: 'object',
      description:
        'A Drupal attributes object. Used to apply additional HTML attributes to the outer &lt;bolt-modal&gt; tag.',
    },
    disabled: {
      type: 'boolean',
      title: 'Disabled',
      description:
        'Default `disabled` prop supported globally by most Bolt components.',
      hidden: true,
    },
    no_shadow: {
      type: 'boolean',
      title: 'Disable Shadow DOM (Twig-only)',
      description:
        'Manually disables the component from rendering to the Shadow DOM in a Twig template. Useful for testing cross browser functionality / rendering behavior. By default this is handled globally based on browser support.',
      hidden: true,
    },
    'no-shadow': {
      type: 'boolean',
      title: 'Disable Shadow DOM (Web Component-only)',
      description:
        'Manually disables the web component from rendering to the Shadow DOM. Useful for testing cross browser functionality / rendering behavior. By default this is handled globally based on browser support.',
      hidden: true,
    },
    width: {
      type: 'string',
      description: 'Controls the width of the modal container.',
      default: 'optimal',
      enum: ['full', 'regular', 'optimal', 'auto'],
    },
    spacing: {
      type: 'string',
      description: 'Controls the spacing around the modal container.',
      default: 'medium',
      enum: ['none', 'small', 'medium', 'large'],
    },
    gated: {
      description: 'Is this a gated form.',
      type: 'boolean',
      default: false,
    },
    theme: {
      type: 'string',
      description: 'Controls the color theme of the modal container.',
      default: 'xlight',
      enum: ['none', 'xlight', 'light', 'dark', 'xdark'],
    },
    scroll: {
      type: 'string',
      description: 'Controls the scrolling area.',
      default: 'container',
      enum: ['overall', 'container'],
    },
    uuid: {
      type: 'string',
      description: 'Unique ID for modal, randomly generated if not provided.',
    },
    slots: {
      type: 'object',
      description:
        'There are 3 sections (slots) within the modal container. By assigning the appropriate slot name, content will be passed into the respective section.',
      properties: {
        default: {
          description: 'The body section of the modal container.',
        },
        header: {
          description: 'The header section of the modal container.',
        },
        footer: {
          description: 'The footer section of the modal container.',
        },
      },
    },
  },
};
