import React from 'react';
import { IconFaceHappy } from '../Icon';
import NotificationsItem from './NotificationsItem';
import NotificationsMessage from './NotificationsMessage';

const NotificationsList = ({
  items = [],
  dispatchState,
  token,
  locale,
  translate,
  apiBaseUrl,
}) => {
  if (items.length === 0) {
    return (
      <NotificationsMessage>
        <span className="u-bolt-margin-right-small">
          <IconFaceHappy size="medium" />{' '}
        </span>
        {translate('You are all caught up!')}
      </NotificationsMessage>
    );
  } else {
    return (
      <ul className="c-bolt-notifications__list js-bolt-notifications-list">
        <li className="c-bolt-notifications__list-item c-bolt-notifications__list-item--section-heading">
          <strong>{translate('Latest')}</strong>
        </li>
        {items.map(item => {
          const classes = ['c-bolt-notifications__list-item'];
          if (item.read) {
            classes.push('c-bolt-notifications__list-item--read');
          }

          return (
            <li className={classes.join(' ')} key={item.id}>
              <NotificationsItem
                id={item.id}
                messageType={item.messageType}
                siteName={item.siteName}
                timestamp={item.timestamp}
                read={item.read}
                messageAttributes={item.message.attributes}
                dispatchState={dispatchState}
                token={token}
                locale={locale}
                apiBaseUrl={apiBaseUrl}>
                {item.message.content}
              </NotificationsItem>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default NotificationsList;
