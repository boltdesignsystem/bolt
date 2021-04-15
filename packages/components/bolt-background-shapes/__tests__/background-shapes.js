import { render, stopServer } from '../../../testing/testing-helpers';
import schema from '../background-shapes.schema';
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
