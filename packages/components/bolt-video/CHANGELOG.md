# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.3.0-rc.5](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/compare/v2.3.0-rc.4...v2.3.0-rc.5) (2019-01-04)

**Note:** Version bump only for package @bolt/components-video





# [2.3.0-rc.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/compare/v2.3.0-rc.3...v2.3.0-rc.4) (2019-01-04)

**Note:** Version bump only for package @bolt/components-video





# [2.3.0-rc.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/compare/v2.3.0-rc.2...v2.3.0-rc.3) (2019-01-04)


### Bug Fixes

* remove bolt version added to video player twig ([cab6b7d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/cab6b7d))





# [2.3.0-rc.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/compare/v2.3.0-rc.1...v2.3.0-rc.2) (2019-01-04)

**Note:** Version bump only for package @bolt/components-video





# [2.3.0-rc.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/compare/vv2.3.0-rc.0...v2.3.0-rc.1) (2019-01-04)

**Note:** Version bump only for package @bolt/components-video





# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/compare/v2.2.1...v2.3.0-rc.0) (2019-01-04)


### Bug Fixes

* add full twig namespace include to fix Jest snapshot diff of image component on Travis ([f69005b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/f69005b))
* fix NPM dependency version mis-match across bolt components ([611ceee](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/611ceee))
* fix prettier issues ([caf0673](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/caf0673))
* fix schema validation errors ([c4381ec](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/c4381ec))
* hide the internal available_plugins and default_plugins video player config options from the default Pattern Lab schema table ([0a94bbe](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/0a94bbe))
* improve video player script loader — now multiple videos with different playerIds can load up side by side on the same page and work as expected ([c02f27b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/c02f27b))
* resolve merge conflicts + update snapshot tests ([99a938a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/99a938a))
* update jest snapshots for the Bolt video player ([a78110b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/a78110b))
* update social share plugin check + clean up inline plugin script ([f656740](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/f656740))
* update stylelint properties order ([9405599](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/9405599))
* use bolt border radius ([a614aac](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/a614aac))


### Features

* 1st pass building out new cue point plugin (add-on) for the <bolt-video> player ([2701c0f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/2701c0f))
* add new built-in methods for hiding / showing video player overlay ([b4e8d56](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/b4e8d56))
* add new onLoadStart event to video player (used for new cue point plugin) ([5172188](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/5172188))
* add new setup work for the video component's overlay UI ([e9f05fa](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/e9f05fa))
* Add share_description property to bolt-video ([d33c433](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/d33c433))
* add support for default plugins initialized with every video player instance; add new ability to declaratively enable / disable plugins to ensure the default plugins don't get in the way accidentally ([3e51afb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/3e51afb))
* auto-pause the video + open in a new tab when interacting with cue point ctas ([383673b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/383673b))
* improve new plugin system by checking to make sure the social and email plugins only get loaded once ([f05966d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/f05966d))
* Make video share text translatable by default when using twig ([ea1c5d6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/ea1c5d6))
* Remove hard-coded CSS share text and style replacement ([528e5e1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-video/commit/528e5e1))
