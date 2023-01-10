import React from 'react';
import { formatDistance } from 'date-fns';
import {
  IconPegaTag,
  IconReply,
  IconCheck,
  IconPegaThumbsUp,
  IconPegaMention,
  IconInfoCircle,
  IconWarning,
  IconCalendar,
  IconCertification,
  IconPegaAnnounce,
} from '../Icon';
import { createSanitizedMarkup } from '../utilities';

const NotificationsItem = ({
  id,
  messageType,
  siteName,
  timestamp,
  read,
  messageAttributes,
  children,
  dispatchState,
  token,
  locale,
  apiBaseUrl,
}) => {
  const getIconByMessageType = type => {
    const iconOptions = {
      size: 'medium',
    };
    let messageIcon;

    switch (type) {
      case 'new_content':
        messageIcon = <IconPegaTag {...iconOptions} />;
        break;
      case 'new_reply':
        messageIcon = <IconReply {...iconOptions} />;
        break;
      case 'accepted':
        messageIcon = <IconCheck {...iconOptions} />;
        break;
      case 'approved':
        messageIcon = <IconCheck {...iconOptions} />;
        break;
      case 'liked':
        messageIcon = <IconPegaThumbsUp {...iconOptions} />;
        break;
      case 'mentioned':
        messageIcon = <IconPegaMention {...iconOptions} />;
        break;
      case 'info':
        messageIcon = <IconInfoCircle {...iconOptions} />;
        break;
      case 'new_mission_version':
        messageIcon = <IconWarning {...iconOptions} />;
        break;
      case 'warning':
        messageIcon = <IconWarning {...iconOptions} />;
        break;
      case 'event':
        messageIcon = <IconCalendar {...iconOptions} />;
        break;
      case 'badge':
        messageIcon = <IconCertification {...iconOptions} />;
        break;
      default:
        messageIcon = <IconPegaAnnounce {...iconOptions} />;
    }

    return messageIcon;
  };

  const itemClickHandler = e => {
    if (!read) {
      dispatchState({
        type: 'MARK_ITEM_AS_READ',
        val: { id, read: true, token, apiBaseUrl },
      });
    }
  };

  // Message classes and tagname
  const messageClasses = ['c-bolt-notifications__message'];
  let TagName = 'span';

  if (messageAttributes) {
    if (messageAttributes.href) {
      TagName = 'a';
    } else if (messageAttributes.type) {
      TagName = 'button';
    }
    if (messageAttributes.class) {
      const classesArray = messageAttributes.class.split(' ');
      messageClasses.push(...classesArray);
      delete messageAttributes.class;
    }
  }

  // Message date
  let formattedDate;

  if (locale) {
    const messageDate = new Date(timestamp * 1000);
    const formattedDateDistance = formatDistance(messageDate, new Date(), {
      locale,
      addSuffix: true,
    });

    formattedDate =
      messageDate.getTime() > 0 ? ` ${formattedDateDistance} ` : '';
  }

  return (
    <>
      <div className="c-bolt-notifications__signifier">
        {getIconByMessageType(messageType)}
      </div>
      <div className="c-bolt-notifications__content">
        <div className="c-bolt-notifications__eyebrow">{siteName}</div>
        <div className="c-bolt-notifications__timestamp">{formattedDate}</div>
        <TagName
          {...messageAttributes}
          className={messageClasses.join(' ')}
          onClick={itemClickHandler}
          dangerouslySetInnerHTML={createSanitizedMarkup(children)}></TagName>
      </div>
    </>
  );
};

export default NotificationsItem;
