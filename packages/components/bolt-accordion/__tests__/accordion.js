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
    const defaultAccordionShadowRoot = await page.evaluate(async () => {
      const accordion = document.createElement('bolt-accordion');
      accordion.innerHTML = `
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
        </bolt-accordion-item>`;

      document.body.appendChild(accordion);

      const accordionItems = Array.from(
        accordion.querySelectorAll('bolt-accordion-item'),
      );
      const allElements = [accordion, ...accordionItems];
      return await Promise.all(
        allElements.map(element => {
          if (element._wasInitiallyRendered) return;
          return new Promise((resolve, reject) => {
            element.addEventListener('ready', resolve);
            element.addEventListener('error', reject);
          });
        }),
      ).then(() => {
        return accordion.renderRoot.innerHTML;
      });
    });

    const defaultAccordionItemShadowRoot = await page.evaluate(async () => {
      const accordionItem = document.querySelector('bolt-accordion-item');
      return accordionItem.renderRoot.innerHTML;
    });

    const accordionRenderedHTML = await html(defaultAccordionShadowRoot);
    const accordionItemRenderedHTML = await html(
      defaultAccordionItemShadowRoot,
    );

    expect(accordionRenderedHTML).toMatchSnapshot();
    expect(accordionItemRenderedHTML).toMatchSnapshot();

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('Default <bolt-accordion> w/o Shadow DOM renders', async function() {
    const defaultAccordionShadowRoot = await page.evaluate(async () => {
      const accordion = document.createElement('bolt-accordion');
      accordion.setAttribute('no-shadow', '');
      accordion.innerHTML = `
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
        </bolt-accordion-item>`;

      document.body.appendChild(accordion);

      const accordionItems = Array.from(
        accordion.querySelectorAll('bolt-accordion-item'),
      );
      const allElements = [accordion, ...accordionItems];
      return await Promise.all(
        allElements.map(element => {
          if (element._wasInitiallyRendered) return;
          return new Promise((resolve, reject) => {
            element.addEventListener('ready', resolve);
            element.addEventListener('error', reject);
          });
        }),
      ).then(() => {
        return accordion.renderRoot.innerHTML;
      });
    });

    const defaultAccordionItemShadowRoot = await page.evaluate(async () => {
      const accordionItem = document.querySelector('bolt-accordion-item');
      return accordionItem.renderRoot.innerHTML;
    });

    const accordionRenderedHTML = await html(defaultAccordionShadowRoot);
    const accordionItemRenderedHTML = await html(
      defaultAccordionItemShadowRoot,
    );

    expect(accordionRenderedHTML).toMatchSnapshot();
    expect(accordionItemRenderedHTML).toMatchSnapshot();

    await page.waitFor(500);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });
});
