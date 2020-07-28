import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig,
} from '../../../testing/testing-helpers';
import schema from '../list.schema';
const {
  display,
  spacing,
  separator,
  inset,
  align,
  valign,
  tag,
  nowrap,
} = schema.properties;

const timeout = 120000;

describe('<bolt-list> Component', () => {
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

  test('basic usage', async () => {
    const results = await render('@bolt-layouts-list/list.twig', {
      items: ['item 1', 'item 2', 'item 3'],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
