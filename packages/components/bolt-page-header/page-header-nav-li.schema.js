module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Header Nav Li',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    link: {
      type: 'object',
      description:
        'Link of the nav li. Passing the "href" attribute will turn it into a semantic link. This prop will be overridden by the content prop.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
        },
        content: {
          type: ['string', 'array', 'object'],
          description: 'Content of the link.',
        },
        desktop_heading: {
          type: 'boolean',
          description:
            'Indicate if the link should also act as a heading for the children in desktop view. This has no effects in mobile view. This only applies if children is passed, nav ul category is set to "site", and nav ul is not flat.',
        },
      },
    },
    children: {
      type: 'object',
      description:
        'Append children for the nav li. Nav ul can be passed here. This must be used in tandem with link.',
    },
    content: {
      type: ['string', 'array', 'object'],
      description:
        'Content of the nav li. Use this only if the nav li is not a link, instead it is some kind of layouts such as a card. This prop will override the link prop.',
    },
    current: {
      type: 'boolean',
      description:
        'Set the nav li as the current item. This only applies if nav ul category is set to "site".',
      default: false,
    },
    full_width: {
      type: 'boolean',
      description:
        'Set the nav li width to full. This only applies if nav ul category is set to "site".',
      default: false,
    },
    view_all: {
      type: 'boolean',
      description:
        'Set the nav li as the "view all" item. This should only be used on "view all" links.',
      default: false,
    },
    popover: {
      type: 'boolean',
      description:
        'Indicate if the nav li is a popover. This only applies if nav ul category is set to "related-sites" or "user".',
      default: false,
    },
    selected: {
      type: 'boolean',
      description:
        'Set the nav li as the selected item. This only applies if nav ul category is set to "user" and the nav li is rendering the language select.',
      default: false,
    },
  },
};
