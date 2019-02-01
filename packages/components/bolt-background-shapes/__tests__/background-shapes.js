const { render } = require('@bolt/twig-renderer');
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(
  join(__dirname, '../background-shapes.schema.yml'),
);
const { shapeGroup } = schema.properties;

describe('background shapes', async () => {
  shapeGroup.enum.forEach(async group => {
    test(`shape group: ${group}`, async () => {
      const results = await render(
        '@bolt-components-background-shapes/background-shapes.twig',
        {
          shapeGroup: group,
        },
      );
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
