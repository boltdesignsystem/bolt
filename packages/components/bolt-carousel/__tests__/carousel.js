/* eslint-disable no-await-in-loop */
import {
  isConnected,
  render,
  renderString,
  stopServer,
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

describe('carousel', () => {
  let page, context;

  beforeAll(async () => {
    context = await global.__BROWSER__.createIncognitoBrowserContext();
  });

  beforeEach(async () => {
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
      const renderedComponentHTML = await page.evaluate(() => {
        const carousel = document.createElement('bolt-carousel');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image1 = document.createElement('bolt-image');
        image1.setAttribute('src', '/fixtures/1200x660.jpg');
        image1.setAttribute(
          'srcset',
          '/fixtures/1200x660-50.jpg 50w, /fixtures/1200x660-100.jpg 100w, /fixtures/1200x660-200.jpg 200w, /fixtures/1200x660-320.jpg 320w, /fixtures/1200x660-480.jpg 480w, /fixtures/1200x660-640.jpg 640w, /fixtures/1200x660-800.jpg 800w, /fixtures/1200x660-1024.jpg 1024w',
        );
        image1.setAttribute('sizes', 'auto');
        image1.setAttribute('ratio', '1200/660');
        image1.setAttribute('alt', 'A Rock Climber');
        image1.setAttribute('no-lazy', '');
        image1.setAttribute('style', 'background-color: hsl(233, 33%, 97%);');

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
      });

      await page.evaluate(async () => {
        const carousels = Array.from(
          document.querySelectorAll('bolt-carousel'),
        );
        const carouselItems = Array.from(
          document.querySelectorAll('bolt-carousel-item'),
        );
        const allElements = [...carousels, ...carouselItems];
        return await Promise.all(
          allElements.map(element => {
            if (element._wasInitiallyRendered) return;
            return new Promise((resolve, reject) => {
              element.addEventListener('ready', resolve);
              element.addEventListener('error', reject);
            });
          }),
        );
      });

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
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
      const renderedComponentHTML = await page.evaluate(() => {
        const carousel = document.createElement('bolt-carousel');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image1 = document.createElement('bolt-image');
        image1.setAttribute('src', '/fixtures/1200x660.jpg');
        image1.setAttribute(
          'srcset',
          '/fixtures/1200x660-50.jpg 50w, /fixtures/1200x660-100.jpg 100w, /fixtures/1200x660-200.jpg 200w, /fixtures/1200x660-320.jpg 320w, /fixtures/1200x660-480.jpg 480w, /fixtures/1200x660-640.jpg 640w, /fixtures/1200x660-800.jpg 800w, /fixtures/1200x660-1024.jpg 1024w',
        );
        image1.setAttribute('sizes', 'auto');
        image1.setAttribute('ratio', '1200/660');
        image1.setAttribute('alt', 'A Rock Climber');
        image1.setAttribute('no-lazy', '');
        image1.setAttribute('style', 'background-color: hsl(233, 33%, 97%);');

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
        <bolt-button slot="previous-btn" color="secondary" border-radius="full" icon-only>Previous <bolt-icon slot="before" name="chevron-left"></bolt-icon></bolt-button>
        <bolt-button slot="next-btn" color="secondary" border-radius="full" icon-only>Next <bolt-icon slot="after" name="chevron-right"></bolt-icon></bolt-button>
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
      });

      await page.evaluate(async () => {
        const carousels = Array.from(
          document.querySelectorAll('bolt-carousel'),
        );
        const carouselItems = Array.from(
          document.querySelectorAll('bolt-carousel-item'),
        );
        const allElements = [...carousels, ...carouselItems];
        return await Promise.all(
          allElements.map(element => {
            if (element._wasInitiallyRendered) return;
            return new Promise((resolve, reject) => {
              element.addEventListener('ready', resolve);
              element.addEventListener('error', reject);
            });
          }),
        );
      });

      await page.evaluate(async () => {
        const images = Array.from(document.querySelectorAll('bolt-image'));
        return await Promise.all(
          images.map(image => {
            if (image._wasInitiallyRendered) return;
            return new Promise((resolve, reject) => {
              image.addEventListener('ready', resolve);
              image.addEventListener('error', reject);
            });
          }),
        );
      });

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
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
      const renderedComponentHTML = await page.evaluate(() => {
        const carousel = document.createElement('bolt-carousel');
        carousel.setAttribute('nav-button-position', 'outside');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image1 = document.createElement('bolt-image');
        image1.setAttribute('src', '/fixtures/1200x660.jpg');
        image1.setAttribute(
          'srcset',
          '/fixtures/1200x660-50.jpg 50w, /fixtures/1200x660-100.jpg 100w, /fixtures/1200x660-200.jpg 200w, /fixtures/1200x660-320.jpg 320w, /fixtures/1200x660-480.jpg 480w, /fixtures/1200x660-640.jpg 640w, /fixtures/1200x660-800.jpg 800w, /fixtures/1200x660-1024.jpg 1024w',
        );
        image1.setAttribute('sizes', 'auto');
        image1.setAttribute('ratio', '1200/660');
        image1.setAttribute('alt', 'A Rock Climber');
        image1.setAttribute('no-lazy', '');
        image1.setAttribute('style', 'background-color: hsl(233, 33%, 97%);');

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
        <bolt-button slot="previous-btn" color="secondary" border-radius="full" icon-only>Previous <bolt-icon slot="before" name="chevron-left"></bolt-icon></bolt-button>
        <bolt-button slot="next-btn" color="secondary" border-radius="full" icon-only>Next <bolt-icon slot="after" name="chevron-right"></bolt-icon></bolt-button>
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
      });

      await page.evaluate(async () => {
        const carousels = Array.from(
          document.querySelectorAll('bolt-carousel'),
        );
        const carouselItems = Array.from(
          document.querySelectorAll('bolt-carousel-item'),
        );
        const allElements = [...carousels, ...carouselItems];
        return await Promise.all(
          allElements.map(element => {
            if (element._wasInitiallyRendered) return;
            return new Promise((resolve, reject) => {
              element.addEventListener('ready', resolve);
              element.addEventListener('error', reject);
            });
          }),
        );
      });

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(
          vrtDefaultConfig,
        );
      }
    },
    timeout,
  );

  test(
    'Basic 3 Slide <bolt-carousel> Renders w/ 1 Slide Per View',
    async function() {
      const renderedComponentHTML = await page.evaluate(() => {
        const carousel = document.createElement('bolt-carousel');
        carousel.setAttribute('slides-per-view', 1);
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');

        const image1 = document.createElement('bolt-image');
        image1.setAttribute('src', '/fixtures/1200x660.jpg');
        image1.setAttribute(
          'srcset',
          '/fixtures/1200x660-50.jpg 50w, /fixtures/1200x660-100.jpg 100w, /fixtures/1200x660-200.jpg 200w, /fixtures/1200x660-320.jpg 320w, /fixtures/1200x660-480.jpg 480w, /fixtures/1200x660-640.jpg 640w, /fixtures/1200x660-800.jpg 800w, /fixtures/1200x660-1024.jpg 1024w',
        );
        image1.setAttribute('sizes', 'auto');
        image1.setAttribute('ratio', '1200/660');
        image1.setAttribute('alt', 'A Rock Climber');
        image1.setAttribute('no-lazy', '');
        image1.setAttribute('style', 'background-color: hsl(233, 33%, 97%);');

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
      });

      await page.evaluate(async () => {
        const carousels = Array.from(
          document.querySelectorAll('bolt-carousel'),
        );
        const carouselItems = Array.from(
          document.querySelectorAll('bolt-carousel-item'),
        );
        const allElements = [...carousels, ...carouselItems];
        return await Promise.all(
          allElements.map(element => {
            if (element._wasInitiallyRendered) return;
            return new Promise((resolve, reject) => {
              element.addEventListener('ready', resolve);
              element.addEventListener('error', reject);
            });
          }),
        );
      });

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
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
      const renderedComponentHTML = await page.evaluate(() => {
        const carousel = document.createElement('bolt-carousel');
        const carouselSlide1 = document.createElement('bolt-carousel-slide');
        const carouselSlide2 = document.createElement('bolt-carousel-slide');
        const carouselSlide3 = document.createElement('bolt-carousel-slide');
        const carouselSlide4 = document.createElement('bolt-carousel-slide');
        const carouselSlide5 = document.createElement('bolt-carousel-slide');
        const carouselSlide6 = document.createElement('bolt-carousel-slide');
        const carouselSlide7 = document.createElement('bolt-carousel-slide');

        const image1 = document.createElement('bolt-image');
        image1.setAttribute('src', '/fixtures/1200x660.jpg');
        image1.setAttribute(
          'srcset',
          '/fixtures/1200x660-50.jpg 50w, /fixtures/1200x660-100.jpg 100w, /fixtures/1200x660-200.jpg 200w, /fixtures/1200x660-320.jpg 320w, /fixtures/1200x660-480.jpg 480w, /fixtures/1200x660-640.jpg 640w, /fixtures/1200x660-800.jpg 800w, /fixtures/1200x660-1024.jpg 1024w',
        );
        image1.setAttribute('sizes', 'auto');
        image1.setAttribute('ratio', '1200/660');
        image1.setAttribute('alt', 'A Rock Climber');
        image1.setAttribute('no-lazy', '');
        image1.setAttribute('style', 'background-color: hsl(233, 33%, 97%);');

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
      });

      await page.evaluate(async () => {
        const carousels = Array.from(
          document.querySelectorAll('bolt-carousel'),
        );
        const carouselItems = Array.from(
          document.querySelectorAll('bolt-carousel-item'),
        );
        const allElements = [...carousels, ...carouselItems];
        return await Promise.all(
          allElements.map(element => {
            if (element._wasInitiallyRendered) return;
            return new Promise((resolve, reject) => {
              element.addEventListener('ready', resolve);
              element.addEventListener('error', reject);
            });
          }),
        );
      });

      const screenshots = [];

      const renderedHTML = await html(renderedComponentHTML);
      expect(renderedHTML).toMatchSnapshot();

      for (const item of viewportSizes) {
        const { height, width, size } = item;
        screenshots[size] = [];

        await page.setViewport({ height, width });
        screenshots[size].default = await page.screenshot();
        expect(screenshots[size].default).toMatchImageSnapshot(
          vrtDefaultConfig,
        );
      }
    },
    timeout,
  );
});
