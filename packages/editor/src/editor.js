import * as grapesjs from 'grapesjs';
import { html, render } from '@bolt/core';
import { query, IS_PROD } from '@bolt/core/utils';
import { triggerAnimsInEl } from '@bolt/components-animate/utils';
import { setupPanels } from './panels';
import { setupBlocks } from './blocks';
import { setupComponents } from './components';
import { setupBolt } from './setup-bolt';
import { addThemeContextClasses } from './utils';

/**
 * @param {Object} opt
 * @param {HTMLElement} opt.space
 * @param {HTMLElement} opt.uiWrapper
 * @param {grapesjs.BoltEditorConfig} opt.config
 * @return {grapesjs.Editor}
 */
export function enableEditor({ space, uiWrapper, config }) {
  /** @type {{ [key: string]: HTMLElement }} */
  const editorSlots = {
    buttons: uiWrapper.querySelector('.pega-editor-ui__buttons'),
    layers: uiWrapper.querySelector('.pega-editor-ui__slot--layers'),
    traits: uiWrapper.querySelector('.pega-editor-ui__traits'),
    componentMeta: uiWrapper.querySelector('.pega-editor-ui__component-meta'),
    slotControls: uiWrapper.querySelector('.pega-editor-ui__slot-controls'),
    blocks: uiWrapper.querySelector('.pega-editor-ui__slot--blocks'),
  };

  const stylePrefix = 'pega-editor-';

  /**
   * Move bolt-interactive-step or bolt-interactive-pathway up or down.
   *
   * @param editor {grapesjs.Editor}
   * @param directionIsUp {boolean}: If true, move direction is up. If false, direction is down.
   */
  const moveElement = (editor, directionIsUp = true) => {
    if (!editor.getSelected()) {
      return;
    }

    const selected = editor.getSelected();
    const isStep = selected.attributes.tagName === 'bolt-interactive-step';
    const isPathway =
      selected.attributes.tagName === 'bolt-interactive-pathway';

    if (!(isPathway || isStep)) {
      // eslint-disable-next-line no-alert
      alert('"Move Up" and "Move Down" only work for Steps and Pathways');
      return;
    }

    const parentCollection = selected.parent().components();
    if (parentCollection.length <= 1) {
      return;
    }

    const indexOfSelected = parentCollection.indexOf(selected);
    parentCollection.remove(selected);
    if (directionIsUp) {
      parentCollection.add(selected, {
        at: Math.max(indexOfSelected - 1, 0),
      });
    } else {
      parentCollection.add(selected, {
        at: Math.min(indexOfSelected + 1, parentCollection.length),
      });
    }
    const eventTargetSelector = isStep
      ? 'bolt-interactive-pathway'
      : 'bolt-interactive-pathways';
    const eventName = isStep
      ? 'bolt-interactive-step:change-active-step'
      : 'bolt-interactive-pathway:title-updated';
    const event = new CustomEvent(eventName, {
      bubbles: true,
    });
    parentCollection
      .at(0)
      .closest(eventTargetSelector)
      .view.el.dispatchEvent(event);
  };

  /** @type {grapesjs.EditorConfig} */
  const editorConfig = {
    container: space,
    fromElement: true,
    autorender: false,
    // height: '100vh',
    // width: 'auto',
    plugins: [setupBolt, setupComponents, setupPanels, setupBlocks],
    noticeOnUnload: true,
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
              id: 'duplicate',
              label: 'Duplicate',
              command: {
                run: editor => {
                  editor.runCommand('core:copy');
                  editor.runCommand('core:paste');
                },
              },
            },
            {
              command: 'core:component-delete',
              id: 'component-delete',
              label: 'Delete',
            },
            {
              command: 'core:canvas-clear',
              id: 'canvas-clear',
              label: 'Clear Canvas',
            },
            {
              id: 'visibility',
              active: true,
              label: 'Toggle Borders',
              command: 'sw-visibility',
            },
            {
              id: 'fullscreen',
              label: 'Full Screen',
              command: 'core:fullscreen',
              attributes: { title: 'Full Screen' },
            },
            {
              id: 'export',
              className: 'btn-open-export',
              label: 'Export HTML',
              command: 'export-template',
            },
            {
              id: 'device-mobile',
              label: 'Resize: Mobile',
              togglable: true,
              command: {
                run: editor => editor.setDevice('Mobile'),
                stop: editor => editor.setDevice('Full'),
              },
            },
            {
              id: 'device-tablet',
              label: 'Resize: Tablet',
              togglable: true,
              command: {
                run: editor => editor.setDevice('Tablet'),
                stop: editor => editor.setDevice('Full'),
              },
            },
            {
              id: 'device-desktop',
              label: 'Resize: Desktop',
              togglable: true,
              command: {
                run: editor => editor.setDevice('Desktop'),
                stop: editor => editor.setDevice('Full'),
              },
            },
            {
              id: 'submit-bug',
              label: 'Submit Bug',
              togglable: false,
              className: 'gjs-pega-editor-panels-btn--bug',
              command: {
                run: () => {
                  if (!window['usersnapApi']) return;
                  window['usersnapApi'].open();
                },
              },
            },
            {
              id: 'move-up',
              label: 'Move Up',
              togglable: false,
              className: 'gjs-pega-editor-panels-btn--move-up',
              command: {
                run: (/** @type {grapesjs.Editor} */ editor) => {
                  moveElement(editor, true);
                },
              },
            },
            {
              id: 'move-down',
              label: 'Move Down',
              togglable: false,
              className: 'gjs-pega-editor-panels-btn--move-down',
              command: {
                run: (/** @type {grapesjs.Editor} */ editor) => {
                  moveElement(editor, false);
                },
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
    deviceManager: {
      devices: [
        { name: 'Mobile', width: '400px' },
        { name: 'Tablet', width: '700px' },
        { name: 'Desktop', width: '1100px' },
        { name: 'Full', width: '100%' },
      ],
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
    // rte: {
    //   actions: false,
    // },
  };

  const editor = grapesjs.init(editorConfig);

  /**
   * @param {object} opt
   * @param {string} opt.name - tag name
   * @param {string} opt.slotName
   * @param {string} opt.content - HTML to add
   * @param {boolean} [opt.shouldCreateAnimatableSlotIfNotPresent=true]
   * @param {boolean} [opt.selectAfterAdd=true]
   * @param {boolean} [opt.triggerAnimsAfterAdd=true]
   * @return {grapesjs.Component}
   */
  function addComponentToSelectedComponentsSlot({
    name,
    slotName,
    content,
    shouldCreateAnimatableSlotIfNotPresent = true,
    selectAfterAdd = true,
    triggerAnimsAfterAdd = true,
  }) {
    const selected = editor.getSelected();
    const components = selected.components();
    /** @type {grapesjs.ComponentObject} */
    const data = {
      type: 'div', // temp tag, will remove after
      content: '',
    };

    let tempComponent;
    if (slotName === 'default') {
      tempComponent = components.add(data);
    } else {
      const slots = selected.find('[slot]');
      const [slot] = selected.find(`${name} > [slot="${slotName}"]`);
      if (slot) {
        const slotComponents = slot.components();
        tempComponent = slotComponents.add(data);
      } else {
        const [newSlot] = selected.append(
          shouldCreateAnimatableSlotIfNotPresent
            ? `<bolt-animate slot="${slotName}"></bolt-animate>`
            : `<div slot="${slotName}"></div>`,
        );
        const slotComponents = newSlot.components();
        tempComponent = slotComponents.add(data);
      }
    }

    const newComponent = tempComponent.replaceWith(content);
    // if `content` has more than one top level element, we'll get an array, so we need to get the parent element to select in editor and trigger possible animations
    const singleComponent =
      Array.isArray(newComponent) && newComponent.length > 0
        ? newComponent[0].parent()
        : newComponent;

    if (selectAfterAdd) editor.select(singleComponent);
    if (triggerAnimsAfterAdd) {
      const newEl = singleComponent.getEl();
      triggerAnimsInEl(newEl);
    }
    return newComponent;
  }

  /**
   * @param {Object} opt
   * @param {grapesjs.SlotControl[]} opt.slotControls
   * @param {string} opt.name - tag name
   */
  function renderSlotControls({ slotControls, name }) {
    if (!slotControls) {
      render(html``, editorSlots.slotControls);
      return;
    }

    const slotControlMarkup = slotControls.map(({ slotName, components }) => {
      return html`
        <h4>${slotName}</h4>
        <select
          @change=${event => {
            const { value } = event.target;
            if (value === 'none') return;
            const component = components.find(c => c.id === value);
            const newComponent = addComponentToSelectedComponentsSlot({
              slotName,
              content: component.content,
              name,
            });
            event.target.value = 'none';
          }}
        >
          <option value="none">(Add component to slot)</option>
          ${components.map(
            component => html`
              <option value="${component.id}">${component.title}</option>
            `,
          )}
        </select>
      `;
    });

    const content = html`
      <h2>Slots</h2>
      ${slotControlMarkup}
    `;
    render(content, editorSlots.slotControls);
  }

  editor.on('component:selected', (/** @type {grapesjs.Component} */ model) => {
    const name = model.getName().toLowerCase();
    const slotControls = model.getSlotControls && model.getSlotControls();
    renderSlotControls({ slotControls, name });
  });

  editor.on('component:deselected', model => {
    render(html``, editorSlots.slotControls);
  });

  editor.render();
  const canvasDoc = editor.Canvas.getDocument();
  const canvasWindow = editor.Canvas.getWindow();
  const canvasWrapper = editor.Canvas.getWrapperEl();

  addThemeContextClasses({ space, canvasWrapper });

  // canvasDoc.body.classList.add('in-editor');

  // prevents `overflow: hidden` from cutting off child elements that break out of their box
  canvasWrapper.style.padding = '20px';

  config.scripts.forEach(script => {
    const scriptEl = canvasDoc.createElement('script');
    scriptEl.src = script;
    scriptEl.async = true;
    canvasDoc.body.appendChild(scriptEl);
  });

  // helpful to access current editor instance in console with `editor`
  window['editor'] = editor; // eslint-disable-line dot-notation

  let dropzoneSelector = '';

  function addDropzoneHighlights() {
    const dropzones = query(dropzoneSelector, canvasDoc);
    if (!dropzones) return;
    dropzones.forEach(el => {
      const isEmpty = el.children.length === 0;
      el.style.outline = 'dotted green 1px';
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

  editor.on('block:drag:start', block => {
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
