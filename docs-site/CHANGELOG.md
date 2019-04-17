# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/bolt-design-system/bolt/compare/v2.2.2...v2.3.1) (2019-04-17)


### Bug Fixes

* adjust logic grabbing latest Bolt release versions + update file cache ([cbb4ffc](https://github.com/bolt-design-system/bolt/commit/cbb4ffc))
* auto-strip the Drupal 8 attributes object from schema to fix JSON Schema Form errors ([fb7c04e](https://github.com/bolt-design-system/bolt/commit/fb7c04e))
* downgrade Twig version — fixes build issues encountered otherwise ([040e3a5](https://github.com/bolt-design-system/bolt/commit/040e3a5))
* ensure the version selector exists before firing off JS logic ([086a07c](https://github.com/bolt-design-system/bolt/commit/086a07c))
* fix broken image paths in docs ([fcf9f83](https://github.com/bolt-design-system/bolt/commit/fcf9f83))
* fix internal selector used to reset schema form ([f519bd2](https://github.com/bolt-design-system/bolt/commit/f519bd2))
* re-enable schema validation for pattern lab but keep disabled for the docs site till 500 server error is troubleshooted ([ada76ef](https://github.com/bolt-design-system/bolt/commit/ada76ef))
* remove custom element link demo — replaced by newer section in PL ([11e109a](https://github.com/bolt-design-system/bolt/commit/11e109a))
* revert link demo in PL + fix image path ([8a2e040](https://github.com/bolt-design-system/bolt/commit/8a2e040))
* selectively porting over Bolt fixes from master to address v2.3.0 issues flagged during QA ([c1d02ed](https://github.com/bolt-design-system/bolt/commit/c1d02ed))
* temporarily disable width-specific utility class demo till divide by zero issue is fixed ([0c19959](https://github.com/bolt-design-system/bolt/commit/0c19959))
* update composer dependencies ([2bae7fe](https://github.com/bolt-design-system/bolt/commit/2bae7fe))
* updating schema form + temporarily disabling lang settings to work with component previews in Pattern Lab; updating CORS settings ([bf6795e](https://github.com/bolt-design-system/bolt/commit/bf6795e))


### Features

* add basic <optgroup> support to the version selector + auto display the correct version of the design system when the version selector loads. changes necessary in order to avoid UX issues with this + any future hotfix releases ([3962287](https://github.com/bolt-design-system/bolt/commit/3962287))
* allow <bolt-select> to optionally disable search ([5d95c4c](https://github.com/bolt-design-system/bolt/commit/5d95c4c))
* disable the video player cue points plugin by default ([307b51a](https://github.com/bolt-design-system/bolt/commit/307b51a))
* update component docs template in Pattern Lab to include a proper intro section for the component explorer UI; add pre-rendered HTML to help with initial page loading experience ([fefb007](https://github.com/bolt-design-system/bolt/commit/fefb007))
* update Pattern Lab custom styles to hide the docs-specific code viewer accordion ([2815cab](https://github.com/bolt-design-system/bolt/commit/2815cab))





# [2.3.0](https://github.com/bolt-design-system/bolt/compare/v2.3.0-rc.0...v2.3.0) (2019-01-30)


### Bug Fixes

* selectively porting over Bolt fixes from master to address v2.3.0 issues flagged during QA ([c1d02ed](https://github.com/bolt-design-system/bolt/commit/c1d02ed))


### Features

* disable the video player cue points plugin by default ([307b51a](https://github.com/bolt-design-system/bolt/commit/307b51a))
