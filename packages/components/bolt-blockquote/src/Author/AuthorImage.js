import { html } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames/bind';
import styles from '../blockquote.scss';

const cx = classNames.bind(styles);

export const AuthorImage = (elem) => {
  const { props, slots } = elem;
  if (slots['author-image'] || props.authorImage) {
    return html`
      <div class="${cx('c-bolt-blockquote__image')}">
        ${slots['author-image']
          ? html` ${elem.slot('author-image')} `
          : html`
              <img
                src="${props.authorImage}"
                alt=${ifDefined(props.authorTitle)}
              />
            `}
      </div>
    `;
  }
};
