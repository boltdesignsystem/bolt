const notificationss = document.querySelectorAll('.c-bolt-notifications');

if (notificationss.length) {
  import(/* webpackChunkName: 'bolt-notifications' */ './src/notifications').then(
    ({ BoltNotifications }) => {
      notificationss.forEach(el => {
        const notificationsComponent = new BoltNotifications(el);
      });
    },
  );
}
