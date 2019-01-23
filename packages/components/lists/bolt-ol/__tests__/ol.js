const { render } = require('@bolt/twig-renderer');
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../ol.schema.yml'));
const { tag } = schema.properties;

describe('<bolt-image>', async () => {
  test('<bolt-card>', async () => {
    const results = await render('@bolt-components-ol/ol.twig', {
      attributes: {
        class: ['some-class', 'another-class'],
        onclick: "location.href='https://pega.com'",
      },
      items: [
        'Do not include any data or information in your posts that are confidential!',
        'Apply basic practices for collaborative work.',
        'Be honest, respectful, trustworthy and helpful.',
        'Answer questions authoritatively and concisely. Avoid cluttering discussions with noise.',
      ],
    });
    console.log({ results });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
