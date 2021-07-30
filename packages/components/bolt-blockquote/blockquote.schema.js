module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Blockquote',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      description:
        'Text to appear in blockquote (Twig only). May be plain text or text wrapped in <p> tags.',
      type: 'string',
    },
    size: {
      description: 'Text size.',
      default: 'xlarge',
      type: 'string',
      enum: ['large', 'xlarge', 'xxlarge'],
    },
    weight: {
      description: 'Text weight.',
      default: 'semibold',
      type: 'string',
      enum: ['semibold', 'bold'],
    },
    alignItems: {
      description: 'Aligns items left, center, or right.',
      default: 'left',
      type: 'string',
      enum: ['left', 'center', 'right'],
    },
    border: {
      description: 'Add a border.',
      default: 'vertical',
      type: 'string',
      enum: ['vertical', 'horizontal', 'none'],
    },
    indent: {
      description: 'Indent text.',
      default: false,
      type: 'boolean',
    },
    fullBleed: {
      description: 'Width of the brower window.',
      default: false,
      type: 'boolean',
    },
    no_quotes: {
      description: 'Hide quotation marks.',
      default: false,
      type: 'boolean',
    },
    lang: {
      description:
        'Set language-specific quotation marks. By default, inherits the value of the closest `lang` attribute. While any valid `lang` valid is accepted, choosing `en`, `de`, `fr`, or `ja` will optimize how quotes are displayed in these languages.',
      type: 'string',
    },
    logo: {
      description: 'Add a logo component.',
      type: 'object',
      ref: 'logo',
    },
    author: {
      description: 'Author of the quote.',
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: "Author's name.",
        },
        title: {
          type: 'string',
          description: "Author's title.",
        },
        image: {
          type: 'object',
          description:
            'Refer to the <a href="/pattern-lab/patterns/20-elements-image/index.html">image element schema</a> for options.',
        },
      },
    },
  },
};
