import { css } from '@bolt/core/utils';
import { html } from '@bolt/core/renderers/renderer-lit-html';

export const AccordionItemTrigger = (children, props, context) => {
  const triggerClasses = css('c-bolt-accordion-item__trigger');

  const spacingClasses = css(
    context.spacing ? `c-bolt-accordion-spacing--${context.spacing}` : '',
  );

  const triggerTemplate = children => {
    return html`
      ${props.open
        ? html`
            <div class="${triggerClasses}" data-open>
              ${children}
            </div>
          `
        : html`
            <div class="${triggerClasses}">${children}</div>
          `}
    `;
  };

  const innerTriggerTemplate = children => {
    return html`
      <button class="c-bolt-accordion-item__trigger-button ${spacingClasses}">
        <div class="c-bolt-accordion-item__trigger-content">
          ${children}
        </div>
        <span class="c-bolt-accordion-item__trigger-icons">
          <div class="c-bolt-accordion-item__trigger-icons-inner">
            <bolt-icon name="chevron-down"></bolt-icon>
          </div>
        </span>
      </button>
    `;
  };

  const innerTrigger = innerTriggerTemplate(children);

  return triggerTemplate(innerTrigger);
};
