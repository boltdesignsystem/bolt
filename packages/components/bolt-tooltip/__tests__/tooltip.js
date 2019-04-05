import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../tooltip.schema.yml'));
const { direction, noWrap, spacing } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('<bolt-tooltip> Component', () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await renderTwig('@bolt-components-tooltip/tooltip.twig', {
      trigger: {
        type: 'text',
        text: 'Trigger text',
        icon: {
          name: 'info-open',
        },
      },
      content: 'Tooltip content.',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  direction.enum.forEach(async directionChoice => {
    test(`Direction of the tooltip bubble: ${directionChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-tooltip/tooltip.twig',
        {
          trigger: {
            type: 'button',
            text: 'Trigger text',
            icon: {
              name: 'info-open',
            },
          },
          content: 'Tooltip content.',
          direction: directionChoice,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  noWrap.enum.forEach(async noWrapChoice => {
    test(`No wrapping for tooltip content: ${noWrapChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-tooltip/tooltip.twig',
        {
          trigger: {
            type: 'text',
            text: 'Trigger text',
            icon: {
              name: 'info-open',
            },
          },
          content:
            'Tooltip content. This text should wrap if noWrap is set to false, otherwise it should not wrap.',
          noWrap: noWrapChoice,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`Direction of the tooltip bubble: ${spacingChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-tooltip/tooltip.twig',
        {
          trigger: {
            type: 'text',
            text: 'Trigger text',
            icon: {
              name: 'info-open',
            },
          },
          content: 'Tooltip content.',
          spacing: spacingChoice,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
