import { render, stopServer } from '../../../testing/testing-helpers';

describe('ie 11 deprecation modal', () => {
  let page;

  afterAll(async () => {
    await stopServer();
  });

  test('Basic usage', async () => {
    const results = await render(
      '@bolt-components-ie-11-deprecation/dist/deprecation-modal.html',
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
