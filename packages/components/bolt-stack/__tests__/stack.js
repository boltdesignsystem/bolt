import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../stack.schema.yml'));
const { spacing } = schema.properties;

const timeout = 120000;

describe('<bolt-stack> component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('basic usage', async () => {
    const results = await renderString(
      `
      {% include "@bolt-components-stack/stack.twig" with {
        content: "This is one stack. A stack spans the full width of its parent container."
      } only %}
      {% include "@bolt-components-stack/stack.twig" with {
        content: "This is another stack."
      } only %}
    `,
      {},
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('outer CSS class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-stack/stack.twig', {
      content: 'This is a stack',
      attributes: {
        class: ['u-bolt-color-teal'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  spacing.enum.forEach(async (spacingChoice) => {
    test(`stack spacing: ${spacingChoice}`, async () => {
      const results = await renderString(
        `
        {% include "@bolt-components-stack/stack.twig" with {
          spacing: spacingChoice,
          content: "This is one stack. A stack spans the full width of its parent container."
        } only %}
        {% include "@bolt-components-stack/stack.twig" with {
          spacing: spacingChoice,
          content: "This is another stack."
        } only %}
      `,
        {},
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
