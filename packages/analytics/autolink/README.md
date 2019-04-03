# Bolt Autolink

Helper library to automatically applies GA [autolink](https://developers.google.com/analytics/devguides/collection/analyticsjs/linker) click tracking query strings to Bolt components that point to external domains.


## Install
```bash
npm install @bolt/analytics-autolink
```

## Usage

### Step 1. Pull in the JS bundle into your local front-end build.

- Via Bolt's `.boltrc.js` config:
```javascript
module.exports = {
  components: {
    global: [
      '@bolt/analytics-autolink',
      //...
    ]
  }
}
```

- Or for existing build processes (ex. Webpack), simply import the main JS bundle:
```javascript
// ex. main.js
import '@bolt/analytics-autolink';
//
```

### 2. Config GA + Autolink

For example, a typical GA config might look similar to this:

```html
<head>
  <script src="https://www.google-analytics.com/analytics.js" async></script>

  <script>
    // replace with your own GA tracking #
    const TRACKING_ID = 'UA-123456789-0'; 

    // prep GA data if it doesn't yet exist
    window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

    ga('create', TRACKING_ID, 'auto', { allowLinker: true });
    ga('send', 'pageview');
    ga('set', 'transport', 'beacon');
    ga('require', 'linker');

    // See Step 3 below on configuring which domains to track
    // window.bolt = window.bolt || {};
    // window.bolt.analytics = window.bolt.analytics || {};
    // window.bolt.analytics.autolink = window.bolt.analytics.autolink || {
    //   domains: ['google.com'] // domains to configure
    // };
    // ga('linker:autoLink', window.bolt.analytics.autolink.domains);
  </script>
```

### 3. Configure which domains to autolink

Option 1. Via a global Bolt config. For example:

```html
  <script>
    window.bolt = window.bolt || {};
    window.bolt.autolink = {
      domains: ['google.com'], // domains to track
    };

    // make sure GA's linker:autoLink points to the domains configured
    ga('linker:autoLink', window.bolt.autolink.domains);
  </script>
```

Option 2. This can also be configured via a Drupal config. For example:

```html
  <script>
    window.drupalSettings = {
      google_analytics: {
        trackCrossDomains: ['pega.com'], // domains to track
      },
    };

    // make sure GA's linker:autoLink points to the domains configured
    ga('linker:autoLink', window.drupalSettings.google_analytics.trackCrossDomains);
  </script>
```
