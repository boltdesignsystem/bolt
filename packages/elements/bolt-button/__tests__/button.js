import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../button.schema';
// eslint-disable-next-line camelcase
const { hierarchy, size, border_radius, display } = schema.properties;
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
    content: 'This is a button',
    attributes: {
      type: 'button',
    },
  };

  const icon = await render('@bolt-components-icon/icon.twig', {
    name: 'chevron-down',
  });

  fixtures = {
    defaultData,
    icon,
  };
});

describe('Bolt button', () => {
  // Without a Web Component
  test(`default`, async () => {
    const results = await render('@bolt-elements-button/button.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt button Props', () => {
  test(`icon after`, async () => {
    const results = await render('@bolt-elements-button/button.twig', {
      ...fixtures.defaultData,
      icon_after: fixtures.icon.html,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  hierarchy.enum.forEach(async option => {
    test(`hierarchy: ${option}`, async () => {
      const results = await render('@bolt-elements-button/button.twig', {
        ...fixtures.defaultData,
        hierarchy: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  size.enum.forEach(async option => {
    test(`size: ${option}`, async () => {
      const results = await render('@bolt-elements-button/button.twig', {
        ...fixtures.defaultData,
        size: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  border_radius.enum.forEach(async option => {
    test(`border_radius: ${option}`, async () => {
      const results = await render('@bolt-elements-button/button.twig', {
        ...fixtures.defaultData,
        border_radius: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  display.enum.forEach(async option => {
    test(`display: ${option}`, async () => {
      const results = await render('@bolt-elements-button/button.twig', {
        ...fixtures.defaultData,
        display: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
