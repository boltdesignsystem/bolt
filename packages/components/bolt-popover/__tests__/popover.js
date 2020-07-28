import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../popover.schema';
const { placement, spacing, theme, uuid } = schema.properties;
const timeout = 120000;

describe('<bolt-popover> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('basic usage', async () => {
    const results = await render('@bolt-components-popover/popover.twig', {
      trigger: '<bolt-button>This triggers a popover</bolt-button>',
      content:
        'This is the content of the popover with a <bolt-link url="https://pega.com">call to action</bolt-link>.',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  placement.enum.forEach(async placementChoice => {
    test(`content placement: ${placementChoice}`, async () => {
      const results = await render('@bolt-components-popover/popover.twig', {
        trigger: '<bolt-button>This triggers a popover</bolt-button>',
        content:
          'This is the content of the popover with a <bolt-link url="https://pega.com">call to action</bolt-link>.',
        placement: placementChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`content spacing: ${spacingChoice}`, async () => {
      const results = await render('@bolt-components-popover/popover.twig', {
        trigger: '<bolt-button>This triggers a popover</bolt-button>',
        content:
          'This is the content of the popover with a <bolt-link url="https://pega.com">call to action</bolt-link>.',
        spacing: spacingChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async themeChoice => {
    test(`content theme: ${themeChoice}`, async () => {
      const results = await render('@bolt-components-popover/popover.twig', {
        trigger: '<bolt-button>This triggers a popover</bolt-button>',
        content:
          'This is the content of the popover with a <bolt-link url="https://pega.com">call to action</bolt-link>.',
        theme: themeChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`UUID of the popover`, async () => {
    const results = await render('@bolt-components-popover/popover.twig', {
      trigger: '<bolt-button>This triggers a popover</bolt-button>',
      content:
        'This is the content of the popover with a <bolt-link url="https://pega.com">call to action</bolt-link>.',
      uuid: 'custom-unique-id',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
