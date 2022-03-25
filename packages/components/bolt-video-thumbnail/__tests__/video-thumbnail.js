import { render, stopServer, renderWC } from '../../../testing/testing-helpers';
import schema from '../video-thumbnail.schema';
// eslint-disable-next-line camelcase
const { border_radius, aspect_ratio } = schema.properties;
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
    content: '/fixtures/1200x660.jpg',
  };

  const chipObject = `{% set chip %}
    {% include '@bolt-components-chip/chip.twig' with {
      text: 'Preview',
      size: 'small',
      border_radius: 'small',
      color: 'violet',
    } only %}
  {% endset %}`;

  const videoData = {
    video: {
      title: 'Title of the Video',
      duration: '4:55',
    },
  };

  const videoObject = `<video-js
    data-account='1900410236'
    data-player='O3FkeBiaDz'
    data-embed='default'
    data-video-id='4892122320001'
    controls
    class="c-base-video"></video-js>`;

  fixtures = {
    defaultData,
    chipObject,
    videoData,
    videoObject,
  };
});

describe('Bolt Video Thumbnail Component', () => {
  test(`default`, async () => {
    const results = await render(
      '@bolt-components-video-thumbnail/video-thumbnail.twig',
      {
        ...fixtures.defaultData,
      },
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Video Thumbnail Component Prop -', () => {
  // // Target each of the schema keys with the following pattern
  border_radius.enum.forEach(async option => {
    test(`border_radius items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-video-thumbnail/video-thumbnail.twig',
        {
          ...fixtures.defaultData,
          border_radius: option,
        },
      );
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  aspect_ratio.enum.forEach(async option => {
    test(`aspect_ratio items: ${option}`, async () => {
      const results = await render(
        '@bolt-components-video-thumbnail/video-thumbnail.twig',
        {
          ...fixtures.defaultData,
          aspect_ratio: option,
        },
      );
      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  test(`video_title_display`, async () => {
    const results = await render(
      '@bolt-components-video-thumbnail/video-thumbnail.twig',
      {
        ...fixtures.defaultData,
        video_title_display: true,
        video: {
          title: 'Video Title Display',
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`button_attributes`, async () => {
    const results = await render(
      '@bolt-components-video-thumbnail/video-thumbnail.twig',
      {
        ...fixtures.defaultData,
        button_attributes: {
          'data-test-attributes': 'Test Data',
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`button_attributes`, async () => {
    const results = await render(
      '@bolt-components-video-thumbnail/video-thumbnail.twig',
      {
        ...fixtures.defaultData,
        button_attributes: {
          'data-test-attributes': 'Test Data',
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
  test(`video.duration`, async () => {
    const results = await render(
      '@bolt-components-video-thumbnail/video-thumbnail.twig',
      {
        ...fixtures.defaultData,
        video: {
          title: 'Video Title Button Attributes',
          duration: '3:55',
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`video.has_subtitles`, async () => {
    const results = await render(
      '@bolt-components-video-thumbnail/video-thumbnail.twig',
      {
        ...fixtures.defaultData,
        video: {
          title: 'Video Title Subtitles',
          has_subtitles: true,
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`video.content`, async () => {
    const results = await render(
      '@bolt-components-video-thumbnail/video-thumbnail.twig',
      {
        ...fixtures.defaultData,
        video: {
          content: fixtures.videoObject,
          title: 'Video Title Inline Play',
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
