import { render, stopServer } from '../../../testing/testing-helpers';
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
}, timeout);

describe('Twig usage', () => {
  beforeAll(async () => {
    const teaserData = {
      layout: 'responsive',
      gutter: 'large',
      type: 'external-link',
      eyebrow_text: 'Featured',
      headline: {
        text: 'Teaser headline',
        tag: 'h2',
        size: 'xlarge',
        link_attributes: {
          href: 'https://www.pega.com',
        },
      },
      description: {
        content:
          'Aliqua voluptate amet do laborum culpa tempor consectetur culpa consectetur ea. Ea officia quis do enim.',
      },
      time: '10 min read',
      status: {
        views: '28k',
        locked: true,
      },
      attributes: {
        class: 'js-bolt-target-teaser',
      },
    };

    // Share
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

    const iconShare = await render('@bolt-components-icon/icon.twig', {
      name: 'share',
    });

    const sharePopoverTrigger = await render(
      '@bolt-elements-text-link/text-link.twig',
      {
        content: 'Share',
        icon_before: iconShare.html,
        reversed_underline: true,
        attributes: {
          type: 'button',
        },
      },
    );

    const share = await render('@bolt-components-popover/popover.twig', {
      trigger: sharePopoverTrigger.html,
      content: shareMenu.html,
      spacing: 'none',
      boundary: '.js-bolt-target-teaser',
    });

    // Like
    const iconHeart = await render('@bolt-components-icon/icon.twig', {
      name: 'heart-open',
    });

    const like = await render('@bolt-elements-text-link/text-link.twig', {
      content: 'Like',
      icon_before: iconHeart.html,
      reversed_underline: true,
      attributes: {
        type: 'button',
        class: 'js-bolt-like-button',
      },
    });

    // Image
    const image16x19 = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/promo-16x9-ai.jpg',
      alt: 'Alt text.',
    });

    fixtures = {
      teaserData,
      share,
      like,
      image16x19,
    };
  }, timeout);

  test('basic usage', async () => {
    const results = await render('@bolt-components-teaser/teaser.twig', {
      ...fixtures.teaserData,
      signifier: fixtures.image16x19.html,
      like: fixtures.like.html,
      share: fixtures.share.html,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('adds class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-teaser/teaser.twig', {
      ...fixtures.teaserData,
      attributes: {
        class: ['u-bolt-margin-top-medium'], // Note: this overwrites the `js-` class from `teaserData`, keeping the test simple
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
