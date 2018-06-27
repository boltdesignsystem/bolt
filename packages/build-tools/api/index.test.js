
const { phpServerPort } = require('./index');
const fetch = require('node-fetch');

async function renderResponse(body){
  const response = await fetch(`http://localhost:${phpServerPort}`, {
    method: 'POST',
    body,
  });
  const data = await response.text();

  const { status, statusText, ok } = response;
  return {
    status,
    statusText,
    ok,
    data,
  };
}


describe('Test the Bolt TwigRender API', () => {
  test('renders a basic button', async () => {
    const result = await renderResponse(JSON.stringify({
      'templatePath': '@bolt-components-button/button.twig',
      'data': {
        'text': 'Hello world!',
      },
    }));
    expect(result.ok).toEqual(true);
  });


  test('handles missing data', async () => {
    const result = await renderResponse(JSON.stringify({
      'templatePath': '@bolt-components-button/button.twig',
    }));
    expect(result.ok).toEqual(true);
  });


  test('handles non-existent template path', async () => {
    const result = await renderResponse(JSON.stringify({
      'templatePath': '@bolt-components-button/button2.twig',
      'data': {
        'text': 'Hello world 2!',
      },
    }));

    expect(result.ok).toEqual(false);
  });


  test('renders the button component correctly', async () => {
    const result = await renderResponse(JSON.stringify({
      'templatePath': '@bolt-components-button/button.twig',
      'data': {
        'text': 'Hello world!',
      },
    }));

    expect(JSON.parse(result.data).html).toMatchSnapshot();
  });


  test('renders attributes on the button component correctly', async () => {
    const result = await renderResponse(JSON.stringify({
      'templatePath': '@bolt-components-button/button.twig',
      'data': {
        'text': 'Hello world!',
        'attributes': {
          'class': [
            'u-bolt-margin-bottom-large',
          ],
        },
      },
    }));
    expect(JSON.parse(result.data).html).toMatchSnapshot();
  });


  test('renders the secondary button correctly', async () => {
    const result = await renderResponse(JSON.stringify({
      'templatePath': '@bolt-components-button/button.twig',
      'data': {
        'text': 'Secondary Button!',
        'style': 'secondary',
      },
    }));

    expect(JSON.parse(result.data).html).toMatchSnapshot();
  });


});
