import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';
import schema from '../button.schema';
const { tag, type } = schema.properties;
const timeout = 90000;

describe('button', () => {
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

  test('Basic usage', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'This is a button',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button adds target if passed via attributes', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'This is a button',
      url: 'http://pega.com',
      attributes: {
        target: '_blank',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // Tag is deprecated.  The presence or absence of a URL param determines which
  // tag will be used.  The 'type' prop should be used for the values 'reset'
  // and 'submit' because those aren't tags.
  tag.enum.forEach(async tagChoice => {
    test(`Button tag: ${tagChoice}`, async () => {
      const results = await render('@bolt-components-button/button.twig', {
        text: 'This is a button',
        tag: tagChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  type.enum.forEach(async typeChoice => {
    test(`Button type: ${typeChoice}`, async () => {
      const results = await render('@bolt-components-button/button.twig', {
        text: 'This is a button',
        type: typeChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Button with "disabled" adds attr to <button>', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'This is a button',
      disabled: true,
    });

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const buttonInnerHTML = await page.evaluate(async results => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = results.html;
      document.body.appendChild(wrapper);
      const button = document.querySelector('bolt-button');
      await button.firstUpdated;
      return button.renderRoot.innerHTML;
    }, results);

    const renderedHTML = await html(buttonInnerHTML);
    expect(renderedHTML.hasAttribute('disabled')).toBe(true);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('Button with "disabled" adds attr to <a>', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'This is a button',
      url: 'http://pega.com',
      disabled: true,
    });

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const buttonInnerHTML = await page.evaluate(async results => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = results.html;
      document.body.appendChild(wrapper);
      const button = document.querySelector('bolt-button');
      await button.firstUpdated;
      return button.renderRoot.innerHTML;
    }, results);

    const renderedHTML = await html(buttonInnerHTML);
    expect(renderedHTML.hasAttribute('aria-disabled')).toBe(true);
    expect(renderedHTML).toMatchSnapshot();

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent',
    });
  });

  test('Button with outer classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with outer classes',
      attributes: {
        class: ['u-bolt-padding-medium'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with inner classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with inner classes',
      attributes: {
        class: ['is-active'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with outer JS-class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with outer JS-prefixed class',
      attributes: {
        class: ['js-click-me'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with c-bolt- class is thrown out', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with outer JS-prefixed class',
      attributes: {
        class: ['c-bolt-button--secondary'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with an onClick param renders properly', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with onClick via param',
      onClick: 'on-click-test',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with an onClick attributes renders properly', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button w/ onClick via attributes',
      attributes: {
        'on-click': 'on-click-test',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Default <bolt-button> w/o Shadow DOM renders', async function() {
    const renderedButtonHTML = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<bolt-button no-shadow>This is a button</bolt-button>',
      );
      const btn = document.querySelector('bolt-button');
      await btn.updateComplete;
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
    const defaultButtonShadowRoot = await page.evaluate(async () => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test -- Shadow Root HTML';
      document.body.appendChild(btn);
      await btn.firstUpdated;
      return btn.renderRoot.innerHTML;
    });

    const defaultButtonOuter = await page.evaluate(async () => {
      const btn = document.createElement('bolt-button');
      btn.textContent = 'Button Test -- Outer HTML';
      document.body.appendChild(btn);
      await btn.firstUpdated;
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

  test('Inline button inside a container with defined text alignment.', async () => {
    const results = await renderString(`
      {% grid "o-bolt-grid--flex o-bolt-grid--matrix" %}
        {% cell "u-bolt-width-12/12 u-bolt-text-align-right" %}
          {% include "@bolt-components-button/button.twig" with {
            text: "Align right"
          } only %}
        {% endcell %}
        {% cell "u-bolt-width-12/12 u-bolt-text-align-center" %}
          {% include "@bolt-components-button/button.twig" with {
            text: "Align center"
          } only %}
        {% endcell %}
        {% cell "u-bolt-width-12/12 u-bolt-text-align-left" %}
          {% include "@bolt-components-button/button.twig" with {
            text: "Align left"
          } only %}
        {% endcell %}
      {% endgrid %}
    `);
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('<bolt-button> supports ID attribute', async () => {
    // The reported bug was only a problem when rendering the initial button
    // with twig, so start by rendering the button with twig.
    const template = await renderString(`
      {% include "@bolt-components-button/button.twig" with {
        text: "Button Test -- ID attribute",
        attributes: {
          id: "my-button"
        }
      } only %}
    `);

    // Next, convert to a javascript node so we can evaluate it with js.
    const renderedButtonHTML = await page.evaluate(html => {
      const div = document.createElement('div');
      div.innerHTML = `${html}`;
      document.body.appendChild(div);
      const button = document.querySelector('bolt-button');
      return button.outerHTML;
    }, template.html);

    const renderedHTML = await html('<div></div>');
    renderedHTML.innerHTML = renderedButtonHTML;

    const button = document.getElementById('my-button');

    expect(button).not.toBeNull();
  });

  test('Button uses initial HTML to populate prop defaults', async function() {
    const { initialUrl, initialHTML } = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<bolt-button no-shadow>
          <a href="https://www.google.com">Button w/ Nested Link</a>
        </bolt-button>`,
      );
      const btn = document.querySelector('bolt-button');
      await btn.updateComplete;
      return {
        initialUrl: btn.url,
        initialHTML: btn.outerHTML,
      };
    });

    // initial HTML-defined attributes can be updated
    const { updatedUrl, updatedHTML } = await page.evaluate(async () => {
      const btn = document.querySelector('bolt-button');
      btn.setAttribute('url', 'https://boltdesignsystem.com');
      await btn.updateComplete;
      return {
        updatedUrl: btn.url,
        updatedHTML: btn.outerHTML,
      };
    });

    // removing the url prop will convert the <a> into a <button> tag
    const { finalUrl, finalHTML } = await page.evaluate(async () => {
      const btn = document.querySelector('bolt-button');
      btn.removeAttribute('url');
      await btn.updateComplete;
      return {
        finalUrl: btn.url,
        finalHTML: btn.outerHTML,
      };
    });

    const initialMarkup = await html(initialHTML);
    const updatedMarkup = await html(updatedHTML);
    const finalMarkup = await html(finalHTML);

    expect(
      initialMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe('https://www.google.com');
    expect(initialMarkup.querySelector('.c-bolt-button').tagName).toBe('a');

    expect(
      updatedMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe('https://boltdesignsystem.com');

    expect(
      finalMarkup.querySelector('.c-bolt-button').hasAttribute('href'),
    ).toBe(false);
    expect(finalMarkup.querySelector('.c-bolt-button').tagName).toBe('button');

    expect(initialUrl).toBe('https://www.google.com');
    expect(updatedUrl).toBe('https://boltdesignsystem.com');
    expect(finalUrl).toBe(null);
  });

  test('Buttons render and retains extra HTML attributes', async function() {
    const { initialHTML } = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<bolt-button no-shadow>
          <a data-uuid="1234" href="https://yahoo.com">Button w/ Data Attribute</a>
        </bolt-button>`,
      );
      const btn = document.querySelector('bolt-button');
      await btn.updateComplete;
      return {
        initialHTML: btn.outerHTML,
      };
    });

    // removing the url prop will convert the <a> into a <button> tag
    const { finalHTML } = await page.evaluate(async () => {
      const btn = document.querySelector('bolt-button');
      btn.url = null;
      await btn.updateComplete;
      return {
        finalHTML: btn.outerHTML,
      };
    });

    const initialMarkup = await html(initialHTML);
    const finalMarkup = await html(finalHTML);

    expect(
      initialMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe('https://yahoo.com');
    expect(initialMarkup.querySelector('.c-bolt-button').tagName).toBe('a');
    expect(
      initialMarkup.querySelector('.c-bolt-button').getAttribute('data-uuid'),
    ).toBe('1234');
    expect(initialMarkup).toMatchSnapshot();

    expect(
      finalMarkup.querySelector('.c-bolt-button').hasAttribute('href'),
    ).toBe(false);
    expect(finalMarkup.querySelector('.c-bolt-button').tagName).toBe('button');
    expect(
      finalMarkup.querySelector('.c-bolt-button').getAttribute('data-uuid'),
    ).toBe('1234');
    expect(finalMarkup).toMatchSnapshot();
  });

  test('Buttons with initial HTML attributes that conflict w/ custom element props will defer to  using the custom element prop values', async function() {
    const { initialUrl, initialHTML } = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<bolt-button url="https://google.com" no-shadow>
          <a data-uuid="1234" href="https://yahoo.com">Button w/ Href Not Matching Prop</a>
        </bolt-button>`,
      );
      const btn = document.querySelector('bolt-button');
      await btn.updateComplete;
      return {
        initialUrl: btn.url,
        initialHTML: btn.outerHTML,
      };
    });

    // updating the url prop to re-render
    const { finalUrl, finalHTML } = await page.evaluate(async () => {
      const btn = document.querySelector('bolt-button');
      btn.setAttribute('url', 'https://github.com');
      await btn.updateComplete;
      return {
        finalUrl: btn.url,
        finalHTML: btn.outerHTML,
      };
    });

    const initialMarkup = await html(initialHTML);
    const finalMarkup = await html(finalHTML);

    expect(
      initialMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe('https://google.com');
    expect(initialMarkup).toMatchSnapshot();

    expect(
      finalMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe('https://github.com');
    expect(finalMarkup).toMatchSnapshot();

    expect(initialUrl).toBe('https://google.com');
    expect(finalUrl).toBe('https://github.com');
  });

  test('Buttons only render the [disabled] attribute on <button>, tags', async function() {
    const { initialHTML, initialUrl } = await page.evaluate(async () => {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<bolt-button url="https://google.com" disabled no-shadow>
          Disabled Button
        </bolt-button>`,
      );
      const btn = document.querySelector('bolt-button');
      await btn.updateComplete;
      return {
        initialUrl: btn.url,
        initialHTML: btn.outerHTML,
      };
    });

    // <a> tag-based buttons retain their URL after removing the disabled prop
    const { updatedHTML } = await page.evaluate(async () => {
      const btn = document.querySelector('bolt-button');
      btn.removeAttribute('disabled');
      await btn.updateComplete;
      return {
        updatedUrl: btn.url,
        updatedHTML: btn.outerHTML,
      };
    });

    // button retained the URL after removing the disabled prop
    const { finalHTML } = await page.evaluate(async () => {
      const btn = document.querySelector('bolt-button');
      btn.setAttribute('disabled', '');
      btn.removeAttribute('url');
      await btn.updateComplete;
      return {
        finalUrl: btn.url,
        finalHTML: btn.outerHTML,
      };
    });

    const initialMarkup = await html(initialHTML);
    const updatedMarkup = await html(updatedHTML);
    const finalMarkup = await html(finalHTML);

    expect(
      initialMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe(null);
    expect(initialUrl).toBe('https://google.com');
    expect(initialMarkup.querySelector('.c-bolt-button').tagName).toBe('a');
    expect(initialMarkup.querySelector('.c-bolt-button').hasAttribute('disabled')).toBe(false);
    expect(initialMarkup.querySelector('.c-bolt-button').hasAttribute('aria-disabled')).toBe(true);
    expect(initialMarkup).toMatchSnapshot();

    expect(
      updatedMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe('https://google.com');
    expect(initialUrl).toBe('https://google.com');
    expect(updatedMarkup.querySelector('.c-bolt-button').tagName).toBe('a');
    expect(updatedMarkup.querySelector('.c-bolt-button').hasAttribute('disabled')).toBe(false);
    expect(updatedMarkup.querySelector('.c-bolt-button').hasAttribute('aria-disabled')).toBe(false);
    expect(updatedMarkup).toMatchSnapshot();

    expect(
      finalMarkup.querySelector('.c-bolt-button').getAttribute('href'),
    ).toBe(null);
    expect(finalMarkup.querySelector('.c-bolt-button').tagName).toBe('button');
    expect(finalMarkup.querySelector('.c-bolt-button').hasAttribute('disabled')).toBe(true);
    expect(finalMarkup.querySelector('.c-bolt-button').hasAttribute('aria-disabled')).toBe(false);
    expect(finalMarkup).toMatchSnapshot();
  });
});
