import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../button.schema';
const { display, valign } = schema.properties;

const timeout = 90000;

describe('textLink', () => {
  let page;

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
  }, timeout);

  test('basic button', async () => {
    const results = await render('@bolt-elements-button/button.twig', {
      content: 'This is a button',
      attributes: {
        type: 'submit',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
