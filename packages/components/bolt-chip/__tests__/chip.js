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

describe('<bolt-chip> Component', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  });

  test('basic usage with attributes', async () => {
    const results = await renderTwig('@bolt-components-chip/chip.twig', {
      attributes: {
        'data-attr': 'some attribute',
      },
      text: 'This is a chip',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with link', async () => {
    const results = await renderTwig('@bolt-components-chip/chip.twig', {
      text: 'This is a chip with link',
      url: '!#',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
