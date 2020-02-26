// const iconSchema = require('@bolt/components-icon/icon.schema.json');

// iconSchema.properties = {
//   position: {
//     description: 'Where to position the icon within the button',
//     type: 'string',
//     default: 'after',
//     enum: ['before', 'after'],
//   },
//   ...iconSchema.properties,
// };

// iconSchema.description =
//   'Icon data as expected by the icon component. Accepts an additional position prop that determines placement within the button.';

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Hero',
  description: 'Prominently display content and imagery within a Band',
  type: 'object',
  properties: {
    content: {
      type: ['string', 'array', 'object'],
      description: 'content to display in the Hero',
    },
    theme: {
      type: 'string',
      description: 'Color theme to use within the Hero.',
      default: 'none',
      enum: ['xlight', 'light', 'dark', 'xdark', 'none'],
    },
    background: {
      type: 'string',
      description:
        'path to a background image that displays underneath the content / foreground image in the Hero.',
    },
    image: {
      type: 'string',
      description:
        'path to a foreground image that  displays along-side the other Hero content.',
    },
    imageAlign: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      description: "Adjusts the Hero Image's horizontal alignment",
      default: 'center',
      hidden: true,
    },
    imageValign: {
      type: 'string',
      description: "Adjusts the Hero Image's vertical alignment",
      default: 'middle',
      enum: ['top', 'middle', 'bottom'],
    },
    imageMinWidth: {
      description: 'Customizes the min width of the Hero Image',
      default: 'none',
      type: 'string',
      hidden: true,
    },
    imageMaxWidth: {
      description: 'Customizes the maximum width of the Hero Image',
      default: '450px',
      type: 'string',
      hidden: true,
    },
    mobileOrder: {
      type: 'string',
      description: 'Swaps the order of content / image on smaller screens',
      enum: ['image-before-content', 'content-before-image'],
      default: 'image-before-content',
      hidden: true,
    },
    desktopOrder: {
      type: 'string',
      description: 'Swaps the order of content / image on larger screens',
      enum: ['image-before-content', 'content-before-image'],
      default: 'content-before-image',
      hidden: true,
    },
  },
};
