import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../icon.schema';
const { size, color, name } = schema.properties;
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
    name: 'arrow-left',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Icon', () => {
  test(`default`, async () => {
    const results = await render('@bolt-elements-icon/icon.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Icon Props', () => {
  size.enum.forEach(async option => {
    test(`size items: ${option}`, async () => {
      const results = await render('@bolt-elements-icon/icon.twig', {
        ...fixtures.defaultData,
        size: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  color.enum.forEach(async option => {
    test(`color items: ${option}`, async () => {
      const results = await render('@bolt-elements-icon/icon.twig', {
        ...fixtures.defaultData,
        color: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});

describe('Bolt Icon SVG', () => {
  name.forEach(async option => {
    test(`[SVG: ${option}`, async () => {
      const results = await render('@bolt-elements-icon/icon.twig', {
        name: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
