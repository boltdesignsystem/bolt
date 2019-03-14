import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

describe('<bolt-ol> Component', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, 15000);

  test('basic usage with attributes', async () => {
    const results = await renderTwig('@bolt-components-ol/ol.twig', {
      attributes: {
        'data-attr': 'some attribute',
        onclick: "location.href='https://pega.com'",
      },
      items: [
        'Do not include any data or information in your posts that are confidential!',
        'Apply basic practices for collaborative work.',
        'Be honest, respectful, trustworthy and helpful.',
        'Answer questions authoritatively and concisely. Avoid cluttering discussions with noise.',
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with nested <bolt-ul> list compiles', async () => {
    const results = await renderTwigString(`
      {% include '@bolt-components-ol/ol.twig' with {
        items: [
          'Do not include any data or information in your posts that are confidential!',
          'Apply basic practices for collaborative work.',
          'Be honest, respectful, trustworthy and helpful.',
          'Answer questions authoritatively and concisely. Avoid cluttering discussions with noise.',
          [
            'Answer questions authoritatively and concisely.',
            include('@bolt-components-ul/ul.twig', {
              items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
              ]
            })
          ]
        ]
      } %}
    `);
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with nested <bolt-ol> list compiles', async () => {
    const results = await renderTwigString(`
      {% include '@bolt-components-ol/ol.twig' with {
        items: [
          'Do not include any data or information in your posts that are confidential!',
          'Apply basic practices for collaborative work.',
          'Be honest, respectful, trustworthy and helpful.',
          'Answer questions authoritatively and concisely. Avoid cluttering discussions with noise.',
          [
            'Answer questions authoritatively and concisely.',
            include('@bolt-components-ol/ol.twig', {
              items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
              ]
            })
          ]
        ]
      } %}
    `);
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
