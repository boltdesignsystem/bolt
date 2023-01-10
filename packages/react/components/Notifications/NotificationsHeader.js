import React from 'react';
import SwitchButton from '../SwitchButton';
import { IconCheckCircle, IconPegaSetting } from '../Icon';

const NotificationsHeader = ({
  hasUnreadItem,
  onlyShowUnread,
  setOnlyShowUnread,
  dispatchState,
  token,
  apiBaseUrl,
  settingsUrl,
  translate,
}) => {
  const markAllAsReadClasses = ['c-bolt-notifications__action-button'];

  if (!hasUnreadItem) {
    // Visually hiding instead of removing because removing causes Notification popover to close for some unknown reason.
    markAllAsReadClasses.push('u-bolt-visuallyhidden');
  }

  return (
    <div className="c-bolt-notifications__header">
      <div className="c-bolt-notifications__switch">
        {onlyShowUnread !== undefined && (
          <SwitchButton
            label={translate('Only show unread notifications')}
            on={onlyShowUnread}
            onClickHandler={e => {
              const isOn = e.target.getAttribute('aria-checked') === 'true';
              setOnlyShowUnread(!isOn);
            }}
            translate={translate}
          />
        )}
      </div>
      <div className="c-bolt-notifications__actions">
        <button
          type="button"
          className={markAllAsReadClasses.join(' ')}
          onClick={() => {
            dispatchState({
              type: 'MARK_ALL_AS_READ',
              val: { token, apiBaseUrl },
            });
          }}
          disabled={!hasUnreadItem}>
          {<IconCheckCircle size="medium" />}
          <span className="c-bolt-notifications__action-button-text">
            {translate('Mark all as read')}
          </span>
        </button>

        {settingsUrl && (
          <a
            href={settingsUrl}
            target="_blank"
            rel="noopener"
            className="c-bolt-notifications__action-button">
            {<IconPegaSetting size="medium" />}
            <span className="c-bolt-notifications__action-button-text">
              {translate('Notification Settings')}
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default NotificationsHeader;
