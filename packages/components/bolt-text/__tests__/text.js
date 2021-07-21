import { stopServer, html } from '../../../testing/testing-helpers';

const timeout = 90000;

describe('<bolt-text> Component', () => {
  let page;

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, 100);

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

  // Basic Usage (Shadow DOM)
  test('Default <bolt-text> w/ Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is regular text`;
      document.body.appendChild(text);

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);

    expect(renderedHTML).toMatchSnapshot();
  });

  // Multiple text elements (Shadow DOM)
  test('Multiple <bolt-text> elements w/ Shadow DOM render', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const wrapper = document.createElement('div');
      const text1 = document.createElement('bolt-text');
      const text2 = document.createElement('bolt-text');

      text1.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
      text2.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

      wrapper.appendChild(text1);
      wrapper.appendChild(text2);
      document.body.appendChild(wrapper);

      return wrapper.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);

    expect(renderedHTML).toMatchSnapshot();
  });

  // Code text (Shadow DOM)
  test('Code text using <bolt-text> w/ Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is code text`;
      text.setAttribute('font-family', 'code');
      document.body.appendChild(text);

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);
    expect(renderedHTML).toMatchSnapshot();
  });

  // xxxlarge Headline (Shadow DOM)
  test('xxxlarge headline using <bolt-text> w/ Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is xxxlarge headline`;
      text.setAttribute('headline', true);
      text.setAttribute('font-size', 'xxxlarge');
      document.body.appendChild(text);

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);

    expect(renderedHTML).toMatchSnapshot();
  });

  // xxxlarge Headline (Light DOM)
  test('xxxlarge headline using <bolt-text> w/o Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(async () => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is xxxlarge headline`;
      text.setAttribute('no-shadow', '');
      text.setAttribute('headline', true);
      text.setAttribute('font-size', 'xxxlarge');
      document.body.appendChild(text);
      await text.updateComplete;

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);
    const image = await page.screenshot();

    expect(
      renderedHTML
        .querySelector('.c-bolt-text-v2')
        .classList.contains('c-bolt-text-v2--font-size-xxxlarge'),
    ).toBe(true);

    expect(
      renderedHTML
        .querySelector('.c-bolt-text-v2')
        .classList.contains('is-long'),
    ).toBe(false);

    expect(renderedHTML).toMatchSnapshot();
  });

  // Long xxxlarge Headline (Shadow DOM)
  test('Long xxxlarge headline using <bolt-text> w/ Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in gravida ex.`;
      text.setAttribute('headline', true);
      text.setAttribute('font-size', 'xxxlarge');
      document.body.appendChild(text);

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);

    expect(renderedHTML).toMatchSnapshot();
  });

  // Long xxxlarge Headline (Light DOM)
  // @TODO Disabling test. For unknown reasons using `await text.updateComplete` throws `ReferenceError: fontSize is not defined` error. Test is useless without the `await`.
  // test('Long xxxlarge headline using <bolt-text> w/o Shadow DOM renders', async function() {
  //   const renderedTextHTML = await page.evaluate(async () => {
  //     const text = document.createElement('bolt-text');

  //     text.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in gravida ex.`;
  //     text.setAttribute('no-shadow', '');
  //     text.setAttribute('headline', true);
  //     text.setAttribute('font-size', 'xxxlarge');
  //     document.body.appendChild(text);
  //     await text.updateComplete;

  //     return text.outerHTML;
  //   });

  //   const renderedHTML = await html(renderedTextHTML);

  //   expect(
  //     renderedHTML
  //       .querySelector('.c-bolt-text-v2')
  //       .classList.contains('is-long'),
  //   ).toBe(true);

  //   expect(renderedHTML).toMatchSnapshot();
  // });

  // All caps xxlarge bold quote (Shadow DOM)
  test('All caps xxlarge bold quote using <bolt-text> w/ Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(() => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is a quote`;
      text.setAttribute('quoted', true);
      text.setAttribute('align', 'center');
      text.setAttribute('letter-spacing', 'wide');
      text.setAttribute('text-transform', 'uppercase');
      text.setAttribute('font-size', 'xxlarge');
      text.setAttribute('font-weight', 'bold');
      document.body.appendChild(text);

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);

    expect(renderedHTML).toMatchSnapshot();
  });

  // All caps xxlarge bold quote (Light DOM)
  test('All caps xxlarge bold quote using <bolt-text> w/o Shadow DOM renders', async function() {
    const renderedTextHTML = await page.evaluate(async () => {
      const text = document.createElement('bolt-text');

      text.textContent = `This is a quote`;
      text.setAttribute('no-shadow', '');
      text.setAttribute('quoted', true);
      text.setAttribute('align', 'center');
      text.setAttribute('letter-spacing', 'wide');
      text.setAttribute('text-transform', 'uppercase');
      text.setAttribute('font-size', 'xxlarge');
      text.setAttribute('font-weight', 'bold');
      document.body.appendChild(text);
      await text.updateComplete;

      return text.outerHTML;
    });

    const renderedHTML = await html(renderedTextHTML);

    expect(
      renderedHTML
        .querySelector('.c-bolt-text-v2')
        .classList.contains(
          'c-bolt-text-v2--quoted',
          'c-bolt-text-v2--align-center',
          'c-bolt-text-v2--letter-spacing-wide',
          'c-bolt-text-v2--text-transform-uppercase',
          'c-bolt-text-v2--font-size-xxlarge',
          'c-bolt-text-v2--font-weight-bold',
        ),
    ).toBe(true);

    expect(renderedHTML).toMatchSnapshot();
  });

  // @todo: Bold, wide letter spacing, color, and quoted
});
