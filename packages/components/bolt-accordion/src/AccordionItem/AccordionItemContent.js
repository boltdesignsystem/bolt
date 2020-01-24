import { css } from '@bolt/core-v3.x/utils';
import { html } from '@bolt/core-v3.x/renderers/renderer-lit-html';

export const AccordionItemContent = (children, props, context) => {
  const contentInnerClasses = css(
    'c-bolt-accordion-item__content-inner',
    props.contentSpacing || context.spacing
      ? `c-bolt-accordion-spacing--${props.contentSpacing || context.spacing}`
      : '',
    !props.contentSpacing ? 'c-bolt-accordion-item__content-inner--offset' : '',
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
