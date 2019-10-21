---
title: JavaScript Architecture 
---

## Write with ES2015 (ES6)
* <p>JavaScript is written out using [ECMAScript 2015 features](https://github.com/lukehoban/es6features) (let, const, import, arrow functions, etc) and transpiled via [Babel](https://babeljs.io/) for precise cross browser compatibility.</p>

📝 Note: Bolt ships with our own customized Babel config present and plugins to ensure our coding standards and conventions are transpired based on our current browser support.

* <p>Component-specific JavaScript should use [ES2015 Classes](https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes) , allowing for object oriented-like features in JavaScript (constructors, inheritance, prototypes, mixins, etc) — see Custom Elements section below.</p>


## JavaScript Templating and Rendering
* <p>Dynamic JavaScript templating and client-side rendering is primarily handled via [Preact](https://preactjs.com/) and [JSX](https://jasonformat.com/wtf-is-jsx/)</p>
	* Links a component’s appearance with the data getting passed into it.
	* As an added benefit, this allows us to tap into the plethora of off the shelf libraries, resources and tutorials that wouldn’t be possible via a custom in-house solution.

These docs will continue to be updated accordingly however it's clear that JSX and Template literal rendering options are a vital part of the direction we're heading in (more of just a question on whether that's via one or a small handful of options). 😉
	

## Framework-less Custom Elements
* <p>Bolt components are written out as native browser custom elements through the help of  [SkateJS](https://github.com/skatejs/skatejs), a tiny JavaScript library that helps to simplify some of the syntax in writing components without the bloat from other libraries like Polymer.</p>
* <p>This provides us with features and conventions found in most modern day JavaScript frameworks like  [React](https://github.com/mui-org/material-ui/blob/v1-beta/src/Button/Button.js#L198) ,  [Angular](https://github.com/angular/material2/blob/master/src/lib/button/button.ts) ,  [Preact](https://github.com/prateekbh/preact-material-components/blob/master/Button/Button.jsx#L33)  or  [Vue](https://github.com/matsp/material-components-vue/blob/master/components/Button/Button.vue#L13)  (constructors, built-in methods, properties, event listeners, etc) — without requiring a headless Drupal implementation or steep upfront costs.</p>


## `@bolt/core` For Shared Dependencies
* <p>JavaScript dependencies  [shared across Bolt components](https://www.npmjs.com/browse/depended/@bolt/core)  (think 3rd party libraries like SkateJS or Preact, in addition to Bolt-specific helper functions), are centrally maintained and distributed via a single NPM package, `@bolt/core`.</p>
	

## Async JavaScript via `import`
* <p>Bolt supports  [asynchronous JavaScript imports](https://medium.com/@WebReflection/javascript-dynamic-import-export-b0e8775a59d4) via [Webpack](https://webpack.js.org/guides/code-splitting/)  and Babel which allows chunks of JavaScript to be conditionally loaded in a way that is customizable, scalable and performant.</p>

```javascript
import(/* webpackMode: 'eager', webpackChunkName: 'bolt-button' */ '@bolt/components-button');
```


## Polyfill Features, Not Browsers
* `@bolt/core` also ships with a [Polyfill](https://remysharp.com/2010/10/08/what-is-a-polyfill) loader to conditionally load JavaScript polyfills based on the features supported by the user’s browser
* Older browsers get the compatibility they need and newer browsers aren’t bogged down by downloading and running unnecessary code.


## Dynamic Data = More Maintainable, Consistent Components
* Whenever possible, components should pull in and reference dynamic data created directly from the codebase when configuring what options or parameters a particular component should allow.
* <p>For example, our Icon component’s allowed icon sizes are directly tied in with the  [JSON data](https://github.com/bolt-design-system/bolt/blob/release/0.x/packages/bolt-core/data/spacing-sizes.js) exported from our spacing scale. Update the scale in one place, the related components are updated automatically.</p>


## Component-specific JavaScript Lives with the Component
* This improves component maintainability and simplifies the consumption and integration by other developers. Other component-specific assets (Sass, Twig templates, Markdown docs, and so on) follow this convention as well.


## JavaScript Coding Standards via [Eslint](https://www.smashingmagazine.com/2015/09/eslint-the-next-generation-javascript-linter/)
* Bolt’s  [JavaScript coding standards](https://github.com/bolt-design-system/bolt/blob/master/packages/configs/eslint-config/index.js) use the gold standard of JavaScript linting, AirBnB’s eslint config, as a base and make a few tweaks accordingly.
* For reference, the [eslint-config-aribnb](https://www.npmjs.com/package/eslint-config-airbnb)  package has well over 65,000 stars on Github and currently is seeing over 2 million installs from NPM a month.
