import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
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
  // @todo [Mai] How do I deal with kebab-case?
  // line-height,
  // letter-spacing,
  // text-transform,
  // font-family,
  // font-size,
  // font-style,
  // font-weight,
} = schema.properties;

describe('<bolt-text> Component', async () => {
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

  // Basic Usage
  test('Default <bolt-text> with Shadow DOM renders', async function() {
    const defaultTextShadowRoot = await page.evaluate(() => {
      const boltText = document.createElement('bolt-text');
      boltText.textContent = 'Text Test -- Shadow Root HTML';
      document.body.appendChild(boltText);
      boltText.updated();
      return boltText.renderRoot.innerHTML;
    });

    const defaultTextOuter = await page.evaluate(() => {
      const boltText = document.createElement('bolt-text');
      boltText.textContent = 'Text Test -- Outer HTML';
      document.body.appendChild(boltText);
      boltText.updated();
      return boltText.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultTextShadowRoot);
    const renderedHTML = await html(defaultTextOuter);

    expect(renderedHTML.textContent).toEqual('Text Test -- Outer HTML');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });

  // Props
  // @todo [Mai] I need to test combinations of props.
  // 1. Headline and xxxlarge size
  // 2. Bold, wide letter spacing, color, and quoted
  display.enum.forEach(async displayChoice => {
    test(`text display: ${displayChoice}`, async () => {
      const results = await renderTwig('@bolt-components-text/text.twig', {
        display: displayChoice,
        text: 'This is text',
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
