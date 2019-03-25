import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../share.schema.yml'));
const { size, opacity, align } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-share> Component', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  test('basic usage', async () => {
    const results = await renderTwig('@bolt-components-share/share.twig', {
      sources: [
        {
          name: 'facebook',
          url:
            'https://www.facebook.com/sharer/sharer.php?u=https://boltdesignsystem.com&amp;src=sdkpreparse',
        },
        {
          name: 'twitter',
          url:
            'https://twitter.com/intent/tweet?url=https://boltdesignsystem.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
        },
        {
          name: 'linkedin',
          url:
            'https://www.linkedin.com/shareArticle?url=https://boltdesignsystem.com',
        },
        {
          name: 'email',
          url:
            'mailto:?&body=Sample%20Text%20--%20https%3A//boltdesignsystem.com',
        },
      ],
      copy_to_clipboard: {
        text_to_copy: 'https://boltdesignsystem.com',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  size.enum.forEach(async sizeChoice => {
    test(`share size: ${sizeChoice}`, async () => {
      const results = await renderTwig('@bolt-components-share/share.twig', {
        size: sizeChoice,
        sources: [
          {
            name: 'facebook',
            url:
              'https://www.facebook.com/sharer/sharer.php?u=https://boltdesignsystem.com&amp;src=sdkpreparse',
          },
          {
            name: 'twitter',
            url:
              'https://twitter.com/intent/tweet?url=https://boltdesignsystem.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
          },
          {
            name: 'linkedin',
            url:
              'https://www.linkedin.com/shareArticle?url=https://boltdesignsystem.com',
          },
          {
            name: 'email',
            url:
              'mailto:?&body=Sample%20Text%20--%20https%3A//boltdesignsystem.com',
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  opacity.enum.forEach(async opacityChoice => {
    test(`share opacity: ${opacityChoice}`, async () => {
      const results = await renderTwig('@bolt-components-share/share.twig', {
        opacity: opacityChoice,
        sources: [
          {
            name: 'facebook',
            url:
              'https://www.facebook.com/sharer/sharer.php?u=https://boltdesignsystem.com&amp;src=sdkpreparse',
          },
          {
            name: 'twitter',
            url:
              'https://twitter.com/intent/tweet?url=https://boltdesignsystem.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
          },
          {
            name: 'linkedin',
            url:
              'https://www.linkedin.com/shareArticle?url=https://boltdesignsystem.com',
          },
          {
            name: 'email',
            url:
              'mailto:?&body=Sample%20Text%20--%20https%3A//boltdesignsystem.com',
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  align.enum.forEach(async alignChoice => {
    test(`share align: ${alignChoice}`, async () => {
      const results = await renderTwig('@bolt-components-share/share.twig', {
        align: alignChoice,
        sources: [
          {
            name: 'facebook',
            url:
              'https://www.facebook.com/sharer/sharer.php?u=https://boltdesignsystem.com&amp;src=sdkpreparse',
          },
          {
            name: 'twitter',
            url:
              'https://twitter.com/intent/tweet?url=https://boltdesignsystem.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
          },
          {
            name: 'linkedin',
            url:
              'https://www.linkedin.com/shareArticle?url=https://boltdesignsystem.com',
          },
          {
            name: 'email',
            url:
              'mailto:?&body=Sample%20Text%20--%20https%3A//boltdesignsystem.com',
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
