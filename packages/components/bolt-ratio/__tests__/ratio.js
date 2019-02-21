const { render } = require('@bolt/twig-renderer');

describe('<bolt-ratio> Component', async () => {
  test('<bolt-ratio> compiles', async () => {
    const results = await render('@bolt-components-ratio/ratio.twig', {
      children: '<img src="/fixtures/1200x660.jpg">',
      ratio: '1200/660',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
