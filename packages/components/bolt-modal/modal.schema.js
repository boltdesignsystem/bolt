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
    persistent: {
      description:
        'Enables the modal to be persistent. This will eliminate ways to close the modal and it is up to the author to provide a custom link to close the modal or redirect to another page within the modal content. Must be used in tandem with the <code>persistent_return_url</code> prop.',
      type: 'boolean',
      default: false,
    },
    persistent_return_url: {
      type: 'string',
      description:
        'The URL to be used on a return link. If a modal is persistent, a return link is required to provide the user a way out. Must be used in tandem with the <code>persistent</code> prop.',
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
