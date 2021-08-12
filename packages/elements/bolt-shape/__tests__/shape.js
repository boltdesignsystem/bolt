import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../shape.schema';
// eslint-disable-next-line camelcase
const { border_radius, spacing, size } = schema.properties;
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
    content: 'This is a shape',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Shape', () => {
  test(`default`, async () => {
    const results = await render('@bolt-elements-shape/shape.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Shape Prop -', () => {
  border_radius.enum.forEach(async option => {
    test(`border_radius items: ${option}`, async () => {
      const results = await render('@bolt-elements-shape/shape.twig', {
        ...fixtures.defaultData,
        border_radius: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  spacing.enum.forEach(async option => {
    test(`spacing: ${option}`, async () => {
      const results = await render('@bolt-components-banner/banner.twig', {
        ...fixtures.defaultData,
        spacing: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
  size.enum.forEach(async option => {
    test(`size: ${option}`, async () => {
      const results = await render('@bolt-components-banner/banner.twig', {
        ...fixtures.defaultData,
        size: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
