const { render } = require('@bolt/twig-renderer');
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../card.schema.yml'));
const { tag } = schema.properties;

describe('<bolt-image>', async () => {
  test('<bolt-card>', async () => {
    const results = await render('@bolt-components-card/card.twig', {
      media: {
        image: {
          src: '/images/placeholders/landscape-16x9-mountains.jpg',
          alt: 'Image alt.',
        },
      },
      body: {
        eyebrow: 'This is an eyebrow',
        headline: 'This is a headline',
        paragraph: 'This is a paragraph.',
      },
      actions: [
        {
          text: 'This is a button',
          url: 'https://pega.com',
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
