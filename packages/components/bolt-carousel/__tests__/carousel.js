/* eslint-disable no-await-in-loop */
import {
  isConnected,
  render,
  renderString,
  stopServer,
  renderWC,
  html,
  //vrtDefaultConfig as vrtConfig,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');

const vrtDefaultConfig = {
  failureThreshold: '0.0028',
  failureThresholdType: 'percent',
  customDiffConfig: {
    threshold: '0.1',
    includeAA: true,
  },
};

const timeout = 180000;

const viewportSizes = [
  {
    size: 'xlarge',
    width: 1200,
    height: 600,
  },
  {
    size: 'large',
    width: 1000,
    height: 1024,
  },
  {
    size: 'medium',
    width: 800,
    height: 600,
  },
  {
    size: 'small',
    width: 600,
    height: 1024,
  },
  {
    size: 'xsmall',
    width: 400,
    height: 640,
  },
  {
    size: 'xxsmall',
    width: 320,
    height: 568,
  },
];

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

describe('carousel', () => {
  let page;

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
    await page.setViewport({ width: 800, height: 600 });
  }, timeout);

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  }, timeout);

  afterAll(async () => {
    await page.close();
  }, 100);

  // test('basic carousel component renders', async () => {
  //   const results = await render('@bolt-components-carousel/carousel.twig');
  //   expect(results.ok).toBe(true);
  //   expect(results.html).toMatchSnapshot();
  // });

  // test('basic carousel component with the global `no-shadow` prop added', async () => {
  //   const results = await render(
  //     '@bolt-components-carousel/carousel.twig',
  //     {
  //       no_shadow: true,
  //     },
  //   );
  //   expect(results.ok).toBe(true);
  //   expect(results.html).toMatchSnapshot();
  // });

  // test('carousel with outer CSS class via Drupal Attributes', async () => {
  //   const results = await render(
  //     '@bolt-components-carousel/carousel.twig',
  //     {
  //       attributes: {
  //         class: ['u-bolt-margin-top-medium'],
  //       },
  //     },
  //   );
  //   expect(results.ok).toBe(true);
  //   expect(results.html).toMatchSnapshot();
  // });

  test(
    'Basic 3 Slide <bolt-carousel> Renders',
    async function() {
      const { outerHTML } = await renderWC(
        'bolt-carousel',
        `<bolt-carousel>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <bolt-text headline>Slide 1</bolt-text>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <bolt-text headline>Slide 2</bolt-text>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <bolt-text headline>Slide 3</bolt-text>
            </bolt-carousel-slide>
          </bolt-carousel>
        `,
        page,
      );

      expect(outerHTML).toMatchSnapshot();

      const screenshots = [];

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        await page.waitFor(500);
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(
          vrtDefaultConfig,
        );
      }
    },
    timeout,
  );

  test(
    'Basic 3 Slide <bolt-carousel> Renders w/ Nav Controls',
    async function() {
      const { outerHTML } = await renderWC(
        'bolt-carousel',
        `<bolt-carousel>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <bolt-text headline>Slide 1</bolt-text>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <bolt-text headline>Slide 2</bolt-text>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <bolt-text headline>Slide 3</bolt-text>
            </bolt-carousel-slide>
            ${carouselButtonControls}
          </bolt-carousel>
        `,
        page,
      );

      const screenshots = [];
      expect(outerHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        await page.waitFor(500);
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(
          vrtDefaultConfig,
        );
      }
    },
    timeout,
  );

  test(
    'Basic 3 Slide <bolt-carousel> Renders w/ Outer Nav Controls',
    async function() {
      const { outerHTML } = await renderWC(
        'bolt-carousel',
        `<bolt-carousel nav-button-position="outside">
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 1</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 2</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 3</bolt-text>
          </bolt-carousel-slide>
          ${carouselButtonControls}
        </bolt-carousel>
        `,
        page,
      );

      const screenshots = [];
      expect(outerHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        await page.waitFor(500);
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(
          vrtDefaultConfig,
        );
      }
    },
    timeout,
  );

  test(
    'Basic 3 Slide <bolt-carousel> Renders w/ Variable (Auto) Slide Per View',
    async function() {
      const { outerHTML } = await renderWC(
        'bolt-carousel',
        `<bolt-carousel slides-per-view="auto">
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 1</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 2</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 3</bolt-text>
          </bolt-carousel-slide>
        </bolt-carousel>
        `,
        page,
      );

      const screenshots = [];
      expect(outerHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        await page.waitFor(500);
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(
          vrtDefaultConfig,
        );
      }
    },
    timeout,
  );

  test(
    'Basic 7 Slide <bolt-carousel> Renders',
    async function() {
      const { outerHTML } = await renderWC(
        'bolt-carousel',
        `<bolt-carousel>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 1</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 2</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 3</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 4</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 5</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 6</bolt-text>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <bolt-text headline>Slide 7</bolt-text>
          </bolt-carousel-slide>
        </bolt-carousel>
        `,
        page,
      );

      const screenshots = [];
      expect(outerHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        await page.waitFor(500);
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(
          vrtDefaultConfig,
        );
      }
    },
    timeout,
  );
});
