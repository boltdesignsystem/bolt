import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../tile.schema.yml'));
const { media, body, actions, tag, link, theme } = schema.properties;

describe('<bolt-tile> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('basic usage', async () => {
    const results = await render('@bolt-components-tile/tile.twig', {
      media: {
        image: {
          src: '/fixtures/landscape-16x9-mountains.jpg',
          alt: 'Image alt.',
        },
      },
      body: {
        eyebrow: 'This is an eyebrow',
        headline: 'This is a headline',
        paragraph: 'This is a paragraph.',
      },
      actions: [
        {
          text: 'This is a button',
          url: 'https://pega.com',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with two buttons as actions', async () => {
    const results = await render('@bolt-components-tile/tile.twig', {
      media: {
        image: {
          src: '/fixtures/landscape-16x9-mountains.jpg',
          alt: 'Image alt.',
        },
      },
      body: {
        eyebrow: 'This is an eyebrow',
        headline: 'This is a headline',
        paragraph: 'This is a paragraph.',
      },
      actions: [
        {
          text: 'This is the 1st button',
          url: 'https://pega.com',
        },
        {
          text: 'This is the 2nd button',
          url: 'https://google.com',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with video as media', async () => {
    const results = await render('@bolt-components-tile/tile.twig', {
      link: {
        attributes: {
          'on-click': 'toggle',
          'on-click-target': 'js-bolt-video-uuid',
        },
      },
      media: {
        video: {
          videoId: '5609376179001',
          accountId: '1900410236',
          playerId: 'r1CAdLzTW',
          videoUuid: 'js-bolt-video-uuid',
          showMeta: true,
          showMetaTitle: false,
        },
      },
      body: {
        headline: 'With link and video',
        paragraph:
          'This tile has a link, which makes the whole tile clickable, and you can make it play/pause the video. Action button is optional in this case.',
      },
      actions: [
        {
          text: 'This button is video control',
          attributes: {
            'on-click': 'toggle',
            'on-click-target': 'js-bolt-video-uuid',
          },
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('without actions', async () => {
    const results = await render('@bolt-components-tile/tile.twig', {
      media: {
        image: {
          src: '/fixtures/landscape-16x9-mountains.jpg',
          alt: 'Image alt.',
        },
      },
      body: {
        eyebrow: 'This is an eyebrow',
        headline: 'This is a headline',
        paragraph: 'This is a paragraph.',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('without media and actions', async () => {
    const results = await render('@bolt-components-tile/tile.twig', {
      body: {
        eyebrow: 'This is an eyebrow',
        headline: 'This is a headline',
        paragraph: 'This is a paragraph.',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  tag.enum.forEach(async option => {
    test(`tag variations: ${option}`, async () => {
      const results = await render('@bolt-components-tile/tile.twig', {
        tag: option,
        media: {
          image: {
            src: '/fixtures/landscape-16x9-mountains.jpg',
            alt: 'Image alt.',
          },
        },
        body: {
          eyebrow: 'This is an eyebrow',
          headline: 'This is a headline',
          paragraph: 'This is a paragraph.',
        },
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('clickable tile', async () => {
    const results = await render('@bolt-components-tile/tile.twig', {
      link: {
        url: 'https://pega.com',
        text: 'This entire tile is clickable',
      },
      media: {
        image: {
          src: '/fixtures/landscape-16x9-mountains.jpg',
          alt: 'Image alt.',
        },
      },
      body: {
        eyebrow: 'This is an eyebrow',
        headline: 'This is a headline',
        paragraph: 'This is a paragraph.',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  theme.enum.forEach(async option => {
    test(`theme variations: ${option}`, async () => {
      const results = await render('@bolt-components-tile/tile.twig', {
        theme: option,
        media: {
          image: {
            src: '/fixtures/landscape-16x9-mountains.jpg',
            alt: 'Image alt.',
          },
        },
        body: {
          eyebrow: 'This is an eyebrow',
          headline: 'This is a headline',
          paragraph: 'This is a paragraph.',
        },
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
