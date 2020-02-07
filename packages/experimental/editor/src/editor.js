import * as grapesjs from 'grapesjs';
import { html, render } from '@bolt/core-v3.x/renderers';
import { query, IS_PROD } from '@bolt/core-v3.x/utils';
import { triggerAnimsInEl } from '@bolt/components-animate/utils';
import { boltTwoCharacterLayoutIs } from '@bolt/micro-journeys/src/two-character-layout';
import { boltCharacterIs } from '@bolt/micro-journeys/src/character';
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
   * Refresh editor DOM content to see changes reflected after edits may mess up
   * layout. Any miscellaneous refresh tasks can be put here.
   *
   * @param editor {grapesjs.Editor}
   */
  const refreshContent = editor => {
    const document = editor.Canvas.getDocument();
    document
      .querySelectorAll(boltTwoCharacterLayoutIs)
      .forEach(twoCharLayout => {
        twoCharLayout.triggerLayoutRecalculate();
      });
    document.querySelectorAll('*').forEach(el => {
      if (el.setupSlots) el.setupSlots();
      if (el.triggerUpdate) el.triggerUpdate();
      if (el.triggerAnimIns) el.triggerAnimIns();
      if (el.triggerAnimIn) el.triggerAnimIn();
    });
  };

  /**
   * Move bolt-interactive-step or bolt-interactive-pathway up or down.
   *
   * @param editor {grapesjs.Editor}
   * @param directionIsUp {boolean}: If true, move direction is up. If false, direction is down.
   */
  const moveElement = (editor, directionIsUp = true) => {
    if (!editor.getSelected()) {
      alert('Please select a component in the "Layers" panel before moving');
      return;
    }

    const selected = editor.getSelected();
    const selectedIndex = selected.index();
    const selectedHTML = selected.toHTML();
    const isStep = selected.attributes.tagName === 'bolt-interactive-step';
    const isPathway =
      selected.attributes.tagName === 'bolt-interactive-pathway';

    if (!(isPathway || isStep)) {
      // eslint-disable-next-line no-alert
      alert('"Move Up" and "Move Down" only work for Steps and Pathways');
      return;
    }

    // selected item & siblings
    const parentCollection = selected.parent().components();
    if (parentCollection.length <= 1) {
      return;
    }

    // remove current one
    parentCollection.remove(selected);

    // figure out where the new one goes
    const newIndex = directionIsUp
      ? Math.max(selectedIndex - 1, 0)
      : Math.min(selectedIndex + 1, parentCollection.length);
    // insert it and get a reference to it
    const newItem = parentCollection.add(selectedHTML, {
      at: newIndex,
    });
    /**
     * Get the actual HTML element in the view
     * @type {HTMLElement}
     * @todo set this type to 'bolt-interactive-step' or 'bolt-interactive-pathway'
     *  */
    const newEl = newItem.getEl();

    // Select it in the Editor UI for Layers panel focus
    editor.select(newItem);

    // we wait an event loop & a bit extra so the async functions can finish that are fired in the 'component:remove' event handler (below) due to the `parentCollection.remove()` call above.
    setTimeout(() => {
      // The event handlers that catch this event are responsible for the re-triggering of animations, title sorting & other re-rendering
      const eventName = isStep
        ? 'bolt-interactive-step:change-active-step-to-index'
        : 'bolt-interactive-pathway:title-updated';
      newEl.dispatchEvent(
        new CustomEvent(eventName, {
          bubbles: true,
          detail: {
            index: newIndex,
          },
        }),
      );
    }, 10);
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
            {
              id: 'refresh-content',
              label: 'Refresh Content',
              togglable: false,
              className: 'gjs-pega-editor-panels-btn--refresh-content',
              command: {
                run: (/** @type {grapesjs.Editor} */ editor) => {
                  refreshContent(editor);
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
    let newComponent;
    if (slotName === 'default') {
      // If slot is default, simply add it.
      newComponent = components.add(content);
    } else {
      // If slot is already set up, add to existing slot.
      const [slot] = selected.find(`${name} > [slot="${slotName}"]`);
      if (slot) {
        const slotComponents = slot.components();
        newComponent = slotComponents.add(content);
      } else {
        // Create new content for slot.
        newComponent = selected.append(
          shouldCreateAnimatableSlotIfNotPresent
            ? `<bolt-animate slot="${slotName}">${content}</bolt-animate>`
            : `<div slot="${slotName}">${content}</div>`,
        );
      }
    }
    // Force slots to refresh.
    selected.getEl().setupSlots();
    selected.getEl().triggerUpdate();
    // Handle case where multiple components are being added.
    const newComponentSingle =
      newComponent.length > 1 ? newComponent[0].parent() : newComponent[0];
    if (selectAfterAdd) editor.select(newComponentSingle);
    if (triggerAnimsAfterAdd) triggerAnimsInEl(newComponentSingle.getEl());
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

  /**
   * Add prop schema descriptions underneath traits on select if not present.
   *
   * @param {grapesjs.Component} model
   * @return {void}
   */
  editor.on('component:selected', model => {
    model.attributes.traits.models.forEach(trait => {
      if (trait.attributes.description) {
        // setTimeout because view hasn't yet been created for trait in component:selected.
        setTimeout(() => {
          const traitDescClass = 'trait-description';
          if (
            trait.view.el.lastElementChild.getAttribute('class') !==
            traitDescClass
          ) {
            const template = document.createElement('template');
            template.innerHTML = `<div class="${traitDescClass}" style="font-size: smaller"><i>${trait.attributes.description}</i></div>`;
            trait.view.el.appendChild(template.content.firstChild);
          }
        }, 0);
      }
    });
  });

  /**
   * Render slot controls for selected component if they exist.
   *
   * @param {grapesjs.Component} model
   * @return {void}
   */
  editor.on('component:selected', (/** @type {grapesjs.Component} */ model) => {
    const name = model.getName().toLowerCase();
    const slotControls = model.getSlotControls && model.getSlotControls();
    renderSlotControls({ slotControls, name });
  });

  editor.on('component:remove', (/** @type {grapesjs.Component} */ model) => {
    // Editor removes all components in order on save/cleanup. Don't check then.
    if (!editor.isSaving) {
      // Timeout so cleanup and layer re-render happens on parent before removal.
      setTimeout(() => {
        const parent = model.parent();
        // Remove empty parent `bolt-animate`s
        if (parent && parent.attributes.tagName === 'bolt-animate') {
          if (parent && parent.view.el.assignedSlot) {
            parent.view.el.assignedSlot.remove();
          }
          parent.remove();
        }
      }, 0);
    }
  });

  /**
   * Remove slot controls for selected component.
   *
   * @param {grapesjs.Component} model
   * @return {void}
   */
  editor.on('component:deselected', model => {
    render(html``, editorSlots.slotControls);
  });

  /**
   * Remove click handlers from selected components to prevent interactions
   * preventing text editing in the editor.
   *
   * @param {grapesjs.Component} model
   * @return {void}
   */
  editor.on('component:selected', model => {
    // clickHandler is set in declarativeClickHandler and attached in BoltActionElement
    if (model.view.el.clickHandler) {
      model.view.el.removeEventListener('click', model.view.el.clickHandler);
      model.view.el.removedClickHandler = model.view.el.clickHandler;
    }
  });

  /**
   * Re-add removed clickHandlers to selected components
   *
   * @param {grapesjs.Component} model
   * @return {void}
   */
  editor.on('component:deselected', (
    /** @type {grapesjs.Component} */ model,
  ) => {
    if (model.view.el.removedClickHandler) {
      model.view.el.addEventListener(
        'click',
        model.view.el.removedClickHandler,
      );
      delete model.view.el.removedClickHandler;
    }
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
