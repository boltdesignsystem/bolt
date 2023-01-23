import { useState, useEffect, useReducer } from 'react';
import Pagination from '../Pagination';
import { useInterval, useAsyncError } from '../utilities';
import NotificationsList from './NotificationsList';
import NotificationsHeader from './NotificationsHeader';
import NotificationsFooter from './NotificationsFooter';
import Counter from './Counter';
import stateReducer from './reducer';
import supportedLocales from './locales';

const initialState = { feed: [], settings: {} };

const getLocalData = () => {
  const localData = localStorage.getItem('notificationsData');
  if (localData !== null) {
    return JSON.parse(localData);
  }
};

const shouldUpdate = localData => {
  if (!localData) return;

  const { lastUpdated, refreshInterval } = localData.settings;

  if (lastUpdated && refreshInterval) {
    const currentTime = Date.now();
    return currentTime >= lastUpdated + refreshInterval;
  } else {
    return true;
  }
};

const Notifications = ({
  isToolbar,
  refreshOnInit,
  ssoFrameUrl,
  refreshTimeLimit,
  pageUrl,
  settingsUrl,
  apiBaseUrl,
  translate,
}) => {
  // console.log(stateReducer);
  const [state, dispatchState] = useReducer(stateReducer, initialState);
  const [onlyShowUnread, setOnlyShowUnread] = useState(false);
  const [crsfToken, setCrsfToken] = useState(null);
  const [firstUpdated, setFirstUpdated] = useState(null);
  const [hasExceededTimeLimit, setHasExceededTimeLimit] = useState(null);
  const [locale, setLocale] = useState(null);
  const throwError = useAsyncError();

  let fetchRetryCount = 0;

  const loadSsoFrame = async url => {
    return new Promise((resolve, reject) => {
      if (url) {
        const iframe = document.createElement('iframe');
        iframe.hidden = true;
        iframe.src = url;
        iframe.addEventListener('load', e => {
          resolve(e);
        });
        iframe.addEventListener('error', e => {
          reject(e);
        });
        document.body.append(iframe);
      } else {
        reject(throwError(new Error('No url provided for SSO Iframe')));
      }
    });
  };

  const getCsrfToken = async () => {
    const res = await fetch(`${apiBaseUrl}/session/token`, {
      credentials: 'include',
      cache: 'no-cache',
    });

    if (res.ok) {
      const tokenText = await res.text();
      return tokenText;
    } else {
      // Don't throw an error
      console.warn('There was an issue getting CSRF token');
    }
  };

  // Fetch data from API and dispatch state
  const getFeedData = async () => {
    const params = isToolbar ? '?count=20' : '';
    const response = await fetch(`${apiBaseUrl}/activity-feed${params}`, {
      credentials: 'include',
      cache: 'no-cache',
    })
      .then(res => res)
      .catch(err => err);

    if (response.ok) {
      const { data } = await response.json();

      if (data) {
        dispatchState({ type: 'GET_DATA', val: data });
      }
    } else {
      if (response.status === 403) {
        // Prevent infinite loop if for some reason iframe loads but API still returns 403
        if (fetchRetryCount < 3) {
          fetchRetryCount++;
          await loadSsoFrame(ssoFrameUrl);
          await getFeedData();
        } else {
          throwError(new Error(response.statusText));
        }
      } else {
        throwError(new Error(response.statusText));
      }
    }
  };

  // Lazyload only the date-dns locale we need based on the `lang` attr
  const loadDateLocale = () => {
    const importLocaleFile = async locale => {
      const localeToSet = await import(
        /* webpackMode: "lazy", webpackChunkName: "notification-feed-date-fns-[index]" */
        `date-fns/locale/${locale}/index.js`
      );

      setLocale(localeToSet.default);
    };

    const { lang } = document.documentElement;
    const localeCode = supportedLocales.includes(lang) ? lang : 'en-US';

    importLocaleFile(localeCode);
  };

  // Runs once on initial render
  useEffect(() => {
    // Passing an async function to useEffect is anti-pattern, use self-executing async function inside
    (async () => {
      const localData = getLocalData();

      // Has local storage?
      if (localData) {
        // Is the current time greater than the last updated time plus the interval
        if (shouldUpdate(localData)) {
          // Call feed api, update local storage, wait for interval to pass (repeat)
          await getFeedData();
        } else {
          // Refresh on init?
          if (refreshOnInit) {
            await getFeedData();
          } else {
            dispatchState({ type: 'GET_DATA', val: localData });
          }
        }
      } else {
        // Call feed api, update local storage, wait for interval to pass (repeat)
        await getFeedData();
      }

      if (!crsfToken) {
        const token = await getCsrfToken();
        setCrsfToken(token);
      }

      setFirstUpdated(Date.now());
    })();

    loadDateLocale();
  }, []);

  // Runs after every state change
  useEffect(() => {
    // API was called, then state updated, finally update local storage
    localStorage.setItem('notificationsData', JSON.stringify(state));
  }, [state]);

  // IMPORTANT! If refresh interval is not defined, it must fallback to `null`. Otherwise, setInterval starts with no delay and runs indefinitely. If `null`, setInterval is never called.
  const interval = state.settings.refreshInterval || null;

  useInterval(() => {
    if (hasExceededTimeLimit || !refreshTimeLimit) return;

    const hasExceeded = Date.now() > firstUpdated + refreshTimeLimit;

    if (hasExceeded) {
      setHasExceededTimeLimit(true);
    } else {
      (async () => {
        await getFeedData();
      })();
    }
  }, interval);

  // Check for unread items
  const hasUnreadItem =
    state.feed.find(item => item.read === false) !== undefined;

  // Filter out unread messages
  const filteredItems = state.feed.filter(item => {
    const { read } = item;
    if (!onlyShowUnread || (onlyShowUnread && !read)) {
      return item;
    }
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const PaginatedItems = ({ items, itemsPerPage, currentPage }) => {
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const handlePageChange = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
    };

    return (
      <>
        {currentItems && (
          <NotificationsList
            items={currentItems}
            dispatchState={dispatchState}
            token={crsfToken}
            locale={locale}
            apiBaseUrl={apiBaseUrl}
            translate={translate}
          />
        )}
        {items.length > itemsPerPage && (
          <div className="c-bolt-notifications__footer">
            <Pagination
              onPageChange={handlePageChange}
              pageCount={pageCount}
              initialPage={currentPage}
              translate={translate}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="c-bolt-notifications">
      <NotificationsHeader
        hasUnreadItem={hasUnreadItem}
        onlyShowUnread={onlyShowUnread}
        dispatchState={dispatchState}
        token={crsfToken}
        setOnlyShowUnread={setOnlyShowUnread}
        settingsUrl={settingsUrl}
        apiBaseUrl={apiBaseUrl}
        translate={translate}
      />
      {isToolbar ? (
        <>
          <NotificationsList
            items={filteredItems}
            dispatchState={dispatchState}
            token={crsfToken}
            locale={locale}
            apiBaseUrl={apiBaseUrl}
            translate={translate}
          />
          <Counter hasUnreadItem={hasUnreadItem} />
          <NotificationsFooter
            hasExceededTimeLimit={hasExceededTimeLimit}
            pageUrl={pageUrl}
            translate={translate}
          />
        </>
      ) : (
        <PaginatedItems
          items={filteredItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Notifications;
