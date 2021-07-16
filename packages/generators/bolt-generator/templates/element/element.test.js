import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../{{ kebabCase name }}.schema';
const timeout = 90000;
let page, fixtures;

afterAll(async () => {
  await stopServer();
  await page.close();
});

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
}, timeout);

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

}, timeout);

describe('{{ titleCase name }}', () => {
  test('basic usage', async () => {
    const results = await render(
      '@bolt-elements-{{ kebabCase name }}/{{ kebabCase name }}.twig', {
      ...fixtures.defaultData,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('adds class via Drupal Attributes', async () => {
    const results = await render(
      '@bolt-elements-{{ kebabCase name }}/{{ kebabCase name }}.twig',
      {
        attributes: {
          class: ['u-bolt-margin-top-medium'],
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
