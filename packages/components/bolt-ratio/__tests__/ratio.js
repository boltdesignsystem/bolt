import { render, renderWC, stopServer } from '../../../testing/testing-helpers';

const timeout = 120000;

describe('<bolt-ratio> Component', () => {
  let page;

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  }, timeout);

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  }, timeout);

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

  test('<bolt-ratio> compiles', async () => {
    const results = await render('@bolt-components-ratio/ratio.twig', {
      children: '<img src="/fixtures/1200x660.jpg">',
      ratio: '1200/660',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-ratio> w/o Shadow DOM renders', async function() {
    const { outerHTML } = await renderWC(
      'bolt-ratio',
      `<bolt-ratio no-shadow ratio="1200/660">
          <img src="/fixtures/1200x660.jpg">
        </bolt-ratio>`,
      page,
    );
    expect(outerHTML).toMatchSnapshot();

    const renderedRatioStyles = await page.evaluate(() => {
      const ratio = document.querySelector('bolt-ratio');
      const innerRatio = ratio.renderRoot.querySelector('.c-bolt-ratio');
      return innerRatio.style.getPropertyValue('--aspect-ratio').trim();
    });

    expect(renderedRatioStyles).toMatch(parseFloat(1200 / 660).toFixed(5));
  });

  test('<bolt-ratio> with HTML5 video renders', async function() {
    const renderedRatioHTML = await page.evaluate(() => {
      const ratio = document.createElement('bolt-ratio');

      ratio.innerHTML = `<video controls poster="/fixtures/videos/poster.png">
        <source src="/fixtures/videos/devstories.webm" type="video/webm;codecs=&quot;vp8, vorbis&quot;">
        <source src="/fixtures/videos/devstories.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
        <track src="/fixtures/videos/devstories-en.vtt" label="English subtitles" kind="subtitles" srclang="en" default="">
      </video>`;
      ratio.setAttribute('ratio', '640/360');
      ratio.style.width = '640px';
      document.body.appendChild(ratio);
      ratio.requestUpdate();
      return ratio.outerHTML;
    });

    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('bolt-ratio'));
      return await Promise.all(
        selectors.map(ratio => {
          if (ratio._wasInitiallyRendered === true)
            return '_wasInitiallyRendered';
          return new Promise((resolve, reject) => {
            ratio.addEventListener('ready', resolve('ready'));
            ratio.addEventListener('error', reject);
          });
        }),
      );
    });

    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('bolt-ratio'));
      return await Promise.all(
        selectors.map(ratio => {
          const video = ratio.querySelector('video');
          if (video.readyState === 4) return;
          return new Promise((resolve, reject) => {
            video.addEventListener('canplaythrough', resolve);
            video.addEventListener('error', reject);
          });
        }),
      );
    });

    // const renderedRatioSize = await page.evaluate(() => {
    //   const ratioSize = {
    //     width: document.querySelector('bolt-ratio').clientWidth,
    //     height: document.querySelector('bolt-ratio').clientHeight,
    //   };
    //   return ratioSize;
    // });

    await page.waitFor(500);
    const image = await page.screenshot();
  });

  test('<bolt-ratio> twig - ratio prop fraction containing a decimal', async () => {
    const results = await render('@bolt-components-ratio/ratio.twig', {
      children: '<img src="/fixtures/1200x850-alt.jpg">',
      ratio: '12/8.5',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const html = results.html;

    await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
      const ratio = document.querySelector('bolt-ratio');
      ratio.requestUpdate();
    }, html);

    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('bolt-ratio'));
      await Promise.all(
        selectors.map(ratio => {
          if (ratio._wasInitiallyRendered === true) return;
          return new Promise((resolve, reject) => {
            ratio.addEventListener('ready', resolve);
            ratio.addEventListener('error', reject);
          });
        }),
      );
    });

    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('bolt-ratio'));
      return await Promise.all(
        selectors.map(ratio => {
          const image = ratio.querySelector('img');
          if (image.complete) {
            return;
          }
          return new Promise((resolve, reject) => {
            image.addEventListener('load', resolve);
            image.addEventListener('error', reject);
          });
        }),
      );
    });

    // await page.waitFor(500); // wait a second before testing
    await page.waitFor(500);

    const renderedRatioStyles = await page.evaluate(() => {
      const ratio = document.querySelector('bolt-ratio');
      const innerRatio = ratio.renderRoot.querySelector('.c-bolt-ratio');
      return innerRatio.style.getPropertyValue('--aspect-ratio').trim();
    });

    expect(renderedRatioStyles).toMatch(parseFloat(1200 / 850).toFixed(5));
  });

  test('<bolt-ratio> web component - ratio prop fraction containing a decimal', async function() {
    const renderedRatioHTML = await page.evaluate(() => {
      const ratio = document.createElement('bolt-ratio');
      const img = document.createElement('img');
      img.setAttribute('src', '/fixtures/1200x850.jpg');
      ratio.setAttribute('ratio', '12/8.5');
      ratio.appendChild(img);
      document.body.appendChild(ratio);
      ratio.requestUpdate();
      return ratio.outerHTML;
    });
    expect(renderedRatioHTML).toMatchSnapshot();

    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('bolt-ratio'));
      await Promise.all(
        selectors.map(ratio => {
          if (ratio._wasInitiallyRendered === true) return;
          return new Promise((resolve, reject) => {
            ratio.addEventListener('ready', resolve);
            ratio.addEventListener('error', reject);
          });
        }),
      );
    });

    await page.waitFor(500);

    const renderedRatioStyles = await page.evaluate(() => {
      const ratio = document.querySelector('bolt-ratio');
      const innerRatio = ratio.renderRoot.querySelector('.c-bolt-ratio');
      return innerRatio.style.getPropertyValue('--aspect-ratio').trim();
    });

    expect(renderedRatioStyles).toMatch(parseFloat(1200 / 850).toFixed(5));
  });
});
