const qs = require('querystring');
const { phpServerPort } = require('./index');
const fetch = require('node-fetch');

const buttonTemplate = '@bolt-components-button/button.twig';

async function renderResponse(templatePath, body) {
  const options = {
    method: body ? 'POST' : 'GET',
  };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(`http://localhost:${phpServerPort}?${qs.stringify({
    templatePath,
  })}`, options);
  const html = await response.text();

  const { status, statusText, ok } = response;
  return {
    status,
    statusText,
    ok,
    html,
  };
}


describe('Test the Bolt TwigRender API', () => {
  test('renders a basic button', async () => {
    const buttonData = {
      'text': 'Hello world!',
    };
    const result = await renderResponse(buttonTemplate, buttonData);

    expect(result.ok).toEqual(true);
  });


  test('handles missing data', async () => {
    const result = await renderResponse(buttonTemplate);

    expect(result.ok).toEqual(true);
  });


  test('handles non-existent template path', async () => {
    const result = await renderResponse(
      '@bolt-components-button/button2.twig',
      {
        'text': 'Hello world 2!',
      },
    );

    expect(result.ok).toEqual(false);
  });


  test('renders the button component correctly', async () => {
    const result = await renderResponse(
      buttonTemplate,
      {
        'text': 'Hello world!',
      },
    );

    expect(result.html).toMatchSnapshot();
  });


  test('renders attributes on the button component correctly', async () => {
    const result = await renderResponse(
      buttonTemplate, {
        'text': 'Hello world!',
        'attributes': {
          'class': [
            'u-bolt-margin-bottom-large',
          ],
        },
      },
    );

    expect(result.html).toMatchSnapshot();
  });


  test('renders the secondary button correctly', async () => {
    const result = await renderResponse(
      buttonTemplate,
      {
        'text': 'Secondary Button!',
        'style': 'secondary',
      },
    );

    expect(result.html).toMatchSnapshot();
  });
});
