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

  const primaryButton = await render('@bolt-elements-button/button.twig', {
    content: 'This is a button',
    icon_only: exampleIcon.html,
    icon_only_tooltip: 'left',
    attributes: {
      type: 'button',
    },
  });

  const secondaryButton = await render('@bolt-elements-button/button.twig', {
    content: 'This is a button',
    heirarch: ' secondary',
    icon_only: exampleIcon.html,
    icon_only_tooltip: 'left',
    attributes: {
      type: 'button',
    },
  });

  const secondaryListItem = await render(
    '@bolt-components-floating-action-buttons/floating-action-buttons-li.twig',
    {
      content: secondaryButton.html,
    },
  );

  let secondaryContent = '';
  for (let i = 0; i < 3; i++) {
    secondaryContent = secondaryContent.concat(secondaryListItem.html);
  }

  const secondaryList = await render(
    '@bolt-components-floating-action-buttons/floating-action-buttons-ul.twig',
    {
      content: secondaryContent.html,
    },
  );

  const primaryListItem = await render(
    '@bolt-components-floating-action-buttons/floating-action-buttons-li.twig',
    {
      content: primaryButton.html,
    },
  );

  const toggleButton = await render(
    '@bolt-components-floating-action-buttons/floating-action-buttons-toggle-button.twig',
  );

  const toggleButtonListItem = await render(
    '@bolt-components-floating-action-buttons/floating-action-buttons-li.twig',
    {
      content: toggleButton.html,
      children: secondaryList.html,
    },
  );

  let primaryContent = '';
  primaryContent = primaryContent.concat(primaryListItem.html);
  primaryContent = primaryContent.concat(primaryListItem.html);
  primaryContent = primaryContent.concat(toggleButtonListItem.html);

  const primaryList = await render(
    '@bolt-components-floating-action-buttons/floating-action-buttons-ul.twig',
    {
      content: primaryContent,
    },
  );

  fixtures = {
    primaryList,
  };
});

describe('Bolt Floating Action Buttons', () => {
  test('default', async () => {
    const results = await render(
      '@bolt-components-floating-action-buttons/floating-action-buttons.twig',
      {
        content: fixtures.primaryList.html,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  position.enum.forEach(async option => {
    test(`position: ${option}`, async () => {
      const results = await render(
        '@bolt-components-floating-action-buttons/floating-action-buttons.twig',
        {
          content: fixtures.primaryList.html,
          position: option,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
