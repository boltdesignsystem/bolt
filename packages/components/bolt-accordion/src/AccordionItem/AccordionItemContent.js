import { html } from '@bolt/element';
import classNames from 'classnames/bind';
import accordionItemStyles from './accordion-item.scss';

let cx = classNames.bind(accordionItemStyles);

export const AccordionItemContent = (children, self) => {
  const contentInnerClasses = cx('c-bolt-accordion-item__content-inner', {
    [`c-bolt-accordion-spacing--${self.contentSpacing || self.spacing}`]:
      self.contentSpacing || self.spacing,
    'c-bolt-accordion-item__content-inner--offset': !self.contentSpacing,
  });

  const contentTemplate = children => {
    return html`
      <div class="${cx('c-bolt-accordion-item__content')}">
        <div class="${contentInnerClasses}">
          ${children}
        </div>
      </div>
    `;
  };

  return contentTemplate(children);
};
