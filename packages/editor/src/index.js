import { query } from './utils';

const defaultConfig = {};

/**
 * @param {HTMLElement} [appendTo] - HTMLElement to append to
 * @returns {{ el: HTMLElement, destroy: function(): void }} cleanup function to remove HTML
 */
function createEditorUiHtml(appendTo = document.body) {
  const uiMarkup = `
    <div class="pega-editor-ui__slot pega-editor-ui__slot--buttons"></div>
    <div class="pega-editor-ui__slot pega-editor-ui__slot--blocks"></div>
    <div class="pega-editor-ui__slot pega-editor-ui__slot--traits">
      <h5>Properties</h5>
    </div>
  `;

  const uiWrapper = document.createElement('div');
  uiWrapper.classList.add('pega-editor-ui');
  uiWrapper.innerHTML = uiMarkup;
  appendTo.appendChild(uiWrapper);
  return {
    el: uiWrapper,
    destroy: () => uiWrapper.remove(),
  };
}

function init() {
  const selectors = {
    editor: {
      base: '.js-pega-editor',
      init: '.js-pega-editor--init',
    },
    trigger: '.js-pega-editor__trigger',
    space: '.js-pega-editor__space',
    config: '.js-pega-editor__config',
  };

  const EDITOR_STATES = {
    NOT_READY: 'NOT_READY',
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
  };

  const pegaEditors = query(selectors.editor.base)
    // ensure we don't try to init an editor that is already init-ed
    .filter(
      ed => !ed.classList.contains(selectors.editor.init.replace('.', '')),
    );

  if (pegaEditors.length === 0) {
    return;
  }

  pegaEditors.forEach(pegaEditor => {
    let editorState = EDITOR_STATES.NOT_READY;
    const [trigger] = query(selectors.trigger, pegaEditor);

    if (!trigger) {
      console.error(
        `Pega editor found no "trigger" selector "${selectors.trigger}"`,
        { pegaEditor },
      );
      return;
    }

    const [space] = query(selectors.space, pegaEditor);

    if (!space) {
      console.error(
        `Pega editor found no "space" selector "${selectors.space}"`,
        { pegaEditor },
      );
      return;
    }

    const [configEl] = query(selectors.config, pegaEditor);

    if (!configEl) {
      console.error(
        `Pega editor found no "config" selector "${selectors.config}"`,
        { pegaEditor },
      );
      return;
    }

    let userConfig;
    try {
      userConfig = JSON.parse(configEl.innerHTML);
    } catch (err) {
      console.error('Error parsing user config from this tag', configEl);
      return;
    }

    /** @type {BoltEditorConfig} */
    const config = Object.assign({}, defaultConfig, userConfig);

    if (!config.styles || config.styles.length === 0) {
      console.error('Bolt Editor Config requires "styles" an array of paths to CSS files. Current config is: ', config);
      return;
    }

    if (!config.scripts || config.scripts.length === 0) {
      console.error('Bolt Editor Config requires "scripts" an array of paths to JS files. Current config is: ', config);
      return;
    }

    /** @type {import('grapesjs').Editor} */
    let editor;

    /**
     * @type {{ el: HTMLElement, destroy: function(): void }}
     * @see createEditorUiHtml
     * */
    let uiWrapper;

    function cleanup() {
      if (editor) {
        editor.destroy();
      }
      if (uiWrapper) {
        uiWrapper.destroy();
      }
    }

    trigger.addEventListener('click', async () => {
      // eslint-disable-next-line default-case
      switch (editorState) {
        case EDITOR_STATES.NOT_READY: {
          break;
        }
        case EDITOR_STATES.CLOSED: {
          console.log('editor launching...');
          const { enableEditor } = await import(
            /* webpackChunkName: "pega-editor" */ './editor'
          );

          uiWrapper = createEditorUiHtml();

          // eslint-disable-next-line no-unused-vars
          editor = enableEditor({ space, uiWrapper: uiWrapper.el, config });
          trigger.innerText = 'Save & Close';
          editorState = EDITOR_STATES.OPEN;
          break;
        }
        case EDITOR_STATES.OPEN: {
          const html = editor.getHtml();
          const unsavedChanges = editor.getDirtyCount();
          if (unsavedChanges) {
            console.log(
              'There were unsaved changes we will lose on next page reload...',
            );
          }
          console.log({ html });
          const container = editor.getContainer();
          cleanup();
          container.innerHTML = html;
          trigger.innerText = 'Edit';
          editorState = EDITOR_STATES.CLOSED;
          break;
        }
      }
    });

    pegaEditor.classList.add(selectors.editor.init.replace('.', ''));
    editorState = EDITOR_STATES.CLOSED;
  });

  // uncomment to have first editor open on page load for easier dev experience
  // document.querySelector('.js-pega-editor__trigger').click();
}

//
// function isRegistered(elName) {
//   // return document.createElement(elName).constructor !== window.HTMLElement;
//   return !!window.customElements.get(elName);
// };
//
// const boltComponents = [
//   'action-blocks',
//   'background',
//   'background-shapes',
//   'band',
//   'block-list',
//   'blockquote',
//   'breadcrumb',
//   'button',
//   'button-group',
//   'card',
//   'chip',
//   'chip-list',
//   'code-snippet',
//   'copy-to-clipboard',
//   'critical-css-vars',
//   'critical-fonts',
//   'device-viewer',
//   'figure',
//   'form',
//   'grid',
//   'headline',
//   'icon',
//   'icons',
//   'image',
//   'link',
//   'list',
//   'logo',
//   'nav-indicator',
//   'nav-priority',
//   'navbar',
//   'navlink',
//   'ordered-list',
//   'pagination',
//   'share',
//   'site',
//   'smooth-scroll',
//   'sticky',
//   'teaser',
//   'text',
//   'tooltip',
//   'unordered-list',
//   'video',
// ];
//
// const registeredComponents = boltComponents.map(componentName => ({
//   name: componentName,
//   registered: isRegistered(componentName),
// }));
//
// console.log('Registered Components');
// console.table(registeredComponents.filter(component => component.registered));
//
// console.log('Not Registered Components');
// console.table(registeredComponents.filter(component => !component.registered));

init();
