// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, stopServer } from '../../../testing/testing-helpers';
// import schema from '../profile.schema';
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
    name: {
      content: '<strong>First Last</strong> (@username)',
      tag: 'h2',
    },
    job_title: 'Job Title',
    location: 'Location',
    stats: [
      {
        number: '15',
        label: 'Achievements',
        attributes: {
          type: 'button',
        },
      },
      {
        number: '3k',
        label: 'Contributions',
        attributes: {
          href: '#!',
        },
      },
    ],
    message: {
      label: 'Send message',
      attributes: {
        href: '#!',
      },
    },
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Profile component', () => {
  test('default', async () => {
    const results = await render('@bolt-components-profile/profile.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

// describe('Bolt Profile prop -', () => {
//   // Target each of the schema keys with the following pattern
//   [PROP KEY].enum.forEach(async (option) => {
//     test(`[PROP KEY] items: ${option}`, async () => {
//       const results = await render(
//         '@bolt-components-profile/profile.twig',
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
