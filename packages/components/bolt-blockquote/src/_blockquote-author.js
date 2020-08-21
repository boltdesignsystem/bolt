import { html, ifDefined } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './blockquote.scss';

let cx = classNames.bind([styles]);

export const AuthorImage = elem => {
  if (elem.slotMap.get('author-image') || elem.authorImage) {
    return html`
      <div class="${cx('c-bolt-blockquote__image')}">
        ${elem.slotMap.get('author-image')
          ? html`
              ${elem.slotify('author-image')}
            `
          : html`
              <img
                src="${elem.authorImage}"
                alt=${ifDefined(elem.authorTitle)}
              />
            `}
      </div>
    `;
  }
};

export const AuthorName = elem => {
  if (elem.slotMap.get('author-name') || elem.authorName) {
    return html`
      <cite class="c-bolt-blockquote__author-name">
        ${elem.slotMap.get('author-name')
          ? elem.slotify('author-name')
          : elem.authorName}
      </cite>
    `;
  }
};

export const AuthorTitle = elem => {
  if (elem.slotMap.get('author-title') || elem.authorTitle) {
    return html`
      <cite class="c-bolt-blockquote__author-title">
        ${elem.slotMap.get('author-title')
          ? elem.slotify('author-title')
          : elem.authorTitle}
      </cite>
    `;
  }
};
