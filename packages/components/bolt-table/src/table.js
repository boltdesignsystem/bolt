import { props, define } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { parse, stringify } from 'himalaya';

import classNames from 'classnames/bind';

import styles from './table.scss';
import schema from '../table.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltTable extends withLitHtml() {
  static is = 'bolt-table';

  static props = {
    format: {
      ...props.string,
      ...{ default: 'regular' },
    },
    borderless: {
      ...props.boolean,
      ...{ default: false },
    },
    firstColFixedWidth: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  constructor(self) {
    self = super(self);
    self.schema = schema;
    return self;
  }

  removeEmptyNodes(nodes) {
    return nodes.filter(node => {
      if (node.type === 'element') {
        node.children = this.removeEmptyNodes(node.children);
        return true;
      }
      return node.content.length;
    });
  }

  stripWhitespace(nodes) {
    return nodes.map(node => {
      if (node.type === 'element') {
        node.children = this.stripWhitespace(node.children);
      } else {
        node.content = node.content.trim();
      }
      return node;
    });
  }

  removeWhitespace(nodes) {
    return this.removeEmptyNodes(this.stripWhitespace(nodes));
  }

  createProp(object, prop, value) {
    if (object[`${prop}`] === undefined) {
      object[`${prop}`] = value;
    }
  }

  convertElements(element, object, parent = 'body') {
    const boltedObject = object !== undefined ? object : {};

    element.map(element => {
      switch (element.tagName) {
        case 'thead':
          this.createProp(boltedObject, 'head', []);
          this.convertElements(element.children, boltedObject, 'head');
          break;
        case 'tbody':
          this.createProp(boltedObject, 'body', []);
          this.convertElements(element.children, boltedObject, 'body');
          break;
        case 'tfoot':
          this.createProp(boltedObject, 'foot', []);
          this.convertElements(element.children, boltedObject, 'foot');
          break;
        case 'tr':
          const elements = element.children.map(child => child);
          // {
          // const { type, children, ...partialObject } = child;

          //   const correctText =
          //     child.children[0] !== undefined ? child.children[0].content : '';
          //
          //   const updatedChild = {
          //     text: correctText,
          //     ...partialObject,
          //   };
          //
          //   return updatedChild;
          // });

          boltedObject[`${parent}`].push(elements);
          break;
        default:
          this.convertElements(element.children, boltedObject);
      }
    });

    return boltedObject;
  }

  render() {
    const parseCode = this.removeWhitespace(parse(this.innerHTML));
    const { format, borderless, firstColFixedWidth } = this.props;
    const tableClasses = cx('c-bolt-table', {
      [`c-bolt-table--format-${format}`]: format !== 'regular',
      [`c-bolt-table--borderless`]: borderless,
      [`c-bolt-table--first-col-fixed-width`]: firstColFixedWidth,
    });
    const bodyClasses = cx('c-bolt-table__body');
    const headClasses = cx('c-bolt-table__head');
    const footClasses = cx('c-bolt-table__foot');
    const rowClasses = cx('c-bolt-table__row');
    let boltTableMarkup = [];

    const boltTable = this.convertElements(parseCode);

    function setSectionTag(tag) {
      switch (tag) {
        case 'head':
          return html`
            <thead class=${headClasses}>
              ${boltTable[tag].map(
                row => html`
                  ${setRowTag(row, tag)}
                `,
              )}
            </thead>
          `;
        case 'foot':
          return html`
            <tfoot class=${footClasses}>
              ${boltTable[tag].map(
                row => html`
                  ${setRowTag(row, tag)}
                `,
              )}
            </tfoot>
          `;
        default:
          return html`
            <tbody class=${bodyClasses}>
              ${boltTable[tag].map(
                row => html`
                  ${setRowTag(row, tag)}
                `,
              )}
            </tbody>
          `;
      }
    }

    function setRowTag(row, section) {
      return html`
        <tr class=${rowClasses}>
          ${row.map(
            item =>
              html`
                ${setCellTag(item, section)}
              `,
          )}
        </tr>
      `;
    }

    function setCellTag(cell, section) {
      if (cell.tagName === 'th') {
        const cellClasses = cx(
          'c-bolt-table__cell',
          'c-bolt-table__cell--header',
        );

        let scopeAttr;

        if (section === 'head') {
          scopeAttr = 'col';
        } else if (section === 'body') {
          scopeAttr = 'row';
        }

        return html`
          ${scopeAttr !== undefined
            ? html`
                <th class=${cellClasses} scope=${scopeAttr}>
                  ${renderCell(cell)}
                </th>
              `
            : html`
                <th className=${cellClasses}>
                  ${renderCell(cell)}
                </th>
              `}
        `;
      } else {
        const cellClasses = cx(
          'c-bolt-table__cell',
          'c-bolt-table__cell--data',
        );

        return html`
          <td class=${cellClasses}>
            ${renderCell(cell)}
          </td>
        `;
      }
    }

    function renderCell(cell) {
      const content = stringify(cell.children);

      console.log('CONTENT', content);
      return html`
        ${unescape(content)}
      `;
    }

    Object.keys(boltTable).map(key => {
      boltTableMarkup.push(html`
        ${setSectionTag(key)}
      `);
    });

    console.log('BT:', boltTable);
    console.log('BTM:', boltTableMarkup);

    return html`
      ${this.addStyles([styles])}
      <table class=${tableClasses}>
        ${boltTableMarkup}
      </table>
    `;
  }
}

export { BoltTable };
