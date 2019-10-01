import { css } from '@bolt/core/utils';
import { html } from '@bolt/core/renderers/renderer-lit-html';

export const AccordionItemTrigger = (children, props, context) => {
  const triggerClasses = css('c-bolt-accordion-item__trigger');

  const labelClasses = css(
    'c-bolt-accordion-item__trigger-label',
    props.inactive ? `c-bolt-accordion-item__trigger-label--inactive` : '',
    context.spacing ? `c-bolt-accordion-spacing--${context.spacing}` : '',
  );

  const labelInner = children => {
    return html`
      <div class="c-bolt-accordion-item__trigger-content">
        ${children}
      </div>
      <span class="c-bolt-accordion-item__trigger-icons">
        <div class="c-bolt-accordion-item__trigger-icons-inner">
          <bolt-icon name="chevron-down"></bolt-icon>
        </div>
      </span>
    `;
  };

  const innerTriggerTemplate = children => {
    return props.inactive
      ? html`
          <div class="${labelClasses}">${labelInner(children)}</div>
        `
      : html`
          <button type="button" class="${labelClasses}">
            ${labelInner(children)}
          </button>
        `;
  };

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

  const innerTrigger = innerTriggerTemplate(children);

  return triggerTemplate(innerTrigger);
};
