import { render, stopServer } from '@bolt/testing-helpers';

const timeout = 15000;

jest.setTimeout(timeout);

const topSlotSelector =
  '.pega-editor-ui__slot-controls select#slot-select__top';
const refreshContentButtonSelector =
  '.gjs-pega-editor-panels-btn--refresh-content';

describe('GrapesJS Editor', () => {
  let page;
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();

    await page.goto('http://127.0.0.1:4444/', {
      timeout: 0,
    });

    // Ensure Editor is in viewport and clickable.
    page.setViewport({ height: 1000, width: 1000 });

    await page.evaluate(async => {
      window.pegaTestDelay = timeoutAmount => {
        return new Promise(resolve => {
          setTimeout(resolve, timeoutAmount);
        });
      };

      window.getEditorAndWrapper = () => {
        const editor = document
          .querySelector('iframe.gjs-frame')
          .contentWindow.getEditor();
        const wrapper = editor.getWrapper();
        return { editor, wrapper };
      };
    });
  }, timeout);

  afterAll(async () => {
    await stopServer();
    await page.close();
  }, timeout);

  const getCharHeightTest = (
    testName = '<bolt-two-character-layout> <bolt-character>s in active step have equal height',
  ) => {
    return test(testName, async () => {
      const characterAbsoluteHeightsJson = await page.evaluate(async () => {
        const { wrapper } = window.getEditorAndWrapper();
        const activeStep = wrapper
          .find('bolt-interactive-step')
          .filter(component => component.getEl()._isActiveStep)[0];

        const charHeights = [
          ...activeStep.getEl().querySelectorAll('bolt-character'),
        ].map(component => {
          return Math.round(component.getBoundingClientRect().top);
        });
        return JSON.stringify(charHeights);
      });
      const characterAbsoluteHeights = JSON.parse(characterAbsoluteHeightsJson);

      expect(characterAbsoluteHeights.length).toBe(2);
      expect(characterAbsoluteHeights[0]).toBe(characterAbsoluteHeights[1]);
    });
  };

  test('Editor is added to page and opens on click', async () => {
    const editor = await render('@bolt-components-editor/editor-in-pl.twig', {
      content:
        '<bolt-text id="pega-editor__sample-content">Hello World!</bolt-text>',
    });

    expect(editor.html).toContain('Edit');

    const editorIsOpen = await page.evaluate(async editorHTML => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = editorHTML;
      document.body.appendChild(wrapper);
      window.initPegaEditor();
      document.querySelector('.js-pega-editor__trigger').click();
      await window.pegaTestDelay(4000);
      return !!document.querySelector('.js-pega-editor__space');
    }, editor.html);

    expect(editorIsOpen).toBeTruthy();
  });

  test('Editor can add Two-Character Pathway Starter having 6 <bolt-two-character-layout>s', async () => {
    const twoCharCount = await page.evaluate(async () => {
      const { editor, wrapper } = window.getEditorAndWrapper();

      // Add two-character-pathway starter.
      wrapper
        .find('#pega-editor__sample-content')[0]
        .replaceWith(
          editor.BlockManager.get('Two-Character Pathway').attributes.content,
        );
      await window.pegaTestDelay(4000);

      return wrapper.find('bolt-two-character-layout').length;
    });
    expect(twoCharCount).toBe(6);
  });

  test('<bolt-interactive-pathway> has exactly one active <bolt-interactive-step>', async () => {
    const activeSteps = await page.evaluate(async () => {
      const { wrapper } = window.getEditorAndWrapper();

      return wrapper
        .find('bolt-interactive-step')
        .filter(component => component.getEl()._isActiveStep).length;
    });
    expect(activeSteps).toBe(1);
  });

  getCharHeightTest();

  test('Editor slot controls for <bolt-character> appear on select', async () => {
    const editorHasTopSlotControls = await page.evaluate(
      async topSlotSelector => {
        const { editor, wrapper } = window.getEditorAndWrapper();
        const character = wrapper.find('bolt-character')[0];
        editor.select(character);
        window.pegaTestDelay(1000);
        return !!document.querySelector(topSlotSelector);
      },
      topSlotSelector,
    );

    expect(editorHasTopSlotControls).toBeTruthy();
  });

  test('Editor can add <bolt-dialog-bar> to top slot of <bolt-character>', async () => {
    await page.evaluate(async topSlotSelector => {
      const topSlot = document.querySelector(topSlotSelector);
      topSlot.scrollIntoView();
    }, topSlotSelector);

    await page.select(topSlotSelector, 'bolt-status-dialogue-bar--alert');
    await page.waitFor(1000);
    await page.click(refreshContentButtonSelector);
    await page.waitFor(3000);

    const charHasDialogInSlot = await page.evaluate(async () => {
      const { wrapper } = window.getEditorAndWrapper();
      const character = wrapper.find('bolt-character')[0];
      return !!character.find('[slot="top"] bolt-status-dialogue-bar');
    });
    expect(charHasDialogInSlot).toBeTruthy();
  });

  getCharHeightTest(
    '<bolt-two-character-layout> <bolt-character>s in active step have equal height after slot add',
  );
});
