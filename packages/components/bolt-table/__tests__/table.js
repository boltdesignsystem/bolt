/* eslint-disable camelcase */

import {
  render,
  renderString,
  stop as stopTwigRenderer,
} from '@bolt/twig-renderer';
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

describe('<bolt-table> Component', () => {
  afterAll(async () => {
    await stopTwigRenderer();
  }, timeout);

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
