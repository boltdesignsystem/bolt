import { render, stopServer, renderWC } from '../../../testing/testing-helpers';
import schema from '../blockquote.schema';
const componentSelector = 'bolt-blockquote';
const { size, alignItems, border } = schema.properties;
const languages = ['en', 'de', 'fr', 'ja'];
let page, fixtures;

afterAll(async () => {
  await stopServer();
  await page.close();
}, 100);

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  await page.setViewport({ width: 800, height: 400 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const defaultData = {
    author: {
      name: 'Michelangelo di Lodovico Buonarroti Simoni',
      title: 'Renaissance Artist',
    },
    content:
      '<p>The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark.</p>',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Blockquote', () => {
  test(`default`, async () => {
    const results = await render(
      '@bolt-components-blockquote/blockquote.twig',
      {
        ...fixtures.defaultData,
      },
    );

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

describe('Bolt Blockquote Props', () => {
  alignItems.enum.forEach(async option => {
    test(`align items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          ...fixtures.defaultData,
          alignItems: option,
        },
      );

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

  size.enum.forEach(async option => {
    test(`size: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          ...fixtures.defaultData,
          size: option,
        },
      );

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

  border.enum.forEach(async option => {
    test(`border: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          ...fixtures.defaultData,
          border: option,
        },
      );

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
});

describe('Bolt Blockquote Language', () => {
  languages.forEach(async option => {
    test(`language: ${option}`, async () => {
      const results = await render(
        '@bolt-components-blockquote/blockquote.twig',
        {
          ...fixtures.defaultData,
          lang: option,
        },
      );

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
});
