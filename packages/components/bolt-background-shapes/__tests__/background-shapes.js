import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(
  join(__dirname, '../background-shapes.schema.yml'),
);
const { shapeGroup } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

describe('background shapes', async () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, 15000);

  shapeGroup.enum.forEach(async group => {
    test(`shape group: ${group}`, async () => {
      const results = await renderTwig(
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
