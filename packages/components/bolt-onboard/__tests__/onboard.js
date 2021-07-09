import { render, stopServer, renderWC } from '../../../testing/testing-helpers';
import schema from '../onboard.schema';
const componentSelector = 'bolt-onboard';
const { status, size, radius } = schema.properties;
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
    content: 'This is an onboard component',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt onboard', () => {
  // With a Web Component
  test(`default`, async () => {
    const results = await render('@bolt-components-onboard/onboard.twig', {
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

  // Without a Web Component
  test(`default`, async () => {
    const results = await render('@bolt-components-onboard/onboard.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt onboard prop -', () => {
  // Target each of the schema keys with the following pattern
  status.enum.forEach(async option => {
    test(`status: ${option}`, async () => {
      const results = await render('@bolt-components-onboard/onboard.twig', {
        ...fixtures.defaultData,
        status: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  size.enum.forEach(async option => {
    test(`size: ${option}`, async () => {
      const results = await render('@bolt-components-onboard/onboard.twig', {
        ...fixtures.defaultData,
        size: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  radius.enum.forEach(async option => {
    test(`radius: ${option}`, async () => {
      const results = await render('@bolt-components-onboard/onboard.twig', {
        ...fixtures.defaultData,
        radius: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
