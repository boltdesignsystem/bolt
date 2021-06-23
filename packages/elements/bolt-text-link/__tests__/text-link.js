import { render, stopServer } from '../../../testing/testing-helpers';
// import schema from '../text-link.schema';
// const { hierarchy, size, border_radius, display } = schema.properties;
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

  const defaultData = {
    content: 'This is a text link',
    attributes: {
      href: 'https://pega.com',
      target: '_blank',
    },
  };

  const icon = await render('@bolt-components-icon/icon.twig', {
    name: 'chevron-right',
  });

  fixtures = {
    defaultData,
    icon,
  };
});

describe('Bolt text-link', () => {
  test(`default`, async () => {
    const results = await render('@bolt-elements-text-link/text-link.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt text-link Props', () => {
  test(`icon after`, async () => {
    const results = await render('@bolt-elements-text-link/text-link.twig', {
      ...fixtures.defaultData,
      icon_after: fixtures.icon.html,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`reverse underline`, async () => {
    const results = await render('@bolt-elements-text-link/text-link.twig', {
      ...fixtures.defaultData,
      reversed_underline: 'true',
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
