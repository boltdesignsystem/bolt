import {
  render,
  renderString,
  stopServer,
} from '../../../testing/testing-helpers';
import schema from '../table.schema';
// eslint-disable-next-line camelcase
const { sticky_headers } = schema.properties;
let page;

afterAll(async () => {
  await stopServer();
  await page.close();
}, 100);

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });
});

describe('Bolt Table', () => {
  test(`Basic usage`, async () => {
    const results = await renderString(`
      {% set header %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% set row1 %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% set row2 %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% set row3 %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% include '@bolt-components-table/table.twig' with {
        header: {
          content: header,
        },
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
      } only %}
    `);

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Table Column Width', () => {
  test(`The usage of inline width styles`, async () => {
    const results = await renderString(`
      {% set header_250px %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: '250px wide column',
            header: true,
            attributes: {
              style: 'width: 250px;',
            },
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: '250px wide column',
            header: true,
            attributes: {
              style: 'width: 250px;',
            },
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: '250px wide column',
            header: true,
            attributes: {
              style: 'width: 250px;',
            },
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: '250px wide column',
            header: true,
            attributes: {
              style: 'width: 250px;',
            },
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
      
      {# Do not set widths for body row cells #}
      {% set row %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
      
      {# Change the table component's container to block display to render a full width table #}
      {% include '@bolt-components-table/table.twig' with {
        header: {
          content: header_250px,
        },
        body: {
          content: [
            row,
          ],
        },
        attributes: {
          class: 'u-bolt-block',
        },
      } only %}
    `);

    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});

describe('Bolt Table prop -', () => {
  // Target each of the schema keys with the following pattern
  sticky_headers.enum.forEach(async option => {
    test(`sticky headers: ${option}`, async () => {
      const results = await renderString(`
        {% set header %}
          {% set cells %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a header cell in table header',
              header: true,
            } only %}
          {% endset %}
          {% include '@bolt-components-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}
      
        {% set row1 %}
          {% set cells %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-components-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}
      
        {% set row2 %}
          {% set cells %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-components-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}
      
        {% set row3 %}
          {% set cells %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a side header.',
              header: true,
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
            {% include '@bolt-components-table/table-cell.twig' with {
              content: 'This is a regular cell.',
            } only %}
          {% endset %}
          {% include '@bolt-components-table/table-row.twig' with {
            content: cells,
          } only %}
        {% endset %}
      
        {% include '@bolt-components-table/table.twig' with {
          sticky_headers:${JSON.stringify(option)},
          header: {
            content: header,
          },
          body: {
            content: [
              row1,
              row2,
              row3,
            ],
          },
        } only %}
      `);

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });

  [true, false].forEach(async option => {
    test(`Borderless table: ${option}`, async () => {
      const results = await renderString(`
      {% set header %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a header cell in table header',
            header: true,
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% set row1 %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% set row2 %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% set row3 %}
        {% set cells %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
          {% include '@bolt-components-table/table-cell.twig' with {
            content: 'This is a regular cell.',
          } only %}
        {% endset %}
        {% include '@bolt-components-table/table-row.twig' with {
          content: cells,
        } only %}
      {% endset %}
    
      {% include '@bolt-components-table/table.twig' with {
        borderless:${JSON.stringify(option)},
        header: {
          content: header,
        },
        body: {
          content: [
            row1,
            row2,
            row3,
          ],
        },
      } only %}
    `);

      await expect(results.ok).toBe(true);
      await expect(results.html).toMatchSnapshot();
    });
  });
});
