---
title: Browser Support
---

# Browser Support
As a general rule of thumb, Bolt supports the last 3 major versions of desktop and mobile browsers, IE 11, and/or browsers seeing 1% or greater user traffic.

<table>
  <tr>
    <thead>
      <th></th>
      <th>Desktop Browsers</th>
      <th>Mobile Browsers</th>
    </thead>
    <th>Last 3 Major Versions</th>
    <td style="text-align: center;">
      <img src="https://az813057.vo.msecnd.net/images/chrome_32x32.ba1c648.png" srcset="https://az813057.vo.msecnd.net/images/chrome_64x64.1e9a802.png 2x,https://az813057.vo.msecnd.net/images/chrome_128x128.188db8b.png 3x" alt="Chrome">
      <img src="https://az813057.vo.msecnd.net/images/safari_32x32.638dc89.png" srcset="https://az813057.vo.msecnd.net/images/safari_64x64.ea45a6a.png 2x,https://az813057.vo.msecnd.net/images/safari_128x128.773bbab.png 3x" alt="Safari">
      <img src="https://az813057.vo.msecnd.net/images/firefox_32x32.6d127bb.png" srcset="https://az813057.vo.msecnd.net/images/firefox_64x64.932a819.png 2x,https://az813057.vo.msecnd.net/images/firefox_128x128.d0785cb.png 3x" alt="Firefox">
      <img src="https://az813057.vo.msecnd.net/images/edge_32x32.2268fcf.png" srcset="https://az813057.vo.msecnd.net/images/edge_64x64.d37f8fa.png 2x,https://az813057.vo.msecnd.net/images/edge_128x128.ab2b380.png 3x" alt="Microsoft Edge" />
    </td>
    <td style="text-align: center;">
    <img src="https://az813057.vo.msecnd.net/images/chrome_32x32.ba1c648.png" srcset="https://az813057.vo.msecnd.net/images/chrome_64x64.1e9a802.png 2x,https://az813057.vo.msecnd.net/images/chrome_128x128.188db8b.png 3x" alt="Chrome for Android">
    <img src="https://az813057.vo.msecnd.net/images/safari_32x32.638dc89.png" srcset="https://az813057.vo.msecnd.net/images/safari_64x64.ea45a6a.png 2x,https://az813057.vo.msecnd.net/images/safari_128x128.773bbab.png 3x" alt="Safari for iOS">
    </td>
  </tr>
  <tr>
    <th>Specific Versions</th>
    <td style="text-align: center;"><strong>IE 11</strong> <br><img src="https://az813057.vo.msecnd.net/images/internet-explorer_9-11_32x32.a67c88f.png" srcset="https://az813057.vo.msecnd.net/images/internet-explorer_9-11_64x64.3ab19a6.png 2x,https://az813057.vo.msecnd.net/images/internet-explorer_9-11_128x128.8ee7bc9.png 3x" alt="Internet Explorer">
    <td style="text-align: center;">—</td>
  </tr>
</table>

More specifically, we use [Browserslist](https://github.com/ai/browserslist) along with shipping a [codified version of the browser support stats](https://github.com/bolt-design-system/bolt/blob/master/packages/configs/browserslist-config/index.js) mentioned above with our front-end development environment and tooling (ex. Autoprefixer, Babel, Eslint, and PostCSS). 

This allows us to automatically include or omit code based on how the latest browser stats change over time.

<a href="#latest-browserslist-stats">See Below for the latest Browserslist Stats</a>

## Web Component Powered Design System
Most of the components shipping in Bolt are built using Web Components that run natively (or near-natively, via polyfills) in all widely supported modern web browsers — including IE 11 and up.


### What are Web Components?

> According to MDN, “Web Components is a suite of different technologies allowing you to create reusable custom user interface components — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.”

Think of this as a cross-browser way to define and create new native-like UI Components and interfaces, similar to how browsers have built-in UIs for the `<select>` and `<video>` elements.

### ...What About Cross Browser Support of Web Components?

It's actually quite good!

As of late February 2018, the 3** main technologies that power Web Components see native browser support at around 74% or higher -- Firefox 59 in fact is switching on support for Custom Elements on March 13th, 2018!

For browsers yet to have full support for Web Components, Bolt also ships with a small polyfill loader that automatically polyfills based on the browser-specific features supported. This allows developers use Web Components seamlessly and with little performance overhead to boot.

With the help of these polyfills, Bolt's cross browser support of Web Components includes Google Chrome (and all Chrome-based browsers), Safari (including Safari for iOS), Firefox, Microsoft Edge, and IE 11.

<small><sup>**</sup>Cross browser support of HTML Templates, Custom Elements, and Shadow DOM support is around 86.13%, 73.95%, and 74.22%, respectfully, as of late February, 2018. Bolt doesn't use or support the now defunct HTML Imports spec in lieu of the shift towards ES Modules / Imports.</small>

### Latest Browserslist Stats

<iframe src="//browserl.ist/?q=%3E+1%25+in+US%2C+ie+11%2C+last+3+Android+major+versions%2C+last+3+iOS+major+versions%2C+last+3+Chrome+major+versions%2C+last+3+Edge+major+versions%2C+last+3+Firefox+major+versions%2C+last+3+Safari+major+versions" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups allow-forms" style="width: 100%; height: 2560px; max-height: 100%;" height="2560px"></iframe>
