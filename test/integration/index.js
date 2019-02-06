import { render, renderString } from '@bolt/twig-renderer';
import './setup';
import chaiJestSnapshot from 'chai-jest-snapshot';
import jestSerializerHtml from 'jest-serializer-html';
import chai, { expect } from 'chai';
import { nextAnimationFrame } from 'domsuite';
import { fixture } from '@open-wc/testing-helpers';
import { generateBaselineScreenshots } from './generate-baseline-screenshots';

const puppeteer = require('puppeteer');
const { startServer } = require('polyserve');
const path = require('path');
const fs = require('fs');

chai.use(chaiJestSnapshot);
chai.use(require('chai-dom'));

chaiJestSnapshot.addSerializer(jestSerializerHtml);

before(function() {
  chaiJestSnapshot.resetSnapshotRegistry();
});

beforeEach(function() {
  chaiJestSnapshot.configureUsingMochaContext(this);
  chaiJestSnapshot.setFilename(
    path.join('__snapshots__', `${path.basename(__filename)}.snap`),
  );
});

// const baselineDir = `${process.cwd()}/screenshots/`;

describe('<bolt-button> web component mocha tests', function() {
  let polyserve, browser, page;

  before(async function() {
    polyserve = await startServer({
      port: 4444,
      root: path.join(__dirname, '../../www'),
      moduleResolution: 'node',
    });

    // // Create the test directory if needed.
    // if (!fs.existsSync(baselineDir)) {
    //   fs.mkdirSync(baselineDir);
    // }

    // if (!fs.existsSync(baselineDir + '/baseline')) {
    //   fs.mkdirSync(baselineDir + '/baseline');
    // }

    // if (!fs.existsSync(baselineDir + '/current')) {
    //   fs.mkdirSync(baselineDir + '/current');
    // }

    // // And it's subdirectories.
    // if (!fs.existsSync(`${baselineDir}/wide`)) {
    //   fs.mkdirSync(`${baselineDir}/wide`);
    // }
    // if (!fs.existsSync(`${baselineDir}/narrow`)) {
    //   fs.mkdirSync(`${baselineDir}/narrow`);
    // }
  });

  after(done => polyserve.close(done));

  beforeEach(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto(
      'http://127.0.0.1:4444/pattern-lab/patterns/02-components-button-50-custom-element-buttons/02-components-button-50-custom-element-buttons.html',
    );
  });

  afterEach(() => browser.close());

  it('Default <bolt-button> w/o Shadow DOM renders', async function() {
    const defaultButtonHTML = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Hello World!';
      document.body.appendChild(btn);
      btn.useShadow = false;
      btn.updated();
      return btn.outerHTML;
    });

    const elem = await fixture(defaultButtonHTML);

    expect(elem)
      .to.have.descendant('.c-bolt-button')
      .and.have.class('c-bolt-button--primary');

    expect(elem).to.matchSnapshot();
  });

  it('Default <bolt-button> with Shadow DOM renders', async function() {
    // await page.goto(
    //   'http://127.0.0.1:4444/pattern-lab/patterns/02-components-button-50-custom-element-buttons/02-components-button-50-custom-element-buttons.html',
    // );

    const defaultButtonShadowRoot = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test -- Shadow Root HTML';
      document.body.appendChild(btn);
      btn.updated();
      return btn.shadowRoot.innerHTML;
    });

    const defaultButtonOuter = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test -- Outer HTML';
      document.body.appendChild(btn);
      // btn.useShadow = false;
      btn.updated();
      return btn.outerHTML;
    });

    const outerEl = await fixture(defaultButtonOuter);
    expect(outerEl).to.contain.text('Button Test -- Outer HTML');
    expect(outerEl).to.matchSnapshot();

    const shadowEl = await fixture(`<div>${defaultButtonShadowRoot}</div>`);
    expect(shadowEl).to.contain('style');
    expect(shadowEl).to.contain('button');
    expect(shadowEl).to.matchSnapshot();
  });

  it('Default <bolt-button> anchor using Shadow DOM has the correct tag', async function() {
    // await page.goto(
    //   'http://127.0.0.1:4444/pattern-lab/patterns/02-components-button-50-custom-element-buttons/02-components-button-50-custom-element-buttons.html',
    // );

    const defaultButtonAnchorShadowRoot = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test Anchor -- Shadow Root HTML';
      btn.setAttribute('url', 'https://www.google.com');
      document.body.appendChild(btn);
      btn.updated();
      return btn.shadowRoot.innerHTML;
    });

    const defaultButtonAnchorOuter = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test Anchor -- Outer HTML';
      document.body.appendChild(btn);
      // btn.useShadow = false;
      btn.updated();
      return btn.outerHTML;
    });

    const outerEl = await fixture(defaultButtonAnchorOuter);
    expect(outerEl).to.contain.text('Button Test Anchor -- Outer HTML');
    expect(outerEl).to.matchSnapshot();

    const shadowEl = await fixture(
      `<div>${defaultButtonAnchorShadowRoot}</div>`,
    );
    expect(shadowEl).to.contain('style');
    expect(shadowEl).to.contain('a');

    expect(shadowEl)
      .to.have.descendant('a')
      .and.have.attribute('href', 'https://www.google.com');
    expect(shadowEl).to.matchSnapshot();
  });

  it('Secondary <bolt-button> renders', async function() {
    const secondaryButtonHTML = await page.evaluate(() => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Hello World!';
      btn.setAttribute('color', 'secondary');
      btn.setAttribute('id', 'qa-secondary-button');
      document.body.appendChild(btn);
      btn.useShadow = false;
      btn.updated();
      return btn.outerHTML;
    });

    const elem = await fixture(secondaryButtonHTML);

    expect(elem)
      .to.have.descendant('.c-bolt-button')
      .and.have.class('c-bolt-button--secondary');

    expect(elem).to.matchSnapshot();
  });

  it('<bolt-button> supports slotted content', async function() {
    // await page.goto(
    //   'http://127.0.0.1:4444/pattern-lab/patterns/02-components-00-overview/02-components-00-overview.html',
    // );

    const secondaryButtonHTML = await page.evaluate(() => {
      // document
      //   .querySelector('bolt-band')
      //   .parentNode.removeChild(document.querySelector('bolt-band'));

      const form = document.createElement('form');
      document.body.appendChild(form);

      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button With Slotted Icon';
      btn.setAttribute('color', 'primary');

      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'chevron-right');
      icon.setAttribute('slot', 'after');
      btn.appendChild(icon);

      form.appendChild(btn);
      btn.updated();
      icon.updated();

      return btn.outerHTML;
    });
  });

  it('Server-side pre-rendered <bolt-button> with Shadow DOM renders as expected @twig', async function() {
    await page.goto(
      'http://127.0.0.1:4444/pattern-lab/patterns/02-components-00-overview/02-components-00-overview.html',
    );

    const twigHTML = await render('@bolt-components-button/button.twig', {
      text: 'Twig Pre-Rendered Web Component',
      url: 'https://www.google.com',
      attributes: {
        class: ['js-test-button'],
      },
    });

    // console.log(twigHTML);

    // const obj = {
    //   func: nextAnimationFrame.toString(),
    // };

    const renderedResults = await page.evaluate(twigHTML => {
      const shadowTemplate = document.createElement('template');
      shadowTemplate.innerHTML = `<div>${twigHTML.html}</div>`;
      shadowTemplate.content.firstChild.classList.add('js-test-button--shadow');

      document.body.insertBefore(
        shadowTemplate.content.cloneNode(true),
        document.body.firstChild,
      );

      const noShadowTemplate = document.createElement('template');
      noShadowTemplate.innerHTML = `<form>${twigHTML.html}</form>`;
      noShadowTemplate.content.firstChild.classList.add(
        'js-test-button--no-shadow',
      );

      document.body.insertBefore(
        noShadowTemplate.content.cloneNode(true),
        document.body.firstChild,
      );

      const buttonWithShadowDom = document.querySelector(
        '.js-test-button--shadow bolt-button',
      );
      const buttonWithoutShadowDom = document.querySelector(
        '.js-test-button--no-shadow bolt-button',
      );

      buttonWithShadowDom.updated();
      buttonWithoutShadowDom.updated();

      return {
        shadowOuter: buttonWithShadowDom.outerHTML,
        shadowInner: buttonWithShadowDom.renderRoot.innerHTML,
        noShadowOuter: buttonWithoutShadowDom.outerHTML,
        noShadowInner: buttonWithoutShadowDom.renderRoot.innerHTML,
      };
    }, twigHTML);

    const shadowOuter = await fixture(renderedResults.shadowOuter);
    const shadowInner = await fixture(renderedResults.shadowInner);
    const noShadowOuter = await fixture(renderedResults.noShadowOuter);
    const noShadowInner = await fixture(renderedResults.noShadowOuter);

    expect(shadowOuter).to.contain.text('Twig Pre-Rendered Web Component');
    expect(shadowInner).to.not.contain.text('Twig Pre-Rendered Web Component');
    expect(noShadowOuter).to.contain.text('Twig Pre-Rendered Web Component');
    expect(noShadowInner).to.contain.text('Twig Pre-Rendered Web Component');
    // expect(outerEl).to.matchSnapshot();

    // console.log(shadowInner);
    expect(shadowInner).to.have.html('<slot></slot>');
    // expect(shadowOuter.descendant('slot')).not.to.have.length(3);
    // expect(shadowInner.querySelector('slot')).to.have.length(3);

    // expect(noShadowOuter).to.contain.text('Twig Pre-Rendered Web Component');

    //     expect(elem)
    //     .to.have.descendant('.c-bolt-button')
    //     .and.have.class('c-bolt-button--secondary');

    //     // expect(elem).to.matchSnapshot();

    //     // const secondaryButtonHTML = await page.evaluate(() => {
    //     //   // document
    //     //   //   .querySelector('bolt-band')
    //     //   //   .parentNode.removeChild(document.querySelector('bolt-band'));

    //     //   const form = document.createElement('form');
    //     //   document.body.appendChild(form);

    //     //   const btn = document.createElement('bolt-button');
    //     //   btn.textContent = 'Button With Slotted Icon';
    //     //   btn.setAttribute('color', 'primary');

    //     //   const icon = document.createElement('bolt-icon');
    //     //   icon.setAttribute('name', 'chevron-right');
    //     //   icon.setAttribute('slot', 'after');
    //     //   btn.appendChild(icon);

    //     //   form.appendChild(btn);
    //     //   btn.updated();
    //     //   icon.updated();

    //     //   return btn.outerHTML;
    //     // });

    //   // const image = await page.screenshot();
    //   // expect(image).toMatchImageSnapshot();

    //   // const image = await page.screenshot();

    //   // console.log(image);

    //   // console.log(process.env.CHAI_JEST_SNAPSHOT_UPDATE_ALL);

    //   // return await generateBaselineScreenshots(page);

    //   // console.log(secondaryButtonHTML);

    //   // const elem = await fixture(secondaryButtonHTMLWithIcon);

    //   // expect(elem)
    //   //   .to.have.descendant('.c-bolt-button')
    //   //   .and.have.class('c-bolt-button--secondary');

    //   // expect(elem).to.matchSnapshot();
  });
});
