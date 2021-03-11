import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig,
} from '../../../testing/testing-helpers';
import schema from '../teaser.schema';
const { disabled } = schema.properties;
const timeout = 90000;

let page, results, fixtures;

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

describe('Twig usage', () => {
  beforeAll(async () => {
    const teaserData = {
      layout: 'responsive',
      gutter: 'large',
      type: 'external-link',
      eyebrow_text: 'Featured',
      headline: {
        text:
          'Some awesome featured teaser dolore adipisicing dolore veniam occaecat cillum laboris aliqua',
        tag: 'h2',
        size: 'xlarge',
        link_attributes: {
          href: 'https://www.pega.com',
        },
      },
      description: {
        content:
          'Aliqua voluptate amet do laborum culpa tempor consectetur culpa consectetur ea. Ea officia quis do enim. Id consectetur dolor voluptate eu veniam anim adipisicing dolor ut occaecat officia fugiat magna reprehenderit.',
      },
      time: '10 min read',
      like_button_attributes: {
        type: 'button',
        class: 'js-bolt-like-button',
      },
      status: {
        views: '28k',
      },
    };

    const shareMenu = await render('@bolt-components-share/share.twig', {
      display: 'menu',
      text: 'Share this content',
      sources: [
        {
          name: 'facebook',
          url:
            'https://www.facebook.com/sharer/sharer.php?u=https://pega.com&amp;src=sdkpreparse',
        },
        {
          name: 'twitter',
          url:
            'https://twitter.com/intent/tweet?url=https://pega.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
        },
        {
          name: 'linkedin',
          url: 'https://www.linkedin.com/shareArticle?url=https://pega.com',
        },
        {
          name: 'email',
          url: 'mailto:?&body=Sample%20Text%20--%20https%3A//pega.com',
        },
      ],
      copy_to_clipboard: {
        text_to_copy: 'https://pega.com',
      },
    });

    const image16x19 = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/promo-16x9-ai.jpg',
      alt: 'Alt text.',
    });

    fixtures = {
      teaserData,
      shareMenu,
      image16x19,
    };
  }, timeout);

  test('basic usage', async () => {
    // console.log(fixtures.image16x19);
    const results = await render('@bolt-components-teaser/teaser.twig', {
      ...fixtures.teaserData,
      signifier: fixtures.image16x19.html,
      share_menu: fixtures.shareMenu.html,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('adds class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-teaser/teaser.twig', {
      ...fixtures.teaserData,
      attributes: {
        class: ['u-bolt-margin-top-medium'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
