import { render, stopServer } from '../../testing/testing-helpers';

describe('Deprecation Modal', () => {
  let page;

  afterAll(async () => {
    await stopServer();
  });

  test('IE 11 Deprecation Modal', async () => {
    const results = await render('@bolt-deprecation-modal/ie-11.twig');
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
