import {
  render,
  renderString,
  stopServer,
} from '../../../testing/testing-helpers';

describe('<bolt-copy-to-clipboard> Component', () => {
  afterAll(async () => {
    await stopServer();
  });

  test('basic usage with attributes', async () => {
    const results = await render(
      '@bolt-components-copy-to-clipboard/copy-to-clipboard.twig',
      {
        attributes: {
          'data-attr': 'some attribute',
        },
        text_to_copy: 'https://boltdesignsystem.com',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('multiple instances', async () => {
    const results = await renderString(`
{% include "@bolt-components-copy-to-clipboard/copy-to-clipboard.twig" with {
  trigger_text: "Copy Link #1",
  text_to_copy: "https://boltdesignsystem.com/#link-1"
} only %}
{% include "@bolt-components-copy-to-clipboard/copy-to-clipboard.twig" with {
  trigger_text: "Copy Link #2",
  text_to_copy: "https://boltdesignsystem.com/#link-2"
} only %}
    `);

    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('custom trigger text', async () => {
    const results = await render(
      '@bolt-components-copy-to-clipboard/copy-to-clipboard.twig',
      {
        trigger_text: 'This is custom trigger text',
        text_to_copy: 'https://boltdesignsystem.com/#link-1',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('custom trigger component', async () => {
    const customTrigger = await render('@bolt-components-icon/icon.twig', {
      name: 'add-open',
      background: 'circle',
      size: 'medium',
    });
    const results = await render(
      '@bolt-components-copy-to-clipboard/copy-to-clipboard.twig',
      {
        text_to_copy: 'https://boltdesignsystem.com/#link-1',
        custom_trigger: customTrigger.html,
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('custom transition text', async () => {
    const results = await render(
      '@bolt-components-copy-to-clipboard/copy-to-clipboard.twig',
      {
        text_to_copy: 'https://boltdesignsystem.com/#custom-transition',
        custom_transition: 'Custom transition text',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('custom confirmation text', async () => {
    const results = await render(
      '@bolt-components-copy-to-clipboard/copy-to-clipboard.twig',
      {
        text_to_copy: 'https://boltdesignsystem.com/#custom-transition',
        custom_confirmation: 'Custom confirmation',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('custom trigger, transition, and confirmation text', async () => {
    const results = await render(
      '@bolt-components-copy-to-clipboard/copy-to-clipboard.twig',
      {
        text_to_copy: 'https://boltdesignsystem.com/#custom-transition',
        custom_confirmation: 'Custom confirmation',
        custom_trigger: 'Custom trigger',
        custom_transition: 'Custom transition',
      },
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
