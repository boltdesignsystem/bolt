module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Video Thumbnail',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description:
        'Content of the video thumbnail. An image pointing to the video poster is recommended.',
    },
    border_radius: {
      type: 'string',
      description: 'Set the border radius of the video thumbnail.',
      enum: ['none', 'small', 'large'],
      default: 'none',
    },
    aspect_ratio: {
      type: 'string',
      description: 'Set the aspect ratio of the video thumbnail.',
      enum: ['1:1', '16:9', '4:3'],
      default: '16:9',
    },
    duration: {
      type: 'string',
      description:
        'Display the video duration that overlays the video thumbnail.',
    },
    video_title: {
      type: 'string',
      description: 'Set the video title that overlays the video thumbnail.',
    },
    chip: {
      type: 'any',
      description:
        'Set the chip or chip-list content to display in the top-left corner of the overlay.',
    },
  },
};
