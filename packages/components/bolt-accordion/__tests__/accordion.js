import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../accordion.schema.yml'));
const { multiple, spacing } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-accordion> Component', () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  test('basic usage', async () => {
    const results = await renderTwig(
      '@bolt-components-accordion/accordion.twig',
      {
        items: [
          {
            trigger: 'Accordion item 1',
            content: 'This is the accordion content.',
          },
          {
            trigger: 'Accordion item 2',
            content: 'This is the accordion content.',
          },
          {
            trigger: 'Accordion item 3',
            content: 'This is the accordion content.',
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  multiple.enum.forEach(async multipleChoice => {
    test(`expand multiple items: ${multipleChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-accordion/accordion.twig',
        {
          multiple: multipleChoice,
          items: [
            {
              trigger: 'Accordion item 1',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 2',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 3',
              content: 'This is the accordion content.',
            },
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`spacing: ${spacingChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-accordion/accordion.twig',
        {
          spacing: spacingChoice,
          items: [
            {
              trigger: 'Accordion item 1',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 2',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 3',
              content: 'This is the accordion content.',
            },
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
