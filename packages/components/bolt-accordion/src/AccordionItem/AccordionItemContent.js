import { css } from '@bolt/core/utils';
import { html } from '@bolt/core/renderers/renderer-lit-html';

export const AccordionItemContent = (children, props, context) => {
  const spacingClasses = css(
    context.spacing ? `c-bolt-accordion-item--spacing-${context.spacing}` : '',
  );

  const contentTemplate = children => {
    return html`
      <div class="c-bolt-accordion-item__content">
        <div class="c-bolt-accordion-item__content-inner ${spacingClasses}">
          ${children}
        </div>
      </div>
    `;
  };

  return contentTemplate(children);
};
