import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../band.schema.yml'));
const { size, theme } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-band> Component', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await renderTwig(
      '@bolt-components-band/band.twig',
      {
        content: 'This is a band.'
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  size.enum.forEach(async sizeChoice => {
    test(`Size of the band: ${sizeChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-band/band.twig',
        {
          size: sizeChoice,
          content: 'This is a band.'
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async themeChoice => {
    test(`Theme of the band: ${themeChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-band/band.twig',
        {
          theme: themeChoice,
          content: 'This is a band.'
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
