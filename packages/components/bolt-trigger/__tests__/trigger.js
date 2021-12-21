import { render } from '@bolt/twig-renderer';
import schema from '../trigger.schema';
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
      url: 'https://google.com',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with "no_outline"', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
      url: 'https://google.com',
      no_outline: true,
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  // This is a test of the `init()` function, @see packages/twig-integration/twig-extensions-shared/src/TwigFunctions.php
  // It verifies `this.props` and `this.data` match. Previously, an attribute would be reflected in `this.props` but not `this.data`.
  test('Trigger with "target" attribute renders same value on <bolt-trigger> and inner <a>', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      content: 'Hello World',
      url: 'https://google.com',
      attributes: {
        target: '_blank',
        rel: 'noopener',
      },
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
      url: 'https://google.com',
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

  test('Trigger with an on_click param renders properly', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      text: 'Trigger with on_click via param',
      on_click: 'on-click-test',
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('Trigger with an on_click attributes renders properly', async () => {
    const results = await render('@bolt-components-trigger/trigger.twig', {
      text: 'Trigger w/ on_click via attributes',
      attributes: {
        'on-click': 'on-click-test',
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
