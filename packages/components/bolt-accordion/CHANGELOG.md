# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.5.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/compare/v2.4.4...v2.5.0) (2019-06-21)


### Bug Fixes

* add improved method of hydrating ssr-rendered HTML more precisely. addresses issue the accordion component flashing when booting up using <replace-with-children> and <replace-with-grandchildren> ([a183338](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/a183338))
* add missing AccordionItem imports ([341e571](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/341e571))
* box shadow ([9b4e7c5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/9b4e7c5))
* box shadows and schema ([56f9462](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/56f9462))
* check for item.renderRoot before using it, fixes IE error ([b64845c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/b64845c))
* check that 'rendered' event emitted by 'bolt-accordion-icon', breaks accordion otherwise ([95f3cf9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/95f3cf9))
* css cleanup ([630c42d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/630c42d))
* IE11 icon and box shadow ([4de4563](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/4de4563))
* make replace-with-grandchildren element span full-width ([53c8086](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/53c8086))
* no js focus ([3ef9626](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/3ef9626))
* no-js styles, cleanup CSS, use proper BEM classnames ([6bfee44](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/6bfee44))
* no-separator prop name ([7bd1115](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/7bd1115))
* not removing state input on load ([b819e13](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/b819e13))
* padding around icon ([625794e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/625794e))
* prevent mutation observer from re-rendering when using light dom ([f30c99d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/f30c99d))
* re-organize css ([a53b624](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/a53b624))
* remove debugging style ([7919a88](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/7919a88))
* remove set statement in accordion template ([69f2c86](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/69f2c86))
* remove unneeded 'sourceFilesFrom' key in accordion package.json ([7078e9f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/7078e9f))
* remove unused 'render' import ([ea39241](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/ea39241))
* rename header slot to trigger ([d9f4c59](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/d9f4c59))
* rework `replace-with` structure so that content remaining is in correct order ([4139d53](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/4139d53))
* shadow and border radius ([00590a0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/00590a0))
* spacing ([eb8f2fa](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/eb8f2fa))
* speed up initial accordion rendering ([8f0012b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/8f0012b))
* update accordion pre-render cleanup logic to better account for deeply nested content ([224809a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/224809a))
* update Jest tests to reflect updated ssr hydration technique ([9b62ba8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/9b62ba8))


### Features

* add 'dev' uuid for testing ([5ee35ae](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/5ee35ae))
* add accordion component, wip ([97faca0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/97faca0))
* add auto-open prop ([5597283](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/5597283))
* add button-style outer glow active state ([4852a22](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/4852a22))
* add icon-valign prop support ([2a252c0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/2a252c0))
* add last-item class to accordion-item JS ([702b987](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/702b987))
* add mutation observer, update accordion when child items change ([8a2d8b0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/8a2d8b0))
* add support for multiple items open at once ([c40a82e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/c40a82e))
* comment out box-shadow to avoid dupe layers of shadow ([5619140](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/5619140))
* CSS updates, wip ([f77eab7](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/f77eab7))
* fix broken CSS rules, add missing spacing-none rule ([7cabd63](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/7cabd63))
* inherit shadow dom support from parent component ([d1e4c54](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/d1e4c54))
* major updates to accordion schema, styles, JS; wip ([2118af3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/2118af3))
* move addClassesToSlottedChildren to base class, pass slot names as param ([41017fe](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/41017fe))
* rename 'auto-open' prop to 'open' ([f65180d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/f65180d))
* rename no-separator prop in schema ([f5ba3e8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/f5ba3e8))
* rename prop 'multiple' to 'single' ([ad16304](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/ad16304))
* rework accordion item twig template to remove unneeded elements on load ([b029479](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/b029479))
* set default accordion iconValign value to 'center' ([190c107](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/190c107))
* update accordion icons ([d58bd26](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/d58bd26))
* update accordion options on re-render ([74819ac](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/74819ac))
* update JS to remove unneeded elements on load, throttle resize ([c6ba2cb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/c6ba2cb))
* update Twig + JS to reflect new iconValign default ([2d7f74e](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/2d7f74e))
* use schema validation in accordion JS ([9129e20](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/9129e20))
* wrap classnames in `css()` helper ([8cb6dba](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-accordion/commit/8cb6dba))
