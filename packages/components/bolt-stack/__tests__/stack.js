import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../stack.schema.yml'));
const { spacing } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-stack> component', () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  test('basic usage', async () => {
    const results = await renderTwig('@bolt-components-stack/stack.twig', {
      content: 'This is a stack',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('outer CSS class via Drupal Attributes', async () => {
    const results = await renderTwig('@bolt-components-stack/stack.twig', {
      content: 'This is a stack',
      attributes: {
        class: ['u-bolt-color-teal'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`stack spacing: ${spacingChoice}`, async () => {
      const results = await renderTwig('@bolt-components-stack/stack.twig', {
        spacing: spacingChoice,
        content: 'This is a stack',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
