const navbarItemSchema = require('./navbar-item.schema.js');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar title',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description:
        'Title text. Should be plain-text but may contain some HTML.',
    },
    tag: {
      type: 'string',
      default: 'h2',
      enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    icon: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the (optional) icon to be used.',
        },
      },
    },
    hide_title: {
      type: 'string',
      description:
        'Set the breakpoint at which you wish to hide the title text.',
      enum: ['from-xsmall-bp', 'from-small-bp'],
    },
    link: {
      type: 'object',
      description:
        'Make the Navbar title a link, used only on Pattern Lab homepage.',
      hidden: true,
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element. Add "href" attribute here.',
        },
      },
    },
  },
};
