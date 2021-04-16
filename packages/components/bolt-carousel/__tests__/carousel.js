/* eslint-disable no-await-in-loop */
import { renderWC, stopServer } from '../../../testing/testing-helpers';

let page, carouselSlideImage, carouselButtonControls;

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  await page.setViewport({ width: 800, height: 600 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });
});

afterAll(async () => {
  // await stopServer();
  await page.close();
});

describe('Bolt Carousel', () => {
  beforeAll(async () => {
    carouselSlideImage = `
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

    carouselButtonControls = `
      <bolt-button slot="previous-btn" color="secondary" border-radius="full" icon-only>Previous <bolt-icon slot="before" name="chevron-left"></bolt-icon></bolt-button>
      <bolt-button slot="next-btn" color="secondary" border-radius="full" icon-only>Next <bolt-icon slot="after" name="chevron-right"></bolt-icon></bolt-button>
    `;
  });

  test('Basic 3 Slide <bolt-carousel> Renders', async function() {
    const { outerHTML, innerHTML } = await renderWC(
      'bolt-carousel',
      `<bolt-carousel>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <div>Slide 1</div>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <div>Slide 2</div>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <div>Slide 3</div>
            </bolt-carousel-slide>
          </bolt-carousel>
        `,
      page,
    );
    console.log(innerHTML);
    console.log(outerHTML);

    await expect(outerHTML).toMatchSnapshot();
  });

  test('Basic 3 Slide <bolt-carousel> Renders w/ Nav Controls', async function() {
    const { outerHTML } = await renderWC(
      'bolt-carousel',
      `<bolt-carousel>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <div>Slide 1</div>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <div>Slide 2</div>
            </bolt-carousel-slide>
            <bolt-carousel-slide>
              ${carouselSlideImage}
              <div>Slide 3</div>
            </bolt-carousel-slide>
            ${carouselButtonControls}
          </bolt-carousel>
        `,
      page,
    );

    await expect(outerHTML).toMatchSnapshot();
  });

  test('Basic 3 Slide <bolt-carousel> Renders w/ Outer Nav Controls', async function() {
    const { outerHTML } = await renderWC(
      'bolt-carousel',
      `<bolt-carousel nav-button-position="outside">
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 1</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 2</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 3</div>
          </bolt-carousel-slide>
          ${carouselButtonControls}
        </bolt-carousel>
        `,
      page,
    );

    await expect(outerHTML).toMatchSnapshot();
  });

  test('Basic 3 Slide <bolt-carousel> Renders w/ Variable (Auto) Slide Per View', async function() {
    const { outerHTML } = await renderWC(
      'bolt-carousel',
      `<bolt-carousel slides-per-view="auto">
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 1</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 2</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 3</div>
          </bolt-carousel-slide>
        </bolt-carousel>
        `,
      page,
    );

    await expect(outerHTML).toMatchSnapshot();
  });

  test('Basic 7 Slide <bolt-carousel> Renders', async function() {
    const { outerHTML } = await renderWC(
      'bolt-carousel',
      `<bolt-carousel>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 1</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 2</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 3</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 4</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 5</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 6</div>
          </bolt-carousel-slide>
          <bolt-carousel-slide>
            ${carouselSlideImage}
            <div>Slide 7</div>
          </bolt-carousel-slide>
        </bolt-carousel>
        `,
      page,
    );

    await expect(outerHTML).toMatchSnapshot();
  });
});

// describe('Web Component usage', () => {
//   let carouselOuterDark, carouselOuterLight;

// beforeAll(async () => {
//   const carouselInnerHTML =
//   carouselOuterDark = await page.evaluate(async carouselInnerHTML => {
//     const wrapper = document.createElement('div');
//     wrapper.innerHTML = carouselInnerHTML;
//     document.body.appendChild(wrapper);

//     await customElements.whenDefined('ssr-keep');
//     await customElements.whenDefined('bolt-tabs');
//     const tabs = document.querySelector('bolt-tabs');
//     await tabs.updateComplete;

//     return tabs.outerHTML;
//   }, carouselInnerHTML);

//   carouselOuterLight = await page.evaluate(async carouselInnerHTML => {
//     const wrapper = document.createElement('div');
//     wrapper.innerHTML = carouselInnerHTML;
//     document.body.appendChild(wrapper);

//     await Promise.all([
//       customElements.whenDefined('ssr-keep'),
//       customElements.whenDefined('bolt-tabs'),
//     ]);

//     const tabs = document.querySelector('bolt-tabs');
//     const tabPanels = document.querySelectorAll('bolt-tab-panel');

//     [tabs, ...tabPanels].forEach(el => {
//       el.setAttribute('no-shadow', '');
//       el.requestUpdate();
//     });

//     await Promise.all([
//       tabs.updateComplete,
//       [tabs, ...tabPanels].forEach(el => {
//         return el.updateComplete;
//       }),
//     ]);

//     return tabs.outerHTML;
//   }, carouselInnerHTML);
// });

// test('Shadow DOM', async () => {
//   const renderedHTML = await html(carouselOuterDark);
//   await expect(renderedHTML).toMatchSnapshot();
// });

// test('Light DOM', async () => {
//   const renderedHTML = await html(carouselOuterLight);
//   await expect(renderedHTML).toMatchSnapshot();
// });

// });
