---
title: Server Side Rendering (SSR)
---

## Usage
This brand new SSR package currently provides three different interfaces to pre-render web components:

### Option 1. via the CLI (super helpful for testing). 

This Node.js CLI currently accepts two arguments:
    1. The string of HTML to pre-render
    2. Boolean to conditionally enable/disable syntax highlighting (which defaults to `true` when using the CLI directly, `false` when being used for PHP rendering)

```
$ node packages/servers/ssr-server/cli.js '<bolt-button color="secondary">SSR Test</bolt-button>'
```

This returns back the pre-rendered, hydration-friendly markup (with or without syntax highlighting)

![image](https://user-images.githubusercontent.com/1617209/54199749-1a682600-44a0-11e9-8692-178f81173c44.png)

### Option 2. via Twig filter / function
There’s also two ways to use this SSR functionality in Twig via the new `bolt_ssr` Twig filter and `bolt_ssr` Twig function. 

Both of these also use the Node.js CLI interface under the hood with the added bonus of returning back the original pre-rendered HTML as a fallback.
```
{% filter bolt_ssr %}
  <bolt-button color=“secondary”>
    SSR Test
  </bolt-button>
{% endfilter %}
```

### Option 3. via JS using the SSR library itself (experimental)

This SSR functionality can even be used in other JS files via the `renderToString` method on the `@bolt/ssr-server` package.

> Note: currently this method currently requires the developer to manually call the `shutDownSSRServer` method afterwards — hopefully something we can automate in the next iteration.



## Misc Notes

- The first couple of implementations of this were powered by a Google Puppeteer instance however this latest iteration managed to swap out Puppeteer for a lighter weight JSDOM implementation that’s been lightly polyfilled! 🎉
- SSR compile times are averaging around 1 to 1.3 seconds (when no Webpack build is required). Quick enough for a larger POC but not quick enough to globally roll this out without expensive compile times on the server   


## Gotchas / Next Steps

- **Auto-wire Components Waiting To Load**: we should figure out how we want to create a list of the custom element tags that need to be defined before the SSR logic kicks off: https://github.com/bolt-design-system/bolt/blob/cd72b43574e7d33810c80147edc8cb1613048a38/packages/servers/ssr-server/renderer.js#L42 
- **Cache Busting**: Further work needed to get cache busting added to the SSR build process
- **Async Rendering**: Look into parallelizing / making requests more async
- **Alt Interface for PHP Integtation?** We should look into using web sockets or even using a vanilla server request / response interface.
- **Caching**: making the same request to the same component with the same data on the same version of Bolt should pull straight from memory to speed up build times.
- **Compare SSR Perf**: Further research into performance optimizations -- including doing a benchmark between say, SSR for a Vue.js component compared to our current implementation
- **Test CKEditor Integration**: Test integrating CKEditor example content with this new SSR functionality
- **Combine Webpack Builds?** Look into (potentially) combining the client-side vs server-side webpack builds to eliminate having to compile some of the same components twice
- **Research Further Optimizing Client-side Perf**: Lighter weight JS load in the client = faster SSR response times
- **Combine Multiple Servers**: Out of simplicity, we currently have 3 different Express servers -- the default Express server, the testing server when running Jest tests, and now this new SSR server. At a minimum I could see two of these getting merged together into a single server instance (if not merging together all three)
- **Handle Pre-rendered HTML**: the current implementation doesn't know if the markup provided (or pieces of the markup provided) has been pre-rendered which could lead to unintended rendering quirks and/or extra unnecessary processing 
- **Fragment Cache?** If a button component was being pre-rendered but contained an already pre-rendered icon component, how might we handle that?


## Performance Impact

**Notes:**
1. This is based on the current implementation which will reuses the `bolt-global.server.js` if a Webpack build had already been done -- this speeds up the initial SSR request.
2. CLI benchmarks were are based on this `bolt-global.server.js` file already existing
3. The current implementation is synchronous -- only one request at a time and PHP waits for the request to complete before continuing.

<hr>

### CLI Performance (per compile):
- Without formatting HTML or syntax highlighting: 1.08s average (or 0.05s faster on average than with Prettier formatting)
- With highlighting + prettier: 1.23s average
- Without syntax highlighting, with HTML formatting: 1.13s average

### Pattern Lab Compile Times (Prod) with SSR enabled (Select Usage)
- Using it in a handful of places (~7 places): ~21.97s total compile time
- Without SSR enabled: ~13.s total compile time

### Global Usage (Tests SSR `<bolt-button>` Globally)
- Pre-rendering all `<bolt-button>` components in the static site generator: ~1 minute, 40s compile time (vs 4s compile time normally)
- Pre-rendering all `<bolt-button>` components in Pattern Lab: 11 minutes, 27.7s minutes (vs 13.2s normally)