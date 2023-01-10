import { createPortal } from 'react-dom';

const Counter = ({ hasUnreadItem }) => {
  const selector =
    '#notification-feed-toolbar-app .c-bolt-page-header__nav-link__content';
  const target = document.querySelector(selector);

  if (target) {
    return (
      <>
        {createPortal(
          <>
            {hasUnreadItem && (
              <span className="c-bolt-page-header__counter"></span>
            )}
          </>,
          target,
        )}
      </>
    );
  } else {
    console.warn(`Selector '${selector}' not found`);
  }
};

export default Counter;
