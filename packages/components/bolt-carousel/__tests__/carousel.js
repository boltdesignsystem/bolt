/* eslint-disable camelcase */
import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../carousel.schema';
const {
  nav_button_position,
  slides_per_view,
  space_between,
  mode,
  slides_per_group,
} = schema.properties;
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

  const carouselSlideImage =
    '<img class="e-bolt-image" src="/fixtures/1200x660.jpg" alt="Image alt text" width="1200" height="660" />';

  const defaultData = {
    slides: [
      `${carouselSlideImage} Slide 1`,
      `${carouselSlideImage} Slide 2`,
      `${carouselSlideImage} Slide 3`,
    ],
  };

  const largeData = {
    slides: [
      `${carouselSlideImage} Slide 1`,
      `${carouselSlideImage} Slide 2`,
      `${carouselSlideImage} Slide 3`,
      `${carouselSlideImage} Slide 4`,
      `${carouselSlideImage} Slide 5`,
      `${carouselSlideImage} Slide 6`,
      `${carouselSlideImage} Slide 7`,
      `${carouselSlideImage} Slide 8`,
      `${carouselSlideImage} Slide 9`,
    ],
  };

  fixtures = {
    defaultData,
    largeData,
  };
});

describe('Bolt Carousel', () => {
  test(`default`, async () => {
    const results = await render('@bolt-components-carousel/carousel.twig', {
      ...fixtures.defaultData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test(`many slides`, async () => {
    const results = await render('@bolt-components-carousel/carousel.twig', {
      ...fixtures.largeData,
    });

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Carousel Prop', () => {
  slides_per_view.enum.forEach(async option => {
    test(`slides_per_view items: ${option}`, async () => {
      const results = await render('@bolt-components-carousel/carousel.twig', {
        ...fixtures.defaultData,
        slides_per_view: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  nav_button_position.enum.forEach(async option => {
    test(`nav_button_position items: ${option}`, async () => {
      const results = await render('@bolt-components-carousel/carousel.twig', {
        ...fixtures.defaultData,
        nav_button_position: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  space_between.enum.forEach(async option => {
    test(`space_between items: ${option}`, async () => {
      const results = await render('@bolt-components-carousel/carousel.twig', {
        ...fixtures.defaultData,
        space_between: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  mode.enum.forEach(async option => {
    test(`mode items: ${option}`, async () => {
      const results = await render('@bolt-components-carousel/carousel.twig', {
        ...fixtures.defaultData,
        mode: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  slides_per_group.enum.forEach(async option => {
    test(`slides_per_group items: ${option}`, async () => {
      const results = await render('@bolt-components-carousel/carousel.twig', {
        ...fixtures.defaultData,
        slides_per_group: option,
      });

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
