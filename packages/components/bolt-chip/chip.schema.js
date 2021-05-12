const elementSchemas = require('@bolt/element/element.schemas');
const { url, target } = elementSchemas.boltActionElement.properties;

url.description =
  'Optional. Contains a URL that the chip points to. When URL is present, tag changes to `a`, otherwise tag would be `span`.';

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Chip',
  type: 'object',
  required: ['text'],
  not: {
    required: ['tag'],
  },
  properties: {
    attributes: {
      title: 'Attributes (Twig-only)',
      type: 'object',
      description:
        'A Drupal attributes object. Used to apply with extra HTML attributes to the outer &lt;bolt-chip&gt; tag.',
    },
    text: {
      type: ['string', 'array', 'object'],
      description: 'Text content of the chip.',
    },
    size: {
      type: 'string',
      description: 'Controls the size of the chip.',
      default: 'small',
      enum: ['xsmall', 'small', 'medium'],
    },
    border_radius: {
      type: 'string',
      description: 'Controls the border radius of the chip.',
      default: 'full',
      enum: ['full', 'small', 'none'],
    },
    color: {
      type: 'string',
      description: 'Controls the color of the chip.',
      default: 'regular',
      enum: [
        'regular',
        'error',
        'warning',
        'success',
        'navy',
        'teal',
        'orange',
        'yellow',
        'wine',
        'pink',
        'berry',
        'violet',
      ],
    },
    url,
    target,
    icon: {
      type: 'object',
      description:
        "Bolt icon. Accepts the same options as Bolt Icon Component `@bolt-components-icon` plus an additional 'position' parameter that determines placement within the button.",
      properties: {
        position: {
          type: 'string',
          default: 'after',
          enum: ['before', 'after'],
        },
      },
      ref: 'icon',
    },
    tag: {
      description:
        '<mark>DEPRECATED</mark> - tag is automatically determined by URL.',
    },
    iconOnly: {
      type: 'boolean',
      description:
        'Display only the icon and hide the text. For accessibility purposes you are still required to provide text.',
      default: false,
      required: ['icon'],
    },
    no_shadow: {
      title: 'Disable Shadow DOM (Twig-only)',
      description:
        'Manually disables the component from rendering to the Shadow DOM in a Twig template. Useful for testing cross browser functionality / rendering behavior. By default this is handled globally based on browser support.',
      hidden: true,
      type: 'boolean',
    },
    'no-shadow': {
      title: 'Disable Shadow DOM (Web Component-only)',
      description:
        'Manually disables the web component from rendering to the Shadow DOM. Useful for testing cross browser functionality / rendering behavior. By default this is handled globally based on browser support.',
      hidden: true,
      type: 'boolean',
    },
  },
};
