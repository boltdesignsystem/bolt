module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Image',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['imageAttributes'],
      },
      {
        required: ['useAspectRatio'],
      },
      {
        required: ['width'],
      },
      {
        required: ['height'],
      },
      {
        required: ['zoom'],
      },
    ],
  },
  anyOf: [
    {
      required: ['src'],
    },
    {
      required: ['srcset'],
    },
  ],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    src: {
      type: 'string',
      description: 'Source url for image.',
    },
    alt: {
      type: 'string',
      description: 'Alt tag for image.',
    },
    lazyload: {
      type: 'boolean',
      description:
        'Lazyload can boost performance by loading images on demand, instead of on initial page load.',
      default: true,
    },
    no_lazy: {
      type: 'boolean',
      description:
        'Override the default lazyload behavior. Used only on the web component, where the presence of a boolean property always equates to `true`.',
      default: false,
    },
    placeholder_color: {
      type: 'string',
      description:
        'A valid CSS background color property shown while image loads.',
      default: 'hsl(233, 33%, 97%)',
    },
    placeholder_image: {
      type: 'string',
      description: 'Image path or image data shown while image loads.',
      default:
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    },
    srcset: {
      type: 'string',
      description:
        'A comma seperated string of image urls and image widths, used for optimizing image loading performance.',
    },
    sizes: {
      type: 'string',
      description:
        "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of a media condition omitted for the last item), and a source size value. <a href='http://mor10.com/experiments/ricg/'target='_blank' rel='noopener'>Learn more</a>.",
      default: 'auto',
    },
    useAspectRatio: {
      title: 'DEPRECATED',
      type: 'boolean',
      description: 'Use the <code>ratio</code> prop instead.',
      default: true,
    },
    ratio: {
      type: ['string', 'boolean'],
      title: 'boolean option is DEPRECATED',
      description:
        "Set the aspect ratio for the image via slash-separated width and height values, e.g. 4/3. Currently required for aspect ratio to be applied properly. Set to 'none' to opt out of aspect ratio.",
      default: 'auto',
    },
    max_width: {
      type: 'string',
      description:
        "Set the max-width of the image as a valid CSS value, e.g. '300px' or '50%'.",
    },
    valign: {
      type: 'string',
      description:
        "Allows the image's vertical alignment behavior to be customized in certain situations (ex. background images). This can be configured via a pre-defined position (top | center | bottom) or via specific pixel or percent offset (ex. 30%).",
      default: 'center',
    },
    align: {
      type: 'string',
      description:
        "Allows the image's horizontal alignment behavior to be customized in certain situations (ex. background images). This can be configured via a pre-defined position (left | center | right) or via specific pixel or percent offset (ex. 30%).",
      default: 'center',
    },
    cover: {
      type: 'boolean',
      description: 'Set an image to fill its container.',
      default: false,
    },
    width: {
      title: 'DEPRECATED',
      oneOf: [
        {
          enum: ['string', 'number'],
        },
      ],
      description:
        'Override the default width of the image. If no height is provided, aspect ratio will be maintained.',
    },
    height: {
      title: 'DEPRECATED',
      oneOf: [
        {
          enum: ['number', 'string'],
        },
      ],
      description:
        'Override the default height of the image. If no width is provided, aspect ratio will be maintained.',
    },
    imageAttributes: {
      title: 'DEPRECATED',
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    zoom: {
      title: 'DEPRECATED',
      type: 'boolean',
      description: 'Support will be dropped along with device viewer magnify',
      hidden: true,
      default: false,
    },
  },
};
