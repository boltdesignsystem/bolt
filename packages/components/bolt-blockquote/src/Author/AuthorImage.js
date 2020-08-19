import { html, ifDefined } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from '../blockquote.scss';

const cx = classNames.bind(styles);

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
