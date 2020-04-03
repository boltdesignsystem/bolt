import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../menu.schema';
const { spacing, title } = schema.properties;
const timeout = 120000;

describe('<bolt-menu> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  // Basic Usage
  test('basic usage', async () => {
    const results = await render('@bolt-components-menu/menu.twig', {
      title: 'Menu title',
      items: [
        {
          content: 'Menu item 1',
        },
        {
          content: 'Menu item 2',
          url: 'https://pega.com',
        },
        {
          content: 'Menu item 2',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Props
  spacing.enum.forEach(async (spacingChoice) => {
    test(`menu item spacing: ${spacingChoice}`, async () => {
      const results = await render('@bolt-components-menu/menu.twig', {
        spacing: spacingChoice,
        items: [
          {
            content: 'Menu item 1',
          },
          {
            content: 'Menu item 2',
          },
          {
            content: 'Menu item 2',
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
