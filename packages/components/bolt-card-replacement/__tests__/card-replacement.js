import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../card-replacement.schema';
const { tag, theme, spacing, border_radius } = schema.properties;
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

  const video = `
    <video-js
    data-account="1900410236"
    data-player="O3FkeBiaDz"
    data-embed="default"
    data-video-id="5609376179001"
    data-media-title
    data-media-duration
    controls
    class="c-base-video"></video-js>
  `;

  const mediaData = {
    media: {
      image: {
        src: '/fixtures/landscape-16x9-mountains.jpg',
        alt: 'Image alt.',
      },
    },
  };

  const bodyData = {
    body: {
      eyebrow: 'This is an eyebrow',
      headline: 'This is a headline',
      paragraph: 'This is a paragraph.',
    },
  };

  const actionsData = {
    actions: [
      {
        text: 'This is a button',
        url: 'https://google.com',
      },
    ],
  };

  const videoData = await render('@bolt-elements-ratio/ratio.twig', {
    content: video,
    ratio: 'wide',
  });

  fixtures = {
    mediaData,
    bodyData,
    actionsData,
    videoData,
  };
});

describe('Bolt Card', () => {
  test(`default`, async () => {
    const results = await render(
      '@bolt-components-card-replacement/card-replacement.twig',
      {
        ...fixtures.mediaData,
        ...fixtures.bodyData,
        ...fixtures.actionsData,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Two Actions`, async () => {
    const results = await render(
      '@bolt-components-card-replacement/card-replacement.twig',
      {
        ...fixtures.mediaData,
        ...fixtures.bodyData,
        actions: [
          {
            text: 'This is a button',
            url: 'https://google.com',
          },
          {
            text: 'This is a sceond button',
            url: 'https://google.com',
          },
        ],
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test('Without Actions', async () => {
    const results = await render(
      '@bolt-components-card-replacement/card-replacement.twig',
      {
        ...fixtures.mediaData,
        ...fixtures.bodyData,
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test('Without Media and Actions', async () => {
    const results = await render(
      '@bolt-components-card-replacement/card-replacement.twig',
      {
        ...fixtures.bodyData,
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test('Video Card', async () => {
    const results = await render(
      '@bolt-components-card-replacement/card-replacement.twig',
      {
        ...fixtures.actionsData,
        ...fixtures.bodyData,
        media: {
          video: fixtures.videoData.html,
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test('Clickable Card', async () => {
    const results = await render(
      '@bolt-components-card-replacement/card-replacement.twig',
      {
        link: {
          url: 'https://google.com',
          text: 'This entire card-replacement is clickable',
        },
        ...fixtures.mediaData,
        ...fixtures.bodyData,
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Card Props', () => {
  tag.enum.forEach(async option => {
    test(`tag items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-card-replacement/card-replacement.twig',
        {
          ...fixtures.mediaData,
          ...fixtures.bodyData,
          ...fixtures.actionsData,
          tag: option,
        },
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  theme.enum.forEach(async option => {
    test(`theme items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-card-replacement/card-replacement.twig',
        {
          ...fixtures.mediaData,
          ...fixtures.bodyData,
          ...fixtures.actionsData,
          theme: option,
        },
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async option => {
    test(`spacing items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-card-replacement/card-replacement.twig',
        {
          ...fixtures.mediaData,
          ...fixtures.bodyData,
          ...fixtures.actionsData,
          spacing: option,
        },
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  border_radius.enum.forEach(async option => {
    test(`border_radius items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-card-replacement/card-replacement.twig',
        {
          ...fixtures.mediaData,
          ...fixtures.bodyData,
          ...fixtures.actionsData,
          border_radius: option,
        },
      );

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
