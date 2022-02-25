// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../table.schema';
// const { borderless, sticky_headers } = schema.properties;
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
    content: 'This is a table',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Responsive Table component', () => {
  test('default', async () => {
    const results = await render(
      '@bolt-components-responsive-table/table.twig',
      {
        ...fixtures.defaultData,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
