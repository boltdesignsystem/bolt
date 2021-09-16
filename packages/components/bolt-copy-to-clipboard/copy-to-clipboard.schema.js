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
      type: 'any',
      description:
        'Text to use for the inital copy button.  Ignored if the custom_trigger property is used.',
      default: 'Copy Link',
    },
    text_to_copy: {
      type: 'any',
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
    text: {
      type: 'any',
      title: 'DEPRECATED',
      description: 'This property has been renamed <em>trigger_text</em>',
      default: 'Copy Link',
    },
    copiedText: {
      type: 'any',
      title: 'DEPRECATED',
      description:
        'Use the custom_confirmation property instead if you need to change the confirmation text.',
      default: 'Copied!',
    },
    iconSize: {
      type: 'any',
      title: 'DEPRECATED',
      description:
        'Use custom_trigger, custom_transition, and custom_confirmation properties if you need to change icon size.',
      default: 'medium',
    },
    url: {
      type: 'any',
      title: 'DEPRECATED',
      description: 'This property has been renamed <em>text_to_copy</em>',
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
