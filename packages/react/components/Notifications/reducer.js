const reducer = (state, action) => {
  const { feed, settings } = state;
  const { type, val } = action;
  const { id, read, token, apiBaseUrl } = val;

  if (val && val.settings) {
    // Update `lastUpdated` on any state change
    val.settings.lastUpdated = Date.now();
  }

  switch (type) {
    case 'GET_DATA':
      if (val) {
        return val;
      }

      console.warn(`No value provided in ${type}`);
      return state;

    case 'MARK_ITEM_AS_READ':
      if (id) {
        fetch(`${apiBaseUrl}/mark-read`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token,
          },
          body: JSON.stringify({
            data: {
              notificationIds: [id],
            },
          }),
          credentials: 'include',
        });

        const itemIndex = feed.findIndex(item => item.id === id);
        return {
          settings,
          feed: feed.map((item, index) => {
            if (index === itemIndex) {
              return {
                ...item,
                read,
              };
            }
            return item;
          }),
        };
      }

      console.warn(`No id provided in ${type}`);
      return state;

    case 'MARK_ALL_AS_READ':
      const unreadIds = feed.reduce((arr, item) => {
        if (!item.read && item.id !== undefined) {
          arr.push(item.id);
        }
        return arr;
      }, []);

      fetch(`${apiBaseUrl}/mark-read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        body: JSON.stringify({
          data: {
            notificationIds: unreadIds,
          },
        }),
        credentials: 'include',
      });

      return {
        settings,
        feed: feed.map(item => {
          return {
            ...item,
            read: true,
          };
        }),
      };

    default:
      console.warn(`"${type}" is not a valid type`);
  }
};

export default reducer;
