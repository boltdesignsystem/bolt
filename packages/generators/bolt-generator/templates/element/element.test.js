// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
// import schema from '../{{ kebabCase name }}.schema';
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
    content: 'This is a {{ lowerCase name }}',
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt {{ titleCase name }} element', () => {
  test('default', async () => {
    const results = await render(
      '@bolt-elements-{{ kebabCase name }}/{{ kebabCase name }}.twig',
      {
        ...fixtures.defaultData,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});

// describe('Bolt {{ titleCase name }} prop -', () => {
//   // Target each of the schema keys with the following pattern
//   [PROP KEY].enum.forEach(async (option) => {
//     test(`[PROP KEY] items: ${option}`, async () => {
//       const results = await render(
//         '@bolt-components-{{ kebabCase name }}/{{ kebabCase name }}.twig',
//         {
//           ...fixtures.defaultData,
//           [PROP KEY]: option,
//         }
//       );

//       await expect(results.ok).toBe(true);
//       await expect(results.html).toMatchSnapshot();
//     });
//   });
// });
