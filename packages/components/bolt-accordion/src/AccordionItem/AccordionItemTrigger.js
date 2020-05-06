import { html } from '@bolt/element';
import classNames from 'classnames/bind';
import accordionItemStyles from './accordion-item.scss';

let cx = classNames.bind(accordionItemStyles);

export const AccordionItemTrigger = (children, self) => {
  const triggerClasses = cx('c-bolt-accordion-item__trigger');

  const labelClasses = cx('c-bolt-accordion-item__trigger-label', {
    [`c-bolt-accordion-item__trigger-label--inactive`]: self.inactive,
    [`c-bolt-accordion-spacing--${self.triggerSpacing || self.spacing}`]:
      self.triggerSpacing || self.spacing,
  });

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
    return self.inactive
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
      ${self.open
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
