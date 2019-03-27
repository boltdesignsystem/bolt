import { render } from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../text.schema.yml'));
const {
  tag,
  display,
  color,
  align,
  opacity,
  quoted,
  'line-height': lineHeight,
  'letter-spacing': letterSpacing,
  'text-transform': textTransform,
  'font-family': fontFamily,
  'font-size': fontSize,
  'font-style': fontStyle,
  'font-weight': fontWeight,
} = schema.properties;

const timeout = 90000;

describe('<bolt-text> Component', () => {
  let page;

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
      waitLoad: true,
      waitNetworkIdle: true, // defaults to false
    });
  }, timeout);

  // Basic Usage (Shadow DOM)
  test('Default <bolt-text> w/ Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is bolt text`;
      document.body.appendChild(text);

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  // Basic Usage (Light DOM)
  test('Default <bolt-text> w/o Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is bolt text`;
      document.body.appendChild(text);
      text.useShadow = false;
      text.updated();

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);

    expect(
      renderedHTML
        .querySelector('.c-bolt-text-v2')
        .classList.contains('c-bolt-text-v2--font-size-medium'),
    ).toBe(true);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  // Headline and xxxlarge size (Shadow DOM)
  test('<bolt-text> with headline and xxxlarge font-size w/ Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is bolt text`;
      text.setAttribute('headline', true);
      text.setAttribute('font-size', 'xxxlarge');
      document.body.appendChild(text);

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  // Headline and xxxlarge size (Light DOM)
  test('<bolt-text> with headline and xxxlarge font-size w/o Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is bolt text`;
      text.setAttribute('headline', true);
      text.setAttribute('font-size', 'xxxlarge');
      document.body.appendChild(text);
      text.useShadow = false;
      text.updated();

      return text.outerHTML;
    });

    expect(
      renderedHTML
        .querySelector('.c-bolt-text-v2')
        .classList.contains('c-bolt-text-v2--font-size-xxxlarge'),
    ).toBe(true);

    const renderedHTML = await html(renderedTextHTML);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  // @todo: Bold, wide letter spacing, color, and quoted
});
