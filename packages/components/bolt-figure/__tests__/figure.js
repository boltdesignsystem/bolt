import {
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';

describe('figure', () => {
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
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });
  });

  test("Figures without any `default` slotted content won't render a <figcaption>", async function() {
    const renderedFigureHTML = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<bolt-figure><img slot="media" src="/fixtures/landscape-16x9-mountains.jpg"></bolt-figure>',
      );
      const figure = document.querySelector('bolt-figure');
      await customElements.whenDefined('bolt-figure');
      await figure.updateComplete;

      // add a large border to the <bolt-figure> so an empty figcaption would better show up on the VRT
      figure.style.border = '4px solid green';

      return figure.renderRoot.innerHTML;
    });

    const renderedInnerHTML = await html('<div></div>');
    renderedInnerHTML.innerHTML = renderedFigureHTML;

    expect(
      renderedInnerHTML
        .querySelector('figure')
        .classList.contains('c-bolt-figure'),
    ).toBe(true);

    expect(renderedInnerHTML.querySelector('.c-bolt-figure__caption')).toBe(
      null,
    );

    expect(renderedInnerHTML).toMatchSnapshot();
  });

  test('Figures renders slotted `default` and `media` content', async function() {
    const renderedFigureHTML = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<bolt-figure><img slot="media" src="/fixtures/landscape-16x9-mountains.jpg">Caption text goes here</bolt-figure>',
      );
      const figure = document.querySelector('bolt-figure');
      await customElements.whenDefined('bolt-figure');
      await figure.updateComplete;

      // add a large border to the <bolt-figure> so an empty figcaption would better show up on the VRT
      figure.style.border = '4px solid green';
      return figure.renderRoot.innerHTML;
    });

    const renderedHTML = await html(`<div></div>`);
    renderedHTML.innerHTML = renderedFigureHTML;

    expect(
      renderedHTML.querySelector('figure').classList.contains('c-bolt-figure'),
    ).toBe(true);

    expect(
      renderedHTML
        .querySelector('figcaption')
        .classList.contains('c-bolt-figure__caption'),
    ).toBe(true);

    expect(renderedHTML).toMatchSnapshot();
  });
});
