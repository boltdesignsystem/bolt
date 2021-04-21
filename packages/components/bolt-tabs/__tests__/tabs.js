import { render, stopServer, renderWC } from '../../../testing/testing-helpers';
import schema from '../tabs.schema';
// eslint-disable-next-line camelcase
const { align, label_spacing, panel_spacing, inset } = schema.properties;
const componentSelector = 'bolt-tabs';
let page, fixtures;

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  await page.setViewport({ width: 600, height: 200 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const defaultData = {
    panels: [
      {
        label: 'Tab label 1',
        content: 'This is the tab content.',
      },
      {
        label: 'Tab label 2',
        content: 'This is the tab content.',
      },
      {
        label: 'Tab label 3',
        content: 'This is the tab content.',
      },
    ],
  };

  fixtures = {
    defaultData,
  };
});

afterAll(async () => {
  await stopServer();
  await page.close();
});

describe('Bolt Tabs', () => {
  test('default', async () => {
    const results = await render('@bolt-components-tabs/tabs.twig', {
      ...fixtures.defaultData,
    });

    const { innerHTML, outerHTML } = await renderWC(
      componentSelector,
      results.html,
      page,
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
    await expect(innerHTML).toMatchSnapshot();
    await expect(outerHTML).toMatchSnapshot();
  });
});

describe('Bolt Tabs Props', () => {
  align.enum.forEach(async option => {
    test(`align: ${option}`, async () => {
      const results = await render('@bolt-components-tabs/tabs.twig', {
        ...fixtures.defaultData,
        align: option,
      });

      const { innerHTML, outerHTML } = await renderWC(
        componentSelector,
        results.html,
        page,
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
      await expect(innerHTML).toMatchSnapshot();
      await expect(outerHTML).toMatchSnapshot();
    });
  });

  // eslint-disable-next-line camelcase
  label_spacing.enum.forEach(async option => {
    test(`label_spacing: ${option}`, async () => {
      const results = await render('@bolt-components-tabs/tabs.twig', {
        ...fixtures.defaultData,
        label_spacing: option,
      });

      const { innerHTML, outerHTML } = await renderWC(
        componentSelector,
        results.html,
        page,
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
      await expect(innerHTML).toMatchSnapshot();
      await expect(outerHTML).toMatchSnapshot();
    });
  });

  // eslint-disable-next-line camelcase
  panel_spacing.enum.forEach(async option => {
    test(`panel_spacing: ${option}`, async () => {
      const results = await render('@bolt-components-tabs/tabs.twig', {
        ...fixtures.defaultData,
        panel_spacing: option,
      });

      const { innerHTML, outerHTML } = await renderWC(
        componentSelector,
        results.html,
        page,
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
      await expect(innerHTML).toMatchSnapshot();
      await expect(outerHTML).toMatchSnapshot();
    });
  });

  inset.enum.forEach(async option => {
    test(`Inset: ${option}`, async () => {
      const results = await render('@bolt-components-tabs/tabs.twig', {
        ...fixtures.defaultData,
        inset: option,
      });

      const { innerHTML, outerHTML } = await renderWC(
        componentSelector,
        results.html,
        page,
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
      await expect(innerHTML).toMatchSnapshot();
      await expect(outerHTML).toMatchSnapshot();
    });
  });

  test('selected_tab', async () => {
    const results = await render('@bolt-components-tabs/tabs.twig', {
      ...fixtures.defaultData,
      selected_tab: 2,
    });

    const { innerHTML, outerHTML } = await renderWC(
      componentSelector,
      results.html,
      page,
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
    await expect(innerHTML).toMatchSnapshot();
    await expect(outerHTML).toMatchSnapshot();
  });

  // @todo NEEDS scrollOffsetSelector test
  // @todo NEEDS scrollOffset test
});
