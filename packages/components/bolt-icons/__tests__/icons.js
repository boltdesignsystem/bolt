import { fixture as html } from '@open-wc/testing-helpers';
import { render, stop as stopTwigRenderer } from '@bolt/twig-renderer';

const fs = require('fs-extra');
const path = require('path');
const resolve = require('resolve');
const yaml = require('js-yaml');

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function collectFileNames(dir, fileList = []) {
  fs.readdirSync(dir).map(file => {
    fileList = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), fileList)
      : [...fileList, path.parse(file).name];
  });
  return fileList;
}

const timeout = 60000;
const boltIconsDir = path.dirname(resolve.sync('@bolt/components-icons/package.json'));
const boltIconDir = path.dirname(resolve.sync('@bolt/components-icon/package.json'));
const iconsJsFile = path.join(boltIconsDir, 'src/index.js');
const schemaFile = path.join(boltIconDir, 'icon.schema.yml');
const schema = yaml.safeLoad(fs.readFileSync(schemaFile, 'utf8'));

describe('<bolt-icon> Component', async () => {
  let page;

  afterAll(async () => {
    const icons = await collectFileNames(
      path.join(boltIconsDir, '__tests__/icons/'),
    );

    await icons.map(icon => {
      fs.remove(path.join(boltIconsDir, `src/icons/${icon}.js`));
    });

    await fs.readFile(iconsJsFile, { encoding: 'utf-8' }, (err, data) => {
      if (err) throw error;

      let dataArray = data.split('\n');

      for (const line of icons) {
        dataArray = dataArray.filter(function(item) {
          return item !== `export * from './icons/${line}';`;
        });
      }

      const updatedData = dataArray.join('\n');
      fs.writeFile(iconsJsFile, updatedData, 'utf-8');
    });

    await yaml.safeLoad(
      fs.readFile(schemaFile, { encoding: 'utf-8' }, (err, data) => {
        if (err) throw error;

        let schemaIconNames = schema.properties.name.enum;

        for (const icon of icons) {
          schemaIconNames = schemaIconNames.filter(function(item) {
            return item !== icon;
          });
        }

        schema.properties.name.enum = schemaIconNames;
        fs.writeFile(schemaFile, yaml.safeDump(schema));
      }),
    );

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

  test('basic usage', async () => {
    const results = await renderTwig('@bolt-components-icon/icon.twig', {
      name: 'add-open',
      background: 'square',
      size: 'medium',
      color: 'teal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-icon> with Shadow DOM renders', async function() {
    const defaultIconShadowRoot = await page.evaluate(() => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'add-open');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      icon.updated();
      return icon.renderRoot.innerHTML;
    });

    const defaultIconOuter = await page.evaluate(() => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'add-open');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      icon.updated();
      return icon.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultIconShadowRoot);
    const renderedHTML = await html(defaultIconOuter);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });

  test('Additional <bolt-icon> with Shadow DOM renders', async function() {
    const defaultIconShadowRoot = await page.evaluate(() => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'yeti');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      icon.updated();
      return icon.renderRoot.innerHTML;
    });

    const defaultIconOuter = await page.evaluate(() => {
      const icon = document.createElement('bolt-icon');
      icon.setAttribute('name', 'yeti');
      icon.setAttribute('background', 'circle');
      icon.setAttribute('size', 'large');
      document.body.appendChild(icon);
      icon.updated();
      return icon.outerHTML;
    });

    const renderedShadowDomHTML = await html(defaultIconShadowRoot);
    const renderedHTML = await html(defaultIconOuter);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });

    expect(renderedShadowDomHTML).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();
  });
});
