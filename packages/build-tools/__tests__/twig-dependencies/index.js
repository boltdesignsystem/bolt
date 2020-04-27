const { render } = require('@bolt/twig-renderer');
const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');

let generatedTwigNamespaces;
let generatedCSS;

const {
  startServer,
  stopServer,
} = require('@bolt/testing-server/server-only.js');

describe('Build Deps Resolution', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

  beforeEach(async () => {
    await page.evaluate(() => {
      document.body.innerHTML = '';
    });
  });

  beforeAll(async () => {
    await shell.exec(`bolt build --prod --config-file .boltrc.js`, {
      silent: true,
    });

    const serverPath = await startServer({
      wwwDir: './dist',
    });

    page = await global.__BROWSER__.newPage();
    await page.goto(serverPath, {
      timeout: 0,
    });

    generatedTwigNamespaces = JSON.parse(
      fs.readFileSync(
        path.resolve(
          process.cwd(),
          `./dist/build/data/twig-namespaces.bolt.json`,
        ),
      ),
    );

    generatedCSS = fs.readFileSync(
      path.resolve(process.cwd(), `./dist/build/bolt-global.css`),
    );
  });

  test('compiled bolt-global.css includes styles for other global Bolt components listed in package.json', async () => {
    expect(generatedCSS.includes('.c-bolt-ratio')).toBe(true);
  });

  test('compiled CSS does NOT contain styles for non-global Bolt components', async () => {
    expect(generatedCSS.includes('bolt-carousel')).toBe(false);
  });

  test('auto-generated Twig namespaces includes Bolt components listed in the package.json', async () => {
    expect(
      Object.keys(generatedTwigNamespaces).includes('bolt-components-ratio'),
    ).toBe(true);
  });

  test('auto-generated Twig namespaces includes individual Bolt components', async () => {
    expect(
      Object.keys(generatedTwigNamespaces).includes('bolt-components-carousel'),
    ).toBe(true);
  });

  test('compiled code with auto-injected dependencies renders correctly', async () => {
    const results = await render('@bolt-components-image/image.twig', {
      src: '/fixtures/1200x660.jpg',
      alt: 'A Rock Climber',
      lazyload: true,
    });

    const htmlResult = results.html;

    await page.evaluate(async htmlResult => {
      document.body.insertAdjacentHTML('beforeend', `${htmlResult}`);
    }, htmlResult);

    await page.waitFor(500);

    const renderedHTML = await page.evaluate(async () => {
      const image = document.querySelector('bolt-image');
      await customElements.whenDefined('bolt-image');
      await image.updateComplete;
      return image.renderRoot.innerHTML;
    });

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
