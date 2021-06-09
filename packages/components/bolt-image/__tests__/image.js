import { render, stopServer, renderWC } from '../../../testing/testing-helpers';
import schema from '../image.schema';
const componentSelector = 'bolt-image';
// eslint-disable-next-line camelcase
const { src, alt, lazyload, max_width, attributes } = schema.properties;
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
    src: '/fixtures/1200x660.jpg',
    alt: 'A Rock Climber',
  };

  const srcData = {
    src: '/fixtures/1200x660.jpg',
  };

  fixtures = {
    defaultData,
    srcData,
  };
});

describe('Bolt Image', () => {
  test(`Image default`, async () => {
    const results = await render('@bolt-components-image/image.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Image default with web component`, async () => {
    const results = await render('@bolt-components-image/image.twig', {
      ...fixtures.defaultData,
    });

    const { innerHTML, outerHTML } = await renderWC(
      componentSelector,
      results.html,
      page,
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
    await expect(innerHTML).toMatchSnapshot();
    await expect(outerHTML).toMatchSnapshot();
  });
});

describe('Bolt Image Props', () => {
  // Target each of the schema keys with the following pattern

  [true, false].forEach(async option => {
    test(`Image ratio object and lazyload:${option} compiles`, async () => {
      const results = await render('@bolt-components-image/image.twig', {
        ...fixtures.defaultData,
        lazyload: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  test(`Image with max-width of 200px renders as expected`, async () => {
    const results = await render('@bolt-components-image/image.twig', {
      ...fixtures.defaultData,
      max_width: '200px',
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Image with max-width of 50% renders as expected`, async () => {
    const results = await render('@bolt-components-image/image.twig', {
      ...fixtures.defaultData,
      max_width: '50%',
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Image with max-width and additional style attribute renders as expected`, async () => {
    const results = await render('@bolt-components-image/image.twig', {
      ...fixtures.defaultData,
      max_width: '200px',
      attributes: {
        style: 'display: block;',
      },
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`Image should always render alt attribute on <img> tags`, async () => {
    const results1 = await render('@bolt-components-image/image.twig', {
      ...fixtures.srcData,
      alt: '',
    });

    await expect(results1.ok).toBe(true);
    await expect(results1.html).toMatchSnapshot();

    const results2 = await render('@bolt-components-image/image.twig', {
      ...fixtures.srcData,
    });

    await expect(results2.ok).toBe(true);
    await expect(results2.html).toMatchSnapshot();
  });
});
