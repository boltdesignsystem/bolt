// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../ratio.schema';
const { ratio } = schema.properties;
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
    content: 'This is a ratio',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Ratio', () => {
  test('default', async () => {
    const results = await render('@bolt-elements-ratio/ratio.twig', {
      ...fixtures.defaultData,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Ratio Prop -', () => {
  // Target each of the schema keys with the following pattern
  ratio.enum.forEach(async option => {
    test(`ratio items: ${option}`, async () => {
      const results = await render('@bolt-elements-ratio/ratio.twig', {
        ...fixtures.defaultData,
        ratio: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
