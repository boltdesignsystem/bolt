// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
// import schema from '../info-section.schema';
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
    label: {
      content: 'This is an info section',
      tag: 'h2',
    },
    content:
      'This is the section content. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit labore hic officia maiores ut sequi ipsam nihil repudiandae numquam quidem, molestiae amet aliquid sapiente sed odio quo aspernatur mollitia a.',
    details_link: {
      label: 'This is the details link',
      attributes: {
        type: 'button',
      },
    },
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Info Section component', () => {
  test('default', async () => {
    const results = await render(
      '@bolt-components-info-section/info-section.twig',
      {
        ...fixtures.defaultData,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

// describe('Bolt Info Section prop -', () => {
//   // Target each of the schema keys with the following pattern
//   [PROP KEY].enum.forEach(async (option) => {
//     test(`[PROP KEY] items: ${option}`, async () => {
//       const results = await render(
//         '@bolt-components-info-section/info-section.twig',
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
