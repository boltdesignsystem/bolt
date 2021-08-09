import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../shape.schema';
const { variant } = schema.properties;
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
    content: 'BDS',
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

describe('Bolt Shape Props', () => {
  variant.enum.forEach(async option => {
    test(`variant items: ${option}`, async () => {
      const results = await render('@bolt-elements-shape/shape.twig', {
        ...fixtures.defaultData,
        variant: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
