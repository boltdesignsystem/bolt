import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../accordion.schema.yml'));
const { single, spacing } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 120000;

const accordionInnerHTML = `
  <bolt-accordion>
    <bolt-accordion-item>
      <bolt-text slot="trigger">Accordion item 1</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
    <bolt-accordion-item>
      <bolt-text slot="trigger">Accordion item 2</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
    <bolt-accordion-item>
      <bolt-text slot="trigger">Accordion item 3</bolt-text>
      <bolt-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</bolt-text>
    </bolt-accordion-item>
  </bolt-accordion>
`;

describe('<bolt-accordion> Component', () => {
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
    await stopTwigRenderer();
    await page.close();
  }, timeout);

  test('basic usage', async () => {
    const results = await renderTwig(
      '@bolt-components-accordion/accordion.twig',
      {
        items: [
          {
            trigger: 'Accordion item 1',
            content: 'This is the accordion content.',
          },
          {
            trigger: 'Accordion item 2',
            content: 'This is the accordion content.',
          },
          {
            trigger: 'Accordion item 3',
            content: 'This is the accordion content.',
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  single.enum.forEach(async singleChoice => {
    test(`expand single items: ${singleChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-accordion/accordion.twig',
        {
          single: singleChoice,
          items: [
            {
              trigger: 'Accordion item 1',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 2',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 3',
              content: 'This is the accordion content.',
            },
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  spacing.enum.forEach(async spacingChoice => {
    test(`spacing: ${spacingChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-accordion/accordion.twig',
        {
          spacing: spacingChoice,
          items: [
            {
              trigger: 'Accordion item 1',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 2',
              content: 'This is the accordion content.',
            },
            {
              trigger: 'Accordion item 3',
              content: 'This is the accordion content.',
            },
          ],
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test(`Inactive item`, async () => {
    const results = await renderTwig(
      '@bolt-components-accordion/accordion.twig',
      {
        items: [
          {
            trigger: 'Active accordion item',
            content: 'This is the accordion content.',
          },
          {
            trigger: 'Inactive accordion item',
            content: 'This is the accordion content.',
            inactive: true,
          },
          {
            trigger: 'Active accordion item',
            content: 'This is the accordion content.',
          },
        ],
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-accordion> with Shadow DOM renders', async function() {
    const accordionOuter = await page.evaluate(accordionInnerHTML => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = accordionInnerHTML;
      document.body.appendChild(wrapper);

      const accordion = document.querySelector('bolt-accordion');
      const accordionItems = Array.from(
        document.querySelectorAll('bolt-accordion-item'),
      );
      [accordion, ...accordionItems].forEach(el => el.updated());

      return accordion.outerHTML;
    }, accordionInnerHTML);

    const renderedShadowDomHTML = await html(accordionOuter);

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
  });

  test('Default <bolt-accordion> w/o Shadow DOM renders', async function() {
    const accordionOuter = await page.evaluate(accordionInnerHTML => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = accordionInnerHTML;
      document.body.appendChild(wrapper);

      const accordion = document.querySelector('bolt-accordion');
      const accordionItems = Array.from(
        document.querySelectorAll('bolt-accordion-item'),
      );
      [accordion, ...accordionItems].forEach(el => {
        el.setAttribute('no-shadow', '');
        el.updated();
      });

      return accordion.outerHTML;
    }, accordionInnerHTML);

    const renderedShadowDomHTML = await html(accordionOuter);

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
  });
});
