import { IconFaceSad } from '../Icon';
import NotificationsHeader from './NotificationsHeader';
import NotificationsFooter from './NotificationsFooter';
import NotificationsMessage from './NotificationsMessage';

const ErrorFallback = ({ isToolbar, apiBaseUrl, translate }) => {
  return (
    <div className="c-bolt-notifications">
      <NotificationsHeader apiBaseUrl={apiBaseUrl} translate={translate} />
      <NotificationsMessage>
        <span className="u-bolt-margin-right-small">
          <IconFaceSad size="medium" />
        </span>
        {translate('Something went wrong')}
      </NotificationsMessage>
      {isToolbar && <NotificationsFooter />}
    </div>
  );
};

export default ErrorFallback;
