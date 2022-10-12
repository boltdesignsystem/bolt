module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Copy to Clipboard',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    trigger_text: {
      type: 'string',
      description:
        'Text to use for the inital copy button.  Ignored if the custom_trigger property is used.',
      default: 'Copy Link',
    },
    text_to_copy: {
      type: 'string',
      description: 'The text to copy to the clipboard.',
    },
    custom_trigger: {
      type: ['string', 'object', 'array'],
      description:
        "(optional) Custom content to show for the initial copy trigger.  If you pass a link, set the URL to '#!' since it should not being followed.",
    },
    custom_transition: {
      type: ['string', 'object', 'array'],
      description:
        "(optional) Custom content to show while copy is in progress.  This content will be rotated while the copying happens, so it's recommended to pass an icon.",
    },
    custom_confirmation: {
      type: ['string', 'object', 'array'],
      description: '(optional) Custom content to show after a successful copy.',
    },
  },
  required: ['text_to_copy'],
  not: {
    anyOf: [
      {
        required: ['iconSize'],
      },
      {
        required: ['copiedText'],
      },
      {
        required: ['text'],
      },
      {
        required: ['url'],
      },
    ],
  },
};
