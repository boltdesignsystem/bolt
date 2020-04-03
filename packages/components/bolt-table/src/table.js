import { html, customElement } from '@bolt/element';
import { props } from '@bolt/core-v3.x/utils';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { parse, stringify } from 'himalaya';

import classNames from 'classnames/bind';

import styles from './table.scss';
import schema from '../table.schema.yml';

let cx = classNames.bind(styles);

@customElement('bolt-table')
class BoltTable extends withLitHtml {
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
    self.useShadow = false;
    return self;
  }

  removeEmptyNodes(nodes) {
    return nodes.filter((node) => {
      if (node.type !== 'comment') {
        if (node.type === 'element') {
          node.children = this.removeEmptyNodes(node.children);
          return true;
        }
        return node.content.length;
      }
    });
  }

  removeCommentNodes(nodes) {
    return nodes.filter((node) => {
      if (node.type === 'element') {
        node.children = this.removeCommentNodes(node.children);
        return true;
      }
      return node.content.length;
    });
    return nodes;
  }

  stripWhitespace(nodes) {
    return nodes.map((node) => {
      if (node.type === 'element') {
        node.children = this.stripWhitespace(node.children);
      } else {
        node.content =
          node.content.trim().length === 0
            ? ''
            : node.content.replace(/\s{2,}/g, ' ');
      }
      return node;
    });
  }

  removeWhitespace(nodes) {
    return this.removeEmptyNodes(this.stripWhitespace(nodes));
  }

  removeComments(nodes) {
    return this.removeCommentNodes(nodes);
  }

  createProp(object, prop, value) {
    if (object[`${prop}`] === undefined) {
      object[`${prop}`] = value;
    }
  }

  convertElements(element, object, parent = 'body') {
    const boltedObject = object !== undefined ? object : {};

    element.map((element) => {
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
          const elements = element.children.map((child) => child);

          boltedObject[`${parent}`].push(elements);
          break;
        default:
          this.convertElements(element.children, boltedObject);
      }
    });

    return boltedObject;
  }

  rendered() {
    super.rendered && super.rendered();

    const nodesToUpdate = this.renderRoot.querySelectorAll('*[data-attrs]');
    const tdInThead = this.renderRoot.querySelectorAll('thead td');

    [...nodesToUpdate].forEach((node) => {
      let attrsToUpdate = node.getAttribute('data-attrs');
      node.removeAttribute('data-attrs');

      const attrArray = attrsToUpdate.split('|');

      attrArray.map((attr) => {
        const attrs = attr.split('=');
        node.setAttribute(`${attrs[0]}`, `${attrs[1]}`);
      });
    });

    [...tdInThead].forEach((td) => {
      if (td.innerHTML.replace(/\s/g, '') === '') {
        td.innerHTML = '';
      }
    });
  }

  render() {
    const parseCode = this.removeComments(
      this.removeWhitespace(parse(this.innerHTML)),
    );
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
              ${boltTable[tag].map((row) => html` ${setRowTag(row, tag)} `)}
            </thead>
          `;
        case 'foot':
          return html`
            <tfoot class=${footClasses}>
              ${boltTable[tag].map((row) => html` ${setRowTag(row, tag)} `)}
            </tfoot>
          `;
        default:
          return html`
            <tbody class=${bodyClasses}>
              ${boltTable[tag].map((row) => html` ${setRowTag(row, tag)} `)}
            </tbody>
          `;
      }
    }

    function setRowTag(row, section) {
      return html`
        <tr class=${rowClasses}>
          ${row.map((item) => html` ${setCellTag(item, section)} `)}
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

        injectClasses(cellClasses, cell.attributes);

        return html`
          <th
            data-attrs=${ifDefined(setAttr(cell.attributes))}
            scope=${ifDefined(scopeAttr)}
          >
            ${renderCell(cell)}
          </th>
        `;
      } else {
        const cellClasses = cx('c-bolt-table__cell', {
          [`c-bolt-table__cell--data`]: section !== 'head',
        });

        injectClasses(cellClasses, cell.attributes);

        return html`
          <td data-attrs=${ifDefined(setAttr(cell.attributes))}>
            ${renderCell(cell)}
          </td>
        `;
      }
    }

    function setAttr(attributes) {
      if (attributes.length > 0) {
        return attributes.map((attr, index) => {
          return `${index > 0 ? '|' : ''}${attr.key}=${attr.value}`;
        });
      }
    }

    function injectClasses(classes, attributes) {
      // @todo: `findIndex` does not work in IE11 without a polyfill, so it silently stops/fails here.
      // Once polyfilled, the table markup disappears on load. Come back to this, polyfill it, and fix he underlying table bug.
      const classIndex = attributes.findIndex((item) => item.key === 'class');

      if (classIndex === -1) {
        attributes.push({ key: 'class', value: classes });
      } else {
        attributes[classIndex].value = Array.from(
          new Set(`${attributes[classIndex].value} ${classes}`.split(' ')),
        ).join(' ');
      }
    }

    function renderCell(cell) {
      const content = stringify(cell.children);

      return html` ${unsafeHTML(content)} `;
    }

    Object.keys(boltTable).map((key) => {
      boltTableMarkup.push(html` ${setSectionTag(key)} `);
    });

    injectClasses(tableClasses, parseCode[0].attributes);

    return html`
      ${this.addStyles([styles])}
      <table data-attrs=${ifDefined(setAttr(parseCode[0].attributes))}>
        ${boltTableMarkup}
      </table>
    `;
  }
}

export { BoltTable };
