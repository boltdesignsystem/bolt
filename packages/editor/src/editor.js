import * as grapesjs from 'grapesjs';
import { query } from './utils';
import { setupPanels } from './panels';
import { setupBlocks } from './blocks';
import { setupComponents } from './components';
import { setupBolt } from './setup-bolt';

/**
 * @param {Object} opt
 * @param {HTMLElement} opt.space
 * @param {HTMLElement} opt.uiWrapper
 * @param {BoltEditorConfig} opt.config
 * @return {grapesjs.Editor}
 */
export function enableEditor({ space, uiWrapper, config }) {
  /** @type {{ [key: string]: HTMLElement }} */
  const editorSlots = {
    buttons: uiWrapper.querySelector('.pega-editor-ui__buttons'),
    layers: uiWrapper.querySelector('.pega-editor-ui__slot--layers'),
    traits: uiWrapper.querySelector('.pega-editor-ui__slot--traits'),
    blocks: uiWrapper.querySelector('.pega-editor-ui__slot--blocks'),
  };

  const stylePrefix = 'pega-editor-';

  /** @type {grapesjs.EditorConfig} */
  const editorConfig = {
    container: space,
    fromElement: true,
    autorender: false,
    // height: '100vh',
    // width: 'auto',
    plugins: [setupBolt, setupComponents, setupPanels, setupBlocks],
    noticeOnUnload: false,
    panels: {
      stylePrefix: `${stylePrefix}panels-`,
      defaults: [
        {
          id: 'uiWrapper',
          el: uiWrapper,
          resizable: {
            tc: true,
            cr: false,
            cl: false,
            bc: false,
          },
        },
        {
          id: 'buttons',
          el: editorSlots.buttons,
          resizable: {
            tc: false,
            cr: false,
            cl: false,
            bc: false,
          },
          buttons: [
            {
              command: 'core:undo',
              id: 'undo',
              label: 'Undo',
              // className: 'fa fa-undo',
              // attributes: { title: 'Undo' },
            },
            {
              command: 'core:redo',
              id: 'redo',
              label: 'Redo',
              // className: 'fa fa-repeat',
              // attributes: { title: 'Redo' },
            },
            {
              id: 'fullscreen',
              label: 'Full Screen',
              command: 'core:fullscreen',
              attributes: { title: 'Full Screen' },
            },
            {
              id: 'visibility',
              active: true, // active by default
              label: 'Toggle Borders',
              command: 'sw-visibility', // Built-in command
            },
            {
              id: 'export',
              className: 'btn-open-export',
              label: 'Export Template',
              command: 'export-template',
            },
            {
              command: 'core:canvas-clear',
              id: 'canvas-clear',
              label: 'Clear Canvas',
            },
            {
              id: 'show-json',
              className: 'btn-show-json',
              label: 'Show JSON',
              // attributes: { title: 'Show JSON' },
              command(editor) {
                editor.Modal.setTitle('Components JSON')
                  .setContent(
                    `<textarea style="width:100%; height: 250px;">
                      ${JSON.stringify(editor.getComponents(), null, '  ')}
                    </textarea>`,
                  )
                  .open();
              },
            },
          ],
        },
        {
          id: 'blocks',
          el: editorSlots.blocks,
          resizable: {
            tc: false,
            cr: false,
            cl: false,
            bc: false,
          },
        },
      ],
    },
    storageManager: { type: null },
    layerManager: {
      appendTo: editorSlots.layers,
    },
    traitManager: {
      appendTo: editorSlots.traits,
    },
    blockManager: {
      appendTo: editorSlots.blocks,
      blocks: [],
    },
    styleManager: { type: null },
    assetManager: {
      assets: [
        'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
        // Pass an object with your properties
        {
          type: 'image',
          src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
          height: 350,
          width: 250,
        },
        {
          // As the 'image' is the base type of assets, omitting it will
          // be set as `image` by default
          src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
          height: 350,
          width: 250,
        },
      ],
    },
    canvas: {
      // assigning this overrides the default of `cv-` which prevents the layout styles from hitting it
      stylePrefix: `${stylePrefix}canvas-`,
      styles: config.styles,
    },
  };

  const editor = grapesjs.init(editorConfig);

  editor.render();
  const canvasDoc = editor.Canvas.getDocument();
  const canvasWindow = editor.Canvas.getWindow();

  canvasDoc.body.classList.add('in-editor');

  config.scripts.forEach(script => {
    const scriptEl = canvasDoc.createElement('script');
    scriptEl.src = script;
    canvasDoc.body.appendChild(scriptEl);
  });
  // console.log({ canvasDoc, canvasWindow });

  // const { BlockManager, Panels, DomComponents } = editor;

  window['editor'] = editor; // eslint-disable-line dot-notation

  let dropzoneSelector = '';

  function addDropzoneHighlights() {
    const dropzones = query(dropzoneSelector, canvasDoc);
    if (!dropzones) return;
    dropzones.forEach(el => {
      const isEmpty = el.children.length === 0;
      el.style.outline = 'dotted green 2px';
    });
  }

  function removeDropzoneHighlights() {
    const dropzones = query(dropzoneSelector, canvasDoc);
    if (!dropzones) return;
    dropzones.forEach(el => {
      el.style.outline = '';
    });
    dropzoneSelector = '';
  }

  editor.on('block:drag:start', (block, a, b) => {
    const { id } = block;
    const component = editor.DomComponents.getType(id);
    const { droppable, draggable } = component.model.prototype.defaults;
    if (typeof droppable === 'string') {
      dropzoneSelector = droppable;
      addDropzoneHighlights();
    }
  });

  editor.on('block:drag:stop', (componentModel, blockModel) => {
    if (dropzoneSelector) {
      removeDropzoneHighlights();
    }
  });

  // Global hooks
  // editor.on(`component:create`, model =>
  //   console.log('Global hook: component:create', model.get('type')),
  // );
  // editor.on(`component:mount`, model =>
  //   console.log('Global hook: component:mount', model.get('type')),
  // );
  // how to have an event for just a specific prop: `testprop`
  // editor.on(`component:update:testprop`, model =>
  //   console.log('Global hook: component:update:testprop', model.get('type')),
  // );
  // editor.on(`component:remove`, model =>
  //   console.log('Global hook: component:remove', model.get('type')),
  // );
  return editor;
}
