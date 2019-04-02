import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../pagination.schema.yml'));
const { align } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-pagination> Component', () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await renderTwig(
      '@bolt-components-pagination/pagination.twig',
      {
        current: 5,
        total: 10,
        first: {
          href: '#!',
        },
        previous: {
          href: '#!',
        },
        pages: {
          3: {
            href: '#!',
          },
          4: {
            href: '#!',
          },
          5: {
            href: '#!',
          },
          6: {
            href: '#!',
          },
          7: {
            href: '#!',
          },
        },
        next: {
          href: '#!',
        },
        last: {
          href: '#!',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  align.enum.forEach(async alignChoice => {
    test(`Horizontal alignment: ${alignChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-pagination/pagination.twig',
        {
          align: alignChoice,
          current: 1,
          total: 5,
          pages: {
            1: {
              href: '#!',
            },
            2: {
              href: '#!',
            },
            3: {
              href: '#!',
            },
            4: {
              href: '#!',
            },
            5: {
              href: '#!',
            },
          },
          next: {
            href: '#!',
          },
          last: {
            href: '#!',
          },
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
