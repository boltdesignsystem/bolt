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

describe('<bolt-icon> Component', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, 15000);

  test('basic usage', async () => {
    const results = await renderTwig('@bolt-components-icon/icon.twig', {
      name: 'add-open',
      background: 'square',
      size: 'medium',
      color: 'teal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with attributes', async () => {
    const results = await renderTwig('@bolt-components-icon/icon.twig', {
      attributes: {
        style: [
          '--bolt-theme-icon-background: #e64b18;',
          '--bolt-theme-icon: #FFF;',
          '--bolt-theme-icon-background-opacity: 1;',
        ],
      },
      name: 'add-open',
      background: 'square',
      size: 'medium',
      color: 'teal',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
