import { render, stopServer } from '../../../testing/testing-helpers';
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
    label: 'Toggle me',
    attributes: {
      class: 'js-target-the-switch-button-container',
    },
  };

  fixtures = {
    defaultData,
  };
});

describe('Bolt Switch Button', () => {
  test(`default`, async () => {
    const results = await render(
      '@bolt-components-switch-button/switch-button.twig',
      {
        ...fixtures.defaultData,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Switch Button Prop', () => {
  test(`button_attributes`, async () => {
    const results = await render(
      '@bolt-components-switch-button/switch-button.twig',
      {
        ...fixtures.defaultData,
        button_attributes: {
          class: 'switch-button-class-example',
        },
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`on`, async () => {
    const results = await render(
      '@bolt-components-switch-button/switch-button.twig',
      {
        ...fixtures.defaultData,
        on: false,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`custom id`, async () => {
    const results = await render(
      '@bolt-components-switch-button/switch-button.twig',
      {
        ...fixtures.defaultData,
        button_attributes: {
          id: 'a-uuid-test-12345',
        },
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
