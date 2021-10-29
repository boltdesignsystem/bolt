import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { parse, stringify } from 'himalaya';
import classNames from 'classnames/bind';
// import styles from './table.scss';
import schema from '../table.schema';

let cx = classNames.bind(styles);

@customElement('bolt-table')
class BoltTable extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      caption: {
        type: Object,
      },
    };
  }

  static useShadow = false;

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  removeEmptyNodes(nodes) {
    return nodes.filter(node => {
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
    return nodes.filter(node => {
      if (node.type === 'element') {
        node.children = this.removeCommentNodes(node.children);
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
          boltedObject[`${parent}`].push(elements);
          break;
        case 'caption':
          // If we encounter a `<caption>` tag, save as prop and deal with it separately later on.
          this.caption = element;
          break;
        default:
          if (element.children) {
            this.convertElements(element.children, boltedObject);
          }
      }
    });

    return boltedObject;
  }

  updated(changedProperties) {
    super.updated && super.updated();

    const nodesToUpdate = this.renderRoot.querySelectorAll('*[data-attrs]');
    const tdInThead = this.renderRoot.querySelectorAll('thead td');

    [...nodesToUpdate].forEach(node => {
      let attrsToUpdate = node.getAttribute('data-attrs');
      node.removeAttribute('data-attrs');

      const attrArray = attrsToUpdate.split('|');

      attrArray.map(attr => {
        const attrs = attr.split('=');
        node.setAttribute(`${attrs[0]}`, `${attrs[1]}`);
      });
    });

    [...tdInThead].forEach(td => {
      if (td.innerHTML.replace(/\s/g, '') === '') {
        td.innerHTML = '';
      }
    });
  }

  render() {
    const slottedTable = this.querySelector('table');

    // If there's no table inside stop here, only errors lie ahead
    if (!slottedTable) return;

    const parseCode =
      slottedTable &&
      this.removeComments(
        this.removeWhitespace(parse(slottedTable.parentNode.innerHTML)),
      );

    const tableClasses = cx('c-bolt-table', {
      [`c-bolt-table--format-${this.format}`]: this.format !== 'regular',
      [`c-bolt-table--borderless`]: this.borderless,
      [`c-bolt-table--first-col-fixed-width`]: this.firstColFixedWidth,
    });
    const bodyClasses = cx('c-bolt-table__body');
    const headClasses = cx('c-bolt-table__head');
    const footClasses = cx('c-bolt-table__foot');
    const rowClasses = cx('c-bolt-table__row');
    const figureClasses = cx('c-bolt-table__figure');
    const captionClasses = cx('c-bolt-table__caption');
    let boltTableMarkup = [];

    const boltTable = this.convertElements(parseCode);

    function setSectionTag(tag) {
      switch (tag) {
        case 'caption':
          return html`
            <!-- <caption class=${captionClasses}>
              ${boltTable[tag]}
            </caption> -->
          `;
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
      const classIndex = attributes.findIndex(item => item.key === 'class');

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

      return html`
        ${unsafeHTML(content)}
      `;
    }

    Object.keys(boltTable).map(key => {
      boltTableMarkup.push(html`
        ${setSectionTag(key)}
      `);
    });

    injectClasses(tableClasses, parseCode[0].attributes);

    // Caption should be passed in as table content, except when coming from
    // our Twig template, where it is slotted content for SSR purposes.
    const tableCaption = this.caption
      ? stringify(this.caption.children)
      : this.slotMap.get('caption')
      ? this.slotify('caption')
      : '';

    return html`
      ${tableCaption
        ? html`
            <figure class="${figureClasses}">
              <table data-attrs=${ifDefined(setAttr(parseCode[0].attributes))}>
                ${boltTableMarkup}
              </table>
            </figure>
            <figcaption class="${captionClasses}">${tableCaption}</figcaption>
          `
        : html`
            <table data-attrs=${ifDefined(setAttr(parseCode[0].attributes))}>
              ${boltTableMarkup}
            </table>
          `}
    `;
  }
}

export { BoltTable };
