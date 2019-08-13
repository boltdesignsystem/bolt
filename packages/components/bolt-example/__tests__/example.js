import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '../../../testing/testing-helpers';

describe('example', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

  test(`example with component`, async () => {
    const results = await render('@bolt-components-example/example.twig', {
      title: 'Example Title',
      content:
        '<p>Nulla facilisi. Praesent ac massa at ligula laoreet iaculis. Vivamus quis mi. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Sed aliquam ultrices mauris.</p>',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
