import TextLink from '../TextLink';

const NotificationsFooter = ({ hasExceededTimeLimit, pageUrl, translate }) => {
  return (
    <>
      {pageUrl && (
        <div className="c-bolt-notifications__footer">
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener"
            className="e-bolt-text-link e-bolt-text-link--reversed-underline e-bolt-text-link--expand-click-target">
            {translate('View all notifications')}
          </a>
          {hasExceededTimeLimit && (
            <bolt-banner className="u-bolt-margin-top-small">
              {translate('Updates have paused')}.{' '}
              <TextLink
                type="button"
                onClick={() => {
                  window.location.reload();
                }}>
                {translate('Refresh your feed')}
              </TextLink>
              .
            </bolt-banner>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationsFooter;
