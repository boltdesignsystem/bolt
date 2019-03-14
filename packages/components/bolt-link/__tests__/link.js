import { render } from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../link.schema.yml'));
const { display, valign } = schema.properties;

describe('link', async () => {
  test('basic link', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Hello World',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  display.enum.forEach(async option => {
    test(`link display: ${option}`, async () => {
      const results = await render('@bolt-components-link/link.twig', {
        text: 'Hello World',
        display: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  valign.enum.forEach(async option => {
    test(`link valign: ${option}`, async () => {
      const results = await render('@bolt-components-link/link.twig', {
        text: 'Hello World',
        valign: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Link with outer classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with outer classes',
      attributes: {
        class: ['u-bolt-padding-medium'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with inner classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with inner classes',
      attributes: {
        class: ['is-active'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with outer JS-class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with outer JS-prefixed class',
      attributes: {
        class: ['js-click-me'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with c-bolt- class is thrown out', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with outer JS-prefixed class',
      attributes: {
        class: ['c-bolt-link--secondary'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with an onClick param renders properly', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link with onClick via param',
      onClick: 'on-click-test',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Link with an onClick attributes renders properly', async () => {
    const results = await render('@bolt-components-link/link.twig', {
      text: 'Link w/ onClick via attributes',
      attributes: {
        'on-click': 'on-click-test',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
