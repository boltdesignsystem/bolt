const IS_PROD = process.env.NODE_ENV === 'production';
const PUBLIC_PATH =
  // drupalSettings is used on Drupal sites
  window.drupalSettings?.pega_notification_feed?.js_base_path ||
  // pegaSettings is used on non-drupal sites
  window.pegaSettings?.pegaNotificationFeed?.jsBasePath;

if (IS_PROD && PUBLIC_PATH) {
  // @see https://webpack.js.org/guides/public-path/#on-the-fly
  __webpack_public_path__ = PUBLIC_PATH;
}
