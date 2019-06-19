import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../tooltip.schema.yml'));
const { direction, noWrap, spacing } = schema.properties;
const timeout = 60000;

describe('<bolt-tooltip> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('Basic usage', async () => {
    const results = await render('@bolt-components-tooltip/tooltip.twig', {
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
      const results = await render('@bolt-components-tooltip/tooltip.twig', {
        trigger: {
          type: 'button',
          text: 'Trigger text',
          icon: {
            name: 'info-open',
          },
        },
        content: 'Tooltip content.',
        direction: directionChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  noWrap.enum.forEach(async noWrapChoice => {
    test(`No wrapping for tooltip content: ${noWrapChoice}`, async () => {
      const results = await render('@bolt-components-tooltip/tooltip.twig', {
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
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`Direction of the tooltip bubble: ${spacingChoice}`, async () => {
      const results = await render('@bolt-components-tooltip/tooltip.twig', {
        trigger: {
          type: 'text',
          text: 'Trigger text',
          icon: {
            name: 'info-open',
          },
        },
        content: 'Tooltip content.',
        spacing: spacingChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
