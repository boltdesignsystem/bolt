import { query } from '@bolt/core/utils';
import { version } from 'grapesjs/package.json';
import { detect } from 'detect-browser';

const defaultConfig = {};

/**
 * @param {HTMLElement} [appendTo] - HTMLElement to append to
 * @returns {{ el: HTMLElement, destroy: function(): void }} cleanup function to remove HTML
 */
function createEditorUiHtml(appendTo = document.body) {
  const uiMarkup = `
    <div class="pega-editor-ui__buttons"></div>
    <div class="pega-editor-ui__slots">
      <div class="pega-editor-ui__slot pega-editor-ui__slot--blocks"></div>
      <div class="pega-editor-ui__slot pega-editor-ui__slot--layers">
        <h5>Layers</h5>
      </div>
      <div class="pega-editor-ui__slot pega-editor-ui__slot--selected">
        <h5>Selected</h5>
        <div class="pega-editor-ui__slot-controls"></div>
        <div class="pega-editor-ui__traits"></div>
        <div class="pega-editor-ui__component-meta"></div>
      </div>
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

/**
 * @return {Promise<void>}
 */
function addGrapesCssToPage() {
  return new Promise((resolve, reject) => {
    const href = `//unpkg.com/grapesjs@${version}/dist/css/grapes.min.css`;
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
    } else {
      const link = document.createElement('link');
      link.href = href;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen';
      link.addEventListener('load', () => resolve(), { once: true });
      document.head.appendChild(link);
    }
  });
}

/**
 * Example function for how to save editor results
 * Assign a function like this to `window.__handleEditorSave` to override this example one.
 * @param {Object} opt
 * @param {string} opt.html - The HTML from the saved editor
 * @param {string} opt.id
 * @return {Promise<{ ok: boolean, message: string }>}
 */
function exampleHandleEditorSave({ html, id }) {
  const shouldThisFailToDemo = false;

  //TODO:  Drupal Axios code likely here
  return new Promise((resolve, reject) => {
    // faking async delay
    setTimeout(() => {
      if (shouldThisFailToDemo) {
        console.log('exampleHandleEditorSave failed');
        resolve({
          ok: false,
          message: 'This is a demonstration of how to fail the save',
        });
      } else {
        console.log('exampleHandleEditorSave ok!');
        resolve({
          ok: true,
          message: 'Saved ok!',
        });
      }
    }, 2000);
  });
}

function addJsToPage(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
    } else {
      const scriptEl = document.createElement('script');
      scriptEl.src = src;
      scriptEl.type = 'text/javascript';
      scriptEl.async = true;
      scriptEl.addEventListener('load', () => resolve(), { once: true });
      document.head.appendChild(scriptEl);
    }
  });
}

function init() {
  const selectors = {
    editor: {
      base: '.js-pega-editor',
      init: '.js-pega-editor--init',
    },
    trigger: '.js-pega-editor__trigger',
    feedback: '.js-pega-editor__feedback',
    space: '.js-pega-editor__space',
    config: '.js-pega-editor__config',
  };

  const EDITOR_STATES = {
    NOT_READY: 'NOT_READY',
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
  };

  /** @type {HTMLElement[]} */
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

    pegaEditor.addEventListener('editor:save', event => {
      console.debug('event heard: "editor:save"', event);
    });

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

    const [feedbackEl] = query(selectors.feedback, pegaEditor);

    let userConfig;
    try {
      userConfig = JSON.parse(configEl.innerHTML);
    } catch (err) {
      console.error('Error parsing user config from this tag', configEl);
      return;
    }

    /** @type {import('grapesjs').BoltEditorConfig} */
    const config = Object.assign({}, defaultConfig, userConfig);

    if (!config.styles || config.styles.length === 0) {
      console.error(
        'Bolt Editor Config requires "styles" an array of paths to CSS files. Current config is: ',
        config,
        pegaEditor,
      );
      return;
    }

    if (!config.scripts || config.scripts.length === 0) {
      console.error(
        'Bolt Editor Config requires "scripts" an array of paths to JS files. Current config is: ',
        config,
        pegaEditor,
      );
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
      space.style.width = '';
      space.style.height = '';
    }

    trigger.addEventListener('click', async () => {
      // eslint-disable-next-line default-case
      switch (editorState) {
        case EDITOR_STATES.NOT_READY: {
          console.log('not ready');
          break;
        }
        case EDITOR_STATES.CLOSED: {
          const { name: browserName } = detect();
          if (browserName !== 'chrome') {
            // eslint-disable-next-line no-alert
            window.alert('The Editor can only be used in Chrome, sorry.');
            return;
          }
          trigger.innerText = 'Loading...';
          await addGrapesCssToPage();
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
          const handleEditorSave =
            // @ts-ignore
            window.__handleEditorSave || exampleHandleEditorSave;
          const html = editor.getHtml();
          const unsavedChanges = editor.getDirtyCount();
          if (unsavedChanges) {
            console.warn(
              'There were unsaved changes we will lose on next page reload...',
            );
          }
          const container = editor.getContainer();

          trigger.innerText = 'Saving...';

          const { ok, message } = await handleEditorSave({
            html: container.innerHTML,
            id: config.id,
          });

          if (ok) {
            cleanup();
            container.innerHTML = html;
            trigger.innerText = 'Edit';
          } else {
            const msg = `Error: could not save editor: ${message}`;
            console.error(msg);
            // eslint-disable-next-line no-alert
            window.alert(msg);
          }
          break;
        }
      }
    });

    pegaEditor.classList.add(selectors.editor.init.replace('.', ''));
    editorState = EDITOR_STATES.CLOSED;

    if (feedbackEl) {
      window['onUsersnapLoad'] = api => {
        window['usersnapApi'] = api;
        api.init({
          button: null,
          fields: {
            email: {
              label: 'E-Mail',
              required: false,
            },
            comment: {
              required: false,
            },
            assignee: null,
            title: {
              required: true,
            },
            label: {
              required: false,
            },
          },
        });

        api.on('open', event => {
          const {
            name: browserName,
            os: browserOs,
            version: browserVersion,
          } = detect();
          let gitSha = 'unknown';
          if (
            window['bolt'] &&
            window['bolt'].meta &&
            window['bolt'].meta.gitSha
          ) {
            gitSha = window['bolt'].meta.gitSha;
          }

          let html;
          if (editorState === EDITOR_STATES.OPEN) {
            html = editor.getHtml();
          } else {
            html = space.innerHTML;
          }

          const metadata = `
URL: ${window.location.href}
Git SHA: ${gitSha}
Browser: ${browserName} ${browserVersion} ${browserOs}
Screen Width: ${window.screen.width}

HTML in Editor:

${html}`;

          event.api.setValue('customData', metadata);
        });

        api.on('error', event => {
          console.error('Usersnap error', event);
        });
      };
      addJsToPage(
        '//api.usersnap.com/load/3d381185-491e-443f-8c1f-969ff8117d84.js?onload=onUsersnapLoad',
      );
    }

    feedbackEl.addEventListener('click', async event => {
      window['usersnapApi'].open();
    });
  });

  // uncomment to have first editor open on page load for easier dev experience
  // document.querySelector('.js-pega-editor__trigger').click();
}

init();
