import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

async function renderTwig(template, data) {
  return await render(template, data, true);
}

const timeout = 60000;

describe('<bolt-ratio> Component', () => {
  let page;

  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });
  }, timeout);

  test('<bolt-ratio> compiles', async () => {
    const results = await render('@bolt-components-ratio/ratio.twig', {
      children: '<img src="/fixtures/1200x660.jpg">',
      ratio: '1200/660',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-ratio> w/o Shadow DOM renders', async function() {
    const renderedRatioHTML = await page.evaluate(() => {
      const ratio = document.createElement('bolt-ratio');
      const img = document.createElement('img');
      img.setAttribute('src', '/fixtures/1200x660.jpg');

      ratio.setAttribute('no-shadow', '');
      ratio.setAttribute('ratio', '1200/660');
      ratio.appendChild(img);

      document.body.appendChild(ratio);
      return ratio.outerHTML;
    });
    expect(renderedRatioHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

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

      ratio.innerHTML = `<video controls poster="/fixtures/poster.png">
        <source src="/fixtures/devstories.webm" type="video/webm;codecs=&quot;vp8, vorbis&quot;">
        <source src="/fixtures/devstories.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
        <track src="/fixtures/devstories-en.vtt" label="English subtitles" kind="subtitles" srclang="en" default="">
      </video>`;
      ratio.setAttribute('ratio', '640/360');
      ratio.style.width = '640px';
      document.body.appendChild(ratio);
      return ratio.outerHTML;
    });

    const renderedRatioSize = await page.evaluate(() => {
      const ratioSize = {
        width: document.querySelector('bolt-ratio').clientWidth,
        height: document.querySelector('bolt-ratio').clientHeight,
      };
      return ratioSize;
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedRatioHTML).toMatchSnapshot();
  });
});
