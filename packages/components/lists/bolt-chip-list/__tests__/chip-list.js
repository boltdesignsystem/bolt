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

describe('<bolt-chip-list> Component', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  });

  test('basic usage without links', async () => {
    const results = await renderTwig('@bolt-components-chip-list/chip-list.twig', {
      items: [
        {
          text: 'Chip text 1',
        },
        {
          text: 'Chip text 2',
        },
        {
          text: 'Chip text 3',
        },
        {
          text: 'Chip text 4',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with links', async () => {
    const results = await renderTwig('@bolt-components-chip-list/chip-list.twig', {
      items: [
        {
          text: 'Chip link 1',
          url: '#!',
        },
        {
          text: 'Chip link 2',
          url: '#!',
        },
        {
          text: 'Chip link 3',
          url: '#!',
        },
        {
          text: 'Chip link 4',
          url: '#!',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with mixed behavior', async () => {
    const results = await renderTwig('@bolt-components-chip-list/chip-list.twig', {
      items: [
        {
          text: 'Chip link 1',
          url: '#!',
        },
        {
          text: 'Chip text 1',
        },
        {
          text: 'Chip link 3',
          url: '#!',
        },
        {
          text: 'Chip text 2',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
