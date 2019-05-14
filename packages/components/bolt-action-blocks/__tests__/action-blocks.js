import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../action-blocks.schema.yml'));
const { align, border } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-action-blocks> Component', () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await renderTwig(
      '@bolt-components-action-blocks/action-blocks.twig',
      {
        contentItems: [
          {
            text: 'Item 1',
            url: '#!',
            icon: {
              name: 'download',
              size: 'large',
            },
          },
          {
            text: 'Item 2',
            url: '#!',
            icon: {
              name: 'copy-to-clipboard',
              size: 'large',
            },
          },
          {
            text: 'Item 3',
            url: '#!',
            icon: {
              name: 'calendar',
              size: 'large',
            },
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  align.enum.forEach(async alignChoice => {
    test(`Vertical alignment of each block's content: ${alignChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-action-blocks/action-blocks.twig',
        {
          align: alignChoice,
          contentItems: [
            {
              text: 'Item 1',
              url: '#!',
              icon: {
                name: 'download',
                size: 'large',
              },
            },
            {
              text:
                'Item 2: this item has more text, so it can demonstrate the vertical alignment',
              url: '#!',
              icon: {
                name: 'copy-to-clipboard',
                size: 'large',
              },
            },
            {
              text: 'Item 3',
              url: '#!',
              icon: {
                name: 'calendar',
                size: 'large',
              },
            },
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  border.enum.forEach(async borderChoice => {
    test(`Border in between each block: ${borderChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-action-blocks/action-blocks.twig',
        {
          border: borderChoice,
          contentItems: [
            {
              text: 'Item 1',
              url: '#!',
              icon: {
                name: 'download',
                size: 'large',
              },
            },
            {
              text: 'Item 2',
              url: '#!',
              icon: {
                name: 'copy-to-clipboard',
                size: 'large',
              },
            },
            {
              text: 'Item 3',
              url: '#!',
              icon: {
                name: 'calendar',
                size: 'large',
              },
            },
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
