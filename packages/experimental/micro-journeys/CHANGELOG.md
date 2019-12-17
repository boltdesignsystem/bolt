# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.13.0](https://github.com/bolt-design-system/bolt/compare/v2.12.1...v2.13.0) (2019-12-13)


### Bug Fixes

* **editor:** restore pathways editable traits; fix opacity: 0 ([6a1fa98](https://github.com/bolt-design-system/bolt/commit/6a1fa98))
* emit "ready" event only when interactive pathway is actually ready ([a291eae](https://github.com/bolt-design-system/bolt/commit/a291eae))
* Remove slot-based CSS selector so color works in IE ([fee836f](https://github.com/bolt-design-system/bolt/commit/fee836f))


### Features

* **editor:** add ability to remove icon from status-dialogue-bar ([cc58925](https://github.com/bolt-design-system/bolt/commit/cc58925))





## [2.12.1](https://github.com/bolt-design-system/bolt/compare/v2.12.0...v2.12.1) (2019-12-12)

**Note:** Version bump only for package @bolt/micro-journeys





# [2.12.0](https://github.com/bolt-design-system/bolt/compare/v2.11.4...v2.12.0) (2019-11-26)

**Note:** Version bump only for package @bolt/micro-journeys





## [2.11.2](https://github.com/bolt-design-system/bolt/compare/v2.11.1...v2.11.2) (2019-11-14)

**Note:** Version bump only for package @bolt/micro-journeys





# [2.11.0](https://github.com/bolt-design-system/bolt/compare/v2.10.0...v2.11.0) (2019-11-14)


### Bug Fixes

* **micro-journeys:** clean up equalizeRelativeHeights; fix tryAttempts persistence bug ([5653901](https://github.com/bolt-design-system/bolt/commit/5653901))
* **micro-journeys:** css cleanup ([913c49c](https://github.com/bolt-design-system/bolt/commit/913c49c))
* **micro-journeys:** don't render inactive pathway; fix render issues on pathway and step ([ee741e1](https://github.com/bolt-design-system/bolt/commit/ee741e1))
* **micro-journeys:** Edge fix for equalizeRelativeHeights, replace x and y with left and top ([afb1531](https://github.com/bolt-design-system/bolt/commit/afb1531))
* **micro-journeys:** fix bolt-link usage with bolt-icon ([cc1cae0](https://github.com/bolt-design-system/bolt/commit/cc1cae0))
* **micro-journeys:** IE 11 fixes for bolt character and connection ([9f99228](https://github.com/bolt-design-system/bolt/commit/9f99228))
* **micro-journeys:** make dialog bar match comps in width; remove br tags from starters ([ecbcf8a](https://github.com/bolt-design-system/bolt/commit/ecbcf8a))
* **micro-journeys:** move link component to use slot-after for icon ([bae9819](https://github.com/bolt-design-system/bolt/commit/bae9819))
* **micro-journeys:** prevent render of content if not active step. Does not work w/o shadow dom. ([12094e9](https://github.com/bolt-design-system/bolt/commit/12094e9))
* **micro-journeys:** refactor two-char layout to control its own animation in and out ([05dc857](https://github.com/bolt-design-system/bolt/commit/05dc857))
* **micro-journeys:** restore file to pre-ie-11 fix attempt meddling ([f7f8f8a](https://github.com/bolt-design-system/bolt/commit/f7f8f8a))
* **micro-journeys:** tighten up spacing around character and two-character elements to match comps ([01bb7c6](https://github.com/bolt-design-system/bolt/commit/01bb7c6))


### Features

* **micro-journey:** add export of bolt connection is ([fe61771](https://github.com/bolt-design-system/bolt/commit/fe61771))
* **micro-journey:** adding name exports and prepping for IE 11 work, layout fixes ([6ec09e6](https://github.com/bolt-design-system/bolt/commit/6ec09e6))
* **micro-journeys:** prevent body content render on inactive steps ([019a0ea](https://github.com/bolt-design-system/bolt/commit/019a0ea))
* **micro-journeys:** refactor character, dialog, and 2-char layout to cooperate with document flow ([33471a3](https://github.com/bolt-design-system/bolt/commit/33471a3))
* **micro-journeys:** starter templates for one and two character ([10bea16](https://github.com/bolt-design-system/bolt/commit/10bea16))





# [2.10.0](https://github.com/bolt-design-system/bolt/compare/v2.9.2...v2.10.0) (2019-10-29)


### Bug Fixes

* **micro-journeys:** add support for line wrapping to nav ([e0bcb71](https://github.com/bolt-design-system/bolt/commit/e0bcb71))
* **micro-journeys:** dot-and-line nav squished on mobile with overlong text ([121e7f0](https://github.com/bolt-design-system/bolt/commit/121e7f0))
* **micro-journeys:** tighten dialog icon spacing ([8c42eac](https://github.com/bolt-design-system/bolt/commit/8c42eac))





## [2.9.2](https://github.com/bolt-design-system/bolt/compare/v2.9.1...v2.9.2) (2019-10-23)

**Note:** Version bump only for package @bolt/micro-journeys





# [2.9.0](https://github.com/bolt-design-system/bolt/compare/v2.8.3...v2.9.0) (2019-10-22)


### Bug Fixes

* **micro-journeys:** black text in dropdown in IE 11 ([fc38211](https://github.com/bolt-design-system/bolt/commit/fc38211))





## [2.8.1](https://github.com/bolt-design-system/bolt/compare/v2.8.0...v2.8.1) (2019-10-16)

**Note:** Version bump only for package @bolt/micro-journeys





# [2.8.0](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)


### Features

* **editor:** hide pathways image options ([2536517](https://github.com/bolt-design-system/bolt/commit/2536517))
* **micro-journeys:** add icon-group to PL; spelling fixes ([46a8782](https://github.com/bolt-design-system/bolt/commit/46a8782))





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)


### Bug Fixes

* **micro-journeys:** Context JS error when animations have no parent bolt-interactive-pathways w/ context ([44f85b0](https://github.com/bolt-design-system/bolt/commit/44f85b0))
* **micro-journeys:** fix dropdown text color in IE 11 ([92ac37c](https://github.com/bolt-design-system/bolt/commit/92ac37c))
* **micro-journeys:** fix IntersectionObserver on IE 11 ([fd15c6e](https://github.com/bolt-design-system/bolt/commit/fd15c6e))
* **micro-journeys:** ie 11 color fixes ([c60ca03](https://github.com/bolt-design-system/bolt/commit/c60ca03))
* **micro-journeys:** lots of IE 11 fixes ([e68ced3](https://github.com/bolt-design-system/bolt/commit/e68ced3))
* update all micro journey cta to use bolt link over text ([228f659](https://github.com/bolt-design-system/bolt/commit/228f659))
* **micro-journeys:** prevent rapid click of steps from showing multiple steps ([cc0f7d8](https://github.com/bolt-design-system/bolt/commit/cc0f7d8))
* address linting issues ([03f30b5](https://github.com/bolt-design-system/bolt/commit/03f30b5))
* fix eslint issues ([b95aa72](https://github.com/bolt-design-system/bolt/commit/b95aa72))
* fix overflow issue on smaller screen sizes ([e50c081](https://github.com/bolt-design-system/bolt/commit/e50c081))
* incorret character schema default fixed ([e92cc0d](https://github.com/bolt-design-system/bolt/commit/e92cc0d))
* multiple layout fixes for micro journeys on small-ish screen sizes ([97af5d0](https://github.com/bolt-design-system/bolt/commit/97af5d0))
* remove click event listener when disconnecting + remove preventDefault that was causing UI like buttons to not click as expected as a result ([a3a0a71](https://github.com/bolt-design-system/bolt/commit/a3a0a71))
* update connection band to re-trigger an update when the context changes ([113d34c](https://github.com/bolt-design-system/bolt/commit/113d34c))
* update prettier issues ([bcda2f5](https://github.com/bolt-design-system/bolt/commit/bcda2f5))
* update Sass to use bolt-theme outside of a media query + add border color to styles ([7c68d1f](https://github.com/bolt-design-system/bolt/commit/7c68d1f))
* z-index clash between dropdown menu and status bars ([61d5567](https://github.com/bolt-design-system/bolt/commit/61d5567))


### Features

* add animated dot styles + todo comment to enable ([4bdbed4](https://github.com/bolt-design-system/bolt/commit/4bdbed4))
* add theme support to interactive-pathways via withContext and defineContext ([eb32484](https://github.com/bolt-design-system/bolt/commit/eb32484))
* custom dropdown closes with you select an option ([7c7da6b](https://github.com/bolt-design-system/bolt/commit/7c7da6b))
* expose props to edit the image atop the interactive pathways co… ([#1411](https://github.com/bolt-design-system/bolt/issues/1411)) ([9fe1993](https://github.com/bolt-design-system/bolt/commit/9fe1993))
* pathways dropdown closes with a new pathway is selected ([ceadc0c](https://github.com/bolt-design-system/bolt/commit/ceadc0c))
* **micro-journeys:** add theme consumer to interactive-step; lint scss ([03b09ab](https://github.com/bolt-design-system/bolt/commit/03b09ab))
* **svg-animations:** theme switching for animations ([0b7df25](https://github.com/bolt-design-system/bolt/commit/0b7df25))


### Reverts

* revert combining withLitHTML base with withLitContext for now ([ca828da](https://github.com/bolt-design-system/bolt/commit/ca828da))





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)

**Note:** Version bump only for package @bolt/micro-journeys





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/commit/0dfd86c))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **interactive-step:** active dot ff/chrome left pos discrepancy ([7f33edf](https://github.com/bolt-design-system/bolt/commit/7f33edf))
* **interactive-step:** add padding for nav dot truncation ([c89d4e4](https://github.com/bolt-design-system/bolt/commit/c89d4e4))
* **interactive-step:** IE 11 bottom slot layout ([5afac18](https://github.com/bolt-design-system/bolt/commit/5afac18))
* **interactive-step:** last step padding fix; consolidate padding vars ([04f7d06](https://github.com/bolt-design-system/bolt/commit/04f7d06))
* lint fixes ([b13742c](https://github.com/bolt-design-system/bolt/commit/b13742c))
* **interactive-step:** mobile styling: bolt-connection content overflow; desktop nav padding; fix mobile issues ([408e0bb](https://github.com/bolt-design-system/bolt/commit/408e0bb))
* **interactive-step:** mobile styling: line strikethrough; body padding ([e6f9f80](https://github.com/bolt-design-system/bolt/commit/e6f9f80))
* **micro-journeys:** add missing styles for IE11 ([f81cef0](https://github.com/bolt-design-system/bolt/commit/f81cef0))
* **micro-journeys:** adjust animation config for examples ([1a4646e](https://github.com/bolt-design-system/bolt/commit/1a4646e))
* **micro-journeys:** correct schema import ([8768622](https://github.com/bolt-design-system/bolt/commit/8768622))
* **micro-journeys:** fix horizontal scroll problem; responsiveness for bolt-connection ([b1ad432](https://github.com/bolt-design-system/bolt/commit/b1ad432))
* **micro-journeys:** fixes for no shadow dom, mostly icons ([52b3791](https://github.com/bolt-design-system/bolt/commit/52b3791))
* **micro-journeys:** importing dropdown scss ([aa9dcd1](https://github.com/bolt-design-system/bolt/commit/aa9dcd1))
* **micro-journeys:** increase robustness of parent-child components ([84bd753](https://github.com/bolt-design-system/bolt/commit/84bd753))
* **micro-journeys:** move pathway title to attribute ([ef4e303](https://github.com/bolt-design-system/bolt/commit/ef4e303))
* **micro-journeys:** pathways should wait for children ([b88ce14](https://github.com/bolt-design-system/bolt/commit/b88ce14))
* **micro-journeys:** remove [is=shadow-root] from shadow dom ([1b5a387](https://github.com/bolt-design-system/bolt/commit/1b5a387))
* **micro-journeys:** remove transform from connection band to fix ie 11 ([fd49331](https://github.com/bolt-design-system/bolt/commit/fd49331))
* **micro-journeys:** set correct local version of dropdown dependency ([b21b148](https://github.com/bolt-design-system/bolt/commit/b21b148))
* **micro-journeys:** set status-dialog-bar to inline-block ([e193087](https://github.com/bolt-design-system/bolt/commit/e193087))
* **micro-journeys:** show pathways title in non-shadow dom ([7f92bb7](https://github.com/bolt-design-system/bolt/commit/7f92bb7))
* **micro-journeys:** strikethrough line alignment and padding fix ([9bb74b4](https://github.com/bolt-design-system/bolt/commit/9bb74b4))
* **micro-journeys:** switch active tab before triggering new anims ([4ff500c](https://github.com/bolt-design-system/bolt/commit/4ff500c))
* **micro-journeys-dropdown:** add pointer on menu item hover ([55aa7a8](https://github.com/bolt-design-system/bolt/commit/55aa7a8))
* **micro-journeys-dropdown:** bump version of dropdown fixing no action on click ([19084d8](https://github.com/bolt-design-system/bolt/commit/19084d8))
* **micro-journeys-dropdown:** correct z-index higher than error overlay ([d9cd353](https://github.com/bolt-design-system/bolt/commit/d9cd353))
* **micro-journeys-dropdown:** properly add colors with bolt_theme ([0a52ccb](https://github.com/bolt-design-system/bolt/commit/0a52ccb))
* **micro-journeys-dropdown:** super.render() crash ([dffa91e](https://github.com/bolt-design-system/bolt/commit/dffa91e))
* **pathway:** IE 11 layout ([da4b151](https://github.com/bolt-design-system/bolt/commit/da4b151))
* **pathways:** restore menu broken by pathways instead of this.pathways ([a3f1d79](https://github.com/bolt-design-system/bolt/commit/a3f1d79))
* micro journey misc styling ([#1352](https://github.com/bolt-design-system/bolt/issues/1352)) ([9b38f72](https://github.com/bolt-design-system/bolt/commit/9b38f72))
* **status-dialogue-bar:** force black text; remove bolt-text passed to dialog; widen left/right padding ([6a4760f](https://github.com/bolt-design-system/bolt/commit/6a4760f))
* character with "none" for svg-anim ([7fd417c](https://github.com/bolt-design-system/bolt/commit/7fd417c))
* lint fix ([34f1143](https://github.com/bolt-design-system/bolt/commit/34f1143))
* lint fixes ([9037645](https://github.com/bolt-design-system/bolt/commit/9037645))
* lint fixes ([6e606ef](https://github.com/bolt-design-system/bolt/commit/6e606ef))
* lint fixes ([af1642f](https://github.com/bolt-design-system/bolt/commit/af1642f))
* lint fixes ([836b3c8](https://github.com/bolt-design-system/bolt/commit/836b3c8))
* **svg-animations:** show in IE11 ([7135e3c](https://github.com/bolt-design-system/bolt/commit/7135e3c))
* make sure Dropdown isn't double-defined + workaround to fix Dropdown component rendering / interaction when being extended in MicroJourneysDropdown ([74d22a4](https://github.com/bolt-design-system/bolt/commit/74d22a4))
* mobile styling of status bars, no longer overlap ([4905840](https://github.com/bolt-design-system/bolt/commit/4905840))
* pull out imports of scss animations package ([fd1f33d](https://github.com/bolt-design-system/bolt/commit/fd1f33d))
* styling and theme override ([d8fb3f8](https://github.com/bolt-design-system/bolt/commit/d8fb3f8))
* trigger active pathway from pathways ([057dd0a](https://github.com/bolt-design-system/bolt/commit/057dd0a))


### Features

* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))
* **micro-journeys:** exposing multiple schemas ([460b7c6](https://github.com/bolt-design-system/bolt/commit/460b7c6))
* **micro-journeys:** extend bolt dropdown and theme to comps ([03c52e2](https://github.com/bolt-design-system/bolt/commit/03c52e2))
* **micro-journeys:** extend bolt-dropdown ([d8a9652](https://github.com/bolt-design-system/bolt/commit/d8a9652))
* **micro-journeys:** hide everything till ready ([71d4f55](https://github.com/bolt-design-system/bolt/commit/71d4f55))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/commit/8a2f14e))
* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add custom cta with icon component ([05382a3](https://github.com/bolt-design-system/bolt/commit/05382a3))
* add lorem impsum starters for the step top and bottom ([08e99e2](https://github.com/bolt-design-system/bolt/commit/08e99e2))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add triple band to one of the demo steps ([b159b1f](https://github.com/bolt-design-system/bolt/commit/b159b1f))
* dropdown and nav cleanup ([4aba778](https://github.com/bolt-design-system/bolt/commit/4aba778))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/commit/c8fec87))
* one character layout and bug fixes ([815c0dc](https://github.com/bolt-design-system/bolt/commit/815c0dc))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/commit/f5bbd9a))
* transfer image assests into micro journey package ([0a7032e](https://github.com/bolt-design-system/bolt/commit/0a7032e))
* update character to work with both pre-defined img and custom url ([753b258](https://github.com/bolt-design-system/bolt/commit/753b258))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* wip transfer to new package structure, new PL docs ([7627e83](https://github.com/bolt-design-system/bolt/commit/7627e83))





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/commit/0dfd86c))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **interactive-step:** active dot ff/chrome left pos discrepancy ([7f33edf](https://github.com/bolt-design-system/bolt/commit/7f33edf))
* **interactive-step:** add padding for nav dot truncation ([c89d4e4](https://github.com/bolt-design-system/bolt/commit/c89d4e4))
* **interactive-step:** IE 11 bottom slot layout ([5afac18](https://github.com/bolt-design-system/bolt/commit/5afac18))
* **interactive-step:** last step padding fix; consolidate padding vars ([04f7d06](https://github.com/bolt-design-system/bolt/commit/04f7d06))
* lint fixes ([b13742c](https://github.com/bolt-design-system/bolt/commit/b13742c))
* **interactive-step:** mobile styling: bolt-connection content overflow; desktop nav padding; fix mobile issues ([408e0bb](https://github.com/bolt-design-system/bolt/commit/408e0bb))
* **interactive-step:** mobile styling: line strikethrough; body padding ([e6f9f80](https://github.com/bolt-design-system/bolt/commit/e6f9f80))
* **micro-journeys:** add missing styles for IE11 ([f81cef0](https://github.com/bolt-design-system/bolt/commit/f81cef0))
* **micro-journeys:** adjust animation config for examples ([1a4646e](https://github.com/bolt-design-system/bolt/commit/1a4646e))
* **micro-journeys:** correct schema import ([8768622](https://github.com/bolt-design-system/bolt/commit/8768622))
* **micro-journeys:** fix horizontal scroll problem; responsiveness for bolt-connection ([b1ad432](https://github.com/bolt-design-system/bolt/commit/b1ad432))
* **micro-journeys:** fixes for no shadow dom, mostly icons ([52b3791](https://github.com/bolt-design-system/bolt/commit/52b3791))
* **micro-journeys:** importing dropdown scss ([aa9dcd1](https://github.com/bolt-design-system/bolt/commit/aa9dcd1))
* **micro-journeys:** increase robustness of parent-child components ([84bd753](https://github.com/bolt-design-system/bolt/commit/84bd753))
* **micro-journeys:** move pathway title to attribute ([ef4e303](https://github.com/bolt-design-system/bolt/commit/ef4e303))
* **micro-journeys:** pathways should wait for children ([b88ce14](https://github.com/bolt-design-system/bolt/commit/b88ce14))
* **micro-journeys:** remove [is=shadow-root] from shadow dom ([1b5a387](https://github.com/bolt-design-system/bolt/commit/1b5a387))
* **micro-journeys:** remove transform from connection band to fix ie 11 ([fd49331](https://github.com/bolt-design-system/bolt/commit/fd49331))
* **micro-journeys:** set correct local version of dropdown dependency ([b21b148](https://github.com/bolt-design-system/bolt/commit/b21b148))
* **micro-journeys:** set status-dialog-bar to inline-block ([e193087](https://github.com/bolt-design-system/bolt/commit/e193087))
* **micro-journeys:** show pathways title in non-shadow dom ([7f92bb7](https://github.com/bolt-design-system/bolt/commit/7f92bb7))
* **micro-journeys:** strikethrough line alignment and padding fix ([9bb74b4](https://github.com/bolt-design-system/bolt/commit/9bb74b4))
* **micro-journeys:** switch active tab before triggering new anims ([4ff500c](https://github.com/bolt-design-system/bolt/commit/4ff500c))
* **micro-journeys-dropdown:** add pointer on menu item hover ([55aa7a8](https://github.com/bolt-design-system/bolt/commit/55aa7a8))
* **micro-journeys-dropdown:** bump version of dropdown fixing no action on click ([19084d8](https://github.com/bolt-design-system/bolt/commit/19084d8))
* **micro-journeys-dropdown:** correct z-index higher than error overlay ([d9cd353](https://github.com/bolt-design-system/bolt/commit/d9cd353))
* **micro-journeys-dropdown:** properly add colors with bolt_theme ([0a52ccb](https://github.com/bolt-design-system/bolt/commit/0a52ccb))
* **micro-journeys-dropdown:** super.render() crash ([dffa91e](https://github.com/bolt-design-system/bolt/commit/dffa91e))
* **pathway:** IE 11 layout ([da4b151](https://github.com/bolt-design-system/bolt/commit/da4b151))
* **pathways:** restore menu broken by pathways instead of this.pathways ([a3f1d79](https://github.com/bolt-design-system/bolt/commit/a3f1d79))
* micro journey misc styling ([#1352](https://github.com/bolt-design-system/bolt/issues/1352)) ([9b38f72](https://github.com/bolt-design-system/bolt/commit/9b38f72))
* **status-dialogue-bar:** force black text; remove bolt-text passed to dialog; widen left/right padding ([6a4760f](https://github.com/bolt-design-system/bolt/commit/6a4760f))
* character with "none" for svg-anim ([7fd417c](https://github.com/bolt-design-system/bolt/commit/7fd417c))
* lint fix ([34f1143](https://github.com/bolt-design-system/bolt/commit/34f1143))
* lint fixes ([9037645](https://github.com/bolt-design-system/bolt/commit/9037645))
* lint fixes ([6e606ef](https://github.com/bolt-design-system/bolt/commit/6e606ef))
* lint fixes ([af1642f](https://github.com/bolt-design-system/bolt/commit/af1642f))
* lint fixes ([836b3c8](https://github.com/bolt-design-system/bolt/commit/836b3c8))
* **svg-animations:** show in IE11 ([7135e3c](https://github.com/bolt-design-system/bolt/commit/7135e3c))
* make sure Dropdown isn't double-defined + workaround to fix Dropdown component rendering / interaction when being extended in MicroJourneysDropdown ([74d22a4](https://github.com/bolt-design-system/bolt/commit/74d22a4))
* mobile styling of status bars, no longer overlap ([4905840](https://github.com/bolt-design-system/bolt/commit/4905840))
* pull out imports of scss animations package ([fd1f33d](https://github.com/bolt-design-system/bolt/commit/fd1f33d))
* styling and theme override ([d8fb3f8](https://github.com/bolt-design-system/bolt/commit/d8fb3f8))
* trigger active pathway from pathways ([057dd0a](https://github.com/bolt-design-system/bolt/commit/057dd0a))


### Features

* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))
* **micro-journeys:** exposing multiple schemas ([460b7c6](https://github.com/bolt-design-system/bolt/commit/460b7c6))
* **micro-journeys:** extend bolt dropdown and theme to comps ([03c52e2](https://github.com/bolt-design-system/bolt/commit/03c52e2))
* **micro-journeys:** extend bolt-dropdown ([d8a9652](https://github.com/bolt-design-system/bolt/commit/d8a9652))
* **micro-journeys:** hide everything till ready ([71d4f55](https://github.com/bolt-design-system/bolt/commit/71d4f55))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/commit/8a2f14e))
* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add custom cta with icon component ([05382a3](https://github.com/bolt-design-system/bolt/commit/05382a3))
* add lorem impsum starters for the step top and bottom ([08e99e2](https://github.com/bolt-design-system/bolt/commit/08e99e2))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add triple band to one of the demo steps ([b159b1f](https://github.com/bolt-design-system/bolt/commit/b159b1f))
* dropdown and nav cleanup ([4aba778](https://github.com/bolt-design-system/bolt/commit/4aba778))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/commit/c8fec87))
* one character layout and bug fixes ([815c0dc](https://github.com/bolt-design-system/bolt/commit/815c0dc))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/commit/f5bbd9a))
* transfer image assests into micro journey package ([0a7032e](https://github.com/bolt-design-system/bolt/commit/0a7032e))
* update character to work with both pre-defined img and custom url ([753b258](https://github.com/bolt-design-system/bolt/commit/753b258))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* wip transfer to new package structure, new PL docs ([7627e83](https://github.com/bolt-design-system/bolt/commit/7627e83))





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)


### Bug Fixes

* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/commit/0dfd86c))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **interactive-step:** active dot ff/chrome left pos discrepancy ([7f33edf](https://github.com/bolt-design-system/bolt/commit/7f33edf))
* **interactive-step:** add padding for nav dot truncation ([c89d4e4](https://github.com/bolt-design-system/bolt/commit/c89d4e4))
* lint fixes ([836b3c8](https://github.com/bolt-design-system/bolt/commit/836b3c8))
* **interactive-step:** IE 11 bottom slot layout ([5afac18](https://github.com/bolt-design-system/bolt/commit/5afac18))
* **interactive-step:** last step padding fix; consolidate padding vars ([04f7d06](https://github.com/bolt-design-system/bolt/commit/04f7d06))
* **interactive-step:** mobile styling: bolt-connection content overflow; desktop nav padding; fix mobile issues ([408e0bb](https://github.com/bolt-design-system/bolt/commit/408e0bb))
* **interactive-step:** mobile styling: line strikethrough; body padding ([e6f9f80](https://github.com/bolt-design-system/bolt/commit/e6f9f80))
* **micro-journeys:** add missing styles for IE11 ([f81cef0](https://github.com/bolt-design-system/bolt/commit/f81cef0))
* **micro-journeys:** adjust animation config for examples ([1a4646e](https://github.com/bolt-design-system/bolt/commit/1a4646e))
* **micro-journeys:** correct schema import ([8768622](https://github.com/bolt-design-system/bolt/commit/8768622))
* character with "none" for svg-anim ([7fd417c](https://github.com/bolt-design-system/bolt/commit/7fd417c))
* lint fix ([34f1143](https://github.com/bolt-design-system/bolt/commit/34f1143))
* lint fixes ([6e606ef](https://github.com/bolt-design-system/bolt/commit/6e606ef))
* lint fixes ([af1642f](https://github.com/bolt-design-system/bolt/commit/af1642f))
* lint fixes ([9037645](https://github.com/bolt-design-system/bolt/commit/9037645))
* lint fixes ([b13742c](https://github.com/bolt-design-system/bolt/commit/b13742c))
* **micro-journeys-dropdown:** properly add colors with bolt_theme ([0a52ccb](https://github.com/bolt-design-system/bolt/commit/0a52ccb))
* make sure Dropdown isn't double-defined + workaround to fix Dropdown component rendering / interaction when being extended in MicroJourneysDropdown ([74d22a4](https://github.com/bolt-design-system/bolt/commit/74d22a4))
* **micro-journeys:** fix horizontal scroll problem; responsiveness for bolt-connection ([b1ad432](https://github.com/bolt-design-system/bolt/commit/b1ad432))
* **micro-journeys:** fixes for no shadow dom, mostly icons ([52b3791](https://github.com/bolt-design-system/bolt/commit/52b3791))
* **micro-journeys:** importing dropdown scss ([aa9dcd1](https://github.com/bolt-design-system/bolt/commit/aa9dcd1))
* **micro-journeys:** increase robustness of parent-child components ([84bd753](https://github.com/bolt-design-system/bolt/commit/84bd753))
* **micro-journeys:** move pathway title to attribute ([ef4e303](https://github.com/bolt-design-system/bolt/commit/ef4e303))
* **micro-journeys:** pathways should wait for children ([b88ce14](https://github.com/bolt-design-system/bolt/commit/b88ce14))
* **micro-journeys:** remove [is=shadow-root] from shadow dom ([1b5a387](https://github.com/bolt-design-system/bolt/commit/1b5a387))
* **micro-journeys:** set status-dialog-bar to inline-block ([e193087](https://github.com/bolt-design-system/bolt/commit/e193087))
* **micro-journeys:** show pathways title in non-shadow dom ([7f92bb7](https://github.com/bolt-design-system/bolt/commit/7f92bb7))
* **micro-journeys:** strikethrough line alignment and padding fix ([9bb74b4](https://github.com/bolt-design-system/bolt/commit/9bb74b4))
* **micro-journeys:** switch active tab before triggering new anims ([4ff500c](https://github.com/bolt-design-system/bolt/commit/4ff500c))
* **micro-journeys-dropdown:** add pointer on menu item hover ([55aa7a8](https://github.com/bolt-design-system/bolt/commit/55aa7a8))
* **micro-journeys-dropdown:** bump version of dropdown fixing no action on click ([19084d8](https://github.com/bolt-design-system/bolt/commit/19084d8))
* **micro-journeys-dropdown:** correct z-index higher than error overlay ([d9cd353](https://github.com/bolt-design-system/bolt/commit/d9cd353))
* **micro-journeys-dropdown:** super.render() crash ([dffa91e](https://github.com/bolt-design-system/bolt/commit/dffa91e))
* **pathway:** IE 11 layout ([da4b151](https://github.com/bolt-design-system/bolt/commit/da4b151))
* **pathways:** restore menu broken by pathways instead of this.pathways ([a3f1d79](https://github.com/bolt-design-system/bolt/commit/a3f1d79))
* **status-dialogue-bar:** force black text; remove bolt-text passed to dialog; widen left/right padding ([6a4760f](https://github.com/bolt-design-system/bolt/commit/6a4760f))
* **svg-animations:** show in IE11 ([7135e3c](https://github.com/bolt-design-system/bolt/commit/7135e3c))
* micro journey misc styling ([#1352](https://github.com/bolt-design-system/bolt/issues/1352)) ([9b38f72](https://github.com/bolt-design-system/bolt/commit/9b38f72))
* mobile styling of status bars, no longer overlap ([4905840](https://github.com/bolt-design-system/bolt/commit/4905840))
* pull out imports of scss animations package ([fd1f33d](https://github.com/bolt-design-system/bolt/commit/fd1f33d))
* styling and theme override ([d8fb3f8](https://github.com/bolt-design-system/bolt/commit/d8fb3f8))
* trigger active pathway from pathways ([057dd0a](https://github.com/bolt-design-system/bolt/commit/057dd0a))


### Features

* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))
* **micro-journeys:** exposing multiple schemas ([460b7c6](https://github.com/bolt-design-system/bolt/commit/460b7c6))
* **micro-journeys:** extend bolt dropdown and theme to comps ([03c52e2](https://github.com/bolt-design-system/bolt/commit/03c52e2))
* **micro-journeys:** extend bolt-dropdown ([d8a9652](https://github.com/bolt-design-system/bolt/commit/d8a9652))
* **micro-journeys:** hide everything till ready ([71d4f55](https://github.com/bolt-design-system/bolt/commit/71d4f55))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/commit/8a2f14e))
* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add custom cta with icon component ([05382a3](https://github.com/bolt-design-system/bolt/commit/05382a3))
* add lorem impsum starters for the step top and bottom ([08e99e2](https://github.com/bolt-design-system/bolt/commit/08e99e2))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add triple band to one of the demo steps ([b159b1f](https://github.com/bolt-design-system/bolt/commit/b159b1f))
* dropdown and nav cleanup ([4aba778](https://github.com/bolt-design-system/bolt/commit/4aba778))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/commit/c8fec87))
* one character layout and bug fixes ([815c0dc](https://github.com/bolt-design-system/bolt/commit/815c0dc))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/commit/f5bbd9a))
* transfer image assests into micro journey package ([0a7032e](https://github.com/bolt-design-system/bolt/commit/0a7032e))
* update character to work with both pre-defined img and custom url ([753b258](https://github.com/bolt-design-system/bolt/commit/753b258))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* wip transfer to new package structure, new PL docs ([7627e83](https://github.com/bolt-design-system/bolt/commit/7627e83))
