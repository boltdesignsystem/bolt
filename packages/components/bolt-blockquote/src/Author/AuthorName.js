import { html } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from '../blockquote.scss';

let cx = classNames.bind([styles]);

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
