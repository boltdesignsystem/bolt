const { render } = require('@bolt/twig-renderer');
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../button.schema.yml'));
const { tag } = schema.properties;

describe('button', async () => {
  test('basic button', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Hello World',
    });
    // console.log({ results });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  tag.enum.forEach(async tagChoice => {
    test(`button tag: ${tagChoice}`, async () => {
      const results = await render('@bolt-components-button/button.twig', {
        text: 'Hello World',
        tag: tagChoice,
      });
      // console.log({ results });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
