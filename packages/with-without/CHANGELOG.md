# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.8.1](https://github.com/bolt-design-system/bolt/compare/v2.8.0...v2.8.1) (2019-10-16)

**Note:** Version bump only for package @pegawww/with-without





# [2.8.0](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)


### Bug Fixes

* **self-drawing-circle:** move transforms outside of spin animation to fix Edge jerkiness ([2b8e70e](https://github.com/bolt-design-system/bolt/commit/2b8e70e))
* **self-drawing-circle:** rotation direction fix and spin stopping on reset ([4133d03](https://github.com/bolt-design-system/bolt/commit/4133d03))
* **with-without:** add check for toggler, bail if not found; overload handleResize and call to fix overlap bug on tablet ([8030996](https://github.com/bolt-design-system/bolt/commit/8030996))
* **with-without:** add padding right to with results block ([ab924b3](https://github.com/bolt-design-system/bolt/commit/ab924b3))
* **with-without:** blur edge focus after toggle to remove ugly outline ([598f951](https://github.com/bolt-design-system/bolt/commit/598f951))
* **with-without:** bottom blocks at beginning of xlarge overflowing height ([c995f91](https://github.com/bolt-design-system/bolt/commit/c995f91))
* **with-without:** edge fixes; resize window after accordion open/close ([13ad441](https://github.com/bolt-design-system/bolt/commit/13ad441))
* **with-without:** fix title bar overflow ([97aa9e4](https://github.com/bolt-design-system/bolt/commit/97aa9e4))
* **with-without:** force full-bleed as per comps; simplify CSS in desktop circle for stability ([d65ba1d](https://github.com/bolt-design-system/bolt/commit/d65ba1d))
* update intersection observer logic to kick off the animations when the With/Without UI is 50% (or more) visible on the screen ([1976d5d](https://github.com/bolt-design-system/bolt/commit/1976d5d))
* **with-without:** full-bleed force broken inside max-width ([40573d9](https://github.com/bolt-design-system/bolt/commit/40573d9))
* **with-without:** remove horizontal scroll when vertical scrollbar present on IE/Edge ([e5539e5](https://github.com/bolt-design-system/bolt/commit/e5539e5))
* **with-without:** tablet height overflow on load; force resize ([91d7717](https://github.com/bolt-design-system/bolt/commit/91d7717))


### Features

* **with-without:** attempt toggle outline removal on hover-capable devices ([704f158](https://github.com/bolt-design-system/bolt/commit/704f158))
* **with-without:** detect pointer hover and only remove focus if found ([4a3ca92](https://github.com/bolt-design-system/bolt/commit/4a3ca92))
* **with-without:** fire animations on intersection; clean up dom querying ([636b379](https://github.com/bolt-design-system/bolt/commit/636b379))





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)


### Bug Fixes

* fix linting issues ([ed6bde2](https://github.com/bolt-design-system/bolt/commit/ed6bde2))
* remove `is="shadow-root"` to prevent HTML from getting mistakenly nuked when booting up ([5d8853e](https://github.com/bolt-design-system/bolt/commit/5d8853e))
* update with/without to use the latest version of Bolt Core ([78d3af1](https://github.com/bolt-design-system/bolt/commit/78d3af1))





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)


### Bug Fixes

* **with-without:** add debug code to determine that polyfills have loaded to debug slowness on edge/ie ([f357e4a](https://github.com/bolt-design-system/bolt/commit/f357e4a))
* **with-without:** fix IE 11 not supporting transform w/in svg ([3973bfc](https://github.com/bolt-design-system/bolt/commit/3973bfc))
* **with-without:** fix ie and edge, cleanup ([6eb1f15](https://github.com/bolt-design-system/bolt/commit/6eb1f15))
* **with-without:** fix overzealous styling for lightdom breaking circle height ([9daa096](https://github.com/bolt-design-system/bolt/commit/9daa096))
* **with-without:** ie/edge broken when animateIn called on invisible desktop circle when on mobile ([695393f](https://github.com/bolt-design-system/bolt/commit/695393f))
* **with-without:** remove height:100% from shadow inherit compnent ([31a1fad](https://github.com/bolt-design-system/bolt/commit/31a1fad))
* **with-without:** whoops, or instead of and caused resize not to fire :) ([698aa65](https://github.com/bolt-design-system/bolt/commit/698aa65))
* address eslint issues ([e90e7b3](https://github.com/bolt-design-system/bolt/commit/e90e7b3))
* make sure to confirm the with/without container exists before running JS logic ([aab0223](https://github.com/bolt-design-system/bolt/commit/aab0223))
* update JS logic to run only when the container / element query-selected exists ([87334ce](https://github.com/bolt-design-system/bolt/commit/87334ce))
