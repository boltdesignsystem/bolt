# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)

**Note:** Version bump only for package @bolt/components-tabs





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)

**Note:** Version bump only for package @bolt/components-tabs





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)

**Note:** Version bump only for package @bolt/components-tabs





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)

**Note:** Version bump only for package @bolt/components-tabs





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)

**Note:** Version bump only for package @bolt/components-tabs





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)

**Note:** Version bump only for package @bolt/components-tabs





# [2.7.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/compare/v2.6.0...v2.7.0) (2019-09-13)


### Bug Fixes

* comment-out findIndex polyfill for now, exposing a bug in table JS ([5e9831b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/5e9831b))
* flip tabindex so that active tab gets focus, other are skipped; use arrows to navigate ([5b1106e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/5b1106e))
* prettier reformatting ([361cb6b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/361cb6b))
* prevent animation overflow to trigger scrollbar ([c45a9d8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/c45a9d8))
* remove duplicate docs content ([db4ad8c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/db4ad8c))
* set `selected` attr, was buggy in IE11 ([47da661](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/47da661))
* temporarily disable scrollIntoView() ([22ab7bb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/22ab7bb))
* update Tab logic to only grab immediately nested Tab Panels ([a013e5d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/a013e5d))
* update Tab styles to only target immediately nested panels ([a746534](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/a746534))
* use cursor pointer on both active and inactive tabs ([32bcecc](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/32bcecc))


### Features

* add `inset`, `label_spacing`, and `panel_spacing` props to schems, $ref support ([1057bf0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/1057bf0))
* add tabs component ([b591d67](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/b591d67))
* JS + CSS for new spacing props, update hover and focus styles, general clean up ([f7dbc4c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/f7dbc4c))
* re-add scroll-into-view, now with "if-needed" ([60002c8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/60002c8))
* rename `items` to `panels` ([46e8478](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/46e8478))
* schema updates to `label_spacing`, `panel_spacing`, `inset`, and `uuid`; update docs ([f756568](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/f756568))
* set selected tab color to 'headline' ([441ad56](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/441ad56))
* setup scrollIntoView behavior, fix ssr-hydrate, remove unused parts of tabs JS ([f8e63a3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/f8e63a3))
* update active label color ([44c91c3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/44c91c3))
* update inset, not-inset button styles ([3982c09](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/3982c09))
* update tabs package.json to beta.2 ([e45bcb5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-tabs/commit/e45bcb5))
