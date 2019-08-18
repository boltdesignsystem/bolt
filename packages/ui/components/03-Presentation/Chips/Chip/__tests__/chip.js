import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';

describe('<bolt-chip> Component', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test('basic usage with attributes', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      attributes: {
        'data-attr': 'some attribute',
      },
      text: 'This is a chip',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('with link', async () => {
    const results = await render('@bolt-components-chip/chip.twig', {
      text: 'This is a chip with link',
      url: '!#',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
