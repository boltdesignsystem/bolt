# Browser Support
As a general rule of thumb, Bolt supports the last 3 major versions of desktop and mobile browsers, IE 11, and/or browsers seeing 1% or greater user traffic.

More specifically, we use [Browserslist](https://github.com/ai/browserslist) with a [codified version of the browser support stats](https://github.com/bolt-design-system/bolt/blob/refactor/browserslist-updates/packages/bolt-config-presets/browserslist-config-bolt/index.js) mentioned above with our front-end development environment and tooling (ex. Autoprefixer, Babel, Eslint, and PostCSS)  to automatically include or omit code based on how the latest browser stats change over time.

<a href="#latest-browserslist-stats">See Below for the latest Browserslist Stats</a>


## Web Component Powered Design System
Most of the components shipping in Bolt are built using Web Components that run natively (or near-natively, via polyfills) in all widely supported modern web browsers — including IE 11 and up.


### What are Web Components?

> According to MDN, “Web Components is a suite of different technologies allowing you to create reusable custom user interface components — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.”

Think of this as a cross-browser way to define and create new native-like UI Components and interfaces, similar to how browsers have built-in UIs for the `<select>` and `<video>` elements

### ...What About Cross Browser Support of Web Components?

It's actually quite good!

As of late February 2018, the 3** main technologies that power Web Components see native browser support at around 74% or higher -- Firefox 59 in fact is switching on support for Custom Elements on March 13th, 2018!

For browsers yet to have full support Web Components, Bolt also ships with a small polyfill loader that automatically polyfills based on the browser-specific features supported. This allows developers use Web Components seamlessly and with little performance overhead to boot.

With the help of these polyfills, Bolt's cross browser support of Web Components includes Google Chrome (and all Chrome-based browsers), Safari (including Safari for iOS), Firefox, Microsoft Edge, and IE 11.

<small><sup>**</sup>Cross browser support of HTML Templates, Custom Elements, and Shadow DOM support hovering at around 86.13%, 73.95%, and 74.22% respectfully as of late February, 2018, with the HTML Imports spec being phased away in lieu of ES Modules / Imports.</small>

### Latest Browserslist Stats
<iframe src="http://browserl.ist/?q=%3E+1%25+in+US%2C+ie+11%2C+last+3+Android+major+versions%2C+last+3+iOS+major+versions%2C+last+3+Chrome+major+versions%2C+last+3+Edge+major+versions%2C+last+3+Firefox+major+versions%2C+last+3+Safari+major+versions" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups allow-forms" style="width: 100%; height: 2560px; max-height: 100%;" height="2560px"></iframe>
