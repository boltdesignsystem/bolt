import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '@bolt/testing-helpers';

describe('<bolt-chip-list> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('basic usage without links', async () => {
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
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
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
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
    const results = await render('@bolt-components-chip-list/chip-list.twig', {
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
