module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Slideshow',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-slideshow&gt; tag.',
    },
    content: {
      type: 'any',
      description: 'Content of the Slideshow. Slides are expected here.',
    },
    slides_per_view: {
      type: 'string',
      description:
        'Controls the number of slides to be shown at once. Note: the value auto is deprecated, please be explicit.',
      default: '1',
      enum: ['1', '2', '3', '4'],
    },
    slides_per_group: {
      type: 'string',
      description: 'Controls the number of slides to be swiped at once.',
      default: 'auto',
      enum: ['auto', '1'],
    },
    space_between: {
      type: 'string',
      description: 'Controls the horizontal spacing between each slide.',
      default: 'medium',
      enum: ['none', 'small', 'medium'],
    },
    nav_button_position: {
      type: 'string',
      description:
        'Positions the previous and next buttons to either inside or outside of the carousel container.',
      default: 'inside',
      enum: ['inside', 'outside'],
    },
    overflow: {
      type: 'boolean',
      description: 'Makes overflowing carousel slides visible.',
      default: false,
    },
    no_nav_buttons: {
      type: 'boolean',
      description: 'Visually hide the previoius and next nav buttons.',
      default: false,
    },
    autoplay: {
      type: 'boolean',
      description:
        'Allows the carousel to automatically rotate through its slides until the user interacts with it.',
      default: false,
    },
    free_scroll: {
      type: 'boolean',
      description:
        'Enables content to be freely scrolled and flicked without snapping to an end position. Automatically switches off the pagination and switches on the scrollbar.',
      default: false,
    },
  },
};
