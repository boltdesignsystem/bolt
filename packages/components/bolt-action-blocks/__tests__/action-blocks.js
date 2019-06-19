import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../action-blocks.schema.yml'));
const { valign, borderless } = schema.properties;

const timeout = 60000;

describe('<bolt-action-blocks> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render(
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
  valign.enum.forEach(async valignChoice => {
    test(`Vertical alignment of each block's content: ${valignChoice}`, async () => {
      const results = await render(
        '@bolt-components-action-blocks/action-blocks.twig',
        {
          valign: valignChoice,
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

  borderless.enum.forEach(async borderlessChoice => {
    test(`Border in between each block: ${borderlessChoice}`, async () => {
      const results = await render(
        '@bolt-components-action-blocks/action-blocks.twig',
        {
          borderless: borderlessChoice,
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
