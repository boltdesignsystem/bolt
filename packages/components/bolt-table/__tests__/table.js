/* eslint-disable camelcase */

import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
import { html } from '../../../testing/testing-helpers';
const { readYamlFileSync } = require('@bolt/build-tools/utils/yaml');
const { join } = require('path');
const schema = readYamlFileSync(join(__dirname, '../table.schema.yml'));
const { format, borderless, first_col_fixed_width } = schema.properties;

async function renderTwig(template, data) {
  return await render(template, data, true);
}

async function renderTwigString(template, data) {
  return await renderString(template, data, true);
}

const timeout = 120000;

const vrtDefaultConfig = {
  failureThreshold: '0.02',
  failureThresholdType: 'percent',
  customDiffConfig: {
    threshold: '0.1',
    includeAA: false,
  },
};

describe('<bolt-table> Component', () => {
  let page;

  afterAll(async () => {
    await stopTwigRenderer();
  });

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto('http://127.0.0.1:4444/', {
      waitUntil: 'networkidle0',
    });
  }, timeout);

  test('Twig-rendered Table with HTML comments', async () => {
    const results = await render('@bolt-components-table/table.twig', {
      first_col_fixed_width: true,
      rows: [
        {
          cells: ['<!-- test -->R1C1', 'R1C2', 'R1C3'],
        },
        {
          cells: ['R2C1', 'R2C2', 'R2C3'],
        },
        {
          cells: ['R3C1', 'R3C2', 'R3C3'],
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();

    const twigHTML = results.html;

    const renderedTableHTML = await page.evaluate(async twigHTML => {
      document.getElementById('root').innerHTML = twigHTML;
      const table = document.querySelector('bolt-table');
      return await Promise.all([
        async () => {
          if (table._wasInitiallyRendered) return;
          return new Promise((resolve, reject) => {
            table.addEventListener('ready', resolve);
            table.addEventListener('error', reject);
          });
        },
      ]).then(() => {
        return table.outerHTML;
      });
    }, twigHTML);

    const renderedHTML = await html(renderedTableHTML);
    expect(renderedHTML).toMatchSnapshot();

    expect(
      renderedHTML
        .querySelector('.c-bolt-table')
        .classList.contains('c-bolt-table--first-col-fixed-width'),
    ).toBe(true);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  test('Web Component-rendered Table with HTML comments', async () => {
    const staticHTML = `
      <bolt-table first-col-fixed-width>
        <table>
          <thead>
              <tr>
                <th>Prop Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Default Value</th>
                <th>Option(s)</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <!-- name -->
                <td>
                    <strong>
                      <!---->
                      align
                      <!---->
                    </strong>
                </td>
                <!-- description -->
                <td>
                    <p>Horizontal alignment of items (text and icon) inside the button. Note: the values left and right are deprecated, use start and end instead.</p>
                </td>
                <!-- type -->
                <td>
                    <code>string</code>
                    <!-- default value -->
                </td>
                <td>
                    <code>center</code>
                </td>
                <!-- values -->
                <td>
                    <ul>
                      <li>
                          <code>start</code>
                      </li>
                      <li>
                          <code>center</code>
                      </li>
                      <li>
                          <code>end</code>
                      </li>
                    </ul>
                </td>
              </tr>
          </tbody>
        </table>
      </bolt-table>
    `;

    const renderedTableHTML = await page.evaluate(async staticHTML => {
      document.getElementById('root').innerHTML = staticHTML;
      const table = document.querySelector('bolt-table');

      const undefinedElements = document.querySelectorAll('bolt-table');
      const promises = [...undefinedElements].map(elem =>
        customElements.whenDefined(elem.localName),
      );
      await Promise.all(promises);
      return table.outerHTML;
    }, staticHTML);

    const renderedHTML = await html(renderedTableHTML);
    expect(renderedHTML).toMatchSnapshot();

    expect(
      renderedHTML
        .querySelector('.c-bolt-table')
        .classList.contains('c-bolt-table--first-col-fixed-width'),
    ).toBe(true);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot(vrtDefaultConfig);
  });

  test('table with rows only', async () => {
    const results = await renderTwig('@bolt-components-table/table.twig', {
      rows: [
        {
          cells: ['R1C1', 'R1C2', 'R1C3'],
        },
        {
          cells: ['R2C1', 'R2C2', 'R2C3'],
        },
        {
          cells: ['R3C1', 'R3C2', 'R3C3'],
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('table with top headers', async () => {
    const results = await renderTwig('@bolt-components-table/table.twig', {
      headers: {
        top: {
          cells: ['Column 1', 'Column 2', 'Column 3'],
        },
      },
      rows: [
        {
          cells: ['R1C1', 'R1C2', 'R1C3'],
        },
        {
          cells: ['R2C1', 'R2C2', 'R2C3'],
        },
        {
          cells: ['R3C1', 'R3C2', 'R3C3'],
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('table with side headers', async () => {
    const results = await renderTwig('@bolt-components-table/table.twig', {
      headers: {
        side: {
          cells: ['Row 1', 'Row 2', 'Row 3', 'Footer'],
        },
      },
      rows: [
        {
          cells: ['R1C1', 'R1C2', 'R1C3'],
        },
        {
          cells: ['R2C1', 'R2C2', 'R2C3'],
        },
        {
          cells: ['R3C1', 'R3C2', 'R3C3'],
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('table with top and side headers', async () => {
    const results = await renderTwig('@bolt-components-table/table.twig', {
      headers: {
        top: {
          cells: ['Column 1', 'Column 2', 'Column 3'],
        },
        side: {
          cells: ['Row 1', 'Row 2', 'Row 3', 'Footer'],
        },
      },
      rows: [
        {
          cells: ['R1C1', 'R1C2', 'R1C3'],
        },
        {
          cells: ['R2C1', 'R2C2', 'R2C3'],
        },
        {
          cells: ['R3C1', 'R3C2', 'R3C3'],
        },
      ],
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  test('table with top and side headers', async () => {
    const results = await renderTwig('@bolt-components-table/table.twig', {
      headers: {
        top: {
          cells: ['Column 1', 'Column 2', 'Column 3'],
        },
        side: {
          cells: ['Row 1', 'Row 2', 'Row 3', 'Footer'],
        },
      },
      rows: [
        {
          cells: ['R1C1', 'R1C2', 'R1C3'],
        },
        {
          cells: ['R2C1', 'R2C2', 'R2C3'],
        },
        {
          cells: ['R3C1', 'R3C2', 'R3C3'],
        },
      ],
      footer: {
        cells: ['FC1', 'FC2', 'FC3'],
      },
    });
    expect(results.ok).toBe(true);
    expect(results.html).toMatchSnapshot();
  });

  format.enum.forEach(async option => {
    test(`table format: ${option}`, async () => {
      const results = await renderTwig('@bolt-components-table/table.twig', {
        format: option,
        headers: {
          top: {
            cells: ['Pts', 'Reb', 'Ast', 'Stl', 'Blk'],
          },
          side: {
            cells: ['Michael Jordan', 'Toni Kukoc', 'Steve Kerr', 'Total'],
          },
        },
        rows: [
          {
            cells: ['70', '10', '2', '5', '1'],
          },
          {
            cells: ['21', '15', '10', '3', '4'],
          },
          {
            cells: ['5', '2', '20', '5', '0'],
          },
        ],
        footer: {
          cells: ['91', '27', '32', '13', '5'],
        },
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  borderless.enum.forEach(async option => {
    test(`borderless table: ${option}`, async () => {
      const results = await renderTwig('@bolt-components-table/table.twig', {
        borderless: option,
        headers: {
          top: {
            cells: ['Description', 'Team', 'Vehicle Form'],
          },
          side: {
            cells: ['Optimus Prime', 'Bumblebee'],
          },
        },
        rows: [
          {
            cells: [
              'The awe-inspiring leader of the Autobot forces. Selfless and endlessly courageous, he is the complete opposite of his mortal enemy Megatron.',
              'Autobots',
              'Peterbilt Truck',
            ],
          },
          {
            cells: [
              'One of Optimus Primes most trusted lieutenants. Although he is not the strongest or most powerful of the Autobots, Bumblebee more than makes up for this with a bottomless well of luck, determination and bravery. He would gladly give his life to protect others and stop the Decepticons.',
              'Autobots',
              'VW Beetle',
            ],
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });

  first_col_fixed_width.enum.forEach(async option => {
    test(`first column fixed width table: ${option}`, async () => {
      const results = await renderTwig('@bolt-components-table/table.twig', {
        first_col_fixed_width: option,
        headers: {
          top: {
            cells: ['Prop', 'Description', 'Type'],
          },
        },
        rows: [
          {
            cells: [
              'attributes',
              'Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.',
              '<code>object</code>',
            ],
          },
          {
            cells: [
              'headers',
              'Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.',
              '<code>object</code>',
            ],
          },
          {
            cells: [
              'rows',
              'Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.',
              '<code>array</code>',
            ],
          },
          {
            cells: [
              'format',
              'Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.',
              '<code>string</code>',
            ],
          },
        ],
      });
      expect(results.ok).toBe(true);
      expect(results.html).toMatchSnapshot();
    });
  });
});
