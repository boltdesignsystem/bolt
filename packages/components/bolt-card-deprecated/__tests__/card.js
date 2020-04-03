import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../card.schema.yml'));
const { tag, contentTag, theme } = schema.properties;

describe('<bolt-card> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('basic usage', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      contentItems: [
        {
          pattern: 'image',
          src: '/fixtures/landscape-16x9-mountains.jpg',
          lazyload: false,
          alt: 'Anthem Video',
        },
        {
          pattern: 'eyebrow',
          text: 'Video',
        },
        {
          pattern: 'headline',
          tag: 'h3',
          size: 'large',
          text: 'Anthem: Service Desktop',
        },
        {
          pattern: 'text',
          text:
            'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
        },
        {
          pattern: 'button',
          text: 'Get the report',
          url: '#!',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with two buttons in footer', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      contentItems: [
        {
          pattern: 'image',
          src: '/fixtures/landscape-16x9-mountains.jpg',
          lazyload: false,
          alt: 'Anthem Video',
        },
        {
          pattern: 'eyebrow',
          text: 'Video',
        },
        {
          pattern: 'headline',
          tag: 'h3',
          size: 'large',
          text: 'Anthem: Service Desktop',
        },
        {
          pattern: 'text',
          text:
            'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
        },
        {
          pattern: 'button',
          text: 'Get the report',
          url: '#!',
        },
        {
          pattern: 'button',
          text: 'Get the second report',
          url: '#!',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with video in header', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      contentItems: [
        {
          pattern: 'video',
          videoId: '5609376179001',
          accountId: '1900410236',
          playerId: 'r1CAdLzTW',
          showMeta: true,
          showMetaTitle: false,
          videoUuid: 'js-bolt-video-uuid--3c',
        },
        {
          pattern: 'eyebrow',
          text: 'Video',
        },
        {
          pattern: 'headline',
          tag: 'h3',
          size: 'large',
          text: 'Anthem: Service Desktop',
        },
        {
          pattern: 'text',
          text:
            'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
        },
        {
          pattern: 'button',
          text: 'Play or Pause',
          attributes: {
            'on-click': 'toggle',
            'on-click-target': 'js-bolt-video-uuid--3c',
          },
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('without footer', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      contentItems: [
        {
          pattern: 'image',
          src: '/fixtures/landscape-16x9-mountains.jpg',
          lazyload: false,
          alt: 'Anthem Video',
        },
        {
          pattern: 'eyebrow',
          text: 'Video',
        },
        {
          pattern: 'headline',
          tag: 'h3',
          size: 'large',
          text: 'Anthem: Service Desktop',
        },
        {
          pattern: 'text',
          text:
            'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('without footer and media', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      contentItems: [
        {
          pattern: 'eyebrow',
          text: 'Video',
        },
        {
          pattern: 'headline',
          tag: 'h3',
          size: 'large',
          text: 'Anthem: Service Desktop',
        },
        {
          pattern: 'text',
          text:
            'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('only text', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      contentItems: [
        {
          pattern: 'headline',
          tag: 'h3',
          size: 'large',
          text: 'Anthem: Service Desktop',
        },
        {
          pattern: 'text',
          text:
            'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  tag.enum.forEach(async (option) => {
    test(`tag variations: ${option}`, async () => {
      const results = await render('@bolt-components-card/card.twig', {
        tag: option,
        contentItems: [
          {
            pattern: 'image',
            src: '/fixtures/landscape-16x9-mountains.jpg',
            lazyload: false,
            alt: 'Anthem Video',
          },
          {
            pattern: 'eyebrow',
            text: 'Video',
          },
          {
            pattern: 'headline',
            tag: 'h3',
            size: 'large',
            text: 'Anthem: Service Desktop',
          },
          {
            pattern: 'text',
            text:
              'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
          },
          {
            pattern: 'button',
            text: 'Get the report',
            url: '#!',
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('add clickable functionality', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      url: '#!',
      contentItems: [
        {
          pattern: 'image',
          src: '/fixtures/landscape-16x9-mountains.jpg',
          lazyload: false,
          alt: 'Anthem Video',
        },
        {
          pattern: 'eyebrow',
          text: 'Video',
        },
        {
          pattern: 'headline',
          tag: 'h3',
          size: 'large',
          text: 'Anthem: Service Desktop',
        },
        {
          pattern: 'text',
          text:
            'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
        },
        {
          pattern: 'button',
          text: 'Get the report',
          url: '#!',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  contentTag.enum.forEach(async (option) => {
    test(`content tag variations: ${option}`, async () => {
      const results = await render('@bolt-components-card/card.twig', {
        contentTag: option,
        contentItems: [
          {
            pattern: 'image',
            src: '/fixtures/landscape-16x9-mountains.jpg',
            lazyload: false,
            alt: 'Anthem Video',
          },
          {
            pattern: 'eyebrow',
            text: 'Video',
          },
          {
            pattern: 'headline',
            tag: 'h3',
            size: 'large',
            text: 'Anthem: Service Desktop',
          },
          {
            pattern: 'text',
            text:
              'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
          },
          {
            pattern: 'button',
            text: 'Get the report',
            url: '#!',
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async (option) => {
    test(`theme variations: ${option}`, async () => {
      const results = await render('@bolt-components-card/card.twig', {
        theme: option,
        contentItems: [
          {
            pattern: 'image',
            src: '/fixtures/landscape-16x9-mountains.jpg',
            lazyload: false,
            alt: 'Anthem Video',
          },
          {
            pattern: 'eyebrow',
            text: 'Video',
          },
          {
            pattern: 'headline',
            tag: 'h3',
            size: 'large',
            text: 'Anthem: Service Desktop',
          },
          {
            pattern: 'text',
            text:
              'Anthem debuts its next-generation service desktop, driving frictionless customer experiences.',
          },
          {
            pattern: 'button',
            text: 'Get the report',
            url: '#!',
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
