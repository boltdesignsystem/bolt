import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(
  join(__dirname, '../interactive-pathways.schema.yml'),
);
const { tag } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('interactive pathways', () => {
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

  test('basic interactive-pathways component renders', async () => {
    const results = await renderTwig(
      '@bolt-components-interactive-pathways/interactive-pathways.twig',
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic interactive-pathways component with the global `no-shadow` prop added', async () => {
    const results = await renderTwig(
      '@bolt-components-interactive-pathways/interactive-pathways.twig',
      {
        no_shadow: true,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('interactive-pathways with outer CSS class via Drupal Attributes', async () => {
    const results = await renderTwig(
      '@bolt-components-interactive-pathways/interactive-pathways.twig',
      {
        attributes: {
          class: ['u-bolt-margin-top-medium'],
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test.skip('Default <bolt-interactive-pathways> w/o Shadow DOM renders', async function() {
    const renderedComponentHTML = await page.evaluate(() => {
      const component = document.createElement('bolt-interactive-pathways');
      component.textContent = 'interactive-pathways Test';
      document.body.appendChild(component);
      component.useShadow = false;
      component.updated();
      return component.outerHTML;
    });

    const renderedHTML = await html(renderedComponentHTML);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test.skip('Default <bolt-interactive-pathways> with Shadow DOM renders', async function() {
    const defaultComponentShadowRoot = await page.evaluate(() => {
      const component = document.createElement('bolt-interactive-pathways');
      component.textContent =
        'interactive-pathways Component Test -- Shadow Root HTML';
      document.body.appendChild(component);
      component.updated();
      return component.renderRoot.innerHTML;
    });

    const defaultComponentOuter = await page.evaluate(() => {
      const component = document.createElement('bolt-interactive-pathways');
      component.textContent =
        'interactive-pathways Component Test -- Outer HTML';
      document.body.appendChild(component);
      component.updated();
      return component.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultComponentShadowRoot);
    const renderedHTML = await html(defaultComponentOuter);

    expect(renderedHTML.textContent).toEqual(
      'interactive-pathways Component Test -- Outer HTML',
    );

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });
});
