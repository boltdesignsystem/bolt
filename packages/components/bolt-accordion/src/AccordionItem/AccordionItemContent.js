import { css } from '@bolt/core/utils';
import { html } from '@bolt/core/renderers/renderer-lit-html';

export const AccordionItemContent = (children, props, context) => {
  const spacingClasses = css(
    props.contentSpacing || context.spacing
      ? `c-bolt-accordion-spacing--${props.contentSpacing || context.spacing}`
      : '',
    !props.contentSpacing ? 'c-bolt-accordion-item__content-inner--offset' : '',
  );

  const contentInnerClasses = css(
    'c-bolt-accordion-item__content-inner',
    spacingClasses,
  );

  const contentTemplate = children => {
    return html`
      <div class="${css('c-bolt-accordion-item__content')}">
        <div class="${contentInnerClasses}">
          ${children}
        </div>
      </div>
    `;
  };

  return contentTemplate(children);
};
