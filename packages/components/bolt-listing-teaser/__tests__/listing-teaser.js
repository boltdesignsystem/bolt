import { render, stopServer } from '../../../testing/testing-helpers';
const timeout = 90000;

describe('listing-teaser', () => {
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
    const results = await render(
      '@bolt-components-listing-teaser/listing-teaser.twig',
      {
        headline: {
          text: 'This is a listing-teaser',
          tag: 'h3',
          size: 'xlarge',
          link_attributes: {
            href: 'https://google.com',
          },
        },
        meta_items: [
          'listing-teasered 8 hours 15 minutes ago',
          'Last activity: 2 minutes ago',
        ],
        status: {
          solved: true,
          solved_label: 'custom solved label',
          locked: true,
          locked_label: 'custom locked label',
          replies: '33',
          views: '123',
        },
        description: 'This is the description',
        warning: 'This is a warning message',
        attributes: {
          'data-foo': 'bar',
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
