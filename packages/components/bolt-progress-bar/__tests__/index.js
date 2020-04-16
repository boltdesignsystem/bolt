import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
  vrtDefaultConfig,
} from '../../../testing/testing-helpers';
const timeout = 90000;

describe('Progress Bar', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  });

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

  test('Basic Progress Bar usage', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 50,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const renderedProgressBarMarkup = await page.evaluate(async results => {
      document.body.insertAdjacentHTML('beforeend', results.html);
      const progressBar = document.querySelector('bolt-progress-bar');
      await progressBar.updateComplete;
      return progressBar.renderRoot.innerHTML;
    }, results);

    const renderedHTML = await html(`<div>${renderedProgressBarMarkup}</div>`);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  test('Progress Bar w/o Shadow DOM', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 50,
        attributes: {
          'no-shadow': true,
        },
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const renderedProgressBarMarkup = await page.evaluate(async results => {
      document.body.insertAdjacentHTML('beforeend', results.html);
      const progressBar = document.querySelector('bolt-progress-bar');
      await progressBar.updateComplete;
      return progressBar.outerHTML;
    }, results);

    const renderedHTML = await html(`<div>${renderedProgressBarMarkup}</div>`);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  test('100% Complete + Title', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        value: 100,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const renderedProgressBarMarkup = await page.evaluate(async results => {
      document.body.insertAdjacentHTML('beforeend', results.html);
      const progressBar = document.querySelector('bolt-progress-bar');
      await progressBar.updateComplete;
      return progressBar.renderRoot.innerHTML;
    }, results);

    const renderedHTML = await html(`<div>${renderedProgressBarMarkup}</div>`);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  test('Custom Label Text', async () => {
    const results = await render(
      '@bolt-components-progress-bar/progress-bar.twig',
      {
        title: 'Current Progress',
        min: 1,
        max: 6,
        value: 2,
        valueFormat: 'step',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const renderedProgressBarMarkup = await page.evaluate(async results => {
      document.body.insertAdjacentHTML('beforeend', results.html);
      const progressBar = document.querySelector('bolt-progress-bar');
      await progressBar.updateComplete;
      return progressBar.renderRoot.innerHTML;
    }, results);

    const renderedHTML = await html(`<div>${renderedProgressBarMarkup}</div>`);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });
});
