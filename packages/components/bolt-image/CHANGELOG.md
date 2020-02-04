# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.17.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.16.3...v2.17.0) (2020-02-04)

**Note:** Version bump only for package @bolt/components-image





# [2.16.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.15.2...v2.16.0) (2020-01-24)

**Note:** Version bump only for package @bolt/components-image





## [2.15.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.15.1...v2.15.2) (2020-01-21)

**Note:** Version bump only for package @bolt/components-image





# [2.15.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.14.3...v2.15.0) (2020-01-17)

**Note:** Version bump only for package @bolt/components-image





# [2.14.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.13.3...v2.14.0) (2020-01-06)


### Bug Fixes

* update @bolt/core-v3.x references to v2.13.0 ([28d7bcb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/28d7bcb))
* update Nightwatch test URL used to verify injected Cards + Images rendering as expected ([f657058](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/f657058))
* update snapshots + Nightwatch test ([5e267ad](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5e267ad))





# [2.12.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.11.4...v2.12.0) (2019-11-26)


### Bug Fixes

* address prettier issues ([7060025](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/7060025))
* call super in the firstUpdated lifecycle event ([35e2cdc](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/35e2cdc))
* make sure all Boolean props are reflected as HTML attributes. Fix to address background images not getting the right classes with the `cover` prop has been added ([815f041](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/815f041))
* update lazysizes config to catch instances (IE 11) where images haven't finished rendering and lazysizes initializes ([bd540f9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/bd540f9))
* workaround to address lazyloaded SVG images not loading in IE 11 ([928d1ad](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/928d1ad))





## [2.11.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.11.1...v2.11.2) (2019-11-14)

**Note:** Version bump only for package @bolt/components-image





# [2.11.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.10.0...v2.11.0) (2019-11-14)


### Bug Fixes

* fix prettier issue ([af6747a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/af6747a))
* update Image component lazyloading logic to properly scope lazySizes.elements check + ensure lazySizes knows to check late loaded / dynamically injected images ([490ba17](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/490ba17))
* update Nightwatch test selector + demo code to render the client-side image used for testing w/o a Shadow DOM ([163e0b9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/163e0b9))





## [2.10.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.10.0...v2.10.1) (2019-11-05)


### Bug Fixes

* fix prettier issue ([af6747a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/af6747a))
* update Image component lazyloading logic to properly scope lazySizes.elements check + ensure lazySizes knows to check late loaded / dynamically injected images ([490ba17](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/490ba17))
* update Nightwatch test selector + demo code to render the client-side image used for testing w/o a Shadow DOM ([163e0b9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/163e0b9))





# [2.10.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.9.2...v2.10.0) (2019-10-29)


### Bug Fixes

* fix image.js typo ([535e5d0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/535e5d0))
* mirror object fit props on the placeholder image ([d3e9bb6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/d3e9bb6))
* update JPG check to account for JPGs that have query strings ([d45e559](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/d45e559))
* update srcset logic to handle lazy vs non-lazy images + srcset / src / placeholder fallbacks depending on the mode the component is getting loaded ([35a9c8f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/35a9c8f))


### Features

* update resize handler to heavily debounce resizing to reduce the amount of overhead + opt out if a component hasn't yet lazyloaded ([86356e9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/86356e9))





## [2.9.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.9.1...v2.9.2) (2019-10-23)

**Note:** Version bump only for package @bolt/components-image





## [2.9.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.9.0...v2.9.1) (2019-10-22)


### Bug Fixes

* only set 'sizes' if image has width, fixes fuzzy images in tabs ([cbdca3e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/cbdca3e))





# [2.9.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.8.3...v2.9.0) (2019-10-22)

**Note:** Version bump only for package @bolt/components-image





## [2.8.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.8.0...v2.8.1) (2019-10-16)

**Note:** Version bump only for package @bolt/components-image





# [2.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)

**Note:** Version bump only for package @bolt/components-image





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)


### Bug Fixes

* **image:** prevent error where initialClasses were not defined in time ([37bbab6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/37bbab6))





# [2.8.0-beta.5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.8.0-beta.4...v2.8.0-beta.5) (2019-09-30)


### Bug Fixes

* add src path fallback if only srcset is defined ([c2f3e24](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/c2f3e24))
* auto sync enabling / disabling Shadow DOM when rendering Ratio inside of image ([930ba87](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/930ba87))
* fix prettier formatting ([c4ba7b5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/c4ba7b5))
* fix prettier issues ([fa17a45](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/fa17a45))
* update <img> markup to use a placeholder in srcset but always display the fallback `src` for older browsers ([228ff16](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/228ff16))





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)

**Note:** Version bump only for package @bolt/components-image





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)

**Note:** Version bump only for package @bolt/components-image





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)

**Note:** Version bump only for package @bolt/components-image





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)

**Note:** Version bump only for package @bolt/components-image





# [2.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.6.0...v2.7.0) (2019-09-13)


### Bug Fixes

* disable linting on patched libs ([0c8b76d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0c8b76d))
* temporarily switch to using a locally patched version of lazysizes to fix patch-package-related postinstall issues ([8a50642](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/8a50642))





# [2.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.6.0-beta.2...v2.6.0) (2019-08-30)


### Bug Fixes

* check that `lazySizes.elements` is defined before pushing to it ([1704cec](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/1704cec))





# [2.6.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.6.0-beta.1...v2.6.0-beta.2) (2019-08-27)

**Note:** Version bump only for package @bolt/components-image





# [2.6.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.5.6...v2.6.0-beta.1) (2019-08-09)


### Bug Fixes

* add calculated placeholder image / placeholder color to the image component Twig template's <bolt-image> wrapper if a custom version isn't specified ([c41696b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/c41696b))
* add CSS fix to make sure low quality image placeholders get the blur effect while the main image is lazyloaded ([3815a57](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/3815a57))
* don't re-blur the image component once it has already loaded the first time. fixes a lazy-loaded related rendering issue when updating the src / srcset props after the image component has already loaded up ([e95ada7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/e95ada7))
* fix lint issue ([03a1bb3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/03a1bb3))
* initially add the current image component width to the `sizes` prop when the prop is set to `auto` ([87adbcb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/87adbcb))
* lazily automatically calculate the correct image sizes prop if set to auto and the image component's window gets resized ([87217e3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/87217e3))
* only add the `data-sizes` prop to the image component when lazyloading ([4c9f463](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/4c9f463))
* only output placeholder color / placeholder image when lazyloading ([283ce71](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/283ce71))
* pass the <bolt-image> web component the correct prop data for any base64 low quality placeholder + average image color options that exists. This fixes a visible flash that had been occurring when the web component initially boots up and renders ([cd96387](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/cd96387))
* restore component snapshots to have background color / image props added (regardless on if they are being lazyloaded or not) ([b4857b9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/b4857b9))
* temporarily auto-patch the lazysizes JS to allow the internal element selector to be specified if a new `getElements` method is defined in the lazysizes config + update yarn.lock ([ec9b628](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/ec9b628))
* update image component's Twig to always output placeholders when available + retest preloading ([20dfeaf](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/20dfeaf))
* update snapshots based on image component fixes ([0d9590f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0d9590f))
* update the value getting assigned to the main `<img>` tag’s `src` attribute in the <bolt-image> Twig template. Previously this had been using the base64 encoded version of the image (when getting lazy loaded) but this was just adding extra HTML data without actually doing what it was supposed to be doing. Now this has been updated to specifically use the 1x1 placeholder pixel instead. ([4ec7db3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/4ec7db3))


### Features

* add ability to optionally align background images vertically ([a9ecfe4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a9ecfe4))
* update lazysizes default lazyloading config to be more conservative with preloading by default ([d393652](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/d393652))





## [2.5.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.5.5...v2.5.6) (2019-07-30)

**Note:** Version bump only for package @bolt/components-image





## [2.5.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.5.2...v2.5.3) (2019-07-12)

**Note:** Version bump only for package @bolt/components-image





## [2.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.5.1...v2.5.2) (2019-06-25)

**Note:** Version bump only for package @bolt/components-image





## [2.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package @bolt/components-image





# [2.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.3.2...v2.4.0) (2019-05-14)



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add 'is_ssr' flag to noscript, wait until SSR is in place before using ([2049a70](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/2049a70))
* add backwards compatibility for 'ratio' prop as boolean ([25c3c90](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/25c3c90))
* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/cf335ce))
* check for not 'cover' rather than sameas ([0be7f5d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0be7f5d))
* check if component was initially rendered before removing children, IE runs twice on background component and empties the rendered HTML ([4006913](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/4006913))
* JS error when image class is not found ([a3c733a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a3c733a))
* make images display "block" by default to avoid whitespace issues inside custom-element ([dd2b5fd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/dd2b5fd))
* only add main bolt image class to fallback ([c1292f9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/c1292f9))
* re-add support for 'imageAttributes' for backwards compatibility, but deprecate it ([fa78212](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/fa78212))
* remove 'web component only' from ratio description ([84738e1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/84738e1))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a7f5fec))
* remove setTimeout, check that image is loaded before calling 'unveil' ([d9d5489](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/d9d5489))
* remove unused 'get' import ([7abb7e9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/7abb7e9))
* replace localhost path in docs ([9be0abd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/9be0abd))
* return if src or srcset ([072fef0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/072fef0))
* typo in testing instructions ([4ba775a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/4ba775a))
* update broken placeholder variable name ([80c9902](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/80c9902))
* update image JS to keep any initial classes found on image tag, backwards compatibility for 'imageAttributes' ([ea980a6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/ea980a6))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/b647d3b))
* use 'src' not 'placeholderSrc' in placeholder noscript image ([20c8661](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/20c8661))


### Features

* add support for 'attributes', remove 'attributes' from ratio include ([6878f1d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/6878f1d))
* add support for 'cover' prop ([a4c49a9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a4c49a9))
* add timeout to workaround lazyload render race condition, wip ([71796b0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/71796b0))
* begin to convert image to web component, wip ([7cd8a33](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/7cd8a33))
* change ratio prop to use slash-separated values ([0b739b1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0b739b1))
* deprecate 'useAspectRatio', 'width', and 'height'; update instances to use 'ratio' ([5a4b34a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5a4b34a))
* fully support "ratio" prop in image Twig template ([f1b2e6c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/f1b2e6c))
* pass placeholder values, ratio data via web component props ([ad560ad](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/ad560ad))
* remove bolt-image children on connect ([57df829](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/57df829))
* remove height and width props from image web component ([ba7dfd6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/ba7dfd6))
* rename noUseAspectRatio to no_ratio, update logic ([9b7191b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/9b7191b))
* render image template every time, do not keep initial HTML ([101e177](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/101e177))
* show image fallback if lazyload is true ([5e3c3bd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5e3c3bd))
* skip ratio if 'cover' attribute is true ([d03a9c7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/d03a9c7))
* testing lazySizes options, commented out ([5467c4d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5467c4d))
* update image JS to match latest component patterns, testing basic use cases, WIP ([5327f3d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5327f3d))
* update image schema with noLazyload for web component ([31fb142](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/31fb142))
* update placeholder logic to include 'cover' ([0da2c6e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0da2c6e))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* add 'is_ssr' flag to noscript, wait until SSR is in place before using ([2049a70](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/2049a70))
* add backwards compatibility for 'ratio' prop as boolean ([25c3c90](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/25c3c90))
* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/cf335ce))
* check for not 'cover' rather than sameas ([0be7f5d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0be7f5d))
* check if component was initially rendered before removing children, IE runs twice on background component and empties the rendered HTML ([4006913](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/4006913))
* JS error when image class is not found ([a3c733a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a3c733a))
* make images display "block" by default to avoid whitespace issues inside custom-element ([dd2b5fd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/dd2b5fd))
* only add main bolt image class to fallback ([c1292f9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/c1292f9))
* re-add support for 'imageAttributes' for backwards compatibility, but deprecate it ([fa78212](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/fa78212))
* remove 'web component only' from ratio description ([84738e1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/84738e1))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a7f5fec))
* remove setTimeout, check that image is loaded before calling 'unveil' ([d9d5489](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/d9d5489))
* remove unused 'get' import ([7abb7e9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/7abb7e9))
* replace localhost path in docs ([9be0abd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/9be0abd))
* return if src or srcset ([072fef0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/072fef0))
* typo in testing instructions ([4ba775a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/4ba775a))
* update broken placeholder variable name ([80c9902](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/80c9902))
* update image JS to keep any initial classes found on image tag, backwards compatibility for 'imageAttributes' ([ea980a6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/ea980a6))
* update snapshots + update logo tests to use the new bolt-image web component ([b647d3b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/b647d3b))
* use 'src' not 'placeholderSrc' in placeholder noscript image ([20c8661](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/20c8661))


### Features

* add support for 'attributes', remove 'attributes' from ratio include ([6878f1d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/6878f1d))
* add support for 'cover' prop ([a4c49a9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a4c49a9))
* add timeout to workaround lazyload render race condition, wip ([71796b0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/71796b0))
* begin to convert image to web component, wip ([7cd8a33](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/7cd8a33))
* change ratio prop to use slash-separated values ([0b739b1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0b739b1))
* deprecate 'useAspectRatio', 'width', and 'height'; update instances to use 'ratio' ([5a4b34a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5a4b34a))
* fully support "ratio" prop in image Twig template ([f1b2e6c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/f1b2e6c))
* pass placeholder values, ratio data via web component props ([ad560ad](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/ad560ad))
* remove bolt-image children on connect ([57df829](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/57df829))
* remove height and width props from image web component ([ba7dfd6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/ba7dfd6))
* rename noUseAspectRatio to no_ratio, update logic ([9b7191b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/9b7191b))
* render image template every time, do not keep initial HTML ([101e177](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/101e177))
* show image fallback if lazyload is true ([5e3c3bd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5e3c3bd))
* skip ratio if 'cover' attribute is true ([d03a9c7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/d03a9c7))
* testing lazySizes options, commented out ([5467c4d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5467c4d))
* update image JS to match latest component patterns, testing basic use cases, WIP ([5327f3d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/5327f3d))
* update image schema with noLazyload for web component ([31fb142](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/31fb142))
* update placeholder logic to include 'cover' ([0da2c6e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0da2c6e))





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)



## [2.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.2.1...v2.2.2) (2019-01-07)


### Bug Fixes

* fix failing jest tests + prettier issues ([333d08d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/333d08d))
* fix NPM dependency version mis-match across bolt components ([611ceee](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/611ceee))
* re-enable image jest test + minor cleanup ([6273315](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/6273315))
* update image jest test with higher resolution image to test that the image srcset functionality is working properly + update jest snapshot results ([453effb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/453effb))
* updating image test fixtures + updating image build task to always generate the full set of image sizes for Jest snapshot tests ([0b0bb26](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/0b0bb26))



## [2.2.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.2.0...v2.2.1) (2018-12-17)


### Bug Fixes

* add full twig namespace include to fix Jest snapshot diff of image component on Travis ([f69005b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/f69005b))
* remove unused 'get' import ([7abb7e9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/7abb7e9))
* use 'src' not 'placeholderSrc' in placeholder noscript image ([20c8661](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/20c8661))


### Features

* begin to convert image to web component, wip ([7cd8a33](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/7cd8a33))
* update image schema with noLazyload for web component ([31fb142](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/31fb142))



# [2.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.2.0-rc.1...v2.2.0) (2018-11-18)



# [2.2.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.1.6...v2.2.0-rc.1) (2018-11-07)


### Bug Fixes

* add bolt ratio dependency to <bolt-image> ([26386b1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/26386b1))
* fix typo in bolt dependency name ([eb6b55d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/eb6b55d))
* flx linting issues ([b7c30d7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/b7c30d7))



## [2.1.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.1.5...v2.1.6) (2018-10-23)



## [2.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.1.3...v2.1.4) (2018-10-18)



## [2.1.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.1.2...v2.1.3) (2018-10-18)



## [2.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.1.1...v2.1.2) (2018-10-16)



## [2.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.1.0...v2.1.1) (2018-10-10)



# [2.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.1.0-beta.0...v2.1.0) (2018-10-10)



# [2.1.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.0.0...v2.1.0-beta.0) (2018-10-05)



# [2.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.0.0-beta.3...v2.0.0) (2018-09-27)



# [2.0.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2018-09-21)



# [2.0.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.8.3...v2.0.0-beta.2) (2018-09-19)



# [2.0.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-09-06)



# [2.0.0-beta.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.8.1...v2.0.0-beta.0) (2018-09-05)



# [1.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.7.2...v1.8.0) (2018-08-27)



# [1.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.6.8...v1.7.0) (2018-08-08)



## [1.6.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.6.3...v1.6.4) (2018-07-12)



# [1.6.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.5.3...v1.6.0) (2018-07-04)


### Bug Fixes

* doc styles and formats ([a6d5b22](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/a6d5b22))



## [1.5.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.5.1...v1.5.2) (2018-06-19)



## [1.5.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.5.0...v1.5.1) (2018-06-18)



# [1.5.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.4.5...v1.5.0) (2018-06-12)


### Bug Fixes

* fix image schema validation (BDS-291) ([cb08e08](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/cb08e08))



# [1.4.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.3.4...v1.4.0) (2018-05-18)



# [1.3.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.2.4...v1.3.0) (2018-05-04)



## [1.2.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.2.2...v1.2.3) (2018-04-26)



## [1.2.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.2.1...v1.2.2) (2018-04-26)



# [1.2.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.1.12...v1.2.0) (2018-04-25)



## [1.1.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.1.3...v1.1.4) (2018-04-17)



## [1.1.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.1.1...v1.1.2) (2018-04-10)



## [1.1.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.1.0...v1.1.1) (2018-04-10)



# [1.1.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.4...v1.1.0) (2018-04-10)



## [1.0.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.2...v1.0.3) (2018-04-03)



## [1.0.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.1...v1.0.2) (2018-03-31)



## [1.0.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0...v1.0.1) (2018-03-30)



# [1.0.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.12...v1.0.0) (2018-03-30)



# [1.0.0-rc.12](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2018-03-30)



# [1.0.0-rc.11](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.9...v1.0.0-rc.11) (2018-03-30)



# [1.0.0-rc.9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2018-03-20)



# [1.0.0-rc.8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2018-03-20)



# [1.0.0-rc.7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2018-03-13)



# [1.0.0-rc.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2018-03-07)



# [1.0.0-rc.5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2018-03-06)



# [1.0.0-rc.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2018-03-06)



# [1.0.0-rc.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-02-24)



# [1.0.0-rc.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-02-24)



# [1.0.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/compare/v0.4.1...v1.0.0-rc.1) (2018-02-24)


### Bug Fixes

* fixing image paths ([62efbff](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/62efbff))
* fixing JS rendering by adding missing bolt/core utils added in v0.x; adding temp workaround to images not loading + example pegaworld dummy page. ([9bcbdba](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/9bcbdba))
* update image component as workaround to in-progress lazyloading functionality ([81bc78a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-image/commit/81bc78a))
