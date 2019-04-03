import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../band.schema.yml'));
const {
  size,
  theme,
  tag,
  full_bleed: fullBleed,
} = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-band> Component', () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await renderTwig('@bolt-components-band/band.twig', {
      content: 'This is a band.',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  size.enum.forEach(async sizeChoice => {
    test(`Size variations: ${sizeChoice}`, async () => {
      const results = await renderTwig('@bolt-components-band/band.twig', {
        size: sizeChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async themeChoice => {
    test(`Theme variations: ${themeChoice}`, async () => {
      const results = await renderTwig('@bolt-components-band/band.twig', {
        theme: themeChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  tag.enum.forEach(async tagChoice => {
    test(`Semantic tag usage: ${tagChoice}`, async () => {
      const results = await renderTwig('@bolt-components-band/band.twig', {
        tag: tagChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  fullBleed.enum.forEach(async fullBleedChoice => {
    test(`Full bleed: ${fullBleedChoice}`, async () => {
      const results = await renderTwig('@bolt-components-band/band.twig', {
        fullBleed: fullBleedChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`Pinned content`, async () => {
    const results = await renderTwig('@bolt-components-band/band.twig', {
      size: 'large',
      content: 'This is a band.',
      pinned_content: {
        upper: [
          {
            content: 'upper pinned 1',
          },
          {
            content: 'upper pinned 2',
          },
          {
            content: 'upper pinned 3',
          },
        ],
        lower: [
          {
            content: 'lower pinned 1',
          },
          {
            content: 'lower pinned 2',
          },
          {
            content: 'lower pinned 3',
          },
        ]
      }
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
