const notificationElements = () => {
  // Container
  const container = document.createElement('div');
  container.setAttribute('id', 'notification-feed-toolbar-app');
  container.classList.add('c-bolt-page-header__nav-link__container');

  // Button
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('c-bolt-page-header__nav-link');
  button.innerHTML = `<span class="c-bolt-page-header__nav-link__content">
      <span class="c-bolt-page-header__nav-link__content__signifier">
        <svg  class="e-bolt-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
          <path fill="#151619" d="M29.7 24.8c-.4-.4-.8-.9-1.2-1.3s-.9-.8-1.3-1.2c0-.1-.1-.3-.1-.4v-3.3c-.1-.5-.1-1.1-.1-1.8V14.1c-.1-.9-.2-1.9-.4-2.8-.2-.8-.5-1.7-.9-2.5-.5-1-1.2-2-2.2-2.8-1.1-1-2.4-1.8-3.7-2.3-.5-.1-.6-.3-.6-.7-.1-.9-.6-1.9-1.3-2.4-1.3-1-3.1-.8-4.3.3-.6.6-.9 1.4-.9 2.4 0 .3-.1.4-.4.5-.5.1-1 .3-1.5.6-1.4.7-2.4 1.5-3.4 2.6-.8.9-1.4 1.8-1.8 3-.4.9-.6 2-.7 3 0 .8-.1 1.5-.1 2.3 0 .6.1 1.1.1 1.8v2.1c0 .5.1 1.1.1 1.8v.8c0 .3 0 .6-.3.9-.7.6-1.5 1.3-2.3 2.1-.6.5-.7 1.3-.5 2.1.3 1 1 1.5 2.1 1.5h9.3c.1.3.1.5.1.7 0 .6.2 1.1.5 1.7 1.1 1.8 3.7 1.5 4.9-.2.4-.7.3-1.4.4-2.1h9c.7 0 1.2-.2 1.8-.7.3-.9.3-2.5-.3-3z"/>
        </svg>
      </span>
      <span class="c-bolt-page-header__nav-link__content__text">Notifications</span>
    </span>`;

  // Popover
  const popover = document.createElement('div');
  popover.classList.add(
    'c-bolt-page-header__popover',
    'js-bolt-page-header-popover',
  );

  // Root
  const root = document.createElement('div');
  root.setAttribute('id', 'notification-feed-toolbar-root');

  return {
    container,
    button,
    popover,
    root,
  };
};

export default notificationElements;
