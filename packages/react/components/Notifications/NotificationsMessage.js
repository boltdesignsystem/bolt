import React from 'react';

const NotificationsMessage = ({ children }) => {
  return (
    <div className="u-bolt-padding-top-large u-bolt-padding-right-medium u-bolt-padding-bottom-large u-bolt-padding-left-medium u-bolt-text-align-center">
      {children}
    </div>
  );
};

export default NotificationsMessage;
