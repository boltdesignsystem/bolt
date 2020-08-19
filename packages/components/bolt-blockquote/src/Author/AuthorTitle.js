import { html } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from '../blockquote.scss';

let cx = classNames.bind([styles]);

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
