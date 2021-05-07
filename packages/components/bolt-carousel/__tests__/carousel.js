/* eslint-disable no-await-in-loop */
import {
  render,
  renderString,
  stopServer,
  renderWC,
} from '../../../testing/testing-helpers';
import schema from '../carousel.schema';
// eslint-disable-next-line camelcase
const { slides_per_view } = schema.properties;
const componentSelector = 'bolt-carousel';
const componentSelectorInner = 'bolt-carousel-slide';
let page, fixtures;

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  //await page.setViewport({ width: 600, height: 200 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const carouselSlideImage = `
    <bolt-image
      src="/fixtures/1200x660.jpg"
      srcset="/fixtures/1200x660-50.jpg 50w, /fixtures/1200x660-100.jpg 100w, /fixtures/1200x660-200.jpg 200w, /fixtures/1200x660-320.jpg 320w, /fixtures/1200x660-480.jpg 480w, /fixtures/1200x660-640.jpg 640w, /fixtures/1200x660-800.jpg 800w, /fixtures/1200x660-1024.jpg 1024w"
      sizes="auto"
      ratio="1200/660"
      alt="A Rock Climber"
      no-lazy
      style="background-color: hsl(233, 33%, 97%); width: 100%;">
    </bolt-image>
  `;

  const carouselButtonControls = `
    <bolt-button slot="previous-btn" color="secondary" border-radius="full" icon-only>Previous <bolt-icon slot="before" name="chevron-left"></bolt-icon></bolt-button>
    <bolt-button slot="next-btn" color="secondary" border-radius="full" icon-only>Next <bolt-icon slot="after" name="chevron-right"></bolt-icon></bolt-button>
  `;

  const slideOne = `
    ${carouselSlideImage}<div>Slide 1</div>
  `;

  const slideTwo = `
    ${carouselSlideImage}
    <div>Slide 2</div>
  `;

  const slideThree = `
    ${carouselSlideImage}
    <div>Slide 3</div>
  `;

  fixtures = {
    slideOne,
    slideTwo,
    slideThree,
  };
});

afterAll(async () => {
  await stopServer();
  await page.close();
});

describe('Bolt Carousel', () => {
  test('default', async () => {
    const results = await render('@bolt-components-carousel/carousel.twig', {
      slides: [fixtures.slideOne, fixtures.slideTwo, fixtures.slideThree],
    });

    const { innerHTML, outerHTML } = await renderWC(
      componentSelectorInner,
      results.html,
      page,
    );

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
    await expect(innerHTML).toMatchSnapshot();
    await expect(outerHTML).toMatchSnapshot();
  });

  test('default with seven slides', async () => {
    const results = await render('@bolt-components-carousel/carousel.twig', {
      slides: [
        fixtures.slideOne,
        fixtures.slideTwo,
        fixtures.slideThree,
        fixtures.slideOne,
        fixtures.slideTwo,
        fixtures.slideThree,
        fixtures.slideOne,
      ],
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

  // @todo: Render with controls
});

describe('Bolt Tabs Props', () => {
  slides_per_view.enum.forEach(async option => {
    test(`slides_per_view: ${option}`, async () => {
      const results = await render('@bolt-components-carousel/carousel.twig', {
        slides: [
          fixtures.slideOne.html,
          fixtures.slideTwo.html,
          fixtures.slideThree.html,
        ],
        slides_per_view: option,
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
});
