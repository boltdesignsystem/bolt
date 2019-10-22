# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.9.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.8.3...v2.9.0) (2019-10-22)

**Note:** Version bump only for package @bolt/components-animate





## [2.8.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.8.0...v2.8.1) (2019-10-16)

**Note:** Version bump only for package @bolt/components-animate





# [2.8.0](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)


### Bug Fixes

* **bolt-animate:** remove use of Set, polyfill breaking erratically ([c0e53a4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/c0e53a4))
* more robust animation resets to allow retrigger when no idle or build out is defined ([4d1c3b1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/4d1c3b1))


### Features

* **micro-journeys:** add ms hint to animate title schemas ([9c14f46](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/9c14f46))





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)


### Features

* speed up default exit animation to create a smoother experience ([efe8425](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/efe8425))





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)


### Bug Fixes

* **bolt-animate:** add debug to triggerAnimOnEls ([d3c5a54](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/d3c5a54))
* **bolt-animate:** safari animation fixes ([b1f1399](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/b1f1399))
* **with-without:** animation fixes ([7dd96cf](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/7dd96cf))


### Features

* **bolt-animate:** add debug flag for determining animation sequencing ([ca3abfb](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/ca3abfb))
* **with-without:** WIP mobile theming ([7109dc6](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/7109dc6))





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* add ability to set no anim for idle and out ([2d92d39](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/2d92d39))
* **animate:** prevent animation events from bubbling up ([0294dfd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/0294dfd))
* add missing animation styles back ([d30c52d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/d30c52d))
* ensure any anim stage combos work ([bf80bf3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/bf80bf3))
* idle animation timing to linear ([e005c04](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/e005c04))
* **animate:** ensure trigger only happens if animation present ([74f3dd8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/74f3dd8))
* **animate:** IE11 animate trigger build in ([9c3606b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/9c3606b))
* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/0dfd86c))
* **animate:** if animation doesn't finish by the time it should, move to next ([a550afe](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/a550afe))
* **animate:** remove is='shadow-root' ([8b9be23](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/8b9be23))
* **bolt-animate:** remove animation-delay of 0 and force animation-duration to be 1 to fix Safari ([#1405](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1405)) ([72e0b4f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/72e0b4f))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/c261314))


### Features

* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/822face))
* begin icon group, WIP blocked by needed bolt-icon work ([6618c3f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/6618c3f))
* create bolt-animate component ([966315b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/966315b))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/c8fec87))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/f5bbd9a))
* step triggering build in and build outs ([791ca88](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/791ca88))
* **animate:** can add show-meta attribute ([38c15f9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/38c15f9))
* **bolt-animate:** add debug optional debug flag ([#1404](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1404)) ([3ab4b3c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/3ab4b3c))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/8002a26))





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* add ability to set no anim for idle and out ([2d92d39](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/2d92d39))
* **animate:** prevent animation events from bubbling up ([0294dfd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/0294dfd))
* add missing animation styles back ([d30c52d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/d30c52d))
* ensure any anim stage combos work ([bf80bf3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/bf80bf3))
* idle animation timing to linear ([e005c04](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/e005c04))
* **animate:** ensure trigger only happens if animation present ([74f3dd8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/74f3dd8))
* **animate:** IE11 animate trigger build in ([9c3606b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/9c3606b))
* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/0dfd86c))
* **animate:** if animation doesn't finish by the time it should, move to next ([a550afe](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/a550afe))
* **animate:** remove is='shadow-root' ([8b9be23](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/8b9be23))
* **bolt-animate:** remove animation-delay of 0 and force animation-duration to be 1 to fix Safari ([#1405](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1405)) ([72e0b4f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/72e0b4f))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/c261314))


### Features

* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/822face))
* begin icon group, WIP blocked by needed bolt-icon work ([6618c3f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/6618c3f))
* create bolt-animate component ([966315b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/966315b))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/c8fec87))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/f5bbd9a))
* step triggering build in and build outs ([791ca88](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/791ca88))
* **animate:** can add show-meta attribute ([38c15f9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/38c15f9))
* **bolt-animate:** add debug optional debug flag ([#1404](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1404)) ([3ab4b3c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/3ab4b3c))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/8002a26))





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)


### Bug Fixes

* add ability to set no anim for idle and out ([2d92d39](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/2d92d39))
* **animate:** prevent animation events from bubbling up ([0294dfd](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/0294dfd))
* add missing animation styles back ([d30c52d](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/d30c52d))
* ensure any anim stage combos work ([bf80bf3](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/bf80bf3))
* idle animation timing to linear ([e005c04](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/e005c04))
* **animate:** ensure trigger only happens if animation present ([74f3dd8](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/74f3dd8))
* **animate:** IE11 animate trigger build in ([9c3606b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/9c3606b))
* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/0dfd86c))
* **animate:** if animation doesn't finish by the time it should, move to next ([a550afe](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/a550afe))
* **animate:** remove is='shadow-root' ([8b9be23](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/8b9be23))
* **bolt-animate:** remove animation-delay of 0 and force animation-duration to be 1 to fix Safari ([#1405](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1405)) ([72e0b4f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/72e0b4f))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/c261314))


### Features

* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/822face))
* begin icon group, WIP blocked by needed bolt-icon work ([6618c3f](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/6618c3f))
* create bolt-animate component ([966315b](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/966315b))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/c8fec87))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/f5bbd9a))
* step triggering build in and build outs ([791ca88](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/791ca88))
* **animate:** can add show-meta attribute ([38c15f9](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/38c15f9))
* **bolt-animate:** add debug optional debug flag ([#1404](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/issues/1404)) ([3ab4b3c](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/3ab4b3c))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/tree/master/packages/components/bolt-animate/commit/8002a26))
