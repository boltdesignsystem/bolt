import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { fixture as html } from '@open-wc/testing-helpers';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../button.schema.yml'));
const { tag } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 60000;

describe('button', async () => {
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

  test('basic button', async () => {
    const results = await renderTwig('@bolt-components-button/button.twig', {
      text: 'Hello World',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  tag.enum.forEach(async tagChoice => {
    test(`button tag: ${tagChoice}`, async () => {
      const results = await renderTwig('@bolt-components-button/button.twig', {
        text: 'Hello World',
        tag: tagChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Button with outer classes via Drupal Attributes', async () => {
    const results = await renderTwig('@bolt-components-button/button.twig', {
      text: 'Button with outer classes',
      attributes: {
        class: ['u-bolt-padding-medium'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with inner classes via Drupal Attributes', async () => {
    const results = await renderTwig('@bolt-components-button/button.twig', {
      text: 'Button with inner classes',
      attributes: {
        class: ['is-active'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with outer JS-class via Drupal Attributes', async () => {
    const results = await renderTwig('@bolt-components-button/button.twig', {
      text: 'Button with outer JS-prefixed class',
      attributes: {
        class: ['js-click-me'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with c-bolt- class is thrown out', async () => {
    const results = await renderTwig('@bolt-components-button/button.twig', {
      text: 'Button with outer JS-prefixed class',
      attributes: {
        class: ['c-bolt-button--secondary'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with an onClick param renders properly', async () => {
    const results = await renderTwig('@bolt-components-button/button.twig', {
      text: 'Button with onClick via param',
      onClick: 'on-click-test',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with an onClick attributes renders properly', async () => {
    const results = await renderTwig('@bolt-components-button/button.twig', {
      text: 'Button w/ onClick via attributes',
      attributes: {
        'on-click': 'on-click-test',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-button> w/o Shadow DOM renders', async function() {
    const renderedButtonHTML = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Hello World!';
      document.body.appendChild(btn);
      btn.useShadow = false;
      btn.updated();
      return btn.outerHTML;
    });

    const renderedHTML = await html(renderedButtonHTML);

    expect(
      renderedHTML
        .querySelector('.c-bolt-button')
        .classList.contains('c-bolt-button--primary'),
    ).toBe(true);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedHTML).toMatchSnapshot();
  });

  test('Default <bolt-button> with Shadow DOM renders', async function() {
    const defaultButtonShadowRoot = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test -- Shadow Root HTML';
      document.body.appendChild(btn);
      btn.updated();
      return btn.renderRoot.innerHTML;
    });

    const defaultButtonOuter = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test -- Outer HTML';
      document.body.appendChild(btn);
      btn.updated();
      return btn.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultButtonShadowRoot);
    const renderedHTML = await html(defaultButtonOuter);

    expect(renderedHTML.textContent).toEqual('Button Test -- Outer HTML');
    // expect(
    //   renderedShadowDomHTML
    //     .querySelector('.c-bolt-button')
    //     .classList.contains('c-bolt-button--primary'),
    // ).toBe(true);

    // expect(renderedShadowDomHTML.querySelector('style')).toBe(true);
    // expect(renderedShadowDomHTML.querySelector('button')).toBe(true);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });

  // test('Default <bolt-button> anchor using Shadow DOM has the correct tag', async function() {
  //   const defaultButtonAnchorShadowRoot = await page.evaluate(() => {
  //     const btn = document.createElement('bolt-button');
  //     btn.textContent = 'Button Test Anchor -- Shadow Root HTML';
  //     btn.setAttribute('url', 'https://www.google.com');
  //     document.body.appendChild(btn);
  //     btn.updated();
  //     return btn.shadowRoot.innerHTML;
  //   });

  //   const defaultButtonAnchorOuter = await page.evaluate(() => {
  //     const btn = document.createElement('bolt-button');
  //     btn.textContent = 'Button Test Anchor -- Outer HTML';
  //     document.body.appendChild(btn);
  //     // btn.useShadow = false;
  //     btn.updated();
  //     return btn.outerHTML;
  //   });

  //   const outerElement = await fixture(defaultButtonAnchorOuter);
  //   // const outerElementJSX = render(ReactHtmlParser(defaultButtonAnchorOuter));

  //   expect(outerElement.text()).toEqual('Button Test Anchor -- Outer HTML');
  //   expect(outerElement).toMatchSnapshot();

  //   const shadowEl = await fixture(
  //     `<div>${defaultButtonAnchorShadowRoot}</div>`,
  //   );
  //   expect(shadowEl.html()).to.contain('style');
  //   // expect(shadowEl).to.contain('a');

  //   // expect(shadowEl)
  //   // .to.have.descendant('a')
  //   // .and.have.attribute('href', 'https://www.google.com');
  //   expect(shadowEl).toMatchSnapshot();
  // });

  // test('Secondary <bolt-button> renders', async function() {
  //   const secondaryButtonHTML = await page.evaluate(() => {
  //     const btn = document.createElement('bolt-button');
  //     btn.textContent = 'Hello World!';
  //     btn.setAttribute('color', 'secondary');
  //     btn.setAttribute('id', 'qa-secondary-button');
  //     document.body.appendChild(btn);
  //     btn.useShadow = false;
  //     btn.updated();
  //     return btn.outerHTML;
  //   });

  //   const elem = await fixture(secondaryButtonHTML);

  //   // expect(elem)
  //   //   .to.have.descendant('.c-bolt-button')
  //   //   .and.have.class('c-bolt-button--secondary');

  //   expect(mount(elem)).toMatchSnapshot();
  // });

  // // it('<bolt-button> supports slotted content', async function() {
  // //   const secondaryButtonHTML = await page.evaluate(() => {
  // //     const form = document.createElement('form');
  // //     document.body.appendChild(form);

  // //     const btn = document.createElement('bolt-button');
  // //     btn.textContent = 'Button With Slotted Icon';
  // //     btn.setAttribute('color', 'primary');

  // //     const icon = document.createElement('bolt-icon');
  // //     icon.setAttribute('name', 'chevron-right');
  // //     icon.setAttribute('slot', 'after');
  // //     btn.appendChild(icon);

  // //     form.appendChild(btn);
  // //     btn.updated();
  // //     icon.updated();

  // //     return btn.outerHTML;
  // //   });
  // // });

  // test('Server-side pre-rendered <bolt-button> with Shadow DOM renders as expected @twig', async function() {
  //   await page.goto(
  //     'http://127.0.0.1:4444/pattern-lab/patterns/02-components-00-overview/02-components-00-overview.html',
  //   );

  //   const twigHTML = await renderTwig('@bolt-components-button/button.twig', {
  //     text: 'Twig Pre-Rendered Web Component',
  //     url: 'https://www.google.com',
  //     attributes: {
  //       class: ['js-test-button'],
  //     },
  //   });

  //   const renderedResults = await page.evaluate(twigHTML => {
  //     const shadowTemplate = document.createElement('template');
  //     shadowTemplate.innerHTML = `<div>${twigHTML.html}</div>`;
  //     shadowTemplate.content.firstChild.classList.add('js-test-button--shadow');

  //     document.body.insertBefore(
  //       shadowTemplate.content.cloneNode(true),
  //       document.body.firstChild,
  //     );

  //     const noShadowTemplate = document.createElement('template');
  //     noShadowTemplate.innerHTML = `<form>${twigHTML.html}</form>`;
  //     noShadowTemplate.content.firstChild.classList.add(
  //       'js-test-button--no-shadow',
  //     );

  //     document.body.insertBefore(
  //       noShadowTemplate.content.cloneNode(true),
  //       document.body.firstChild,
  //     );

  //     const buttonWithShadowDom = document.querySelector(
  //       '.js-test-button--shadow bolt-button',
  //     );
  //     const buttonWithoutShadowDom = document.querySelector(
  //       '.js-test-button--no-shadow bolt-button',
  //     );

  //     buttonWithShadowDom.updated();
  //     buttonWithoutShadowDom.updated();

  //     return {
  //       shadowOuter: buttonWithShadowDom.outerHTML,
  //       shadowInner: buttonWithShadowDom.renderRoot.innerHTML,
  //       noShadowOuter: buttonWithoutShadowDom.outerHTML,
  //       noShadowInner: buttonWithoutShadowDom.renderRoot.innerHTML,
  //     };
  //   }, twigHTML);

  //   const shadowOuter = await fixture(renderedResults.shadowOuter);
  //   const shadowInner = await fixture(renderedResults.shadowInner);
  //   const noShadowOuter = await fixture(renderedResults.noShadowOuter);
  //   const noShadowInner = await fixture(renderedResults.noShadowOuter);

  //   // expect(shadowOuter).to.contain.text('Twig Pre-Rendered Web Component');
  //   // expect(shadowInner).to.not.contain.text('Twig Pre-Rendered Web Component');
  //   // expect(noShadowOuter).to.contain.text('Twig Pre-Rendered Web Component');
  //   // expect(noShadowInner).to.contain.text('Twig Pre-Rendered Web Component');

  //   expect(shadowOuter).toMatchSnapshot();
  //   expect(shadowInner).toMatchSnapshot();
  //   expect(noShadowOuter).toMatchSnapshot();
  //   expect(noShadowInner).toMatchSnapshot();
  //   // expect(shadowInner).to.have.html('<slot></slot>');
  // });
});
