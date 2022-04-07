// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../dialog.schema';
// eslint-disable-next-line camelcase
const { width, spacing, theme, scroll_behavior } = schema.properties;
let page, fixtures;

afterAll(async () => {
  await stopServer();
  await page.close();
});

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
    content: 'This is a dialog',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Dialog component', () => {
  test('default', async () => {
    const results = await render('@bolt-components-dialog/dialog.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Dialog prop -', () => {
  width.enum.forEach(async option => {
    test(`width items: ${option}`, async () => {
      const results = await render('@bolt-components-dialog/dialog.twig', {
        ...fixtures.defaultData,
        width: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});

describe('Bolt Dialog prop -', () => {
  spacing.enum.forEach(async option => {
    test(`spacing items: ${option}`, async () => {
      const results = await render('@bolt-components-dialog/dialog.twig', {
        ...fixtures.defaultData,
        spacing: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});

describe('Bolt Dialog prop -', () => {
  theme.enum.forEach(async option => {
    test(`theme items: ${option}`, async () => {
      const results = await render('@bolt-components-dialog/dialog.twig', {
        ...fixtures.defaultData,
        theme: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});

describe('Bolt Dialog prop -', () => {
  scroll_behavior.enum.forEach(async option => {
    test(`scroll_behavior items: ${option}`, async () => {
      const results = await render('@bolt-components-dialog/dialog.twig', {
        ...fixtures.defaultData,
        scroll_behavior: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
