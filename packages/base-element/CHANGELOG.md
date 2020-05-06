# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.23.0](https://github.com/boltdesignsystem/bolt/compare/v2.22.1...v2.23.0) (2020-05-06)


### Bug Fixes

* tweak <ssr-keep> support in BoltElement ([620cab5](https://github.com/boltdesignsystem/bolt/commit/620cab5e90ce4f44ee2466c79a15d3c56edeefd9))





# [2.22.0](https://github.com/boltdesignsystem/bolt/compare/v2.21.1...v2.22.0) (2020-04-22)


### Bug Fixes

* add missing `_self` default prop value to to the target prop in BoltActionElement ([c7f75ee](https://github.com/boltdesignsystem/bolt/commit/c7f75ee51119c02aaaa76a72a0c3d18b7cf1aaf6))
* update decorator covert-case lib path ([93470c6](https://github.com/boltdesignsystem/bolt/commit/93470c65a3ca51f3dc0102456e2132aea5a10f81))
* update decorator to ensure backwards compat with non-LitElement components ([b105bb8](https://github.com/boltdesignsystem/bolt/commit/b105bb8a2db773c73bcee5641acd3495aa05cb7d))
* update jsonSchemaPropsDecorator to handle props with a default value of zero ([660a2a7](https://github.com/boltdesignsystem/bolt/commit/660a2a777330058fecc16ebc0f7873edc8bb89fa))
* update lit-helpers package + use default imports for camelCase and paramCase deps ([d2ecdfc](https://github.com/boltdesignsystem/bolt/commit/d2ecdfc33e9b44f344d45430407732b7c35d36b2))


### Features

* add auto-prop support (copying Salem's work from separate branch) ([67e5c54](https://github.com/boltdesignsystem/bolt/commit/67e5c54835de4b8d01b44d26b5a1fb41f80da801))
* add new 'alias' field to BoltElement properties ([7956fac](https://github.com/boltdesignsystem/bolt/commit/7956facc72be9d464bd0cac3c3b622f77e723adb))
* add spread support to BoltElement + demo usage in Link component ([e61a748](https://github.com/boltdesignsystem/bolt/commit/e61a7482d5c0b94efcf46fea934baa40e72ca6be))
* do not force booleans to reflect ([6cd783e](https://github.com/boltdesignsystem/bolt/commit/6cd783eafc9ccca02cea3d5d594112c7b922d216))





# [2.21.0](https://github.com/boltdesignsystem/bolt/compare/v2.20.2...v2.21.0) (2020-04-08)


### Features

* Add schema for BoltActionElement in element package ([864f38c](https://github.com/boltdesignsystem/bolt/commit/864f38cb7b24a68d3afca5e6aaacf8073cb0b768))





# [2.20.0](https://github.com/boltdesignsystem/bolt/compare/v2.19.1...v2.20.0) (2020-03-18)

**Note:** Version bump only for package @bolt/element





# [2.19.0](https://github.com/boltdesignsystem/bolt/compare/v2.18.1...v2.19.0) (2020-03-04)

**Note:** Version bump only for package @bolt/element





# [2.18.0](https://github.com/boltdesignsystem/bolt/compare/v2.17.1...v2.18.0) (2020-02-19)


### Bug Fixes

* re-write button and BoltActionElement props to use proper syntax ([baac30c](https://github.com/boltdesignsystem/bolt/commit/baac30c4840d82ea8c59fb2fda8c81dab2f152a6))
* set 'reflect' to true to fix button 'disabled' prop ([2dc18c7](https://github.com/boltdesignsystem/bolt/commit/2dc18c7ad3610786c5510e1d7215195f78379c2e))





# [2.17.0](https://github.com/boltdesignsystem/bolt/compare/v2.16.3...v2.17.0) (2020-02-04)


### Features

* cherry pick lit-element related updates from https://github.com/boltdesignsystem/bolt/pull/1711 ([a268d49](https://github.com/boltdesignsystem/bolt/commit/a268d496803dbe732d7e26cfcdc709dd2663b69f))





# [2.16.0](https://github.com/boltdesignsystem/bolt/compare/v2.15.2...v2.16.0) (2020-01-24)

**Note:** Version bump only for package @bolt/element





## [2.15.2](https://github.com/boltdesignsystem/bolt/compare/v2.15.1...v2.15.2) (2020-01-21)

**Note:** Version bump only for package @bolt/element





# [2.15.0](https://github.com/boltdesignsystem/bolt/compare/v2.14.3...v2.15.0) (2020-01-17)


### Features

* port over Slotify template map API update ([19ac59f](https://github.com/boltdesignsystem/bolt/commit/19ac59fe482120a602b71a5efd031d9abce32718))





## [2.14.2](https://github.com/boltdesignsystem/bolt/compare/v2.14.1...v2.14.2) (2020-01-15)


### Bug Fixes

* temp workaround to JS error after compiling with the Webpack DLL plugin ([839e174](https://github.com/boltdesignsystem/bolt/commit/839e174))





# [2.14.0](https://github.com/boltdesignsystem/bolt/compare/v2.13.3...v2.14.0) (2020-01-06)


### Bug Fixes

* revert adding component internal updates — handled in a separate PR ([37882d5](https://github.com/boltdesignsystem/bolt/commit/37882d5))


### Features

* add shadow toggle helper component, applying PR [#1538](https://github.com/boltdesignsystem/bolt/issues/1538) to master ([e6921ec](https://github.com/boltdesignsystem/bolt/commit/e6921ec))
* cherry pick component constructor / event lifecycle cleanup work related to larger work in https://github.com/boltdesignsystem/bolt/pull/1579 ([3911459](https://github.com/boltdesignsystem/bolt/commit/3911459))
* cherry pick component constructor / event lifecycle cleanup work related to larger work in https://github.com/boltdesignsystem/bolt/pull/1579 ([43d1878](https://github.com/boltdesignsystem/bolt/commit/43d1878))
* migrate over the customElements.define-related replacement + component dependency updates from https://github.com/boltdesignsystem/bolt/pull/1579 ([3b6f529](https://github.com/boltdesignsystem/bolt/commit/3b6f529))
* port over Core base class / Bolt Element updates from https://github.com/boltdesignsystem/bolt/pull/1579 ([3e6dfd5](https://github.com/boltdesignsystem/bolt/commit/3e6dfd5))





# [2.13.0](https://github.com/boltdesignsystem/bolt/compare/v2.12.1...v2.13.0) (2019-12-13)

**Note:** Version bump only for package @bolt/element





# [2.12.0](https://github.com/boltdesignsystem/bolt/compare/v2.11.4...v2.12.0) (2019-11-26)

**Note:** Version bump only for package @bolt/element





## [2.11.4](https://github.com/boltdesignsystem/bolt/compare/v2.11.3...v2.11.4) (2019-11-18)


### Bug Fixes

* adjust import order for Prettier ([6218e54](https://github.com/boltdesignsystem/bolt/commit/6218e54))
* check to make sure this.renderRoot.adoptedStyleSheet is defined ([17841c9](https://github.com/boltdesignsystem/bolt/commit/17841c9))





## [2.11.2](https://github.com/bolt-design-system/bolt/compare/v2.11.1...v2.11.2) (2019-11-14)

**Note:** Version bump only for package @bolt/element





# [2.11.0](https://github.com/bolt-design-system/bolt/compare/v2.10.0...v2.11.0) (2019-11-14)


### Bug Fixes

* address eslint / prettier issues ([c4c31f9](https://github.com/bolt-design-system/bolt/commit/c4c31f9))
