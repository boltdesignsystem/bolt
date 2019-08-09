import { render } from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../chip.schema.yml'));
const { url, target, icon, spacing } = schema.properties;

describe('chip', () => {
  test('basic usage', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'Hello World',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('url usage', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'Has URL',
      url: 'https://pega.com',
      target: '_blank',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('icon usage', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'Icon before',
      icon: {
        name: 'check',
        position: 'before',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  spacing.enum.forEach(async option => {
    test(`chip spacing: ${option}`, async () => {
      const results = await render('@bolt-components-chip/chip.twig', {
        text: 'Chip spacing',
        spacing: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
