const { render } = require('@bolt/twig-renderer');
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../card.schema.yml'));
const { tag } = schema.properties;

describe('card', async () => {
  test('basic card', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      body: {
        paragraph: 'This is a paragraph.',
      },
    });
    // console.log({ results });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
