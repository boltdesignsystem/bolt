import { html, render, stopServer } from '@bolt/testing-helpers';

const timeout = 120000;

describe('GrapesJS Editor', () => {
  let page;

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
  }, timeout);

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, timeout);

  test('basic editor', async () => {
    const results = await render('@bolt-components-editor/editor.twig', {});
    expect(results.html).toContain('Edit');
  });
});
