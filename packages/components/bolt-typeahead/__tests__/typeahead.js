import { renderString, stop as stopTwigRenderer } from '@bolt/twig-renderer';

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 120000;

describe('<bolt-typeahead> Component', () => {
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

  test('Typeahead Twig Template Renders', async () => {
    const results = await renderTwigString(`
      {% include "@bolt-components-form/form.twig" with {
        children: include("@bolt-components-typeahead/typeahead.twig", {
          attributes: {
            class: [
              "js-typeahead-hook"
            ]
          },
          max_results: 5,
        }),
        attributes: {
          action: "#!/search",
          target: "_blank",
          method: "GET"
        }
      } %}
    `);
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
