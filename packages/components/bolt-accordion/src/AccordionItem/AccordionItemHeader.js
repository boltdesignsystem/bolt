import { css } from '@bolt/core/utils';
import { html } from '@bolt/core/renderers/renderer-lit-html';

export const AccordionItemHeader = (children, props, context) => {
  const headerClasses = css(
    'c-bolt-accordion-item__trigger',
    props.center ? 'c-bolt-accordion-item__trigger--center' : '',
  );

  const spacingClasses = css(
    context.spacing ? `c-bolt-accordion-spacing--${context.spacing}` : '',
  );

  const headerTemplate = children => {
    return html`
      ${props.autoOpen
        ? html`
            <div class="${headerClasses}" data-open>
              ${children}
            </div>
          `
        : html`
            <div class="${headerClasses}">${children}</div>
          `}
    `;
  };

  const innerHeaderTemplate = children => {
    return html`
      <button class="c-bolt-accordion-item__trigger-button ${spacingClasses}">
        <div class="c-bolt-accordion-item__trigger-content">
          ${children}
        </div>
        <span class="c-bolt-accordion-item__trigger-icons">
          <div class="c-bolt-accordion-item__trigger-icons-inner">
            <span
              class="c-bolt-accordion-item__trigger-icon c-bolt-accordion-item__trigger-icon--open"
            >
              <bolt-icon name="chevron-down"></bolt-icon>
            </span>

            <span
              class="c-bolt-accordion-item__trigger-icon c-bolt-accordion-item__trigger-icon--close"
            >
              <bolt-icon name="chevron-up"></bolt-icon>
            </span>
          </div>
        </span>
      </button>
    `;
  };

  const innerHeader = innerHeaderTemplate(children);

  return headerTemplate(innerHeader);
};
