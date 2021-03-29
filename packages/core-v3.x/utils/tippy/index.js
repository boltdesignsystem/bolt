import tippy from 'tippy.js';
import { queryShadowRoot } from '../query-shadow-root';
import { isFocusable, isHidden } from '../is-focusable';

export { tippy };

// Note: if `hideOnEsc` or `handleFocus` fail, they fail silently
export const hideOnEsc = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide, reference, ...rest }) {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        hide();
      }
    }
    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};

export const handleFocus = {
  name: 'handleFocus',
  defaultValue: true,
  fn({ popper, reference, props, ...rest }) {
    const trap = popper.querySelector('focus-trap');
    const { firstFocusableElement } = inspectNodeTypes([popper]);

    async function onKeyDown(event) {
      // tab keycode
      if (event.keyCode === 9) {
        event.preventDefault();

        // Wait or re-render will cause target element to lose focus
        await trap.updateComplete;
        trap.focusFirstElement();

        document.removeEventListener('keydown', onKeyDown);
      }
    }
    return {
      onShow() {
        if (firstFocusableElement && trap) {
          trap.active = true; // Activate ASAP so that `trap.focusFirstElement()` can be called immediately on 'keydown'
          document.addEventListener('keydown', onKeyDown);
        }
      },
      onHide() {
        trap.active = false;
        document.removeEventListener('keydown', onKeyDown);
        if (popper.contains(document.activeElement)) {
          // if reference is `bolt-` custom element `focus()` does not appear to work. Must drill down to first focusable element.
          getFocusableElement(reference).focus();
        }
      },
    };
    // }
  },
};

// Note: in future implementation, where user manually selects Tippy trigger/content much of this DOM inspection will be unneccessary
export const inspectNodeTypes = nodes => {
  if (!nodes.length) return;

  const focusableElements = [
    'bolt-link',
    'bolt-button',
    'bolt-trigger',
    'bolt-menu-item',
  ];
  const allowedInlineElements = [
    'abbr',
    'acronym',
    'b',
    'cite',
    'em',
    'i',
    'strong',
    'sub',
    'sup',
    'time',
  ];
  let hasText, hasAllowedContent, hasDisallowedContent, firstFocusableElement;

  const traverse = e => {
    if (e.nodeType === 3) {
      // Text node
      hasText = true;
    } else if (e.nodeType === 1) {
      // Element node
      // Will be used to set dotted underline style in tooltip
      if (allowedInlineElements.includes(e.nodeName.toLowerCase())) {
        hasAllowedContent = true;
      } else {
        hasDisallowedContent = true;
      }

      // Is node focusable
      if (
        // Covers native elements and those with tabindex set
        isFocusable(e) ||
        // Covers custom elements which delegate focus
        focusableElements.includes(e.nodeName.toLowerCase())
      ) {
        if (!firstFocusableElement) {
          firstFocusableElement = e;
        }
      }
    }

    if (e.children) {
      Array.from(e.children).forEach(e => {
        traverse(e);
      });
    }
  };

  nodes.forEach(e => {
    // Traverse through nodes, detirmine types, and set variables accordingly
    traverse(e);
  });

  return {
    hasText,
    hasAllowedContent,
    hasDisallowedContent,
    firstFocusableElement,
  };
};

export const getFocusableElement = node => {
  if (node.tagName.toLowerCase().includes('bolt-') && node.renderRoot) {
    return queryShadowRoot(node.renderRoot, isHidden, isFocusable)[0] || node;
  } else {
    return node;
  }
};
