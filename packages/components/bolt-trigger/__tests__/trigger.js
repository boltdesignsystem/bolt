import { render } from '@bolt/twig-renderer';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../trigger.schema.yml'));
const { display, cursor } = schema.properties;

describe('trigger', () => {
  test('basic trigger', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  display.enum.forEach(async option => {
    test(`trigger display: ${option}`, async () => {
      const results = await render('@bolt-components-trigger/trigger.twig', {
        content: 'Hello World',
        display: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  cursor.enum.forEach(async option => {
    test(`trigger cursor: ${option}`, async () => {
      const results = await render('@bolt-components-trigger/trigger.twig', {
        content: 'Hello World',
        cursor: option,
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  test('Trigger with "url" renders as link', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
      url: 'http://pega.com',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with "no_outline"', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
      url: 'http://pega.com',
      no_outline: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with "disabled" adds attr to <button>', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
      disabled: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    // @todo: also test rendered HTML for `disabled` attribute
  });

  test('Trigger with "disabled" does not add attr to <a>', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
      url: 'http://pega.com',
      disabled: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    // @todo: also test rendered HTML for `disabled` attribute
  });

  test('Trigger with "type" adds attr to <button>', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
      type: 'submit',
      disabled: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with outer classes via Drupal Attributes', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Trigger with outer classes',
      attributes: {
        class: ['u-bolt-padding-medium'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with outer JS-class via Drupal Attributes', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      text: 'Trigger with outer JS-prefixed class',
      attributes: {
        class: ['js-click-me'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with c-bolt- class is thrown out', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      text: 'Trigger with c-bolt- class thrown out',
      attributes: {
        class: ['c-bolt-trigger--test'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with an onClick param renders properly', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      text: 'Trigger with onClick via param',
      on_click: 'on-click-test',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with an onClick attributes renders properly', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      text: 'Trigger w/ onClick via attributes',
      attributes: {
        'on-click': 'on-click-test',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
