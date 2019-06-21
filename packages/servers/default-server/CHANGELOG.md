# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.5.1](https://github.com/bolt-design-system/bolt/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package @bolt/default-server





## [2.4.3](https://github.com/bolt-design-system/bolt/compare/v2.4.2...v2.4.3) (2019-05-31)


### Bug Fixes

* globally update non-private package.json files with devDependencies and peerDependencies that might not get installed as expected when used / published outside of the Bolt monorepo ([617bd86](https://github.com/bolt-design-system/bolt/commit/617bd86))





## [2.4.2](https://github.com/bolt-design-system/bolt/compare/v2.4.1...v2.4.2) (2019-05-24)


### Bug Fixes

* temp workaround to Docker error ([a1d7ea3](https://github.com/bolt-design-system/bolt/commit/a1d7ea3))





# [2.4.0](https://github.com/bolt-design-system/bolt/compare/v2.3.2...v2.4.0) (2019-05-14)


### Bug Fixes

* update publicConfig to address monorepo Jest test ([819a4c1](https://github.com/bolt-design-system/bolt/commit/819a4c1))
* version bump globby + semantic version packages to resolve node-glob yarn install errors being periodically encountered ([99d54e8](https://github.com/bolt-design-system/bolt/commit/99d54e8))



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* hotfix for likely root cause of recent now.sh deployments to fail ([1b204ad](https://github.com/bolt-design-system/bolt/commit/1b204ad))
* re-test with additional dockerfile updates ([300ec85](https://github.com/bolt-design-system/bolt/commit/300ec85))
* remove dependency loop between packages ([b43fc34](https://github.com/bolt-design-system/bolt/commit/b43fc34))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/commit/f4bfa64))
* update PHP install task in Docker container ([47fb5e0](https://github.com/bolt-design-system/bolt/commit/47fb5e0))


### Features

* automatically switch between a simple static now.sh deployment vs a full docker-based deployment based on the branch ([7d56566](https://github.com/bolt-design-system/bolt/commit/7d56566))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* hotfix for likely root cause of recent now.sh deployments to fail ([1b204ad](https://github.com/bolt-design-system/bolt/commit/1b204ad))
* re-test with additional dockerfile updates ([300ec85](https://github.com/bolt-design-system/bolt/commit/300ec85))
* remove dependency loop between packages ([b43fc34](https://github.com/bolt-design-system/bolt/commit/b43fc34))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/commit/f4bfa64))
* update PHP install task in Docker container ([47fb5e0](https://github.com/bolt-design-system/bolt/commit/47fb5e0))


### Features

* automatically switch between a simple static now.sh deployment vs a full docker-based deployment based on the branch ([7d56566](https://github.com/bolt-design-system/bolt/commit/7d56566))
