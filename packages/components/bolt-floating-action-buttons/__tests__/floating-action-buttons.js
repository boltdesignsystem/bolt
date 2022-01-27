import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../floating-action-buttons.schema';
// eslint-disable-next-line camelcase
const { position, show_on_scroll } = schema.properties;
let page, fixtures;

afterAll(async () => {
  await stopServer();
  await page.close();
}, 100);

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const exampleIcon = await render('@bolt-elements-icon/icon.twig', {
    name: 'rocket',
  });

  const exampleButton = await render('@bolt-elements-button/button.twig', {
    content: 'This is a button',
    icon_only: exampleIcon.html,
    attributes: {
      type: 'button',
    },
  });

  const exampleItem = await render(
    '@bolt-components-floating-action-buttons/floating-action-buttons-item.twig',
    {
      content: exampleButton.html,
    },
  );

  let defaultContent = '';

  for (let i = 0; i < 5; i++) {
    defaultContent = defaultContent.concat(exampleItem.html);
  }

  fixtures = {
    defaultContent,
  };
});

describe('Bolt Floating Action Buttons', () => {
  test('default', async () => {
    const results = await render(
      '@bolt-components-floating-action-buttons/floating-action-buttons.twig',
      {
        content: fixtures.defaultContent,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('show_on_scroll', async () => {
    const results = await render(
      '@bolt-components-floating-action-buttons/floating-action-buttons.twig',
      {
        content: fixtures.defaultContent,
        schow_on_scroll: '200px',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  position.enum.forEach(async (option) => {
    test(`position: ${option}`, async () => {
      const results = await render(
        '@bolt-components-floating-action-buttons/floating-action-buttons.twig',
        {
          content: fixtures.defaultContent,
          position: option,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
