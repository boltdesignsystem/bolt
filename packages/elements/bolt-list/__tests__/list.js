// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../list.schema';
const { tag, display, spacing, align, valign, separator } = schema.properties;
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
    content: 'This is a list',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt List', () => {
  test('default', async () => {
    const results = await render('@bolt-elements-list/list.twig', {
      ...fixtures.defaultData,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt List prop -', () => {
  // Target each of the schema keys with the following pattern
  tag.enum.forEach(async option => {
    test(`tag: ${option}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        tag: option,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  display.enum.forEach(async option => {
    test(`display: ${option}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        display: option,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  spacing.enum.forEach(async option => {
    test(`spacing: ${option}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        spacing: option,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  align.enum.forEach(async option => {
    test(`horizontal align: ${option}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        align: option,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  valign.enum.forEach(async option => {
    test(`vertical align: ${option}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        valign: option,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  separator.enum.forEach(async option => {
    test(`separator: ${option}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        separator: option,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  [true, false].forEach(async insetOption => {
    test(`inset: ${insetOption}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        inset: insetOption,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  [true, false].forEach(async nowrapOption => {
    test(`no wrapping: ${nowrapOption}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        nowrap: nowrapOption,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  [true, false].forEach(async fullWidthOption => {
    test(`full width option: ${fullWidthOption}`, async () => {
      const results = await render('@bolt-components-list/list.twig', {
        ...fixtures.defaultData,
        inline_full_width: fullWidthOption,
        items: ['item 1', 'item 2', 'item 3'],
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
