import {
  isConnected,
  render,
  renderString,
  stopServer,
  html,
} from '@bolt/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(
  join(__dirname, '../background-shapes.schema.yml'),
);
const { shapeGroup } = schema.properties;

describe('background shapes', () => {
  afterAll(async () => {
    await stopServer();
  }, 100);

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
