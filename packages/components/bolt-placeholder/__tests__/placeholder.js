import { render } from '@bolt/twig-renderer';

const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../list.schema.yml'));
const { size } = schema.properties;

describe('<placeholder> Component', () => {
  test('placeholder component animated', async () => {
    const results = await render(
      '@bolt-components-placeholder/placeholder.twig',
      {
        text: 'Bolt Placeholder Example',
        size: 'large',
        animated: true,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  size.enum.forEach(async sizeChoice => {
    test(`Placeholder size: ${sizeChoice}`, async () => {
      const results = await renderTwig(
        '@bolt-components-placeholder/placeholder.twig',
        {
          text: `${sizeChoice} Bolt Placeholder`,
          size: sizeChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
