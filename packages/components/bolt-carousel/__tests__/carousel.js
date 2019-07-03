/* eslint-disable no-await-in-loop */
import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');

const timeout = 120000;

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

const imageVrtConfig = {
  failureThreshold: '0.03',
  failureThresholdType: 'percent',
  customDiffConfig: {
    // Please note the threshold set in the customDiffConfig is the per pixel sensitivity threshold. For example with a source pixel colour of #ffffff (white) and a comparison pixel colour of #fcfcfc (really light grey) if you set the threshold to 0 then it would trigger a failure on that pixel. However if you were to use say 0.5 then it wouldn't, the colour difference would need to be much more extreme to trigger a failure on that pixel, say #000000 (black)
    threshold: '0.1',
    includeAA: true, // If true, disables detecting and ignoring anti-aliased pixels. false by default.
  },
};

let imageTwig, imageTwigAlt;

describe('carousel', () => {
  let page;

  afterAll(async () => {
    await stopServer();
  }, 100);

  beforeAll(async () => {
    imageTwig = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/landscape-16x9-skyline.jpg',
      lazyload: false,
    });

    imageTwigAlt = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/landscape-16x9-mountains.jpg',
      lazyload: false,
    });
  }, timeout);

  beforeEach(async () => {
    const context = await global.__BROWSER__.createIncognitoBrowserContext();
    page = await context.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });
  }, timeout);

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
      const imageHTML = imageTwigAlt.html;

      const renderedComponentHTML = await page.evaluate(imageHTML => {
        const carousel = document.createElement('bolt-carousel');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image = document.createElement('div');
        image.innerHTML = imageHTML;

        const image1 = image.firstChild;
        const image2 = image1.cloneNode(true);
        const image3 = image1.cloneNode(true);

        const text1 = document.createElement('bolt-text');
        text1.setAttribute('headline', '');
        text1.textContent = 'Slide 1';

        const text2 = document.createElement('bolt-text');
        text2.setAttribute('headline', '');
        text2.textContent = 'Slide 2';

        const text3 = document.createElement('bolt-text');
        text3.setAttribute('headline', '');
        text3.textContent = 'Slide 3';

        carouselSlide1.appendChild(image1);
        carouselSlide1.appendChild(text1);

        carouselSlide2.appendChild(image2);
        carouselSlide2.appendChild(text2);

        carouselSlide3.appendChild(image3);
        carouselSlide3.appendChild(text3);

        carousel.appendChild(carouselSlide1);
        carousel.appendChild(carouselSlide2);
        carousel.appendChild(carouselSlide3);

        document.body.appendChild(carousel);
        carousel.updated();
        return carousel.outerHTML;
      }, imageHTML);

      await page.waitFor(1000);

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);
      }
    },
    timeout,
  );

  test(
    'Basic 3 Slide <bolt-carousel> Renders w/ Nav Controls',
    async function() {
      const imageHTML = imageTwig.html;

      const renderedComponentHTML = await page.evaluate(imageHTML => {
        const carousel = document.createElement('bolt-carousel');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image = document.createElement('div');
        image.innerHTML = imageHTML;

        const image1 = image.firstChild;
        const image2 = image1.cloneNode(true);
        const image3 = image1.cloneNode(true);

        const text1 = document.createElement('bolt-text');
        text1.setAttribute('headline', '');
        text1.textContent = 'Slide 1';

        const text2 = document.createElement('bolt-text');
        text2.setAttribute('headline', '');
        text2.textContent = 'Slide 2';

        const text3 = document.createElement('bolt-text');
        text3.setAttribute('headline', '');
        text3.textContent = 'Slide 3';

        const buttonControls = `
        <bolt-button slot="previous-btn" color="secondary" icon-only>Previous <bolt-icon slot="before" name="chevron-left"></bolt-icon></bolt-button>
        <bolt-button slot="next-btn" color="secondary" icon-only>Next <bolt-icon slot="after" name="chevron-right"></bolt-icon></bolt-button>
      `;

        carousel.innerHTML = buttonControls;

        carouselSlide1.appendChild(image1);
        carouselSlide1.appendChild(text1);

        carouselSlide2.appendChild(image2);
        carouselSlide2.appendChild(text2);

        carouselSlide3.appendChild(image3);
        carouselSlide3.appendChild(text3);

        carousel.appendChild(carouselSlide1);
        carousel.appendChild(carouselSlide2);
        carousel.appendChild(carouselSlide3);

        document.body.appendChild(carousel);
        carousel.updated();
        return carousel.outerHTML;
      }, imageHTML);

      await page.waitFor(1000);

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);
      }
    },
    timeout,
  );

  test(
    'Basic 3 Slide <bolt-carousel> Renders w/ Outer Nav Controls',
    async function() {
      const imageHTML = imageTwigAlt.html;

      const renderedComponentHTML = await page.evaluate(imageHTML => {
        const carousel = document.createElement('bolt-carousel');
        carousel.setAttribute('nav-position', 'outside');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image = document.createElement('div');
        image.innerHTML = imageHTML;

        const image1 = image.firstChild;
        const image2 = image1.cloneNode(true);
        const image3 = image1.cloneNode(true);

        const text1 = document.createElement('bolt-text');
        text1.setAttribute('headline', '');
        text1.textContent = 'Slide 1';

        const text2 = document.createElement('bolt-text');
        text2.setAttribute('headline', '');
        text2.textContent = 'Slide 2';

        const text3 = document.createElement('bolt-text');
        text3.setAttribute('headline', '');
        text3.textContent = 'Slide 3';

        const buttonControls = `
        <bolt-button slot="previous-btn" color="secondary" icon-only>Previous <bolt-icon slot="before" name="chevron-left"></bolt-icon></bolt-button>
        <bolt-button slot="next-btn" color="secondary" icon-only>Next <bolt-icon slot="after" name="chevron-right"></bolt-icon></bolt-button>
      `;

        carousel.innerHTML = buttonControls;

        carouselSlide1.appendChild(image1);
        carouselSlide1.appendChild(text1);

        carouselSlide2.appendChild(image2);
        carouselSlide2.appendChild(text2);

        carouselSlide3.appendChild(image3);
        carouselSlide3.appendChild(text3);

        carousel.appendChild(carouselSlide1);
        carousel.appendChild(carouselSlide2);
        carousel.appendChild(carouselSlide3);

        document.body.appendChild(carousel);
        carousel.updated();
        return carousel.outerHTML;
      }, imageHTML);

      await page.waitFor(1000);

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);
      }
    },
    timeout,
  );

  test(
    'Basic 3 Slide <bolt-carousel> Renders w/ 1 Slide Per View',
    async function() {
      const imageHTML = imageTwig.html;

      const renderedComponentHTML = await page.evaluate(imageHTML => {
        const carousel = document.createElement('bolt-carousel');
        carousel.setAttribute('slides-per-view', 1);
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image = document.createElement('div');
        image.innerHTML = imageHTML;

        const image1 = image.firstChild;
        const image2 = image1.cloneNode(true);
        const image3 = image1.cloneNode(true);

        const text1 = document.createElement('bolt-text');
        text1.setAttribute('headline', '');
        text1.textContent = 'Slide 1';

        const text2 = document.createElement('bolt-text');
        text2.setAttribute('headline', '');
        text2.textContent = 'Slide 2';

        const text3 = document.createElement('bolt-text');
        text3.setAttribute('headline', '');
        text3.textContent = 'Slide 3';

        carouselSlide1.appendChild(image1);
        carouselSlide1.appendChild(text1);

        carouselSlide2.appendChild(image2);
        carouselSlide2.appendChild(text2);

        carouselSlide3.appendChild(image3);
        carouselSlide3.appendChild(text3);

        carousel.appendChild(carouselSlide1);
        carousel.appendChild(carouselSlide2);
        carousel.appendChild(carouselSlide3);

        document.body.appendChild(carousel);
        carousel.updated();
        return carousel.outerHTML;
      }, imageHTML);

      await page.waitFor(1000);

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);
      }
    },
    timeout,
  );

  test(
    'Basic 7 Slide <bolt-carousel> Renders',
    async function() {
      const imageHTML = imageTwig.html;

      const renderedComponentHTML = await page.evaluate(imageHTML => {
        const carousel = document.createElement('bolt-carousel');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');
        const carouselSlide4 = document.createElement('bolt-carousel-slide');
        const carouselSlide5 = document.createElement('bolt-carousel-slide');
        const carouselSlide6 = document.createElement('bolt-carousel-slide');
        const carouselSlide7 = document.createElement('bolt-carousel-slide');

        const image = document.createElement('div');
        image.innerHTML = imageHTML;
        const image1 = image.firstChild;

        const image2 = image1.cloneNode(true);
        const image3 = image1.cloneNode(true);
        const image4 = image1.cloneNode(true);
        const image5 = image1.cloneNode(true);
        const image6 = image1.cloneNode(true);
        const image7 = image1.cloneNode(true);

        const text1 = document.createElement('bolt-text');
        text1.setAttribute('headline', '');
        text1.textContent = 'Slide 1';

        const text2 = document.createElement('bolt-text');
        text2.setAttribute('headline', '');
        text2.textContent = 'Slide 2';

        const text3 = document.createElement('bolt-text');
        text3.setAttribute('headline', '');
        text3.textContent = 'Slide 3';

        const text4 = document.createElement('bolt-text');
        text4.setAttribute('headline', '');
        text4.textContent = 'Slide 4';

        const text5 = document.createElement('bolt-text');
        text5.setAttribute('headline', '');
        text5.textContent = 'Slide 5';

        const text6 = document.createElement('bolt-text');
        text6.setAttribute('headline', '');
        text6.textContent = 'Slide 6';

        const text7 = document.createElement('bolt-text');
        text7.setAttribute('headline', '');
        text7.textContent = 'Slide 7';

        carouselSlide1.appendChild(image1);
        carouselSlide1.appendChild(text1);

        carouselSlide2.appendChild(image2);
        carouselSlide2.appendChild(text2);

        carouselSlide3.appendChild(image3);
        carouselSlide3.appendChild(text3);

        carouselSlide4.appendChild(image4);
        carouselSlide4.appendChild(text4);

        carouselSlide5.appendChild(image5);
        carouselSlide5.appendChild(text5);

        carouselSlide6.appendChild(image6);
        carouselSlide6.appendChild(text6);

        carouselSlide7.appendChild(image7);
        carouselSlide7.appendChild(text7);

        carousel.appendChild(carouselSlide1);
        carousel.appendChild(carouselSlide2);
        carousel.appendChild(carouselSlide3);
        carousel.appendChild(carouselSlide4);
        carousel.appendChild(carouselSlide5);
        carousel.appendChild(carouselSlide6);
        carousel.appendChild(carouselSlide7);

        document.body.appendChild(carousel);
        carousel.updated();
        return carousel.outerHTML;
      }, imageHTML);

      await page.waitFor(1000);

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(imageVrtConfig);
      }
    },
    timeout,
  );
});
