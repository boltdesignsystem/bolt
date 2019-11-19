import * as grapesjs from 'grapesjs'; // eslint-disable-line no-unused-vars

/* eslint-disable no-unused-vars */

/**
 * @param {grapesjs.Editor} editor
 * @returns {void}
 */
export function setupPanels(editor) {
  /* eslint-enable no-unused-vars */
  const {
    /** @type {grapesjs.Panels} */
    Panels,
  } = editor;

  // const buttons = [
  //   {
  //     id: 'visibility',
  //     active: true, // active by default
  //     className: 'btn-toggle-borders',
  //     label: '<u>Borders</u>',
  //     command: 'sw-visibility', // Built-in command
  //   },
  //   {
  //     id: 'clear',
  //     label: 'Clear',
  //     command: 'core:canvas-clear',
  //   },
  //   {
  //     id: 'fullscreen',
  //     label: 'Fullscreen',
  //     command: 'core:fullscreen',
  //   },
  //   {
  //     id: 'export',
  //     className: 'btn-open-export',
  //     label: 'Exp',
  //     command: 'export-template',
  //     context: 'export-template', // For grouping context of buttons from the same panel
  //   },

  //   // {
  //   //   id: 'show-json',
  //   //   className: 'btn-show-json',
  //   //   label: 'JSON',
  //   //   context: 'show-json',
  //   //   command(editor) {
  //   //     editor.Modal.setTitle('Components JSON')
  //   //       .setContent(
  //   //         `<textarea style="width:100%; height: 250px;">
  //   //           ${JSON.stringify(editor.getComponents())}
  //   //         </textarea>`,
  //   //       )
  //   //       .open();
  //   //   },
  //   // },
  //   // {
  //   //   id: 'getHtml',
  //   //   className: 'getHtml',
  //   //   label: 'Get HTML',
  //   //   command(editor) {
  //   //     console.log(editor.getHtml());
  //   //   },
  //   // },
  //   // {
  //   //   id: 'show-layers',
  //   //   active: true,
  //   //   label: 'Toggle Layers',
  //   //   togglable: true,
  //   //   // command: 'show-layers',
  //   //   command: {
  //   //     // getLayersEl(editor) {
  //   //     //   // const row = editor.getContainer().closest('.editor-row');
  //   //     //   return row.querySelector('.traits-container');
  //   //     // },
  //   //     run(editor, sender) {
  //   //       layersEl.style.display = '';
  //   //       // this.getTraitsEl(editor).style.display = '';
  //   //     },
  //   //     stop(editor, sender) {
  //   //       layersEl.style.display = 'none';
  //   //     },
  //   //   },
  //   // },
  // ];

  // Remove the style manager button from Panels since we won't be using it
  Panels.removeButton('views', 'open-sm');
}
