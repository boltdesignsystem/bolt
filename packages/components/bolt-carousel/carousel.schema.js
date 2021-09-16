module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Carousel',
  description:
    'A web-component powered carousel component for cycling through a series of content such as images, text, or cards.',
  type: 'object',
  properties: {
    attributes: {
      title: 'Attributes (Twig-only)',
      type: 'object',
      description:
        'A Drupal attributes object. Used to apply with extra HTML attributes to the outer &lt;bolt-carousel&gt; tag.',
    },
    slides: {
      title: 'Slides (Twig-only)',
      type: 'array',
      description:
        'Array of content to include in the carousel. Note: each slide gets wrapped with a <code>&lt;bolt-carousel-slide&gt;</code> automatically.',
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
    max_slides_per_view: {
      type: 'integer',
      description:
        'Limits the maximum number of slides that can display at any screen size. Combine this with the <code>slidesPerView</code> option to get the benefits of automatically adjusting the number of slides displayed at different screen sizes while putting a max limit of how many slides display at once.',
      default: 4,
      minimum: 1,
      maximum: 4,
      hidden: true,
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
    no_pagination: {
      type: 'boolean',
      description:
        'Removes the pagination. Not recommended unless being used with an alternative UI to display carousel progress (such as custom thumbnail previews).',
      default: false,
      hidden: true,
    },
    no_scrollbar: {
      type: 'boolean',
      description:
        'Removes the scrollbar. Not recommended unless being used with an alternative UI to display carousel progress (such as custom thumbnail previews).',
      default: false,
      hidden: true,
    },
    no_min_width: {
      type: 'boolean',
      description:
        'Disables the slide min width logic. Typically not recommended unless being used with an alternative UI to display carousel progress (such as custom thumbnail previews).',
      default: false,
      hidden: true,
    },
    mode: {
      type: 'string',
      description:
        'Switches between the default carousel mode and the image gallery mode.',
      hidden: true,
      default: 'default',
      enum: ['default', 'gallery', 'gallery-thumbnail'],
    },
    no_nav_buttons: {
      type: 'boolean',
      description: 'Visually hide the previoius and next nav buttons.',
      default: false,
    },
    slide_to_clicked_slide: {
      type: 'boolean',
      description:
        'Set to true and click on any slide will produce transition to this slide.',
      default: false,
      hidden: true,
    },
    autoplay: {
      type: 'boolean',
      description:
        'Allows the carousel to automatically rotate through its slides until the user interacts with it.',
      default: false,
    },
    loop: {
      type: 'boolean',
      description:
        'Enables continuous loop mode.Not: the loop option is temporarily disabled and will be re-enabled in a future Bolt release.',
      hidden: true,
      default: false,
    },
    free_scroll: {
      type: 'boolean',
      description:
        'Enables content to be freely scrolled and flicked without snapping to an end position. Automatically switches off the pagination and switches on the scrollbar.',
      default: false,
    },
    prev_slide_message: {
      type: 'any',
      description: 'Accessible label for previous button.',
      default: 'Previous slide',
    },
    next_slide_message: {
      type: 'any',
      description: 'Accessible label for next button.',
      default: 'Next slide',
    },
    first_slide_message: {
      type: 'any',
      description:
        'Accessible label for the previous button when the carousel is on the first slide.',
      default: 'This is the first slide',
    },
    last_slide_message: {
      type: 'any',
      description:
        'Accessible label for previous button when the carousel is on the last slide.',
      default: 'This is the last slide',
    },
    pagination_bullet_message: {
      type: 'any',
      description: 'Accessible label for a single pagination bullet.',
      default: 'Go to slide {{index}}',
    },
  },
};
