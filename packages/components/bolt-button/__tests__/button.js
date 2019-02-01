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
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  tag.enum.forEach(async tagChoice => {
    test(`button tag: ${tagChoice}`, async () => {
      const results = await render('@bolt-components-button/button.twig', {
        text: 'Hello World',
        tag: tagChoice,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Button with outer classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with outer classes',
      attributes: {
        class: ['u-bolt-padding-medium'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with inner classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with inner classes',
      attributes: {
        class: ['is-active'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with outer JS-class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with outer JS-prefixed class',
      attributes: {
        class: ['js-click-me'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with c-bolt- class is thrown out', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with outer JS-prefixed class',
      attributes: {
        class: ['c-bolt-button--secondary'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with an onClick param renders properly', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button with onClick via param',
      onClick: 'on-click-test',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Button with an onClick attributes renders properly', async () => {
    const results = await render('@bolt-components-button/button.twig', {
      text: 'Button w/ onClick via attributes',
      attributes: {
        'on-click': 'on-click-test',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
