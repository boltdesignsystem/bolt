
const { phpServerPort } = require('./index');
const fetch = require('node-fetch');

async function renderResponse(body){
  return await fetch(`http://localhost:${phpServerPort}`, {
    method: 'POST',
    body,
  }).then(res => res.json());
}


describe.skip('Test the Bolt TwigRender API', () => {
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
    expect(result.ok).toEqual(false);
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

    expect(result.html).toMatchSnapshot();
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
    expect(result.html).toMatchSnapshot();
  });


  test('renders the secondary button correctly', async () => {
    const result = await renderResponse(JSON.stringify({
      'templatePath': '@bolt-components-button/button.twig',
      'data': {
        'text': 'Secondary Button!',
        'style': 'secondary',
      },
    }));

    expect(result.html).toMatchSnapshot();
  });


});
