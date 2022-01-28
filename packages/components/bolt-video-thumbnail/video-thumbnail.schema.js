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
      type: 'any',
      description:
        'Display the video duration that overlays the video thumbnail. This should only be plain text.',
    },
    video_title: {
      type: 'any',
      description:
        'Display the video title that overlays the video thumbnail. This should only be plain text.',
    },
    chip: {
      type: 'any',
      description:
        'Display a chip (or chip-list) that overlays the video thumbnail. Positioned before the video title. Chip or Chip-list component is expected here.',
    },
  },
};
