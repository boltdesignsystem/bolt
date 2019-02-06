import { render } from '@bolt/twig-renderer';
import '../../../../mocha-setup-env';
import chaiJestSnapshot from 'chai-jest-snapshot';
import jestSerializerHtml from 'jest-serializer-html';
import chai, { expect } from 'chai';
import { fixture } from '@open-wc/testing-helpers';
const { getConfig } = require('@bolt/build-tools/utils/config-store');

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

describe('<bolt-button> web component mocha tests', function() {
  let polyserve, browser, page;

  before(async function() {
    const config = await getConfig();
    console.log(path.join(process.cwd(), config.wwwDir));
    polyserve = await startServer({
      port: 4444,
      root: path.join(process.cwd(), config.wwwDir),
      moduleResolution: 'node',
    });
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
    const secondaryButtonHTML = await page.evaluate(() => {
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

    // expect(shadowInner).to.have.html('<slot></slot>');
  });
});
