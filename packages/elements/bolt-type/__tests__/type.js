// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
// import schema from '../type.schema';
// const { [PROP KEY], [PROP KEY]... } = schema.properties;
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
    content: 'This is a type element',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Type element', () => {
  test('default', async () => {
    const results = await render('@bolt-elements-type/type.twig', {
      ...fixtures.defaultData,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
