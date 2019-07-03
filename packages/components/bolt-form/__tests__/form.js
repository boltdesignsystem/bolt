import { render } from '@bolt/twig-renderer';

describe('<bolt-form> Component', () => {
  test(`basic element usage`, async () => {
    const results = await render(
      `{% include "@bolt-components-form/form.twig" with {
        text: "This is a form",
      } only %}`,
    );
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('basic usage with attributes', async () => {
    const label = await render('@bolt-components-form/form-label.twig', {
      "title": title,
      "displayType": labelDisplayType
    });
    const input = await render('@bolt-components-form/form-input.twig', {
      "attributes": 'foo bar',
      "hasErrors": errors is not empty,
    });
    const results = await render('@bolt-components-form/form-element.twig', {
      ?
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });
});
