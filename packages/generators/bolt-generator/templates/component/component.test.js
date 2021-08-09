// Refer to https://github.com/boltdesignsystem/bolt/wiki/Jest-Test:-Example-Jest-Test for more testing examples
import { render, renderWC, stopServer } from '../../../testing/testing-helpers';
import schema from '../{{ kebabCase name }}.schema';
const componentSelector = 'bolt-{{ kebabCase name }}'
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

describe('Bolt {{ titleCase name }} component', () => {
  test('default', async () => {
    const results = await render(
      '@bolt-components-{{ kebabCase name }}/{{ kebabCase name }}.twig', {
      ...fixtures.defaultData,
    });

    /*
      Comment out if testing a Web Component
    */
    // const { innerHTML, outerHTML } = await renderWC(
    //   componentSelector,
    //   results.html,
    //   page
    // );

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    /*
      Comment out if testing a Web Component
    */
    // await expect(innerHTML).toMatchSnapshot();
    // await expect(outerHTML).toMatchSnapshot();
  });
});
