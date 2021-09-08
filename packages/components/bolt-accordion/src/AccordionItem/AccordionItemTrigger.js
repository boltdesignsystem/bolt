import { html } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './accordion-item.scss';

let cx = classNames.bind(styles);

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
          <svg
            class="e-bolt-icon"
            aria-hidden="true"
            enable-background="new 0 0 32 32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="m28.5 11.8c.7-.7.7-1.9 0-2.6s-1.9-.7-2.6 0l-9.9 9.8-9.8-9.9c-.7-.7-1.9-.7-2.6 0-.4.4-.6.9-.6 1.3 0 .5.2 1 .6 1.3l11.1 11.1c.7.7 1.9.7 2.6 0z"
              fill="#151619"
              fill-rule="evenodd"
            />
          </svg>
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
