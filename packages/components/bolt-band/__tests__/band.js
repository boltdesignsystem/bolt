import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../band.schema.yml'));
const { size, theme } = schema.properties;

const timeout = 60000;

describe('<bolt-band> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render('@bolt-components-band/band.twig', {
      content: 'This is a band.',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  size.enum.forEach(async sizeChoice => {
    test(`Size of the band: ${sizeChoice}`, async () => {
      const results = await render('@bolt-components-band/band.twig', {
        size: sizeChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async themeChoice => {
    test(`Theme of the band: ${themeChoice}`, async () => {
      const results = await render('@bolt-components-band/band.twig', {
        theme: themeChoice,
        content: 'This is a band.',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
