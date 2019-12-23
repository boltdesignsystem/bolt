import { html } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import textStyles from '@bolt/components-text/index.scss';
import styles from '../blockquote.scss';

let cx = classNames.bind([styles, textStyles]);

export const AuthorTitle = elem => {
  const { props, slots } = elem;

  // @todo: Temporary workaround until we can use `bolt-text`
  const textClasses = cx(
    'c-bolt-text-v2',
    'c-bolt-text-v2--block',
    'c-bolt-text-v2--body',
    'c-bolt-text-v2--font-size-xsmall',
    'c-bolt-text-v2--font-weight-regular',
    'c-bolt-text-v2--font-style-regular',
    'c-bolt-text-v2--color-theme-headline',
    'c-bolt-text-v2--letter-spacing-regular',
    'c-bolt-text-v2--align-inherit',
    'c-bolt-text-v2--text-transform-regular',
    'c-bolt-text-v2--line-height-regular',
    'c-bolt-text-v2--opacity-100',
  );

  if (slots['author-title'] || props.authorTitle) {
    return html`
      <cite class="${textClasses}">
        ${elem.slots['author-title']
          ? elem.slot('author-title')
          : props.authorTitle}
      </cite>
    `;
  }
};
