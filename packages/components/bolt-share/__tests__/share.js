import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../share.schema';
const { size, opacity, align } = schema.properties;
let page, fixtures;

afterAll(async () => {
  await stopServer();
  await page.close();
}, 100);

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  await page.setViewport({ width: 800, height: 400 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const defaultData = {
    sources: [
      {
        name: 'facebook',
        attributes: {
          href:
            'https://www.facebook.com/sharer/sharer.php?u=https://boltdesignsystem.com&amp;src=sdkpreparse',
        },
      },
      {
        name: 'twitter',
        attributes: {
          href:
            'https://twitter.com/intent/tweet?url=https://boltdesignsystem.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
        },
      },
      {
        name: 'linkedin',
        attributes: {
          href:
            'https://www.linkedin.com/shareArticle?url=https://boltdesignsystem.com',
        },
      },
      {
        name: 'email',
        attributes: {
          href:
            'mailto:?&body=Sample%20Text%20--%20https%3A//boltdesignsystem.com',
        },
      },
    ],
    copy_to_clipboard: {
      text_to_copy: 'https://boltdesignsystem.com',
    },
  };

  const deprecatedData = {
    sources: [
      {
        name: 'facebook',
        url:
          'https://www.facebook.com/sharer/sharer.php?u=https://boltdesignsystem.com&amp;src=sdkpreparse',
      },
      {
        name: 'twitter',
        url:
          'https://twitter.com/intent/tweet?url=https://boltdesignsystem.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
      },
      {
        name: 'linkedin',
        url:
          'https://www.linkedin.com/shareArticle?url=https://boltdesignsystem.com',
      },
      {
        name: 'email',
        url:
          'mailto:?&body=Sample%20Text%20--%20https%3A//boltdesignsystem.com',
      },
    ],
    copy_to_clipboard: {
      text_to_copy: 'https://boltdesignsystem.com',
    },
  };

  fixtures = {
    defaultData,
    deprecatedData,
  };
});

describe('Bolt Share', () => {
  test(`default`, async () => {
    const results = await render('@bolt-components-share/share.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`url deprecated test`, async () => {
    const results = await render('@bolt-components-share/share.twig', {
      ...fixtures.deprecatedData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Share Props', () => {
  test(`display menu test`, async () => {
    const results = await render('@bolt-components-share/share.twig', {
      ...fixtures.defaultData,
      display: 'menu',
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();

    const deprecatedResults = await render(
      '@bolt-components-share/share.twig',
      {
        ...fixtures.deprecatedData,
        display: 'menu',
      },
    );

    await expect(deprecatedResults.ok).toBe(true);
    await expect(deprecatedResults.html).toMatchSnapshot();
  });

  size.enum.forEach(async option => {
    test(`size items: ${option}`, async () => {
      const results = await render('@bolt-components-share/share.twig', {
        ...fixtures.defaultData,
        size: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  opacity.enum.forEach(async option => {
    test(`opacity items: ${option}`, async () => {
      const results = await render('@bolt-components-share/share.twig', {
        ...fixtures.defaultData,
        opacity: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  align.enum.forEach(async option => {
    test(`align items: ${option}`, async () => {
      const results = await render('@bolt-components-share/share.twig', {
        ...fixtures.defaultData,
        align: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
