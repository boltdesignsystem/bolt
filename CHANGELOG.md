# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.8.0](https://github.com/boltdesignsystem/bolt/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)


### Bug Fixes

* **bolt-animate:** remove use of Set, polyfill breaking erratically ([c0e53a4](https://github.com/boltdesignsystem/bolt/commit/c0e53a4))
* **editor:** make Move Up and Move Down buttons for Steps and Pathways ([da0e8f7](https://github.com/boltdesignsystem/bolt/commit/da0e8f7))
* **editor:** syntax error fix -- thank you tests ([408d7b6](https://github.com/boltdesignsystem/bolt/commit/408d7b6))
* **editor:** use package name for import ([433b01b](https://github.com/boltdesignsystem/bolt/commit/433b01b))
* **micro-journeys:** config for update of parents with event on editor removal; add events for step and pathway removal ([43b6419](https://github.com/boltdesignsystem/bolt/commit/43b6419))
* **self-drawing-circle:** move transforms outside of spin animation to fix Edge jerkiness ([2b8e70e](https://github.com/boltdesignsystem/bolt/commit/2b8e70e))
* **self-drawing-circle:** PL animation fix ([3bd8087](https://github.com/boltdesignsystem/bolt/commit/3bd8087))
* **self-drawing-circle:** rotation direction fix and spin stopping on reset ([4133d03](https://github.com/boltdesignsystem/bolt/commit/4133d03))
* **with-without:** add check for toggler, bail if not found; overload handleResize and call to fix overlap bug on tablet ([8030996](https://github.com/boltdesignsystem/bolt/commit/8030996))
* **with-without:** add padding right to with results block ([ab924b3](https://github.com/boltdesignsystem/bolt/commit/ab924b3))
* **with-without:** blur edge focus after toggle to remove ugly outline ([598f951](https://github.com/boltdesignsystem/bolt/commit/598f951))
* **with-without:** bottom blocks at beginning of xlarge overflowing height ([c995f91](https://github.com/boltdesignsystem/bolt/commit/c995f91))
* **with-without:** edge fixes; resize window after accordion open/close ([13ad441](https://github.com/boltdesignsystem/bolt/commit/13ad441))
* **with-without:** fix title bar overflow ([97aa9e4](https://github.com/boltdesignsystem/bolt/commit/97aa9e4))
* **with-without:** force full-bleed as per comps; simplify CSS in desktop circle for stability ([d65ba1d](https://github.com/boltdesignsystem/bolt/commit/d65ba1d))
* **with-without:** full-bleed force broken inside max-width ([40573d9](https://github.com/boltdesignsystem/bolt/commit/40573d9))
* adjust styles to reduce the gap between the Tooltip content vs Trigger ([f59f91d](https://github.com/boltdesignsystem/bolt/commit/f59f91d))
* more robust animation resets to allow retrigger when no idle or build out is defined ([4d1c3b1](https://github.com/boltdesignsystem/bolt/commit/4d1c3b1))
* update intersection observer logic to kick off the animations when the With/Without UI is 50% (or more) visible on the screen ([1976d5d](https://github.com/boltdesignsystem/bolt/commit/1976d5d))
* **with-without:** remove horizontal scroll when vertical scrollbar present on IE/Edge ([e5539e5](https://github.com/boltdesignsystem/bolt/commit/e5539e5))
* **with-without:** tablet height overflow on load; force resize ([91d7717](https://github.com/boltdesignsystem/bolt/commit/91d7717))


### Features

* **editor:** hide pathways image options ([2536517](https://github.com/boltdesignsystem/bolt/commit/2536517))
* **micro-journeys:** add icon-group to PL; spelling fixes ([46a8782](https://github.com/boltdesignsystem/bolt/commit/46a8782))
* **micro-journeys:** add ms hint to animate title schemas ([9c14f46](https://github.com/boltdesignsystem/bolt/commit/9c14f46))
* **with-without:** add visual cues to see if with-without properly breaks out of padding ([5203ce4](https://github.com/boltdesignsystem/bolt/commit/5203ce4))
* **with-without:** attempt toggle outline removal on hover-capable devices ([704f158](https://github.com/boltdesignsystem/bolt/commit/704f158))
* **with-without:** detect pointer hover and only remove focus if found ([4a3ca92](https://github.com/boltdesignsystem/bolt/commit/4a3ca92))
* **with-without:** fire animations on intersection; clean up dom querying ([636b379](https://github.com/boltdesignsystem/bolt/commit/636b379))
* **with-without:** isolated background visual test for with/without for ie11 debugging ([058d25f](https://github.com/boltdesignsystem/bolt/commit/058d25f))





# [2.8.0-beta.6](https://github.com/boltdesignsystem/bolt/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)


### Bug Fixes

* **editor:** prevent bug with inserting array of starter elements ([2bf865b](https://github.com/boltdesignsystem/bolt/commit/2bf865b))
* **editor:** remove empty <bolt-animate>s on save ([85212df](https://github.com/boltdesignsystem/bolt/commit/85212df))
* update with/without to use the latest version of Bolt Core ([78d3af1](https://github.com/boltdesignsystem/bolt/commit/78d3af1))
* **image:** prevent error where initialClasses were not defined in time ([37bbab6](https://github.com/boltdesignsystem/bolt/commit/37bbab6))
* add static "is" for registering the component ([018dd5b](https://github.com/boltdesignsystem/bolt/commit/018dd5b))
* add Weakset polyfill for IE 11 ([0867e5f](https://github.com/boltdesignsystem/bolt/commit/0867e5f))
* address linting issues ([03f30b5](https://github.com/boltdesignsystem/bolt/commit/03f30b5))
* fix eslint issues ([b95aa72](https://github.com/boltdesignsystem/bolt/commit/b95aa72))
* fix linting issues ([ed6bde2](https://github.com/boltdesignsystem/bolt/commit/ed6bde2))
* **micro-journeys:** lots of IE 11 fixes ([e68ced3](https://github.com/boltdesignsystem/bolt/commit/e68ced3))
* fix overflow issue on smaller screen sizes ([e50c081](https://github.com/boltdesignsystem/bolt/commit/e50c081))
* incorret character schema default fixed ([e92cc0d](https://github.com/boltdesignsystem/bolt/commit/e92cc0d))
* lint and docs ([df83534](https://github.com/boltdesignsystem/bolt/commit/df83534))
* multiple layout fixes for micro journeys on small-ish screen sizes ([97af5d0](https://github.com/boltdesignsystem/bolt/commit/97af5d0))
* remove `is="shadow-root"` to prevent HTML from getting mistakenly nuked when booting up ([5d8853e](https://github.com/boltdesignsystem/bolt/commit/5d8853e))
* remove click event listener when disconnecting + remove preventDefault that was causing UI like buttons to not click as expected as a result ([a3a0a71](https://github.com/boltdesignsystem/bolt/commit/a3a0a71))
* update all micro journey cta to use bolt link over text ([228f659](https://github.com/boltdesignsystem/bolt/commit/228f659))
* update connection band to re-trigger an update when the context changes ([113d34c](https://github.com/boltdesignsystem/bolt/commit/113d34c))
* update prettier issues ([bcda2f5](https://github.com/boltdesignsystem/bolt/commit/bcda2f5))
* update Ratio component to now directly register the component Class vs previously returning a function to allow for generating a custom-namespaced ratio component. fixes a major Edge issue where Ratio was deleting nested immediate children when booting up. ([26dbef3](https://github.com/boltdesignsystem/bolt/commit/26dbef3))
* **micro-journeys:** allow for multiple demo theme controllers to address PR feedback ([bb9f142](https://github.com/boltdesignsystem/bolt/commit/bb9f142))
* **micro-journeys:** Context JS error when animations have no parent bolt-interactive-pathways w/ context ([44f85b0](https://github.com/boltdesignsystem/bolt/commit/44f85b0))
* **micro-journeys:** fix dropdown text color in IE 11 ([92ac37c](https://github.com/boltdesignsystem/bolt/commit/92ac37c))
* **micro-journeys:** fix IntersectionObserver on IE 11 ([fd15c6e](https://github.com/boltdesignsystem/bolt/commit/fd15c6e))
* **micro-journeys:** ie 11 color fixes ([c60ca03](https://github.com/boltdesignsystem/bolt/commit/c60ca03))
* **micro-journeys:** prevent rapid click of steps from showing multiple steps ([cc0f7d8](https://github.com/boltdesignsystem/bolt/commit/cc0f7d8))
* update Sass to use bolt-theme outside of a media query + add border color to styles ([7c68d1f](https://github.com/boltdesignsystem/bolt/commit/7c68d1f))
* z-index clash between dropdown menu and status bars ([61d5567](https://github.com/boltdesignsystem/bolt/commit/61d5567))


### Features

* add animated dot styles + todo comment to enable ([4bdbed4](https://github.com/boltdesignsystem/bolt/commit/4bdbed4))
* add auto to semi-automate releases ([b1ead01](https://github.com/boltdesignsystem/bolt/commit/b1ead01))
* add onClick and onClick target to button and link through editor ([fff8cf8](https://github.com/boltdesignsystem/bolt/commit/fff8cf8))
* add theme support to interactive-pathways via withContext and defineContext ([eb32484](https://github.com/boltdesignsystem/bolt/commit/eb32484))
* custom dropdown closes with you select an option ([7c7da6b](https://github.com/boltdesignsystem/bolt/commit/7c7da6b))
* expose props to edit the image atop the interactive pathways co… ([#1411](https://github.com/boltdesignsystem/bolt/issues/1411)) ([9fe1993](https://github.com/boltdesignsystem/bolt/commit/9fe1993))
* pathways dropdown closes with a new pathway is selected ([ceadc0c](https://github.com/boltdesignsystem/bolt/commit/ceadc0c))
* remove the connection band options from the character background slot ([#1427](https://github.com/boltdesignsystem/bolt/issues/1427)) ([f2a8757](https://github.com/boltdesignsystem/bolt/commit/f2a8757))
* speed up default exit animation to create a smoother experience ([efe8425](https://github.com/boltdesignsystem/bolt/commit/efe8425))
* **editor:** add url and disabled to button in editor ([0eb9374](https://github.com/boltdesignsystem/bolt/commit/0eb9374))
* **micro-journeys:** add theme consumer to interactive-step; lint scss ([03b09ab](https://github.com/boltdesignsystem/bolt/commit/03b09ab))
* **micro-journeys:** add theme toggler to micro journeys demo ([984384d](https://github.com/boltdesignsystem/bolt/commit/984384d))
* **svg-animations:** theme switching for animations ([0b7df25](https://github.com/boltdesignsystem/bolt/commit/0b7df25))


### Reverts

* revert combining withLitHTML base with withLitContext for now ([ca828da](https://github.com/boltdesignsystem/bolt/commit/ca828da))





# [2.8.0-beta.5](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.4...v2.8.0-beta.5) (2019-09-30)


### Bug Fixes

* add src path fallback if only srcset is defined ([c2f3e24](https://github.com/bolt-design-system/bolt/commit/c2f3e24))
* auto sync enabling / disabling Shadow DOM when rendering Ratio inside of image ([930ba87](https://github.com/bolt-design-system/bolt/commit/930ba87))
* fix prettier formatting ([c4ba7b5](https://github.com/bolt-design-system/bolt/commit/c4ba7b5))
* fix prettier issues ([fa17a45](https://github.com/bolt-design-system/bolt/commit/fa17a45))
* update <img> markup to use a placeholder in srcset but always display the fallback `src` for older browsers ([228ff16](https://github.com/bolt-design-system/bolt/commit/228ff16))





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)


### Bug Fixes

* **animations:** PL JS code for IE 11 ([e2be1a5](https://github.com/bolt-design-system/bolt/commit/e2be1a5))
* **bolt-animate:** add debug to triggerAnimOnEls ([d3c5a54](https://github.com/bolt-design-system/bolt/commit/d3c5a54))
* **bolt-animate:** add shadow dom wrapper ([0abb401](https://github.com/bolt-design-system/bolt/commit/0abb401))
* **bolt-animate:** move demo JS to separate file so it gets transpiled ([baedf7a](https://github.com/bolt-design-system/bolt/commit/baedf7a))
* **bolt-animate:** safari animation fixes ([b1f1399](https://github.com/bolt-design-system/bolt/commit/b1f1399))
* **bolt-editor:** fix failing build; incorrect namespace ([a31f42c](https://github.com/bolt-design-system/bolt/commit/a31f42c))
* **bolt-icon:** updating icon schema after merge ([4f9dc33](https://github.com/bolt-design-system/bolt/commit/4f9dc33))
* **build:** error on yarn build:noisy; fix integer cast for verbosity arg ([08f199a](https://github.com/bolt-design-system/bolt/commit/08f199a))
* **editor:** editor inclusion in pl package.json fix ([ad91adf](https://github.com/bolt-design-system/bolt/commit/ad91adf))
* **micro-journeys:** broken test fixed with 'yarn test:monorepo -- -u' ([e868fba](https://github.com/bolt-design-system/bolt/commit/e868fba))
* **sasslint:** fix broken sasslint on local ([3a75481](https://github.com/bolt-design-system/bolt/commit/3a75481))
* address eslint issues ([e90e7b3](https://github.com/bolt-design-system/bolt/commit/e90e7b3))
* make sure to confirm the with/without container exists before running JS logic ([aab0223](https://github.com/bolt-design-system/bolt/commit/aab0223))
* pull in custom Switch JS to fix custom event issue; add example with/without page with Shadow DOM disabled for debugging; ([8261a6f](https://github.com/bolt-design-system/bolt/commit/8261a6f))
* remove duplicate package names ([1fd7395](https://github.com/bolt-design-system/bolt/commit/1fd7395))
* update Build Tools to check if config.components.global / config.components.individual exist before trying to auto-run the Icon build task ([d340701](https://github.com/bolt-design-system/bolt/commit/d340701))
* update JS logic to run only when the container / element query-selected exists ([87334ce](https://github.com/bolt-design-system/bolt/commit/87334ce))
* **with-without:** fix accordion toggle breakage ([f443e0e](https://github.com/bolt-design-system/bolt/commit/f443e0e))
* update Typeahead to include additional packages missing from package.json ([9382c4a](https://github.com/bolt-design-system/bolt/commit/9382c4a))
* **self-drawing-circle:** decrease stroke width ([6e75dc1](https://github.com/bolt-design-system/bolt/commit/6e75dc1))
* **self-drawing-circle:** fix overdrawn line ([1c91def](https://github.com/bolt-design-system/bolt/commit/1c91def))
* **self-drawing-circle:** replace shadowRoot with renderRoot for IE 11 ([eab2bec](https://github.com/bolt-design-system/bolt/commit/eab2bec))
* **with-without:** add debug code to determine that polyfills have loaded to debug slowness on edge/ie ([f357e4a](https://github.com/bolt-design-system/bolt/commit/f357e4a))
* **with-without:** add show-meta stage to animate ([225e31c](https://github.com/bolt-design-system/bolt/commit/225e31c))
* **with-without:** addressing various feedback from yao ([03e5938](https://github.com/bolt-design-system/bolt/commit/03e5938))
* **with-without:** animation fixes ([7dd96cf](https://github.com/bolt-design-system/bolt/commit/7dd96cf))
* **with-without:** animation stability fixes ([10b37c0](https://github.com/bolt-design-system/bolt/commit/10b37c0))
* **with-without:** animation stability when toggling multiple times in a row ([91cd13b](https://github.com/bolt-design-system/bolt/commit/91cd13b))
* **with-without:** fix IE 11 not supporting transform w/in svg ([3973bfc](https://github.com/bolt-design-system/bolt/commit/3973bfc))
* **with-without:** fix ie and edge, cleanup ([6eb1f15](https://github.com/bolt-design-system/bolt/commit/6eb1f15))
* **with-without:** fix overzealous styling for lightdom breaking circle height ([9daa096](https://github.com/bolt-design-system/bolt/commit/9daa096))
* **with-without:** fix self-drawing circle too big on monster size ([04b3e78](https://github.com/bolt-design-system/bolt/commit/04b3e78))
* **with-without:** fix toggle after change to radio ([259ec2a](https://github.com/bolt-design-system/bolt/commit/259ec2a))
* **with-without:** fix toggle after change to radio ([82d87c5](https://github.com/bolt-design-system/bolt/commit/82d87c5))
* **with-without:** fixing content overflow ([9be6494](https://github.com/bolt-design-system/bolt/commit/9be6494))
* **with-without:** fixing some svg errors on ie 11 ([16f3503](https://github.com/bolt-design-system/bolt/commit/16f3503))
* **with-without:** ie/edge broken when animateIn called on invisible desktop circle when on mobile ([695393f](https://github.com/bolt-design-system/bolt/commit/695393f))
* **with-without:** increase animation speed ([3b548ce](https://github.com/bolt-design-system/bolt/commit/3b548ce))
* **with-without:** numerous fixes ([b360340](https://github.com/bolt-design-system/bolt/commit/b360340))
* **with-without:** remove accordion/markup coupling, style for no meta-stage=INITIAL ([a691769](https://github.com/bolt-design-system/bolt/commit/a691769))
* **with-without:** remove height:100% from shadow inherit compnent ([31a1fad](https://github.com/bolt-design-system/bolt/commit/31a1fad))
* **with-without:** remove padding from PL b/c it breaks w/wo ([b71b030](https://github.com/bolt-design-system/bolt/commit/b71b030))
* **with-without:** remove self-drawing circle wobble; adjust dots ([489c4a1](https://github.com/bolt-design-system/bolt/commit/489c4a1))
* **with-without:** safari title z-index bug ([1e3df49](https://github.com/bolt-design-system/bolt/commit/1e3df49))
* **with-without:** sass fixes for no shadow dom icons ([fcf71e6](https://github.com/bolt-design-system/bolt/commit/fcf71e6))
* **with-without:** sass fixes for no shadow dom icons; remove swiping ([2eceb3e](https://github.com/bolt-design-system/bolt/commit/2eceb3e))
* **with-without:** tightening up animation markup props ([b4f4442](https://github.com/bolt-design-system/bolt/commit/b4f4442))
* **with-without:** unclosed div ([b4686ad](https://github.com/bolt-design-system/bolt/commit/b4686ad))
* **with-without:** whoops, or instead of and caused resize not to fire :) ([698aa65](https://github.com/bolt-design-system/bolt/commit/698aa65))
* **with-without:** working with no shadow dom; replace a-simple-switch for no-js alternative ([414d42e](https://github.com/bolt-design-system/bolt/commit/414d42e))


### Features

* **bolt-animate:** add debug flag for determining animation sequencing ([ca3abfb](https://github.com/bolt-design-system/bolt/commit/ca3abfb))
* **with-with:** self-drawing circle added ([a799a8a](https://github.com/bolt-design-system/bolt/commit/a799a8a))
* **with-without:** add modal video ([ec89be1](https://github.com/bolt-design-system/bolt/commit/ec89be1))
* **with-without:** alignment changes for sliding ([de28318](https://github.com/bolt-design-system/bolt/commit/de28318))
* **with-without:** continued development ([b0f62aa](https://github.com/bolt-design-system/bolt/commit/b0f62aa))
* **with-without:** continued theming ([694a027](https://github.com/bolt-design-system/bolt/commit/694a027))
* **with-without:** fixing modal opacity fade out ([1cb0750](https://github.com/bolt-design-system/bolt/commit/1cb0750))
* **with-without:** mobile circles; tablet background; css fixes ([b3a43ab](https://github.com/bolt-design-system/bolt/commit/b3a43ab))
* **with-without:** various fixes, breaking JS into separate files ([a9772b9](https://github.com/bolt-design-system/bolt/commit/a9772b9))
* automatically convert Bolt + non-Bolt package.json package names into valid Twig namespaces ([bbb6184](https://github.com/bolt-design-system/bolt/commit/bbb6184))
* **with-without:** WIP mobile theming ([7109dc6](https://github.com/bolt-design-system/bolt/commit/7109dc6))
* **with-without:** WIP mobile theming ([7a36ed2](https://github.com/bolt-design-system/bolt/commit/7a36ed2))


### Reverts

* revert update to Twig renderer package ([70c12ce](https://github.com/bolt-design-system/bolt/commit/70c12ce))





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)


### Bug Fixes

* bump '@bolt/testing-utils' to 2.8.0-beta.2 ([584ec9a](https://github.com/bolt-design-system/bolt/commit/584ec9a))
* typo ([04e80f5](https://github.com/bolt-design-system/bolt/commit/04e80f5))


### Features

* add `inactive` demo page, include inactive item on content variations demo ([00b3e55](https://github.com/bolt-design-system/bolt/commit/00b3e55))
* add `inactive` prop to Accordion items ([36c75cc](https://github.com/bolt-design-system/bolt/commit/36c75cc))
* manually pull in the @bolt/animations package to help support the with/without ongoing work ([2afe5b6](https://github.com/bolt-design-system/bolt/commit/2afe5b6))



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* add .js AND ref support schemas ([300faab](https://github.com/bolt-design-system/bolt/commit/300faab))
* add ability to set no anim for idle and out ([2d92d39](https://github.com/bolt-design-system/bolt/commit/2d92d39))
* add editor config with css/js ([4a0b2e2](https://github.com/bolt-design-system/bolt/commit/4a0b2e2))
* add missing animation styles back ([d30c52d](https://github.com/bolt-design-system/bolt/commit/d30c52d))
* add missing component snapshots ([c9db89c](https://github.com/bolt-design-system/bolt/commit/c9db89c))
* add missing PL demo file ([bccdd08](https://github.com/bolt-design-system/bolt/commit/bccdd08))
* add raw-loader dep ([e174852](https://github.com/bolt-design-system/bolt/commit/e174852))
* adding missing pkgs to boltrc ([a34cfe8](https://github.com/bolt-design-system/bolt/commit/a34cfe8))
* address reset of animations ([71bb149](https://github.com/bolt-design-system/bolt/commit/71bb149))
* anim demo helper script ([26accec](https://github.com/bolt-design-system/bolt/commit/26accec))
* another demo animation trigger helper fix ([dbe6a75](https://github.com/bolt-design-system/bolt/commit/dbe6a75))
* attribute typo ([b061c02](https://github.com/bolt-design-system/bolt/commit/b061c02))
* changing query import so IDEs recognize it ([7513d4b](https://github.com/bolt-design-system/bolt/commit/7513d4b))
* **animate:** remove is='shadow-root' ([8b9be23](https://github.com/bolt-design-system/bolt/commit/8b9be23))
* character image on step five ([cba7970](https://github.com/bolt-design-system/bolt/commit/cba7970))
* character with "none" for svg-anim ([7fd417c](https://github.com/bolt-design-system/bolt/commit/7fd417c))
* clean up of connection width styles ([0b2d259](https://github.com/bolt-design-system/bolt/commit/0b2d259))
* correcting @bolt/animations pkg version ([49258e2](https://github.com/bolt-design-system/bolt/commit/49258e2))
* **animate:** animate demo JS ([1fff576](https://github.com/bolt-design-system/bolt/commit/1fff576))
* **animate:** ensure trigger only happens if animation present ([74f3dd8](https://github.com/bolt-design-system/bolt/commit/74f3dd8))
* **animate:** IE11 animate trigger build in ([9c3606b](https://github.com/bolt-design-system/bolt/commit/9c3606b))
* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/commit/0dfd86c))
* **animate:** if animation doesn't finish by the time it should, move to next ([a550afe](https://github.com/bolt-design-system/bolt/commit/a550afe))
* **animate:** prevent animation events from bubbling up ([0294dfd](https://github.com/bolt-design-system/bolt/commit/0294dfd))
* **bolt-animate:** remove animation-delay of 0 and force animation-duration to be 1 to fix Safari ([#1405](https://github.com/bolt-design-system/bolt/issues/1405)) ([72e0b4f](https://github.com/bolt-design-system/bolt/commit/72e0b4f))
* **bolt-interactive-step:** make line not strike through for last step in active state ([7e38299](https://github.com/bolt-design-system/bolt/commit/7e38299))
* **bolt-interactive-step:** modify nav strikethrough so it doesnt break abs pos of body content ([32b8e4f](https://github.com/bolt-design-system/bolt/commit/32b8e4f))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **docs-site:** restore js/css cachebuster ([#1433](https://github.com/bolt-design-system/bolt/issues/1433)) ([0578c1e](https://github.com/bolt-design-system/bolt/commit/0578c1e))
* **dropdown:** add Node.replaceWith polyfill ([6a870cf](https://github.com/bolt-design-system/bolt/commit/6a870cf))
* **editor:** add main template file ([0f1afcc](https://github.com/bolt-design-system/bolt/commit/0f1afcc))
* **editor:** adding bolt-animate as new slot ([0aac5fe](https://github.com/bolt-design-system/bolt/commit/0aac5fe))
* **editor:** components extend text by default to allow text editability ([2c50a49](https://github.com/bolt-design-system/bolt/commit/2c50a49))
* **editor:** downgrade grapesjs to restore text editing ([6cc0f54](https://github.com/bolt-design-system/bolt/commit/6cc0f54))
* temporarily exclude the editor from packages that have to get the dependency map checked ([c491ee1](https://github.com/bolt-design-system/bolt/commit/c491ee1))
* **editor:** ensure unsaved editor does not reload on prod ([f970484](https://github.com/bolt-design-system/bolt/commit/f970484))
* **editor:** exclude animate show meta attribute ([43407c7](https://github.com/bolt-design-system/bolt/commit/43407c7))
* **editor:** exclude grapes from babel ([1c87756](https://github.com/bolt-design-system/bolt/commit/1c87756))
* **editor:** load grapesjs version specific CSS ([5401d40](https://github.com/bolt-design-system/bolt/commit/5401d40))
* **editor:** place trait titles above form element ([24fcaeb](https://github.com/bolt-design-system/bolt/commit/24fcaeb))
* **editor:** remove editor styles on close ([994451c](https://github.com/bolt-design-system/bolt/commit/994451c))
* **editor:** scrollbars in UI ([554dc10](https://github.com/bolt-design-system/bolt/commit/554dc10))
* **editor:** wait for css to load ([cdeca40](https://github.com/bolt-design-system/bolt/commit/cdeca40))
* **editor:** when adding via slotControls, ensure to not select grandchildren slots ([cb3347f](https://github.com/bolt-design-system/bolt/commit/cb3347f))
* **interactive-step:** active dot ff/chrome left pos discrepancy ([7f33edf](https://github.com/bolt-design-system/bolt/commit/7f33edf))
* **interactive-step:** add padding for nav dot truncation ([c89d4e4](https://github.com/bolt-design-system/bolt/commit/c89d4e4))
* **interactive-step:** IE 11 bottom slot layout ([5afac18](https://github.com/bolt-design-system/bolt/commit/5afac18))
* **interactive-step:** last step padding fix; consolidate padding vars ([04f7d06](https://github.com/bolt-design-system/bolt/commit/04f7d06))
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
* **micro-journeys:** proper twig demo render ([d8e2dd1](https://github.com/bolt-design-system/bolt/commit/d8e2dd1))
* don't include the editor JS in with the rest of the packages run through the Webpack Dev Server instance ([62b86a2](https://github.com/bolt-design-system/bolt/commit/62b86a2))
* downgrade jest-dom ([3d500db](https://github.com/bolt-design-system/bolt/commit/3d500db))
* ensure any anim stage combos work ([bf80bf3](https://github.com/bolt-design-system/bolt/commit/bf80bf3))
* eslint fixes ([faa8269](https://github.com/bolt-design-system/bolt/commit/faa8269))
* fix undefined / misnamed variable ([84cf63e](https://github.com/bolt-design-system/bolt/commit/84cf63e))
* idle animation timing to linear ([e005c04](https://github.com/bolt-design-system/bolt/commit/e005c04))
* js errors ([55228f3](https://github.com/bolt-design-system/bolt/commit/55228f3))
* lint fix ([94d223d](https://github.com/bolt-design-system/bolt/commit/94d223d))
* lint fix ([f80bc0d](https://github.com/bolt-design-system/bolt/commit/f80bc0d))
* lint fix ([34f1143](https://github.com/bolt-design-system/bolt/commit/34f1143))
* lint fix ([0936c52](https://github.com/bolt-design-system/bolt/commit/0936c52))
* lint fixes ([9037645](https://github.com/bolt-design-system/bolt/commit/9037645))
* lint fixes ([4abc460](https://github.com/bolt-design-system/bolt/commit/4abc460))
* lint fixes ([836b3c8](https://github.com/bolt-design-system/bolt/commit/836b3c8))
* lint fixes ([b13742c](https://github.com/bolt-design-system/bolt/commit/b13742c))
* lint fixes ([6e606ef](https://github.com/bolt-design-system/bolt/commit/6e606ef))
* lint fixes ([af1642f](https://github.com/bolt-design-system/bolt/commit/af1642f))
* temp disable editor type check ([de67747](https://github.com/bolt-design-system/bolt/commit/de67747))
* **micro-journeys:** remove [is=shadow-root] from shadow dom ([1b5a387](https://github.com/bolt-design-system/bolt/commit/1b5a387))
* make sure Dropdown isn't double-defined + workaround to fix Dropdown component rendering / interaction when being extended in MicroJourneysDropdown ([74d22a4](https://github.com/bolt-design-system/bolt/commit/74d22a4))
* micro journey misc styling ([#1352](https://github.com/bolt-design-system/bolt/issues/1352)) ([9b38f72](https://github.com/bolt-design-system/bolt/commit/9b38f72))
* mobile styling of status bars, no longer overlap ([4905840](https://github.com/bolt-design-system/bolt/commit/4905840))
* more resiliant step item changes ([9b4157e](https://github.com/bolt-design-system/bolt/commit/9b4157e))
* move over old scss ([a8e8142](https://github.com/bolt-design-system/bolt/commit/a8e8142))
* PL demo fix ([241477e](https://github.com/bolt-design-system/bolt/commit/241477e))
* pull out imports of scss animations package ([fd1f33d](https://github.com/bolt-design-system/bolt/commit/fd1f33d))
* quick clean up around vertical spacing ([b437798](https://github.com/bolt-design-system/bolt/commit/b437798))
* remove top level async on Jest tests to fix warning being thrown ([96db49a](https://github.com/bolt-design-system/bolt/commit/96db49a))
* schema prop ([6437e16](https://github.com/bolt-design-system/bolt/commit/6437e16))
* set animation defaults ([c49beff](https://github.com/bolt-design-system/bolt/commit/c49beff))
* skip testing Typescript types in @bolt/components-editor as workaround to Jest test errors ([b78b7b2](https://github.com/bolt-design-system/bolt/commit/b78b7b2))
* styling and theme override ([d8fb3f8](https://github.com/bolt-design-system/bolt/commit/d8fb3f8))
* temporarily skip running Jest tests that cause JS errors with component logic ([465014a](https://github.com/bolt-design-system/bolt/commit/465014a))
* text styles for lead text ([b4f79e3](https://github.com/bolt-design-system/bolt/commit/b4f79e3))
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
* **status-dialogue-bar:** force black text; remove bolt-text passed to dialog; widen left/right padding ([6a4760f](https://github.com/bolt-design-system/bolt/commit/6a4760f))
* trigger active pathway from pathways ([057dd0a](https://github.com/bolt-design-system/bolt/commit/057dd0a))
* tsconfig base url ([eadd149](https://github.com/bolt-design-system/bolt/commit/eadd149))
* update unused Twig templates to use updated boilerplate code; fixes Jest test errors relating to the Twig template being rendered ([e2307fd](https://github.com/bolt-design-system/bolt/commit/e2307fd))
* use available @bolt/core version ([b309bfe](https://github.com/bolt-design-system/bolt/commit/b309bfe))
* **svg-animations:** pull out console log ([2242c22](https://github.com/bolt-design-system/bolt/commit/2242c22))
* **svg-animations:** remove hack from radar component; clean up code ([fb83f48](https://github.com/bolt-design-system/bolt/commit/fb83f48))
* **svg-animations:** show in IE11 ([7135e3c](https://github.com/bolt-design-system/bolt/commit/7135e3c))
* **testing-utils:** finding twig should ignore what .gitignore does ([47caa70](https://github.com/bolt-design-system/bolt/commit/47caa70))
* **twig-renderer:** upgrade @basalt/twig-renderer 0.12.0 => 0.12.1 ([d57414f](https://github.com/bolt-design-system/bolt/commit/d57414f))


### Features

* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add an interactive pathway step and hook it up to nav ul ([9a935f6](https://github.com/bolt-design-system/bolt/commit/9a935f6))
* add animation settings to core, start pl for animations ([bcabe3b](https://github.com/bolt-design-system/bolt/commit/bcabe3b))
* add animation-wrapper ([8e1d25c](https://github.com/bolt-design-system/bolt/commit/8e1d25c))
* add basic status/dialogue bar ([2210bb8](https://github.com/bolt-design-system/bolt/commit/2210bb8))
* add bolt animations to animation-wrapper ([f439a9b](https://github.com/bolt-design-system/bolt/commit/f439a9b))
* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/commit/822face))
* add custom cta with icon component ([05382a3](https://github.com/bolt-design-system/bolt/commit/05382a3))
* add demo of bolt collection band getting staggered item animation ([242c69a](https://github.com/bolt-design-system/bolt/commit/242c69a))
* add demos of connection element to PL ([a8088c1](https://github.com/bolt-design-system/bolt/commit/a8088c1))
* add dropzone for empty slots ([d927a21](https://github.com/bolt-design-system/bolt/commit/d927a21))
* add editor ([c3d6d60](https://github.com/bolt-design-system/bolt/commit/c3d6d60))
* add logic to dropdown menu to select various pathway ([dd5f253](https://github.com/bolt-design-system/bolt/commit/dd5f253))
* add lorem impsum starters for the step top and bottom ([08e99e2](https://github.com/bolt-design-system/bolt/commit/08e99e2))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add spinning animation ([60d0a7e](https://github.com/bolt-design-system/bolt/commit/60d0a7e))
* add status-bar/dialogue and register with editor ([9e26894](https://github.com/bolt-design-system/bolt/commit/9e26894))
* add three icon group for quick editor slot drop-in ([#1410](https://github.com/bolt-design-system/bolt/issues/1410)) ([0257faf](https://github.com/bolt-design-system/bolt/commit/0257faf))
* add transition mixins ([8afc664](https://github.com/bolt-design-system/bolt/commit/8afc664))
* add triple band to one of the demo steps ([b159b1f](https://github.com/bolt-design-system/bolt/commit/b159b1f))
* another band example ([caa94d1](https://github.com/bolt-design-system/bolt/commit/caa94d1))
* begin icon group, WIP blocked by needed bolt-icon work ([6618c3f](https://github.com/bolt-design-system/bolt/commit/6618c3f))
* character element now supports either an image or an svg ([7db973f](https://github.com/bolt-design-system/bolt/commit/7db973f))
* create bolt-animate component ([966315b](https://github.com/bolt-design-system/bolt/commit/966315b))
* create character component, clean BEM on connection ([48a91dc](https://github.com/bolt-design-system/bolt/commit/48a91dc))
* create user config, declare css/js in it ([d0545c0](https://github.com/bolt-design-system/bolt/commit/d0545c0))
* dropdown and nav cleanup ([4aba778](https://github.com/bolt-design-system/bolt/commit/4aba778))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/commit/c8fec87))
* new component "connection" ([eb08a1f](https://github.com/bolt-design-system/bolt/commit/eb08a1f))
* new package for animations ([2a69cbd](https://github.com/bolt-design-system/bolt/commit/2a69cbd))
* one character layout and bug fixes ([815c0dc](https://github.com/bolt-design-system/bolt/commit/815c0dc))
* **animate:** can add show-meta attribute ([38c15f9](https://github.com/bolt-design-system/bolt/commit/38c15f9))
* **bolt-animate:** add debug optional debug flag ([#1404](https://github.com/bolt-design-system/bolt/issues/1404)) ([3ab4b3c](https://github.com/bolt-design-system/bolt/commit/3ab4b3c))
* **build-tools:** add JS as schema file option ([4f7dbd0](https://github.com/bolt-design-system/bolt/commit/4f7dbd0))
* **core:** add build meta data to window.bolt.meta ([1ac2207](https://github.com/bolt-design-system/bolt/commit/1ac2207))
* **core:** add getData JS function for getting "NAME.bolt.json" data ([e3d96e4](https://github.com/bolt-design-system/bolt/commit/e3d96e4))
* **editor:** add layer panel ([451bebc](https://github.com/bolt-design-system/bolt/commit/451bebc))
* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* update character to work with both pre-defined img and custom url ([753b258](https://github.com/bolt-design-system/bolt/commit/753b258))
* **editor:** emit save event ([c8821e5](https://github.com/bolt-design-system/bolt/commit/c8821e5))
* **editor:** ensure only Chrome can open ([ded0dfc](https://github.com/bolt-design-system/bolt/commit/ded0dfc))
* **editor:** highlight droppable slots on block drag ([dc1b411](https://github.com/bolt-design-system/bolt/commit/dc1b411))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/commit/8002a26))
* **editor:** move buttons on top ([77fc2a4](https://github.com/bolt-design-system/bolt/commit/77fc2a4))
* **editor:** much improved slot dropzones ([7d3bcc0](https://github.com/bolt-design-system/bolt/commit/7d3bcc0))
* **icons:** add exclamation icon ([af221dd](https://github.com/bolt-design-system/bolt/commit/af221dd))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))
* update first step to match new comp ([b2ba98b](https://github.com/bolt-design-system/bolt/commit/b2ba98b))
* **micro-journeys:** exposing multiple schemas ([460b7c6](https://github.com/bolt-design-system/bolt/commit/460b7c6))
* **micro-journeys:** extend bolt dropdown and theme to comps ([03c52e2](https://github.com/bolt-design-system/bolt/commit/03c52e2))
* **micro-journeys:** extend bolt-dropdown ([d8a9652](https://github.com/bolt-design-system/bolt/commit/d8a9652))
* **micro-journeys:** hide everything till ready ([71d4f55](https://github.com/bolt-design-system/bolt/commit/71d4f55))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/commit/8a2f14e))
* **svg-animations:** add character in front of animation ([8ae2603](https://github.com/bolt-design-system/bolt/commit/8ae2603))
* properly register svg-animations to the editor ([b1e242a](https://github.com/bolt-design-system/bolt/commit/b1e242a))
* registar bolt connection with grapes ([528104e](https://github.com/bolt-design-system/bolt/commit/528104e))
* registar bolt-cta with the editor ([90d521b](https://github.com/bolt-design-system/bolt/commit/90d521b))
* registar bolt-links to the editor ([9d58163](https://github.com/bolt-design-system/bolt/commit/9d58163))
* registar link and cta component with grapes ([98596fc](https://github.com/bolt-design-system/bolt/commit/98596fc))
* register animation components in editor ([49ebf6a](https://github.com/bolt-design-system/bolt/commit/49ebf6a))
* remove old pl markup, add band examples of micro journeys ([4490a6e](https://github.com/bolt-design-system/bolt/commit/4490a6e))
* setting up animation view trigger js ([ba538b2](https://github.com/bolt-design-system/bolt/commit/ba538b2))
* setup editor blocks for initial micro journeys ([287463a](https://github.com/bolt-design-system/bolt/commit/287463a))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/commit/f5bbd9a))
* start examples of staggered bands ([dddf999](https://github.com/bolt-design-system/bolt/commit/dddf999))
* step triggering build in and build outs ([791ca88](https://github.com/bolt-design-system/bolt/commit/791ca88))
* transfer image assests into micro journey package ([0a7032e](https://github.com/bolt-design-system/bolt/commit/0a7032e))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* update steps 2 and 3 to new comp ([f500325](https://github.com/bolt-design-system/bolt/commit/f500325))
* update steps 4 5 6 ([a6bbbf0](https://github.com/bolt-design-system/bolt/commit/a6bbbf0))
* **svg-component:** add animated svg components ([#1343](https://github.com/bolt-design-system/bolt/issues/1343)) ([c82108f](https://github.com/bolt-design-system/bolt/commit/c82108f))
* update webpack to process png with file-loader ([569fd24](https://github.com/bolt-design-system/bolt/commit/569fd24))
* various image updates for steps ([aa77860](https://github.com/bolt-design-system/bolt/commit/aa77860))
* wip transfer to new package structure, new PL docs ([7627e83](https://github.com/bolt-design-system/bolt/commit/7627e83))


### Reverts

* revert Travis config updates ([30c6ecd](https://github.com/bolt-design-system/bolt/commit/30c6ecd))





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* add .js AND ref support schemas ([300faab](https://github.com/bolt-design-system/bolt/commit/300faab))
* add ability to set no anim for idle and out ([2d92d39](https://github.com/bolt-design-system/bolt/commit/2d92d39))
* add editor config with css/js ([4a0b2e2](https://github.com/bolt-design-system/bolt/commit/4a0b2e2))
* add missing animation styles back ([d30c52d](https://github.com/bolt-design-system/bolt/commit/d30c52d))
* add missing component snapshots ([c9db89c](https://github.com/bolt-design-system/bolt/commit/c9db89c))
* add missing PL demo file ([bccdd08](https://github.com/bolt-design-system/bolt/commit/bccdd08))
* add raw-loader dep ([e174852](https://github.com/bolt-design-system/bolt/commit/e174852))
* adding missing pkgs to boltrc ([a34cfe8](https://github.com/bolt-design-system/bolt/commit/a34cfe8))
* address reset of animations ([71bb149](https://github.com/bolt-design-system/bolt/commit/71bb149))
* anim demo helper script ([26accec](https://github.com/bolt-design-system/bolt/commit/26accec))
* another demo animation trigger helper fix ([dbe6a75](https://github.com/bolt-design-system/bolt/commit/dbe6a75))
* attribute typo ([b061c02](https://github.com/bolt-design-system/bolt/commit/b061c02))
* changing query import so IDEs recognize it ([7513d4b](https://github.com/bolt-design-system/bolt/commit/7513d4b))
* **animate:** remove is='shadow-root' ([8b9be23](https://github.com/bolt-design-system/bolt/commit/8b9be23))
* character image on step five ([cba7970](https://github.com/bolt-design-system/bolt/commit/cba7970))
* character with "none" for svg-anim ([7fd417c](https://github.com/bolt-design-system/bolt/commit/7fd417c))
* clean up of connection width styles ([0b2d259](https://github.com/bolt-design-system/bolt/commit/0b2d259))
* correcting @bolt/animations pkg version ([49258e2](https://github.com/bolt-design-system/bolt/commit/49258e2))
* **animate:** animate demo JS ([1fff576](https://github.com/bolt-design-system/bolt/commit/1fff576))
* **animate:** ensure trigger only happens if animation present ([74f3dd8](https://github.com/bolt-design-system/bolt/commit/74f3dd8))
* **animate:** IE11 animate trigger build in ([9c3606b](https://github.com/bolt-design-system/bolt/commit/9c3606b))
* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/commit/0dfd86c))
* **animate:** if animation doesn't finish by the time it should, move to next ([a550afe](https://github.com/bolt-design-system/bolt/commit/a550afe))
* **animate:** prevent animation events from bubbling up ([0294dfd](https://github.com/bolt-design-system/bolt/commit/0294dfd))
* **bolt-animate:** remove animation-delay of 0 and force animation-duration to be 1 to fix Safari ([#1405](https://github.com/bolt-design-system/bolt/issues/1405)) ([72e0b4f](https://github.com/bolt-design-system/bolt/commit/72e0b4f))
* **bolt-interactive-step:** make line not strike through for last step in active state ([7e38299](https://github.com/bolt-design-system/bolt/commit/7e38299))
* **bolt-interactive-step:** modify nav strikethrough so it doesnt break abs pos of body content ([32b8e4f](https://github.com/bolt-design-system/bolt/commit/32b8e4f))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **docs-site:** restore js/css cachebuster ([#1433](https://github.com/bolt-design-system/bolt/issues/1433)) ([0578c1e](https://github.com/bolt-design-system/bolt/commit/0578c1e))
* **dropdown:** add Node.replaceWith polyfill ([6a870cf](https://github.com/bolt-design-system/bolt/commit/6a870cf))
* **editor:** add main template file ([0f1afcc](https://github.com/bolt-design-system/bolt/commit/0f1afcc))
* **editor:** adding bolt-animate as new slot ([0aac5fe](https://github.com/bolt-design-system/bolt/commit/0aac5fe))
* **editor:** components extend text by default to allow text editability ([2c50a49](https://github.com/bolt-design-system/bolt/commit/2c50a49))
* **editor:** downgrade grapesjs to restore text editing ([6cc0f54](https://github.com/bolt-design-system/bolt/commit/6cc0f54))
* temporarily exclude the editor from packages that have to get the dependency map checked ([c491ee1](https://github.com/bolt-design-system/bolt/commit/c491ee1))
* **editor:** ensure unsaved editor does not reload on prod ([f970484](https://github.com/bolt-design-system/bolt/commit/f970484))
* **editor:** exclude animate show meta attribute ([43407c7](https://github.com/bolt-design-system/bolt/commit/43407c7))
* **editor:** exclude grapes from babel ([1c87756](https://github.com/bolt-design-system/bolt/commit/1c87756))
* **editor:** load grapesjs version specific CSS ([5401d40](https://github.com/bolt-design-system/bolt/commit/5401d40))
* **editor:** place trait titles above form element ([24fcaeb](https://github.com/bolt-design-system/bolt/commit/24fcaeb))
* **editor:** remove editor styles on close ([994451c](https://github.com/bolt-design-system/bolt/commit/994451c))
* **editor:** scrollbars in UI ([554dc10](https://github.com/bolt-design-system/bolt/commit/554dc10))
* **editor:** wait for css to load ([cdeca40](https://github.com/bolt-design-system/bolt/commit/cdeca40))
* **editor:** when adding via slotControls, ensure to not select grandchildren slots ([cb3347f](https://github.com/bolt-design-system/bolt/commit/cb3347f))
* **interactive-step:** active dot ff/chrome left pos discrepancy ([7f33edf](https://github.com/bolt-design-system/bolt/commit/7f33edf))
* **interactive-step:** add padding for nav dot truncation ([c89d4e4](https://github.com/bolt-design-system/bolt/commit/c89d4e4))
* **interactive-step:** IE 11 bottom slot layout ([5afac18](https://github.com/bolt-design-system/bolt/commit/5afac18))
* **interactive-step:** last step padding fix; consolidate padding vars ([04f7d06](https://github.com/bolt-design-system/bolt/commit/04f7d06))
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
* **micro-journeys:** proper twig demo render ([d8e2dd1](https://github.com/bolt-design-system/bolt/commit/d8e2dd1))
* don't include the editor JS in with the rest of the packages run through the Webpack Dev Server instance ([62b86a2](https://github.com/bolt-design-system/bolt/commit/62b86a2))
* downgrade jest-dom ([3d500db](https://github.com/bolt-design-system/bolt/commit/3d500db))
* ensure any anim stage combos work ([bf80bf3](https://github.com/bolt-design-system/bolt/commit/bf80bf3))
* eslint fixes ([faa8269](https://github.com/bolt-design-system/bolt/commit/faa8269))
* fix undefined / misnamed variable ([84cf63e](https://github.com/bolt-design-system/bolt/commit/84cf63e))
* idle animation timing to linear ([e005c04](https://github.com/bolt-design-system/bolt/commit/e005c04))
* js errors ([55228f3](https://github.com/bolt-design-system/bolt/commit/55228f3))
* lint fix ([94d223d](https://github.com/bolt-design-system/bolt/commit/94d223d))
* lint fix ([f80bc0d](https://github.com/bolt-design-system/bolt/commit/f80bc0d))
* lint fix ([34f1143](https://github.com/bolt-design-system/bolt/commit/34f1143))
* lint fix ([0936c52](https://github.com/bolt-design-system/bolt/commit/0936c52))
* lint fixes ([9037645](https://github.com/bolt-design-system/bolt/commit/9037645))
* lint fixes ([4abc460](https://github.com/bolt-design-system/bolt/commit/4abc460))
* lint fixes ([836b3c8](https://github.com/bolt-design-system/bolt/commit/836b3c8))
* lint fixes ([b13742c](https://github.com/bolt-design-system/bolt/commit/b13742c))
* lint fixes ([6e606ef](https://github.com/bolt-design-system/bolt/commit/6e606ef))
* lint fixes ([af1642f](https://github.com/bolt-design-system/bolt/commit/af1642f))
* temp disable editor type check ([de67747](https://github.com/bolt-design-system/bolt/commit/de67747))
* **micro-journeys:** remove [is=shadow-root] from shadow dom ([1b5a387](https://github.com/bolt-design-system/bolt/commit/1b5a387))
* make sure Dropdown isn't double-defined + workaround to fix Dropdown component rendering / interaction when being extended in MicroJourneysDropdown ([74d22a4](https://github.com/bolt-design-system/bolt/commit/74d22a4))
* micro journey misc styling ([#1352](https://github.com/bolt-design-system/bolt/issues/1352)) ([9b38f72](https://github.com/bolt-design-system/bolt/commit/9b38f72))
* mobile styling of status bars, no longer overlap ([4905840](https://github.com/bolt-design-system/bolt/commit/4905840))
* more resiliant step item changes ([9b4157e](https://github.com/bolt-design-system/bolt/commit/9b4157e))
* move over old scss ([a8e8142](https://github.com/bolt-design-system/bolt/commit/a8e8142))
* PL demo fix ([241477e](https://github.com/bolt-design-system/bolt/commit/241477e))
* pull out imports of scss animations package ([fd1f33d](https://github.com/bolt-design-system/bolt/commit/fd1f33d))
* quick clean up around vertical spacing ([b437798](https://github.com/bolt-design-system/bolt/commit/b437798))
* remove top level async on Jest tests to fix warning being thrown ([96db49a](https://github.com/bolt-design-system/bolt/commit/96db49a))
* schema prop ([6437e16](https://github.com/bolt-design-system/bolt/commit/6437e16))
* set animation defaults ([c49beff](https://github.com/bolt-design-system/bolt/commit/c49beff))
* skip testing Typescript types in @bolt/components-editor as workaround to Jest test errors ([b78b7b2](https://github.com/bolt-design-system/bolt/commit/b78b7b2))
* styling and theme override ([d8fb3f8](https://github.com/bolt-design-system/bolt/commit/d8fb3f8))
* temporarily skip running Jest tests that cause JS errors with component logic ([465014a](https://github.com/bolt-design-system/bolt/commit/465014a))
* text styles for lead text ([b4f79e3](https://github.com/bolt-design-system/bolt/commit/b4f79e3))
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
* **status-dialogue-bar:** force black text; remove bolt-text passed to dialog; widen left/right padding ([6a4760f](https://github.com/bolt-design-system/bolt/commit/6a4760f))
* trigger active pathway from pathways ([057dd0a](https://github.com/bolt-design-system/bolt/commit/057dd0a))
* tsconfig base url ([eadd149](https://github.com/bolt-design-system/bolt/commit/eadd149))
* update unused Twig templates to use updated boilerplate code; fixes Jest test errors relating to the Twig template being rendered ([e2307fd](https://github.com/bolt-design-system/bolt/commit/e2307fd))
* use available @bolt/core version ([b309bfe](https://github.com/bolt-design-system/bolt/commit/b309bfe))
* **svg-animations:** pull out console log ([2242c22](https://github.com/bolt-design-system/bolt/commit/2242c22))
* **svg-animations:** remove hack from radar component; clean up code ([fb83f48](https://github.com/bolt-design-system/bolt/commit/fb83f48))
* **svg-animations:** show in IE11 ([7135e3c](https://github.com/bolt-design-system/bolt/commit/7135e3c))
* **testing-utils:** finding twig should ignore what .gitignore does ([47caa70](https://github.com/bolt-design-system/bolt/commit/47caa70))
* **twig-renderer:** upgrade @basalt/twig-renderer 0.12.0 => 0.12.1 ([d57414f](https://github.com/bolt-design-system/bolt/commit/d57414f))


### Features

* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add an interactive pathway step and hook it up to nav ul ([9a935f6](https://github.com/bolt-design-system/bolt/commit/9a935f6))
* add animation settings to core, start pl for animations ([bcabe3b](https://github.com/bolt-design-system/bolt/commit/bcabe3b))
* add animation-wrapper ([8e1d25c](https://github.com/bolt-design-system/bolt/commit/8e1d25c))
* add basic status/dialogue bar ([2210bb8](https://github.com/bolt-design-system/bolt/commit/2210bb8))
* add bolt animations to animation-wrapper ([f439a9b](https://github.com/bolt-design-system/bolt/commit/f439a9b))
* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/commit/822face))
* add custom cta with icon component ([05382a3](https://github.com/bolt-design-system/bolt/commit/05382a3))
* add demo of bolt collection band getting staggered item animation ([242c69a](https://github.com/bolt-design-system/bolt/commit/242c69a))
* add demos of connection element to PL ([a8088c1](https://github.com/bolt-design-system/bolt/commit/a8088c1))
* add dropzone for empty slots ([d927a21](https://github.com/bolt-design-system/bolt/commit/d927a21))
* add editor ([c3d6d60](https://github.com/bolt-design-system/bolt/commit/c3d6d60))
* add logic to dropdown menu to select various pathway ([dd5f253](https://github.com/bolt-design-system/bolt/commit/dd5f253))
* add lorem impsum starters for the step top and bottom ([08e99e2](https://github.com/bolt-design-system/bolt/commit/08e99e2))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add spinning animation ([60d0a7e](https://github.com/bolt-design-system/bolt/commit/60d0a7e))
* add status-bar/dialogue and register with editor ([9e26894](https://github.com/bolt-design-system/bolt/commit/9e26894))
* add three icon group for quick editor slot drop-in ([#1410](https://github.com/bolt-design-system/bolt/issues/1410)) ([0257faf](https://github.com/bolt-design-system/bolt/commit/0257faf))
* add transition mixins ([8afc664](https://github.com/bolt-design-system/bolt/commit/8afc664))
* add triple band to one of the demo steps ([b159b1f](https://github.com/bolt-design-system/bolt/commit/b159b1f))
* another band example ([caa94d1](https://github.com/bolt-design-system/bolt/commit/caa94d1))
* begin icon group, WIP blocked by needed bolt-icon work ([6618c3f](https://github.com/bolt-design-system/bolt/commit/6618c3f))
* character element now supports either an image or an svg ([7db973f](https://github.com/bolt-design-system/bolt/commit/7db973f))
* create bolt-animate component ([966315b](https://github.com/bolt-design-system/bolt/commit/966315b))
* create character component, clean BEM on connection ([48a91dc](https://github.com/bolt-design-system/bolt/commit/48a91dc))
* create user config, declare css/js in it ([d0545c0](https://github.com/bolt-design-system/bolt/commit/d0545c0))
* dropdown and nav cleanup ([4aba778](https://github.com/bolt-design-system/bolt/commit/4aba778))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/commit/c8fec87))
* new component "connection" ([eb08a1f](https://github.com/bolt-design-system/bolt/commit/eb08a1f))
* new package for animations ([2a69cbd](https://github.com/bolt-design-system/bolt/commit/2a69cbd))
* one character layout and bug fixes ([815c0dc](https://github.com/bolt-design-system/bolt/commit/815c0dc))
* **animate:** can add show-meta attribute ([38c15f9](https://github.com/bolt-design-system/bolt/commit/38c15f9))
* **bolt-animate:** add debug optional debug flag ([#1404](https://github.com/bolt-design-system/bolt/issues/1404)) ([3ab4b3c](https://github.com/bolt-design-system/bolt/commit/3ab4b3c))
* **build-tools:** add JS as schema file option ([4f7dbd0](https://github.com/bolt-design-system/bolt/commit/4f7dbd0))
* **core:** add build meta data to window.bolt.meta ([1ac2207](https://github.com/bolt-design-system/bolt/commit/1ac2207))
* **core:** add getData JS function for getting "NAME.bolt.json" data ([e3d96e4](https://github.com/bolt-design-system/bolt/commit/e3d96e4))
* **editor:** add layer panel ([451bebc](https://github.com/bolt-design-system/bolt/commit/451bebc))
* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* update character to work with both pre-defined img and custom url ([753b258](https://github.com/bolt-design-system/bolt/commit/753b258))
* **editor:** emit save event ([c8821e5](https://github.com/bolt-design-system/bolt/commit/c8821e5))
* **editor:** ensure only Chrome can open ([ded0dfc](https://github.com/bolt-design-system/bolt/commit/ded0dfc))
* **editor:** highlight droppable slots on block drag ([dc1b411](https://github.com/bolt-design-system/bolt/commit/dc1b411))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/commit/8002a26))
* **editor:** move buttons on top ([77fc2a4](https://github.com/bolt-design-system/bolt/commit/77fc2a4))
* **editor:** much improved slot dropzones ([7d3bcc0](https://github.com/bolt-design-system/bolt/commit/7d3bcc0))
* **icons:** add exclamation icon ([af221dd](https://github.com/bolt-design-system/bolt/commit/af221dd))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))
* update first step to match new comp ([b2ba98b](https://github.com/bolt-design-system/bolt/commit/b2ba98b))
* **micro-journeys:** exposing multiple schemas ([460b7c6](https://github.com/bolt-design-system/bolt/commit/460b7c6))
* **micro-journeys:** extend bolt dropdown and theme to comps ([03c52e2](https://github.com/bolt-design-system/bolt/commit/03c52e2))
* **micro-journeys:** extend bolt-dropdown ([d8a9652](https://github.com/bolt-design-system/bolt/commit/d8a9652))
* **micro-journeys:** hide everything till ready ([71d4f55](https://github.com/bolt-design-system/bolt/commit/71d4f55))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/commit/8a2f14e))
* **svg-animations:** add character in front of animation ([8ae2603](https://github.com/bolt-design-system/bolt/commit/8ae2603))
* properly register svg-animations to the editor ([b1e242a](https://github.com/bolt-design-system/bolt/commit/b1e242a))
* registar bolt connection with grapes ([528104e](https://github.com/bolt-design-system/bolt/commit/528104e))
* registar bolt-cta with the editor ([90d521b](https://github.com/bolt-design-system/bolt/commit/90d521b))
* registar bolt-links to the editor ([9d58163](https://github.com/bolt-design-system/bolt/commit/9d58163))
* registar link and cta component with grapes ([98596fc](https://github.com/bolt-design-system/bolt/commit/98596fc))
* register animation components in editor ([49ebf6a](https://github.com/bolt-design-system/bolt/commit/49ebf6a))
* remove old pl markup, add band examples of micro journeys ([4490a6e](https://github.com/bolt-design-system/bolt/commit/4490a6e))
* setting up animation view trigger js ([ba538b2](https://github.com/bolt-design-system/bolt/commit/ba538b2))
* setup editor blocks for initial micro journeys ([287463a](https://github.com/bolt-design-system/bolt/commit/287463a))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/commit/f5bbd9a))
* start examples of staggered bands ([dddf999](https://github.com/bolt-design-system/bolt/commit/dddf999))
* step triggering build in and build outs ([791ca88](https://github.com/bolt-design-system/bolt/commit/791ca88))
* transfer image assests into micro journey package ([0a7032e](https://github.com/bolt-design-system/bolt/commit/0a7032e))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* update steps 2 and 3 to new comp ([f500325](https://github.com/bolt-design-system/bolt/commit/f500325))
* update steps 4 5 6 ([a6bbbf0](https://github.com/bolt-design-system/bolt/commit/a6bbbf0))
* **svg-component:** add animated svg components ([#1343](https://github.com/bolt-design-system/bolt/issues/1343)) ([c82108f](https://github.com/bolt-design-system/bolt/commit/c82108f))
* update webpack to process png with file-loader ([569fd24](https://github.com/bolt-design-system/bolt/commit/569fd24))
* various image updates for steps ([aa77860](https://github.com/bolt-design-system/bolt/commit/aa77860))
* wip transfer to new package structure, new PL docs ([7627e83](https://github.com/bolt-design-system/bolt/commit/7627e83))


### Reverts

* revert Travis config updates ([30c6ecd](https://github.com/bolt-design-system/bolt/commit/30c6ecd))





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)


### Bug Fixes

* add .js AND ref support schemas ([300faab](https://github.com/bolt-design-system/bolt/commit/300faab))
* add ability to set no anim for idle and out ([2d92d39](https://github.com/bolt-design-system/bolt/commit/2d92d39))
* add editor config with css/js ([4a0b2e2](https://github.com/bolt-design-system/bolt/commit/4a0b2e2))
* add missing animation styles back ([d30c52d](https://github.com/bolt-design-system/bolt/commit/d30c52d))
* add missing component snapshots ([c9db89c](https://github.com/bolt-design-system/bolt/commit/c9db89c))
* add missing PL demo file ([bccdd08](https://github.com/bolt-design-system/bolt/commit/bccdd08))
* add raw-loader dep ([e174852](https://github.com/bolt-design-system/bolt/commit/e174852))
* adding missing pkgs to boltrc ([a34cfe8](https://github.com/bolt-design-system/bolt/commit/a34cfe8))
* address reset of animations ([71bb149](https://github.com/bolt-design-system/bolt/commit/71bb149))
* anim demo helper script ([26accec](https://github.com/bolt-design-system/bolt/commit/26accec))
* another demo animation trigger helper fix ([dbe6a75](https://github.com/bolt-design-system/bolt/commit/dbe6a75))
* attribute typo ([b061c02](https://github.com/bolt-design-system/bolt/commit/b061c02))
* changing query import so IDEs recognize it ([7513d4b](https://github.com/bolt-design-system/bolt/commit/7513d4b))
* **micro-journeys:** importing dropdown scss ([aa9dcd1](https://github.com/bolt-design-system/bolt/commit/aa9dcd1))
* character image on step five ([cba7970](https://github.com/bolt-design-system/bolt/commit/cba7970))
* character with "none" for svg-anim ([7fd417c](https://github.com/bolt-design-system/bolt/commit/7fd417c))
* clean up of connection width styles ([0b2d259](https://github.com/bolt-design-system/bolt/commit/0b2d259))
* correcting @bolt/animations pkg version ([49258e2](https://github.com/bolt-design-system/bolt/commit/49258e2))
* don't include the editor JS in with the rest of the packages run through the Webpack Dev Server instance ([62b86a2](https://github.com/bolt-design-system/bolt/commit/62b86a2))
* downgrade jest-dom ([3d500db](https://github.com/bolt-design-system/bolt/commit/3d500db))
* ensure any anim stage combos work ([bf80bf3](https://github.com/bolt-design-system/bolt/commit/bf80bf3))
* eslint fixes ([faa8269](https://github.com/bolt-design-system/bolt/commit/faa8269))
* fix undefined / misnamed variable ([84cf63e](https://github.com/bolt-design-system/bolt/commit/84cf63e))
* idle animation timing to linear ([e005c04](https://github.com/bolt-design-system/bolt/commit/e005c04))
* js errors ([55228f3](https://github.com/bolt-design-system/bolt/commit/55228f3))
* lint fix ([34f1143](https://github.com/bolt-design-system/bolt/commit/34f1143))
* lint fix ([94d223d](https://github.com/bolt-design-system/bolt/commit/94d223d))
* lint fix ([0936c52](https://github.com/bolt-design-system/bolt/commit/0936c52))
* lint fix ([f80bc0d](https://github.com/bolt-design-system/bolt/commit/f80bc0d))
* lint fixes ([9037645](https://github.com/bolt-design-system/bolt/commit/9037645))
* lint fixes ([b13742c](https://github.com/bolt-design-system/bolt/commit/b13742c))
* lint fixes ([836b3c8](https://github.com/bolt-design-system/bolt/commit/836b3c8))
* lint fixes ([af1642f](https://github.com/bolt-design-system/bolt/commit/af1642f))
* lint fixes ([6e606ef](https://github.com/bolt-design-system/bolt/commit/6e606ef))
* lint fixes ([4abc460](https://github.com/bolt-design-system/bolt/commit/4abc460))
* more resiliant step item changes ([9b4157e](https://github.com/bolt-design-system/bolt/commit/9b4157e))
* **interactive-step:** last step padding fix; consolidate padding vars ([04f7d06](https://github.com/bolt-design-system/bolt/commit/04f7d06))
* make sure Dropdown isn't double-defined + workaround to fix Dropdown component rendering / interaction when being extended in MicroJourneysDropdown ([74d22a4](https://github.com/bolt-design-system/bolt/commit/74d22a4))
* micro journey misc styling ([#1352](https://github.com/bolt-design-system/bolt/issues/1352)) ([9b38f72](https://github.com/bolt-design-system/bolt/commit/9b38f72))
* mobile styling of status bars, no longer overlap ([4905840](https://github.com/bolt-design-system/bolt/commit/4905840))
* move over old scss ([a8e8142](https://github.com/bolt-design-system/bolt/commit/a8e8142))
* PL demo fix ([241477e](https://github.com/bolt-design-system/bolt/commit/241477e))
* pull out imports of scss animations package ([fd1f33d](https://github.com/bolt-design-system/bolt/commit/fd1f33d))
* quick clean up around vertical spacing ([b437798](https://github.com/bolt-design-system/bolt/commit/b437798))
* remove top level async on Jest tests to fix warning being thrown ([96db49a](https://github.com/bolt-design-system/bolt/commit/96db49a))
* schema prop ([6437e16](https://github.com/bolt-design-system/bolt/commit/6437e16))
* set animation defaults ([c49beff](https://github.com/bolt-design-system/bolt/commit/c49beff))
* skip testing Typescript types in @bolt/components-editor as workaround to Jest test errors ([b78b7b2](https://github.com/bolt-design-system/bolt/commit/b78b7b2))
* styling and theme override ([d8fb3f8](https://github.com/bolt-design-system/bolt/commit/d8fb3f8))
* **editor:** remove editor styles on close ([994451c](https://github.com/bolt-design-system/bolt/commit/994451c))
* temp disable editor type check ([de67747](https://github.com/bolt-design-system/bolt/commit/de67747))
* **animate:** animate demo JS ([1fff576](https://github.com/bolt-design-system/bolt/commit/1fff576))
* **animate:** ensure trigger only happens if animation present ([74f3dd8](https://github.com/bolt-design-system/bolt/commit/74f3dd8))
* **animate:** IE11 animate trigger build in ([9c3606b](https://github.com/bolt-design-system/bolt/commit/9c3606b))
* **animate:** IE11 issue by not using Array.from() ([0dfd86c](https://github.com/bolt-design-system/bolt/commit/0dfd86c))
* **animate:** if animation doesn't finish by the time it should, move to next ([a550afe](https://github.com/bolt-design-system/bolt/commit/a550afe))
* **animate:** prevent animation events from bubbling up ([0294dfd](https://github.com/bolt-design-system/bolt/commit/0294dfd))
* **animate:** remove is='shadow-root' ([8b9be23](https://github.com/bolt-design-system/bolt/commit/8b9be23))
* **bolt-animate:** remove animation-delay of 0 and force animation-duration to be 1 to fix Safari ([#1405](https://github.com/bolt-design-system/bolt/issues/1405)) ([72e0b4f](https://github.com/bolt-design-system/bolt/commit/72e0b4f))
* **bolt-interactive-step:** make line not strike through for last step in active state ([7e38299](https://github.com/bolt-design-system/bolt/commit/7e38299))
* **bolt-interactive-step:** modify nav strikethrough so it doesnt break abs pos of body content ([32b8e4f](https://github.com/bolt-design-system/bolt/commit/32b8e4f))
* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **dropdown:** add Node.replaceWith polyfill ([6a870cf](https://github.com/bolt-design-system/bolt/commit/6a870cf))
* **editor:** add main template file ([0f1afcc](https://github.com/bolt-design-system/bolt/commit/0f1afcc))
* **editor:** adding bolt-animate as new slot ([0aac5fe](https://github.com/bolt-design-system/bolt/commit/0aac5fe))
* **editor:** components extend text by default to allow text editability ([2c50a49](https://github.com/bolt-design-system/bolt/commit/2c50a49))
* **editor:** downgrade grapesjs to restore text editing ([6cc0f54](https://github.com/bolt-design-system/bolt/commit/6cc0f54))
* **editor:** ensure unsaved editor does not reload on prod ([f970484](https://github.com/bolt-design-system/bolt/commit/f970484))
* **editor:** exclude animate show meta attribute ([43407c7](https://github.com/bolt-design-system/bolt/commit/43407c7))
* **editor:** exclude grapes from babel ([1c87756](https://github.com/bolt-design-system/bolt/commit/1c87756))
* **editor:** place trait titles above form element ([24fcaeb](https://github.com/bolt-design-system/bolt/commit/24fcaeb))
* **editor:** scrollbars in UI ([554dc10](https://github.com/bolt-design-system/bolt/commit/554dc10))
* **editor:** wait for css to load ([cdeca40](https://github.com/bolt-design-system/bolt/commit/cdeca40))
* **editor:** when adding via slotControls, ensure to not select grandchildren slots ([cb3347f](https://github.com/bolt-design-system/bolt/commit/cb3347f))
* **interactive-step:** active dot ff/chrome left pos discrepancy ([7f33edf](https://github.com/bolt-design-system/bolt/commit/7f33edf))
* **interactive-step:** add padding for nav dot truncation ([c89d4e4](https://github.com/bolt-design-system/bolt/commit/c89d4e4))
* **interactive-step:** IE 11 bottom slot layout ([5afac18](https://github.com/bolt-design-system/bolt/commit/5afac18))
* **interactive-step:** mobile styling: bolt-connection content overflow; desktop nav padding; fix mobile issues ([408e0bb](https://github.com/bolt-design-system/bolt/commit/408e0bb))
* **interactive-step:** mobile styling: line strikethrough; body padding ([e6f9f80](https://github.com/bolt-design-system/bolt/commit/e6f9f80))
* **micro-journeys:** add missing styles for IE11 ([f81cef0](https://github.com/bolt-design-system/bolt/commit/f81cef0))
* **micro-journeys:** adjust animation config for examples ([1a4646e](https://github.com/bolt-design-system/bolt/commit/1a4646e))
* **micro-journeys:** correct schema import ([8768622](https://github.com/bolt-design-system/bolt/commit/8768622))
* **micro-journeys:** fix horizontal scroll problem; responsiveness for bolt-connection ([b1ad432](https://github.com/bolt-design-system/bolt/commit/b1ad432))
* **micro-journeys:** fixes for no shadow dom, mostly icons ([52b3791](https://github.com/bolt-design-system/bolt/commit/52b3791))
* **micro-journeys:** increase robustness of parent-child components ([84bd753](https://github.com/bolt-design-system/bolt/commit/84bd753))
* **micro-journeys:** move pathway title to attribute ([ef4e303](https://github.com/bolt-design-system/bolt/commit/ef4e303))
* **micro-journeys:** pathways should wait for children ([b88ce14](https://github.com/bolt-design-system/bolt/commit/b88ce14))
* tsconfig base url ([eadd149](https://github.com/bolt-design-system/bolt/commit/eadd149))
* **micro-journeys:** proper twig demo render ([d8e2dd1](https://github.com/bolt-design-system/bolt/commit/d8e2dd1))
* temporarily exclude the editor from packages that have to get the dependency map checked ([c491ee1](https://github.com/bolt-design-system/bolt/commit/c491ee1))
* temporarily skip running Jest tests that cause JS errors with component logic ([465014a](https://github.com/bolt-design-system/bolt/commit/465014a))
* text styles for lead text ([b4f79e3](https://github.com/bolt-design-system/bolt/commit/b4f79e3))
* **micro-journeys:** remove [is=shadow-root] from shadow dom ([1b5a387](https://github.com/bolt-design-system/bolt/commit/1b5a387))
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
* **status-dialogue-bar:** force black text; remove bolt-text passed to dialog; widen left/right padding ([6a4760f](https://github.com/bolt-design-system/bolt/commit/6a4760f))
* trigger active pathway from pathways ([057dd0a](https://github.com/bolt-design-system/bolt/commit/057dd0a))
* update unused Twig templates to use updated boilerplate code; fixes Jest test errors relating to the Twig template being rendered ([e2307fd](https://github.com/bolt-design-system/bolt/commit/e2307fd))
* use available @bolt/core version ([b309bfe](https://github.com/bolt-design-system/bolt/commit/b309bfe))
* **svg-animations:** pull out console log ([2242c22](https://github.com/bolt-design-system/bolt/commit/2242c22))
* **svg-animations:** remove hack from radar component; clean up code ([fb83f48](https://github.com/bolt-design-system/bolt/commit/fb83f48))
* **svg-animations:** show in IE11 ([7135e3c](https://github.com/bolt-design-system/bolt/commit/7135e3c))
* **twig-renderer:** upgrade @basalt/twig-renderer 0.12.0 => 0.12.1 ([d57414f](https://github.com/bolt-design-system/bolt/commit/d57414f))


### Features

* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add an interactive pathway step and hook it up to nav ul ([9a935f6](https://github.com/bolt-design-system/bolt/commit/9a935f6))
* add animation settings to core, start pl for animations ([bcabe3b](https://github.com/bolt-design-system/bolt/commit/bcabe3b))
* add animation-wrapper ([8e1d25c](https://github.com/bolt-design-system/bolt/commit/8e1d25c))
* add basic status/dialogue bar ([2210bb8](https://github.com/bolt-design-system/bolt/commit/2210bb8))
* add bolt animations to animation-wrapper ([f439a9b](https://github.com/bolt-design-system/bolt/commit/f439a9b))
* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/commit/822face))
* add custom cta with icon component ([05382a3](https://github.com/bolt-design-system/bolt/commit/05382a3))
* add demo of bolt collection band getting staggered item animation ([242c69a](https://github.com/bolt-design-system/bolt/commit/242c69a))
* add demos of connection element to PL ([a8088c1](https://github.com/bolt-design-system/bolt/commit/a8088c1))
* add dropzone for empty slots ([d927a21](https://github.com/bolt-design-system/bolt/commit/d927a21))
* add editor ([c3d6d60](https://github.com/bolt-design-system/bolt/commit/c3d6d60))
* add logic to dropdown menu to select various pathway ([dd5f253](https://github.com/bolt-design-system/bolt/commit/dd5f253))
* add lorem impsum starters for the step top and bottom ([08e99e2](https://github.com/bolt-design-system/bolt/commit/08e99e2))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add spinning animation ([60d0a7e](https://github.com/bolt-design-system/bolt/commit/60d0a7e))
* add status-bar/dialogue and register with editor ([9e26894](https://github.com/bolt-design-system/bolt/commit/9e26894))
* add three icon group for quick editor slot drop-in ([#1410](https://github.com/bolt-design-system/bolt/issues/1410)) ([0257faf](https://github.com/bolt-design-system/bolt/commit/0257faf))
* add transition mixins ([8afc664](https://github.com/bolt-design-system/bolt/commit/8afc664))
* add triple band to one of the demo steps ([b159b1f](https://github.com/bolt-design-system/bolt/commit/b159b1f))
* another band example ([caa94d1](https://github.com/bolt-design-system/bolt/commit/caa94d1))
* begin icon group, WIP blocked by needed bolt-icon work ([6618c3f](https://github.com/bolt-design-system/bolt/commit/6618c3f))
* character element now supports either an image or an svg ([7db973f](https://github.com/bolt-design-system/bolt/commit/7db973f))
* create bolt-animate component ([966315b](https://github.com/bolt-design-system/bolt/commit/966315b))
* create character component, clean BEM on connection ([48a91dc](https://github.com/bolt-design-system/bolt/commit/48a91dc))
* create user config, declare css/js in it ([d0545c0](https://github.com/bolt-design-system/bolt/commit/d0545c0))
* dropdown and nav cleanup ([4aba778](https://github.com/bolt-design-system/bolt/commit/4aba778))
* fade-in fade-out animation, add character background slot ([c8fec87](https://github.com/bolt-design-system/bolt/commit/c8fec87))
* new component "connection" ([eb08a1f](https://github.com/bolt-design-system/bolt/commit/eb08a1f))
* new package for animations ([2a69cbd](https://github.com/bolt-design-system/bolt/commit/2a69cbd))
* one character layout and bug fixes ([815c0dc](https://github.com/bolt-design-system/bolt/commit/815c0dc))
* properly register svg-animations to the editor ([b1e242a](https://github.com/bolt-design-system/bolt/commit/b1e242a))
* registar bolt connection with grapes ([528104e](https://github.com/bolt-design-system/bolt/commit/528104e))
* registar bolt-cta with the editor ([90d521b](https://github.com/bolt-design-system/bolt/commit/90d521b))
* registar bolt-links to the editor ([9d58163](https://github.com/bolt-design-system/bolt/commit/9d58163))
* registar link and cta component with grapes ([98596fc](https://github.com/bolt-design-system/bolt/commit/98596fc))
* register animation components in editor ([49ebf6a](https://github.com/bolt-design-system/bolt/commit/49ebf6a))
* remove old pl markup, add band examples of micro journeys ([4490a6e](https://github.com/bolt-design-system/bolt/commit/4490a6e))
* setting up animation view trigger js ([ba538b2](https://github.com/bolt-design-system/bolt/commit/ba538b2))
* setup editor blocks for initial micro journeys ([287463a](https://github.com/bolt-design-system/bolt/commit/287463a))
* setup markup for fully animated two character layout template ([f5bbd9a](https://github.com/bolt-design-system/bolt/commit/f5bbd9a))
* start examples of staggered bands ([dddf999](https://github.com/bolt-design-system/bolt/commit/dddf999))
* step triggering build in and build outs ([791ca88](https://github.com/bolt-design-system/bolt/commit/791ca88))
* transfer image assests into micro journey package ([0a7032e](https://github.com/bolt-design-system/bolt/commit/0a7032e))
* update character to work with both pre-defined img and custom url ([753b258](https://github.com/bolt-design-system/bolt/commit/753b258))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update first step to match new comp ([b2ba98b](https://github.com/bolt-design-system/bolt/commit/b2ba98b))
* **animate:** can add show-meta attribute ([38c15f9](https://github.com/bolt-design-system/bolt/commit/38c15f9))
* **bolt-animate:** add debug optional debug flag ([#1404](https://github.com/bolt-design-system/bolt/issues/1404)) ([3ab4b3c](https://github.com/bolt-design-system/bolt/commit/3ab4b3c))
* **build-tools:** add JS as schema file option ([4f7dbd0](https://github.com/bolt-design-system/bolt/commit/4f7dbd0))
* **core:** add build meta data to window.bolt.meta ([1ac2207](https://github.com/bolt-design-system/bolt/commit/1ac2207))
* **core:** add getData JS function for getting "NAME.bolt.json" data ([e3d96e4](https://github.com/bolt-design-system/bolt/commit/e3d96e4))
* **editor:** add layer panel ([451bebc](https://github.com/bolt-design-system/bolt/commit/451bebc))
* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* **editor:** ensure only Chrome can open ([ded0dfc](https://github.com/bolt-design-system/bolt/commit/ded0dfc))
* **editor:** highlight droppable slots on block drag ([dc1b411](https://github.com/bolt-design-system/bolt/commit/dc1b411))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/commit/8002a26))
* **editor:** move buttons on top ([77fc2a4](https://github.com/bolt-design-system/bolt/commit/77fc2a4))
* **editor:** much improved slot dropzones ([7d3bcc0](https://github.com/bolt-design-system/bolt/commit/7d3bcc0))
* **icons:** add exclamation icon ([af221dd](https://github.com/bolt-design-system/bolt/commit/af221dd))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))
* **micro-journeys:** exposing multiple schemas ([460b7c6](https://github.com/bolt-design-system/bolt/commit/460b7c6))
* **micro-journeys:** extend bolt dropdown and theme to comps ([03c52e2](https://github.com/bolt-design-system/bolt/commit/03c52e2))
* **micro-journeys:** extend bolt-dropdown ([d8a9652](https://github.com/bolt-design-system/bolt/commit/d8a9652))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* **micro-journeys:** hide everything till ready ([71d4f55](https://github.com/bolt-design-system/bolt/commit/71d4f55))
* **micro-journeys:** re-style tabs after refactor; replace colors with theme ones ([8a2f14e](https://github.com/bolt-design-system/bolt/commit/8a2f14e))
* update steps 2 and 3 to new comp ([f500325](https://github.com/bolt-design-system/bolt/commit/f500325))
* update steps 4 5 6 ([a6bbbf0](https://github.com/bolt-design-system/bolt/commit/a6bbbf0))
* update webpack to process png with file-loader ([569fd24](https://github.com/bolt-design-system/bolt/commit/569fd24))
* various image updates for steps ([aa77860](https://github.com/bolt-design-system/bolt/commit/aa77860))
* wip transfer to new package structure, new PL docs ([7627e83](https://github.com/bolt-design-system/bolt/commit/7627e83))
* **svg-animations:** add character in front of animation ([8ae2603](https://github.com/bolt-design-system/bolt/commit/8ae2603))
* **svg-component:** add animated svg components ([#1343](https://github.com/bolt-design-system/bolt/issues/1343)) ([c82108f](https://github.com/bolt-design-system/bolt/commit/c82108f))


### Reverts

* revert Travis config updates ([30c6ecd](https://github.com/bolt-design-system/bolt/commit/30c6ecd))

## [2.7.1](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.7.1) (2019-09-20)

* add missing fuse.js library to Typeahead ([55e72c4](https://github.com/bolt-design-system/bolt/commit/55e72c4))





# [2.7.0](https://github.com/bolt-design-system/bolt/compare/v2.6.0...v2.7.0) (2019-09-13)


### Bug Fixes

* add CSS var override to make sure there's adequate contrast between the outer icon shape vs inner icon shape ([bc7ef42](https://github.com/bolt-design-system/bolt/commit/bc7ef42))
* add Drupal Lab @bolt/core and @bolt/components-image workarounds ([28267db](https://github.com/bolt-design-system/bolt/commit/28267db))
* add find-index polyfill for IE ([205b9b1](https://github.com/bolt-design-system/bolt/commit/205b9b1))
* add minor button reset styles ([332b133](https://github.com/bolt-design-system/bolt/commit/332b133))
* add missing <style> tag for the parent <bolt-typeahead> component ([82443e3](https://github.com/bolt-design-system/bolt/commit/82443e3))
* add missing component dependency ([e3fdc0c](https://github.com/bolt-design-system/bolt/commit/e3fdc0c))
* add missing dependency ([c8f3ad0](https://github.com/bolt-design-system/bolt/commit/c8f3ad0))
* add missing fetch polyfill needed for IE 11 support ([42c6a75](https://github.com/bolt-design-system/bolt/commit/42c6a75))
* address prettier formatting issues ([41c0076](https://github.com/bolt-design-system/bolt/commit/41c0076))
* address prettier issues ([2251bf5](https://github.com/bolt-design-system/bolt/commit/2251bf5))
* address prettier issues with webpack config file ([9cf64f7](https://github.com/bolt-design-system/bolt/commit/9cf64f7))
* address stylelint issues ([00d1fba](https://github.com/bolt-design-system/bolt/commit/00d1fba))
* comment-out findIndex polyfill for now, exposing a bug in table JS ([5e9831b](https://github.com/bolt-design-system/bolt/commit/5e9831b))
* disable linting on patched libs ([0c8b76d](https://github.com/bolt-design-system/bolt/commit/0c8b76d))
* fix eslint issues ([89d358f](https://github.com/bolt-design-system/bolt/commit/89d358f))
* fix eslint issues ([dc6a2eb](https://github.com/bolt-design-system/bolt/commit/dc6a2eb))
* fix linting issue ([89f1f28](https://github.com/bolt-design-system/bolt/commit/89f1f28))
* fix prettier / eslint issues ([ab80b1e](https://github.com/bolt-design-system/bolt/commit/ab80b1e))
* fix prettier issues ([5a2bd89](https://github.com/bolt-design-system/bolt/commit/5a2bd89))
* fix Webpack CSS Modules issue ([9a1a755](https://github.com/bolt-design-system/bolt/commit/9a1a755))
* flip tabindex so that active tab gets focus, other are skipped; use arrows to navigate ([5b1106e](https://github.com/bolt-design-system/bolt/commit/5b1106e))
* hide the clear button differently depending on if JS rendered vs HTML-rendered; minor styling updates to account for the new nested <bolt-autosuggest> sub-component ([1c12bf9](https://github.com/bolt-design-system/bolt/commit/1c12bf9))
* ignore missing SVG icons in the Twig template when attempting to inline the fallback SVG icon ([4a0381b](https://github.com/bolt-design-system/bolt/commit/4a0381b))
* increase max timeout in Carousel component Jest tests to reduce errors thrown ([f695913](https://github.com/bolt-design-system/bolt/commit/f695913))
* make sure all available prop data gets passed along to any listeners added ([18b2d07](https://github.com/bolt-design-system/bolt/commit/18b2d07))
* make sure all Typeahead demos check to make sure the demo selector exists ([b623357](https://github.com/bolt-design-system/bolt/commit/b623357))
* make sure to pass along config handling the maxResults option ([6e094cf](https://github.com/bolt-design-system/bolt/commit/6e094cf))
* make sure to use the right method when rendering to the Light DOM ([422eeeb](https://github.com/bolt-design-system/bolt/commit/422eeeb))
* prettier reformatting ([361cb6b](https://github.com/bolt-design-system/bolt/commit/361cb6b))
* prevent animation overflow to trigger scrollbar ([c45a9d8](https://github.com/bolt-design-system/bolt/commit/c45a9d8))
* prevent shadow size to grow with height of the content container ([4c9b092](https://github.com/bolt-design-system/bolt/commit/4c9b092))
* re-add yarn.lock + remove twig-renderer patch no longer needed / throwing an error ([e3ec506](https://github.com/bolt-design-system/bolt/commit/e3ec506))
* re-test Drupal Lab build ([ad883f4](https://github.com/bolt-design-system/bolt/commit/ad883f4))
* refactor constructors for IE 11 support ([c841f68](https://github.com/bolt-design-system/bolt/commit/c841f68))
* reformat icon `preload` prop description ([183a0ab](https://github.com/bolt-design-system/bolt/commit/183a0ab))
* remove duplicate docs content ([db4ad8c](https://github.com/bolt-design-system/bolt/commit/db4ad8c))
* remove include ([1820119](https://github.com/bolt-design-system/bolt/commit/1820119))
* rename Bolt SVG icon to ensure the path name + icon name match up ([b33a41d](https://github.com/bolt-design-system/bolt/commit/b33a41d))
* revert font weight change to results + remove vendor prefix for appearance CSS property ([26878c4](https://github.com/bolt-design-system/bolt/commit/26878c4))
* set `selected` attr, was buggy in IE11 ([47da661](https://github.com/bolt-design-system/bolt/commit/47da661))
* switch back to using original button component API + point to pre-packaged Typeahead demo ([7c0d2c0](https://github.com/bolt-design-system/bolt/commit/7c0d2c0))
* temp disable OptimizeCssAssetsPlugin due to error ([99b7678](https://github.com/bolt-design-system/bolt/commit/99b7678))
* temp disable SSR server patch ([4d820a8](https://github.com/bolt-design-system/bolt/commit/4d820a8))
* temporarily disable scrollIntoView() ([22ab7bb](https://github.com/bolt-design-system/bolt/commit/22ab7bb))
* temporarily switch to using a locally patched version of get-own-property-symbols to fix patch-package-related postinstall issues ([ce1b187](https://github.com/bolt-design-system/bolt/commit/ce1b187))
* temporarily switch to using a locally patched version of lazysizes to fix patch-package-related postinstall issues ([8a50642](https://github.com/bolt-design-system/bolt/commit/8a50642))
* themed docs ([24ed29c](https://github.com/bolt-design-system/bolt/commit/24ed29c))
* update build tool snapshots ([d632488](https://github.com/bolt-design-system/bolt/commit/d632488))
* update build tools Jest snapshot ([62b9816](https://github.com/bolt-design-system/bolt/commit/62b9816))
* update build tools snapshot ([965d3b0](https://github.com/bolt-design-system/bolt/commit/965d3b0))
* update code to match .com branch ([446de1c](https://github.com/bolt-design-system/bolt/commit/446de1c))
* update icon component snapshots ([8361a55](https://github.com/bolt-design-system/bolt/commit/8361a55))
* update icon component snapshots ([1ad5fba](https://github.com/bolt-design-system/bolt/commit/1ad5fba))
* update Jest snapshot for Typeahead ([8741271](https://github.com/bolt-design-system/bolt/commit/8741271))
* update jest-image-snapshot to fix warnings getting thrown ([a4217b1](https://github.com/bolt-design-system/bolt/commit/a4217b1))
* update Navbar component to allow passing in additional Icon component config options ([ae8c6f1](https://github.com/bolt-design-system/bolt/commit/ae8c6f1))
* update PL main demo page for Typeahead ([5f8afd4](https://github.com/bolt-design-system/bolt/commit/5f8afd4))
* update snapshots + linting updates ([fa59ce6](https://github.com/bolt-design-system/bolt/commit/fa59ce6))
* update svgo Webpack config import so the config customizations work as expected ([2ef3644](https://github.com/bolt-design-system/bolt/commit/2ef3644))
* update Tab logic to only grab immediately nested Tab Panels ([a013e5d](https://github.com/bolt-design-system/bolt/commit/a013e5d))
* update Tab styles to only target immediately nested panels ([a746534](https://github.com/bolt-design-system/bolt/commit/a746534))
* update test file to address prettier issue ([e5e8198](https://github.com/bolt-design-system/bolt/commit/e5e8198))
* update Webpack config to omit all css-module plugins when not compiling *.scoped.scss files ([329b52a](https://github.com/bolt-design-system/bolt/commit/329b52a))
* upgrade Twig renderer to the latest version to fix occasional memory errors getting thrown ([d0bdb39](https://github.com/bolt-design-system/bolt/commit/d0bdb39))
* use cursor pointer on both active and inactive tabs ([32bcecc](https://github.com/bolt-design-system/bolt/commit/32bcecc))


### Features

* add `inset`, `label_spacing`, and `panel_spacing` props to schems, $ref support ([1057bf0](https://github.com/bolt-design-system/bolt/commit/1057bf0))
* add `type` prop to Trigger component ([f57b2c6](https://github.com/bolt-design-system/bolt/commit/f57b2c6))
* add <title> support to SVG icons ([19e4c72](https://github.com/bolt-design-system/bolt/commit/19e4c72))
* add <title> support to SVG icons ([2849ff4](https://github.com/bolt-design-system/bolt/commit/2849ff4))
* add ability to conditionally enable / disable highlighting the search results ([0e0dfc9](https://github.com/bolt-design-system/bolt/commit/0e0dfc9))
* add ability to display titles in SVG icons + add POC ability to server-side render specific icons ([f64dc9a](https://github.com/bolt-design-system/bolt/commit/f64dc9a))
* add ability to display titles in SVG icons + add POC ability to server-side render specific icons ([5b691e8](https://github.com/bolt-design-system/bolt/commit/5b691e8))
* add auto-generated scoped classname ([b233471](https://github.com/bolt-design-system/bolt/commit/b233471))
* add css module support to Bolt ([f0b697d](https://github.com/bolt-design-system/bolt/commit/f0b697d))
* add customized version of classnames library with added support for CSS modules ([31dfc75](https://github.com/bolt-design-system/bolt/commit/31dfc75))
* add demo of background image valign, add bottom margin to all background demos ([edd19dd](https://github.com/bolt-design-system/bolt/commit/edd19dd))
* add demo page for `selected_tab` ([0f5fe6a](https://github.com/bolt-design-system/bolt/commit/0f5fe6a))
* add early typeahead demo with custom hooks to modify result behavior ([8023287](https://github.com/bolt-design-system/bolt/commit/8023287))
* add new @bolt/core withEvents mixin to more easily add declarative events to components ([f7a07b3](https://github.com/bolt-design-system/bolt/commit/f7a07b3))
* add optional Twig template blocks to the Button and Icon component; workaround to SSR-rendered SVG icons for Typeahead without requiring build tool updates ([71dafa9](https://github.com/bolt-design-system/bolt/commit/71dafa9))
* add Pattern Lab demo + component updates to support fully dynamic / async fetched search results ([82b7d41](https://github.com/bolt-design-system/bolt/commit/82b7d41))
* add standalone typeahead demo without any docs included ([b85a513](https://github.com/bolt-design-system/bolt/commit/b85a513))
* add support for compiling private methods on Classes ([5a196b0](https://github.com/bolt-design-system/bolt/commit/5a196b0))
* add tabs component ([b591d67](https://github.com/bolt-design-system/bolt/commit/b591d67))
* add todos regarding 3.0 deprecations ([2245f24](https://github.com/bolt-design-system/bolt/commit/2245f24))
* automatically invert SVG icon color at the Twig level ([802be34](https://github.com/bolt-design-system/bolt/commit/802be34))
* automatically invert SVG icon color at the Twig level ([3f4aa00](https://github.com/bolt-design-system/bolt/commit/3f4aa00))
* automatically replace hard coded fill and stroke colors in inlined SVGs with CSS custom prop placeholders ([9cc1887](https://github.com/bolt-design-system/bolt/commit/9cc1887))
* automatically replace hard coded fill and stroke colors in inlined SVGs with CSS custom prop placeholders ([dad8745](https://github.com/bolt-design-system/bolt/commit/dad8745))
* initially wire up typeahead ([9f19226](https://github.com/bolt-design-system/bolt/commit/9f19226))
* iterating on the Typeahead API + examples ([d0e074a](https://github.com/bolt-design-system/bolt/commit/d0e074a))
* JS + CSS for new spacing props, update hover and focus styles, general clean up ([f7dbc4c](https://github.com/bolt-design-system/bolt/commit/f7dbc4c))
* make PL viewport width 100% by default when JS is disabled ([fdca217](https://github.com/bolt-design-system/bolt/commit/fdca217))
* port over Craft CMS Twig filter that adds support for using regex in the default Twig replace filter ([1d29f45](https://github.com/bolt-design-system/bolt/commit/1d29f45))
* port over Craft CMS Twig filter that adds support for using regex in the default Twig replace filter ([c11aa05](https://github.com/bolt-design-system/bolt/commit/c11aa05))
* pull in all SVG icons into the Webpack build automatically ([c02de0b](https://github.com/bolt-design-system/bolt/commit/c02de0b))
* pull in all SVG icons into the Webpack build automatically ([a8f24a5](https://github.com/bolt-design-system/bolt/commit/a8f24a5))
* re-add scroll-into-view, now with "if-needed" ([60002c8](https://github.com/bolt-design-system/bolt/commit/60002c8))
* rename `items` to `panels` ([46e8478](https://github.com/bolt-design-system/bolt/commit/46e8478))
* schema updates to `label_spacing`, `panel_spacing`, `inset`, and `uuid`; update docs ([f756568](https://github.com/bolt-design-system/bolt/commit/f756568))
* set selected tab color to 'headline' ([441ad56](https://github.com/bolt-design-system/bolt/commit/441ad56))
* setup scrollIntoView behavior, fix ssr-hydrate, remove unused parts of tabs JS ([f8e63a3](https://github.com/bolt-design-system/bolt/commit/f8e63a3))
* update active label color ([44c91c3](https://github.com/bolt-design-system/bolt/commit/44c91c3))
* update bolt-icon to now eagerly load so pre-rendered icons don't flash when booting up ([5ccb817](https://github.com/bolt-design-system/bolt/commit/5ccb817))
* update bolt-icon to now eagerly load so pre-rendered icons don't flash when booting up ([bf47407](https://github.com/bolt-design-system/bolt/commit/bf47407))
* update clear icon to "close-solid" ([ddc336c](https://github.com/bolt-design-system/bolt/commit/ddc336c))
* update inset, not-inset button styles ([3982c09](https://github.com/bolt-design-system/bolt/commit/3982c09))
* update tabs package.json to beta.2 ([e45bcb5](https://github.com/bolt-design-system/bolt/commit/e45bcb5))
* update Webpack build to minify SVG icons through SVGO — used for server-side pre-rendering SVGs ([7d0c684](https://github.com/bolt-design-system/bolt/commit/7d0c684))
* update Webpack build to minify SVG icons through SVGO — used for server-side pre-rendering SVGs ([08f7f4f](https://github.com/bolt-design-system/bolt/commit/08f7f4f))
* update webpack CSS Module behavior to exclude t-bolt classes from getting mangled ([dbbc5b4](https://github.com/bolt-design-system/bolt/commit/dbbc5b4))
* wire up typeahead Twig + web component buildout ([8909c3a](https://github.com/bolt-design-system/bolt/commit/8909c3a))


### Reverts

* revert adding SVG icon assets to the icons component folder — move back to using the wwwDir / buildDir to organize everything ([ecdfcfb](https://github.com/bolt-design-system/bolt/commit/ecdfcfb))





# [2.6.0](https://github.com/bolt-design-system/bolt/compare/v2.6.0-beta.2...v2.6.0) (2019-08-30)


### Bug Fixes

* check that `lazySizes.elements` is defined before pushing to it ([1704cec](https://github.com/bolt-design-system/bolt/commit/1704cec))
* doc copy ([b8cece8](https://github.com/bolt-design-system/bolt/commit/b8cece8))
* make sure text styles are not inherited from external container and correct cursor type on overlay ([7bc8444](https://github.com/bolt-design-system/bolt/commit/7bc8444))
* move event listeners outside of promise to fix IE11 race condition ([e5fbc1f](https://github.com/bolt-design-system/bolt/commit/e5fbc1f))
* prevent id attribute from being duplicated inside link component ([6a63a50](https://github.com/bolt-design-system/bolt/commit/6a63a50))
* typo on testing instructions ([660c30a](https://github.com/bolt-design-system/bolt/commit/660c30a))
* update JS on/off testing instruction ([73202d6](https://github.com/bolt-design-system/bolt/commit/73202d6))





# [2.6.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.6.0-beta.1...v2.6.0-beta.2) (2019-08-27)


### Bug Fixes

* add missing `yeoman-doctor` dependency ([d2dfe0c](https://github.com/bolt-design-system/bolt/commit/d2dfe0c))
* make sure lerna bootstrap runs for local dev installs + devDeps install on Travis ([24b5cb2](https://github.com/bolt-design-system/bolt/commit/24b5cb2))
* update build tools Jest snapshot ([ab073c2](https://github.com/bolt-design-system/bolt/commit/ab073c2))
* update icon snapshot to reflect minor SVG compression changes ([5b9c569](https://github.com/bolt-design-system/bolt/commit/5b9c569))
* update root NPM scripts to automatically pre-build the new `@bolt/critical-path-polyfills` package when doing local development ([3fe3e98](https://github.com/bolt-design-system/bolt/commit/3fe3e98))


### Features

* deprecate `isBackgroundVideo`, remove from demos, add todos where prop is used ([ce9a25d](https://github.com/bolt-design-system/bolt/commit/ce9a25d))


### Reverts

* hook into postbootstrap for building new pkg ([dc83aaf](https://github.com/bolt-design-system/bolt/commit/dc83aaf))





# [2.6.0-beta.1](https://github.com/bolt-design-system/bolt/compare/v2.5.6...v2.6.0-beta.1) (2019-08-09)


### Bug Fixes

* accidentally set 'target' attr instead of 'tabindex' ([845a472](https://github.com/bolt-design-system/bolt/commit/845a472))
* add 'disabled' attr to button component ([d5081f1](https://github.com/bolt-design-system/bolt/commit/d5081f1))
* add 'disabled' attr to trigger component ([5d53cd2](https://github.com/bolt-design-system/bolt/commit/5d53cd2))
* add 'target' in twig if passed via attributes ([6b0317e](https://github.com/bolt-design-system/bolt/commit/6b0317e))
* add @bolt/core fix to a handful of utility classes missing on Japanese-specific lang builds ([e03abf1](https://github.com/bolt-design-system/bolt/commit/e03abf1))
* add calculated placeholder image / placeholder color to the image component Twig template's <bolt-image> wrapper if a custom version isn't specified ([c41696b](https://github.com/bolt-design-system/bolt/commit/c41696b))
* add comments ([545fde2](https://github.com/bolt-design-system/bolt/commit/545fde2))
* add CSS fix to make sure low quality image placeholders get the blur effect while the main image is lazyloaded ([3815a57](https://github.com/bolt-design-system/bolt/commit/3815a57))
* add custom cursor files ([1fdc43c](https://github.com/bolt-design-system/bolt/commit/1fdc43c))
* add install command to travis for build tools tests + update yarn.lock ([5a3f3df](https://github.com/bolt-design-system/bolt/commit/5a3f3df))
* add missing calls to super in navlink JS ([9f3bd31](https://github.com/bolt-design-system/bolt/commit/9f3bd31))
* add missing config to disable Shadow DOM in the Navlink component (temp workaround to component not currently rendering HTML) ([f1ac0c1](https://github.com/bolt-design-system/bolt/commit/f1ac0c1))
* add missing log dependency to cli.js ([63ee6e3](https://github.com/bolt-design-system/bolt/commit/63ee6e3))
* add new CLI flags for jest to reduce total # of concurrent workers allowed ([6445b5f](https://github.com/bolt-design-system/bolt/commit/6445b5f))
* add new option to the image task to optionally disable image compression; used when making / running VRTs ([6cd2d9a](https://github.com/bolt-design-system/bolt/commit/6cd2d9a))
* add pointer as fallback for zoom-in and zoom-out in IE11 ([c31d2de](https://github.com/bolt-design-system/bolt/commit/c31d2de))
* add temporary patch to @basalt/twig-renderer to try and prevent unavailable ports from getting assigned + temporarily add get-port package until this patch is no longer needed ([2625bd2](https://github.com/bolt-design-system/bolt/commit/2625bd2))
* add trigger as dependency for modal ([e14e2f7](https://github.com/bolt-design-system/bolt/commit/e14e2f7))
* address eslint issues ([e330908](https://github.com/bolt-design-system/bolt/commit/e330908))
* address prettier issue ([226dec3](https://github.com/bolt-design-system/bolt/commit/226dec3))
* adjust Japanese-specific CSS build test ([16d1d23](https://github.com/bolt-design-system/bolt/commit/16d1d23))
* adjust test filter cli to work on Travis ([0835ff7](https://github.com/bolt-design-system/bolt/commit/0835ff7))
* allow for images passed into the blockquote component to be lazyloaded ([e3b3b39](https://github.com/bolt-design-system/bolt/commit/e3b3b39))
* apply .is-expanded rule to .c-bolt-band to fix background video bug in ie ([d2394df](https://github.com/bolt-design-system/bolt/commit/d2394df))
* bump dependency versions used in build tool tests ([ee425c0](https://github.com/bolt-design-system/bolt/commit/ee425c0))
* carousel chevron subpixel render ([dc91245](https://github.com/bolt-design-system/bolt/commit/dc91245))
* change when monorepo tests ([c906697](https://github.com/bolt-design-system/bolt/commit/c906697))
* cherry pick build tools updates from https://github.com/bolt-design-system/bolt/pull/1323 ([0676e3a](https://github.com/bolt-design-system/bolt/commit/0676e3a))
* correctly add all dependencies ([d9de9c0](https://github.com/bolt-design-system/bolt/commit/d9de9c0))
* correctly ignore monorepo tests in main tests ([fba3cc0](https://github.com/bolt-design-system/bolt/commit/fba3cc0))
* cursor size ([c8e9c68](https://github.com/bolt-design-system/bolt/commit/c8e9c68))
* dependency map twig namespaces path ([6c1fb1a](https://github.com/bolt-design-system/bolt/commit/6c1fb1a))
* don't re-blur the image component once it has already loaded the first time. fixes a lazy-loaded related rendering issue when updating the src / srcset props after the image component has already loaded up ([e95ada7](https://github.com/bolt-design-system/bolt/commit/e95ada7))
* ensure dep tester paths are more resiliant ([7c2abb8](https://github.com/bolt-design-system/bolt/commit/7c2abb8))
* escape linting ([2212614](https://github.com/bolt-design-system/bolt/commit/2212614))
* exclude Yeoman component generator from monorepo / Twig dependency checks ([df3dbdd](https://github.com/bolt-design-system/bolt/commit/df3dbdd))
* execa usage ([8836d22](https://github.com/bolt-design-system/bolt/commit/8836d22))
* execa usage ([044059b](https://github.com/bolt-design-system/bolt/commit/044059b))
* fix eslint errors ([6d7f6a4](https://github.com/bolt-design-system/bolt/commit/6d7f6a4))
* fix eslint issue ([4af8f2e](https://github.com/bolt-design-system/bolt/commit/4af8f2e))
* fix eslint issue + update Drupal Lab patch ([0082e19](https://github.com/bolt-design-system/bolt/commit/0082e19))
* fix image task to properly generate srcsets in prod mode ([332ffda](https://github.com/bolt-design-system/bolt/commit/332ffda))
* fix lint issue ([03a1bb3](https://github.com/bolt-design-system/bolt/commit/03a1bb3))
* fix lint issue ([9e82e93](https://github.com/bolt-design-system/bolt/commit/9e82e93))
* fix nav scrollbar in IE 11 + fix dependency-related JS error getting thrown in IE 11 ([e777ca2](https://github.com/bolt-design-system/bolt/commit/e777ca2))
* fix prettier issue ([80b456e](https://github.com/bolt-design-system/bolt/commit/80b456e))
* fix prettier issue ([787c3de](https://github.com/bolt-design-system/bolt/commit/787c3de))
* fix prettier issue ([15b2563](https://github.com/bolt-design-system/bolt/commit/15b2563))
* fix stylelint error ([3abbb7b](https://github.com/bolt-design-system/bolt/commit/3abbb7b))
* fix typo in VRT reporting for Travis ([69f1d6e](https://github.com/bolt-design-system/bolt/commit/69f1d6e))
* fix webpack prettier issue ([d784e7d](https://github.com/bolt-design-system/bolt/commit/d784e7d))
* globally update max timeout in Jest ([f1e6f95](https://github.com/bolt-design-system/bolt/commit/f1e6f95))
* ignore Drupal Lab package.json from getting picked up by testing utils ([5c38668](https://github.com/bolt-design-system/bolt/commit/5c38668))
* ignore skipped e2e tests in Jest ([65d4e75](https://github.com/bolt-design-system/bolt/commit/65d4e75))
* immediately load up the pl-search component vs defer loading ([3a49603](https://github.com/bolt-design-system/bolt/commit/3a49603))
* initially add the current image component width to the `sizes` prop when the prop is set to `auto` ([87adbcb](https://github.com/bolt-design-system/bolt/commit/87adbcb))
* jest exclusion ([bd69a85](https://github.com/bolt-design-system/bolt/commit/bd69a85))
* lazily automatically calculate the correct image sizes prop if set to auto and the image component's window gets resized ([87217e3](https://github.com/bolt-design-system/bolt/commit/87217e3))
* limit now.sh deployment to just the www folder ([de7172a](https://github.com/bolt-design-system/bolt/commit/de7172a))
* lint js ([7193a3b](https://github.com/bolt-design-system/bolt/commit/7193a3b))
* lint js ([9b6c152](https://github.com/bolt-design-system/bolt/commit/9b6c152))
* lint js ([a9a6cd8](https://github.com/bolt-design-system/bolt/commit/a9a6cd8))
* lint js ([3c96888](https://github.com/bolt-design-system/bolt/commit/3c96888))
* logging out stderr instead of stdout ([406e168](https://github.com/bolt-design-system/bolt/commit/406e168))
* major cross browser fixes + polyfill updates ([50b4214](https://github.com/bolt-design-system/bolt/commit/50b4214))
* make sure build tools test install runs postinstall scripts ([007d1ce](https://github.com/bolt-design-system/bolt/commit/007d1ce))
* make sure config schema path can be resolved in the build tools CLI ([239e4cc](https://github.com/bolt-design-system/bolt/commit/239e4cc))
* make sure Jest tests using the Twig Renderer stop the server when finished ([5e880f5](https://github.com/bolt-design-system/bolt/commit/5e880f5))
* make sure the config-file CLI args work together with the default cosmic config behavior ([8a303b8](https://github.com/bolt-design-system/bolt/commit/8a303b8))
* mark as private for now ([f7eb881](https://github.com/bolt-design-system/bolt/commit/f7eb881))
* move the yarn workspaces' nohoist config under workspaces ([973be0f](https://github.com/bolt-design-system/bolt/commit/973be0f))
* only add the `data-sizes` prop to the image component when lazyloading ([4c9f463](https://github.com/bolt-design-system/bolt/commit/4c9f463))
* only display component explorer message on docs pages where previous getting used ([a112aa9](https://github.com/bolt-design-system/bolt/commit/a112aa9))
* only output placeholder color / placeholder image when lazyloading ([283ce71](https://github.com/bolt-design-system/bolt/commit/283ce71))
* pass the <bolt-image> web component the correct prop data for any base64 low quality placeholder + average image color options that exists. This fixes a visible flash that had been occurring when the web component initially boots up and renders ([cd96387](https://github.com/bolt-design-system/bolt/commit/cd96387))
* pattern lab override, position 'relative' causing modal choppiness on scroll ([29b622f](https://github.com/bolt-design-system/bolt/commit/29b622f))
* prettify CSS result from the @bolt/build-tools before doing snapshot diff ([a50ffa5](https://github.com/bolt-design-system/bolt/commit/a50ffa5))
* prevent globbing into gitignore folders ([58b7043](https://github.com/bolt-design-system/bolt/commit/58b7043))
* quote the `lang` global JS data to fix JS error getting thrown ([ce3ee2c](https://github.com/bolt-design-system/bolt/commit/ce3ee2c))
* re-test build tool Travis tests ([fcc7467](https://github.com/bolt-design-system/bolt/commit/fcc7467))
* remove --no-verify arg ([6cd4200](https://github.com/bolt-design-system/bolt/commit/6cd4200))
* remove 'noBodyScroll' prop in favor of private variable ([702200a](https://github.com/bolt-design-system/bolt/commit/702200a))
* remove copy from doc page ([5dd5eff](https://github.com/bolt-design-system/bolt/commit/5dd5eff))
* remove default sizes attribute from getting added to the device viewer component ([280a306](https://github.com/bolt-design-system/bolt/commit/280a306))
* remove duplicate pkg ([e52396a](https://github.com/bolt-design-system/bolt/commit/e52396a))
* remove eslint comment being picked up ([ff4c14d](https://github.com/bolt-design-system/bolt/commit/ff4c14d))
* remove inline includes ([b1df1a2](https://github.com/bolt-design-system/bolt/commit/b1df1a2))
* remove obsolete snapshots ([feba331](https://github.com/bolt-design-system/bolt/commit/feba331))
* remove outline from button and link custom-elements to fix double-focus ([5454d1f](https://github.com/bolt-design-system/bolt/commit/5454d1f))
* remove postinstall + rename dev npm script ([e431212](https://github.com/bolt-design-system/bolt/commit/e431212))
* remove remaining schema form JS import ([7813dcf](https://github.com/bolt-design-system/bolt/commit/7813dcf))
* remove travis command typo ([84ba7ae](https://github.com/bolt-design-system/bolt/commit/84ba7ae))
* remove travis_retry when running Nightwatch e2e tests ([b1c5b63](https://github.com/bolt-design-system/bolt/commit/b1c5b63))
* remove unused classname ([5904236](https://github.com/bolt-design-system/bolt/commit/5904236))
* Remove unwanted behaviour when JS is disabled ([6d2033d](https://github.com/bolt-design-system/bolt/commit/6d2033d))
* remove yeti icon ([488af87](https://github.com/bolt-design-system/bolt/commit/488af87))
* rename 'preventBodyScroll' to 'noBodyScroll' ([5b6ab74](https://github.com/bolt-design-system/bolt/commit/5b6ab74))
* rename nav-button-position prop in jest test, update snapshot ([713af90](https://github.com/bolt-design-system/bolt/commit/713af90))
* replace %extends with separate element and :host selectors to fix IE bug ([ff75848](https://github.com/bolt-design-system/bolt/commit/ff75848))
* restore component snapshots to have background color / image props added (regardless on if they are being lazyloaded or not) ([b4857b9](https://github.com/bolt-design-system/bolt/commit/b4857b9))
* restore regular modal width ([36b0157](https://github.com/bolt-design-system/bolt/commit/36b0157))
* retest build after removing Babel-related dependencies hoisted when installing ([733cf0d](https://github.com/bolt-design-system/bolt/commit/733cf0d))
* retest Jest after making blockquote test adjustments ([670df4d](https://github.com/bolt-design-system/bolt/commit/670df4d))
* revert adding command to kill open ports ([e214ff7](https://github.com/bolt-design-system/bolt/commit/e214ff7))
* revert adding Japanese-specific .boltrc config ([1663b31](https://github.com/bolt-design-system/bolt/commit/1663b31))
* revert bolt/core dependency updates + temporarily remove yarn.lock to ensure a fresh install on Travis ([20c8386](https://github.com/bolt-design-system/bolt/commit/20c8386))
* revert patch change ([856d137](https://github.com/bolt-design-system/bolt/commit/856d137))
* rollback uikit dependency updates while debugging IE 11 ([9e67b83](https://github.com/bolt-design-system/bolt/commit/9e67b83))
* skip 2nd testing utils test causing errors ([86f6cc1](https://github.com/bolt-design-system/bolt/commit/86f6cc1))
* snaps ([27a2f3c](https://github.com/bolt-design-system/bolt/commit/27a2f3c))
* snaps ([26b5fcc](https://github.com/bolt-design-system/bolt/commit/26b5fcc))
* temporarily auto-patch the lazysizes JS to allow the internal element selector to be specified if a new `getElements` method is defined in the lazysizes config + update yarn.lock ([ec9b628](https://github.com/bolt-design-system/bolt/commit/ec9b628))
* temporarily disable carousel Jest test images from lazyloading ([af77e6f](https://github.com/bolt-design-system/bolt/commit/af77e6f))
* temporarily mark as private ([d2d0a7c](https://github.com/bolt-design-system/bolt/commit/d2d0a7c))
* temporarily mark as private ([1673619](https://github.com/bolt-design-system/bolt/commit/1673619))
* temporarily patch Drupal Lab build tools so Jest tests continue to pass until hotfix released ([874c679](https://github.com/bolt-design-system/bolt/commit/874c679))
* test and typo ([8aa43b3](https://github.com/bolt-design-system/bolt/commit/8aa43b3))
* tests ([12578d9](https://github.com/bolt-design-system/bolt/commit/12578d9))
* tighten up Twig RegEx parsing ([8d7b76b](https://github.com/bolt-design-system/bolt/commit/8d7b76b))
* typo ([dea7a00](https://github.com/bolt-design-system/bolt/commit/dea7a00))
* typo ([e8a3250](https://github.com/bolt-design-system/bolt/commit/e8a3250))
* update @bolt/analytics-autolink to catch errors thrown if a Google Analytics `analytics.js` script tag doesn't exist on the page. ([41bd669](https://github.com/bolt-design-system/bolt/commit/41bd669))
* update @bolt/analytics-autotrack package to catch a JS error thrown if `window.drupalSettings.google_analytics.trackCrossDomains` isn't defined ([5919c48](https://github.com/bolt-design-system/bolt/commit/5919c48))
* update <bolt-ratio> styles to prevent lazyloaded / blurred images from leaking out of the container ([6a032f4](https://github.com/bolt-design-system/bolt/commit/6a032f4))
* Update and simplify twig variables ([7cfe1dd](https://github.com/bolt-design-system/bolt/commit/7cfe1dd))
* update blockquote test config ([ab577a8](https://github.com/bolt-design-system/bolt/commit/ab577a8))
* update blockquote VRT snapshot ([b44721b](https://github.com/bolt-design-system/bolt/commit/b44721b))
* update build tool tests to format CSS before comparing results ([90cefe0](https://github.com/bolt-design-system/bolt/commit/90cefe0))
* update carousel snapshots + image screenshots to now incorporate lazyload-related fixes ([c42b5a4](https://github.com/bolt-design-system/bolt/commit/c42b5a4))
* update carousel VRT tests to render more consistently ([6ce545f](https://github.com/bolt-design-system/bolt/commit/6ce545f))
* update code for SSR server updates to fix eslint and prettier issues ([bf46bfd](https://github.com/bolt-design-system/bolt/commit/bf46bfd))
* update deps ([7fedea2](https://github.com/bolt-design-system/bolt/commit/7fedea2))
* update device viewer Jest snapshot to reflect updated image component + update yarn.lock ([3c6deff](https://github.com/bolt-design-system/bolt/commit/3c6deff))
* update eslint rules to temporarily ignore new uikit-related packages ([9a2eb46](https://github.com/bolt-design-system/bolt/commit/9a2eb46))
* update headline component Jest test to not use async forEach ([e9ed7cf](https://github.com/bolt-design-system/bolt/commit/e9ed7cf))
* update image component's Twig to always output placeholders when available + retest preloading ([20dfeaf](https://github.com/bolt-design-system/bolt/commit/20dfeaf))
* update internal @bolt/build-tools references to utils to globally use the NPM namespaced version so the config store matches across the board ([200bb63](https://github.com/bolt-design-system/bolt/commit/200bb63))
* update Jest CLI args + new testing utils CLI to handle instances when no packages have been updated ([114907b](https://github.com/bolt-design-system/bolt/commit/114907b))
* update Jest snapshot for the build tools ([acac6a6](https://github.com/bolt-design-system/bolt/commit/acac6a6))
* update Jest snapshot for the build tools ([a324904](https://github.com/bolt-design-system/bolt/commit/a324904))
* update Jest snapshots for build tools ([4bc99cb](https://github.com/bolt-design-system/bolt/commit/4bc99cb))
* update jest tests ([78cb2c7](https://github.com/bolt-design-system/bolt/commit/78cb2c7))
* update nightwatch config to fix chrome driver issues ([3ae6a7c](https://github.com/bolt-design-system/bolt/commit/3ae6a7c))
* update Nightwatch version + bump version of FF running on Sauce Labs ([f00bf6f](https://github.com/bolt-design-system/bolt/commit/f00bf6f))
* update now.sh config to make sure the www folder is the server root ([f096fc7](https://github.com/bolt-design-system/bolt/commit/f096fc7))
* update npm run test script to avoid spinning up duplicate Jest test instances ([40b33ed](https://github.com/bolt-design-system/bolt/commit/40b33ed))
* update patch path + commit ref ([e1b468d](https://github.com/bolt-design-system/bolt/commit/e1b468d))
* update path to action-block subcomponent, add test to confirm subcomponent renders ([17bd150](https://github.com/bolt-design-system/bolt/commit/17bd150))
* update ratio VRT snapshot with version not as pixelated ([13d498e](https://github.com/bolt-design-system/bolt/commit/13d498e))
* update snapshots based on image component fixes ([0d9590f](https://github.com/bolt-design-system/bolt/commit/0d9590f))
* update tests ([0a580d1](https://github.com/bolt-design-system/bolt/commit/0a580d1))
* update the monorepo Twig dependency test to exclude the renamed Yeoman generator ([53ae600](https://github.com/bolt-design-system/bolt/commit/53ae600))
* update the value getting assigned to the main `<img>` tag’s `src` attribute in the <bolt-image> Twig template. Previously this had been using the base64 encoded version of the image (when getting lazy loaded) but this was just adding extra HTML data without actually doing what it was supposed to be doing. Now this has been updated to specifically use the 1x1 placeholder pixel instead. ([4ec7db3](https://github.com/bolt-design-system/bolt/commit/4ec7db3))
* update theme logic in js to apply to close button ([b78f017](https://github.com/bolt-design-system/bolt/commit/b78f017))
* update travis CLI command to kill anything running on port 4444 ([adeb16e](https://github.com/bolt-design-system/bolt/commit/adeb16e))
* web component usage doc ([02c6459](https://github.com/bolt-design-system/bolt/commit/02c6459))
* wire up + add tests for Japanese-specific lang build fix in Drupal Lab ([093dcb2](https://github.com/bolt-design-system/bolt/commit/093dcb2))
* workaround to re-enable testing utils Jest tests ([c76012e](https://github.com/bolt-design-system/bolt/commit/c76012e))
* wrapping up pkg diff list utils ([17462cf](https://github.com/bolt-design-system/bolt/commit/17462cf))
* wrong variable name in trigger JS ([bad2ccc](https://github.com/bolt-design-system/bolt/commit/bad2ccc))


### Features

* add 'disabled' state to button link ([4943355](https://github.com/bolt-design-system/bolt/commit/4943355))
* add 'disabled' state to trigger link, update demo ([a538ac9](https://github.com/bolt-design-system/bolt/commit/a538ac9))
* add 'env' to global JS, wrap 'env' and 'lang' in JSON.stringify ([99f1a11](https://github.com/bolt-design-system/bolt/commit/99f1a11))
* add 'vrtDefaultConfig' export to testing-helpers, use in carousel test ([f3a7147](https://github.com/bolt-design-system/bolt/commit/f3a7147))
* add a nightwatch test for copy to clipboard ([4537e1b](https://github.com/bolt-design-system/bolt/commit/4537e1b))
* add ability to optionally align background images vertically ([a9ecfe4](https://github.com/bolt-design-system/bolt/commit/a9ecfe4))
* add cli to run Jest only on packages that changed ([4c14818](https://github.com/bolt-design-system/bolt/commit/4c14818))
* add demo of modal triggered by video 'toggle' ([42b9784](https://github.com/bolt-design-system/bolt/commit/42b9784))
* add demo page for trigger 'disabled' option ([11637e7](https://github.com/bolt-design-system/bolt/commit/11637e7))
* add dependency map tests ([b422ffa](https://github.com/bolt-design-system/bolt/commit/b422ffa))
* add dependency mapper ([d0dbb8b](https://github.com/bolt-design-system/bolt/commit/d0dbb8b))
* add functional test of bolt sticky ([c74043c](https://github.com/bolt-design-system/bolt/commit/c74043c))
* add new critical polyfill package + docs ([d15c6d0](https://github.com/bolt-design-system/bolt/commit/d15c6d0))
* add new inline polyfills package ([9a7e6bd](https://github.com/bolt-design-system/bolt/commit/9a7e6bd))
* add patch to allow VRTs images of different sizes to be tested ([013c28c](https://github.com/bolt-design-system/bolt/commit/013c28c))
* add repeat-rule mixin ([e8d24c7](https://github.com/bolt-design-system/bolt/commit/e8d24c7))
* adding git change details ([f9afde9](https://github.com/bolt-design-system/bolt/commit/f9afde9))
* cherry pick a build tools update to reuse the same browser tab you already had open when starting up / restarting the @bolt/build-tools ([b0a29f8](https://github.com/bolt-design-system/bolt/commit/b0a29f8))
* combine video modal demos into a single page ([95d8ec7](https://github.com/bolt-design-system/bolt/commit/95d8ec7))
* improve how we handle VRT errors from Jest locally when the now.sh token expected for Travis CI builds doesn't exist + add formatted summary of results + links when completed ([ba98929](https://github.com/bolt-design-system/bolt/commit/ba98929))
* move scrollbar helpers to core, scrollbar calc functions to Class, add 'preventBodyScroll' as prop ([5a731b0](https://github.com/bolt-design-system/bolt/commit/5a731b0))
* output `display` instead of `display="true"` for consistency ([aa28e34](https://github.com/bolt-design-system/bolt/commit/aa28e34))
* tweak the internal spacing for the Navbar so extra elements nested inside the main title section will automatically get spacing in between each item + eliminate the need for items themselves adding their own space ([8cbcf08](https://github.com/bolt-design-system/bolt/commit/8cbcf08))
* update custom events to bubble and include details about body scrollbar ([2584e00](https://github.com/bolt-design-system/bolt/commit/2584e00))
* update lazysizes default lazyloading config to be more conservative with preloading by default ([d393652](https://github.com/bolt-design-system/bolt/commit/d393652))
* update Webpack to handle .cur files (cursor file fallback when needed) ([01602ac](https://github.com/bolt-design-system/bolt/commit/01602ac))
* upgrade to now.sh v2 for handling the static site deployments ([8db7b15](https://github.com/bolt-design-system/bolt/commit/8db7b15))
* wire up new critical polyfill package as a reference + prep to wire it up to Drupal Lab ([ed7e73f](https://github.com/bolt-design-system/bolt/commit/ed7e73f))


### Reverts

* re-add yarn.lock ([044d063](https://github.com/bolt-design-system/bolt/commit/044d063))
* revert clipping Jest snapshots due to OS-level screenshot differences ([fc3e438](https://github.com/bolt-design-system/bolt/commit/fc3e438))
* revert disabling Travis CI jobs; update maxWorkers on Travis to 1 + local development to 3 ([87c4a4d](https://github.com/bolt-design-system/bolt/commit/87c4a4d))





## [2.5.6](https://github.com/bolt-design-system/bolt/compare/v2.5.5...v2.5.6) (2019-07-30)


### Bug Fixes

* add custom cursor files ([1e964d4](https://github.com/bolt-design-system/bolt/commit/1e964d4))
* add pointer as fallback for zoom-in and zoom-out in IE11 ([fe02759](https://github.com/bolt-design-system/bolt/commit/fe02759))
* backport Blockquote test fix from master ([7dbbb32](https://github.com/bolt-design-system/bolt/commit/7dbbb32))
* cursor size ([1b1ca18](https://github.com/bolt-design-system/bolt/commit/1b1ca18))
* focus-trap IE JS error ([08b9d33](https://github.com/bolt-design-system/bolt/commit/08b9d33))
* restore regular modal width ([d4840af](https://github.com/bolt-design-system/bolt/commit/d4840af))
* update modal transform styles to fix IE 11 rendering issue ([0f507d4](https://github.com/bolt-design-system/bolt/commit/0f507d4))


### Features

* set padding on body when scrollbars are present to prevent content shift ([6f7098b](https://github.com/bolt-design-system/bolt/commit/6f7098b))
* update Webpack to handle .cur files (cursor file fallback when needed) ([7df793b](https://github.com/bolt-design-system/bolt/commit/7df793b))





## [2.5.5](https://github.com/bolt-design-system/bolt/compare/v2.5.4...v2.5.5) (2019-07-22)


### Bug Fixes

* reduce max # of workers to temporarily address failing Jest tests in the release/2.x branch ([97e52bd](https://github.com/bolt-design-system/bolt/commit/97e52bd))
* set minHeight on inner element not outer element squash extra space in IE ([27f5c95](https://github.com/bolt-design-system/bolt/commit/27f5c95))


### Features

* add 'no_quotes' prop to turn off quotes ([6c27e1b](https://github.com/bolt-design-system/bolt/commit/6c27e1b))





## [2.5.4](https://github.com/bolt-design-system/bolt/compare/v2.5.3...v2.5.4) (2019-07-15)


### Bug Fixes

* cherry pick v2.6.0 update that adds missing trigger dependency to modal ([e2c9aff](https://github.com/bolt-design-system/bolt/commit/e2c9aff))





## [2.5.3](https://github.com/bolt-design-system/bolt/compare/v2.5.2...v2.5.3) (2019-07-12)


### Bug Fixes

* add test for aligning inline button ([603cfc6](https://github.com/bolt-design-system/bolt/commit/603cfc6))
* cherry pick the main lang-specific config fix + webpack `lang` config fix when building multiple languages at the same time via https://github.com/bolt-design-system/bolt/pull/1265 ([318c9f9](https://github.com/bolt-design-system/bolt/commit/318c9f9))
* remove overriding the image sizes prop when used in device viewer ([676e5df](https://github.com/bolt-design-system/bolt/commit/676e5df))
* update band component hotfix to only apply to IE11 ([80b0e43](https://github.com/bolt-design-system/bolt/commit/80b0e43))





## [2.5.2](https://github.com/bolt-design-system/bolt/compare/v2.5.1...v2.5.2) (2019-06-25)


### Bug Fixes

* address eslint / prettier problems flagged with the latest upstream dependencies + update yarn.lock ([c5e0253](https://github.com/bolt-design-system/bolt/commit/c5e0253))
* fix typo ([38e85ad](https://github.com/bolt-design-system/bolt/commit/38e85ad))
* update drupal lab package.json dependency versions to use the latest from NPM + apply patches if necessary ([bafea06](https://github.com/bolt-design-system/bolt/commit/bafea06))
* update local @bolt/build-util references in the build tools ([35ea609](https://github.com/bolt-design-system/bolt/commit/35ea609))
* update travis build steps to check for Drupal Lab ([bc01081](https://github.com/bolt-design-system/bolt/commit/bc01081))
* update Travis job label ([d839d01](https://github.com/bolt-design-system/bolt/commit/d839d01))





## [2.5.1](https://github.com/bolt-design-system/bolt/compare/v2.5.0...v2.5.1) (2019-06-21)

**Note:** Version bump only for package bolt





## [2.4.4](https://github.com/bolt-design-system/bolt/compare/v2.4.3...v2.4.4) (2019-06-05)


### Bug Fixes

* check if values are numeric and do not contain float before getting gcd ([921b8fd](https://github.com/bolt-design-system/bolt/commit/921b8fd))
* replace gmp_gcd with custom gcd function to avoid gmp dependency ([0c165d7](https://github.com/bolt-design-system/bolt/commit/0c165d7))
* split up the core-php BoltExtra Twig extensions into the ones needed for Drupal compatibility vs any extra Twig extensions used internally for building the docs site. Update Twig renderer configs to use the full set of Twig extensions for the docs site but only BoltCore and BoltCoreCompat when running component tests ([0287e7a](https://github.com/bolt-design-system/bolt/commit/0287e7a))





## [2.4.3](https://github.com/bolt-design-system/bolt/compare/v2.4.2...v2.4.3) (2019-05-31)


### Bug Fixes

* add smaller Jest config to allow us to quickly run a subset of Jest tests ([7560313](https://github.com/bolt-design-system/bolt/commit/7560313))
* backport now.sh alias command update to the release/2.x branch ([2fa8ba8](https://github.com/bolt-design-system/bolt/commit/2fa8ba8))
* globally update non-private package.json files with devDependencies and peerDependencies that might not get installed as expected when used / published outside of the Bolt monorepo ([617bd86](https://github.com/bolt-design-system/bolt/commit/617bd86))
* partial workaround to Drupal Lab build failing until v2.4.x hotfix released ([3d04280](https://github.com/bolt-design-system/bolt/commit/3d04280))


### Features

* add ability to build and deploy drupal lab instance to help with testing to verify that the build tools continue to work as expected + allow for more drupal testing moving forward ([fc6eb81](https://github.com/bolt-design-system/bolt/commit/fc6eb81))





## [2.4.2](https://github.com/bolt-design-system/bolt/compare/v2.4.1...v2.4.2) (2019-05-24)


### Bug Fixes

* backport autotrack fix to update v2.3.2 docs site deployed instance ([4e0deac](https://github.com/bolt-design-system/bolt/commit/4e0deac))
* fix linting issues + reduce the overall Nightwatch test report size by around half to prevent the Github API status report from exceeding the max size allowed ([b3f14d3](https://github.com/bolt-design-system/bolt/commit/b3f14d3))
* increase Jest max timeout to reduce frequency of errors when testing autotrack link behavior on 3rd party sites ([6880fd0](https://github.com/bolt-design-system/bolt/commit/6880fd0))
* rework video JS to prevent bugs that result from multiple initializations ([b61c0da](https://github.com/bolt-design-system/bolt/commit/b61c0da))
* temp workaround to Docker error ([a1d7ea3](https://github.com/bolt-design-system/bolt/commit/a1d7ea3))
* test adding symbol polyfill to GA autotrack to fix IE 11 issue ([db57715](https://github.com/bolt-design-system/bolt/commit/db57715))
* test updating nightwatch test reporting logic to troubleshoot travis jobs not fully completing ([b31636c](https://github.com/bolt-design-system/bolt/commit/b31636c))
* update Jest snapshots based on video player hotfix updates ([a57c71a](https://github.com/bolt-design-system/bolt/commit/a57c71a))
* update lerna config to not factor in component docs or component tests when determining which packages have changed / need to get published to NPM ([074eaa2](https://github.com/bolt-design-system/bolt/commit/074eaa2))
* update navbar Jest test to wait until page navigation has finished. fixes inconsistent navbar test ([1caad66](https://github.com/bolt-design-system/bolt/commit/1caad66))
* update onInit script to follow best practices for referencing and configuring a video ([8ce6db2](https://github.com/bolt-design-system/bolt/commit/8ce6db2))
* update release urls ([d848541](https://github.com/bolt-design-system/bolt/commit/d848541))
* update video e2e tests + playback plugin to set / check that the video is playing at 1.25x vs 1.3x ([6ae8127](https://github.com/bolt-design-system/bolt/commit/6ae8127))
* use video-js element per Brightcove best practices ([db93b6e](https://github.com/bolt-design-system/bolt/commit/db93b6e))





## [2.4.1](https://github.com/bolt-design-system/bolt/compare/v2.4.0...v2.4.1) (2019-05-14)


### Bug Fixes

* revert premature merge of a handful of v2.5.0 features ([ed4d395](https://github.com/bolt-design-system/bolt/commit/ed4d395))





# [2.4.0](https://github.com/bolt-design-system/bolt/compare/v2.3.2...v2.4.0) (2019-05-14)


### Bug Fixes

* add missing comma ([50d80f1](https://github.com/bolt-design-system/bolt/commit/50d80f1))
* add slight pause when checking ratio component VRTs ([850e82a](https://github.com/bolt-design-system/bolt/commit/850e82a))
* fix prettier issue ([639b6e3](https://github.com/bolt-design-system/bolt/commit/639b6e3))
* image-related ratio style bug, images overflow container w/ JS off ([9408b1e](https://github.com/bolt-design-system/bolt/commit/9408b1e))
* increase failure threshold to 3% on blockquote tests ([d132d2c](https://github.com/bolt-design-system/bolt/commit/d132d2c))
* remove unused and error-causing prepublish script from the new Yeoman generator ([3117bf0](https://github.com/bolt-design-system/bolt/commit/3117bf0))
* replace `bolt-text` and skip mutation observer to fix IE bug ([90dc9c5](https://github.com/bolt-design-system/bolt/commit/90dc9c5))
* revert making autotrack package public till GA info customizable, etc ([58bcd56](https://github.com/bolt-design-system/bolt/commit/58bcd56))
* revert version locking the core-php twig version since twig-renderer isn't a direct dependency for this to work as expected ([4c54efa](https://github.com/bolt-design-system/bolt/commit/4c54efa))
* update .incache data + workaround to try to more consistently grab the latest Bolt Github release info. also includes a minor CSS fix for the docs site layout navigation. ([ba812b8](https://github.com/bolt-design-system/bolt/commit/ba812b8))
* update blockquote Nightwatch.js test to fix selector issue + add additional test for confirming the blockquote rendered as expected ([d0f6f95](https://github.com/bolt-design-system/bolt/commit/d0f6f95))
* update button and icons snapshots to include auto-updated browserslist styles (now includes some webpack-prefixed transition styles) ([caba902](https://github.com/bolt-design-system/bolt/commit/caba902))
* update Nightwatch test syntax for blockquote so error isn't thrown in IE 11 ([1584363](https://github.com/bolt-design-system/bolt/commit/1584363))
* update publicConfig to address monorepo Jest test ([819a4c1](https://github.com/bolt-design-system/bolt/commit/819a4c1))
* update version selector to only run logic when component exists + fix logic checks to make sure the correct local version is selected ([9cb92ad](https://github.com/bolt-design-system/bolt/commit/9cb92ad))
* update vrt screenshot for ratio component ([d9d3ee1](https://github.com/bolt-design-system/bolt/commit/d9d3ee1))
* version bump composer.lock files to fix Twig version resolved ([6f6485c](https://github.com/bolt-design-system/bolt/commit/6f6485c))
* version bump core-php getting used + update PHP dependencies so the casehelper package is installed as expected ([9808cb4](https://github.com/bolt-design-system/bolt/commit/9808cb4))
* version bump globby + semantic version packages to resolve node-glob yarn install errors being periodically encountered ([99d54e8](https://github.com/bolt-design-system/bolt/commit/99d54e8))


### Features

* add 1 basic E2E cross browser test for Blockquote ([126b2a5](https://github.com/bolt-design-system/bolt/commit/126b2a5))
* add release banner to make sure users know the version of the system they are currently on + recommend different versions based on the current one ([c8c9902](https://github.com/bolt-design-system/bolt/commit/c8c9902))



# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v2.2.2...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* 'ratio' prop conflicts with prop set from background template, update name in background template ([fc6d598](https://github.com/bolt-design-system/bolt/commit/fc6d598))
* add --detectOpenHandles to troubleshoot tests not completing when Jest expects them to ([3196d3e](https://github.com/bolt-design-system/bolt/commit/3196d3e))
* add 'is_ssr' flag to noscript, wait until SSR is in place before using ([2049a70](https://github.com/bolt-design-system/bolt/commit/2049a70))
* Add 'spaceless' around typography template, otherwise outputs extra whitespace causing issues in blockquote ([3817443](https://github.com/bolt-design-system/bolt/commit/3817443))
* add ajv to core package.json ([74322ea](https://github.com/bolt-design-system/bolt/commit/74322ea))
* add backwards compatibility for 'ratio' prop as boolean ([25c3c90](https://github.com/bolt-design-system/bolt/commit/25c3c90))
* add error catcher to bash getLatestDeploy ([a0935cf](https://github.com/bolt-design-system/bolt/commit/a0935cf))
* add fetch require back in ([efa10b4](https://github.com/bolt-design-system/bolt/commit/efa10b4))
* add missing dependencies to deploy-specific package.json ([e360f9f](https://github.com/bolt-design-system/bolt/commit/e360f9f))
* add missing dependency to prevent install warnings ([c9231cd](https://github.com/bolt-design-system/bolt/commit/c9231cd))
* add missing dependency to twig renderer ([20778d0](https://github.com/bolt-design-system/bolt/commit/20778d0))
* add missing lodash dep ([2e84680](https://github.com/bolt-design-system/bolt/commit/2e84680))
* add missing navbar-related dependencies to the <bolt-navbar> component ([c612909](https://github.com/bolt-design-system/bolt/commit/c612909))
* add missing polyfiills needed for IE 11 ([0cac28f](https://github.com/bolt-design-system/bolt/commit/0cac28f))
* add missing publicConfig to new @bolt/api package ([cd475d2](https://github.com/bolt-design-system/bolt/commit/cd475d2))
* add missing scripts folder deps ([1674a9c](https://github.com/bolt-design-system/bolt/commit/1674a9c))
* add missing slots to icons in <bolt-button> SSR demos ([115745d](https://github.com/bolt-design-system/bolt/commit/115745d))
* add missing token + adjust deploy command ([e2e1fb7](https://github.com/bolt-design-system/bolt/commit/e2e1fb7))
* add missing TRAVIS_TAG env var ([403647e](https://github.com/bolt-design-system/bolt/commit/403647e))
* add missing webpack-merge dependency to the build tools package ([889f0fd](https://github.com/bolt-design-system/bolt/commit/889f0fd))
* add new line to .dockerignore ([e7ee5e7](https://github.com/bolt-design-system/bolt/commit/e7ee5e7))
* add node env ([95fef85](https://github.com/bolt-design-system/bolt/commit/95fef85))
* add now.sh token ([887ac3c](https://github.com/bolt-design-system/bolt/commit/887ac3c))
* Add padding to right sidebar in docs to create symmetry ([56d8656](https://github.com/bolt-design-system/bolt/commit/56d8656))
* add prettier config to vue example + update README ([5be97eb](https://github.com/bolt-design-system/bolt/commit/5be97eb))
* add renderer mode config default ([1201419](https://github.com/bolt-design-system/bolt/commit/1201419))
* Add support for attributes passed in as an object ([b2baa67](https://github.com/bolt-design-system/bolt/commit/b2baa67))
* add testing instructions ([2ec5ce3](https://github.com/bolt-design-system/bolt/commit/2ec5ce3))
* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/commit/cf335ce))
* add update autolink click tests to make sure we're waiting for the new page to finish loading before continuing to run checks. https://checklyhq.com/docs/browser-checks/timeouts/#page-waitfornavigation ([f3f5059](https://github.com/bolt-design-system/bolt/commit/f3f5059))
* adding enum for boolean props ([67c9e78](https://github.com/bolt-design-system/bolt/commit/67c9e78))
* adding important ([4434ad4](https://github.com/bolt-design-system/bolt/commit/4434ad4))
* address prettier issues ([492c158](https://github.com/bolt-design-system/bolt/commit/492c158))
* adjust breakpoint for hiding viewport resizer controls ([2b792bd](https://github.com/bolt-design-system/bolt/commit/2b792bd))
* adjust button VRT failure threshold ([34b62f7](https://github.com/bolt-design-system/bolt/commit/34b62f7))
* adjust default link line height + icon and text spacing ([806814f](https://github.com/bolt-design-system/bolt/commit/806814f))
* adjust quick PHP setup task ([4b8ff1f](https://github.com/bolt-design-system/bolt/commit/4b8ff1f))
* adjust ratio VRT failure threshold ([f5d08a1](https://github.com/bolt-design-system/bolt/commit/f5d08a1))
* attempt removal of extraneous call to SauceLabs ([28b31ed](https://github.com/bolt-design-system/bolt/commit/28b31ed))
* authing SauceLabs assets for GitHub Checks download ([a479dd4](https://github.com/bolt-design-system/bolt/commit/a479dd4))
* auto-ignore any yeoman generator files used to create tests ([60b6f16](https://github.com/bolt-design-system/bolt/commit/60b6f16))
* auto-remove the wwwDir folder before running any Jest tests ([2496ceb](https://github.com/bolt-design-system/bolt/commit/2496ceb))
* automatically retry fetch requests if / when a 500 error occurs. ([98fa9c9](https://github.com/bolt-design-system/bolt/commit/98fa9c9))
* border classname on blockquote ([84b1371](https://github.com/bolt-design-system/bolt/commit/84b1371))
* broken image paths ([9e7864d](https://github.com/bolt-design-system/bolt/commit/9e7864d))
* broken js ([abb4007](https://github.com/bolt-design-system/bolt/commit/abb4007))
* button border-radius default ([e3ffd92](https://github.com/bolt-design-system/bolt/commit/e3ffd92))
* button class logics ([587f56f](https://github.com/bolt-design-system/bolt/commit/587f56f))
* button focus ([0e263b4](https://github.com/bolt-design-system/bolt/commit/0e263b4))
* bypass cache when doing a full tagged release + fix deploy script to not update the main docs site url when doing pre-releases ([9faa0f4](https://github.com/bolt-design-system/bolt/commit/9faa0f4))
* change get-latest-deploy from bash to node.js ([30da611](https://github.com/bolt-design-system/bolt/commit/30da611))
* change setup:php to run composer *install* not update, we will update manually ([0d27fe5](https://github.com/bolt-design-system/bolt/commit/0d27fe5))
* check for not 'cover' rather than sameas ([0be7f5d](https://github.com/bolt-design-system/bolt/commit/0be7f5d))
* check for textContent not innerHTML, bug when rendered to light-dom ([952e711](https://github.com/bolt-design-system/bolt/commit/952e711))
* check if component was initially rendered before removing children, IE runs twice on background component and empties the rendered HTML ([4006913](https://github.com/bolt-design-system/bolt/commit/4006913))
* checking image urls to see if valid ([a7de0a8](https://github.com/bolt-design-system/bolt/commit/a7de0a8))
* clarify gutter prop and its related demos ([7ec76be](https://github.com/bolt-design-system/bolt/commit/7ec76be))
* clean ([5bce04e](https://github.com/bolt-design-system/bolt/commit/5bce04e))
* clean up reporting to github app ([ab56b9e](https://github.com/bolt-design-system/bolt/commit/ab56b9e))
* code and organization cleanup ([5c5764d](https://github.com/bolt-design-system/bolt/commit/5c5764d))
* code cleanup ([a344b8b](https://github.com/bolt-design-system/bolt/commit/a344b8b))
* complete => completed ([8394eee](https://github.com/bolt-design-system/bolt/commit/8394eee))
* consistent copy ([8a4dfc7](https://github.com/bolt-design-system/bolt/commit/8a4dfc7))
* convert cases to our standards ([dce4b1d](https://github.com/bolt-design-system/bolt/commit/dce4b1d))
* copy ([f506a91](https://github.com/bolt-design-system/bolt/commit/f506a91))
* copy changes ([e2c431e](https://github.com/bolt-design-system/bolt/commit/e2c431e))
* copy edits ([76cc46a](https://github.com/bolt-design-system/bolt/commit/76cc46a))
* copy updates ([ff41fa4](https://github.com/bolt-design-system/bolt/commit/ff41fa4))
* correct typo of the github checks API name used to change the build status ([6cc70d8](https://github.com/bolt-design-system/bolt/commit/6cc70d8))
* deprecated obsolete props ([421cf55](https://github.com/bolt-design-system/bolt/commit/421cf55))
* disable band transition inline on component overview page in PL ([0456c91](https://github.com/bolt-design-system/bolt/commit/0456c91))
* disable browsersync ghost syncing as a workaround to ensure local Nightwatch.js browser tests don't have clicks / interactions triggered by other browsers. ([ec55a2d](https://github.com/bolt-design-system/bolt/commit/ec55a2d))
* disable console log output with UIKit regeneration ([0f2e2b6](https://github.com/bolt-design-system/bolt/commit/0f2e2b6))
* disable inactive text + icon variation PL demo so they don't show up in the menu ([96a1ac5](https://github.com/bolt-design-system/bolt/commit/96a1ac5))
* disable mandatory e2e testing on local push for now ([2a6ace7](https://github.com/bolt-design-system/bolt/commit/2a6ace7))
* disable SSR ([a9670dd](https://github.com/bolt-design-system/bolt/commit/a9670dd))
* display the correct test number in the screenshot results panel ([1b79827](https://github.com/bolt-design-system/bolt/commit/1b79827))
* Display UL items in edge ([d9d9f66](https://github.com/bolt-design-system/bolt/commit/d9d9f66))
* doc conflicts ([dadc396](https://github.com/bolt-design-system/bolt/commit/dadc396))
* docs and schema ([ca10596](https://github.com/bolt-design-system/bolt/commit/ca10596))
* docs site-specific layout updates to address display / responsive behavior issues ([cae9b00](https://github.com/bolt-design-system/bolt/commit/cae9b00))
* Don't allow an unspecified type to be considered valid ([83c2444](https://github.com/bolt-design-system/bolt/commit/83c2444))
* don't include empty screenshots in the Github Checks API results ([e0fc5e6](https://github.com/bolt-design-system/bolt/commit/e0fc5e6))
* don't remove the docs site when setting up the code for Travis builds ([4140d12](https://github.com/bolt-design-system/bolt/commit/4140d12))
* don't report on screenshot VRT results if none have failed ([7acb808](https://github.com/bolt-design-system/bolt/commit/7acb808))
* enable prod mode + disable sourcemaps to improve loading performance ([7dd8a15](https://github.com/bolt-design-system/bolt/commit/7dd8a15))
* ensure all default Sass spacing scale config can be overwritten (ex. lang-specific spacing options like we have with Japanese) ([6c8e59d](https://github.com/bolt-design-system/bolt/commit/6c8e59d))
* ensure code viewer works consistently when async loading modal-viewer JS; fix width of code displaying in drawer ([bbb9f95](https://github.com/bolt-design-system/bolt/commit/bbb9f95))
* ensure every autolink test has a high enough timeout ([ea83ca0](https://github.com/bolt-design-system/bolt/commit/ea83ca0))
* ensure vanilla <code> elements can scroll horizontally and/or vertically if needed ([9500afc](https://github.com/bolt-design-system/bolt/commit/9500afc))
* fix for the PL nav incorrectly auto-closing in certain situations ([9ff9fc8](https://github.com/bolt-design-system/bolt/commit/9ff9fc8))
* fix issues with nav opening / closing when expected based on screen size + layout mode ([e4d2750](https://github.com/bolt-design-system/bolt/commit/e4d2750))
* fix lint / prettier issues ([aefbf12](https://github.com/bolt-design-system/bolt/commit/aefbf12))
* fix linting issues ([7d01b58](https://github.com/bolt-design-system/bolt/commit/7d01b58))
* fix now.sh deployments ([b7091ae](https://github.com/bolt-design-system/bolt/commit/b7091ae))
* Fix path issue ([a760987](https://github.com/bolt-design-system/bolt/commit/a760987))
* fix prettier errors ([f55babd](https://github.com/bolt-design-system/bolt/commit/f55babd))
* fix prettier issuers ([50d223e](https://github.com/bolt-design-system/bolt/commit/50d223e))
* fix prettier issues ([5ed26db](https://github.com/bolt-design-system/bolt/commit/5ed26db))
* Fix prettier issues ([dde96dd](https://github.com/bolt-design-system/bolt/commit/dde96dd))
* fix schema in ol test ([0a92686](https://github.com/bolt-design-system/bolt/commit/0a92686))
* fix task collection event sequence ([eaed5ce](https://github.com/bolt-design-system/bolt/commit/eaed5ce))
* fix typo ([70d49c0](https://github.com/bolt-design-system/bolt/commit/70d49c0))
* fix typo in setting up Jest env ([4689801](https://github.com/bolt-design-system/bolt/commit/4689801))
* fix typo in the docs site .boltrc config ([352a9f4](https://github.com/bolt-design-system/bolt/commit/352a9f4))
* flag and figure bugs ([9893c60](https://github.com/bolt-design-system/bolt/commit/9893c60))
* force downgrade version of text component prior to publishing ([7f9dbb0](https://github.com/bolt-design-system/bolt/commit/7f9dbb0))
* force now.sh CLI to v15 or later ([40f244a](https://github.com/bolt-design-system/bolt/commit/40f244a))
* fullBleed deprecation logic ([38f7a1e](https://github.com/bolt-design-system/bolt/commit/38f7a1e))
* further update timeout ([3ae260e](https://github.com/bolt-design-system/bolt/commit/3ae260e))
* Generate icons correct with prretier config ([1529fe2](https://github.com/bolt-design-system/bolt/commit/1529fe2))
* get latest now.sh deploy for Nightwatch tests ([d03a708](https://github.com/bolt-design-system/bolt/commit/d03a708))
* gutter correction ([05c2ef7](https://github.com/bolt-design-system/bolt/commit/05c2ef7))
* headline width ([de432ad](https://github.com/bolt-design-system/bolt/commit/de432ad))
* hotfix for likely root cause of recent now.sh deployments to fail ([1b204ad](https://github.com/bolt-design-system/bolt/commit/1b204ad))
* html encode web component examples in docs so they don't render as actual components ([52e4675](https://github.com/bolt-design-system/bolt/commit/52e4675))
* IE and Edge ordered list background and numbering fix ([2a21609](https://github.com/bolt-design-system/bolt/commit/2a21609))
* image data filter, change to greater than or equal to, was filtering out exact matches ([863cfa4](https://github.com/bolt-design-system/bolt/commit/863cfa4))
* images on client-rendered, server-rendered demo pages ([3dfa10d](https://github.com/bolt-design-system/bolt/commit/3dfa10d))
* increase max timeout for button Jest tests ([efbb7ee](https://github.com/bolt-design-system/bolt/commit/efbb7ee))
* increase max timeout of E2E tests to troubleshoot failing Nightwatch tests ([8056db2](https://github.com/bolt-design-system/bolt/commit/8056db2))
* increase Symfony process timeout ([801db62](https://github.com/bolt-design-system/bolt/commit/801db62))
* inline list container width ([84fa95a](https://github.com/bolt-design-system/bolt/commit/84fa95a))
* inset inline list spacing poking out of container ([22978c4](https://github.com/bolt-design-system/bolt/commit/22978c4))
* JS error when image class is not found ([a3c733a](https://github.com/bolt-design-system/bolt/commit/a3c733a))
* link text and icon spacing ([f79f585](https://github.com/bolt-design-system/bolt/commit/f79f585))
* lint js ([d2efb33](https://github.com/bolt-design-system/bolt/commit/d2efb33))
* lint js ([460b88b](https://github.com/bolt-design-system/bolt/commit/460b88b))
* lint js ([a7dda94](https://github.com/bolt-design-system/bolt/commit/a7dda94))
* lint js ([8b21eaf](https://github.com/bolt-design-system/bolt/commit/8b21eaf))
* lint js ([0ddfdfa](https://github.com/bolt-design-system/bolt/commit/0ddfdfa))
* lint js ([4c36399](https://github.com/bolt-design-system/bolt/commit/4c36399))
* lint js ([352c21e](https://github.com/bolt-design-system/bolt/commit/352c21e))
* lint js ([519b052](https://github.com/bolt-design-system/bolt/commit/519b052))
* lint styles ([a1d11d9](https://github.com/bolt-design-system/bolt/commit/a1d11d9))
* lint styles ([ff33648](https://github.com/bolt-design-system/bolt/commit/ff33648))
* lint styles ([32c932e](https://github.com/bolt-design-system/bolt/commit/32c932e))
* lint styles ([d942d44](https://github.com/bolt-design-system/bolt/commit/d942d44))
* lint styles ([6529faf](https://github.com/bolt-design-system/bolt/commit/6529faf))
* linting js ([fd11c79](https://github.com/bolt-design-system/bolt/commit/fd11c79))
* make images display "block" by default to avoid whitespace issues inside custom-element ([dd2b5fd](https://github.com/bolt-design-system/bolt/commit/dd2b5fd))
* make sure NOW_TOKEN env added to now.sh deploy commands ([4d0a482](https://github.com/bolt-design-system/bolt/commit/4d0a482))
* manually disable SSR ([b7d0550](https://github.com/bolt-design-system/bolt/commit/b7d0550))
* manually disable SSR temporarily ([95ebc8c](https://github.com/bolt-design-system/bolt/commit/95ebc8c))
* mapping grid item to schema props ([70a2215](https://github.com/bolt-design-system/bolt/commit/70a2215))
* migrate updated button component JS logic to new button.js component file ([f9ce8e7](https://github.com/bolt-design-system/bolt/commit/f9ce8e7))
* misc docs site related UI fixes ([5ef9667](https://github.com/bolt-design-system/bolt/commit/5ef9667))
* missing space ([5f4b86d](https://github.com/bolt-design-system/bolt/commit/5f4b86d))
* move around webpack loader plugins needed for running the full test suite ([e7cb37e](https://github.com/bolt-design-system/bolt/commit/e7cb37e))
* move image and JS to fixtures dir ([afc93c8](https://github.com/bolt-design-system/bolt/commit/afc93c8))
* move margin to blockquote image, not every footer item ([e52d9c6](https://github.com/bolt-design-system/bolt/commit/e52d9c6))
* move new custom twig functions to BoltCore ([91bef25](https://github.com/bolt-design-system/bolt/commit/91bef25))
* move process.env-related variables to the top ([2713f45](https://github.com/bolt-design-system/bolt/commit/2713f45))
* need to reset git repo before update-read-only-git-repos.sh ([54f9644](https://github.com/bolt-design-system/bolt/commit/54f9644))
* nightwatch tearDown => afterEach ([d9fd395](https://github.com/bolt-design-system/bolt/commit/d9fd395))
* only add main bolt image class to fallback ([c1292f9](https://github.com/bolt-design-system/bolt/commit/c1292f9))
* package.json ([53410b9](https://github.com/bolt-design-system/bolt/commit/53410b9))
* pass correct variable in alignment validation ([8455c07](https://github.com/bolt-design-system/bolt/commit/8455c07))
* pass in passed ([305ea28](https://github.com/bolt-design-system/bolt/commit/305ea28))
* port over ratio component test config updates from https://github.com/bolt-design-system/bolt/pull/1109 based on the ~1.3% average VRT diff that pops up periodically ([dc4a22a](https://github.com/bolt-design-system/bolt/commit/dc4a22a))
* port over Travis CI updates from https://github.com/bolt-design-system/bolt/pull/1109 meant to improve the reliability / consistency of the visual regression test results being run by Jest ([8f56a70](https://github.com/bolt-design-system/bolt/commit/8f56a70))
* Pretter issue ([e3308eb](https://github.com/bolt-design-system/bolt/commit/e3308eb))
* proactively load the text component's JS to speed up initial rendering ([d942886](https://github.com/bolt-design-system/bolt/commit/d942886))
* Pull in the newly-added case-helper dependency to the docs site ([32e7e86](https://github.com/bolt-design-system/bolt/commit/32e7e86))
* quick fix to address band / height issue on the docs site in IE 11 and Firefox ([0721b70](https://github.com/bolt-design-system/bolt/commit/0721b70))
* quote text tests ([5b5d3c3](https://github.com/bolt-design-system/bolt/commit/5b5d3c3))
* re-add chrome-path to Travis config as working solution for more consistent VRT testing results ([f1f1573](https://github.com/bolt-design-system/bolt/commit/f1f1573))
* re-add local PHP dependencies to fix broken CI tests ([595c19d](https://github.com/bolt-design-system/bolt/commit/595c19d))
* re-add support for 'imageAttributes' for backwards compatibility, but deprecate it ([fa78212](https://github.com/bolt-design-system/bolt/commit/fa78212))
* re-location button component server-side rendering examples ([bb5eb3e](https://github.com/bolt-design-system/bolt/commit/bb5eb3e))
* re-test checkRun imports ([6a78bcb](https://github.com/bolt-design-system/bolt/commit/6a78bcb))
* re-test Jest after tweaking logic used to make sure the config data needed is available ([f808965](https://github.com/bolt-design-system/bolt/commit/f808965))
* re-test nightwatch results reporting to address screenshot issues on Travis ([f250b28](https://github.com/bolt-design-system/bolt/commit/f250b28))
* re-test with additional dockerfile updates ([300ec85](https://github.com/bolt-design-system/bolt/commit/300ec85))
* re-test with updated travis config ([8275947](https://github.com/bolt-design-system/bolt/commit/8275947))
* rearrange CLI args ([a9956ee](https://github.com/bolt-design-system/bolt/commit/a9956ee))
* reducing previous debugging sleep command ([e09115e](https://github.com/bolt-design-system/bolt/commit/e09115e))
* refactor deploy logic to ensure url aliases don't exceed max length on now.sh ([286c8a7](https://github.com/bolt-design-system/bolt/commit/286c8a7))
* refactor promise returns ([d2c61bb](https://github.com/bolt-design-system/bolt/commit/d2c61bb))
* relocate chrome path dependency ([5bb6342](https://github.com/bolt-design-system/bolt/commit/5bb6342))
* relocate NPM dependencies needed for Jest to run through unit tests ([5d56ec2](https://github.com/bolt-design-system/bolt/commit/5d56ec2))
* remove 'striptags' filter from bolt-teaser text, creates IE bugs with bolt-link ([8ae0e2f](https://github.com/bolt-design-system/bolt/commit/8ae0e2f))
* remove 'web component only' from ratio description ([84738e1](https://github.com/bolt-design-system/bolt/commit/84738e1))
* remove async from describe ([517bc4c](https://github.com/bolt-design-system/bolt/commit/517bc4c))
* remove async from Share component test ([04a3749](https://github.com/bolt-design-system/bolt/commit/04a3749))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/commit/a7f5fec))
* remove auto-highlighting SSR-rendered HTML ([caaec8c](https://github.com/bolt-design-system/bolt/commit/caaec8c))
* remove bail flag from Travis CI to troubleshoot Travis test failing mysteriously ([30cb128](https://github.com/bolt-design-system/bolt/commit/30cb128))
* remove Bolt Bot comments, cleanup deploy script ([83b285d](https://github.com/bolt-design-system/bolt/commit/83b285d))
* remove build tools dependency from the @bolt/api package ([900307c](https://github.com/bolt-design-system/bolt/commit/900307c))
* remove dependency loop between packages ([b43fc34](https://github.com/bolt-design-system/bolt/commit/b43fc34))
* remove deps not needed ([4d1098c](https://github.com/bolt-design-system/bolt/commit/4d1098c))
* remove doc page template ([467223e](https://github.com/bolt-design-system/bolt/commit/467223e))
* remove ENV var from npm script ([8d39245](https://github.com/bolt-design-system/bolt/commit/8d39245))
* remove exclude rule in vue webpack config — fixes error thrown otherwise ([67a3b9d](https://github.com/bolt-design-system/bolt/commit/67a3b9d))
* remove extra comma ([8267ce0](https://github.com/bolt-design-system/bolt/commit/8267ce0))
* remove extra status call to Github Checks API ([896ee99](https://github.com/bolt-design-system/bolt/commit/896ee99))
* remove extra VRT screenshot that shouldn't exist ([8a5982f](https://github.com/bolt-design-system/bolt/commit/8a5982f))
* remove hero text and set up themes ([ed8ba7b](https://github.com/bolt-design-system/bolt/commit/ed8ba7b))
* Remove issue with paths on non-local machine ([32b527f](https://github.com/bolt-design-system/bolt/commit/32b527f))
* remove js-fonts-loaded class from testing-server HTML response + add critical css vars component to retest rendering ([c6113f1](https://github.com/bolt-design-system/bolt/commit/c6113f1))
* remove meta flag from now deploy ([bd63ed2](https://github.com/bolt-design-system/bolt/commit/bd63ed2))
* Remove observedAttributes method from nav-priority component ([c748bae](https://github.com/bolt-design-system/bolt/commit/c748bae))
* remove old e2e tests + old screenshots and reports folders ([322fe11](https://github.com/bolt-design-system/bolt/commit/322fe11))
* remove old vars ([ef310bc](https://github.com/bolt-design-system/bolt/commit/ef310bc))
* remove padding for block list's last item ([868f077](https://github.com/bolt-design-system/bolt/commit/868f077))
* remove postinstall on docs site + test quicker PHP install command ([5b76360](https://github.com/bolt-design-system/bolt/commit/5b76360))
* remove reference to specific Bolt version in the <bolt-video> snapshot tests ([40e2351](https://github.com/bolt-design-system/bolt/commit/40e2351))
* remove setTimeout, check that image is loaded before calling 'unveil' ([d9d5489](https://github.com/bolt-design-system/bolt/commit/d9d5489))
* remove typo ([474d161](https://github.com/bolt-design-system/bolt/commit/474d161))
* remove unneeded rendered() method ([d1e940d](https://github.com/bolt-design-system/bolt/commit/d1e940d))
* remove unused 'content' prop in render ([ce16411](https://github.com/bolt-design-system/bolt/commit/ce16411))
* remove unused 'get' import ([7abb7e9](https://github.com/bolt-design-system/bolt/commit/7abb7e9))
* remove unzip pkg from Dockerfile ([f041c81](https://github.com/bolt-design-system/bolt/commit/f041c81))
* remove uses of 'imageAttributes', these ones are unnecessary ([b4ceae9](https://github.com/bolt-design-system/bolt/commit/b4ceae9))
* remove verdaccio npm scripts from root till publishing-related tests are added ([7a90461](https://github.com/bolt-design-system/bolt/commit/7a90461))
* removing auth-ed attempt at image loading ([f68548d](https://github.com/bolt-design-system/bolt/commit/f68548d))
* removing old code ([3f6c861](https://github.com/bolt-design-system/bolt/commit/3f6c861))
* replace 'button' references to 'link' in testing instructions ([fb15ddb](https://github.com/bolt-design-system/bolt/commit/fb15ddb))
* replace 'imageAttributes' with 'cover' on careers page demo, does same thing ([32c1733](https://github.com/bolt-design-system/bolt/commit/32c1733))
* Replace index() sass function with map-get() ([#1004](https://github.com/bolt-design-system/bolt/issues/1004)) ([6e9404e](https://github.com/bolt-design-system/bolt/commit/6e9404e))
* replace localhost path in docs ([9be0abd](https://github.com/bolt-design-system/bolt/commit/9be0abd))
* replace missing card image with new one from pega.com ([0fbc791](https://github.com/bolt-design-system/bolt/commit/0fbc791))
* resolve conflicts ([d6adc02](https://github.com/bolt-design-system/bolt/commit/d6adc02))
* resolve conflicts ([8554cd9](https://github.com/bolt-design-system/bolt/commit/8554cd9))
* retest docker build ([1c23b71](https://github.com/bolt-design-system/bolt/commit/1c23b71))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/commit/f4bfa64))
* retest Docker container behavior after updating scale config ([46169ff](https://github.com/bolt-design-system/bolt/commit/46169ff))
* return if src or srcset ([072fef0](https://github.com/bolt-design-system/bolt/commit/072fef0))
* return intval from gcd function, edit comment ([0f98359](https://github.com/bolt-design-system/bolt/commit/0f98359))
* revert commenting out author footer while testing ([8a47235](https://github.com/bolt-design-system/bolt/commit/8a47235))
* revert conditionally loading the check-run library ([d15763f](https://github.com/bolt-design-system/bolt/commit/d15763f))
* revert keep alive config ([42c255f](https://github.com/bolt-design-system/bolt/commit/42c255f))
* revert package.json postinstall hook update ([25511ce](https://github.com/bolt-design-system/bolt/commit/25511ce))
* revert recent update to PR template ([27ff1b2](https://github.com/bolt-design-system/bolt/commit/27ff1b2))
* revert twig-renderer vendor path updates ([28cacb8](https://github.com/bolt-design-system/bolt/commit/28cacb8))
* revert updating action block repository url in package.json ([371ccab](https://github.com/bolt-design-system/bolt/commit/371ccab))
* revert updating element-closest; fixes IE 11 JavaScript issues that pop up if updated to a later version (relating to smooth scroll) ([a4a5e03](https://github.com/bolt-design-system/bolt/commit/a4a5e03))
* safari subpixel issue ([8dfa73c](https://github.com/bolt-design-system/bolt/commit/8dfa73c))
* screenshot mapping ([96662e1](https://github.com/bolt-design-system/bolt/commit/96662e1))
* set correct video Nightwatch test url ([b8ae2fe](https://github.com/bolt-design-system/bolt/commit/b8ae2fe))
* skip 'imageAttributes' in background component if using image pattern ([9dd9f18](https://github.com/bolt-design-system/bolt/commit/9dd9f18))
* skip trying to send VRT screenshots to now.sh if the token that's needed is missing ([a5a9c24](https://github.com/bolt-design-system/bolt/commit/a5a9c24))
* slightly increase the max deploy timeout on travis + auto-retry installing dependencies ([d3c0c11](https://github.com/bolt-design-system/bolt/commit/d3c0c11))
* slightly increase the max VRT difference allowed before failing ([f3c6203](https://github.com/bolt-design-system/bolt/commit/f3c6203))
* snaps ([1f83b98](https://github.com/bolt-design-system/bolt/commit/1f83b98))
* snaps ([80a572b](https://github.com/bolt-design-system/bolt/commit/80a572b))
* stylelint ([8bddb16](https://github.com/bolt-design-system/bolt/commit/8bddb16))
* styles and doc cleanup ([209ed0e](https://github.com/bolt-design-system/bolt/commit/209ed0e))
* swap order of watch vs serve tasks ([a68f465](https://github.com/bolt-design-system/bolt/commit/a68f465))
* syntax ([22a3ead](https://github.com/bolt-design-system/bolt/commit/22a3ead))
* temporarily disable component explorer demo for ratio till further debugged ([a6e47f6](https://github.com/bolt-design-system/bolt/commit/a6e47f6))
* temporarily disable pattern lab data being inlined in the main site head + add fully inlined version to the site's footer template ([2b9d584](https://github.com/bolt-design-system/bolt/commit/2b9d584))
* temporarily disable stylelint plugin till a non-deprecated replacement is added ([cd09832](https://github.com/bolt-design-system/bolt/commit/cd09832))
* test updating the SVG Icon build script to include the build prep task ([8b14814](https://github.com/bolt-design-system/bolt/commit/8b14814))
* test updating Travis build with sauce connect partially disabled ([c4004a0](https://github.com/bolt-design-system/bolt/commit/c4004a0))
* testing instructions ([9ebb721](https://github.com/bolt-design-system/bolt/commit/9ebb721))
* testing snaps ([12fdc20](https://github.com/bolt-design-system/bolt/commit/12fdc20))
* testing working for async PL data not always being available when needed ([56fece6](https://github.com/bolt-design-system/bolt/commit/56fece6))
* troubleshooting PHP SSR build error ([f9dc6dc](https://github.com/bolt-design-system/bolt/commit/f9dc6dc))
* try updating travis config to wait longer before grabbing sauce labs testing results ([b8ffb13](https://github.com/bolt-design-system/bolt/commit/b8ffb13))
* tweak the slotted logo styles to work as expected inside a slot ([27fc1a2](https://github.com/bolt-design-system/bolt/commit/27fc1a2))
* typo ([1216145](https://github.com/bolt-design-system/bolt/commit/1216145))
* typo in testing instructions ([4ba775a](https://github.com/bolt-design-system/bolt/commit/4ba775a))
* update @bolt/build-tools to ensure @bolt/api is a peer dependency ([1c19f90](https://github.com/bolt-design-system/bolt/commit/1c19f90))
* update analytics tracker JS ([8fdda51](https://github.com/bolt-design-system/bolt/commit/8fdda51))
* update autolink tests to ensure every button on Travis CI updates. ([32186a8](https://github.com/bolt-design-system/bolt/commit/32186a8))
* Update background color in bolt-ul list element ([21874e4](https://github.com/bolt-design-system/bolt/commit/21874e4))
* update background component to pass 'cover' prop instead of classname to image, fix lazyloading logic in background ([9bf7b9e](https://github.com/bolt-design-system/bolt/commit/9bf7b9e))
* update Bolt dependencies in Drupal Lab example to the latest versions ([66b8726](https://github.com/bolt-design-system/bolt/commit/66b8726))
* update bolt-version data logic to handle API throttle limits + attempt to use old (stale) data if expired ([f456778](https://github.com/bolt-design-system/bolt/commit/f456778))
* update bolt-version script to address deprecation error ([b1035c4](https://github.com/bolt-design-system/bolt/commit/b1035c4))
* update bolt-versions Github check to use the new octokit API call ([21cf7a4](https://github.com/bolt-design-system/bolt/commit/21cf7a4))
* update broken image path in README.md ([13c8e7a](https://github.com/bolt-design-system/bolt/commit/13c8e7a))
* update broken path import with iframe-resizer library ([e07b687](https://github.com/bolt-design-system/bolt/commit/e07b687))
* update broken placeholder variable name ([80c9902](https://github.com/bolt-design-system/bolt/commit/80c9902))
* update button component test snapshot + trim HTML used to test component rendering properly ([064034e](https://github.com/bolt-design-system/bolt/commit/064034e))
* update button component to support declarative anchor tag updates to URL and target props ([01928a9](https://github.com/bolt-design-system/bolt/commit/01928a9))
* update button Jest tests ([ab57265](https://github.com/bolt-design-system/bolt/commit/ab57265))
* update button SSR text ([d421f08](https://github.com/bolt-design-system/bolt/commit/d421f08))
* update button SSR text to not compile Twig filter + update SSR code block ([6ca47ae](https://github.com/bolt-design-system/bolt/commit/6ca47ae))
* update button tests + snapshots ([9725d0f](https://github.com/bolt-design-system/bolt/commit/9725d0f))
* update card + ratio snapshots ([bdf711c](https://github.com/bolt-design-system/bolt/commit/bdf711c))
* update card test snapshots ([566cb1b](https://github.com/bolt-design-system/bolt/commit/566cb1b))
* update chip list snapshot ([e5a6ba4](https://github.com/bolt-design-system/bolt/commit/e5a6ba4))
* update chip list snapshot ([a546a7c](https://github.com/bolt-design-system/bolt/commit/a546a7c))
* update clean task to not wipe the entire www folder every time ([b8cfb67](https://github.com/bolt-design-system/bolt/commit/b8cfb67))
* update CLI to allow the static site generator and/or Pattern Lab to get run manually (especially for testing purposes) ([7f82175](https://github.com/bolt-design-system/bolt/commit/7f82175))
* update component explorer to use a local PHP server instance on master + localhost ([48983f3](https://github.com/bolt-design-system/bolt/commit/48983f3))
* update custom twig tags to address Twig API changes starting to cause errors in multiple environments ([3e9aaff](https://github.com/bolt-design-system/bolt/commit/3e9aaff))
* update dockerfile config + adjust Jest setup to ensure buildPrep + image task work only have to happen once ([82a4673](https://github.com/bolt-design-system/bolt/commit/82a4673))
* update dockerfile install commands ([32c9aa1](https://github.com/bolt-design-system/bolt/commit/32c9aa1))
* update docs site inner page template to use the new pinned content option with bands ([85fe85e](https://github.com/bolt-design-system/bolt/commit/85fe85e))
* update docs site navbar mobile styling ([75e4caa](https://github.com/bolt-design-system/bolt/commit/75e4caa))
* update Drupal Lab .boltrc config to address error with watching files for changes + auto-reload the local Drupal instance when JS or CSS files change ([6ce81c6](https://github.com/bolt-design-system/bolt/commit/6ce81c6))
* update e2e tests to wait up to 3 seconds while looking for specific selectors before timing out ([dca91fd](https://github.com/bolt-design-system/bolt/commit/dca91fd))
* update event emitter to only fire once ([341aabe](https://github.com/bolt-design-system/bolt/commit/341aabe))
* update event emitter to only fire once ([7e454b5](https://github.com/bolt-design-system/bolt/commit/7e454b5))
* update existing IE11 only css ([89e8d56](https://github.com/bolt-design-system/bolt/commit/89e8d56))
* update failing jest test (based on the current branch name) ([0e05374](https://github.com/bolt-design-system/bolt/commit/0e05374))
* Update globbing for packages in root boltrc file to be recursive ([db61406](https://github.com/bolt-design-system/bolt/commit/db61406))
* Update icons prettier config to that it would be like the main config ([4a9471e](https://github.com/bolt-design-system/bolt/commit/4a9471e))
* update iframe resizer library's import path to prevent build errors ([ef0f213](https://github.com/bolt-design-system/bolt/commit/ef0f213))
* update image JS to keep any initial classes found on image tag, backwards compatibility for 'imageAttributes' ([ea980a6](https://github.com/bolt-design-system/bolt/commit/ea980a6))
* update incorrect text component version + repo url for uikit ([cfa6fde](https://github.com/bolt-design-system/bolt/commit/cfa6fde))
* update install command for Travis ([1a64b4d](https://github.com/bolt-design-system/bolt/commit/1a64b4d))
* update install paths ([048da2e](https://github.com/bolt-design-system/bolt/commit/048da2e))
* update jest screenshot reporting to address missing NOW_TOKEN error thrown when doing local dev testing ([fd156d4](https://github.com/bolt-design-system/bolt/commit/fd156d4))
* update Jest test runner to shut down any still-open servers when spinning up to run new tests ([ecd20e6](https://github.com/bolt-design-system/bolt/commit/ecd20e6))
* update jest tests that are still using async on the top level function ([add1f2f](https://github.com/bolt-design-system/bolt/commit/add1f2f))
* update jest tests to auto-exclude test data files in nested folders + rename autolink test configs to have a `.data.js` file extension used to exclude from Jest ([ad70e08](https://github.com/bolt-design-system/bolt/commit/ad70e08))
* update Jest tests to not use async on top level `describe` ([772fbb1](https://github.com/bolt-design-system/bolt/commit/772fbb1))
* update Jest VRT test reporting to more accurately report back image uploads + URLs for remote debugging ([736a7db](https://github.com/bolt-design-system/bolt/commit/736a7db))
* update layout to fix rendering issue in IE 11 ([2d6da70](https://github.com/bolt-design-system/bolt/commit/2d6da70))
* update lerna exec command to run via npx ([3bb2d0d](https://github.com/bolt-design-system/bolt/commit/3bb2d0d))
* update Lerna logic to include merged tags when deciding changes between merges ([d067b4e](https://github.com/bolt-design-system/bolt/commit/d067b4e))
* update logic to auto-update the page title ([1a0fecc](https://github.com/bolt-design-system/bolt/commit/1a0fecc))
* update logic to make sure Git Sha data matches up with the correct + latest now.sh deployment ([c93c5ab](https://github.com/bolt-design-system/bolt/commit/c93c5ab))
* update max height for uikit dropdown menu + fix JS error when page navigation changes ([740e472](https://github.com/bolt-design-system/bolt/commit/740e472))
* update max timeout for autolinker tests ([b00b45b](https://github.com/bolt-design-system/bolt/commit/b00b45b))
* update max timeout for navbar component VRT tests ([9955610](https://github.com/bolt-design-system/bolt/commit/9955610))
* update named task in Github Checks API ([a798b54](https://github.com/bolt-design-system/bolt/commit/a798b54))
* update nav links to handle the content / icon variations ([d5d0e10](https://github.com/bolt-design-system/bolt/commit/d5d0e10))
* update nav priority CSS to ensure the button size doesn't cause the parent component to grow out of control on larger screen sizes ([b1a1e8a](https://github.com/bolt-design-system/bolt/commit/b1a1e8a))
* update navbar jest VRT tests to all use the same image snapshot config ([1615ffa](https://github.com/bolt-design-system/bolt/commit/1615ffa))
* update navbar padding ([6826060](https://github.com/bolt-design-system/bolt/commit/6826060))
* update Nightwatch handleNightwatchResults function to try and resolve timeout issues ([27cdca6](https://github.com/bolt-design-system/bolt/commit/27cdca6))
* update Nightwatch test for PL search input to end early in IE 11 ([5969a43](https://github.com/bolt-design-system/bolt/commit/5969a43))
* update nightwatch tests ([eb31464](https://github.com/bolt-design-system/bolt/commit/eb31464))
* update nightwatch.js to try re-running failing tests up to 3 times ([77d01f9](https://github.com/bolt-design-system/bolt/commit/77d01f9))
* update now.sh utils to change how the NOW_TOKEN gets added ([82c531a](https://github.com/bolt-design-system/bolt/commit/82c531a))
* update npm scripts to not use postinstall automatically; add postinstall to root of the repo instead ([5dc3496](https://github.com/bolt-design-system/bolt/commit/5dc3496))
* update package.json path to fix grid CSS ([e999b33](https://github.com/bolt-design-system/bolt/commit/e999b33))
* update path to post-build script run by Travis ([ea5ae77](https://github.com/bolt-design-system/bolt/commit/ea5ae77))
* update Pattern Lab overview page + docs site homepage templates ([bd06d5f](https://github.com/bolt-design-system/bolt/commit/bd06d5f))
* update pattern lab test to match current pl page title ([24a31de](https://github.com/bolt-design-system/bolt/commit/24a31de))
* update pattern lab to fix header / layout issue in IE 11 ([4a5aba3](https://github.com/bolt-design-system/bolt/commit/4a5aba3))
* update PHP install task in Docker container ([47fb5e0](https://github.com/bolt-design-system/bolt/commit/47fb5e0))
* update PHP SSR logic ([854b716](https://github.com/bolt-design-system/bolt/commit/854b716))
* update Ratio component Jest tests to ensure ratio component rendered as expected before doing any visual regression tests ([965ba4d](https://github.com/bolt-design-system/bolt/commit/965ba4d))
* update ratio component snapshot ([1ce9804](https://github.com/bolt-design-system/bolt/commit/1ce9804))
* update ratio test + update navbar snapshots ([6a4a586](https://github.com/bolt-design-system/bolt/commit/6a4a586))
* update ratio VRT config precision ([b3e6210](https://github.com/bolt-design-system/bolt/commit/b3e6210))
* update remaining band components not yet switched over to use the full [@bolt-components-band](https://github.com/bolt-components-band) twig namespace ([dd8fca4](https://github.com/bolt-design-system/bolt/commit/dd8fca4))
* update remaining docs site templates as workaround to Twig embeds failing to compile ([39c0675](https://github.com/bolt-design-system/bolt/commit/39c0675))
* update selector for image zoom to work when images are rendered to shadow DOM ([ea4f28b](https://github.com/bolt-design-system/bolt/commit/ea4f28b))
* update setCheckRun check ([b96897a](https://github.com/bolt-design-system/bolt/commit/b96897a))
* update so certain PL assets are prefetched vs preloaded ([904ae87](https://github.com/bolt-design-system/bolt/commit/904ae87))
* update SSR function to support older Symfony Process version ([f84f10a](https://github.com/bolt-design-system/bolt/commit/f84f10a))
* Update styling for UL's for IE and Edge ([5aa23d5](https://github.com/bolt-design-system/bolt/commit/5aa23d5))
* update task name ([59310ba](https://github.com/bolt-design-system/bolt/commit/59310ba))
* update testing server to host file assets added to the www dir ([6366dfe](https://github.com/bolt-design-system/bolt/commit/6366dfe))
* update tests ([11734e3](https://github.com/bolt-design-system/bolt/commit/11734e3))
* update tests to address Prettier issues ([1a5a579](https://github.com/bolt-design-system/bolt/commit/1a5a579))
* update tests to stop Twig renderer service when complete ([a7bafbb](https://github.com/bolt-design-system/bolt/commit/a7bafbb))
* update text component demo to use updated schema props from 8 months ago ([7b6b20e](https://github.com/bolt-design-system/bolt/commit/7b6b20e))
* update the URL used by Nightwatch.js to confirm SSR is working as expected ([1c74627](https://github.com/bolt-design-system/bolt/commit/1c74627))
* update to automatically run generated files through Prettier automatically to prevent any linting issues ([ae0b32c](https://github.com/bolt-design-system/bolt/commit/ae0b32c))
* update to only wait to retry requests that are within 15 seconds before calling it quits and using the fallback ([1875bea](https://github.com/bolt-design-system/bolt/commit/1875bea))
* update Travis CI timeout ([b98d5f5](https://github.com/bolt-design-system/bolt/commit/b98d5f5))
* update travis config ([99bc204](https://github.com/bolt-design-system/bolt/commit/99bc204))
* update Travis script for handling read only git repo updates ([0a7233f](https://github.com/bolt-design-system/bolt/commit/0a7233f))
* update Travis sleep command to wait for 60s ([c2873be](https://github.com/bolt-design-system/bolt/commit/c2873be))
* update Travis so builds automatically clear the cached version data so the site dropdown versions always display correctly ([1c37c0a](https://github.com/bolt-design-system/bolt/commit/1c37c0a))
* update Travis task order ([3366905](https://github.com/bolt-design-system/bolt/commit/3366905))
* update Twig header / footer for docs site to still work when lang is set to a string, an array with a single value, and an array with multiple values ([53e7411](https://github.com/bolt-design-system/bolt/commit/53e7411))
* update Twig rendering service API when running on master + add / update caching layers to speed up subsequent builds on Travis ([a8ed82f](https://github.com/bolt-design-system/bolt/commit/a8ed82f))
* update typo ([abe44ba](https://github.com/bolt-design-system/bolt/commit/abe44ba))
* update Webpack build and server config to better account for situations where lang can be defined as a string, an array with one item, and an array with multiple items ([bbeee23](https://github.com/bolt-design-system/bolt/commit/bbeee23))
* use 'src' not 'placeholderSrc' in placeholder noscript image ([20c8661](https://github.com/bolt-design-system/bolt/commit/20c8661))
* use gcd instead of conditionally dividing each by 100 ([47a8d40](https://github.com/bolt-design-system/bolt/commit/47a8d40))
* version bump / cleanup from v2.3.0 release ([32ec7d9](https://github.com/bolt-design-system/bolt/commit/32ec7d9))
* version bump now.sh ([269389d](https://github.com/bolt-design-system/bolt/commit/269389d))
* wait till promise resolves ([28f053f](https://github.com/bolt-design-system/bolt/commit/28f053f))
* workaround to fix major Twig errors being encountered when the docs site is trying to be compiled (removing Twig embeds and sticking to Twig includes and extends seems to do the trick) ([f3533f6](https://github.com/bolt-design-system/bolt/commit/f3533f6))
* wrong build id being passed ([fdc129b](https://github.com/bolt-design-system/bolt/commit/fdc129b))
* yarn install required packages in travis build ([a0dadb0](https://github.com/bolt-design-system/bolt/commit/a0dadb0))
* disable meta flag on now.sh deploy ([a759fae](https://github.com/bolt-design-system/bolt/commit/a759fae))
* moving additional icon for test to folder outside the component root ([95caa3f](https://github.com/bolt-design-system/bolt/commit/95caa3f))
* re-test docker deploy with logging + added meta gitSha info ([0968e51](https://github.com/bolt-design-system/bolt/commit/0968e51))
* update release script to not force push to github ([17ed976](https://github.com/bolt-design-system/bolt/commit/17ed976))
* **@bolt/build-tools:** fix for filing test on first run ([226e96e](https://github.com/bolt-design-system/bolt/commit/226e96e))
* **@bolt/build-tools:** fix js issues ([c501be3](https://github.com/bolt-design-system/bolt/commit/c501be3))
* **@bolt/build-tools:** updateting configutration for testing ([f3333b7](https://github.com/bolt-design-system/bolt/commit/f3333b7))
* **@bolt/build-tools,@bolt/components-icons:** move clean icon task to be run after all the tests ([863f91d](https://github.com/bolt-design-system/bolt/commit/863f91d))
* **@bolt/components-list:** fix issue with missing class in bolt-list-item component ([8305a60](https://github.com/bolt-design-system/bolt/commit/8305a60))
* **@bolt/components-list:** remove class based behavior and added parent child behavior for display ([894291c](https://github.com/bolt-design-system/bolt/commit/894291c))
* **@bolt/components-list:** toggling class in bolt-list-item when changing display option ([b149d38](https://github.com/bolt-design-system/bolt/commit/b149d38))
* **@bolt/components-table:** remove duplicated classes ([8b08cf2](https://github.com/bolt-design-system/bolt/commit/8b08cf2))
* **@bolt/components-tooltip:** remove unwanded bolt-icon rendering ([b9d1601](https://github.com/bolt-design-system/bolt/commit/b9d1601))
* **@bolt/components-video:** cHange test logic ([75f14ad](https://github.com/bolt-design-system/bolt/commit/75f14ad))
* **@bolt/components-video:** fix for IE11 testing ([3ea81a6](https://github.com/bolt-design-system/bolt/commit/3ea81a6))
* **Add support for attributes for bolt-ol and bolt-ul:** add support for attributes for bolt-ol and ([a41aa78](https://github.com/bolt-design-system/bolt/commit/a41aa78))
* **core-php:** moving phpunit from dep to devDep ([2d73ebc](https://github.com/bolt-design-system/bolt/commit/2d73ebc))
* **Update external class names to be complaint with BEM metodology:** update external class names to ([6dc82b3](https://github.com/bolt-design-system/bolt/commit/6dc82b3))


### Features

* add 'gcd' twig function ([e249317](https://github.com/bolt-design-system/bolt/commit/e249317))
* add 'shallow' argument to convertInitialTags ([5eb8a29](https://github.com/bolt-design-system/bolt/commit/5eb8a29))
* add ability to render Twig template strings in the Twig rendering service API ([5cf4b5b](https://github.com/bolt-design-system/bolt/commit/5cf4b5b))
* add case-helper library, not yet loading (WIP) ([41c3227](https://github.com/bolt-design-system/bolt/commit/41c3227))
* add commitizen + commit lint support + wire up to husky commit hooks ([67905fe](https://github.com/bolt-design-system/bolt/commit/67905fe))
* add comprehensive testing coverage to confirm config options + integrations working as expected ([103f37a](https://github.com/bolt-design-system/bolt/commit/103f37a))
* add demo pattern ([a977817](https://github.com/bolt-design-system/bolt/commit/a977817))
* add demo video assets for testing ratio component behavior ([ef366fe](https://github.com/bolt-design-system/bolt/commit/ef366fe))
* add docs site search powered by Algolia ([013df79](https://github.com/bolt-design-system/bolt/commit/013df79))
* add GA autotrack support ([1d7edb2](https://github.com/bolt-design-system/bolt/commit/1d7edb2))
* add GA Javascript to main Bolt docs site head ([931cf74](https://github.com/bolt-design-system/bolt/commit/931cf74))
* add get-latest-deploy script ([1817107](https://github.com/bolt-design-system/bolt/commit/1817107))
* add helper 'containsTagName' ([941e596](https://github.com/bolt-design-system/bolt/commit/941e596))
* add helper functions for converting case type ([5294f0f](https://github.com/bolt-design-system/bolt/commit/5294f0f))
* add initial `@bolt/analytics-autolink` implementation ([d05bc98](https://github.com/bolt-design-system/bolt/commit/d05bc98))
* add initial jest test for the ratio component's twig rendering ([754dfd7](https://github.com/bolt-design-system/bolt/commit/754dfd7))
* add initial set of navbar tests, including visual regression testing coverage, responsive behavior across multiple screen sizes, and tests for interaction (open and close navigation + linkable titles) ([67406c9](https://github.com/bolt-design-system/bolt/commit/67406c9))
* add initialize_props function, util setProp function, names to schema elements ([18a3cd1](https://github.com/bolt-design-system/bolt/commit/18a3cd1))
* add logic to convert snake or camel to kebab case ([9f3f5ff](https://github.com/bolt-design-system/bolt/commit/9f3f5ff))
* add max-width util ([b44eede](https://github.com/bolt-design-system/bolt/commit/b44eede))
* add merge_attributes() function to TwigFunctions, make available in twig templates. ([e352a3d](https://github.com/bolt-design-system/bolt/commit/e352a3d))
* add missing features to web component implementation of blockquote ([149695f](https://github.com/bolt-design-system/bolt/commit/149695f))
* add moveChildrenToRoot option to decorator ([7a218d7](https://github.com/bolt-design-system/bolt/commit/7a218d7))
* add new api-specific build tasks that handle generating the status board, generate visual regression testing URLs, and can find all available versions of the Bolt packages published to NPM ([9cdc962](https://github.com/bolt-design-system/bolt/commit/9cdc962))
* add new placeholder image, use in personalized card demo ([e542029](https://github.com/bolt-design-system/bolt/commit/e542029))
* add new rendering mode config + expose globally ([4636d67](https://github.com/bolt-design-system/bolt/commit/4636d67))
* add new webpack dev server setup for quickly testing components using JIT (just in time) compiling ([cd1ce4e](https://github.com/bolt-design-system/bolt/commit/cd1ce4e))
* add pattern aliases to the background shape and button group packages ([7d71ed9](https://github.com/bolt-design-system/bolt/commit/7d71ed9))
* add persistent caching to twig namespace path discovery. ([d318e9e](https://github.com/bolt-design-system/bolt/commit/d318e9e))
* add POC button component example wired up to use the new ssr filter ([4c51647](https://github.com/bolt-design-system/bolt/commit/4c51647))
* add polyfill for string.includes ([772b19c](https://github.com/bolt-design-system/bolt/commit/772b19c))
* add README.md docs for installing and implementing ([78b5f37](https://github.com/bolt-design-system/bolt/commit/78b5f37))
* add simple image screenshot test reporting functionality to Jest to assist with debugging VRT issues until full Github integration is wired up ([843aeb0](https://github.com/bolt-design-system/bolt/commit/843aeb0))
* add slotted styles, remove attribute selectors ([b82338b](https://github.com/bolt-design-system/bolt/commit/b82338b))
* add support for 'attributes', remove 'attributes' from ratio include ([6878f1d](https://github.com/bolt-design-system/bolt/commit/6878f1d))
* add support for 'cover' prop ([a4c49a9](https://github.com/bolt-design-system/bolt/commit/a4c49a9))
* add support for an optional "pattern -alias" config to help match up oddly named folders in PL with a component's default package.json file name. ([f11db1a](https://github.com/bolt-design-system/bolt/commit/f11db1a))
* add support for content and author to blockquote web component ([0a4f9d9](https://github.com/bolt-design-system/bolt/commit/0a4f9d9))
* add support for quotes with and without <p> ([8c2de4f](https://github.com/bolt-design-system/bolt/commit/8c2de4f))
* add testing support for variable width navbars + add visual regression testing screenshots ([00ef7ff](https://github.com/bolt-design-system/bolt/commit/00ef7ff))
* add tests for responsive <bolt-navbar> width in a variable width grid cell ([d3066cc](https://github.com/bolt-design-system/bolt/commit/d3066cc))
* add the initial verdaccio config + setup work for upcoming release testing work ([6ba3dd8](https://github.com/bolt-design-system/bolt/commit/6ba3dd8))
* add timeout to workaround lazyload render race condition, wip ([71796b0](https://github.com/bolt-design-system/bolt/commit/71796b0))
* add visual regression testing to Jest + add jest-dom as a new tool to help evaluate the state of the DOM inside components being tested ([aee3f0d](https://github.com/bolt-design-system/bolt/commit/aee3f0d))
* add web component SSR + Twig Nightwatch.js test ([6def3e7](https://github.com/bolt-design-system/bolt/commit/6def3e7))
* add web component support to blockquote ([a1bb776](https://github.com/bolt-design-system/bolt/commit/a1bb776))
* add WIP autotrack JS logic ([ebe7128](https://github.com/bolt-design-system/bolt/commit/ebe7128))
* addd ability to manually enable / disable server-side rendering + automatically toggle based on dev environment ([861a14e](https://github.com/bolt-design-system/bolt/commit/861a14e))
* Adds manual testing steps for bolt-button on PatternLab in an approximation of Gherkin format ([7ce733a](https://github.com/bolt-design-system/bolt/commit/7ce733a))
* automatically boot up webpack dev server to remove the need to compile Pattern Lab before running any Jest tests ([8d910b0](https://github.com/bolt-design-system/bolt/commit/8d910b0))
* automatically re-render + re-evaluate slots and classes added when child node mutations are observed ([10f1ec7](https://github.com/bolt-design-system/bolt/commit/10f1ec7))
* automatically switch between a simple static now.sh deployment vs a full docker-based deployment based on the branch ([7d56566](https://github.com/bolt-design-system/bolt/commit/7d56566))
* begin to convert image to web component, wip ([7cd8a33](https://github.com/bolt-design-system/bolt/commit/7cd8a33))
* change ratio prop to use slash-separated values ([0b739b1](https://github.com/bolt-design-system/bolt/commit/0b739b1))
* clean up nav UI to make it easier to see which links have two actions vs only one ([6325574](https://github.com/bolt-design-system/bolt/commit/6325574))
* convert schema data to camelCase before calling validate ([f7e9e93](https://github.com/bolt-design-system/bolt/commit/f7e9e93))
* create report nightwatch results script ([f1a8d6a](https://github.com/bolt-design-system/bolt/commit/f1a8d6a))
* deprecate 'useAspectRatio', 'width', and 'height'; update instances to use 'ratio' ([5a4b34a](https://github.com/bolt-design-system/bolt/commit/5a4b34a))
* Differentiate between developer testing and functional testing ([eaaa3ca](https://github.com/bolt-design-system/bolt/commit/eaaa3ca))
* do not set unnecessary props on twig generated blockquotes ([a9b2bbe](https://github.com/bolt-design-system/bolt/commit/a9b2bbe))
* extend 'initialize_props()' to return array with default props in snake_case ([29730c2](https://github.com/bolt-design-system/bolt/commit/29730c2))
* first round of ratio component jest tests ([c17a6b2](https://github.com/bolt-design-system/bolt/commit/c17a6b2))
* force icons to be visible at smaller layout sizes ([22f199a](https://github.com/bolt-design-system/bolt/commit/22f199a))
* fully support "ratio" prop in image Twig template ([f1b2e6c](https://github.com/bolt-design-system/bolt/commit/f1b2e6c))
* Generating a JSON file in www/build/data/ directory for Drupal team ([a36c5f2](https://github.com/bolt-design-system/bolt/commit/a36c5f2))
* Give posibility to generate schema for new added icons ([577d9f3](https://github.com/bolt-design-system/bolt/commit/577d9f3))
* import missing styles needed for twig templates ([8603947](https://github.com/bolt-design-system/bolt/commit/8603947))
* initial nightwatch.js refactor work; adding support for split tests + different local and remote testing setups in the package.json file ([a8cf89f](https://github.com/bolt-design-system/bolt/commit/a8cf89f))
* move cache set to within try block. ([fa88ef7](https://github.com/bolt-design-system/bolt/commit/fa88ef7))
* pass placeholder values, ratio data via web component props ([ad560ad](https://github.com/bolt-design-system/bolt/commit/ad560ad))
* pass validated size prop ([28131f0](https://github.com/bolt-design-system/bolt/commit/28131f0))
* patch Pattern Lab PHP to include a new --data-only CLI config option to export the global PL data available (ex. nav URLs) without having to do a full PL build ([51cd6e9](https://github.com/bolt-design-system/bolt/commit/51cd6e9))
* port over + upgrade yeoman generator for consistently and easily spinning up new Bolt components + auto updating the related config files ([b93426c](https://github.com/bolt-design-system/bolt/commit/b93426c))
* remove 'content' prop from blockquote web component, use validateProps method on base class ([93bad4b](https://github.com/bolt-design-system/bolt/commit/93bad4b))
* remove 'name' from schema props ([f89aee4](https://github.com/bolt-design-system/bolt/commit/f89aee4))
* remove bolt-image children on connect ([57df829](https://github.com/bolt-design-system/bolt/commit/57df829))
* remove height and width props from image web component ([ba7dfd6](https://github.com/bolt-design-system/bolt/commit/ba7dfd6))
* remove merge_attributes function ([1f70798](https://github.com/bolt-design-system/bolt/commit/1f70798))
* remove twig blocks completely ([089cd05](https://github.com/bolt-design-system/bolt/commit/089cd05))
* rename noUseAspectRatio to no_ratio, update logic ([9b7191b](https://github.com/bolt-design-system/bolt/commit/9b7191b))
* render image template every time, do not keep initial HTML ([101e177](https://github.com/bolt-design-system/bolt/commit/101e177))
* reorganizing dev-specific docs site files + adding docs on server-side rendering ([2c2b58c](https://github.com/bolt-design-system/bolt/commit/2c2b58c))
* rework 'initialize_props' into 'initialize' which returns both props and data ([1e559de](https://github.com/bolt-design-system/bolt/commit/1e559de))
* rework buildArrayProps function, only check top-level schema props, auto-convert name to kebab (WIP) ([013c527](https://github.com/bolt-design-system/bolt/commit/013c527))
* rework merge_attributes function into initialize_props which uses _context and returns array of allowed props ([dc0ee4e](https://github.com/bolt-design-system/bolt/commit/dc0ee4e))
* setup execAndReport ([6c82792](https://github.com/bolt-design-system/bolt/commit/6c82792))
* setup unit test report; consolidating travis jobs ([aef6ab3](https://github.com/bolt-design-system/bolt/commit/aef6ab3))
* show image fallback if lazyload is true ([5e3c3bd](https://github.com/bolt-design-system/bolt/commit/5e3c3bd))
* Simplifies and conslidates functinal testing steps using tables ([875f76b](https://github.com/bolt-design-system/bolt/commit/875f76b))
* skip ratio if 'cover' attribute is true ([d03a9c7](https://github.com/bolt-design-system/bolt/commit/d03a9c7))
* temporarily set lazyload to false, does not work yet in shadow dom ([7e4e788](https://github.com/bolt-design-system/bolt/commit/7e4e788))
* testing lazySizes options, commented out ([5467c4d](https://github.com/bolt-design-system/bolt/commit/5467c4d))
* update Bolt build config to add support for extending / modifying the default Webpack config generated ([b283134](https://github.com/bolt-design-system/bolt/commit/b283134))
* update Drupal Lab template to use the Navbar component ([5cabdd1](https://github.com/bolt-design-system/bolt/commit/5cabdd1))
* update form component to allow the form input icon size to be optionally adjusted in size ([da0b42a](https://github.com/bolt-design-system/bolt/commit/da0b42a))
* update gcd twig function with type check ([fa6d8c9](https://github.com/bolt-design-system/bolt/commit/fa6d8c9))
* update image JS to match latest component patterns, testing basic use cases, WIP ([5327f3d](https://github.com/bolt-design-system/bolt/commit/5327f3d))
* update image schema with noLazyload for web component ([31fb142](https://github.com/bolt-design-system/bolt/commit/31fb142))
* update Jest to automatically transpile ES6 code (via Babel) to allow component tests to use modern JS libraries ([72be039](https://github.com/bolt-design-system/bolt/commit/72be039))
* update lerna + add new release-specific and release candidate-specific bash scripts ([fef0b78](https://github.com/bolt-design-system/bolt/commit/fef0b78))
* update navbar template used on docs site global header + update .boltrc config ([7e0b5fa](https://github.com/bolt-design-system/bolt/commit/7e0b5fa))
* update next branch name checked when doing a lerna deployment + add new beta release script ([3739309](https://github.com/bolt-design-system/bolt/commit/3739309))
* update placeholder logic to include 'cover' ([0da2c6e](https://github.com/bolt-design-system/bolt/commit/0da2c6e))
* run nightwatch tests on local ([51829f0](https://github.com/bolt-design-system/bolt/commit/51829f0))
* **@bolt/components-icons:** cleaning code ([28d2e00](https://github.com/bolt-design-system/bolt/commit/28d2e00))
* **@bolt/components-icons:** cleaning files after test are done ([478ba17](https://github.com/bolt-design-system/bolt/commit/478ba17))
* **@bolt/website,@bolt/build-tools:** add posibility to add external icons to be rendered by icon t ([89a7061](https://github.com/bolt-design-system/bolt/commit/89a7061))
* **@bolt/website,@bolt/build-tools,@bolt/components-icons:** updating configuration and fix issue w ([82a5686](https://github.com/bolt-design-system/bolt/commit/82a5686))
* **@bolt/website,@bolt/components-chip:** create web component for bolt-chip component ([6d1ae09](https://github.com/bolt-design-system/bolt/commit/6d1ae09))
* **@bolt/website,@bolt/components-chip-list:** update documentation and change to bolt-list is used ([e7185a8](https://github.com/bolt-design-system/bolt/commit/e7185a8))
* **@bolt/website,@bolt/components-chip,@bolt/core:** fixing all issue pointed by Mike and move vali ([51a4142](https://github.com/bolt-design-system/bolt/commit/51a4142))
* **Add some test and spanshots:** add some JEST test ([bcf8a8a](https://github.com/bolt-design-system/bolt/commit/bcf8a8a))
* update ratio component tests to check for css var and shadow dom variations ([eea7f71](https://github.com/bolt-design-system/bolt/commit/eea7f71))
* upgrade Jest to automatically polyfill the testing environment in order to use helper libraries for testing web components ([3eb8345](https://github.com/bolt-design-system/bolt/commit/3eb8345))
* wire up button component to include VRT, web component tests, update Twig renderer calls to compile even faster ([4b34184](https://github.com/bolt-design-system/bolt/commit/4b34184))
* **Add testing readme files:** add testing readme files ([a8a10c0](https://github.com/bolt-design-system/bolt/commit/a8a10c0)), closes [#948](https://github.com/bolt-design-system/bolt/issues/948) [#949](https://github.com/bolt-design-system/bolt/issues/949)
* **Adding test and documentation to bolt-ol and bolt-ul component:** adding test and documentation ([f75206b](https://github.com/bolt-design-system/bolt/commit/f75206b))
* **website, twig renderer, component explorer:** update the Twig Renderer to support keepAlive ([470f7af](https://github.com/bolt-design-system/bolt/commit/470f7af))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/commit/752c0df))
* wire up ssr-server POC for handling SSR requests ([5c24e5a](https://github.com/bolt-design-system/bolt/commit/5c24e5a))


### Performance Improvements

* **@bolt/components-table:** update dependencies ([41bc8f9](https://github.com/bolt-design-system/bolt/commit/41bc8f9))





# [2.4.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v2.3.0...v2.4.0-beta.0) (2019-04-16)


### Bug Fixes

* 'ratio' prop conflicts with prop set from background template, update name in background template ([fc6d598](https://github.com/bolt-design-system/bolt/commit/fc6d598))
* add --detectOpenHandles to troubleshoot tests not completing when Jest expects them to ([3196d3e](https://github.com/bolt-design-system/bolt/commit/3196d3e))
* add 'is_ssr' flag to noscript, wait until SSR is in place before using ([2049a70](https://github.com/bolt-design-system/bolt/commit/2049a70))
* Add 'spaceless' around typography template, otherwise outputs extra whitespace causing issues in blockquote ([3817443](https://github.com/bolt-design-system/bolt/commit/3817443))
* add ajv to core package.json ([74322ea](https://github.com/bolt-design-system/bolt/commit/74322ea))
* add backwards compatibility for 'ratio' prop as boolean ([25c3c90](https://github.com/bolt-design-system/bolt/commit/25c3c90))
* add error catcher to bash getLatestDeploy ([a0935cf](https://github.com/bolt-design-system/bolt/commit/a0935cf))
* add fetch require back in ([efa10b4](https://github.com/bolt-design-system/bolt/commit/efa10b4))
* add missing dependencies to deploy-specific package.json ([e360f9f](https://github.com/bolt-design-system/bolt/commit/e360f9f))
* add missing dependency to prevent install warnings ([c9231cd](https://github.com/bolt-design-system/bolt/commit/c9231cd))
* add missing dependency to twig renderer ([20778d0](https://github.com/bolt-design-system/bolt/commit/20778d0))
* add missing lodash dep ([2e84680](https://github.com/bolt-design-system/bolt/commit/2e84680))
* add missing navbar-related dependencies to the <bolt-navbar> component ([c612909](https://github.com/bolt-design-system/bolt/commit/c612909))
* add missing polyfiills needed for IE 11 ([0cac28f](https://github.com/bolt-design-system/bolt/commit/0cac28f))
* add missing publicConfig to new @bolt/api package ([cd475d2](https://github.com/bolt-design-system/bolt/commit/cd475d2))
* add missing scripts folder deps ([1674a9c](https://github.com/bolt-design-system/bolt/commit/1674a9c))
* add missing slots to icons in <bolt-button> SSR demos ([115745d](https://github.com/bolt-design-system/bolt/commit/115745d))
* add missing token + adjust deploy command ([e2e1fb7](https://github.com/bolt-design-system/bolt/commit/e2e1fb7))
* add missing TRAVIS_TAG env var ([403647e](https://github.com/bolt-design-system/bolt/commit/403647e))
* add missing webpack-merge dependency to the build tools package ([889f0fd](https://github.com/bolt-design-system/bolt/commit/889f0fd))
* add new line to .dockerignore ([e7ee5e7](https://github.com/bolt-design-system/bolt/commit/e7ee5e7))
* add node env ([95fef85](https://github.com/bolt-design-system/bolt/commit/95fef85))
* add now.sh token ([887ac3c](https://github.com/bolt-design-system/bolt/commit/887ac3c))
* Add padding to right sidebar in docs to create symmetry ([56d8656](https://github.com/bolt-design-system/bolt/commit/56d8656))
* add prettier config to vue example + update README ([5be97eb](https://github.com/bolt-design-system/bolt/commit/5be97eb))
* add renderer mode config default ([1201419](https://github.com/bolt-design-system/bolt/commit/1201419))
* Add support for attributes passed in as an object ([b2baa67](https://github.com/bolt-design-system/bolt/commit/b2baa67))
* add testing instructions ([2ec5ce3](https://github.com/bolt-design-system/bolt/commit/2ec5ce3))
* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/commit/cf335ce))
* add update autolink click tests to make sure we're waiting for the new page to finish loading before continuing to run checks. https://checklyhq.com/docs/browser-checks/timeouts/#page-waitfornavigation ([f3f5059](https://github.com/bolt-design-system/bolt/commit/f3f5059))
* adding enum for boolean props ([67c9e78](https://github.com/bolt-design-system/bolt/commit/67c9e78))
* adding important ([4434ad4](https://github.com/bolt-design-system/bolt/commit/4434ad4))
* address prettier issues ([492c158](https://github.com/bolt-design-system/bolt/commit/492c158))
* adjust breakpoint for hiding viewport resizer controls ([2b792bd](https://github.com/bolt-design-system/bolt/commit/2b792bd))
* adjust button VRT failure threshold ([34b62f7](https://github.com/bolt-design-system/bolt/commit/34b62f7))
* adjust default link line height + icon and text spacing ([806814f](https://github.com/bolt-design-system/bolt/commit/806814f))
* adjust quick PHP setup task ([4b8ff1f](https://github.com/bolt-design-system/bolt/commit/4b8ff1f))
* adjust ratio VRT failure threshold ([f5d08a1](https://github.com/bolt-design-system/bolt/commit/f5d08a1))
* attempt removal of extraneous call to SauceLabs ([28b31ed](https://github.com/bolt-design-system/bolt/commit/28b31ed))
* authing SauceLabs assets for GitHub Checks download ([a479dd4](https://github.com/bolt-design-system/bolt/commit/a479dd4))
* auto-ignore any yeoman generator files used to create tests ([60b6f16](https://github.com/bolt-design-system/bolt/commit/60b6f16))
* auto-remove the wwwDir folder before running any Jest tests ([2496ceb](https://github.com/bolt-design-system/bolt/commit/2496ceb))
* automatically retry fetch requests if / when a 500 error occurs. ([98fa9c9](https://github.com/bolt-design-system/bolt/commit/98fa9c9))
* border classname on blockquote ([84b1371](https://github.com/bolt-design-system/bolt/commit/84b1371))
* broken image paths ([9e7864d](https://github.com/bolt-design-system/bolt/commit/9e7864d))
* broken js ([abb4007](https://github.com/bolt-design-system/bolt/commit/abb4007))
* button border-radius default ([e3ffd92](https://github.com/bolt-design-system/bolt/commit/e3ffd92))
* button class logics ([587f56f](https://github.com/bolt-design-system/bolt/commit/587f56f))
* button focus ([0e263b4](https://github.com/bolt-design-system/bolt/commit/0e263b4))
* bypass cache when doing a full tagged release + fix deploy script to not update the main docs site url when doing pre-releases ([9faa0f4](https://github.com/bolt-design-system/bolt/commit/9faa0f4))
* change get-latest-deploy from bash to node.js ([30da611](https://github.com/bolt-design-system/bolt/commit/30da611))
* change setup:php to run composer *install* not update, we will update manually ([0d27fe5](https://github.com/bolt-design-system/bolt/commit/0d27fe5))
* check for not 'cover' rather than sameas ([0be7f5d](https://github.com/bolt-design-system/bolt/commit/0be7f5d))
* check for textContent not innerHTML, bug when rendered to light-dom ([952e711](https://github.com/bolt-design-system/bolt/commit/952e711))
* check if component was initially rendered before removing children, IE runs twice on background component and empties the rendered HTML ([4006913](https://github.com/bolt-design-system/bolt/commit/4006913))
* checking image urls to see if valid ([a7de0a8](https://github.com/bolt-design-system/bolt/commit/a7de0a8))
* clarify gutter prop and its related demos ([7ec76be](https://github.com/bolt-design-system/bolt/commit/7ec76be))
* clean ([5bce04e](https://github.com/bolt-design-system/bolt/commit/5bce04e))
* clean up reporting to github app ([ab56b9e](https://github.com/bolt-design-system/bolt/commit/ab56b9e))
* code and organization cleanup ([5c5764d](https://github.com/bolt-design-system/bolt/commit/5c5764d))
* code cleanup ([a344b8b](https://github.com/bolt-design-system/bolt/commit/a344b8b))
* complete => completed ([8394eee](https://github.com/bolt-design-system/bolt/commit/8394eee))
* consistent copy ([8a4dfc7](https://github.com/bolt-design-system/bolt/commit/8a4dfc7))
* convert cases to our standards ([dce4b1d](https://github.com/bolt-design-system/bolt/commit/dce4b1d))
* copy edits ([76cc46a](https://github.com/bolt-design-system/bolt/commit/76cc46a))
* copy updates ([ff41fa4](https://github.com/bolt-design-system/bolt/commit/ff41fa4))
* correct typo of the github checks API name used to change the build status ([6cc70d8](https://github.com/bolt-design-system/bolt/commit/6cc70d8))
* disable band transition inline on component overview page in PL ([0456c91](https://github.com/bolt-design-system/bolt/commit/0456c91))
* disable browsersync ghost syncing as a workaround to ensure local Nightwatch.js browser tests don't have clicks / interactions triggered by other browsers. ([ec55a2d](https://github.com/bolt-design-system/bolt/commit/ec55a2d))
* disable console log output with UIKit regeneration ([0f2e2b6](https://github.com/bolt-design-system/bolt/commit/0f2e2b6))
* disable inactive text + icon variation PL demo so they don't show up in the menu ([96a1ac5](https://github.com/bolt-design-system/bolt/commit/96a1ac5))
* disable mandatory e2e testing on local push for now ([2a6ace7](https://github.com/bolt-design-system/bolt/commit/2a6ace7))
* disable SSR ([a9670dd](https://github.com/bolt-design-system/bolt/commit/a9670dd))
* display the correct test number in the screenshot results panel ([1b79827](https://github.com/bolt-design-system/bolt/commit/1b79827))
* Display UL items in edge ([d9d9f66](https://github.com/bolt-design-system/bolt/commit/d9d9f66))
* doc conflicts ([dadc396](https://github.com/bolt-design-system/bolt/commit/dadc396))
* docs and schema ([ca10596](https://github.com/bolt-design-system/bolt/commit/ca10596))
* docs site-specific layout updates to address display / responsive behavior issues ([cae9b00](https://github.com/bolt-design-system/bolt/commit/cae9b00))
* Don't allow an unspecified type to be considered valid ([83c2444](https://github.com/bolt-design-system/bolt/commit/83c2444))
* don't include empty screenshots in the Github Checks API results ([e0fc5e6](https://github.com/bolt-design-system/bolt/commit/e0fc5e6))
* don't remove the docs site when setting up the code for Travis builds ([4140d12](https://github.com/bolt-design-system/bolt/commit/4140d12))
* don't report on screenshot VRT results if none have failed ([7acb808](https://github.com/bolt-design-system/bolt/commit/7acb808))
* enable prod mode + disable sourcemaps to improve loading performance ([7dd8a15](https://github.com/bolt-design-system/bolt/commit/7dd8a15))
* ensure all default Sass spacing scale config can be overwritten (ex. lang-specific spacing options like we have with Japanese) ([6c8e59d](https://github.com/bolt-design-system/bolt/commit/6c8e59d))
* ensure code viewer works consistently when async loading modal-viewer JS; fix width of code displaying in drawer ([bbb9f95](https://github.com/bolt-design-system/bolt/commit/bbb9f95))
* ensure every autolink test has a high enough timeout ([ea83ca0](https://github.com/bolt-design-system/bolt/commit/ea83ca0))
* ensure vanilla <code> elements can scroll horizontally and/or vertically if needed ([9500afc](https://github.com/bolt-design-system/bolt/commit/9500afc))
* fix for the PL nav incorrectly auto-closing in certain situations ([9ff9fc8](https://github.com/bolt-design-system/bolt/commit/9ff9fc8))
* fix issues with nav opening / closing when expected based on screen size + layout mode ([e4d2750](https://github.com/bolt-design-system/bolt/commit/e4d2750))
* fix lint / prettier issues ([aefbf12](https://github.com/bolt-design-system/bolt/commit/aefbf12))
* fix linting issues ([7d01b58](https://github.com/bolt-design-system/bolt/commit/7d01b58))
* fix now.sh deployments ([b7091ae](https://github.com/bolt-design-system/bolt/commit/b7091ae))
* Fix path issue ([a760987](https://github.com/bolt-design-system/bolt/commit/a760987))
* fix prettier errors ([f55babd](https://github.com/bolt-design-system/bolt/commit/f55babd))
* fix prettier issuers ([50d223e](https://github.com/bolt-design-system/bolt/commit/50d223e))
* fix prettier issues ([5ed26db](https://github.com/bolt-design-system/bolt/commit/5ed26db))
* Fix prettier issues ([dde96dd](https://github.com/bolt-design-system/bolt/commit/dde96dd))
* fix schema in ol test ([0a92686](https://github.com/bolt-design-system/bolt/commit/0a92686))
* fix task collection event sequence ([eaed5ce](https://github.com/bolt-design-system/bolt/commit/eaed5ce))
* fix typo ([70d49c0](https://github.com/bolt-design-system/bolt/commit/70d49c0))
* fix typo in setting up Jest env ([4689801](https://github.com/bolt-design-system/bolt/commit/4689801))
* fix typo in the docs site .boltrc config ([352a9f4](https://github.com/bolt-design-system/bolt/commit/352a9f4))
* flag and figure bugs ([9893c60](https://github.com/bolt-design-system/bolt/commit/9893c60))
* force downgrade version of text component prior to publishing ([7f9dbb0](https://github.com/bolt-design-system/bolt/commit/7f9dbb0))
* force now.sh CLI to v15 or later ([40f244a](https://github.com/bolt-design-system/bolt/commit/40f244a))
* fullBleed deprecation logic ([38f7a1e](https://github.com/bolt-design-system/bolt/commit/38f7a1e))
* further update timeout ([3ae260e](https://github.com/bolt-design-system/bolt/commit/3ae260e))
* Generate icons correct with prretier config ([1529fe2](https://github.com/bolt-design-system/bolt/commit/1529fe2))
* get latest now.sh deploy for Nightwatch tests ([d03a708](https://github.com/bolt-design-system/bolt/commit/d03a708))
* gutter correction ([05c2ef7](https://github.com/bolt-design-system/bolt/commit/05c2ef7))
* headline width ([de432ad](https://github.com/bolt-design-system/bolt/commit/de432ad))
* hotfix for likely root cause of recent now.sh deployments to fail ([1b204ad](https://github.com/bolt-design-system/bolt/commit/1b204ad))
* html encode web component examples in docs so they don't render as actual components ([52e4675](https://github.com/bolt-design-system/bolt/commit/52e4675))
* IE and Edge ordered list background and numbering fix ([2a21609](https://github.com/bolt-design-system/bolt/commit/2a21609))
* image data filter, change to greater than or equal to, was filtering out exact matches ([863cfa4](https://github.com/bolt-design-system/bolt/commit/863cfa4))
* images on client-rendered, server-rendered demo pages ([3dfa10d](https://github.com/bolt-design-system/bolt/commit/3dfa10d))
* increase max timeout for button Jest tests ([efbb7ee](https://github.com/bolt-design-system/bolt/commit/efbb7ee))
* increase max timeout of E2E tests to troubleshoot failing Nightwatch tests ([8056db2](https://github.com/bolt-design-system/bolt/commit/8056db2))
* increase Symfony process timeout ([801db62](https://github.com/bolt-design-system/bolt/commit/801db62))
* inline list container width ([84fa95a](https://github.com/bolt-design-system/bolt/commit/84fa95a))
* JS error when image class is not found ([a3c733a](https://github.com/bolt-design-system/bolt/commit/a3c733a))
* link text and icon spacing ([f79f585](https://github.com/bolt-design-system/bolt/commit/f79f585))
* lint js ([352c21e](https://github.com/bolt-design-system/bolt/commit/352c21e))
* lint js ([4c36399](https://github.com/bolt-design-system/bolt/commit/4c36399))
* lint js ([460b88b](https://github.com/bolt-design-system/bolt/commit/460b88b))
* lint js ([519b052](https://github.com/bolt-design-system/bolt/commit/519b052))
* lint js ([8b21eaf](https://github.com/bolt-design-system/bolt/commit/8b21eaf))
* lint js ([a7dda94](https://github.com/bolt-design-system/bolt/commit/a7dda94))
* lint styles ([a1d11d9](https://github.com/bolt-design-system/bolt/commit/a1d11d9))
* lint styles ([ff33648](https://github.com/bolt-design-system/bolt/commit/ff33648))
* lint styles ([d942d44](https://github.com/bolt-design-system/bolt/commit/d942d44))
* lint styles ([32c932e](https://github.com/bolt-design-system/bolt/commit/32c932e))
* lint styles ([6529faf](https://github.com/bolt-design-system/bolt/commit/6529faf))
* linting js ([fd11c79](https://github.com/bolt-design-system/bolt/commit/fd11c79))
* make images display "block" by default to avoid whitespace issues inside custom-element ([dd2b5fd](https://github.com/bolt-design-system/bolt/commit/dd2b5fd))
* make sure NOW_TOKEN env added to now.sh deploy commands ([4d0a482](https://github.com/bolt-design-system/bolt/commit/4d0a482))
* manually disable SSR ([b7d0550](https://github.com/bolt-design-system/bolt/commit/b7d0550))
* manually disable SSR temporarily ([95ebc8c](https://github.com/bolt-design-system/bolt/commit/95ebc8c))
* mapping grid item to schema props ([70a2215](https://github.com/bolt-design-system/bolt/commit/70a2215))
* migrate updated button component JS logic to new button.js component file ([f9ce8e7](https://github.com/bolt-design-system/bolt/commit/f9ce8e7))
* misc docs site related UI fixes ([5ef9667](https://github.com/bolt-design-system/bolt/commit/5ef9667))
* missing space ([5f4b86d](https://github.com/bolt-design-system/bolt/commit/5f4b86d))
* move around webpack loader plugins needed for running the full test suite ([e7cb37e](https://github.com/bolt-design-system/bolt/commit/e7cb37e))
* move image and JS to fixtures dir ([afc93c8](https://github.com/bolt-design-system/bolt/commit/afc93c8))
* move margin to blockquote image, not every footer item ([e52d9c6](https://github.com/bolt-design-system/bolt/commit/e52d9c6))
* move new custom twig functions to BoltCore ([91bef25](https://github.com/bolt-design-system/bolt/commit/91bef25))
* move process.env-related variables to the top ([2713f45](https://github.com/bolt-design-system/bolt/commit/2713f45))
* need to reset git repo before update-read-only-git-repos.sh ([54f9644](https://github.com/bolt-design-system/bolt/commit/54f9644))
* nightwatch tearDown => afterEach ([d9fd395](https://github.com/bolt-design-system/bolt/commit/d9fd395))
* only add main bolt image class to fallback ([c1292f9](https://github.com/bolt-design-system/bolt/commit/c1292f9))
* package.json ([53410b9](https://github.com/bolt-design-system/bolt/commit/53410b9))
* pass correct variable in alignment validation ([8455c07](https://github.com/bolt-design-system/bolt/commit/8455c07))
* pass in passed ([305ea28](https://github.com/bolt-design-system/bolt/commit/305ea28))
* port over ratio component test config updates from https://github.com/bolt-design-system/bolt/pull/1109 based on the ~1.3% average VRT diff that pops up periodically ([dc4a22a](https://github.com/bolt-design-system/bolt/commit/dc4a22a))
* port over Travis CI updates from https://github.com/bolt-design-system/bolt/pull/1109 meant to improve the reliability / consistency of the visual regression test results being run by Jest ([8f56a70](https://github.com/bolt-design-system/bolt/commit/8f56a70))
* Pretter issue ([e3308eb](https://github.com/bolt-design-system/bolt/commit/e3308eb))
* proactively load the text component's JS to speed up initial rendering ([d942886](https://github.com/bolt-design-system/bolt/commit/d942886))
* Pull in the newly-added case-helper dependency to the docs site ([32e7e86](https://github.com/bolt-design-system/bolt/commit/32e7e86))
* quick fix to address band / height issue on the docs site in IE 11 and Firefox ([0721b70](https://github.com/bolt-design-system/bolt/commit/0721b70))
* quote text tests ([5b5d3c3](https://github.com/bolt-design-system/bolt/commit/5b5d3c3))
* re-add chrome-path to Travis config as working solution for more consistent VRT testing results ([f1f1573](https://github.com/bolt-design-system/bolt/commit/f1f1573))
* re-add local PHP dependencies to fix broken CI tests ([595c19d](https://github.com/bolt-design-system/bolt/commit/595c19d))
* re-add support for 'imageAttributes' for backwards compatibility, but deprecate it ([fa78212](https://github.com/bolt-design-system/bolt/commit/fa78212))
* re-location button component server-side rendering examples ([bb5eb3e](https://github.com/bolt-design-system/bolt/commit/bb5eb3e))
* re-test checkRun imports ([6a78bcb](https://github.com/bolt-design-system/bolt/commit/6a78bcb))
* re-test Jest after tweaking logic used to make sure the config data needed is available ([f808965](https://github.com/bolt-design-system/bolt/commit/f808965))
* re-test nightwatch results reporting to address screenshot issues on Travis ([f250b28](https://github.com/bolt-design-system/bolt/commit/f250b28))
* re-test with additional dockerfile updates ([300ec85](https://github.com/bolt-design-system/bolt/commit/300ec85))
* re-test with updated travis config ([8275947](https://github.com/bolt-design-system/bolt/commit/8275947))
* rearrange CLI args ([a9956ee](https://github.com/bolt-design-system/bolt/commit/a9956ee))
* reducing previous debugging sleep command ([e09115e](https://github.com/bolt-design-system/bolt/commit/e09115e))
* refactor deploy logic to ensure url aliases don't exceed max length on now.sh ([286c8a7](https://github.com/bolt-design-system/bolt/commit/286c8a7))
* refactor promise returns ([d2c61bb](https://github.com/bolt-design-system/bolt/commit/d2c61bb))
* relocate chrome path dependency ([5bb6342](https://github.com/bolt-design-system/bolt/commit/5bb6342))
* relocate NPM dependencies needed for Jest to run through unit tests ([5d56ec2](https://github.com/bolt-design-system/bolt/commit/5d56ec2))
* remove 'striptags' filter from bolt-teaser text, creates IE bugs with bolt-link ([8ae0e2f](https://github.com/bolt-design-system/bolt/commit/8ae0e2f))
* remove 'web component only' from ratio description ([84738e1](https://github.com/bolt-design-system/bolt/commit/84738e1))
* remove async from Share component test ([04a3749](https://github.com/bolt-design-system/bolt/commit/04a3749))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/commit/a7f5fec))
* remove auto-highlighting SSR-rendered HTML ([caaec8c](https://github.com/bolt-design-system/bolt/commit/caaec8c))
* remove bail flag from Travis CI to troubleshoot Travis test failing mysteriously ([30cb128](https://github.com/bolt-design-system/bolt/commit/30cb128))
* remove Bolt Bot comments, cleanup deploy script ([83b285d](https://github.com/bolt-design-system/bolt/commit/83b285d))
* remove build tools dependency from the @bolt/api package ([900307c](https://github.com/bolt-design-system/bolt/commit/900307c))
* remove dependency loop between packages ([b43fc34](https://github.com/bolt-design-system/bolt/commit/b43fc34))
* remove deps not needed ([4d1098c](https://github.com/bolt-design-system/bolt/commit/4d1098c))
* remove ENV var from npm script ([8d39245](https://github.com/bolt-design-system/bolt/commit/8d39245))
* remove exclude rule in vue webpack config — fixes error thrown otherwise ([67a3b9d](https://github.com/bolt-design-system/bolt/commit/67a3b9d))
* remove extra comma ([8267ce0](https://github.com/bolt-design-system/bolt/commit/8267ce0))
* remove extra status call to Github Checks API ([896ee99](https://github.com/bolt-design-system/bolt/commit/896ee99))
* remove extra VRT screenshot that shouldn't exist ([8a5982f](https://github.com/bolt-design-system/bolt/commit/8a5982f))
* remove hero text and set up themes ([ed8ba7b](https://github.com/bolt-design-system/bolt/commit/ed8ba7b))
* Remove issue with paths on non-local machine ([32b527f](https://github.com/bolt-design-system/bolt/commit/32b527f))
* remove js-fonts-loaded class from testing-server HTML response + add critical css vars component to retest rendering ([c6113f1](https://github.com/bolt-design-system/bolt/commit/c6113f1))
* remove meta flag from now deploy ([bd63ed2](https://github.com/bolt-design-system/bolt/commit/bd63ed2))
* Remove observedAttributes method from nav-priority component ([c748bae](https://github.com/bolt-design-system/bolt/commit/c748bae))
* remove old e2e tests + old screenshots and reports folders ([322fe11](https://github.com/bolt-design-system/bolt/commit/322fe11))
* remove old vars ([ef310bc](https://github.com/bolt-design-system/bolt/commit/ef310bc))
* remove padding for block list's last item ([868f077](https://github.com/bolt-design-system/bolt/commit/868f077))
* remove postinstall on docs site + test quicker PHP install command ([5b76360](https://github.com/bolt-design-system/bolt/commit/5b76360))
* remove reference to specific Bolt version in the <bolt-video> snapshot tests ([40e2351](https://github.com/bolt-design-system/bolt/commit/40e2351))
* remove setTimeout, check that image is loaded before calling 'unveil' ([d9d5489](https://github.com/bolt-design-system/bolt/commit/d9d5489))
* remove typo ([474d161](https://github.com/bolt-design-system/bolt/commit/474d161))
* remove unneeded rendered() method ([d1e940d](https://github.com/bolt-design-system/bolt/commit/d1e940d))
* remove unused 'content' prop in render ([ce16411](https://github.com/bolt-design-system/bolt/commit/ce16411))
* remove unused 'get' import ([7abb7e9](https://github.com/bolt-design-system/bolt/commit/7abb7e9))
* remove unused and error-causing prepublish script from the new Yeoman generator ([3117bf0](https://github.com/bolt-design-system/bolt/commit/3117bf0))
* remove unzip pkg from Dockerfile ([f041c81](https://github.com/bolt-design-system/bolt/commit/f041c81))
* remove uses of 'imageAttributes', these ones are unnecessary ([b4ceae9](https://github.com/bolt-design-system/bolt/commit/b4ceae9))
* remove verdaccio npm scripts from root till publishing-related tests are added ([7a90461](https://github.com/bolt-design-system/bolt/commit/7a90461))
* removing auth-ed attempt at image loading ([f68548d](https://github.com/bolt-design-system/bolt/commit/f68548d))
* removing old code ([3f6c861](https://github.com/bolt-design-system/bolt/commit/3f6c861))
* replace 'button' references to 'link' in testing instructions ([fb15ddb](https://github.com/bolt-design-system/bolt/commit/fb15ddb))
* replace 'imageAttributes' with 'cover' on careers page demo, does same thing ([32c1733](https://github.com/bolt-design-system/bolt/commit/32c1733))
* Replace index() sass function with map-get() ([#1004](https://github.com/bolt-design-system/bolt/issues/1004)) ([6e9404e](https://github.com/bolt-design-system/bolt/commit/6e9404e))
* replace localhost path in docs ([9be0abd](https://github.com/bolt-design-system/bolt/commit/9be0abd))
* replace missing card image with new one from pega.com ([0fbc791](https://github.com/bolt-design-system/bolt/commit/0fbc791))
* resolve conflicts ([8554cd9](https://github.com/bolt-design-system/bolt/commit/8554cd9))
* resolve conflicts ([d6adc02](https://github.com/bolt-design-system/bolt/commit/d6adc02))
* retest docker build ([1c23b71](https://github.com/bolt-design-system/bolt/commit/1c23b71))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/commit/f4bfa64))
* retest Docker container behavior after updating scale config ([46169ff](https://github.com/bolt-design-system/bolt/commit/46169ff))
* return if src or srcset ([072fef0](https://github.com/bolt-design-system/bolt/commit/072fef0))
* return intval from gcd function, edit comment ([0f98359](https://github.com/bolt-design-system/bolt/commit/0f98359))
* revert commenting out author footer while testing ([8a47235](https://github.com/bolt-design-system/bolt/commit/8a47235))
* revert conditionally loading the check-run library ([d15763f](https://github.com/bolt-design-system/bolt/commit/d15763f))
* revert keep alive config ([42c255f](https://github.com/bolt-design-system/bolt/commit/42c255f))
* revert package.json postinstall hook update ([25511ce](https://github.com/bolt-design-system/bolt/commit/25511ce))
* revert recent update to PR template ([27ff1b2](https://github.com/bolt-design-system/bolt/commit/27ff1b2))
* revert twig-renderer vendor path updates ([28cacb8](https://github.com/bolt-design-system/bolt/commit/28cacb8))
* revert updating action block repository url in package.json ([371ccab](https://github.com/bolt-design-system/bolt/commit/371ccab))
* revert updating element-closest; fixes IE 11 JavaScript issues that pop up if updated to a later version (relating to smooth scroll) ([a4a5e03](https://github.com/bolt-design-system/bolt/commit/a4a5e03))
* safari subpixel issue ([8dfa73c](https://github.com/bolt-design-system/bolt/commit/8dfa73c))
* screenshot mapping ([96662e1](https://github.com/bolt-design-system/bolt/commit/96662e1))
* set correct video Nightwatch test url ([b8ae2fe](https://github.com/bolt-design-system/bolt/commit/b8ae2fe))
* skip 'imageAttributes' in background component if using image pattern ([9dd9f18](https://github.com/bolt-design-system/bolt/commit/9dd9f18))
* skip trying to send VRT screenshots to now.sh if the token that's needed is missing ([a5a9c24](https://github.com/bolt-design-system/bolt/commit/a5a9c24))
* slightly increase the max deploy timeout on travis + auto-retry installing dependencies ([d3c0c11](https://github.com/bolt-design-system/bolt/commit/d3c0c11))
* slightly increase the max VRT difference allowed before failing ([f3c6203](https://github.com/bolt-design-system/bolt/commit/f3c6203))
* snaps ([80a572b](https://github.com/bolt-design-system/bolt/commit/80a572b))
* snaps ([1f83b98](https://github.com/bolt-design-system/bolt/commit/1f83b98))
* stylelint ([8bddb16](https://github.com/bolt-design-system/bolt/commit/8bddb16))
* styles and doc cleanup ([209ed0e](https://github.com/bolt-design-system/bolt/commit/209ed0e))
* swap order of watch vs serve tasks ([a68f465](https://github.com/bolt-design-system/bolt/commit/a68f465))
* syntax ([22a3ead](https://github.com/bolt-design-system/bolt/commit/22a3ead))
* temporarily disable component explorer demo for ratio till further debugged ([a6e47f6](https://github.com/bolt-design-system/bolt/commit/a6e47f6))
* temporarily disable pattern lab data being inlined in the main site head + add fully inlined version to the site's footer template ([2b9d584](https://github.com/bolt-design-system/bolt/commit/2b9d584))
* temporarily disable stylelint plugin till a non-deprecated replacement is added ([cd09832](https://github.com/bolt-design-system/bolt/commit/cd09832))
* test updating the SVG Icon build script to include the build prep task ([8b14814](https://github.com/bolt-design-system/bolt/commit/8b14814))
* test updating Travis build with sauce connect partially disabled ([c4004a0](https://github.com/bolt-design-system/bolt/commit/c4004a0))
* testing instructions ([9ebb721](https://github.com/bolt-design-system/bolt/commit/9ebb721))
* testing working for async PL data not always being available when needed ([56fece6](https://github.com/bolt-design-system/bolt/commit/56fece6))
* troubleshooting PHP SSR build error ([f9dc6dc](https://github.com/bolt-design-system/bolt/commit/f9dc6dc))
* try updating travis config to wait longer before grabbing sauce labs testing results ([b8ffb13](https://github.com/bolt-design-system/bolt/commit/b8ffb13))
* tweak the slotted logo styles to work as expected inside a slot ([27fc1a2](https://github.com/bolt-design-system/bolt/commit/27fc1a2))
* typo ([1216145](https://github.com/bolt-design-system/bolt/commit/1216145))
* typo in testing instructions ([4ba775a](https://github.com/bolt-design-system/bolt/commit/4ba775a))
* update @bolt/build-tools to ensure @bolt/api is a peer dependency ([1c19f90](https://github.com/bolt-design-system/bolt/commit/1c19f90))
* update analytics tracker JS ([8fdda51](https://github.com/bolt-design-system/bolt/commit/8fdda51))
* update autolink tests to ensure every button on Travis CI updates. ([32186a8](https://github.com/bolt-design-system/bolt/commit/32186a8))
* Update background color in bolt-ul list element ([21874e4](https://github.com/bolt-design-system/bolt/commit/21874e4))
* update background component to pass 'cover' prop instead of classname to image, fix lazyloading logic in background ([9bf7b9e](https://github.com/bolt-design-system/bolt/commit/9bf7b9e))
* update Bolt dependencies in Drupal Lab example to the latest versions ([66b8726](https://github.com/bolt-design-system/bolt/commit/66b8726))
* update bolt-version data logic to handle API throttle limits + attempt to use old (stale) data if expired ([f456778](https://github.com/bolt-design-system/bolt/commit/f456778))
* update bolt-version script to address deprecation error ([b1035c4](https://github.com/bolt-design-system/bolt/commit/b1035c4))
* update bolt-versions Github check to use the new octokit API call ([21cf7a4](https://github.com/bolt-design-system/bolt/commit/21cf7a4))
* update broken image path in README.md ([13c8e7a](https://github.com/bolt-design-system/bolt/commit/13c8e7a))
* update broken path import with iframe-resizer library ([e07b687](https://github.com/bolt-design-system/bolt/commit/e07b687))
* update broken placeholder variable name ([80c9902](https://github.com/bolt-design-system/bolt/commit/80c9902))
* update button component test snapshot + trim HTML used to test component rendering properly ([064034e](https://github.com/bolt-design-system/bolt/commit/064034e))
* update button component to support declarative anchor tag updates to URL and target props ([01928a9](https://github.com/bolt-design-system/bolt/commit/01928a9))
* update button Jest tests ([ab57265](https://github.com/bolt-design-system/bolt/commit/ab57265))
* update button SSR text ([d421f08](https://github.com/bolt-design-system/bolt/commit/d421f08))
* update button SSR text to not compile Twig filter + update SSR code block ([6ca47ae](https://github.com/bolt-design-system/bolt/commit/6ca47ae))
* update button tests + snapshots ([9725d0f](https://github.com/bolt-design-system/bolt/commit/9725d0f))
* update card + ratio snapshots ([bdf711c](https://github.com/bolt-design-system/bolt/commit/bdf711c))
* update card test snapshots ([566cb1b](https://github.com/bolt-design-system/bolt/commit/566cb1b))
* update chip list snapshot ([e5a6ba4](https://github.com/bolt-design-system/bolt/commit/e5a6ba4))
* update chip list snapshot ([a546a7c](https://github.com/bolt-design-system/bolt/commit/a546a7c))
* update clean task to not wipe the entire www folder every time ([b8cfb67](https://github.com/bolt-design-system/bolt/commit/b8cfb67))
* update CLI to allow the static site generator and/or Pattern Lab to get run manually (especially for testing purposes) ([7f82175](https://github.com/bolt-design-system/bolt/commit/7f82175))
* update component explorer to use a local PHP server instance on master + localhost ([48983f3](https://github.com/bolt-design-system/bolt/commit/48983f3))
* update custom twig tags to address Twig API changes starting to cause errors in multiple environments ([3e9aaff](https://github.com/bolt-design-system/bolt/commit/3e9aaff))
* update dockerfile config + adjust Jest setup to ensure buildPrep + image task work only have to happen once ([82a4673](https://github.com/bolt-design-system/bolt/commit/82a4673))
* update dockerfile install commands ([32c9aa1](https://github.com/bolt-design-system/bolt/commit/32c9aa1))
* update docs site inner page template to use the new pinned content option with bands ([85fe85e](https://github.com/bolt-design-system/bolt/commit/85fe85e))
* update docs site navbar mobile styling ([75e4caa](https://github.com/bolt-design-system/bolt/commit/75e4caa))
* update Drupal Lab .boltrc config to address error with watching files for changes + auto-reload the local Drupal instance when JS or CSS files change ([6ce81c6](https://github.com/bolt-design-system/bolt/commit/6ce81c6))
* update e2e tests to wait up to 3 seconds while looking for specific selectors before timing out ([dca91fd](https://github.com/bolt-design-system/bolt/commit/dca91fd))
* update event emitter to only fire once ([7e454b5](https://github.com/bolt-design-system/bolt/commit/7e454b5))
* update event emitter to only fire once ([341aabe](https://github.com/bolt-design-system/bolt/commit/341aabe))
* update existing IE11 only css ([89e8d56](https://github.com/bolt-design-system/bolt/commit/89e8d56))
* update failing jest test (based on the current branch name) ([0e05374](https://github.com/bolt-design-system/bolt/commit/0e05374))
* Update globbing for packages in root boltrc file to be recursive ([db61406](https://github.com/bolt-design-system/bolt/commit/db61406))
* Update icons prettier config to that it would be like the main config ([4a9471e](https://github.com/bolt-design-system/bolt/commit/4a9471e))
* update iframe resizer library's import path to prevent build errors ([ef0f213](https://github.com/bolt-design-system/bolt/commit/ef0f213))
* update image JS to keep any initial classes found on image tag, backwards compatibility for 'imageAttributes' ([ea980a6](https://github.com/bolt-design-system/bolt/commit/ea980a6))
* update incorrect text component version + repo url for uikit ([cfa6fde](https://github.com/bolt-design-system/bolt/commit/cfa6fde))
* update install command for Travis ([1a64b4d](https://github.com/bolt-design-system/bolt/commit/1a64b4d))
* update install paths ([048da2e](https://github.com/bolt-design-system/bolt/commit/048da2e))
* update jest screenshot reporting to address missing NOW_TOKEN error thrown when doing local dev testing ([fd156d4](https://github.com/bolt-design-system/bolt/commit/fd156d4))
* update Jest test runner to shut down any still-open servers when spinning up to run new tests ([ecd20e6](https://github.com/bolt-design-system/bolt/commit/ecd20e6))
* update jest tests that are still using async on the top level function ([add1f2f](https://github.com/bolt-design-system/bolt/commit/add1f2f))
* update jest tests to auto-exclude test data files in nested folders + rename autolink test configs to have a `.data.js` file extension used to exclude from Jest ([ad70e08](https://github.com/bolt-design-system/bolt/commit/ad70e08))
* update Jest tests to not use async on top level `describe` ([772fbb1](https://github.com/bolt-design-system/bolt/commit/772fbb1))
* update Jest VRT test reporting to more accurately report back image uploads + URLs for remote debugging ([736a7db](https://github.com/bolt-design-system/bolt/commit/736a7db))
* update layout to fix rendering issue in IE 11 ([2d6da70](https://github.com/bolt-design-system/bolt/commit/2d6da70))
* update lerna exec command to run via npx ([3bb2d0d](https://github.com/bolt-design-system/bolt/commit/3bb2d0d))
* update Lerna logic to include merged tags when deciding changes between merges ([d067b4e](https://github.com/bolt-design-system/bolt/commit/d067b4e))
* update logic to auto-update the page title ([1a0fecc](https://github.com/bolt-design-system/bolt/commit/1a0fecc))
* update logic to make sure Git Sha data matches up with the correct + latest now.sh deployment ([c93c5ab](https://github.com/bolt-design-system/bolt/commit/c93c5ab))
* update max height for uikit dropdown menu + fix JS error when page navigation changes ([740e472](https://github.com/bolt-design-system/bolt/commit/740e472))
* update max timeout for autolinker tests ([b00b45b](https://github.com/bolt-design-system/bolt/commit/b00b45b))
* update max timeout for navbar component VRT tests ([9955610](https://github.com/bolt-design-system/bolt/commit/9955610))
* update named task in Github Checks API ([a798b54](https://github.com/bolt-design-system/bolt/commit/a798b54))
* update nav links to handle the content / icon variations ([d5d0e10](https://github.com/bolt-design-system/bolt/commit/d5d0e10))
* update nav priority CSS to ensure the button size doesn't cause the parent component to grow out of control on larger screen sizes ([b1a1e8a](https://github.com/bolt-design-system/bolt/commit/b1a1e8a))
* update navbar jest VRT tests to all use the same image snapshot config ([1615ffa](https://github.com/bolt-design-system/bolt/commit/1615ffa))
* update navbar padding ([6826060](https://github.com/bolt-design-system/bolt/commit/6826060))
* update Nightwatch handleNightwatchResults function to try and resolve timeout issues ([27cdca6](https://github.com/bolt-design-system/bolt/commit/27cdca6))
* update Nightwatch test for PL search input to end early in IE 11 ([5969a43](https://github.com/bolt-design-system/bolt/commit/5969a43))
* update nightwatch tests ([eb31464](https://github.com/bolt-design-system/bolt/commit/eb31464))
* update nightwatch.js to try re-running failing tests up to 3 times ([77d01f9](https://github.com/bolt-design-system/bolt/commit/77d01f9))
* update now.sh utils to change how the NOW_TOKEN gets added ([82c531a](https://github.com/bolt-design-system/bolt/commit/82c531a))
* update npm scripts to not use postinstall automatically; add postinstall to root of the repo instead ([5dc3496](https://github.com/bolt-design-system/bolt/commit/5dc3496))
* update package.json path to fix grid CSS ([e999b33](https://github.com/bolt-design-system/bolt/commit/e999b33))
* update path to post-build script run by Travis ([ea5ae77](https://github.com/bolt-design-system/bolt/commit/ea5ae77))
* update Pattern Lab overview page + docs site homepage templates ([bd06d5f](https://github.com/bolt-design-system/bolt/commit/bd06d5f))
* update pattern lab test to match current pl page title ([24a31de](https://github.com/bolt-design-system/bolt/commit/24a31de))
* update pattern lab to fix header / layout issue in IE 11 ([4a5aba3](https://github.com/bolt-design-system/bolt/commit/4a5aba3))
* update PHP install task in Docker container ([47fb5e0](https://github.com/bolt-design-system/bolt/commit/47fb5e0))
* update PHP SSR logic ([854b716](https://github.com/bolt-design-system/bolt/commit/854b716))
* update Ratio component Jest tests to ensure ratio component rendered as expected before doing any visual regression tests ([965ba4d](https://github.com/bolt-design-system/bolt/commit/965ba4d))
* update ratio component snapshot ([1ce9804](https://github.com/bolt-design-system/bolt/commit/1ce9804))
* update ratio test + update navbar snapshots ([6a4a586](https://github.com/bolt-design-system/bolt/commit/6a4a586))
* update ratio VRT config precision ([b3e6210](https://github.com/bolt-design-system/bolt/commit/b3e6210))
* update read-only repo logic to always sync tag of latest release ([d2f1f2a](https://github.com/bolt-design-system/bolt/commit/d2f1f2a))
* update read-only repo logic to always sync tag of latest release ([184737c](https://github.com/bolt-design-system/bolt/commit/184737c))
* update release logic to grab consistent git tag version ([1622d24](https://github.com/bolt-design-system/bolt/commit/1622d24))
* update remaining band components not yet switched over to use the full [@bolt-components-band](https://github.com/bolt-components-band) twig namespace ([dd8fca4](https://github.com/bolt-design-system/bolt/commit/dd8fca4))
* update remaining docs site templates as workaround to Twig embeds failing to compile ([39c0675](https://github.com/bolt-design-system/bolt/commit/39c0675))
* update selector for image zoom to work when images are rendered to shadow DOM ([ea4f28b](https://github.com/bolt-design-system/bolt/commit/ea4f28b))
* update setCheckRun check ([b96897a](https://github.com/bolt-design-system/bolt/commit/b96897a))
* update so certain PL assets are prefetched vs preloaded ([904ae87](https://github.com/bolt-design-system/bolt/commit/904ae87))
* update SSR function to support older Symfony Process version ([f84f10a](https://github.com/bolt-design-system/bolt/commit/f84f10a))
* Update styling for UL's for IE and Edge ([5aa23d5](https://github.com/bolt-design-system/bolt/commit/5aa23d5))
* update task name ([59310ba](https://github.com/bolt-design-system/bolt/commit/59310ba))
* update testing server to host file assets added to the www dir ([6366dfe](https://github.com/bolt-design-system/bolt/commit/6366dfe))
* update tests ([11734e3](https://github.com/bolt-design-system/bolt/commit/11734e3))
* update tests to address Prettier issues ([1a5a579](https://github.com/bolt-design-system/bolt/commit/1a5a579))
* update tests to stop Twig renderer service when complete ([a7bafbb](https://github.com/bolt-design-system/bolt/commit/a7bafbb))
* update text component demo to use updated schema props from 8 months ago ([7b6b20e](https://github.com/bolt-design-system/bolt/commit/7b6b20e))
* update the URL used by Nightwatch.js to confirm SSR is working as expected ([1c74627](https://github.com/bolt-design-system/bolt/commit/1c74627))
* update to automatically run generated files through Prettier automatically to prevent any linting issues ([ae0b32c](https://github.com/bolt-design-system/bolt/commit/ae0b32c))
* update to only wait to retry requests that are within 15 seconds before calling it quits and using the fallback ([1875bea](https://github.com/bolt-design-system/bolt/commit/1875bea))
* update Travis CI timeout ([b98d5f5](https://github.com/bolt-design-system/bolt/commit/b98d5f5))
* update travis config ([99bc204](https://github.com/bolt-design-system/bolt/commit/99bc204))
* update Travis script for handling read only git repo updates ([0a7233f](https://github.com/bolt-design-system/bolt/commit/0a7233f))
* update Travis sleep command to wait for 60s ([c2873be](https://github.com/bolt-design-system/bolt/commit/c2873be))
* update Travis so builds automatically clear the cached version data so the site dropdown versions always display correctly ([1c37c0a](https://github.com/bolt-design-system/bolt/commit/1c37c0a))
* update Travis task order ([3366905](https://github.com/bolt-design-system/bolt/commit/3366905))
* update Twig header / footer for docs site to still work when lang is set to a string, an array with a single value, and an array with multiple values ([53e7411](https://github.com/bolt-design-system/bolt/commit/53e7411))
* update Twig rendering service API when running on master + add / update caching layers to speed up subsequent builds on Travis ([a8ed82f](https://github.com/bolt-design-system/bolt/commit/a8ed82f))
* disable meta flag on now.sh deploy ([a759fae](https://github.com/bolt-design-system/bolt/commit/a759fae))
* moving additional icon for test to folder outside the component root ([95caa3f](https://github.com/bolt-design-system/bolt/commit/95caa3f))
* re-test docker deploy with logging + added meta gitSha info ([0968e51](https://github.com/bolt-design-system/bolt/commit/0968e51))
* update release script to not force push to github ([17ed976](https://github.com/bolt-design-system/bolt/commit/17ed976))
* **@bolt/build-tools:** fix for filing test on first run ([226e96e](https://github.com/bolt-design-system/bolt/commit/226e96e))
* **@bolt/build-tools:** fix js issues ([c501be3](https://github.com/bolt-design-system/bolt/commit/c501be3))
* **@bolt/build-tools:** updateting configutration for testing ([f3333b7](https://github.com/bolt-design-system/bolt/commit/f3333b7))
* **@bolt/build-tools,@bolt/components-icons:** move clean icon task to be run after all the tests ([863f91d](https://github.com/bolt-design-system/bolt/commit/863f91d))
* **@bolt/components-video:** cHange test logic ([75f14ad](https://github.com/bolt-design-system/bolt/commit/75f14ad))
* **@bolt/components-video:** fix for IE11 testing ([3ea81a6](https://github.com/bolt-design-system/bolt/commit/3ea81a6))
* **Add support for attributes for bolt-ol and bolt-ul:** add support for attributes for bolt-ol and ([a41aa78](https://github.com/bolt-design-system/bolt/commit/a41aa78))
* **core-php:** moving phpunit from dep to devDep ([2d73ebc](https://github.com/bolt-design-system/bolt/commit/2d73ebc))
* **Update external class names to be complaint with BEM metodology:** update external class names to ([6dc82b3](https://github.com/bolt-design-system/bolt/commit/6dc82b3))
* update typo ([abe44ba](https://github.com/bolt-design-system/bolt/commit/abe44ba))
* update Webpack build and server config to better account for situations where lang can be defined as a string, an array with one item, and an array with multiple items ([bbeee23](https://github.com/bolt-design-system/bolt/commit/bbeee23))
* use 'src' not 'placeholderSrc' in placeholder noscript image ([20c8661](https://github.com/bolt-design-system/bolt/commit/20c8661))
* use gcd instead of conditionally dividing each by 100 ([47a8d40](https://github.com/bolt-design-system/bolt/commit/47a8d40))
* version bump / cleanup from v2.3.0 release ([32ec7d9](https://github.com/bolt-design-system/bolt/commit/32ec7d9))
* version bump now.sh ([269389d](https://github.com/bolt-design-system/bolt/commit/269389d))
* wait till promise resolves ([28f053f](https://github.com/bolt-design-system/bolt/commit/28f053f))
* workaround to fix major Twig errors being encountered when the docs site is trying to be compiled (removing Twig embeds and sticking to Twig includes and extends seems to do the trick) ([f3533f6](https://github.com/bolt-design-system/bolt/commit/f3533f6))
* wrong build id being passed ([fdc129b](https://github.com/bolt-design-system/bolt/commit/fdc129b))
* yarn install required packages in travis build ([a0dadb0](https://github.com/bolt-design-system/bolt/commit/a0dadb0))


### Features

* add 'gcd' twig function ([e249317](https://github.com/bolt-design-system/bolt/commit/e249317))
* add 'shallow' argument to convertInitialTags ([5eb8a29](https://github.com/bolt-design-system/bolt/commit/5eb8a29))
* add ability to render Twig template strings in the Twig rendering service API ([5cf4b5b](https://github.com/bolt-design-system/bolt/commit/5cf4b5b))
* add case-helper library, not yet loading (WIP) ([41c3227](https://github.com/bolt-design-system/bolt/commit/41c3227))
* add commitizen + commit lint support + wire up to husky commit hooks ([67905fe](https://github.com/bolt-design-system/bolt/commit/67905fe))
* add comprehensive testing coverage to confirm config options + integrations working as expected ([103f37a](https://github.com/bolt-design-system/bolt/commit/103f37a))
* add demo pattern ([a977817](https://github.com/bolt-design-system/bolt/commit/a977817))
* add demo video assets for testing ratio component behavior ([ef366fe](https://github.com/bolt-design-system/bolt/commit/ef366fe))
* add docs site search powered by Algolia ([013df79](https://github.com/bolt-design-system/bolt/commit/013df79))
* add GA autotrack support ([1d7edb2](https://github.com/bolt-design-system/bolt/commit/1d7edb2))
* add GA Javascript to main Bolt docs site head ([931cf74](https://github.com/bolt-design-system/bolt/commit/931cf74))
* add get-latest-deploy script ([1817107](https://github.com/bolt-design-system/bolt/commit/1817107))
* add helper 'containsTagName' ([941e596](https://github.com/bolt-design-system/bolt/commit/941e596))
* add helper functions for converting case type ([5294f0f](https://github.com/bolt-design-system/bolt/commit/5294f0f))
* add initial `@bolt/analytics-autolink` implementation ([d05bc98](https://github.com/bolt-design-system/bolt/commit/d05bc98))
* add initial jest test for the ratio component's twig rendering ([754dfd7](https://github.com/bolt-design-system/bolt/commit/754dfd7))
* add initial set of navbar tests, including visual regression testing coverage, responsive behavior across multiple screen sizes, and tests for interaction (open and close navigation + linkable titles) ([67406c9](https://github.com/bolt-design-system/bolt/commit/67406c9))
* add initialize_props function, util setProp function, names to schema elements ([18a3cd1](https://github.com/bolt-design-system/bolt/commit/18a3cd1))
* add logic to convert snake or camel to kebab case ([9f3f5ff](https://github.com/bolt-design-system/bolt/commit/9f3f5ff))
* add max-width util ([b44eede](https://github.com/bolt-design-system/bolt/commit/b44eede))
* add merge_attributes() function to TwigFunctions, make available in twig templates. ([e352a3d](https://github.com/bolt-design-system/bolt/commit/e352a3d))
* add missing features to web component implementation of blockquote ([149695f](https://github.com/bolt-design-system/bolt/commit/149695f))
* add moveChildrenToRoot option to decorator ([7a218d7](https://github.com/bolt-design-system/bolt/commit/7a218d7))
* add new api-specific build tasks that handle generating the status board, generate visual regression testing URLs, and can find all available versions of the Bolt packages published to NPM ([9cdc962](https://github.com/bolt-design-system/bolt/commit/9cdc962))
* add new placeholder image, use in personalized card demo ([e542029](https://github.com/bolt-design-system/bolt/commit/e542029))
* add new rendering mode config + expose globally ([4636d67](https://github.com/bolt-design-system/bolt/commit/4636d67))
* add new webpack dev server setup for quickly testing components using JIT (just in time) compiling ([cd1ce4e](https://github.com/bolt-design-system/bolt/commit/cd1ce4e))
* add pattern aliases to the background shape and button group packages ([7d71ed9](https://github.com/bolt-design-system/bolt/commit/7d71ed9))
* add persistent caching to twig namespace path discovery. ([d318e9e](https://github.com/bolt-design-system/bolt/commit/d318e9e))
* add POC button component example wired up to use the new ssr filter ([4c51647](https://github.com/bolt-design-system/bolt/commit/4c51647))
* add polyfill for string.includes ([772b19c](https://github.com/bolt-design-system/bolt/commit/772b19c))
* add README.md docs for installing and implementing ([78b5f37](https://github.com/bolt-design-system/bolt/commit/78b5f37))
* add simple image screenshot test reporting functionality to Jest to assist with debugging VRT issues until full Github integration is wired up ([843aeb0](https://github.com/bolt-design-system/bolt/commit/843aeb0))
* add slotted styles, remove attribute selectors ([b82338b](https://github.com/bolt-design-system/bolt/commit/b82338b))
* add support for 'attributes', remove 'attributes' from ratio include ([6878f1d](https://github.com/bolt-design-system/bolt/commit/6878f1d))
* add support for 'cover' prop ([a4c49a9](https://github.com/bolt-design-system/bolt/commit/a4c49a9))
* add support for an optional "pattern -alias" config to help match up oddly named folders in PL with a component's default package.json file name. ([f11db1a](https://github.com/bolt-design-system/bolt/commit/f11db1a))
* add support for content and author to blockquote web component ([0a4f9d9](https://github.com/bolt-design-system/bolt/commit/0a4f9d9))
* add support for quotes with and without <p> ([8c2de4f](https://github.com/bolt-design-system/bolt/commit/8c2de4f))
* add testing support for variable width navbars + add visual regression testing screenshots ([00ef7ff](https://github.com/bolt-design-system/bolt/commit/00ef7ff))
* add tests for responsive <bolt-navbar> width in a variable width grid cell ([d3066cc](https://github.com/bolt-design-system/bolt/commit/d3066cc))
* add the initial verdaccio config + setup work for upcoming release testing work ([6ba3dd8](https://github.com/bolt-design-system/bolt/commit/6ba3dd8))
* add timeout to workaround lazyload render race condition, wip ([71796b0](https://github.com/bolt-design-system/bolt/commit/71796b0))
* add visual regression testing to Jest + add jest-dom as a new tool to help evaluate the state of the DOM inside components being tested ([aee3f0d](https://github.com/bolt-design-system/bolt/commit/aee3f0d))
* add web component SSR + Twig Nightwatch.js test ([6def3e7](https://github.com/bolt-design-system/bolt/commit/6def3e7))
* add web component support to blockquote ([a1bb776](https://github.com/bolt-design-system/bolt/commit/a1bb776))
* add WIP autotrack JS logic ([ebe7128](https://github.com/bolt-design-system/bolt/commit/ebe7128))
* addd ability to manually enable / disable server-side rendering + automatically toggle based on dev environment ([861a14e](https://github.com/bolt-design-system/bolt/commit/861a14e))
* Adds manual testing steps for bolt-button on PatternLab in an approximation of Gherkin format ([7ce733a](https://github.com/bolt-design-system/bolt/commit/7ce733a))
* automatically boot up webpack dev server to remove the need to compile Pattern Lab before running any Jest tests ([8d910b0](https://github.com/bolt-design-system/bolt/commit/8d910b0))
* automatically re-render + re-evaluate slots and classes added when child node mutations are observed ([10f1ec7](https://github.com/bolt-design-system/bolt/commit/10f1ec7))
* automatically switch between a simple static now.sh deployment vs a full docker-based deployment based on the branch ([7d56566](https://github.com/bolt-design-system/bolt/commit/7d56566))
* begin to convert image to web component, wip ([7cd8a33](https://github.com/bolt-design-system/bolt/commit/7cd8a33))
* change ratio prop to use slash-separated values ([0b739b1](https://github.com/bolt-design-system/bolt/commit/0b739b1))
* clean up nav UI to make it easier to see which links have two actions vs only one ([6325574](https://github.com/bolt-design-system/bolt/commit/6325574))
* convert schema data to camelCase before calling validate ([f7e9e93](https://github.com/bolt-design-system/bolt/commit/f7e9e93))
* create report nightwatch results script ([f1a8d6a](https://github.com/bolt-design-system/bolt/commit/f1a8d6a))
* deprecate 'useAspectRatio', 'width', and 'height'; update instances to use 'ratio' ([5a4b34a](https://github.com/bolt-design-system/bolt/commit/5a4b34a))
* Differentiate between developer testing and functional testing ([eaaa3ca](https://github.com/bolt-design-system/bolt/commit/eaaa3ca))
* do not set unnecessary props on twig generated blockquotes ([a9b2bbe](https://github.com/bolt-design-system/bolt/commit/a9b2bbe))
* extend 'initialize_props()' to return array with default props in snake_case ([29730c2](https://github.com/bolt-design-system/bolt/commit/29730c2))
* first round of ratio component jest tests ([c17a6b2](https://github.com/bolt-design-system/bolt/commit/c17a6b2))
* force icons to be visible at smaller layout sizes ([22f199a](https://github.com/bolt-design-system/bolt/commit/22f199a))
* fully support "ratio" prop in image Twig template ([f1b2e6c](https://github.com/bolt-design-system/bolt/commit/f1b2e6c))
* Generating a JSON file in www/build/data/ directory for Drupal team ([a36c5f2](https://github.com/bolt-design-system/bolt/commit/a36c5f2))
* Give posibility to generate schema for new added icons ([577d9f3](https://github.com/bolt-design-system/bolt/commit/577d9f3))
* import missing styles needed for twig templates ([8603947](https://github.com/bolt-design-system/bolt/commit/8603947))
* initial nightwatch.js refactor work; adding support for split tests + different local and remote testing setups in the package.json file ([a8cf89f](https://github.com/bolt-design-system/bolt/commit/a8cf89f))
* move cache set to within try block. ([fa88ef7](https://github.com/bolt-design-system/bolt/commit/fa88ef7))
* pass placeholder values, ratio data via web component props ([ad560ad](https://github.com/bolt-design-system/bolt/commit/ad560ad))
* pass validated size prop ([28131f0](https://github.com/bolt-design-system/bolt/commit/28131f0))
* patch Pattern Lab PHP to include a new --data-only CLI config option to export the global PL data available (ex. nav URLs) without having to do a full PL build ([51cd6e9](https://github.com/bolt-design-system/bolt/commit/51cd6e9))
* port over + upgrade yeoman generator for consistently and easily spinning up new Bolt components + auto updating the related config files ([b93426c](https://github.com/bolt-design-system/bolt/commit/b93426c))
* remove 'content' prop from blockquote web component, use validateProps method on base class ([93bad4b](https://github.com/bolt-design-system/bolt/commit/93bad4b))
* remove 'name' from schema props ([f89aee4](https://github.com/bolt-design-system/bolt/commit/f89aee4))
* remove bolt-image children on connect ([57df829](https://github.com/bolt-design-system/bolt/commit/57df829))
* remove height and width props from image web component ([ba7dfd6](https://github.com/bolt-design-system/bolt/commit/ba7dfd6))
* remove merge_attributes function ([1f70798](https://github.com/bolt-design-system/bolt/commit/1f70798))
* remove twig blocks completely ([089cd05](https://github.com/bolt-design-system/bolt/commit/089cd05))
* rename noUseAspectRatio to no_ratio, update logic ([9b7191b](https://github.com/bolt-design-system/bolt/commit/9b7191b))
* render image template every time, do not keep initial HTML ([101e177](https://github.com/bolt-design-system/bolt/commit/101e177))
* reorganizing dev-specific docs site files + adding docs on server-side rendering ([2c2b58c](https://github.com/bolt-design-system/bolt/commit/2c2b58c))
* rework 'initialize_props' into 'initialize' which returns both props and data ([1e559de](https://github.com/bolt-design-system/bolt/commit/1e559de))
* rework buildArrayProps function, only check top-level schema props, auto-convert name to kebab (WIP) ([013c527](https://github.com/bolt-design-system/bolt/commit/013c527))
* rework merge_attributes function into initialize_props which uses _context and returns array of allowed props ([dc0ee4e](https://github.com/bolt-design-system/bolt/commit/dc0ee4e))
* setup execAndReport ([6c82792](https://github.com/bolt-design-system/bolt/commit/6c82792))
* setup unit test report; consolidating travis jobs ([aef6ab3](https://github.com/bolt-design-system/bolt/commit/aef6ab3))
* show image fallback if lazyload is true ([5e3c3bd](https://github.com/bolt-design-system/bolt/commit/5e3c3bd))
* Simplifies and conslidates functinal testing steps using tables ([875f76b](https://github.com/bolt-design-system/bolt/commit/875f76b))
* skip ratio if 'cover' attribute is true ([d03a9c7](https://github.com/bolt-design-system/bolt/commit/d03a9c7))
* temporarily set lazyload to false, does not work yet in shadow dom ([7e4e788](https://github.com/bolt-design-system/bolt/commit/7e4e788))
* testing lazySizes options, commented out ([5467c4d](https://github.com/bolt-design-system/bolt/commit/5467c4d))
* update Bolt build config to add support for extending / modifying the default Webpack config generated ([b283134](https://github.com/bolt-design-system/bolt/commit/b283134))
* update Drupal Lab template to use the Navbar component ([5cabdd1](https://github.com/bolt-design-system/bolt/commit/5cabdd1))
* update form component to allow the form input icon size to be optionally adjusted in size ([da0b42a](https://github.com/bolt-design-system/bolt/commit/da0b42a))
* update gcd twig function with type check ([fa6d8c9](https://github.com/bolt-design-system/bolt/commit/fa6d8c9))
* update image JS to match latest component patterns, testing basic use cases, WIP ([5327f3d](https://github.com/bolt-design-system/bolt/commit/5327f3d))
* update image schema with noLazyload for web component ([31fb142](https://github.com/bolt-design-system/bolt/commit/31fb142))
* update Jest to automatically transpile ES6 code (via Babel) to allow component tests to use modern JS libraries ([72be039](https://github.com/bolt-design-system/bolt/commit/72be039))
* update lerna + add new release-specific and release candidate-specific bash scripts ([fef0b78](https://github.com/bolt-design-system/bolt/commit/fef0b78))
* update navbar template used on docs site global header + update .boltrc config ([7e0b5fa](https://github.com/bolt-design-system/bolt/commit/7e0b5fa))
* update next branch name checked when doing a lerna deployment + add new beta release script ([3739309](https://github.com/bolt-design-system/bolt/commit/3739309))
* update placeholder logic to include 'cover' ([0da2c6e](https://github.com/bolt-design-system/bolt/commit/0da2c6e))
* run nightwatch tests on local ([51829f0](https://github.com/bolt-design-system/bolt/commit/51829f0))
* **@bolt/components-icons:** cleaning code ([28d2e00](https://github.com/bolt-design-system/bolt/commit/28d2e00))
* **@bolt/components-icons:** cleaning files after test are done ([478ba17](https://github.com/bolt-design-system/bolt/commit/478ba17))
* **@bolt/website,@bolt/build-tools:** add posibility to add external icons to be rendered by icon t ([89a7061](https://github.com/bolt-design-system/bolt/commit/89a7061))
* **@bolt/website,@bolt/build-tools,@bolt/components-icons:** updating configuration and fix issue w ([82a5686](https://github.com/bolt-design-system/bolt/commit/82a5686))
* **@bolt/website,@bolt/components-chip:** create web component for bolt-chip component ([6d1ae09](https://github.com/bolt-design-system/bolt/commit/6d1ae09))
* **@bolt/website,@bolt/components-chip-list:** update documentation and change to bolt-list is used ([e7185a8](https://github.com/bolt-design-system/bolt/commit/e7185a8))
* **@bolt/website,@bolt/components-chip,@bolt/core:** fixing all issue pointed by Mike and move vali ([51a4142](https://github.com/bolt-design-system/bolt/commit/51a4142))
* **Add some test and spanshots:** add some JEST test ([bcf8a8a](https://github.com/bolt-design-system/bolt/commit/bcf8a8a))
* update ratio component tests to check for css var and shadow dom variations ([eea7f71](https://github.com/bolt-design-system/bolt/commit/eea7f71))
* upgrade Jest to automatically polyfill the testing environment in order to use helper libraries for testing web components ([3eb8345](https://github.com/bolt-design-system/bolt/commit/3eb8345))
* wire up button component to include VRT, web component tests, update Twig renderer calls to compile even faster ([4b34184](https://github.com/bolt-design-system/bolt/commit/4b34184))
* **Add testing readme files:** add testing readme files ([a8a10c0](https://github.com/bolt-design-system/bolt/commit/a8a10c0)), closes [#948](https://github.com/bolt-design-system/bolt/issues/948) [#949](https://github.com/bolt-design-system/bolt/issues/949)
* **Adding test and documentation to bolt-ol and bolt-ul component:** adding test and documentation ([f75206b](https://github.com/bolt-design-system/bolt/commit/f75206b))
* **website, twig renderer, component explorer:** update the Twig Renderer to support keepAlive ([470f7af](https://github.com/bolt-design-system/bolt/commit/470f7af))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/commit/752c0df))
* wire up ssr-server POC for handling SSR requests ([5c24e5a](https://github.com/bolt-design-system/bolt/commit/5c24e5a))





# [0.0.0-development](https://github.com/bolt-design-system/bolt/compare/v2.3.0...v0.0.0-development) (2019-04-03)


### Bug Fixes

* 'ratio' prop conflicts with prop set from background template, update name in background template ([fc6d598](https://github.com/bolt-design-system/bolt/commit/fc6d598))
* add --detectOpenHandles to troubleshoot tests not completing when Jest expects them to ([3196d3e](https://github.com/bolt-design-system/bolt/commit/3196d3e))
* add 'is_ssr' flag to noscript, wait until SSR is in place before using ([2049a70](https://github.com/bolt-design-system/bolt/commit/2049a70))
* Add 'spaceless' around typography template, otherwise outputs extra whitespace causing issues in blockquote ([3817443](https://github.com/bolt-design-system/bolt/commit/3817443))
* add backwards compatibility for 'ratio' prop as boolean ([25c3c90](https://github.com/bolt-design-system/bolt/commit/25c3c90))
* add fetch require back in ([efa10b4](https://github.com/bolt-design-system/bolt/commit/efa10b4))
* add missing dependencies to deploy-specific package.json ([e360f9f](https://github.com/bolt-design-system/bolt/commit/e360f9f))
* add missing dependency to prevent install warnings ([c9231cd](https://github.com/bolt-design-system/bolt/commit/c9231cd))
* add missing dependency to twig renderer ([20778d0](https://github.com/bolt-design-system/bolt/commit/20778d0))
* add missing lodash dep ([2e84680](https://github.com/bolt-design-system/bolt/commit/2e84680))
* add missing navbar-related dependencies to the <bolt-navbar> component ([c612909](https://github.com/bolt-design-system/bolt/commit/c612909))
* add missing polyfiills needed for IE 11 ([0cac28f](https://github.com/bolt-design-system/bolt/commit/0cac28f))
* add missing publicConfig to new @bolt/api package ([cd475d2](https://github.com/bolt-design-system/bolt/commit/cd475d2))
* add missing scripts folder deps ([1674a9c](https://github.com/bolt-design-system/bolt/commit/1674a9c))
* add missing slots to icons in <bolt-button> SSR demos ([115745d](https://github.com/bolt-design-system/bolt/commit/115745d))
* add missing token + adjust deploy command ([e2e1fb7](https://github.com/bolt-design-system/bolt/commit/e2e1fb7))
* add missing TRAVIS_TAG env var ([403647e](https://github.com/bolt-design-system/bolt/commit/403647e))
* add missing webpack-merge dependency to the build tools package ([889f0fd](https://github.com/bolt-design-system/bolt/commit/889f0fd))
* add new line to .dockerignore ([e7ee5e7](https://github.com/bolt-design-system/bolt/commit/e7ee5e7))
* add node env ([95fef85](https://github.com/bolt-design-system/bolt/commit/95fef85))
* add now.sh token ([887ac3c](https://github.com/bolt-design-system/bolt/commit/887ac3c))
* Add padding to right sidebar in docs to create symmetry ([56d8656](https://github.com/bolt-design-system/bolt/commit/56d8656))
* add prettier config to vue example + update README ([5be97eb](https://github.com/bolt-design-system/bolt/commit/5be97eb))
* add renderer mode config default ([1201419](https://github.com/bolt-design-system/bolt/commit/1201419))
* Add support for attributes passed in as an object ([b2baa67](https://github.com/bolt-design-system/bolt/commit/b2baa67))
* add testing instructions ([2ec5ce3](https://github.com/bolt-design-system/bolt/commit/2ec5ce3))
* add timeout to async afterAll in Jest tests ([cf335ce](https://github.com/bolt-design-system/bolt/commit/cf335ce))
* add update autolink click tests to make sure we're waiting for the new page to finish loading before continuing to run checks. https://checklyhq.com/docs/browser-checks/timeouts/#page-waitfornavigation ([f3f5059](https://github.com/bolt-design-system/bolt/commit/f3f5059))
* adding important ([4434ad4](https://github.com/bolt-design-system/bolt/commit/4434ad4))
* address prettier issues ([492c158](https://github.com/bolt-design-system/bolt/commit/492c158))
* adjust breakpoint for hiding viewport resizer controls ([2b792bd](https://github.com/bolt-design-system/bolt/commit/2b792bd))
* adjust button VRT failure threshold ([34b62f7](https://github.com/bolt-design-system/bolt/commit/34b62f7))
* adjust default link line height + icon and text spacing ([806814f](https://github.com/bolt-design-system/bolt/commit/806814f))
* adjust quick PHP setup task ([4b8ff1f](https://github.com/bolt-design-system/bolt/commit/4b8ff1f))
* adjust ratio VRT failure threshold ([f5d08a1](https://github.com/bolt-design-system/bolt/commit/f5d08a1))
* attempt removal of extraneous call to SauceLabs ([28b31ed](https://github.com/bolt-design-system/bolt/commit/28b31ed))
* authing SauceLabs assets for GitHub Checks download ([a479dd4](https://github.com/bolt-design-system/bolt/commit/a479dd4))
* auto-ignore any yeoman generator files used to create tests ([60b6f16](https://github.com/bolt-design-system/bolt/commit/60b6f16))
* auto-remove the wwwDir folder before running any Jest tests ([2496ceb](https://github.com/bolt-design-system/bolt/commit/2496ceb))
* automatically retry fetch requests if / when a 500 error occurs. ([98fa9c9](https://github.com/bolt-design-system/bolt/commit/98fa9c9))
* border classname on blockquote ([84b1371](https://github.com/bolt-design-system/bolt/commit/84b1371))
* broken js ([abb4007](https://github.com/bolt-design-system/bolt/commit/abb4007))
* button border-radius default ([e3ffd92](https://github.com/bolt-design-system/bolt/commit/e3ffd92))
* button border-radius default ([299ebba](https://github.com/bolt-design-system/bolt/commit/299ebba))
* button class logics ([587f56f](https://github.com/bolt-design-system/bolt/commit/587f56f))
* button focus ([0e263b4](https://github.com/bolt-design-system/bolt/commit/0e263b4))
* bypass cache when doing a full tagged release + fix deploy script to not update the main docs site url when doing pre-releases ([9faa0f4](https://github.com/bolt-design-system/bolt/commit/9faa0f4))
* change get-latest-deploy from bash to node.js ([30da611](https://github.com/bolt-design-system/bolt/commit/30da611))
* change setup:php to run composer *install* not update, we will update manually ([0d27fe5](https://github.com/bolt-design-system/bolt/commit/0d27fe5))
* check for not 'cover' rather than sameas ([0be7f5d](https://github.com/bolt-design-system/bolt/commit/0be7f5d))
* check if component was initially rendered before removing children, IE runs twice on background component and empties the rendered HTML ([4006913](https://github.com/bolt-design-system/bolt/commit/4006913))
* checking image urls to see if valid ([a7de0a8](https://github.com/bolt-design-system/bolt/commit/a7de0a8))
* clarify gutter prop and its related demos ([7ec76be](https://github.com/bolt-design-system/bolt/commit/7ec76be))
* clean ([5bce04e](https://github.com/bolt-design-system/bolt/commit/5bce04e))
* clean up reporting to github app ([ab56b9e](https://github.com/bolt-design-system/bolt/commit/ab56b9e))
* code and organization cleanup ([5c5764d](https://github.com/bolt-design-system/bolt/commit/5c5764d))
* code cleanup ([a344b8b](https://github.com/bolt-design-system/bolt/commit/a344b8b))
* complete => completed ([8394eee](https://github.com/bolt-design-system/bolt/commit/8394eee))
* consistent copy ([8a4dfc7](https://github.com/bolt-design-system/bolt/commit/8a4dfc7))
* convert cases to our standards ([dce4b1d](https://github.com/bolt-design-system/bolt/commit/dce4b1d))
* copy edits ([76cc46a](https://github.com/bolt-design-system/bolt/commit/76cc46a))
* copy updates ([ff41fa4](https://github.com/bolt-design-system/bolt/commit/ff41fa4))
* disable band transition inline on component overview page in PL ([0456c91](https://github.com/bolt-design-system/bolt/commit/0456c91))
* disable browsersync ghost syncing as a workaround to ensure local Nightwatch.js browser tests don't have clicks / interactions triggered by other browsers. ([ec55a2d](https://github.com/bolt-design-system/bolt/commit/ec55a2d))
* disable console log output with UIKit regeneration ([0f2e2b6](https://github.com/bolt-design-system/bolt/commit/0f2e2b6))
* disable inactive text + icon variation PL demo so they don't show up in the menu ([96a1ac5](https://github.com/bolt-design-system/bolt/commit/96a1ac5))
* display the correct test number in the screenshot results panel ([1b79827](https://github.com/bolt-design-system/bolt/commit/1b79827))
* Display UL items in edge ([d9d9f66](https://github.com/bolt-design-system/bolt/commit/d9d9f66))
* doc conflicts ([dadc396](https://github.com/bolt-design-system/bolt/commit/dadc396))
* docs and schema ([ca10596](https://github.com/bolt-design-system/bolt/commit/ca10596))
* docs site-specific layout updates to address display / responsive behavior issues ([cae9b00](https://github.com/bolt-design-system/bolt/commit/cae9b00))
* Don't allow an unspecified type to be considered valid ([83c2444](https://github.com/bolt-design-system/bolt/commit/83c2444))
* don't include empty screenshots in the Github Checks API results ([e0fc5e6](https://github.com/bolt-design-system/bolt/commit/e0fc5e6))
* don't remove the docs site when setting up the code for Travis builds ([4140d12](https://github.com/bolt-design-system/bolt/commit/4140d12))
* don't report on screenshot VRT results if none have failed ([7acb808](https://github.com/bolt-design-system/bolt/commit/7acb808))
* enable prod mode + disable sourcemaps to improve loading performance ([7dd8a15](https://github.com/bolt-design-system/bolt/commit/7dd8a15))
* ensure all default Sass spacing scale config can be overwritten (ex. lang-specific spacing options like we have with Japanese) ([6c8e59d](https://github.com/bolt-design-system/bolt/commit/6c8e59d))
* ensure code viewer works consistently when async loading modal-viewer JS; fix width of code displaying in drawer ([bbb9f95](https://github.com/bolt-design-system/bolt/commit/bbb9f95))
* ensure every autolink test has a high enough timeout ([ea83ca0](https://github.com/bolt-design-system/bolt/commit/ea83ca0))
* ensure vanilla <code> elements can scroll horizontally and/or vertically if needed ([9500afc](https://github.com/bolt-design-system/bolt/commit/9500afc))
* fix bolt-list prettier issue ([b0c0c00](https://github.com/bolt-design-system/bolt/commit/b0c0c00))
* fix for the PL nav incorrectly auto-closing in certain situations ([9ff9fc8](https://github.com/bolt-design-system/bolt/commit/9ff9fc8))
* fix issues with nav opening / closing when expected based on screen size + layout mode ([e4d2750](https://github.com/bolt-design-system/bolt/commit/e4d2750))
* fix lint / prettier issues ([aefbf12](https://github.com/bolt-design-system/bolt/commit/aefbf12))
* Fix path issue ([a760987](https://github.com/bolt-design-system/bolt/commit/a760987))
* fix prettier errors ([f55babd](https://github.com/bolt-design-system/bolt/commit/f55babd))
* fix prettier issuers ([50d223e](https://github.com/bolt-design-system/bolt/commit/50d223e))
* Fix prettier issues ([dde96dd](https://github.com/bolt-design-system/bolt/commit/dde96dd))
* fix schema in ol test ([0a92686](https://github.com/bolt-design-system/bolt/commit/0a92686))
* fix task collection event sequence ([eaed5ce](https://github.com/bolt-design-system/bolt/commit/eaed5ce))
* fix typo in setting up Jest env ([4689801](https://github.com/bolt-design-system/bolt/commit/4689801))
* flag and figure bugs ([9893c60](https://github.com/bolt-design-system/bolt/commit/9893c60))
* force downgrade version of text component prior to publishing ([7f9dbb0](https://github.com/bolt-design-system/bolt/commit/7f9dbb0))
* force now.sh CLI to v15 or later ([40f244a](https://github.com/bolt-design-system/bolt/commit/40f244a))
* fullBleed deprecation logic ([38f7a1e](https://github.com/bolt-design-system/bolt/commit/38f7a1e))
* further update timeout ([3ae260e](https://github.com/bolt-design-system/bolt/commit/3ae260e))
* Generate icons correct with prretier config ([1529fe2](https://github.com/bolt-design-system/bolt/commit/1529fe2))
* get latest now.sh deploy for Nightwatch tests ([d03a708](https://github.com/bolt-design-system/bolt/commit/d03a708))
* gutter correction ([05c2ef7](https://github.com/bolt-design-system/bolt/commit/05c2ef7))
* headline width ([de432ad](https://github.com/bolt-design-system/bolt/commit/de432ad))
* html encode web component examples in docs so they don't render as actual components ([52e4675](https://github.com/bolt-design-system/bolt/commit/52e4675))
* IE and Edge ordered list background and numbering fix ([2a21609](https://github.com/bolt-design-system/bolt/commit/2a21609))
* image data filter, change to greater than or equal to, was filtering out exact matches ([863cfa4](https://github.com/bolt-design-system/bolt/commit/863cfa4))
* images on client-rendered, server-rendered demo pages ([3dfa10d](https://github.com/bolt-design-system/bolt/commit/3dfa10d))
* increase max timeout for button Jest tests ([efbb7ee](https://github.com/bolt-design-system/bolt/commit/efbb7ee))
* increase max timeout of E2E tests to troubleshoot failing Nightwatch tests ([8056db2](https://github.com/bolt-design-system/bolt/commit/8056db2))
* increase Symfony process timeout ([801db62](https://github.com/bolt-design-system/bolt/commit/801db62))
* inline list container width ([84fa95a](https://github.com/bolt-design-system/bolt/commit/84fa95a))
* JS error when image class is not found ([a3c733a](https://github.com/bolt-design-system/bolt/commit/a3c733a))
* link text and icon spacing ([f79f585](https://github.com/bolt-design-system/bolt/commit/f79f585))
* lint js ([352c21e](https://github.com/bolt-design-system/bolt/commit/352c21e))
* lint js ([460b88b](https://github.com/bolt-design-system/bolt/commit/460b88b))
* lint js ([4c36399](https://github.com/bolt-design-system/bolt/commit/4c36399))
* lint js ([519b052](https://github.com/bolt-design-system/bolt/commit/519b052))
* lint js ([698b160](https://github.com/bolt-design-system/bolt/commit/698b160))
* lint js ([8b21eaf](https://github.com/bolt-design-system/bolt/commit/8b21eaf))
* lint js ([a7dda94](https://github.com/bolt-design-system/bolt/commit/a7dda94))
* lint styles ([a1d11d9](https://github.com/bolt-design-system/bolt/commit/a1d11d9))
* lint styles ([6529faf](https://github.com/bolt-design-system/bolt/commit/6529faf))
* lint styles ([ff33648](https://github.com/bolt-design-system/bolt/commit/ff33648))
* make images display "block" by default to avoid whitespace issues inside custom-element ([dd2b5fd](https://github.com/bolt-design-system/bolt/commit/dd2b5fd))
* make sure NOW_TOKEN env added to now.sh deploy commands ([4d0a482](https://github.com/bolt-design-system/bolt/commit/4d0a482))
* mapping grid item to schema props ([70a2215](https://github.com/bolt-design-system/bolt/commit/70a2215))
* migrate updated button component JS logic to new button.js component file ([f9ce8e7](https://github.com/bolt-design-system/bolt/commit/f9ce8e7))
* misc docs site related UI fixes ([5ef9667](https://github.com/bolt-design-system/bolt/commit/5ef9667))
* missing space ([5f4b86d](https://github.com/bolt-design-system/bolt/commit/5f4b86d))
* move around webpack loader plugins needed for running the full test suite ([e7cb37e](https://github.com/bolt-design-system/bolt/commit/e7cb37e))
* move image and JS to fixtures dir ([afc93c8](https://github.com/bolt-design-system/bolt/commit/afc93c8))
* move margin to blockquote image, not every footer item ([e52d9c6](https://github.com/bolt-design-system/bolt/commit/e52d9c6))
* move new custom twig functions to BoltCore ([91bef25](https://github.com/bolt-design-system/bolt/commit/91bef25))
* move process.env-related variables to the top ([2713f45](https://github.com/bolt-design-system/bolt/commit/2713f45))
* need to reset git repo before update-read-only-git-repos.sh ([54f9644](https://github.com/bolt-design-system/bolt/commit/54f9644))
* nightwatch tearDown => afterEach ([d9fd395](https://github.com/bolt-design-system/bolt/commit/d9fd395))
* only add main bolt image class to fallback ([c1292f9](https://github.com/bolt-design-system/bolt/commit/c1292f9))
* package.json ([53410b9](https://github.com/bolt-design-system/bolt/commit/53410b9))
* pass correct variable in alignment validation ([8455c07](https://github.com/bolt-design-system/bolt/commit/8455c07))
* pass in passed ([305ea28](https://github.com/bolt-design-system/bolt/commit/305ea28))
* port over ratio component test config updates from https://github.com/bolt-design-system/bolt/pull/1109 based on the ~1.3% average VRT diff that pops up periodically ([dc4a22a](https://github.com/bolt-design-system/bolt/commit/dc4a22a))
* port over Travis CI updates from https://github.com/bolt-design-system/bolt/pull/1109 meant to improve the reliability / consistency of the visual regression test results being run by Jest ([8f56a70](https://github.com/bolt-design-system/bolt/commit/8f56a70))
* Pretter issue ([e3308eb](https://github.com/bolt-design-system/bolt/commit/e3308eb))
* proactively load the text component's JS to speed up initial rendering ([d942886](https://github.com/bolt-design-system/bolt/commit/d942886))
* Pull in the newly-added case-helper dependency to the docs site ([32e7e86](https://github.com/bolt-design-system/bolt/commit/32e7e86))
* quick fix to address band / height issue on the docs site in IE 11 and Firefox ([0721b70](https://github.com/bolt-design-system/bolt/commit/0721b70))
* re-add chrome-path to Travis config as working solution for more consistent VRT testing results ([f1f1573](https://github.com/bolt-design-system/bolt/commit/f1f1573))
* re-add local PHP dependencies to fix broken CI tests ([595c19d](https://github.com/bolt-design-system/bolt/commit/595c19d))
* re-add support for 'imageAttributes' for backwards compatibility, but deprecate it ([fa78212](https://github.com/bolt-design-system/bolt/commit/fa78212))
* re-location button component server-side rendering examples ([bb5eb3e](https://github.com/bolt-design-system/bolt/commit/bb5eb3e))
* re-test checkRun imports ([6a78bcb](https://github.com/bolt-design-system/bolt/commit/6a78bcb))
* re-test Jest after tweaking logic used to make sure the config data needed is available ([f808965](https://github.com/bolt-design-system/bolt/commit/f808965))
* re-test nightwatch results reporting to address screenshot issues on Travis ([f250b28](https://github.com/bolt-design-system/bolt/commit/f250b28))
* re-test with additional dockerfile updates ([300ec85](https://github.com/bolt-design-system/bolt/commit/300ec85))
* re-test with updated travis config ([8275947](https://github.com/bolt-design-system/bolt/commit/8275947))
* rearrange CLI args ([a9956ee](https://github.com/bolt-design-system/bolt/commit/a9956ee))
* reducing previous debugging sleep command ([e09115e](https://github.com/bolt-design-system/bolt/commit/e09115e))
* refactor deploy logic to ensure url aliases don't exceed max length on now.sh ([286c8a7](https://github.com/bolt-design-system/bolt/commit/286c8a7))
* refactor promise returns ([d2c61bb](https://github.com/bolt-design-system/bolt/commit/d2c61bb))
* relocate chrome path dependency ([5bb6342](https://github.com/bolt-design-system/bolt/commit/5bb6342))
* relocate NPM dependencies needed for Jest to run through unit tests ([5d56ec2](https://github.com/bolt-design-system/bolt/commit/5d56ec2))
* remove 'striptags' filter from bolt-teaser text, creates IE bugs with bolt-link ([8ae0e2f](https://github.com/bolt-design-system/bolt/commit/8ae0e2f))
* remove 'web component only' from ratio description ([84738e1](https://github.com/bolt-design-system/bolt/commit/84738e1))
* remove async from the top level Jest test `describe` — addresses deprecation warnings about this breaking in an upcoming version of Jest ([a7f5fec](https://github.com/bolt-design-system/bolt/commit/a7f5fec))
* remove auto-highlighting SSR-rendered HTML ([caaec8c](https://github.com/bolt-design-system/bolt/commit/caaec8c))
* remove bail flag from Travis CI to troubleshoot Travis test failing mysteriously ([30cb128](https://github.com/bolt-design-system/bolt/commit/30cb128))
* remove Bolt Bot comments, cleanup deploy script ([83b285d](https://github.com/bolt-design-system/bolt/commit/83b285d))
* remove deps not needed ([4d1098c](https://github.com/bolt-design-system/bolt/commit/4d1098c))
* remove ENV var from npm script ([8d39245](https://github.com/bolt-design-system/bolt/commit/8d39245))
* remove exclude rule in vue webpack config — fixes error thrown otherwise ([67a3b9d](https://github.com/bolt-design-system/bolt/commit/67a3b9d))
* remove extra comma ([8267ce0](https://github.com/bolt-design-system/bolt/commit/8267ce0))
* remove extra status call to Github Checks API ([896ee99](https://github.com/bolt-design-system/bolt/commit/896ee99))
* remove extra VRT screenshot that shouldn't exist ([8a5982f](https://github.com/bolt-design-system/bolt/commit/8a5982f))
* remove gitHead from packages before publishing v2.3.0 ([0195558](https://github.com/bolt-design-system/bolt/commit/0195558))
* remove hero text and set up themes ([ed8ba7b](https://github.com/bolt-design-system/bolt/commit/ed8ba7b))
* Remove issue with paths on non-local machine ([32b527f](https://github.com/bolt-design-system/bolt/commit/32b527f))
* remove js-fonts-loaded class from testing-server HTML response + add critical css vars component to retest rendering ([c6113f1](https://github.com/bolt-design-system/bolt/commit/c6113f1))
* remove meta flag from now deploy ([bd63ed2](https://github.com/bolt-design-system/bolt/commit/bd63ed2))
* Remove observedAttributes method from nav-priority component ([c748bae](https://github.com/bolt-design-system/bolt/commit/c748bae))
* remove old e2e tests + old screenshots and reports folders ([322fe11](https://github.com/bolt-design-system/bolt/commit/322fe11))
* remove old vars ([ef310bc](https://github.com/bolt-design-system/bolt/commit/ef310bc))
* remove padding for block list's last item ([868f077](https://github.com/bolt-design-system/bolt/commit/868f077))
* remove postinstall on docs site + test quicker PHP install command ([5b76360](https://github.com/bolt-design-system/bolt/commit/5b76360))
* remove setTimeout, check that image is loaded before calling 'unveil' ([d9d5489](https://github.com/bolt-design-system/bolt/commit/d9d5489))
* remove typo ([474d161](https://github.com/bolt-design-system/bolt/commit/474d161))
* remove unzip pkg from Dockerfile ([f041c81](https://github.com/bolt-design-system/bolt/commit/f041c81))
* remove uses of 'imageAttributes', these ones are unnecessary ([b4ceae9](https://github.com/bolt-design-system/bolt/commit/b4ceae9))
* remove verdaccio npm scripts from root till publishing-related tests are added ([7a90461](https://github.com/bolt-design-system/bolt/commit/7a90461))
* removing auth-ed attempt at image loading ([f68548d](https://github.com/bolt-design-system/bolt/commit/f68548d))
* replace 'button' references to 'link' in testing instructions ([fb15ddb](https://github.com/bolt-design-system/bolt/commit/fb15ddb))
* replace 'imageAttributes' with 'cover' on careers page demo, does same thing ([32c1733](https://github.com/bolt-design-system/bolt/commit/32c1733))
* Replace index() sass function with map-get() ([#1004](https://github.com/bolt-design-system/bolt/issues/1004)) ([6e9404e](https://github.com/bolt-design-system/bolt/commit/6e9404e))
* replace localhost path in docs ([9be0abd](https://github.com/bolt-design-system/bolt/commit/9be0abd))
* replace missing card image with new one from pega.com ([0fbc791](https://github.com/bolt-design-system/bolt/commit/0fbc791))
* resolve conflicts ([d6adc02](https://github.com/bolt-design-system/bolt/commit/d6adc02))
* retest docker build ([f4bfa64](https://github.com/bolt-design-system/bolt/commit/f4bfa64))
* retest docker build ([1c23b71](https://github.com/bolt-design-system/bolt/commit/1c23b71))
* retest Docker container behavior after updating scale config ([46169ff](https://github.com/bolt-design-system/bolt/commit/46169ff))
* return if src or srcset ([072fef0](https://github.com/bolt-design-system/bolt/commit/072fef0))
* return intval from gcd function, edit comment ([0f98359](https://github.com/bolt-design-system/bolt/commit/0f98359))
* revert commenting out author footer while testing ([8a47235](https://github.com/bolt-design-system/bolt/commit/8a47235))
* revert conditionally loading the check-run library ([d15763f](https://github.com/bolt-design-system/bolt/commit/d15763f))
* revert keep alive config ([42c255f](https://github.com/bolt-design-system/bolt/commit/42c255f))
* revert package.json postinstall hook update ([25511ce](https://github.com/bolt-design-system/bolt/commit/25511ce))
* revert recent update to PR template ([27ff1b2](https://github.com/bolt-design-system/bolt/commit/27ff1b2))
* revert twig-renderer vendor path updates ([28cacb8](https://github.com/bolt-design-system/bolt/commit/28cacb8))
* revert updating action block repository url in package.json ([371ccab](https://github.com/bolt-design-system/bolt/commit/371ccab))
* revert updating element-closest; fixes IE 11 JavaScript issues that pop up if updated to a later version (relating to smooth scroll) ([a4a5e03](https://github.com/bolt-design-system/bolt/commit/a4a5e03))
* safari subpixel issue ([8dfa73c](https://github.com/bolt-design-system/bolt/commit/8dfa73c))
* screenshot mapping ([96662e1](https://github.com/bolt-design-system/bolt/commit/96662e1))
* selectively porting over Bolt fixes from master to address v2.3.0 issues flagged during QA ([c1d02ed](https://github.com/bolt-design-system/bolt/commit/c1d02ed))
* set correct video Nightwatch test url ([b8ae2fe](https://github.com/bolt-design-system/bolt/commit/b8ae2fe))
* skip 'imageAttributes' in background component if using image pattern ([9dd9f18](https://github.com/bolt-design-system/bolt/commit/9dd9f18))
* skip trying to send VRT screenshots to now.sh if the token that's needed is missing ([a5a9c24](https://github.com/bolt-design-system/bolt/commit/a5a9c24))
* slightly increase the max deploy timeout on travis + auto-retry installing dependencies ([d3c0c11](https://github.com/bolt-design-system/bolt/commit/d3c0c11))
* slightly increase the max VRT difference allowed before failing ([f3c6203](https://github.com/bolt-design-system/bolt/commit/f3c6203))
* snaps ([1f83b98](https://github.com/bolt-design-system/bolt/commit/1f83b98))
* snaps ([80a572b](https://github.com/bolt-design-system/bolt/commit/80a572b))
* stylelint ([8bddb16](https://github.com/bolt-design-system/bolt/commit/8bddb16))
* styles and doc cleanup ([209ed0e](https://github.com/bolt-design-system/bolt/commit/209ed0e))
* swap order of watch vs serve tasks ([a68f465](https://github.com/bolt-design-system/bolt/commit/a68f465))
* syntax ([22a3ead](https://github.com/bolt-design-system/bolt/commit/22a3ead))
* temporarily disable component explorer demo for ratio till further debugged ([a6e47f6](https://github.com/bolt-design-system/bolt/commit/a6e47f6))
* temporarily disable pattern lab data being inlined in the main site head + add fully inlined version to the site's footer template ([2b9d584](https://github.com/bolt-design-system/bolt/commit/2b9d584))
* temporarily disable stylelint plugin till a non-deprecated replacement is added ([cd09832](https://github.com/bolt-design-system/bolt/commit/cd09832))
* test updating the SVG Icon build script to include the build prep task ([8b14814](https://github.com/bolt-design-system/bolt/commit/8b14814))
* test updating Travis build with sauce connect partially disabled ([c4004a0](https://github.com/bolt-design-system/bolt/commit/c4004a0))
* testing instructions ([9ebb721](https://github.com/bolt-design-system/bolt/commit/9ebb721))
* testing working for async PL data not always being available when needed ([56fece6](https://github.com/bolt-design-system/bolt/commit/56fece6))
* troubleshooting PHP SSR build error ([f9dc6dc](https://github.com/bolt-design-system/bolt/commit/f9dc6dc))
* try updating travis config to wait longer before grabbing sauce labs testing results ([b8ffb13](https://github.com/bolt-design-system/bolt/commit/b8ffb13))
* tweak the slotted logo styles to work as expected inside a slot ([27fc1a2](https://github.com/bolt-design-system/bolt/commit/27fc1a2))
* typo ([1216145](https://github.com/bolt-design-system/bolt/commit/1216145))
* typo in testing instructions ([4ba775a](https://github.com/bolt-design-system/bolt/commit/4ba775a))
* update autolink tests to ensure every button on Travis CI updates. ([32186a8](https://github.com/bolt-design-system/bolt/commit/32186a8))
* Update background color in bolt-ul list element ([21874e4](https://github.com/bolt-design-system/bolt/commit/21874e4))
* update background component to pass 'cover' prop instead of classname to image, fix lazyloading logic in background ([9bf7b9e](https://github.com/bolt-design-system/bolt/commit/9bf7b9e))
* update Bolt dependencies in Drupal Lab example to the latest versions ([66b8726](https://github.com/bolt-design-system/bolt/commit/66b8726))
* update bolt-version data logic to handle API throttle limits + attempt to use old (stale) data if expired ([f456778](https://github.com/bolt-design-system/bolt/commit/f456778))
* update bolt-version script to address deprecation error ([b1035c4](https://github.com/bolt-design-system/bolt/commit/b1035c4))
* update bolt-versions Github check to use the new octokit API call ([21cf7a4](https://github.com/bolt-design-system/bolt/commit/21cf7a4))
* update broken image path in README.md ([13c8e7a](https://github.com/bolt-design-system/bolt/commit/13c8e7a))
* update broken path import with iframe-resizer library ([e07b687](https://github.com/bolt-design-system/bolt/commit/e07b687))
* update broken placeholder variable name ([80c9902](https://github.com/bolt-design-system/bolt/commit/80c9902))
* update button component test snapshot + trim HTML used to test component rendering properly ([064034e](https://github.com/bolt-design-system/bolt/commit/064034e))
* update button Jest tests ([ab57265](https://github.com/bolt-design-system/bolt/commit/ab57265))
* update button SSR text ([d421f08](https://github.com/bolt-design-system/bolt/commit/d421f08))
* update button SSR text to not compile Twig filter + update SSR code block ([6ca47ae](https://github.com/bolt-design-system/bolt/commit/6ca47ae))
* update button tests + snapshots ([9725d0f](https://github.com/bolt-design-system/bolt/commit/9725d0f))
* update card + ratio snapshots ([bdf711c](https://github.com/bolt-design-system/bolt/commit/bdf711c))
* update card test snapshots ([566cb1b](https://github.com/bolt-design-system/bolt/commit/566cb1b))
* update chip list snapshot ([e5a6ba4](https://github.com/bolt-design-system/bolt/commit/e5a6ba4))
* update chip list snapshot ([a546a7c](https://github.com/bolt-design-system/bolt/commit/a546a7c))
* update clean task to not wipe the entire www folder every time ([b8cfb67](https://github.com/bolt-design-system/bolt/commit/b8cfb67))
* update CLI to allow the static site generator and/or Pattern Lab to get run manually (especially for testing purposes) ([7f82175](https://github.com/bolt-design-system/bolt/commit/7f82175))
* update custom twig tags to address Twig API changes starting to cause errors in multiple environments ([3e9aaff](https://github.com/bolt-design-system/bolt/commit/3e9aaff))
* update dockerfile config + adjust Jest setup to ensure buildPrep + image task work only have to happen once ([82a4673](https://github.com/bolt-design-system/bolt/commit/82a4673))
* update dockerfile install commands ([32c9aa1](https://github.com/bolt-design-system/bolt/commit/32c9aa1))
* update docs site inner page template to use the new pinned content option with bands ([85fe85e](https://github.com/bolt-design-system/bolt/commit/85fe85e))
* update e2e tests to wait up to 3 seconds while looking for specific selectors before timing out ([dca91fd](https://github.com/bolt-design-system/bolt/commit/dca91fd))
* update event emitter to only fire once ([341aabe](https://github.com/bolt-design-system/bolt/commit/341aabe))
* update event emitter to only fire once ([7e454b5](https://github.com/bolt-design-system/bolt/commit/7e454b5))
* update existing IE11 only css ([89e8d56](https://github.com/bolt-design-system/bolt/commit/89e8d56))
* update failing jest test (based on the current branch name) ([0e05374](https://github.com/bolt-design-system/bolt/commit/0e05374))
* Update globbing for packages in root boltrc file to be recursive ([db61406](https://github.com/bolt-design-system/bolt/commit/db61406))
* Update icons prettier config to that it would be like the main config ([4a9471e](https://github.com/bolt-design-system/bolt/commit/4a9471e))
* update iframe resizer library's import path to prevent build errors ([ef0f213](https://github.com/bolt-design-system/bolt/commit/ef0f213))
* update image JS to keep any initial classes found on image tag, backwards compatibility for 'imageAttributes' ([ea980a6](https://github.com/bolt-design-system/bolt/commit/ea980a6))
* update install command for Travis ([1a64b4d](https://github.com/bolt-design-system/bolt/commit/1a64b4d))
* update install paths ([048da2e](https://github.com/bolt-design-system/bolt/commit/048da2e))
* update jest screenshot reporting to address missing NOW_TOKEN error thrown when doing local dev testing ([fd156d4](https://github.com/bolt-design-system/bolt/commit/fd156d4))
* update Jest test runner to shut down any still-open servers when spinning up to run new tests ([ecd20e6](https://github.com/bolt-design-system/bolt/commit/ecd20e6))
* update jest tests that are still using async on the top level function ([add1f2f](https://github.com/bolt-design-system/bolt/commit/add1f2f))
* update jest tests to auto-exclude test data files in nested folders + rename autolink test configs to have a `.data.js` file extension used to exclude from Jest ([ad70e08](https://github.com/bolt-design-system/bolt/commit/ad70e08))
* update Jest tests to not use async on top level `describe` ([772fbb1](https://github.com/bolt-design-system/bolt/commit/772fbb1))
* update Jest VRT test reporting to more accurately report back image uploads + URLs for remote debugging ([736a7db](https://github.com/bolt-design-system/bolt/commit/736a7db))
* update layout to fix rendering issue in IE 11 ([2d6da70](https://github.com/bolt-design-system/bolt/commit/2d6da70))
* update lerna exec command to run via npx ([3bb2d0d](https://github.com/bolt-design-system/bolt/commit/3bb2d0d))
* update Lerna logic to include merged tags when deciding changes between merges ([d067b4e](https://github.com/bolt-design-system/bolt/commit/d067b4e))
* update logic in release script ([0c45166](https://github.com/bolt-design-system/bolt/commit/0c45166))
* update logic in release script ([8d29613](https://github.com/bolt-design-system/bolt/commit/8d29613))
* update logic to make sure Git Sha data matches up with the correct + latest now.sh deployment ([c93c5ab](https://github.com/bolt-design-system/bolt/commit/c93c5ab))
* update max timeout for autolinker tests ([b00b45b](https://github.com/bolt-design-system/bolt/commit/b00b45b))
* update max timeout for navbar component VRT tests ([9955610](https://github.com/bolt-design-system/bolt/commit/9955610))
* update named task in Github Checks API ([a798b54](https://github.com/bolt-design-system/bolt/commit/a798b54))
* update nav links to handle the content / icon variations ([d5d0e10](https://github.com/bolt-design-system/bolt/commit/d5d0e10))
* update nav priority CSS to ensure the button size doesn't cause the parent component to grow out of control on larger screen sizes ([b1a1e8a](https://github.com/bolt-design-system/bolt/commit/b1a1e8a))
* update navbar jest VRT tests to all use the same image snapshot config ([1615ffa](https://github.com/bolt-design-system/bolt/commit/1615ffa))
* update Nightwatch handleNightwatchResults function to try and resolve timeout issues ([27cdca6](https://github.com/bolt-design-system/bolt/commit/27cdca6))
* update Nightwatch test for PL search input to end early in IE 11 ([5969a43](https://github.com/bolt-design-system/bolt/commit/5969a43))
* update nightwatch tests ([eb31464](https://github.com/bolt-design-system/bolt/commit/eb31464))
* update nightwatch.js to try re-running failing tests up to 3 times ([77d01f9](https://github.com/bolt-design-system/bolt/commit/77d01f9))
* update now.sh utils to change how the NOW_TOKEN gets added ([82c531a](https://github.com/bolt-design-system/bolt/commit/82c531a))
* update npm scripts to not use postinstall automatically; add postinstall to root of the repo instead ([5dc3496](https://github.com/bolt-design-system/bolt/commit/5dc3496))
* update package.json path to fix grid CSS ([e999b33](https://github.com/bolt-design-system/bolt/commit/e999b33))
* update path to post-build script run by Travis ([ea5ae77](https://github.com/bolt-design-system/bolt/commit/ea5ae77))
* update Pattern Lab overview page + docs site homepage templates ([bd06d5f](https://github.com/bolt-design-system/bolt/commit/bd06d5f))
* update pattern lab test to match current pl page title ([24a31de](https://github.com/bolt-design-system/bolt/commit/24a31de))
* update pattern lab to fix header / layout issue in IE 11 ([4a5aba3](https://github.com/bolt-design-system/bolt/commit/4a5aba3))
* update PHP install task in Docker container ([47fb5e0](https://github.com/bolt-design-system/bolt/commit/47fb5e0))
* update ratio test + update navbar snapshots ([6a4a586](https://github.com/bolt-design-system/bolt/commit/6a4a586))
* update ratio VRT config precision ([b3e6210](https://github.com/bolt-design-system/bolt/commit/b3e6210))
* update read-only repo logic to always sync tag of latest release ([184737c](https://github.com/bolt-design-system/bolt/commit/184737c))
* update read-only repo logic to always sync tag of latest release ([d2f1f2a](https://github.com/bolt-design-system/bolt/commit/d2f1f2a))
* update release logic to grab consistent git tag version ([1622d24](https://github.com/bolt-design-system/bolt/commit/1622d24))
* update remaining band components not yet switched over to use the full [@bolt-components-band](https://github.com/bolt-components-band) twig namespace ([dd8fca4](https://github.com/bolt-design-system/bolt/commit/dd8fca4))
* update remaining docs site templates as workaround to Twig embeds failing to compile ([39c0675](https://github.com/bolt-design-system/bolt/commit/39c0675))
* update selector for image zoom to work when images are rendered to shadow DOM ([ea4f28b](https://github.com/bolt-design-system/bolt/commit/ea4f28b))
* update setCheckRun check ([b96897a](https://github.com/bolt-design-system/bolt/commit/b96897a))
* update so certain PL assets are prefetched vs preloaded ([904ae87](https://github.com/bolt-design-system/bolt/commit/904ae87))
* update SSR function to support older Symfony Process version ([f84f10a](https://github.com/bolt-design-system/bolt/commit/f84f10a))
* Update styling for UL's for IE and Edge ([5aa23d5](https://github.com/bolt-design-system/bolt/commit/5aa23d5))
* update task name ([59310ba](https://github.com/bolt-design-system/bolt/commit/59310ba))
* update testing server to host file assets added to the www dir ([6366dfe](https://github.com/bolt-design-system/bolt/commit/6366dfe))
* update tests to address Prettier issues ([1a5a579](https://github.com/bolt-design-system/bolt/commit/1a5a579))
* update tests to stop Twig renderer service when complete ([a7bafbb](https://github.com/bolt-design-system/bolt/commit/a7bafbb))
* update text component demo to use updated schema props from 8 months ago ([7b6b20e](https://github.com/bolt-design-system/bolt/commit/7b6b20e))
* update the URL used by Nightwatch.js to confirm SSR is working as expected ([1c74627](https://github.com/bolt-design-system/bolt/commit/1c74627))
* update to automatically run generated files through Prettier automatically to prevent any linting issues ([ae0b32c](https://github.com/bolt-design-system/bolt/commit/ae0b32c))
* update to only wait to retry requests that are within 15 seconds before calling it quits and using the fallback ([1875bea](https://github.com/bolt-design-system/bolt/commit/1875bea))
* update Travis CI timeout ([b98d5f5](https://github.com/bolt-design-system/bolt/commit/b98d5f5))
* update travis config ([99bc204](https://github.com/bolt-design-system/bolt/commit/99bc204))
* update Travis sleep command to wait for 60s ([c2873be](https://github.com/bolt-design-system/bolt/commit/c2873be))
* update Travis so builds automatically clear the cached version data so the site dropdown versions always display correctly ([1c37c0a](https://github.com/bolt-design-system/bolt/commit/1c37c0a))
* update Travis task order ([3366905](https://github.com/bolt-design-system/bolt/commit/3366905))
* update Twig header / footer for docs site to still work when lang is set to a string, an array with a single value, and an array with multiple values ([53e7411](https://github.com/bolt-design-system/bolt/commit/53e7411))
* update Twig rendering service API when running on master + add / update caching layers to speed up subsequent builds on Travis ([a8ed82f](https://github.com/bolt-design-system/bolt/commit/a8ed82f))
* update typo ([abe44ba](https://github.com/bolt-design-system/bolt/commit/abe44ba))
* update Webpack build and server config to better account for situations where lang can be defined as a string, an array with one item, and an array with multiple items ([bbeee23](https://github.com/bolt-design-system/bolt/commit/bbeee23))
* **@bolt/components-video:** fix for IE11 testing ([3ea81a6](https://github.com/bolt-design-system/bolt/commit/3ea81a6))
* use gcd instead of conditionally dividing each by 100 ([47a8d40](https://github.com/bolt-design-system/bolt/commit/47a8d40))
* version bump / cleanup from v2.3.0 release ([32ec7d9](https://github.com/bolt-design-system/bolt/commit/32ec7d9))
* version bump now.sh ([269389d](https://github.com/bolt-design-system/bolt/commit/269389d))
* wait till promise resolves ([28f053f](https://github.com/bolt-design-system/bolt/commit/28f053f))
* workaround to fix major Twig errors being encountered when the docs site is trying to be compiled (removing Twig embeds and sticking to Twig includes and extends seems to do the trick) ([f3533f6](https://github.com/bolt-design-system/bolt/commit/f3533f6))
* wrong build id being passed ([fdc129b](https://github.com/bolt-design-system/bolt/commit/fdc129b))
* disable meta flag on now.sh deploy ([a759fae](https://github.com/bolt-design-system/bolt/commit/a759fae))
* moving additional icon for test to folder outside the component root ([95caa3f](https://github.com/bolt-design-system/bolt/commit/95caa3f))
* re-test docker deploy with logging + added meta gitSha info ([0968e51](https://github.com/bolt-design-system/bolt/commit/0968e51))
* update release script to not force push to github ([17ed976](https://github.com/bolt-design-system/bolt/commit/17ed976))
* **@bolt/build-tools:** fix for filing test on first run ([226e96e](https://github.com/bolt-design-system/bolt/commit/226e96e))
* **@bolt/build-tools:** fix js issues ([c501be3](https://github.com/bolt-design-system/bolt/commit/c501be3))
* **@bolt/build-tools:** updateting configutration for testing ([f3333b7](https://github.com/bolt-design-system/bolt/commit/f3333b7))
* **@bolt/build-tools,@bolt/components-icons:** move clean icon task to be run after all the tests ([863f91d](https://github.com/bolt-design-system/bolt/commit/863f91d))
* **@bolt/components-video:** cHange test logic ([75f14ad](https://github.com/bolt-design-system/bolt/commit/75f14ad))
* **Add support for attributes for bolt-ol and bolt-ul:** add support for attributes for bolt-ol and ([a41aa78](https://github.com/bolt-design-system/bolt/commit/a41aa78))
* **core-php:** moving phpunit from dep to devDep ([2d73ebc](https://github.com/bolt-design-system/bolt/commit/2d73ebc))
* **Update external class names to be complaint with BEM metodology:** update external class names to ([6dc82b3](https://github.com/bolt-design-system/bolt/commit/6dc82b3))
* yarn install required packages in travis build ([a0dadb0](https://github.com/bolt-design-system/bolt/commit/a0dadb0))


### Features

* add 'gcd' twig function ([e249317](https://github.com/bolt-design-system/bolt/commit/e249317))
* add ability to render Twig template strings in the Twig rendering service API ([5cf4b5b](https://github.com/bolt-design-system/bolt/commit/5cf4b5b))
* add case-helper library, not yet loading (WIP) ([41c3227](https://github.com/bolt-design-system/bolt/commit/41c3227))
* add comprehensive testing coverage to confirm config options + integrations working as expected ([103f37a](https://github.com/bolt-design-system/bolt/commit/103f37a))
* add demo video assets for testing ratio component behavior ([ef366fe](https://github.com/bolt-design-system/bolt/commit/ef366fe))
* add docs site search powered by Algolia ([013df79](https://github.com/bolt-design-system/bolt/commit/013df79))
* add helper 'containsTagName' ([941e596](https://github.com/bolt-design-system/bolt/commit/941e596))
* add helper functions for converting case type ([5294f0f](https://github.com/bolt-design-system/bolt/commit/5294f0f))
* add initial `@bolt/analytics-autolink` implementation ([d05bc98](https://github.com/bolt-design-system/bolt/commit/d05bc98))
* add initial jest test for the ratio component's twig rendering ([754dfd7](https://github.com/bolt-design-system/bolt/commit/754dfd7))
* add initial set of navbar tests, including visual regression testing coverage, responsive behavior across multiple screen sizes, and tests for interaction (open and close navigation + linkable titles) ([67406c9](https://github.com/bolt-design-system/bolt/commit/67406c9))
* add initialize_props function, util setProp function, names to schema elements ([18a3cd1](https://github.com/bolt-design-system/bolt/commit/18a3cd1))
* add logic to convert snake or camel to kebab case ([9f3f5ff](https://github.com/bolt-design-system/bolt/commit/9f3f5ff))
* add merge_attributes() function to TwigFunctions, make available in twig templates. ([e352a3d](https://github.com/bolt-design-system/bolt/commit/e352a3d))
* add new api-specific build tasks that handle generating the status board, generate visual regression testing URLs, and can find all available versions of the Bolt packages published to NPM ([9cdc962](https://github.com/bolt-design-system/bolt/commit/9cdc962))
* add new placeholder image, use in personalized card demo ([e542029](https://github.com/bolt-design-system/bolt/commit/e542029))
* add new rendering mode config + expose globally ([4636d67](https://github.com/bolt-design-system/bolt/commit/4636d67))
* add new webpack dev server setup for quickly testing components using JIT (just in time) compiling ([cd1ce4e](https://github.com/bolt-design-system/bolt/commit/cd1ce4e))
* add pattern aliases to the background shape and button group packages ([7d71ed9](https://github.com/bolt-design-system/bolt/commit/7d71ed9))
* add persistent caching to twig namespace path discovery. ([d318e9e](https://github.com/bolt-design-system/bolt/commit/d318e9e))
* add POC button component example wired up to use the new ssr filter ([4c51647](https://github.com/bolt-design-system/bolt/commit/4c51647))
* add polyfill for string.includes ([772b19c](https://github.com/bolt-design-system/bolt/commit/772b19c))
* add README.md docs for installing and implementing ([78b5f37](https://github.com/bolt-design-system/bolt/commit/78b5f37))
* add simple image screenshot test reporting functionality to Jest to assist with debugging VRT issues until full Github integration is wired up ([843aeb0](https://github.com/bolt-design-system/bolt/commit/843aeb0))
* add support for 'attributes', remove 'attributes' from ratio include ([6878f1d](https://github.com/bolt-design-system/bolt/commit/6878f1d))
* add support for 'cover' prop ([a4c49a9](https://github.com/bolt-design-system/bolt/commit/a4c49a9))
* add support for an optional "pattern -alias" config to help match up oddly named folders in PL with a component's default package.json file name. ([f11db1a](https://github.com/bolt-design-system/bolt/commit/f11db1a))
* add support for quotes with and without <p> ([8c2de4f](https://github.com/bolt-design-system/bolt/commit/8c2de4f))
* add testing support for variable width navbars + add visual regression testing screenshots ([00ef7ff](https://github.com/bolt-design-system/bolt/commit/00ef7ff))
* add tests for responsive <bolt-navbar> width in a variable width grid cell ([d3066cc](https://github.com/bolt-design-system/bolt/commit/d3066cc))
* add timeout to workaround lazyload render race condition, wip ([71796b0](https://github.com/bolt-design-system/bolt/commit/71796b0))
* add visual regression testing to Jest + add jest-dom as a new tool to help evaluate the state of the DOM inside components being tested ([aee3f0d](https://github.com/bolt-design-system/bolt/commit/aee3f0d))
* add web component SSR + Twig Nightwatch.js test ([6def3e7](https://github.com/bolt-design-system/bolt/commit/6def3e7))
* addd ability to manually enable / disable server-side rendering + automatically toggle based on dev environment ([861a14e](https://github.com/bolt-design-system/bolt/commit/861a14e))
* Adds manual testing steps for bolt-button on PatternLab in an approximation of Gherkin format ([7ce733a](https://github.com/bolt-design-system/bolt/commit/7ce733a))
* automatically boot up webpack dev server to remove the need to compile Pattern Lab before running any Jest tests ([8d910b0](https://github.com/bolt-design-system/bolt/commit/8d910b0))
* automatically re-render + re-evaluate slots and classes added when child node mutations are observed ([10f1ec7](https://github.com/bolt-design-system/bolt/commit/10f1ec7))
* automatically switch between a simple static now.sh deployment vs a full docker-based deployment based on the branch ([7d56566](https://github.com/bolt-design-system/bolt/commit/7d56566))
* run nightwatch tests on local ([51829f0](https://github.com/bolt-design-system/bolt/commit/51829f0))
* change ratio prop to use slash-separated values ([0b739b1](https://github.com/bolt-design-system/bolt/commit/0b739b1))
* clean up nav UI to make it easier to see which links have two actions vs only one ([6325574](https://github.com/bolt-design-system/bolt/commit/6325574))
* convert schema data to camelCase before calling validate ([f7e9e93](https://github.com/bolt-design-system/bolt/commit/f7e9e93))
* create report nightwatch results script ([f1a8d6a](https://github.com/bolt-design-system/bolt/commit/f1a8d6a))
* deprecate 'useAspectRatio', 'width', and 'height'; update instances to use 'ratio' ([5a4b34a](https://github.com/bolt-design-system/bolt/commit/5a4b34a))
* Differentiate between developer testing and functional testing ([eaaa3ca](https://github.com/bolt-design-system/bolt/commit/eaaa3ca))
* disable the video player cue points plugin by default ([307b51a](https://github.com/bolt-design-system/bolt/commit/307b51a))
* extend 'initialize_props()' to return array with default props in snake_case ([29730c2](https://github.com/bolt-design-system/bolt/commit/29730c2))
* first round of ratio component jest tests ([c17a6b2](https://github.com/bolt-design-system/bolt/commit/c17a6b2))
* force icons to be visible at smaller layout sizes ([22f199a](https://github.com/bolt-design-system/bolt/commit/22f199a))
* fully support "ratio" prop in image Twig template ([f1b2e6c](https://github.com/bolt-design-system/bolt/commit/f1b2e6c))
* Generating a JSON file in www/build/data/ directory for Drupal team ([a36c5f2](https://github.com/bolt-design-system/bolt/commit/a36c5f2))
* Give posibility to generate schema for new added icons ([577d9f3](https://github.com/bolt-design-system/bolt/commit/577d9f3))
* move cache set to within try block. ([fa88ef7](https://github.com/bolt-design-system/bolt/commit/fa88ef7))
* pass placeholder values, ratio data via web component props ([ad560ad](https://github.com/bolt-design-system/bolt/commit/ad560ad))
* patch Pattern Lab PHP to include a new --data-only CLI config option to export the global PL data available (ex. nav URLs) without having to do a full PL build ([51cd6e9](https://github.com/bolt-design-system/bolt/commit/51cd6e9))
* port over + upgrade yeoman generator for consistently and easily spinning up new Bolt components + auto updating the related config files ([b93426c](https://github.com/bolt-design-system/bolt/commit/b93426c))
* port over deploy script updates from master ([0cf50d9](https://github.com/bolt-design-system/bolt/commit/0cf50d9))
* remove 'name' from schema props ([f89aee4](https://github.com/bolt-design-system/bolt/commit/f89aee4))
* remove bolt-image children on connect ([57df829](https://github.com/bolt-design-system/bolt/commit/57df829))
* remove height and width props from image web component ([ba7dfd6](https://github.com/bolt-design-system/bolt/commit/ba7dfd6))
* remove merge_attributes function ([1f70798](https://github.com/bolt-design-system/bolt/commit/1f70798))
* remove twig blocks completely ([089cd05](https://github.com/bolt-design-system/bolt/commit/089cd05))
* rename noUseAspectRatio to no_ratio, update logic ([9b7191b](https://github.com/bolt-design-system/bolt/commit/9b7191b))
* render image template every time, do not keep initial HTML ([101e177](https://github.com/bolt-design-system/bolt/commit/101e177))
* reorganizing dev-specific docs site files + adding docs on server-side rendering ([2c2b58c](https://github.com/bolt-design-system/bolt/commit/2c2b58c))
* rework 'initialize_props' into 'initialize' which returns both props and data ([1e559de](https://github.com/bolt-design-system/bolt/commit/1e559de))
* rework buildArrayProps function, only check top-level schema props, auto-convert name to kebab (WIP) ([013c527](https://github.com/bolt-design-system/bolt/commit/013c527))
* rework merge_attributes function into initialize_props which uses _context and returns array of allowed props ([dc0ee4e](https://github.com/bolt-design-system/bolt/commit/dc0ee4e))
* setup execAndReport ([6c82792](https://github.com/bolt-design-system/bolt/commit/6c82792))
* setup unit test report; consolidating travis jobs ([aef6ab3](https://github.com/bolt-design-system/bolt/commit/aef6ab3))
* show image fallback if lazyload is true ([5e3c3bd](https://github.com/bolt-design-system/bolt/commit/5e3c3bd))
* Simplifies and conslidates functinal testing steps using tables ([875f76b](https://github.com/bolt-design-system/bolt/commit/875f76b))
* skip ratio if 'cover' attribute is true ([d03a9c7](https://github.com/bolt-design-system/bolt/commit/d03a9c7))
* testing lazySizes options, commented out ([5467c4d](https://github.com/bolt-design-system/bolt/commit/5467c4d))
* update Bolt build config to add support for extending / modifying the default Webpack config generated ([b283134](https://github.com/bolt-design-system/bolt/commit/b283134))
* update Drupal Lab template to use the Navbar component ([5cabdd1](https://github.com/bolt-design-system/bolt/commit/5cabdd1))
* update form component to allow the form input icon size to be optionally adjusted in size ([da0b42a](https://github.com/bolt-design-system/bolt/commit/da0b42a))
* update gcd twig function with type check ([fa6d8c9](https://github.com/bolt-design-system/bolt/commit/fa6d8c9))
* update image JS to match latest component patterns, testing basic use cases, WIP ([5327f3d](https://github.com/bolt-design-system/bolt/commit/5327f3d))
* update Jest to automatically transpile ES6 code (via Babel) to allow component tests to use modern JS libraries ([72be039](https://github.com/bolt-design-system/bolt/commit/72be039))
* update navbar template used on docs site global header + update .boltrc config ([7e0b5fa](https://github.com/bolt-design-system/bolt/commit/7e0b5fa))
* update placeholder logic to include 'cover' ([0da2c6e](https://github.com/bolt-design-system/bolt/commit/0da2c6e))
* update ratio component tests to check for css var and shadow dom variations ([eea7f71](https://github.com/bolt-design-system/bolt/commit/eea7f71))
* **@bolt/components-icons:** cleaning code ([28d2e00](https://github.com/bolt-design-system/bolt/commit/28d2e00))
* upgrade Jest to automatically polyfill the testing environment in order to use helper libraries for testing web components ([3eb8345](https://github.com/bolt-design-system/bolt/commit/3eb8345))
* **@bolt/components-icons:** cleaning files after test are done ([478ba17](https://github.com/bolt-design-system/bolt/commit/478ba17))
* **@bolt/website,@bolt/build-tools:** add posibility to add external icons to be rendered by icon t ([89a7061](https://github.com/bolt-design-system/bolt/commit/89a7061))
* **@bolt/website,@bolt/build-tools,@bolt/components-icons:** updating configuration and fix issue w ([82a5686](https://github.com/bolt-design-system/bolt/commit/82a5686))
* **@bolt/website,@bolt/components-chip:** create web component for bolt-chip component ([6d1ae09](https://github.com/bolt-design-system/bolt/commit/6d1ae09))
* **@bolt/website,@bolt/components-chip-list:** update documentation and change to bolt-list is used ([e7185a8](https://github.com/bolt-design-system/bolt/commit/e7185a8))
* **@bolt/website,@bolt/components-chip,@bolt/core:** fixing all issue pointed by Mike and move vali ([51a4142](https://github.com/bolt-design-system/bolt/commit/51a4142))
* **Add some test and spanshots:** add some JEST test ([bcf8a8a](https://github.com/bolt-design-system/bolt/commit/bcf8a8a))
* **Add testing readme files:** add testing readme files ([a8a10c0](https://github.com/bolt-design-system/bolt/commit/a8a10c0)), closes [#948](https://github.com/bolt-design-system/bolt/issues/948) [#949](https://github.com/bolt-design-system/bolt/issues/949)
* **Adding test and documentation to bolt-ol and bolt-ul component:** adding test and documentation ([f75206b](https://github.com/bolt-design-system/bolt/commit/f75206b))
* wire up button component to include VRT, web component tests, update Twig renderer calls to compile even faster ([4b34184](https://github.com/bolt-design-system/bolt/commit/4b34184))
* **website, twig renderer, component explorer:** update the Twig Renderer to support keepAlive ([470f7af](https://github.com/bolt-design-system/bolt/commit/470f7af))
* wire up server side rendering process to core-php + add logic to the bolt text and button components to handle the differences in rendering ([752c0df](https://github.com/bolt-design-system/bolt/commit/752c0df))
* wire up ssr-server POC for handling SSR requests ([5c24e5a](https://github.com/bolt-design-system/bolt/commit/5c24e5a))



# [2.3.0-rc.0](https://github.com/bolt-design-system/bolt/compare/v2.2.2...v2.3.0-rc.0) (2019-01-08)


### Bug Fixes

* add error catcher to bash getLatestDeploy ([a0935cf](https://github.com/bolt-design-system/bolt/commit/a0935cf))
* address circular dependency loop between bolt/global and the new standalone bolt-ratio component ([0ce8ba6](https://github.com/bolt-design-system/bolt/commit/0ce8ba6))
* adjust logic grabbing latest Bolt release versions + update file cache ([cbb4ffc](https://github.com/bolt-design-system/bolt/commit/cbb4ffc))
* fix local Bolt package versions ([f1a4647](https://github.com/bolt-design-system/bolt/commit/f1a4647))
* linting js ([fd11c79](https://github.com/bolt-design-system/bolt/commit/fd11c79))
* remove the <bolt-video> component's "v" HTML attribute to prevent false Jest snapshot errors when releasing new versions of Bolt ([f2df029](https://github.com/bolt-design-system/bolt/commit/f2df029))
* update video component Jest snapshots to not include version info as an HTML attribute ([fc09b62](https://github.com/bolt-design-system/bolt/commit/fc09b62))


### Features

* add get-latest-deploy script ([1817107](https://github.com/bolt-design-system/bolt/commit/1817107))



## [2.2.2](https://github.com/bolt-design-system/bolt/compare/v2.2.1...v2.2.2) (2019-01-07)


### Bug Fixes

* add ajv to core package.json ([74322ea](https://github.com/bolt-design-system/bolt/commit/74322ea))
* add missing deps causing eslint check to fail ([df4596b](https://github.com/bolt-design-system/bolt/commit/df4596b))
* add missing redux thunk package ([f7e2e95](https://github.com/bolt-design-system/bolt/commit/f7e2e95))
* add webkit appearance to reset mixin ([ae012a4](https://github.com/bolt-design-system/bolt/commit/ae012a4))
* auto-strip the Drupal 8 attributes object from schema to fix JSON Schema Form errors ([fb7c04e](https://github.com/bolt-design-system/bolt/commit/fb7c04e))
* broken image paths ([9e7864d](https://github.com/bolt-design-system/bolt/commit/9e7864d))
* Clean code and fix some issues on twig template ([42d8546](https://github.com/bolt-design-system/bolt/commit/42d8546))
* Cleanig code and add nested elements pattern to Ordered list ([3a7df9e](https://github.com/bolt-design-system/bolt/commit/3a7df9e))
* ensure the version selector exists before firing off JS logic ([086a07c](https://github.com/bolt-design-system/bolt/commit/086a07c))
* fix broken `prep` cli task ([ddd5db3](https://github.com/bolt-design-system/bolt/commit/ddd5db3))
* fix broken image paths in docs ([fcf9f83](https://github.com/bolt-design-system/bolt/commit/fcf9f83))
* fix failing jest tests + prettier issues ([333d08d](https://github.com/bolt-design-system/bolt/commit/333d08d))
* fix infinite dependency loop flagged by lerna ([12e25c2](https://github.com/bolt-design-system/bolt/commit/12e25c2))
* fix internal selector used to reset schema form ([f519bd2](https://github.com/bolt-design-system/bolt/commit/f519bd2))
* fix js typo ([48bf69a](https://github.com/bolt-design-system/bolt/commit/48bf69a))
* fix NPM dependency version mis-match across bolt components ([611ceee](https://github.com/bolt-design-system/bolt/commit/611ceee))
* hide the internal available_plugins and default_plugins video player config options from the default Pattern Lab schema table ([0a94bbe](https://github.com/bolt-design-system/bolt/commit/0a94bbe))
* Last element issue fixed ([dfc3185](https://github.com/bolt-design-system/bolt/commit/dfc3185))
* lint styles ([32c932e](https://github.com/bolt-design-system/bolt/commit/32c932e))
* lint styles ([d942d44](https://github.com/bolt-design-system/bolt/commit/d942d44))
* re-add missing dependency to image task ([65b2ad4](https://github.com/bolt-design-system/bolt/commit/65b2ad4))
* re-enable image jest test + minor cleanup ([6273315](https://github.com/bolt-design-system/bolt/commit/6273315))
* re-enable schema validation for pattern lab but keep disabled for the docs site till 500 server error is troubleshooted ([ada76ef](https://github.com/bolt-design-system/bolt/commit/ada76ef))
* remove custom element link demo — replaced by newer section in PL ([11e109a](https://github.com/bolt-design-system/bolt/commit/11e109a))
* remove extra whitespace in and around links in twig ([5288538](https://github.com/bolt-design-system/bolt/commit/5288538))
* remove line breaks before and after lit-html template tags, causes unwanted space on inline elements ([9efef74](https://github.com/bolt-design-system/bolt/commit/9efef74))
* remove line breaks from link web component examples, can cause unwanted space inside and around links ([3e00177](https://github.com/bolt-design-system/bolt/commit/3e00177))
* remove reference to specific Bolt version in the <bolt-video> snapshot tests ([40e2351](https://github.com/bolt-design-system/bolt/commit/40e2351))
* remove unneeded rendered() method ([d1e940d](https://github.com/bolt-design-system/bolt/commit/d1e940d))
* remove unused 'content' prop in render ([ce16411](https://github.com/bolt-design-system/bolt/commit/ce16411))
* remove webkit appearance from custom element ([5533943](https://github.com/bolt-design-system/bolt/commit/5533943))
* remove whitespace to fix prettier issue ([e165e78](https://github.com/bolt-design-system/bolt/commit/e165e78))
* revert link demo in PL + fix image path ([8a2e040](https://github.com/bolt-design-system/bolt/commit/8a2e040))
* revert some of the updates to the image processing task + fix re-writing image originals on the file system; fixes problem with generated image paths + inconsistently rendered jest tests ([be5d1fd](https://github.com/bolt-design-system/bolt/commit/be5d1fd))
* temporarily disable read-only-git-repos task in Travis ([4eff88b](https://github.com/bolt-design-system/bolt/commit/4eff88b))
* temporarily disable width-specific utility class demo till divide by zero issue is fixed ([0c19959](https://github.com/bolt-design-system/bolt/commit/0c19959))
* typo ([9e01fb5](https://github.com/bolt-design-system/bolt/commit/9e01fb5))
* update image jest test with higher resolution image to test that the image srcset functionality is working properly + update jest snapshot results ([453effb](https://github.com/bolt-design-system/bolt/commit/453effb))
* Update OL element ([cca8460](https://github.com/bolt-design-system/bolt/commit/cca8460))
* update path to point to correctly point to lerna.json ([91098ed](https://github.com/bolt-design-system/bolt/commit/91098ed))
* update social share plugin check + clean up inline plugin script ([f656740](https://github.com/bolt-design-system/bolt/commit/f656740))
* update the new replace-with-grandchildren element to use the native browser connectedCallback to work with similar updates made to the replace-with-children element ([b478aef](https://github.com/bolt-design-system/bolt/commit/b478aef))
* update Travis script for handling read only git repo updates ([0a7233f](https://github.com/bolt-design-system/bolt/commit/0a7233f))
* updating image test fixtures + updating image build task to always generate the full set of image sizes for Jest snapshot tests ([0b0bb26](https://github.com/bolt-design-system/bolt/commit/0b0bb26))
* updating schema form + temporarily disabling lang settings to work with component previews in Pattern Lab; updating CORS settings ([bf6795e](https://github.com/bolt-design-system/bolt/commit/bf6795e))


### Features

* add 'shallow' argument to convertInitialTags ([5eb8a29](https://github.com/bolt-design-system/bolt/commit/5eb8a29))
* add bolt-action class with shared link and button parts ([ad9cea1](https://github.com/bolt-design-system/bolt/commit/ad9cea1))
* add commitizen + commit lint support + wire up to husky commit hooks ([67905fe](https://github.com/bolt-design-system/bolt/commit/67905fe))
* add font-display swap to existing [@font-face](https://github.com/font-face) stack; part of ongoing perf improvements ([b1e37b3](https://github.com/bolt-design-system/bolt/commit/b1e37b3))
* add getComponentRootElement function to utils ([3bea59e](https://github.com/bolt-design-system/bolt/commit/3bea59e))
* add jest snapshot formatter to help normalize whitespace + generate better diffs in the console ([659f0d4](https://github.com/bolt-design-system/bolt/commit/659f0d4))
* add missing features to web component implementation of blockquote ([149695f](https://github.com/bolt-design-system/bolt/commit/149695f))
* add moveChildrenToRoot option to decorator ([7a218d7](https://github.com/bolt-design-system/bolt/commit/7a218d7))
* Add nesting to the twig ol and ul template ([995a9c2](https://github.com/bolt-design-system/bolt/commit/995a9c2))
* add slotted styles, remove attribute selectors ([b82338b](https://github.com/bolt-design-system/bolt/commit/b82338b))
* add the initial verdaccio config + setup work for upcoming release testing work ([6ba3dd8](https://github.com/bolt-design-system/bolt/commit/6ba3dd8))
* add utility functions to help check if a file or directory already exists ([45db67c](https://github.com/bolt-design-system/bolt/commit/45db67c))
* add validateProps method to bolt-base class ([497d0d2](https://github.com/bolt-design-system/bolt/commit/497d0d2))
* Applaying Salems aproach to my code ([29251ca](https://github.com/bolt-design-system/bolt/commit/29251ca))
* auto-pause the video + open in a new tab when interacting with cue point ctas ([383673b](https://github.com/bolt-design-system/bolt/commit/383673b))
* do not set unnecessary props on twig generated blockquotes ([a9b2bbe](https://github.com/bolt-design-system/bolt/commit/a9b2bbe))
* import missing styles needed for twig templates ([8603947](https://github.com/bolt-design-system/bolt/commit/8603947))
* pass validated size prop ([28131f0](https://github.com/bolt-design-system/bolt/commit/28131f0))
* re-enable husky git hooks to lint code automatically ([2d87b6a](https://github.com/bolt-design-system/bolt/commit/2d87b6a))
* remove 'content' prop from blockquote web component, use validateProps method on base class ([93bad4b](https://github.com/bolt-design-system/bolt/commit/93bad4b))
* **server:** add needed custom routes/redirects for express server ([d67afd8](https://github.com/bolt-design-system/bolt/commit/d67afd8))
* switch link and button to extend bolt-action, remove parts no longer needed ([2826575](https://github.com/bolt-design-system/bolt/commit/2826575))
* temporarily set lazyload to false, does not work yet in shadow dom ([7e4e788](https://github.com/bolt-design-system/bolt/commit/7e4e788))
* update component docs template in Pattern Lab to include a proper intro section for the component explorer UI; add pre-rendered HTML to help with initial page loading experience ([fefb007](https://github.com/bolt-design-system/bolt/commit/fefb007))
* update lerna + add new release-specific and release candidate-specific bash scripts ([fef0b78](https://github.com/bolt-design-system/bolt/commit/fef0b78))
* update Pattern Lab custom styles to hide the docs-specific code viewer accordion ([2815cab](https://github.com/bolt-design-system/bolt/commit/2815cab))
* upgrade lit-html to latest rc version — addresses JS errors encountered with older buggy versions of lit-html directives ([56d7f4d](https://github.com/bolt-design-system/bolt/commit/56d7f4d))
* upgrade node version spelled out in .nvmrc to latest stable version ([a25bee6](https://github.com/bolt-design-system/bolt/commit/a25bee6))


### Performance Improvements

* removing unused jshint dep as it brought in phantomjs-prebuilt for no reason ([fc30d38](https://github.com/bolt-design-system/bolt/commit/fc30d38))



## [2.2.1](https://github.com/bolt-design-system/bolt/compare/v2.2.0...v2.2.1) (2018-12-17)


### Bug Fixes

* Add all languages to escaping entities ([5cf56b4](https://github.com/bolt-design-system/bolt/commit/5cf56b4))
* add full twig namespace include to fix Jest snapshot diff of image component on Travis ([f69005b](https://github.com/bolt-design-system/bolt/commit/f69005b))
* add in fix from 983 ([a8d9853](https://github.com/bolt-design-system/bolt/commit/a8d9853))
* add todo on the overlay-background config option ([e6f4acb](https://github.com/bolt-design-system/bolt/commit/e6f4acb))
* Applying all fixes from PR ([5ea6e37](https://github.com/bolt-design-system/bolt/commit/5ea6e37))
* auto-format jest snapshot test results for HTML to help prevent false failures due to formatting differences ([6346080](https://github.com/bolt-design-system/bolt/commit/6346080))
* clean up prettier issues ([34bbdac](https://github.com/bolt-design-system/bolt/commit/34bbdac))
* disable mandatory e2e testing on local push for now ([2a6ace7](https://github.com/bolt-design-system/bolt/commit/2a6ace7))
* do not apply margin when icon container has 'is-empty' class ([d90dd91](https://github.com/bolt-design-system/bolt/commit/d90dd91))
* exclude page patterns from "all" section of pattern lab ([d6a2ad9](https://github.com/bolt-design-system/bolt/commit/d6a2ad9))
* fix internal check for when a component initially renders ([302a6bb](https://github.com/bolt-design-system/bolt/commit/302a6bb))
* Fix JS lint issues ([d975e32](https://github.com/bolt-design-system/bolt/commit/d975e32))
* Fix markup when Javascript is turned off ([535ee9c](https://github.com/bolt-design-system/bolt/commit/535ee9c))
* Fix prettier issue ([2ea83cf](https://github.com/bolt-design-system/bolt/commit/2ea83cf))
* fix prettier issues ([caf0673](https://github.com/bolt-design-system/bolt/commit/caf0673))
* fix prettier issues ([5ed26db](https://github.com/bolt-design-system/bolt/commit/5ed26db))
* Fix prettier issues ([e002a2e](https://github.com/bolt-design-system/bolt/commit/e002a2e))
* fix schema validation errors ([c4381ec](https://github.com/bolt-design-system/bolt/commit/c4381ec))
* Fix theming error ([aa43672](https://github.com/bolt-design-system/bolt/commit/aa43672))
* fix typo ([70d49c0](https://github.com/bolt-design-system/bolt/commit/70d49c0))
* fix vue.js exmaple integration ([9835476](https://github.com/bolt-design-system/bolt/commit/9835476))
* fix-vertical alignment of links by setting bolt-link to "inline-block", vertical-align "bottom" ([7149e1c](https://github.com/bolt-design-system/bolt/commit/7149e1c))
* Fixing JS Lint issues ([6647cc2](https://github.com/bolt-design-system/bolt/commit/6647cc2))
* improve video player script loader — now multiple videos with different playerIds can load up side by side on the same page and work as expected ([c02f27b](https://github.com/bolt-design-system/bolt/commit/c02f27b))
* linting css ([54568e6](https://github.com/bolt-design-system/bolt/commit/54568e6))
* linting css ([4efdc0e](https://github.com/bolt-design-system/bolt/commit/4efdc0e))
* manually update npm-run-all to ensure flatmap-stream isn't included as a dependency on the release/2.x branch ([02dbed2](https://github.com/bolt-design-system/bolt/commit/02dbed2))
* Prevent escaping of special characters on scss lang ([6d5323c](https://github.com/bolt-design-system/bolt/commit/6d5323c))
* Remove border on entire list ([677dd1d](https://github.com/bolt-design-system/bolt/commit/677dd1d))
* remove browse page include ([2808d18](https://github.com/bolt-design-system/bolt/commit/2808d18))
* remove unused 'get' import ([7abb7e9](https://github.com/bolt-design-system/bolt/commit/7abb7e9))
* Remove usages of the deprecated inline property in share component ([54a26b3](https://github.com/bolt-design-system/bolt/commit/54a26b3))
* removing old code ([3f6c861](https://github.com/bolt-design-system/bolt/commit/3f6c861))
* rename bolt-unordered-list and bolt-ordered-list dependency names in Pattern Lab's package.json — fixes Travis CI build issues with the monorepo check ([bf85844](https://github.com/bolt-design-system/bolt/commit/bf85844))
* renamed doc pages ([4d01ddf](https://github.com/bolt-design-system/bolt/commit/4d01ddf))
* Resolve issue with missing padding on elements on dynamic display and separator ([e5511d3](https://github.com/bolt-design-system/bolt/commit/e5511d3))
* revert CSS ([17f414c](https://github.com/bolt-design-system/bolt/commit/17f414c))
* revert swapping out custom element polyfill (update may no longer be needed) ([7a885d9](https://github.com/bolt-design-system/bolt/commit/7a885d9))
* swap out document-register-element polyfill for custom elements with Google's custom elements polyfill; workaround to fix issue reported in BDS-840 ([6d7c973](https://github.com/bolt-design-system/bolt/commit/6d7c973))
* To nested list if is not last element will not be last prop apllied ([4c789f2](https://github.com/bolt-design-system/bolt/commit/4c789f2))
* Update accepted values for button border radius prop ([becc4d2](https://github.com/bolt-design-system/bolt/commit/becc4d2))
* update bolt-button styling defaults to not allow externally added text shadows to get used (ex. when used inside the <bolt-video> component) ([9117406](https://github.com/bolt-design-system/bolt/commit/9117406))
* Update classes when inset is true ([bf83911](https://github.com/bolt-design-system/bolt/commit/bf83911))
* update demo path ([9616321](https://github.com/bolt-design-system/bolt/commit/9616321))
* Update displaing flex on no isset elements ([8fff83a](https://github.com/bolt-design-system/bolt/commit/8fff83a))
* Update documentation and web-component behavior ([aea4d92](https://github.com/bolt-design-system/bolt/commit/aea4d92))
* update jest snapshots for the Bolt video player ([a78110b](https://github.com/bolt-design-system/bolt/commit/a78110b))
* Update logic andstyling of li elements ([fb8ccda](https://github.com/bolt-design-system/bolt/commit/fb8ccda))
* update now.sh deploy script ([6b7d222](https://github.com/bolt-design-system/bolt/commit/6b7d222))
* Update schema syntax when multiple props are deprecated ([da29752](https://github.com/bolt-design-system/bolt/commit/da29752))
* update stylelint properties order ([9405599](https://github.com/bolt-design-system/bolt/commit/9405599))
* update table styles to fix theming issue when build is compiled for production ([41c5c28](https://github.com/bolt-design-system/bolt/commit/41c5c28))
* update the bolt site’s .boltrc config to use the updated bolt-ol and bolt-ul package names ([00a58e5](https://github.com/bolt-design-system/bolt/commit/00a58e5))
* update ul and ol package names to fix monorepo check ([26ce633](https://github.com/bolt-design-system/bolt/commit/26ce633))
* Update yarn.lock ([7fd6026](https://github.com/bolt-design-system/bolt/commit/7fd6026))
* use 'src' not 'placeholderSrc' in placeholder noscript image ([20c8661](https://github.com/bolt-design-system/bolt/commit/20c8661))
* Use html code for displaying example ([97dc224](https://github.com/bolt-design-system/bolt/commit/97dc224))


### Features

* 1st pass building out new cue point plugin (add-on) for the <bolt-video> player ([2701c0f](https://github.com/bolt-design-system/bolt/commit/2701c0f))
* add basic examples of ckeditor 5 to patternlab ([83682c1](https://github.com/bolt-design-system/bolt/commit/83682c1))
* Add bolt-list-item component to webcomponents ([28c0cc5](https://github.com/bolt-design-system/bolt/commit/28c0cc5))
* Add border radius prop to button component ([36a822e](https://github.com/bolt-design-system/bolt/commit/36a822e))
* Add border-radius prop to button web component ([b275f3d](https://github.com/bolt-design-system/bolt/commit/b275f3d))
* add CKEditor 4 demo ([4c1f33b](https://github.com/bolt-design-system/bolt/commit/4c1f33b))
* add ckeditor styles for staging build ([4e17889](https://github.com/bolt-design-system/bolt/commit/4e17889))
* add demo pattern ([a977817](https://github.com/bolt-design-system/bolt/commit/a977817))
* add example of link in a paragraph ([8e77664](https://github.com/bolt-design-system/bolt/commit/8e77664))
* add examples of each working "heading" in the editor ([0f94100](https://github.com/bolt-design-system/bolt/commit/0f94100))
* Add flex variable to display prop ([92a9d76](https://github.com/bolt-design-system/bolt/commit/92a9d76))
* add heading configuration options to enable bolt components in editor ([59a0e7a](https://github.com/bolt-design-system/bolt/commit/59a0e7a))
* Add html code to escaped langs in code snippet component ([2e12c12](https://github.com/bolt-design-system/bolt/commit/2e12c12))
* add lit-html vs preact vs lazy-lit-element rendering performance test examples for comparison ([78a9913](https://github.com/bolt-design-system/bolt/commit/78a9913))
* add missing support for "isHeadline" to link ([c35a25b](https://github.com/bolt-design-system/bolt/commit/c35a25b))
* add new built-in methods for hiding / showing video player overlay ([b4e8d56](https://github.com/bolt-design-system/bolt/commit/b4e8d56))
* add new onLoadStart event to video player (used for new cue point plugin) ([5172188](https://github.com/bolt-design-system/bolt/commit/5172188))
* add new setup work for the video component's overlay UI ([e9f05fa](https://github.com/bolt-design-system/bolt/commit/e9f05fa))
* add page with pure bolt-link custom element examples ([34a2635](https://github.com/bolt-design-system/bolt/commit/34a2635))
* Add share_description property to bolt-video ([d33c433](https://github.com/bolt-design-system/bolt/commit/d33c433))
* add support for content and author to blockquote web component ([0a4f9d9](https://github.com/bolt-design-system/bolt/commit/0a4f9d9))
* add support for default plugins initialized with every video player instance; add new ability to declaratively enable / disable plugins to ensure the default plugins don't get in the way accidentally ([3e51afb](https://github.com/bolt-design-system/bolt/commit/3e51afb))
* add web component support to blockquote ([a1bb776](https://github.com/bolt-design-system/bolt/commit/a1bb776))
* Adding posibility to show nested code ([c8de866](https://github.com/bolt-design-system/bolt/commit/c8de866))
* begin to convert image to web component, wip ([7cd8a33](https://github.com/bolt-design-system/bolt/commit/7cd8a33))
* Convert Ordered list component to webcomponent ([08950e5](https://github.com/bolt-design-system/bolt/commit/08950e5))
* deprecate "url" in link twig template, update to schema handled [#970](https://github.com/bolt-design-system/bolt/issues/970) ([e2d69c3](https://github.com/bolt-design-system/bolt/commit/e2d69c3))
* Deprecate rounded property for button component ([ff20119](https://github.com/bolt-design-system/bolt/commit/ff20119))
* fix formatting of code examples ([9b4374c](https://github.com/bolt-design-system/bolt/commit/9b4374c))
* Fix inset prop issue ([edece6c](https://github.com/bolt-design-system/bolt/commit/edece6c))
* fixiing prettier issues ([d5c4030](https://github.com/bolt-design-system/bolt/commit/d5c4030))
* if inner anchor has no "href", set it using the component's "href" prop ([63d1ab5](https://github.com/bolt-design-system/bolt/commit/63d1ab5))
* improve new plugin system by checking to make sure the social and email plugins only get loaded once ([f05966d](https://github.com/bolt-design-system/bolt/commit/f05966d))
* initial nightwatch.js refactor work; adding support for split tests + different local and remote testing setups in the package.json file ([a8cf89f](https://github.com/bolt-design-system/bolt/commit/a8cf89f))
* Make video share text translatable by default when using twig ([ea1c5d6](https://github.com/bolt-design-system/bolt/commit/ea1c5d6))
* Prepration to add display: flex to ([0e3dcb8](https://github.com/bolt-design-system/bolt/commit/0e3dcb8))
* Refactoring code for webcomopnents ([0819e16](https://github.com/bolt-design-system/bolt/commit/0819e16))
* Remove hard-coded CSS share text and style replacement ([528e5e1](https://github.com/bolt-design-system/bolt/commit/528e5e1))
* Remove unused "none" option for border_radius prop ([97c6006](https://github.com/bolt-design-system/bolt/commit/97c6006))
* Rename <remove-html-tag> to <replace-with-grandchildren> and moving list item to separate twig file ([b14fadc](https://github.com/bolt-design-system/bolt/commit/b14fadc))
* replace "url" prop with "href" in JS, render anchor even if not "hasHref" ([5f8f6e3](https://github.com/bolt-design-system/bolt/commit/5f8f6e3))
* revert "href" back to "url" in link component ([5f970c2](https://github.com/bolt-design-system/bolt/commit/5f970c2))
* update global click handler util to support methods on the window in addition to methods on other elements like before ([7e8a511](https://github.com/bolt-design-system/bolt/commit/7e8a511))
* update image schema with noLazyload for web component ([31fb142](https://github.com/bolt-design-system/bolt/commit/31fb142))
* **build-tools:** setting up API endpoint on server ([ae5bc5c](https://github.com/bolt-design-system/bolt/commit/ae5bc5c))



# [2.2.0](https://github.com/bolt-design-system/bolt/compare/v2.2.0-rc.1...v2.2.0) (2018-11-18)


### Bug Fixes

* clockwise direction order ([9e4acab](https://github.com/bolt-design-system/bolt/commit/9e4acab))
* re-organize mockup pages ([bc87567](https://github.com/bolt-design-system/bolt/commit/bc87567))
* re-organized based on feedback ([821a169](https://github.com/bolt-design-system/bolt/commit/821a169))
* remove line-height from font ([c95f08d](https://github.com/bolt-design-system/bolt/commit/c95f08d))
* temporarily disable HTML beautify patch as temp workaround to address PHP memory issues ([18aa372](https://github.com/bolt-design-system/bolt/commit/18aa372))
* test fixing now.sh Pattern Lab-related deploy issues via specifying a version in the now.sh config ([645fbb8](https://github.com/bolt-design-system/bolt/commit/645fbb8))
* update button component observer to always make sure a mutation observer exists before trying to remove ([c6322a7](https://github.com/bolt-design-system/bolt/commit/c6322a7))
* update dropdown component to use lit-html render method ([6ecfa78](https://github.com/bolt-design-system/bolt/commit/6ecfa78))
* update max memory for Pattern Lab PHP generation command — testing fix for PL not compiling as expected. ([3d597f8](https://github.com/bolt-design-system/bolt/commit/3d597f8))
* update Pattern Lab head include to use a modified version of loadCSS; fixes existing infinite loading issue in IE 11 ([79d655c](https://github.com/bolt-design-system/bolt/commit/79d655c))
* update theme Sass partial to include bolt core — necessary for importing into Shadow DOM-rendered compoent ([468dca3](https://github.com/bolt-design-system/bolt/commit/468dca3))


### Features

* add context provider / subscriber pattern to Bolt core. Allows for parent elements to provide access to certain props + alert subscribing children when those props have changed. ([1497841](https://github.com/bolt-design-system/bolt/commit/1497841))
* add test case HTML examples for the button component ([80ae633](https://github.com/bolt-design-system/bolt/commit/80ae633))
* update build process to automatically skip over the check for all available Bolt versions — speeds up initial boot up process when doing local dev work ([d32bc2e](https://github.com/bolt-design-system/bolt/commit/d32bc2e))



# [2.2.0-rc.1](https://github.com/bolt-design-system/bolt/compare/v2.1.6...v2.2.0-rc.1) (2018-11-07)


### Bug Fixes

* add bolt ratio dependency to <bolt-image> ([26386b1](https://github.com/bolt-design-system/bolt/commit/26386b1))
* Add simple button for forms ([8c7c944](https://github.com/bolt-design-system/bolt/commit/8c7c944))
* auto-fix prettier issues ([6abd0d2](https://github.com/bolt-design-system/bolt/commit/6abd0d2))
* Do not render bolt-nav-priority if links array is empty ([4b97af6](https://github.com/bolt-design-system/bolt/commit/4b97af6))
* filter icon ([fe21c95](https://github.com/bolt-design-system/bolt/commit/fe21c95))
* fix issue with recent Webpack build updates causing build errors to not be output when the Bolt build tools verbosity is set to 1 ([56e74b5](https://github.com/bolt-design-system/bolt/commit/56e74b5))
* fix typo in bolt dependency name ([eb6b55d](https://github.com/bolt-design-system/bolt/commit/eb6b55d))
* flx linting issues ([b7c30d7](https://github.com/bolt-design-system/bolt/commit/b7c30d7))
* re-save icons without masking ([c41b92f](https://github.com/bolt-design-system/bolt/commit/c41b92f))
* Remove unnecessary card theming ([daf2c7f](https://github.com/bolt-design-system/bolt/commit/daf2c7f))
* search field ([88aadc4](https://github.com/bolt-design-system/bolt/commit/88aadc4))
* Specify color for inline label ([0a0e2b6](https://github.com/bolt-design-system/bolt/commit/0a0e2b6))
* typo in twig ([b5418ff](https://github.com/bolt-design-system/bolt/commit/b5418ff))
* update input field font size ([06f4a57](https://github.com/bolt-design-system/bolt/commit/06f4a57))
* update native shim polyfill path for ES6-supporting browsers ([933a1fc](https://github.com/bolt-design-system/bolt/commit/933a1fc))


### Features

* add Express server for hosting static file builds ([20cd949](https://github.com/bolt-design-system/bolt/commit/20cd949))
* Add opacity settings ([65cba5b](https://github.com/bolt-design-system/bolt/commit/65cba5b))
* Add opacity tools (function and mixin) based on opacity settings ([74a8fec](https://github.com/bolt-design-system/bolt/commit/74a8fec))
* update Bolt version selector to open up in a new window if the CMD key is pressed down ([5386ea4](https://github.com/bolt-design-system/bolt/commit/5386ea4))
* Update opacity utilities to match new opacity settings ([42fca70](https://github.com/bolt-design-system/bolt/commit/42fca70))



## [2.1.6](https://github.com/bolt-design-system/bolt/compare/v2.1.5...v2.1.6) (2018-10-23)



## [2.1.5](https://github.com/bolt-design-system/bolt/compare/v2.1.4...v2.1.5) (2018-10-23)


### Bug Fixes

* adding align prop ([58ec4dd](https://github.com/bolt-design-system/bolt/commit/58ec4dd))
* comment and code clean up ([5e0e559](https://github.com/bolt-design-system/bolt/commit/5e0e559))
* enable item to pass more freeform data ([d10c58e](https://github.com/bolt-design-system/bolt/commit/d10c58e))
* fix eslint and prettier errors ([b3019ce](https://github.com/bolt-design-system/bolt/commit/b3019ce))
* fix long-standing issue with static docs site not recompiling when files have changed (while in watch mode); improve static site build reliability ([5928ee7](https://github.com/bolt-design-system/bolt/commit/5928ee7))
* fix prettier errors ([04094f9](https://github.com/bolt-design-system/bolt/commit/04094f9))
* fix several meta tag content issues with the docs and Pattern Lab sites ([a06be29](https://github.com/bolt-design-system/bolt/commit/a06be29))
* making sure all display options can interact nicely with other props ([5c65522](https://github.com/bolt-design-system/bolt/commit/5c65522))
* more edge case stylings ([dadfb27](https://github.com/bolt-design-system/bolt/commit/dadfb27))
* Prevent double rendering of legacy band content ([c650e29](https://github.com/bolt-design-system/bolt/commit/c650e29))
* remove unsupported justify-content ([94134d5](https://github.com/bolt-design-system/bolt/commit/94134d5))
* remove unused include from docs ([cb0ce93](https://github.com/bolt-design-system/bolt/commit/cb0ce93))
* revert flex display ([f32629d](https://github.com/bolt-design-system/bolt/commit/f32629d))
* tag docs and twig bug ([c6eaffd](https://github.com/bolt-design-system/bolt/commit/c6eaffd))
* update button component JS to call the `rendered` method on the base class ([14c89ed](https://github.com/bolt-design-system/bolt/commit/14c89ed))



## [2.1.4](https://github.com/bolt-design-system/bolt/compare/v2.1.3...v2.1.4) (2018-10-18)



## [2.1.3](https://github.com/bolt-design-system/bolt/compare/v2.1.2...v2.1.3) (2018-10-18)


### Bug Fixes

* Add IE support for row_gutter property ([4431c61](https://github.com/bolt-design-system/bolt/commit/4431c61))
* full width buttons and doc changes ([bde335c](https://github.com/bolt-design-system/bolt/commit/bde335c))
* make sure item styling doesn't trickle down in nested lists ([fa6a6c5](https://github.com/bolt-design-system/bolt/commit/fa6a6c5))
* revert auto-indenting Twig code in PL code viewer ([1bc6602](https://github.com/bolt-design-system/bolt/commit/1bc6602))



## [2.1.2](https://github.com/bolt-design-system/bolt/compare/v2.1.1...v2.1.2) (2018-10-16)


### Bug Fixes

* adjust size of CSS triangle ([9d24514](https://github.com/bolt-design-system/bolt/commit/9d24514))
* fixing lint and prettier issues ([15ed33b](https://github.com/bolt-design-system/bolt/commit/15ed33b))
* full width buttons and doc changes ([b747bac](https://github.com/bolt-design-system/bolt/commit/b747bac))
* ignore pattern-lab folder when running jest tests for now ([0bd00f8](https://github.com/bolt-design-system/bolt/commit/0bd00f8))
* sort and reorder versions using rcompare ([325877e](https://github.com/bolt-design-system/bolt/commit/325877e))


### Features

* update semver sorting logic ([7d4f5ce](https://github.com/bolt-design-system/bolt/commit/7d4f5ce))



## [2.1.1](https://github.com/bolt-design-system/bolt/compare/v2.1.0...v2.1.1) (2018-10-10)


### Bug Fixes

* fix lint issue ([0662e7e](https://github.com/bolt-design-system/bolt/commit/0662e7e))
* use bolt border radius ([a614aac](https://github.com/bolt-design-system/bolt/commit/a614aac))
* **build-tools:** restores ability to point to custom config file with --config-file ([6e6887c](https://github.com/bolt-design-system/bolt/commit/6e6887c))



# [2.1.0](https://github.com/bolt-design-system/bolt/compare/v2.1.0-beta.0...v2.1.0) (2018-10-10)


### Bug Fixes

* add default row_start config to the band component's content ([c943d55](https://github.com/bolt-design-system/bolt/commit/c943d55))
* adjust border styling so the context menu's border shows up more consistently ([b620422](https://github.com/bolt-design-system/bolt/commit/b620422))
* Allow explicit icon color attributes to work in IE ([642f556](https://github.com/bolt-design-system/bolt/commit/642f556))
* Bring back icon color CSS variables for browsers that support them ([9c90f88](https://github.com/bolt-design-system/bolt/commit/9c90f88))
* Clean up icon color CSS variables ([6a60978](https://github.com/bolt-design-system/bolt/commit/6a60978))
* clean up tabs / modal styling for better responsible behavior + less hacks required ([f5f94b4](https://github.com/bolt-design-system/bolt/commit/f5f94b4))
* Fix icon color CSS variables support for modern browsers ([462b846](https://github.com/bolt-design-system/bolt/commit/462b846))
* fix missing background color from dropdown nav ([ec936ea](https://github.com/bolt-design-system/bolt/commit/ec936ea))
* fix prettier issues ([40db03f](https://github.com/bolt-design-system/bolt/commit/40db03f))
* fix typo in comment ([564c776](https://github.com/bolt-design-system/bolt/commit/564c776))
* fixing CSS var syntax ([d2bc3d7](https://github.com/bolt-design-system/bolt/commit/d2bc3d7))
* fixing page scrolling behavior + IE 11 layout issue ([a684a41](https://github.com/bolt-design-system/bolt/commit/a684a41))
* misc small Pattern Lab UI bug fixes uncovered in testing things out for the next release ([b9cb636](https://github.com/bolt-design-system/bolt/commit/b9cb636))
* remove default search styling from Safari, hide search clear icon in IE 11 + tweak the breakpoint when the Search component's font size reduces ([fd499d5](https://github.com/bolt-design-system/bolt/commit/fd499d5))
* remove old styling clashing with nav background color ([4fc19c9](https://github.com/bolt-design-system/bolt/commit/4fc19c9))
* remove old typeahead styling — particularly visible on Safari ([4ba33b6](https://github.com/bolt-design-system/bolt/commit/4ba33b6))
* update PL grid + band demo that defines all content in the items array ([f45c0a0](https://github.com/bolt-design-system/bolt/commit/f45c0a0))
* update the viewport CSS logic to behave the same when the sidebar layout is used — fixes issue with a slight overflow when resizing the PL iframe to full and the sidebar layout is used ([9a4decf](https://github.com/bolt-design-system/bolt/commit/9a4decf))
* updating peer dependency versions in the band and search filter components ([e960687](https://github.com/bolt-design-system/bolt/commit/e960687))
* workaround to the demo for action block border variations not showing up in Pattern Lab ([48eb281](https://github.com/bolt-design-system/bolt/commit/48eb281))



# [2.1.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v2.0.0...v2.1.0-beta.0) (2018-10-05)


### Bug Fixes

* Adjust demo to not use deprecated iconName value (WWWD-2642) ([c806032](https://github.com/bolt-design-system/bolt/commit/c806032))
* Allow any class not starting with "c-bolt-" in button component ([2d66207](https://github.com/bolt-design-system/bolt/commit/2d66207))
* clarify instructions in schema ([821459e](https://github.com/bolt-design-system/bolt/commit/821459e))
* Fix icon z-index issue (WWWD-2642) ([48b9fc1](https://github.com/bolt-design-system/bolt/commit/48b9fc1))
* fix largest scrolling and overflow issues + start to clean up accordion behavior across different UI variations ([310109c](https://github.com/bolt-design-system/bolt/commit/310109c))
* fix lint issues ([8e2022d](https://github.com/bolt-design-system/bolt/commit/8e2022d))
* fix lint issues ([d83fdc7](https://github.com/bolt-design-system/bolt/commit/d83fdc7))
* fix scrolling issues with sidebar layout when nested nav sections are open ([1a7eda9](https://github.com/bolt-design-system/bolt/commit/1a7eda9))
* mark patternlab uikit as private ([8e50a8f](https://github.com/bolt-design-system/bolt/commit/8e50a8f))
* re-add visually hidden class to button JS rendering ([23fa7ff](https://github.com/bolt-design-system/bolt/commit/23fa7ff))
* refactor search to use react autosuggest library due to more consistent behavior + library being better maintained ([8812ae5](https://github.com/bolt-design-system/bolt/commit/8812ae5))
* remove currently unused commitizen package.json config ([d174d72](https://github.com/bolt-design-system/bolt/commit/d174d72))
* remove snyk check for now -- causing publishing issues ([bcf7e6b](https://github.com/bolt-design-system/bolt/commit/bcf7e6b))
* rowspan styles ([1b67b0b](https://github.com/bolt-design-system/bolt/commit/1b67b0b))
* **build-tools:** temp fix for unfinishing build tasks ([da59b0e](https://github.com/bolt-design-system/bolt/commit/da59b0e))
* **build-tools:** using cosmicconfig all the time ([294a1e0](https://github.com/bolt-design-system/bolt/commit/294a1e0))
* update example page template to use updated Bolt v1.x namespace syntax ([8a1403c](https://github.com/bolt-design-system/bolt/commit/8a1403c))
* update jest config to ignore bolt button component test prep ([2837189](https://github.com/bolt-design-system/bolt/commit/2837189))
* update jest snapshot tests based on expected changes ([d8137d1](https://github.com/bolt-design-system/bolt/commit/d8137d1))
* update test config to jest.config.js file ([64d830c](https://github.com/bolt-design-system/bolt/commit/64d830c))
* updating button component Sass order so the latest positioning syntax comes after the older syntax ([175ada2](https://github.com/bolt-design-system/bolt/commit/175ada2))


### Features

* **twig-renderer:** creates @bolt/twig-renderer for rendering individual Twig components ([277b7df](https://github.com/bolt-design-system/bolt/commit/277b7df))
* prep for writing web component tests ([53020be](https://github.com/bolt-design-system/bolt/commit/53020be))
* wire up button component as a new paragraph type in Drupal Lab ([70910aa](https://github.com/bolt-design-system/bolt/commit/70910aa))


### Performance Improvements

* **twig-renderer:** improving speed of twig-renderer ([0e3b44f](https://github.com/bolt-design-system/bolt/commit/0e3b44f))



# [2.0.0](https://github.com/bolt-design-system/bolt/compare/v2.0.0-beta.3...v2.0.0) (2018-09-27)


### Bug Fixes

* adding missing dependencies to the docs site -- fixes issue that was causing the site to fail to compile ([2ddd238](https://github.com/bolt-design-system/bolt/commit/2ddd238))
* adding transition to links ([f315ddc](https://github.com/bolt-design-system/bolt/commit/f315ddc))
* Fix icon color in Edge ([b860c41](https://github.com/bolt-design-system/bolt/commit/b860c41))
* misc add missing row_gutter prop to band component; fix default band row_gutter behavior (swapped the field names); fixed minor navbar vertical spacing issue found in compressed version of the build ([957d644](https://github.com/bolt-design-system/bolt/commit/957d644))
* more clean up ([6a7aff7](https://github.com/bolt-design-system/bolt/commit/6a7aff7))
* remove inline prop from share component examples ([1bbbec7](https://github.com/bolt-design-system/bolt/commit/1bbbec7))
* Remove invalid color CSS ([945293e](https://github.com/bolt-design-system/bolt/commit/945293e))
* remove margin overflow ([8a427f4](https://github.com/bolt-design-system/bolt/commit/8a427f4))
* update composer to remove references to uikit's now non-existent composer.json config file ([aa65314](https://github.com/bolt-design-system/bolt/commit/aa65314))
* update docs for new grid + updated band components ([7e7c75f](https://github.com/bolt-design-system/bolt/commit/7e7c75f))
* update pattern lab html beautify patch to fix broken code viewer in non-production modes ([a30a0e3](https://github.com/bolt-design-system/bolt/commit/a30a0e3))
* updating example to fix schema validation errors ([eeb68bd](https://github.com/bolt-design-system/bolt/commit/eeb68bd))


### Features

* add new example of grid component usage to Pattern Lab; 1st pass building out new styles for CSS-grid based grid component, taking web component usage heavily in mind ([b3aab34](https://github.com/bolt-design-system/bolt/commit/b3aab34))



# [2.0.0-beta.3](https://github.com/bolt-design-system/bolt/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2018-09-21)


### Bug Fixes

* Fix clipboard schema required properties ([2c72d12](https://github.com/bolt-design-system/bolt/commit/2c72d12))
* remove doc page headline links overrides ([3f1d119](https://github.com/bolt-design-system/bolt/commit/3f1d119))
* Remove js that disables links to prepare for using button instead ([28dafbb](https://github.com/bolt-design-system/bolt/commit/28dafbb))
* update link colors on dark themes to be white ([989d3d2](https://github.com/bolt-design-system/bolt/commit/989d3d2))


### Features

* Set data-clipboard-text attribute internally based on 'url' param ([4488590](https://github.com/bolt-design-system/bolt/commit/4488590))



# [2.0.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v1.8.3...v2.0.0-beta.2) (2018-09-19)


### Bug Fixes

* add missing _site-head.twig file added in https://github.com/bolt-design-system/bolt/pull/866 PR ([d8b68d3](https://github.com/bolt-design-system/bolt/commit/d8b68d3))
* adding cell attributes ([0593475](https://github.com/bolt-design-system/bolt/commit/0593475))
* adding rowspan support ([ffd4525](https://github.com/bolt-design-system/bolt/commit/ffd4525))
* fixed composer install; workaround to get pl utility class docs to not error ([ca84045](https://github.com/bolt-design-system/bolt/commit/ca84045))
* fixing linting issues ([5d7af8b](https://github.com/bolt-design-system/bolt/commit/5d7af8b))
* fixing linting issues ([48b6a9e](https://github.com/bolt-design-system/bolt/commit/48b6a9e))
* manually opt out of shadow DOM encapsulation of the share component for the time being (until ongoing refactor work is wrapped up) ([2c855eb](https://github.com/bolt-design-system/bolt/commit/2c855eb))
* missing `c-bolt-button--icon-only` CSS class that doesn't appear to have ever been implemented on the Button twig template ([2013b59](https://github.com/bolt-design-system/bolt/commit/2013b59))
* patch Pattern Lab's UIKit CSS to prevent the viewport `ish` resizer from exceeding the width of the browser window. Fixes a persistent bug with the JS powering this failing to recognize screen resizes and allowing the resizer to exceed the maximum page width automatically. ([ed40bec](https://github.com/bolt-design-system/bolt/commit/ed40bec))
* remove duplicate background color on the nav priority component that had been causing issues with the IE 11 CSS Vars fallback ([f68e823](https://github.com/bolt-design-system/bolt/commit/f68e823))
* remove extra space in the button.twig's rounded attribute that gets passed along to the web component ([94cb63f](https://github.com/bolt-design-system/bolt/commit/94cb63f))
* temporarily disable new Pattern Lab utility class demos from compiling in Pattern Lab -- workaround till Twig compiling error is resolved ([7c27c2c](https://github.com/bolt-design-system/bolt/commit/7c27c2c))
* twig changes ([0773b1f](https://github.com/bolt-design-system/bolt/commit/0773b1f))
* update docs site renderer config to not touch CSS or JS included on the page ([f7cc19a](https://github.com/bolt-design-system/bolt/commit/f7cc19a))
* update docs site renderer to use a different library for handling minifying / beautifying HTML generated ([3b665d8](https://github.com/bolt-design-system/bolt/commit/3b665d8))
* update full-width variation to once again be added to the parent container as a temp workaround to how theming classes currently get added ([10e76e3](https://github.com/bolt-design-system/bolt/commit/10e76e3))
* update homepage getting started link to point to page with content ([e75a8ee](https://github.com/bolt-design-system/bolt/commit/e75a8ee))
* update icon-only logic being handled in our Twig templates ([d0c87e9](https://github.com/bolt-design-system/bolt/commit/d0c87e9))
* update manifest + shorten iOS App Title ([d129be5](https://github.com/bolt-design-system/bolt/commit/d129be5))
* update media query per code review feedback ([49a3658](https://github.com/bolt-design-system/bolt/commit/49a3658))
* update the Navbar component to better handling the "centered" layout option on smaller screens that don't support display: contents; fix IE 11 bug causing the Navbar Title to resist taking up space that's available. ([2063982](https://github.com/bolt-design-system/bolt/commit/2063982))
* update themify logic to fix colors without transparency ([d8dfa78](https://github.com/bolt-design-system/bolt/commit/d8dfa78))
* updates to fix minor issues from merge from master ([29e1c57](https://github.com/bolt-design-system/bolt/commit/29e1c57))
* updates to fix minor issues from merge from master ([fed162f](https://github.com/bolt-design-system/bolt/commit/fed162f))



## [1.8.3](https://github.com/bolt-design-system/bolt/compare/v1.8.2...v1.8.3) (2018-09-13)


### Bug Fixes

* css code cleanup ([64fb08d](https://github.com/bolt-design-system/bolt/commit/64fb08d))
* improved scrolling ([413a257](https://github.com/bolt-design-system/bolt/commit/413a257))
* prevent device viewer from overlapping bg video WWWD-2574 ([dc17285](https://github.com/bolt-design-system/bolt/commit/dc17285))


### Features

* deprecate left/right in favor of start/end button align values ([7b277c2](https://github.com/bolt-design-system/bolt/commit/7b277c2))



## [1.8.2](https://github.com/bolt-design-system/bolt/compare/v2.0.0-beta.1...v1.8.2) (2018-09-07)



# [2.0.0-beta.1](https://github.com/bolt-design-system/bolt/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-09-06)


### Bug Fixes

* Remove hard-coded band HTML on 'Press Releases' browse page too ([46e4dd0](https://github.com/bolt-design-system/bolt/commit/46e4dd0))
* Remove transform from bands (BDS-605) ([f00a5e8](https://github.com/bolt-design-system/bolt/commit/f00a5e8))
* updating build tool deps based on v2.0.0-beta.0 testing ([2e4bce5](https://github.com/bolt-design-system/bolt/commit/2e4bce5))



# [2.0.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v1.8.1...v2.0.0-beta.0) (2018-09-05)


### Bug Fixes

* correcting row class ([385df93](https://github.com/bolt-design-system/bolt/commit/385df93))
* fix eslint issues in webpack config ([ca03baf](https://github.com/bolt-design-system/bolt/commit/ca03baf))
* fixing prettier / eslint issues with decorators next to exported Classes ([e79f9a8](https://github.com/bolt-design-system/bolt/commit/e79f9a8))
* update action block interactive states to switch out colors properly in CSS Vars fallback ([d4d09d7](https://github.com/bolt-design-system/bolt/commit/d4d09d7))
* update Base component to check for shadowDOM support + automatic fallback inside of forms when the component's internal renderRoot method fires; this ensures every component instance on the page renders to the light DOM when needed (ex. nested inside of a form), even when a component gets removed / re-added to the page ([d706cbe](https://github.com/bolt-design-system/bolt/commit/d706cbe))
* updating wire dependency to pull from @bolt/core/renderers ([2040a1d](https://github.com/bolt-design-system/bolt/commit/2040a1d))
* workaround to IE 11 flex bug causing Pattern Lab UI to collapse ([ad3088c](https://github.com/bolt-design-system/bolt/commit/ad3088c))



## [1.8.1](https://github.com/bolt-design-system/bolt/compare/v1.8.0...v1.8.1) (2018-08-31)


### Bug Fixes

* background animation transform fix ([c1b0bd2](https://github.com/bolt-design-system/bolt/commit/c1b0bd2))
* boolean statement ([1629b0a](https://github.com/bolt-design-system/bolt/commit/1629b0a))
* boolean statement default ([cfb672a](https://github.com/bolt-design-system/bolt/commit/cfb672a))
* deprecate copyToClipboard and standardize variable names ([0dbb888](https://github.com/bolt-design-system/bolt/commit/0dbb888))
* make inline the default ([46ad1d1](https://github.com/bolt-design-system/bolt/commit/46ad1d1))
* remove parentAttributes and set innerAttributes ([dc7f606](https://github.com/bolt-design-system/bolt/commit/dc7f606))
* Reset copy link in IE 11 ([87277a3](https://github.com/bolt-design-system/bolt/commit/87277a3))
* standardize twig variable names ([3119dd7](https://github.com/bolt-design-system/bolt/commit/3119dd7))



# [1.8.0](https://github.com/bolt-design-system/bolt/compare/v1.7.2...v1.8.0) (2018-08-27)


### Bug Fixes

* add missing `css` util from video component ([f596d94](https://github.com/bolt-design-system/bolt/commit/f596d94))
* add missing `css` util to video component ([cc4cc45](https://github.com/bolt-design-system/bolt/commit/cc4cc45))
* add missing Twig include ([50d3beb](https://github.com/bolt-design-system/bolt/commit/50d3beb))
* add tag prop ([fa4b11d](https://github.com/bolt-design-system/bolt/commit/fa4b11d))
* create variables to merge with ([a787d29](https://github.com/bolt-design-system/bolt/commit/a787d29))
* disable conditional console logs — Bolt core config not yet getting pulled in ([bf3e0a6](https://github.com/bolt-design-system/bolt/commit/bf3e0a6))
* fix eslint issue with import order ([4265476](https://github.com/bolt-design-system/bolt/commit/4265476))
* fix prettier issue ([f0b5a66](https://github.com/bolt-design-system/bolt/commit/f0b5a66))
* fix prettier issue ([baf5a6d](https://github.com/bolt-design-system/bolt/commit/baf5a6d))
* fix stylelint issue ([112ecd4](https://github.com/bolt-design-system/bolt/commit/112ecd4))
* fix version of search filter referenced ([ac6f753](https://github.com/bolt-design-system/bolt/commit/ac6f753))
* fixing lint issues ([f8d83ac](https://github.com/bolt-design-system/bolt/commit/f8d83ac))
* follow value of none conventions ([41c878c](https://github.com/bolt-design-system/bolt/commit/41c878c))
* get Open Sans working ([588546c](https://github.com/bolt-design-system/bolt/commit/588546c))
* inline attribute ([29a09b6](https://github.com/bolt-design-system/bolt/commit/29a09b6))
* missing comma from resolved git merge conflict ([f21e0e9](https://github.com/bolt-design-system/bolt/commit/f21e0e9))
* Prevent escaping of other patterns included in share (WWWD-2454) ([cf05b3b](https://github.com/bolt-design-system/bolt/commit/cf05b3b))
* re-fixing PL Sass import + auto-formatting Sass file ([8d2d78d](https://github.com/bolt-design-system/bolt/commit/8d2d78d))
* remove certain theme colors ([4be80f0](https://github.com/bolt-design-system/bolt/commit/4be80f0))
* remove CSS and standardize props ([1efe02f](https://github.com/bolt-design-system/bolt/commit/1efe02f))
* remove CSS override in Pattern Lab causing navbar dropdown overlap issues in Pattern Lab's view all page ([ae98645](https://github.com/bolt-design-system/bolt/commit/ae98645))
* remove duplicate dependency ([9b93fab](https://github.com/bolt-design-system/bolt/commit/9b93fab))
* remove duplicate twig namespaces from docs site .boltrc config ([2acf15f](https://github.com/bolt-design-system/bolt/commit/2acf15f))
* removing hr as the separator ([ada7e46](https://github.com/bolt-design-system/bolt/commit/ada7e46))
* revert Travis config updates for Nightwatch ([2a63e2c](https://github.com/bolt-design-system/bolt/commit/2a63e2c))
* revert updating dropdown component to lit-html syntax just yet ([cb2b803](https://github.com/bolt-design-system/bolt/commit/cb2b803))
* rework logic for separating utility classes for video with ratio ([0ec92da](https://github.com/bolt-design-system/bolt/commit/0ec92da))
* separating util classes ([ffc51c4](https://github.com/bolt-design-system/bolt/commit/ffc51c4))
* temporarily disable Twig rendering in Webpack build -- config needs more refinement based on existance of files being compiled against ([84e65d6](https://github.com/bolt-design-system/bolt/commit/84e65d6))
* test criteria typo ([be9ecd0](https://github.com/bolt-design-system/bolt/commit/be9ecd0))
* uncomment 'auto' and 'none' utility class spacing options -- fixes broken styles output in current version ([4055ac0](https://github.com/bolt-design-system/bolt/commit/4055ac0))
* update bolt-sticky to not include "display: block;" styles -- fixes issues in IE 11 with sticky fallback adding extra space otherwise ([cfa101a](https://github.com/bolt-design-system/bolt/commit/cfa101a))
* update build tools auto redirect when booting up and redirecting to a "/" start path ([c7c17c3](https://github.com/bolt-design-system/bolt/commit/c7c17c3))
* update card component to properly align button contents (needed to match the button component's align properly specified in the footer) ([7fbd43d](https://github.com/bolt-design-system/bolt/commit/7fbd43d))
* update dependency versions; revert a few build tool-specific changes that got reverted when merging in the latest from master ([d5c44fb](https://github.com/bolt-design-system/bolt/commit/d5c44fb))
* update home page test ([8abb8ed](https://github.com/bolt-design-system/bolt/commit/8abb8ed))
* update icon component schema to include new github and bolt logo icons ([bc36887](https://github.com/bolt-design-system/bolt/commit/bc36887))
* update js ([1f42fd0](https://github.com/bolt-design-system/bolt/commit/1f42fd0))
* update navlink CSS to automatically remove text-decoration styles by default ([5e9c08e](https://github.com/bolt-design-system/bolt/commit/5e9c08e))
* update nightwatch test ([316442f](https://github.com/bolt-design-system/bolt/commit/316442f))
* update Nightwatch.js E2E tests to pass with updated homepage designs ([263bb3a](https://github.com/bolt-design-system/bolt/commit/263bb3a))
* update npx command to force v0.9.x version of Nightwatch.js to run tests; consolidate Lerna packages bootstraped via yarn workspaces ([69830da](https://github.com/bolt-design-system/bolt/commit/69830da))
* update Sass to remove Sassdoc warnings ([2dbc662](https://github.com/bolt-design-system/bolt/commit/2dbc662))
* update uikit javascript to properly check if selector exists -- previous logic wasn't returning results the way it was expected to ([f453653](https://github.com/bolt-design-system/bolt/commit/f453653))
* update video component so the ID created is a valid selector + we ensure the video player is rendered first before initializing Brightcove ([0d11f5e](https://github.com/bolt-design-system/bolt/commit/0d11f5e))


### Features

* add copy-webpack-plugin to build process; add new config option to specify multiple batches of files / folders to copy over at the .boltrc config level ([d60db4c](https://github.com/bolt-design-system/bolt/commit/d60db4c))
* add new webpack-sassdoc-plugin; wire up Sassdoc build process to Webpack directly ([7c588fd](https://github.com/bolt-design-system/bolt/commit/7c588fd))
* Change link icon to check icon after successful copy ([f5b9303](https://github.com/bolt-design-system/bolt/commit/f5b9303))
* Replace link component with text for success message (BDS-554) ([d99e2cb](https://github.com/bolt-design-system/bolt/commit/d99e2cb))
* Reset copy to clipboard link after successful copy ([07fb5ba](https://github.com/bolt-design-system/bolt/commit/07fb5ba))
* update now.sh deploy script to switch all deployments moving forward to the main boltdesignsystem.com domain ([ce69d92](https://github.com/bolt-design-system/bolt/commit/ce69d92))
* Wait for outgoing transitions to finish before incoming ones ([2c5d754](https://github.com/bolt-design-system/bolt/commit/2c5d754))



## [1.7.2](https://github.com/bolt-design-system/bolt/compare/v1.7.1...v1.7.2) (2018-08-10)


### Bug Fixes

* remove the no longer required Webpack Provide plugin to no longer automatically pull in es6-promise library which had been causing JS errors in the latest version of Preact shipping. Added bonus: this is no longer required for IE 11 support either with how we've been bundling up and Polyfilling our JavaScript! ([0b9cd21](https://github.com/bolt-design-system/bolt/commit/0b9cd21))


### Features

* add lit-html as new rendering engine to formally HyperHTML (and hopefully Preact as well) ([c3b30d0](https://github.com/bolt-design-system/bolt/commit/c3b30d0))
* update Bolt Base class to now (by default) emit events when a component is initially rendered for the very first time + let external scripts know when a component has been re-rendered as well; part of the broader strategy to provide guidelines on integrating 3rd party scripts / analytics with Bolt components ([4c74c2b](https://github.com/bolt-design-system/bolt/commit/4c74c2b))



## [1.7.1](https://github.com/bolt-design-system/bolt/compare/v1.7.0...v1.7.1) (2018-08-09)


### Bug Fixes

* add missing loadCSS preload polyfill to index.twig; fix async CSS loading bug in IE11 in Pattern Lab ([5819b8f](https://github.com/bolt-design-system/bolt/commit/5819b8f))
* assets linking ([4092581](https://github.com/bolt-design-system/bolt/commit/4092581))
* fix broken CSS and JS paths on the bolt-docs site; update to reference @bolt/assets Twig namespace that's now getting defined in the bolt-site .boltrc config ([b3a21c3](https://github.com/bolt-design-system/bolt/commit/b3a21c3))
* remove pattern-lab.css ([41ff12c](https://github.com/bolt-design-system/bolt/commit/41ff12c))
* temporarily disable lang-specific config so docs homepage’s assets compile ([9aab6ab](https://github.com/bolt-design-system/bolt/commit/9aab6ab))
* update jest config -- workaround to recent JSDOM issue reported recently: https://github.com/facebook/jest/issues/6766 ([d7135f0](https://github.com/bolt-design-system/bolt/commit/d7135f0))
* update the new homepage template + existing inner page templates to all reference the build-specific CSS and JS getting generated; temporarily disable the new homepage from getting lazy-loaded CSS till Penthouse (critical CSS) is wired up ([baa8754](https://github.com/bolt-design-system/bolt/commit/baa8754))
* update webpack-serve config so local IE 11 testing works with webpack-hot-client ([17dbc38](https://github.com/bolt-design-system/bolt/commit/17dbc38))



# [1.7.0](https://github.com/bolt-design-system/bolt/compare/v1.6.8...v1.7.0) (2018-08-08)


### Bug Fixes

* add a more helpful warning message to @bolt/themify's when it encounters a missing JSON config; remove lang-specific configs for the Bolt docs site as they aren't currently used or necessary + the templates aren't currently wired up to change the filename suffix accordingly when compiling the docs site in --prod mode. ([3318998](https://github.com/bolt-design-system/bolt/commit/3318998))
* add missing url-loader to build; force yarn to pull in forked version of fast-sass-loader that properly passes along custom functions to node-sass ([5fbfa6d](https://github.com/bolt-design-system/bolt/commit/5fbfa6d))
* add shadow to video play button ([29ca733](https://github.com/bolt-design-system/bolt/commit/29ca733))
* Add translation support to search filter (BDS-437) ([ec9a878](https://github.com/bolt-design-system/bolt/commit/ec9a878))
* adding attributes to ratio wrapper ([ac2d0d4](https://github.com/bolt-design-system/bolt/commit/ac2d0d4))
* adding sassdoc dependency ([d6b1d10](https://github.com/bolt-design-system/bolt/commit/d6b1d10))
* corrected button links ([1c92b7c](https://github.com/bolt-design-system/bolt/commit/1c92b7c))
* directly reference copy to clipboard in share ([22e3c5c](https://github.com/bolt-design-system/bolt/commit/22e3c5c))
* even tighter ([0e0b3d0](https://github.com/bolt-design-system/bolt/commit/0e0b3d0))
* exclude chai tests in sass-export-data from jest testing ([ccc8420](https://github.com/bolt-design-system/bolt/commit/ccc8420))
* fix action block border css var ([f189fa2](https://github.com/bolt-design-system/bolt/commit/f189fa2))
* fix bug in async loading infinite loop in IE 11: https://github.com/filamentgroup/loadCSS/issues/262#issuecomment-366774654 ([a981ae4](https://github.com/bolt-design-system/bolt/commit/a981ae4)), closes [/github.com/filamentgroup/loadCSS/issues/262#issuecomment-366774654](https://github.com//github.com/filamentgroup/loadCSS/issues/262/issues/issuecomment-366774654)
* fix glob path to include entire 06-themes folder ([7f92885](https://github.com/bolt-design-system/bolt/commit/7f92885))
* fix linting issues ([e01df85](https://github.com/bolt-design-system/bolt/commit/e01df85))
* fix missing / closing div tag in Pattern Lab UIkit template ([ede84f1](https://github.com/bolt-design-system/bolt/commit/ede84f1))
* fix Prettier issue ([5dbbd2d](https://github.com/bolt-design-system/bolt/commit/5dbbd2d))
* fix prettier lint issues ([d294ccb](https://github.com/bolt-design-system/bolt/commit/d294ccb))
* fixing webpack watch vs serve vs build so running standalone tasks doesn't cause webpack to recompile ([3760f0e](https://github.com/bolt-design-system/bolt/commit/3760f0e))
* formatting ([7211b3b](https://github.com/bolt-design-system/bolt/commit/7211b3b))
* increase timeout time for video player test in ie 11 ([1052a6a](https://github.com/bolt-design-system/bolt/commit/1052a6a))
* packages/build-tools/.snyk & packages/build-tools/package.json to reduce vulnerabilities ([7059003](https://github.com/bolt-design-system/bolt/commit/7059003))
* Prevent error display when form blur is triggered by js (BDS-509) ([cb9171f](https://github.com/bolt-design-system/bolt/commit/cb9171f))
* re-add missing build-tools dependency ([cf6cbbe](https://github.com/bolt-design-system/bolt/commit/cf6cbbe))
* re-add missing package to yarn workspaces ([607d83c](https://github.com/bolt-design-system/bolt/commit/607d83c))
* remove globbing from docs site + temporarily remove cache busting filenames for CSS in prod mode ([1701480](https://github.com/bolt-design-system/bolt/commit/1701480))
* remove hoist flag from lerna.json config ([e726f3d](https://github.com/bolt-design-system/bolt/commit/e726f3d))
* remove image-to-ascii dependency that's tripping up the Travis build ([331543d](https://github.com/bolt-design-system/bolt/commit/331543d))
* remove redundancy of search filter panel id ([e55363a](https://github.com/bolt-design-system/bolt/commit/e55363a))
* revert Prism.js getting removed to avoid JS errors in PL getting thrown ([03812d0](https://github.com/bolt-design-system/bolt/commit/03812d0))
* revert removing parallelism cap in build tools -- still required till even better solution in @bolt/postcss-themify is figured out. ([0533474](https://github.com/bolt-design-system/bolt/commit/0533474))
* round rgb values when output as CSS vars ([4b101fd](https://github.com/bolt-design-system/bolt/commit/4b101fd))
* specify webpack-serve config info to prevent errors from getting thrown in IE 11 ([6f285bc](https://github.com/bolt-design-system/bolt/commit/6f285bc))
* tighten up content inside share dialog ([c936e92](https://github.com/bolt-design-system/bolt/commit/c936e92))
* update jest monorepo test to exclude bower_components; revert globbing package workspaces to speed up test suite ([b712a4d](https://github.com/bolt-design-system/bolt/commit/b712a4d))
* update jest monorepo test to only test against actual package.json files that exist in the codebase, ignoring anything in a node_modules folder. ([b751ad1](https://github.com/bolt-design-system/bolt/commit/b751ad1))
* update manually set css vars ([25fbfb7](https://github.com/bolt-design-system/bolt/commit/25fbfb7))
* update monorepo tests to exclude fast-sass-loader package being installed from github ([8881b0f](https://github.com/bolt-design-system/bolt/commit/8881b0f))
* update opacity logic to output correct values in CSS var fallback; update card component to use new opacity parameter in the bolt-theme function ([fcc2cff](https://github.com/bolt-design-system/bolt/commit/fcc2cff))
* update to address linting issues ([15a83fc](https://github.com/bolt-design-system/bolt/commit/15a83fc))
* update video-js Nighwatch E2E test to work better with IE 11 quirks ([ab90db8](https://github.com/bolt-design-system/bolt/commit/ab90db8))
* vertically center text ([4da8dab](https://github.com/bolt-design-system/bolt/commit/4da8dab))
* workaround to known Jest error getting thrown: https://github.com/facebook/jest/issues/6766 ([dc0a720](https://github.com/bolt-design-system/bolt/commit/dc0a720))


### Features

* 1st pass wiring up new CSS Vars loader / fallback component ([3873d63](https://github.com/bolt-design-system/bolt/commit/3873d63))
* add download sketch button ([b7a821c](https://github.com/bolt-design-system/bolt/commit/b7a821c))
* Add Github PR template ([b12d555](https://github.com/bolt-design-system/bolt/commit/b12d555))
* Remove all vertical padding on video share overlay (BDS-495) ([50e15ea](https://github.com/bolt-design-system/bolt/commit/50e15ea))



## [1.6.8](https://github.com/bolt-design-system/bolt/compare/v1.6.7...v1.6.8) (2018-07-19)


### Bug Fixes

* workaround to xxxlarge-min headline variation not calling [@bolt-font-size](https://github.com/bolt-font-size) mixin ([76e32cc](https://github.com/bolt-design-system/bolt/commit/76e32cc))



## [1.6.7](https://github.com/bolt-design-system/bolt/compare/v1.6.6...v1.6.7) (2018-07-19)


### Bug Fixes

* Fix linting error ([9b2d001](https://github.com/bolt-design-system/bolt/commit/9b2d001))



## [1.6.6](https://github.com/bolt-design-system/bolt/compare/v1.6.5...v1.6.6) (2018-07-19)


### Bug Fixes

* fix async / await in PL build config ([b7e329f](https://github.com/bolt-design-system/bolt/commit/b7e329f))
* fix lint issue in task-collection.js ([1311ef0](https://github.com/bolt-design-system/bolt/commit/1311ef0))
* fix lint issue in task-collection.js ([87dddbb](https://github.com/bolt-design-system/bolt/commit/87dddbb))
* fix prettier eslint errors ([d50dff3](https://github.com/bolt-design-system/bolt/commit/d50dff3))
* fixing async await in rendering API ([e1b55fe](https://github.com/bolt-design-system/bolt/commit/e1b55fe))
* fixing build tasks for static site ([d18277b](https://github.com/bolt-design-system/bolt/commit/d18277b))
* fixing linting errors ([197862f](https://github.com/bolt-design-system/bolt/commit/197862f))
* fixing linting rules ([529cf01](https://github.com/bolt-design-system/bolt/commit/529cf01))
* improve the root-level `clean` npm script so it always consistently works without requiring any external dependencies + no longer freezes up as expected ([f399dfc](https://github.com/bolt-design-system/bolt/commit/f399dfc))
* package.json to reduce vulnerabilities ([07ac70a](https://github.com/bolt-design-system/bolt/commit/07ac70a))
* prevent pattern lab's styleguide folder from getting wiped when the the build tools clean task is run ([3924a34](https://github.com/bolt-design-system/bolt/commit/3924a34))
* revert omitting critical font loader in local dev build ([cb4ba58](https://github.com/bolt-design-system/bolt/commit/cb4ba58))
* revert removing generic exports of preact + hyperhtml ([4ed89e1](https://github.com/bolt-design-system/bolt/commit/4ed89e1))
* revert some of the recent changes to @bolt/build-tools sh.js utility -- shell commands are still wired up to use execa under the hood however errors thrown via command line commands are now properly thrown / resolved vs hanging indefinitly ([80f4c19](https://github.com/bolt-design-system/bolt/commit/80f4c19))
* tightening up i18n flags + build vs prod vs local dev behavior ([e1ae5a7](https://github.com/bolt-design-system/bolt/commit/e1ae5a7))
* update config for missing [@pattern-lab](https://github.com/pattern-lab) twig namespaces in uikit-workshop ([2ff69d9](https://github.com/bolt-design-system/bolt/commit/2ff69d9))
* updating Webpack config logic to properly handle language-specific builds when enabled ([51eedb6](https://github.com/bolt-design-system/bolt/commit/51eedb6))


### Features

* add new 'fileExists' Twig function to core-php's 'Extras collection ([1358a91](https://github.com/bolt-design-system/bolt/commit/1358a91))
* Add support for attributes to pagination links ([4d9c1ba](https://github.com/bolt-design-system/bolt/commit/4d9c1ba))
* Add support for first and last links to pagination (BDS-452) ([ec50400](https://github.com/bolt-design-system/bolt/commit/ec50400))
* Allow href to be passed to pagination links in attributes ([2c27e74](https://github.com/bolt-design-system/bolt/commit/2c27e74))
* cross link press and media pages ([28e1c99](https://github.com/bolt-design-system/bolt/commit/28e1c99))
* finalize search pages for press and media ([a03aeec](https://github.com/bolt-design-system/bolt/commit/a03aeec))
* Hide embed code on video sharing (WWWD-2358) ([eeb733b](https://github.com/bolt-design-system/bolt/commit/eeb733b))
* Make current pagination item not a link ([c0e5690](https://github.com/bolt-design-system/bolt/commit/c0e5690))
* merge master to branch, update bolt homepage in pl ([38ca6e2](https://github.com/bolt-design-system/bolt/commit/38ca6e2))
* Reduce icon size in share overlay (WWWD-2358) ([8f2108c](https://github.com/bolt-design-system/bolt/commit/8f2108c))
* Replace "display: none" with "visually-hidden" (WWWD-2358) ([36224b3](https://github.com/bolt-design-system/bolt/commit/36224b3))
* Replace title and description with fixed text when sharing ([7766932](https://github.com/bolt-design-system/bolt/commit/7766932))
* wiring up critical fonts to behave differently in local dev vs prod mode (meant to help speed up local development) ([cc801f3](https://github.com/bolt-design-system/bolt/commit/cc801f3))


### Reverts

* undo `await` changes in serve task ([4d9180a](https://github.com/bolt-design-system/bolt/commit/4d9180a))



## [1.6.5](https://github.com/bolt-design-system/bolt/compare/v1.6.4...v1.6.5) (2018-07-13)


### Bug Fixes

* fix JS error when webpack recompiles Pattern Lab ([cad0c49](https://github.com/bolt-design-system/bolt/commit/cad0c49))
* remove WatchIgnorePlugin from build -- fixes issue with Pattern Lab-specific Sass / JS not properly triggering a Webpack rebuild (inside the 01-styleguide folder to be more specific) ([7c03f5c](https://github.com/bolt-design-system/bolt/commit/7c03f5c))
* update build tools so webpack's watch task is automatically run if webpackDevServer isn't enabled in the .boltrc config ([5affcbf](https://github.com/bolt-design-system/bolt/commit/5affcbf))
* update webpack-serve to not auto open for now to prevent two tabs from opening (one for webpack-serve + browsersync); browsersync config updates should still work as expected ([78c69b3](https://github.com/bolt-design-system/bolt/commit/78c69b3))



## [1.6.4](https://github.com/bolt-design-system/bolt/compare/v1.6.3...v1.6.4) (2018-07-12)


### Bug Fixes

* icon position ([56b2b25](https://github.com/bolt-design-system/bolt/commit/56b2b25))
* Make device viewer button size relative (BDS-454) ([09ea9c6](https://github.com/bolt-design-system/bolt/commit/09ea9c6))



## [1.6.3](https://github.com/bolt-design-system/bolt/compare/v1.6.2...v1.6.3) (2018-07-11)


### Bug Fixes

* Add missing icon parameter to button schema (BDS-477) ([ed49963](https://github.com/bolt-design-system/bolt/commit/ed49963))
* add missing open sans weight / style to critical font loader ([12d9a8a](https://github.com/bolt-design-system/bolt/commit/12d9a8a))
* add missing open sans weight / style to critical font loader ([c3d3314](https://github.com/bolt-design-system/bolt/commit/c3d3314))
* Deprecate form button in favor of bolt button (BDS-477) ([3335abb](https://github.com/bolt-design-system/bolt/commit/3335abb))
* fixed open sans font files and corrected 600 italic ([9bfbedc](https://github.com/bolt-design-system/bolt/commit/9bfbedc))
* fixed open sans font files and corrected 600 italic ([03a4045](https://github.com/bolt-design-system/bolt/commit/03a4045))
* typo in mixin ([f2fa2a7](https://github.com/bolt-design-system/bolt/commit/f2fa2a7))
* update PL config to prevent json files from getting copied over to www folder. ([516e5ac](https://github.com/bolt-design-system/bolt/commit/516e5ac))
* Various button schema fixes (BDS-477) ([8500fc5](https://github.com/bolt-design-system/bolt/commit/8500fc5))



## [1.6.2](https://github.com/bolt-design-system/bolt/compare/v1.6.0...v1.6.2) (2018-07-09)


### Bug Fixes

* add missing SVG icon to icon schema (already on master) ([da3b76c](https://github.com/bolt-design-system/bolt/commit/da3b76c))
* change load order of Pattern Lab's CSS to prevent specificity issues relating to code / syntax highlighting styles PL ships with ([52c6ffb](https://github.com/bolt-design-system/bolt/commit/52c6ffb))
* disable eslint's linebreak rules and use prettier's handling of this instead ([9371c79](https://github.com/bolt-design-system/bolt/commit/9371c79))
* disable eslint's single quotes rule to defer to prettier's more flexible single quotes linting ([d5ec341](https://github.com/bolt-design-system/bolt/commit/d5ec341))
* fix linting issues with root repo config files ([54ce167](https://github.com/bolt-design-system/bolt/commit/54ce167))
* fix remaining "rounded" button schema validation errors ([94381b2](https://github.com/bolt-design-system/bolt/commit/94381b2))
* fix remaining eslint + prettier linting rules after merging in latest from master ([c9d2abd](https://github.com/bolt-design-system/bolt/commit/c9d2abd))
* Fix schema broken when adding brand-operations icon ([a2fdeef](https://github.com/bolt-design-system/bolt/commit/a2fdeef))
* fix schema validation errors with rounded button variation ([d26d76e](https://github.com/bolt-design-system/bolt/commit/d26d76e))
* fix trailing comma ([f5a604d](https://github.com/bolt-design-system/bolt/commit/f5a604d))
* install new font files ([1e06228](https://github.com/bolt-design-system/bolt/commit/1e06228))
* install new font files ([1312732](https://github.com/bolt-design-system/bolt/commit/1312732))
* merge in PR updates from https://github.com/bolt-design-system/bolt/pull/795 ([900aaa8](https://github.com/bolt-design-system/bolt/commit/900aaa8))
* prevent title from overlapping icon in navbar (BDS-464) ([f8bc500](https://github.com/bolt-design-system/bolt/commit/f8bc500))
* Remove duplicate flex-shrink property ([e4bd7d1](https://github.com/bolt-design-system/bolt/commit/e4bd7d1))
* remove pw-site index.js accidentally re-added when merging in the latest from master ([cb34f6d](https://github.com/bolt-design-system/bolt/commit/cb34f6d))
* remove storefront.js file recently removed on master ([a714e18](https://github.com/bolt-design-system/bolt/commit/a714e18))
* update eslint + prettier config to show messages on every commit; update the default .boltrc config verbosity in PL to display eslint warnings ([2105f95](https://github.com/bolt-design-system/bolt/commit/2105f95))


### Features

* add API rendering service to build; 1st version schema form ([2534f80](https://github.com/bolt-design-system/bolt/commit/2534f80))
* add new 'hybrid' config environment which combines PL and the static site builds into one ([536317e](https://github.com/bolt-design-system/bolt/commit/536317e))
* add prettier + eslint combo config to Webpack for continuous linting ([500c0f6](https://github.com/bolt-design-system/bolt/commit/500c0f6))
* cleaning up form UI ([9ec1c82](https://github.com/bolt-design-system/bolt/commit/9ec1c82))
* port over handful of Twig filters needed so the full Drupal Twig Extensions composer extensions package isn't required ([9fa1452](https://github.com/bolt-design-system/bolt/commit/9fa1452))
* press and media example pages ([65a65a5](https://github.com/bolt-design-system/bolt/commit/65a65a5))
* press and media pages ([a61214e](https://github.com/bolt-design-system/bolt/commit/a61214e))
* update build config to set up PHP renderingService + assign an open port ([6587962](https://github.com/bolt-design-system/bolt/commit/6587962))



# [1.6.0](https://github.com/bolt-design-system/bolt/compare/v1.5.3...v1.6.0) (2018-07-04)


### Bug Fixes

* Add empty check for schema error reporting config (BDS-369) ([487899b](https://github.com/bolt-design-system/bolt/commit/487899b))
* Add extra offset to gumshoe to fix perceived bug (WWWD-2278) ([f8d6f94](https://github.com/bolt-design-system/bolt/commit/f8d6f94))
* add JS syntax highlighting to bolt-code-snippet; remove syntaxStyles from inlined CSS to sync with Sass updates made; clean out the component's innerHTML to fix cross-browser issues in FF and IE 11 ([fb6a63b](https://github.com/bolt-design-system/bolt/commit/fb6a63b))
* add missing EOL to code-snippet.scss ([8f857f4](https://github.com/bolt-design-system/bolt/commit/8f857f4))
* add missing ISSUE_TEMPLATE file ext ([88f8c96](https://github.com/bolt-design-system/bolt/commit/88f8c96))
* add shim for previousElementSibling ([580b2e2](https://github.com/bolt-design-system/bolt/commit/580b2e2))
* Add support for button align option in Safari < 11.0 (BDS-348) ([c268587](https://github.com/bolt-design-system/bolt/commit/c268587))
* disable stylelint validation on [@respond-to](https://github.com/respond-to) deprecated mixin ([8fa2a86](https://github.com/bolt-design-system/bolt/commit/8fa2a86))
* exclude uikit-workshop from eslint ([f4c8208](https://github.com/bolt-design-system/bolt/commit/f4c8208))
* exclude uikit-workshop from eslint ([8a3cdae](https://github.com/bolt-design-system/bolt/commit/8a3cdae))
* exclude uikit-workshop from stylelint ([8afedaa](https://github.com/bolt-design-system/bolt/commit/8afedaa))
* Fix all remaining validation errors (BDS-369) ([8e89a78](https://github.com/bolt-design-system/bolt/commit/8e89a78))
* Fix autoprefixer in Drupal builds (WWWD-2139) ([8123780](https://github.com/bolt-design-system/bolt/commit/8123780))
* fix docs site grid columns ([6eb035d](https://github.com/bolt-design-system/bolt/commit/6eb035d))
* fix double quoted cachebuster strings in PL footer ([1072719](https://github.com/bolt-design-system/bolt/commit/1072719))
* Fix indenting in schemas for navbar and nav-priority ([9fa97b6](https://github.com/bolt-design-system/bolt/commit/9fa97b6))
* Fix schema validation errors in Japanese homepage PL demo ([48a2be7](https://github.com/bolt-design-system/bolt/commit/48a2be7))
* fixing E2E integration test for PL ([e6016fb](https://github.com/bolt-design-system/bolt/commit/e6016fb))
* include forked version of sass-mq ([36f2584](https://github.com/bolt-design-system/bolt/commit/36f2584))
* Make "More" text in priority nav translatable ([22ae541](https://github.com/bolt-design-system/bolt/commit/22ae541))
* Make bolt-share text strings translatable (BDS-366) ([09d37f0](https://github.com/bolt-design-system/bolt/commit/09d37f0))
* make sure only webpack configs with more than 1 language get language-specific file assets emitted ([5f33093](https://github.com/bolt-design-system/bolt/commit/5f33093))
* Make sure previous and next default text are translatable (BDS-5) ([37d0c01](https://github.com/bolt-design-system/bolt/commit/37d0c01))
* making it accessible ([aaadcee](https://github.com/bolt-design-system/bolt/commit/aaadcee))
* misc fixes ([8c7d380](https://github.com/bolt-design-system/bolt/commit/8c7d380))
* remove additional cache buster strings ([608d516](https://github.com/bolt-design-system/bolt/commit/608d516))
* remove align items prop from text align util ([037fae2](https://github.com/bolt-design-system/bolt/commit/037fae2))
* remove extra favicons + fix paths; update deploy script to point at now.json config ([c65f788](https://github.com/bolt-design-system/bolt/commit/c65f788))
* remove hard-coded values on docs homepage -- workaround no longer needed ([5646c1d](https://github.com/bolt-design-system/bolt/commit/5646c1d))
* remove iframe "preload" based on testing results ([391fae1](https://github.com/bolt-design-system/bolt/commit/391fae1))
* remove justify content for alignments ([34cc899](https://github.com/bolt-design-system/bolt/commit/34cc899))
* remove one bit of the cleanup logic from the nav-priority component; throws a JS error when removed / re-added via rendering service ([17dfa74](https://github.com/bolt-design-system/bolt/commit/17dfa74))
* remove one bit of the cleanup logic from the nav-priority component; throws a JS error when removed / re-added via rendering service ([a430ea7](https://github.com/bolt-design-system/bolt/commit/a430ea7))
* remove prismjs from getting added to Pattern Lab's head to avoid conflicting styles in browsers that don't support the shadow dom ([9a50290](https://github.com/bolt-design-system/bolt/commit/9a50290))
* removing extra layer of mixin ([5441fb1](https://github.com/bolt-design-system/bolt/commit/5441fb1))
* removing redundant sass variables ([fe80116](https://github.com/bolt-design-system/bolt/commit/fe80116))
* renaming vendor folder in uikit-workshop to prevent files from being accidentally gitignored (even with local .gitignore config settings) ([8ca4aa4](https://github.com/bolt-design-system/bolt/commit/8ca4aa4))
* replace gulp-ruby-sass with gulp-sass ([31ff9e0](https://github.com/bolt-design-system/bolt/commit/31ff9e0))
* replace respond-to in pl css ([f116090](https://github.com/bolt-design-system/bolt/commit/f116090))
* retain all features of sass-mq ([6475312](https://github.com/bolt-design-system/bolt/commit/6475312))
* revert to using DOMContentLoaded to prevent PL scripts occasionally getting run out of order; tweak the band component it it doesn't render any HTML -- workaround to JS error seen in Firefox when testing ([7cbc882](https://github.com/bolt-design-system/bolt/commit/7cbc882))
* spacing fix ([8dbd2f9](https://github.com/bolt-design-system/bolt/commit/8dbd2f9))
* switching iframe loader to be a progressive enhancement ([d6627ea](https://github.com/bolt-design-system/bolt/commit/d6627ea))
* temporarily disabling async CSS loading for multi-lang builds till IE 11 is properly polyfilled ([fb80dd8](https://github.com/bolt-design-system/bolt/commit/fb80dd8))
* temporarily replace vanilla custom element w/ Twig include ([c7b59ed](https://github.com/bolt-design-system/bolt/commit/c7b59ed))
* temporary disable schema validation CLI on master branch ([b6f1d71](https://github.com/bolt-design-system/bolt/commit/b6f1d71))
* test removing yarn cache ([1ddcb84](https://github.com/bolt-design-system/bolt/commit/1ddcb84))
* update docs site sass to use new bolt-mq sass mixin ([5e34439](https://github.com/bolt-design-system/bolt/commit/5e34439))
* update E2E integration test ([3837d3b](https://github.com/bolt-design-system/bolt/commit/3837d3b))
* update monorepo pkg test ([1ff5f40](https://github.com/bolt-design-system/bolt/commit/1ff5f40))
* update now.json condfig ([b3f03be](https://github.com/bolt-design-system/bolt/commit/b3f03be))
* update path rewrites to handle favicon.ico; update public dir so locally running `serve` in the repo root works exactly as expected ([056c27c](https://github.com/bolt-design-system/bolt/commit/056c27c))
* update rendering service to always make sure the port is available ([73893d7](https://github.com/bolt-design-system/bolt/commit/73893d7))
* update stylelint validation override to use correct scss/at-mixin-pattern rule ([c8a2428](https://github.com/bolt-design-system/bolt/commit/c8a2428))


### Features

* Add configuration option for schema error reporting (BDS-369) ([facf500](https://github.com/bolt-design-system/bolt/commit/facf500))
* add new (missing) brand operations icon + update Icon component docs to include examples on customizing the different CSS Variable props available ([3acddb0](https://github.com/bolt-design-system/bolt/commit/3acddb0))
* Patch twig-tools to allow configurable schema error reporting ([41abfff](https://github.com/bolt-design-system/bolt/commit/41abfff))
* pull in the latest Pattern Lab styleguidekit + Twig templates used in PL; fix path issues w/ Now.sh deploys, misc UI issues in PL (dropdown menu scrolling bug) + update everything in PL to load asynchronously ([dfafe9a](https://github.com/bolt-design-system/bolt/commit/dfafe9a))
* Set schema error reporting to cli for pattern lab (BDS-369) ([c9b2066](https://github.com/bolt-design-system/bolt/commit/c9b2066))
* Update pagination schema to move more logic to back-end (BDS-5) ([6f0b793](https://github.com/bolt-design-system/bolt/commit/6f0b793))
* WIP bolt homepage ([58b85e3](https://github.com/bolt-design-system/bolt/commit/58b85e3))
* WIP bolt homepage ([a321d3d](https://github.com/bolt-design-system/bolt/commit/a321d3d))



## [1.5.3](https://github.com/bolt-design-system/bolt/compare/v1.5.2...v1.5.3) (2018-06-21)


### Bug Fixes

* doc styles and formats ([a6d5b22](https://github.com/bolt-design-system/bolt/commit/a6d5b22))
* fix navbar smoothscroll at xs breakpoint (BDS-396) ([65ccdc2](https://github.com/bolt-design-system/bolt/commit/65ccdc2))
* form input text size and line-height ([121cd87](https://github.com/bolt-design-system/bolt/commit/121cd87))
* word wrap and word break settings ([0e40475](https://github.com/bolt-design-system/bolt/commit/0e40475))



## [1.5.2](https://github.com/bolt-design-system/bolt/compare/v1.5.1...v1.5.2) (2018-06-19)


### Bug Fixes

* export `isValidSelector` in Bolt core ([9978b5b](https://github.com/bolt-design-system/bolt/commit/9978b5b))
* revert test swapping out image with logo component in partners-search demo page ([cf5019b](https://github.com/bolt-design-system/bolt/commit/cf5019b))


### Features

* add new helper mixin for handling default spacing and layout behavior in Bolt custom element ([a9e03da](https://github.com/bolt-design-system/bolt/commit/a9e03da))



## [1.5.1](https://github.com/bolt-design-system/bolt/compare/v1.5.0...v1.5.1) (2018-06-18)


### Bug Fixes

* add a custom event to the nav-priority component to let others know when the component is ready to go (like the nav-indicator); update nav indicator logic to listen for this even before trying to animate if the nav-priority is a nested component AND isn't yet ready to go ([275b9f1](https://github.com/bolt-design-system/bolt/commit/275b9f1))
* add better check for display: contents browser support (BDS-426) ([e47cda4](https://github.com/bolt-design-system/bolt/commit/e47cda4))
* align default ([a7adcbd](https://github.com/bolt-design-system/bolt/commit/a7adcbd))
* allow navbar title to wrap to multiple lines (BDS-424, BDS-367) ([44ee933](https://github.com/bolt-design-system/bolt/commit/44ee933))
* clean up dropdown menu custom element demo (remove dead links + add extra links to the extra long demo example) ([cb96b74](https://github.com/bolt-design-system/bolt/commit/cb96b74))
* disable context output ([8154a48](https://github.com/bolt-design-system/bolt/commit/8154a48))
* disable postbootstrap command ([0516ce6](https://github.com/bolt-design-system/bolt/commit/0516ce6))
* Do not apply scroll behavior to link with hash bang href ([a1b0de0](https://github.com/bolt-design-system/bolt/commit/a1b0de0))
* icon background color and position ([93367b6](https://github.com/bolt-design-system/bolt/commit/93367b6))
* re-enabling docs site prod build ([eed6389](https://github.com/bolt-design-system/bolt/commit/eed6389))
* re-enabling sauce_connect ([8a5a619](https://github.com/bolt-design-system/bolt/commit/8a5a619))
* remove last child's spacing ([2e0feac](https://github.com/bolt-design-system/bolt/commit/2e0feac))
* Remove navlink focus state when clicking anchor links (BDS-412) ([b5c6387](https://github.com/bolt-design-system/bolt/commit/b5c6387))
* remove vspacing prop and unnecessary doc styles ([56aa8b9](https://github.com/bolt-design-system/bolt/commit/56aa8b9))
* retest composer install ([a8d1792](https://github.com/bolt-design-system/bolt/commit/a8d1792))
* revert composer package.json update ([64f548f](https://github.com/bolt-design-system/bolt/commit/64f548f))
* schema naming change from camelCase to kabab-case ([6f6c563](https://github.com/bolt-design-system/bolt/commit/6f6c563))
* update classname in Sass to match JS classes added to template. ([5e29e65](https://github.com/bolt-design-system/bolt/commit/5e29e65))
* update dropdown menu Twig template block location so vanilla Twig embeds are still fully server-side rendered before the JS kicks in ([2eb9a15](https://github.com/bolt-design-system/bolt/commit/2eb9a15))
* update nightwatch E2E test to check the docs site homepage differently than checking to confirm PL compiled correctly ([45b7195](https://github.com/bolt-design-system/bolt/commit/45b7195))
* update priority nav logic to only show nav items that fit until it encounters one that doesn't ([6619c24](https://github.com/bolt-design-system/bolt/commit/6619c24))
* update smooth scroll library to use fork till https://github.com/cferdinandi/smooth-scroll/pull/443 is resolved ([fab341a](https://github.com/bolt-design-system/bolt/commit/fab341a))
* update smooth scroll logic to check to make sure ID's exist on the page before trying to scroll ([fd215eb](https://github.com/bolt-design-system/bolt/commit/fd215eb))
* updating docs site homepage E2E test ([57c53c4](https://github.com/bolt-design-system/bolt/commit/57c53c4))
* use improved check for "display: contents" support in nav (BDS-426) ([ef01955](https://github.com/bolt-design-system/bolt/commit/ef01955))



# [1.5.0](https://github.com/bolt-design-system/bolt/compare/v1.4.5...v1.5.0) (2018-06-12)


### Bug Fixes

* add element.closest polyfill for IE 11 (required by smooth scroll library) ([6f5f45e](https://github.com/bolt-design-system/bolt/commit/6f5f45e))
* add forEach polyfill to PL for IE11 ([05815a5](https://github.com/bolt-design-system/bolt/commit/05815a5))
* check to make sure the navlink being reset has a "deactivate" method defined (if the component hasn't been fully booted up yet) -- fixes a load order / timing bug encountered in IE 11 ([82af2f9](https://github.com/bolt-design-system/bolt/commit/82af2f9))
* disable auto-closing videos when clicking outside of a video till JS issue resolved ([8eaaadb](https://github.com/bolt-design-system/bolt/commit/8eaaadb))
* disable priority-nav check in nav-indicator to make the initial nav indicator rendering more consistent and not require scrolling ([758680d](https://github.com/bolt-design-system/bolt/commit/758680d))
* fix a bug of broken form demo paths ([9a04e37](https://github.com/bolt-design-system/bolt/commit/9a04e37))
* fix duplicate component rendering by fixing the Bolt core BoltBase class to use the right renderer mixin ([d16a9ab](https://github.com/bolt-design-system/bolt/commit/d16a9ab))
* fix existing dropdown demo examples to pull in the block-list component for the time being ([47b83e1](https://github.com/bolt-design-system/bolt/commit/47b83e1))
* Fix headline styling regression (BDS-368) ([f55fa18](https://github.com/bolt-design-system/bolt/commit/f55fa18))
* font family tools and settings ([5880ec4](https://github.com/bolt-design-system/bolt/commit/5880ec4))
* font-family ([e01fd5b](https://github.com/bolt-design-system/bolt/commit/e01fd5b))
* linting issue ([4a805d7](https://github.com/bolt-design-system/bolt/commit/4a805d7))
* move the gumshoe.js dependency to the correct package using it ([9ff489e](https://github.com/bolt-design-system/bolt/commit/9ff489e))
* re-enable <bolt-nav-indicator> workaround to prevent animating the line in to the wrong location as soon as the page loads ([b9577e3](https://github.com/bolt-design-system/bolt/commit/b9577e3))
* revert updating Preact renderer to use "children" vs "childNodes" (used in Skate.js currently); fixes an issue with the block-ist Preact component rendering duplicate content ([8833e24](https://github.com/bolt-design-system/bolt/commit/8833e24))
* temporarily move new bolt text component styling selectors to be nested inside of the custom element till upstream fix in place ([9757921](https://github.com/bolt-design-system/bolt/commit/9757921))
* update nav-indicator connecting Promise order so indicator animates in a bit more consistently ([f755d07](https://github.com/bolt-design-system/bolt/commit/f755d07))
* update navlink active styling fallback if CSS Vars aren't supported ([85200e3](https://github.com/bolt-design-system/bolt/commit/85200e3))
* update navlink to address indicator positioning in IE 11 ([03a4933](https://github.com/bolt-design-system/bolt/commit/03a4933))
* update Pattern Lab JS logic to work around IE 11 JS features supported ([fe04344](https://github.com/bolt-design-system/bolt/commit/fe04344))
* update tooltip component to opt out of using shadow DOM for the time being ([48f0710](https://github.com/bolt-design-system/bolt/commit/48f0710))


### Features

* update CTA text to a text string with default "Share this page", update the size of CTA text to small, update content hub anchor ribbon example to xlight and add inline share example at the bottom of page ([bd00999](https://github.com/bolt-design-system/bolt/commit/bd00999))
* update Preact renderer to match latest updates in Skate.js. ([79ac09e](https://github.com/bolt-design-system/bolt/commit/79ac09e))



## [1.4.5](https://github.com/bolt-design-system/bolt/compare/v1.4.4...v1.4.5) (2018-06-11)


### Bug Fixes

* docs and small design details ([54abbfa](https://github.com/bolt-design-system/bolt/commit/54abbfa))
* fix additional validation issues in pages (BDS-291) ([a36a488](https://github.com/bolt-design-system/bolt/commit/a36a488))
* fix schema issues in teaser pattern (BDS-291) ([cdb1d84](https://github.com/bolt-design-system/bolt/commit/cdb1d84))
* fix whitespace in code snippet ([2f4fb3e](https://github.com/bolt-design-system/bolt/commit/2f4fb3e))
* re-enable schema validation for band (BDS-291) ([f45f4fe](https://github.com/bolt-design-system/bolt/commit/f45f4fe))
* remove invalid size from icon demo band (BDS-291) ([4cd26e5](https://github.com/bolt-design-system/bolt/commit/4cd26e5))
* Remove mistaken 'theme' from action-blocks schema (BDS-291) ([3abaa57](https://github.com/bolt-design-system/bolt/commit/3abaa57))
* Remove mistaken 'theme' from blockquote schema (BDS-291) ([34a310e](https://github.com/bolt-design-system/bolt/commit/34a310e))
* Remove mistaken 'theme' from unordered list schema (BDS-291) ([ef6abcb](https://github.com/bolt-design-system/bolt/commit/ef6abcb))
* remove non-existent `theme` param from priority nav schema (BDS-291) ([bc3bc9e](https://github.com/bolt-design-system/bolt/commit/bc3bc9e))
* simplify action blocks border logic (BDS-291) ([eaf3c6e](https://github.com/bolt-design-system/bolt/commit/eaf3c6e))
* testing fix to stylelint error ([27e7b4c](https://github.com/bolt-design-system/bolt/commit/27e7b4c))
* update the <bolt-navlink> to check if the link being interacted with is a hashed link and if so, preventDefault to ensure a much less jumpy smooth scroll experience. Fixes issues noticed when testing in Safari ([f9f3be9](https://github.com/bolt-design-system/bolt/commit/f9f3be9))


### Features

* add critical font support to any component using the bolt [@font-face](https://github.com/font-face) mixin (via CSS vars or via normal inherited font-family prop) ([50afa40](https://github.com/bolt-design-system/bolt/commit/50afa40))
* color enhancements for navlink, nav-priority, nav-indicator ([8020837](https://github.com/bolt-design-system/bolt/commit/8020837))
* enhance focus:not(:active) for firefox and safari ([05ebd1b](https://github.com/bolt-design-system/bolt/commit/05ebd1b))
* update nav-indicator, nav-priority, navlink colors and styles ([ac7ff62](https://github.com/bolt-design-system/bolt/commit/ac7ff62))
* Update navbar to use 'none' instead of 'false' for theme (BDS-291) ([7e1e7d4](https://github.com/bolt-design-system/bolt/commit/7e1e7d4))



## [1.4.4](https://github.com/bolt-design-system/bolt/compare/v1.4.3...v1.4.4) (2018-06-07)


### Bug Fixes

* add back in z-index removed during hotfix from yesterday ([c68465a](https://github.com/bolt-design-system/bolt/commit/c68465a))
* allow schema docs to display multiple types in ref (BDS-291) ([9af925e](https://github.com/bolt-design-system/bolt/commit/9af925e))
* allow video id to be string or number (BDS-291) ([18c519b](https://github.com/bolt-design-system/bolt/commit/18c519b))
* event demo pages ([73fe04f](https://github.com/bolt-design-system/bolt/commit/73fe04f))
* fix action blocks (BDS-291) ([587da2d](https://github.com/bolt-design-system/bolt/commit/587da2d))
* fix additional indent issues ([a4ebcb0](https://github.com/bolt-design-system/bolt/commit/a4ebcb0))
* fix band schema (BDS-291) ([2086475](https://github.com/bolt-design-system/bolt/commit/2086475))
* fix blockquote schema validation (BDS-291) ([b282a98](https://github.com/bolt-design-system/bolt/commit/b282a98))
* fix button schema validation (BDS-291) ([2c7f45c](https://github.com/bolt-design-system/bolt/commit/2c7f45c))
* fix code snippet schema validation (BDS-291) ([67895f2](https://github.com/bolt-design-system/bolt/commit/67895f2))
* fix icon schema validation (BDS-291) ([3bda768](https://github.com/bolt-design-system/bolt/commit/3bda768))
* fix image schema validation (BDS-291) ([cb08e08](https://github.com/bolt-design-system/bolt/commit/cb08e08))
* fix indent issues ([5357772](https://github.com/bolt-design-system/bolt/commit/5357772))
* fix link schema to allow renderable items for text (BDS-291) ([0466493](https://github.com/bolt-design-system/bolt/commit/0466493))
* fix navbar schema validation (BDS-291) ([4d69296](https://github.com/bolt-design-system/bolt/commit/4d69296))
* fix schema issues in pattern lab pages (BDS-291) ([80ea583](https://github.com/bolt-design-system/bolt/commit/80ea583))
* fix typography schema validation (BDS-291) ([06ae326](https://github.com/bolt-design-system/bolt/commit/06ae326))
* remove extra margin subpixels on navbar due to recent fix added to the bolt-full-bleed mixin ([8c6a03b](https://github.com/bolt-design-system/bolt/commit/8c6a03b))
* update band transition to animate min-height only. fixes perceived delay when resizing page width ([c7fa8c6](https://github.com/bolt-design-system/bolt/commit/c7fa8c6))
* update build tools logic to ensure setting a namespace key but NOT a paths config doesn't blow up the build on the Node or PHP side of things. ([b20780e](https://github.com/bolt-design-system/bolt/commit/b20780e))
* update PL specific includes ([832ca71](https://github.com/bolt-design-system/bolt/commit/832ca71))


### Features

* content hub anchor band example ([58acd4d](https://github.com/bolt-design-system/bolt/commit/58acd4d))
* content hub anchor navbar example ([718df0d](https://github.com/bolt-design-system/bolt/commit/718df0d))
* content hub anchor ribbon example ([ecc87d9](https://github.com/bolt-design-system/bolt/commit/ecc87d9))
* create Content Hub Anchor ribbon example ([1a82151](https://github.com/bolt-design-system/bolt/commit/1a82151))


### Reverts

* revert removing constructor ([b10abfc](https://github.com/bolt-design-system/bolt/commit/b10abfc))



## [1.4.3](https://github.com/bolt-design-system/bolt/compare/v1.4.2...v1.4.3) (2018-06-05)


### Bug Fixes

* duplicated meta css ([8f1a3d0](https://github.com/bolt-design-system/bolt/commit/8f1a3d0))
* including the iOS hotfix to the external controls ([c9453ba](https://github.com/bolt-design-system/bolt/commit/c9453ba))
* including the iOS hotfix to the external controls ([8150ed3](https://github.com/bolt-design-system/bolt/commit/8150ed3))


### Features

* Allow typography to accept icon strings, incl. "none" (BDS-334) ([4086e7c](https://github.com/bolt-design-system/bolt/commit/4086e7c))



## [1.4.2](https://github.com/bolt-design-system/bolt/compare/v1.4.1...v1.4.2) (2018-06-04)


### Bug Fixes

* adding "any" schema prop type so the "any" key doesn't cause a breaking error on account of that option wasn't previously allowed till now. ([0a4d17c](https://github.com/bolt-design-system/bolt/commit/0a4d17c))
* Adjust logic for adding chevron right icon to links (WWWD-2183) ([1445b7f](https://github.com/bolt-design-system/bolt/commit/1445b7f))
* IE share dialog postion fix and additional docs ([125d5af](https://github.com/bolt-design-system/bolt/commit/125d5af))
* make sure nav AND nav.nav are both not undefined before trying to animate ([0b8a50a](https://github.com/bolt-design-system/bolt/commit/0b8a50a))
* meta title logic ([8e6e5c3](https://github.com/bolt-design-system/bolt/commit/8e6e5c3))
* re-implement the "nav-priority" rename that didn't quite make it through as expected during the initial 1st pass merge last week ([fa910b3](https://github.com/bolt-design-system/bolt/commit/fa910b3))
* remove duplicate component package in PL ([8238fbf](https://github.com/bolt-design-system/bolt/commit/8238fbf))
* remove duplicate navbar.twig file that wasn't properly replaced with initial merge down to master ([da1d902](https://github.com/bolt-design-system/bolt/commit/da1d902))
* remove quotes around our spacing utility classes' 'auto' option -- doesn't work otherwise ([4267769](https://github.com/bolt-design-system/bolt/commit/4267769))
* update block-list component version to point to the latest version in the local codebase ([8a76312](https://github.com/bolt-design-system/bolt/commit/8a76312))



## [1.4.1](https://github.com/bolt-design-system/bolt/compare/v1.5.0-beta.0...v1.4.1) (2018-05-25)


### Bug Fixes

* Add and cleanup params in ordered list and video schemas (BDS-237) ([0810a51](https://github.com/bolt-design-system/bolt/commit/0810a51))
* adjust default spacing on new priority nav component + set position relative so dropdown is consistently positioned ([a1dd991](https://github.com/bolt-design-system/bolt/commit/a1dd991))
* check navbar title icon exists before trying to render it ([5e8c7ea](https://github.com/bolt-design-system/bolt/commit/5e8c7ea))
* Fix nav indicator positioning in IE (WWWD-2150) ([82321c6](https://github.com/bolt-design-system/bolt/commit/82321c6)), closes [/github.com/bolt-design-system/bolt/commit/d25ec362#diff-5c1b2065daa942358746a52cf8077fc2L83](https://github.com//github.com/bolt-design-system/bolt/commit/d25ec362/issues/diff-5c1b2065daa942358746a52cf8077fc2L83)
* Fix spelling of 'enum' key in schema yml (BDS-251) ([aececce](https://github.com/bolt-design-system/bolt/commit/aececce))
* fix sticky example demo in PL so every section on the page matches a link in the navigation ([6c08f18](https://github.com/bolt-design-system/bolt/commit/6c08f18))
* fixing nav-indicator logic so multiple navbars on a page track behavior consistently ([bb26c57](https://github.com/bolt-design-system/bolt/commit/bb26c57))
* hanging icon vertical alignment pixel pushing ([ef58068](https://github.com/bolt-design-system/bolt/commit/ef58068))
* Remove unused/incorrect "logo" param from logo pattern and schema ([aa2acec](https://github.com/bolt-design-system/bolt/commit/aa2acec))
* remove z-index on blockquote image ([fd8588c](https://github.com/bolt-design-system/bolt/commit/fd8588c))
* update schemas ([0ab0280](https://github.com/bolt-design-system/bolt/commit/0ab0280))


### Features

* Add support for array of types to scheme docs (BDS-237) ([8a8e73e](https://github.com/bolt-design-system/bolt/commit/8a8e73e))
* add withUpdate lifecycle mixin from SkateJS to base Bolt component class ([88bd178](https://github.com/bolt-design-system/bolt/commit/88bd178))
* update priority nav component to include new / renamed nav-indicator custom element internally by default ([b86a2f5](https://github.com/bolt-design-system/bolt/commit/b86a2f5))



# [1.5.0-beta.0](https://github.com/bolt-design-system/bolt/compare/v1.4.0...v1.5.0-beta.0) (2018-05-21)


### Bug Fixes

* move box shadow to outermost container ([84e0f70](https://github.com/bolt-design-system/bolt/commit/84e0f70))
* revert dropping the size of the navbar icon to match expected designs ([04c7c8e](https://github.com/bolt-design-system/bolt/commit/04c7c8e))
* update navbar to always be full bleed by default ([ad2c843](https://github.com/bolt-design-system/bolt/commit/ad2c843))



# [1.4.0](https://github.com/bolt-design-system/bolt/compare/v1.3.4...v1.4.0) (2018-05-18)


### Bug Fixes

* add bolt prefix to new convert color function ([c00f972](https://github.com/bolt-design-system/bolt/commit/c00f972))
* fix additional lint errors ([122a3ca](https://github.com/bolt-design-system/bolt/commit/122a3ca))
* fix lint error ([f9166a0](https://github.com/bolt-design-system/bolt/commit/f9166a0))
* fixing comma ([bf9ad5e](https://github.com/bolt-design-system/bolt/commit/bf9ad5e))
* ignore boltData function calls in Stylelint for now ([14e74aa](https://github.com/bolt-design-system/bolt/commit/14e74aa))
* ignore Stylelint function name rule ([1ee30ee](https://github.com/bolt-design-system/bolt/commit/1ee30ee))
* ignore themify from eslint rules ([614fb66](https://github.com/bolt-design-system/bolt/commit/614fb66))
* ignore themify from stylelint rules ([e61b991](https://github.com/bolt-design-system/bolt/commit/e61b991))
* ignore themify from stylelint rules in package.json ([2b1027a](https://github.com/bolt-design-system/bolt/commit/2b1027a))
* re-organize and comment on how we include normalize ([001ddc6](https://github.com/bolt-design-system/bolt/commit/001ddc6))
* remove parentheses to fix stylelint validation error ([849e8ed](https://github.com/bolt-design-system/bolt/commit/849e8ed))
* retest Stylelint ignore rules ([82f77a6](https://github.com/bolt-design-system/bolt/commit/82f77a6))
* temporarily comment out schema props with a type of 'all' since this will not compile / validate otherwise ([b35df46](https://github.com/bolt-design-system/bolt/commit/b35df46))
* temporarily ignore Stylelint validation for convert-color function ([80d6a6c](https://github.com/bolt-design-system/bolt/commit/80d6a6c))
* themed card to have solid background ([28a022e](https://github.com/bolt-design-system/bolt/commit/28a022e))
* update boltData function to bolt-data ([6eba718](https://github.com/bolt-design-system/bolt/commit/6eba718))
* update boltData function to bolt-data ([3346ab2](https://github.com/bolt-design-system/bolt/commit/3346ab2))
* update color util to use renamed Sass functions ([7a55608](https://github.com/bolt-design-system/bolt/commit/7a55608))
* update function names ([a810943](https://github.com/bolt-design-system/bolt/commit/a810943))
* upgrade polyfills to latest versions; remove ShadyCSS + ShadyCSS Scoping shim as this is no longer required + addresses Firefox polyfill bug in BDS-285 ([b605c74](https://github.com/bolt-design-system/bolt/commit/b605c74))


### Features

* 1st pass building priority-nav component ([70797e2](https://github.com/bolt-design-system/bolt/commit/70797e2))
* add critical css vars package -- handles async loading CSS vars fallback if unsupported ([e94f8d2](https://github.com/bolt-design-system/bolt/commit/e94f8d2))
* add themify to Bolt; convert color palette to JS and upgrade Webpack to wire up theme and color palette data ([a97a3c3](https://github.com/bolt-design-system/bolt/commit/a97a3c3))
* fix icon build script to support SVG icons using masks; updates CSS so icons with masks render and transition as expected ([#674](https://github.com/bolt-design-system/bolt/issues/674)) ([2107183](https://github.com/bolt-design-system/bolt/commit/2107183))
* polishing up design and spacing of updated navbar ([e4888f3](https://github.com/bolt-design-system/bolt/commit/e4888f3))
* restructure font family logic to be exportable ([#673](https://github.com/bolt-design-system/bolt/issues/673)) ([53a86c8](https://github.com/bolt-design-system/bolt/commit/53a86c8))
* update band schema to include at least one property value till full component schema is added ([c872b1b](https://github.com/bolt-design-system/bolt/commit/c872b1b))
* update priority nav build to use themify color values ([5a59861](https://github.com/bolt-design-system/bolt/commit/5a59861))
* update themify to use xlight theme by default ([387f91f](https://github.com/bolt-design-system/bolt/commit/387f91f))



## [1.3.4](https://github.com/bolt-design-system/bolt/compare/v1.3.3...v1.3.4) (2018-05-08)



## [1.3.3](https://github.com/bolt-design-system/bolt/compare/v1.3.2...v1.3.3) (2018-05-04)


### Bug Fixes

* **build-tools/cli.js:** Fix for .boltrc.js cli flag override ([2c637fb](https://github.com/bolt-design-system/bolt/commit/2c637fb))



## [1.3.2](https://github.com/bolt-design-system/bolt/compare/v1.3.1...v1.3.2) (2018-05-04)



## [1.3.1](https://github.com/bolt-design-system/bolt/compare/v1.3.0...v1.3.1) (2018-05-04)


### Bug Fixes

* **manifest.js:** Manifest Version Fetching ([848c3fe](https://github.com/bolt-design-system/bolt/commit/848c3fe))



# [1.3.0](https://github.com/bolt-design-system/bolt/compare/v1.2.4...v1.3.0) (2018-05-04)


### Bug Fixes

* element styles ([64144bd](https://github.com/bolt-design-system/bolt/commit/64144bd))
* fix lint issues in custom event polyfill JS ([a3d7817](https://github.com/bolt-design-system/bolt/commit/a3d7817))
* fixing linting issues, force rename filter.svg file ([54cdfda](https://github.com/bolt-design-system/bolt/commit/54cdfda))
* fixing patterns to components folder rename ([a0def0e](https://github.com/bolt-design-system/bolt/commit/a0def0e))
* monospace settings ([e711069](https://github.com/bolt-design-system/bolt/commit/e711069))
* reference the lerna.json package, not the @bolt/build-tools when setting the version of Bolt in the global Bolt manifest ([#653](https://github.com/bolt-design-system/bolt/issues/653)) ([0e9553d](https://github.com/bolt-design-system/bolt/commit/0e9553d))
* removing duplicate script from package.json ([14a0788](https://github.com/bolt-design-system/bolt/commit/14a0788))


### Features

* Allowing style vars to be overridden BDS-146 ([#677](https://github.com/bolt-design-system/bolt/issues/677)) ([71bad10](https://github.com/bolt-design-system/bolt/commit/71bad10))



## [1.2.4](https://github.com/bolt-design-system/bolt/compare/v1.2.3...v1.2.4) (2018-04-27)



## [1.2.3](https://github.com/bolt-design-system/bolt/compare/v1.2.2...v1.2.3) (2018-04-26)



## [1.2.2](https://github.com/bolt-design-system/bolt/compare/v1.2.1...v1.2.2) (2018-04-26)


### Bug Fixes

* updating stylelint to ignore pw-site built assets ([7adcabc](https://github.com/bolt-design-system/bolt/commit/7adcabc))
* updating stylelint to ignore pw-site built assets ([1a759c5](https://github.com/bolt-design-system/bolt/commit/1a759c5))



## [1.2.1](https://github.com/bolt-design-system/bolt/compare/v1.2.0...v1.2.1) (2018-04-25)


### Features

* 1st pass getting new <bolt-code> web component built out ([d77adb7](https://github.com/bolt-design-system/bolt/commit/d77adb7))



# [1.2.0](https://github.com/bolt-design-system/bolt/compare/v1.1.12...v1.2.0) (2018-04-25)


### Features

* adding new placeholder component examples + working component ([e41c3c3](https://github.com/bolt-design-system/bolt/commit/e41c3c3))
* updating default icon size in the navbar brand from large to medium ([#633](https://github.com/bolt-design-system/bolt/issues/633)) ([3bd9700](https://github.com/bolt-design-system/bolt/commit/3bd9700))



## [1.1.12](https://github.com/bolt-design-system/bolt/compare/v1.1.11...v1.1.12) (2018-04-20)


### Bug Fixes

* fixing double quotes lint error ([db136dd](https://github.com/bolt-design-system/bolt/commit/db136dd))



## [1.1.11](https://github.com/bolt-design-system/bolt/compare/v1.1.10...v1.1.11) (2018-04-20)



## [1.1.10](https://github.com/bolt-design-system/bolt/compare/v1.1.9...v1.1.10) (2018-04-19)



## [1.1.9](https://github.com/bolt-design-system/bolt/compare/v1.1.8...v1.1.9) (2018-04-19)



## [1.1.8](https://github.com/bolt-design-system/bolt/compare/v1.1.7...v1.1.8) (2018-04-19)



## [1.1.6](https://github.com/bolt-design-system/bolt/compare/v1.1.5...v1.1.6) (2018-04-19)



## [1.1.5](https://github.com/bolt-design-system/bolt/compare/v1.1.4...v1.1.5) (2018-04-19)



## [1.1.4](https://github.com/bolt-design-system/bolt/compare/v1.1.3...v1.1.4) (2018-04-17)


### Bug Fixes

* adding @bolt/core dependency to ratio object to fix Webpack build error ([5d4dccd](https://github.com/bolt-design-system/bolt/commit/5d4dccd))
* adding new css-vars mixin and function to help keep manage CSS var usage (+ Sass compilation) ([0facca8](https://github.com/bolt-design-system/bolt/commit/0facca8))
* update environmental check to return shadowDom support consistently ([5977347](https://github.com/bolt-design-system/bolt/commit/5977347))
* update the <replace-with-children> component to use the HyperHTML renderer -- fixes noticeable flash in Firefox when button component is getting upgraded ([10a3a42](https://github.com/bolt-design-system/bolt/commit/10a3a42))
* updating band component disconnected event to line up with other component conventions ([d53c220](https://github.com/bolt-design-system/bolt/commit/d53c220))
* updating button component so wire functions being called point to the component itself being wired up -- fixes button component re-rendering when props change ([855458b](https://github.com/bolt-design-system/bolt/commit/855458b))
* updating CSS var usage globally to use new CSS Vars mixin ([cb75bb0](https://github.com/bolt-design-system/bolt/commit/cb75bb0))
* updating hyperhtml renderer to prevent extra connectedCallbacks from running unexpectedly ([7c51f13](https://github.com/bolt-design-system/bolt/commit/7c51f13))
* updating hyperHTML wire call to include a reference to the component being wired up ([4a4ee4a](https://github.com/bolt-design-system/bolt/commit/4a4ee4a))



## [1.1.3](https://github.com/bolt-design-system/bolt/compare/v1.1.2...v1.1.3) (2018-04-12)



## [1.1.2](https://github.com/bolt-design-system/bolt/compare/v1.1.1...v1.1.2) (2018-04-10)



## [1.1.1](https://github.com/bolt-design-system/bolt/compare/v1.1.0...v1.1.1) (2018-04-10)



# [1.1.0](https://github.com/bolt-design-system/bolt/compare/v1.0.4...v1.1.0) (2018-04-10)


### Bug Fixes

* adding missing log util to webpack config script ([ae42115](https://github.com/bolt-design-system/bolt/commit/ae42115))
* cleanup and misc fixes ([d25ec36](https://github.com/bolt-design-system/bolt/commit/d25ec36))
* fixing accessibility controls and focus state of dropdown component ([7c71c23](https://github.com/bolt-design-system/bolt/commit/7c71c23))
* fixing Handorgel constructor ([73e91e3](https://github.com/bolt-design-system/bolt/commit/73e91e3))
* fixing HyperHTML powered components pulling in old withHyperHTML renderer -- renaming to generic BoltComponent renderer to fix errors ([#596](https://github.com/bolt-design-system/bolt/issues/596)) ([c452b76](https://github.com/bolt-design-system/bolt/commit/c452b76))
* hotfix to copy to clipboard and dropdown component Travis build ([faf6636](https://github.com/bolt-design-system/bolt/commit/faf6636))
* remove double connecting event getting fired on every component ([40a1bff](https://github.com/bolt-design-system/bolt/commit/40a1bff))
* removing duplicate log include ([bc5ad7b](https://github.com/bolt-design-system/bolt/commit/bc5ad7b))
* temporarily disable globally setting innerHTML in the hyperHTML base components till some additional work has been worked through ([37e815c](https://github.com/bolt-design-system/bolt/commit/37e815c))
* temporarily disabling innerHTML component work done in the connecting lifecycle event till some gotchas have been worked through on this ([0f4b151](https://github.com/bolt-design-system/bolt/commit/0f4b151))
* Update floating label transforms to "grow" from input text (BDS-175) ([#555](https://github.com/bolt-design-system/bolt/issues/555)) ([b6aab98](https://github.com/bolt-design-system/bolt/commit/b6aab98))
* update headline schema to not output a default text alignment unless explicitly set ([#595](https://github.com/bolt-design-system/bolt/issues/595)) ([08a6e3e](https://github.com/bolt-design-system/bolt/commit/08a6e3e))


### Features

* add click event handlers to close when item selected ([557d1a9](https://github.com/bolt-design-system/bolt/commit/557d1a9))



## [1.0.4](https://github.com/bolt-design-system/bolt/compare/v1.0.3...v1.0.4) (2018-04-03)



## [1.0.3](https://github.com/bolt-design-system/bolt/compare/v1.0.2...v1.0.3) (2018-04-03)


### Bug Fixes

* add check for `contains` method to prevent error from getting thrown in IE11 ([#566](https://github.com/bolt-design-system/bolt/issues/566)) ([12864cf](https://github.com/bolt-design-system/bolt/commit/12864cf))
* fix ratio object mis-alignment ([#565](https://github.com/bolt-design-system/bolt/issues/565)) ([72bf670](https://github.com/bolt-design-system/bolt/commit/72bf670))
* update navlink component to correctly point to latest version of @bolt/core ([2d91d87](https://github.com/bolt-design-system/bolt/commit/2d91d87))


### Features

* add new utility classes to Bolt for handling height, opacity and display properties ([209b9bb](https://github.com/bolt-design-system/bolt/commit/209b9bb))
* initial dropdown component implementation ([3595e2e](https://github.com/bolt-design-system/bolt/commit/3595e2e))



## [1.0.2](https://github.com/bolt-design-system/bolt/compare/v1.0.1...v1.0.2) (2018-03-31)



## [1.0.1](https://github.com/bolt-design-system/bolt/compare/v1.0.0...v1.0.1) (2018-03-30)



# [1.0.0](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.12...v1.0.0) (2018-03-30)



# [1.0.0-rc.12](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2018-03-30)



# [1.0.0-rc.11](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.9...v1.0.0-rc.11) (2018-03-30)


### Bug Fixes

* set max width on embedded map ([5242da6](https://github.com/bolt-design-system/bolt/commit/5242da6))
* Update color and size of event agenda icons ([3bfba1a](https://github.com/bolt-design-system/bolt/commit/3bfba1a))
* update event header to use inline list object and medium icons ([2b287c6](https://github.com/bolt-design-system/bolt/commit/2b287c6))
* update theme of first event detail band ([8b3835e](https://github.com/bolt-design-system/bolt/commit/8b3835e))
* vertically align ratio object to prevent rare instances where images mis-match with background container ([98c95f7](https://github.com/bolt-design-system/bolt/commit/98c95f7))


### Features

* Add card form to event page ([8d09850](https://github.com/bolt-design-system/bolt/commit/8d09850))
* finish event sponsors section, including POC for action blocks ([85b643f](https://github.com/bolt-design-system/bolt/commit/85b643f))



# [1.0.0-rc.9](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2018-03-20)



# [1.0.0-rc.8](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2018-03-20)


### Bug Fixes

* decreasing the level of shadow on form inputs ([#530](https://github.com/bolt-design-system/bolt/issues/530)) ([ef5674b](https://github.com/bolt-design-system/bolt/commit/ef5674b))



# [1.0.0-rc.7](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2018-03-13)


### Bug Fixes

* Change bg color of checkbox/radio to match other inputs (WWWD-1414) ([e51dfd7](https://github.com/bolt-design-system/bolt/commit/e51dfd7))
* restore shadow styles regressed in previous commit ([48c83dd](https://github.com/bolt-design-system/bolt/commit/48c83dd))


### Features

* Add initial agenda manager demo pages ([7269a8d](https://github.com/bolt-design-system/bolt/commit/7269a8d))
* Adjust agenda manager demo pages ([c0941e8](https://github.com/bolt-design-system/bolt/commit/c0941e8))



# [1.0.0-rc.6](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2018-03-07)



# [1.0.0-rc.5](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2018-03-06)


### Bug Fixes

* removing old form build process ([685aef1](https://github.com/bolt-design-system/bolt/commit/685aef1))



# [1.0.0-rc.4](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2018-03-06)



# [1.0.0-rc.3](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-02-24)


### Reverts

* revert removing data folder ([308d31c](https://github.com/bolt-design-system/bolt/commit/308d31c))



# [1.0.0-rc.2](https://github.com/bolt-design-system/bolt/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-02-24)



# [1.0.0-rc.1](https://github.com/bolt-design-system/bolt/compare/v0.4.1...v1.0.0-rc.1) (2018-02-24)


### Bug Fixes

* add missing babel loader to webpack config ([5c817c4](https://github.com/bolt-design-system/bolt/commit/5c817c4))
* add missing webpack config updates to remove old babel plugins + switch over to using new consolidated babel config ([7b3f927](https://github.com/bolt-design-system/bolt/commit/7b3f927))
* adding js build fix locally + fixing broken image path ([fd04a03](https://github.com/bolt-design-system/bolt/commit/fd04a03))
* adding missing headline CSS tweak from original product feat branch + fresh critical fonts CSS from previous build. ([53b4c6d](https://github.com/bolt-design-system/bolt/commit/53b4c6d))
* adding updated polyfill loader to v1.0 - adds more refined cross browser polyfills + using new shadydom polyfill with massive IE 11 perf improvements ([4d548b5](https://github.com/bolt-design-system/bolt/commit/4d548b5))
* correct headline component's validation logic to properly use the default align config options when no align value is passed along OR if an invalid option is attempted to be selected. ([7a067fe](https://github.com/bolt-design-system/bolt/commit/7a067fe))
* correcting out of sync version of the flag object ([2bd29b6](https://github.com/bolt-design-system/bolt/commit/2bd29b6))
* custom element update ([d72a3d7](https://github.com/bolt-design-system/bolt/commit/d72a3d7))
* fix browser bug in Safari when content overflows due to the border-radius value set. ([8c51e19](https://github.com/bolt-design-system/bolt/commit/8c51e19))
* fix for broken pattern lab paths with epic refactor reorg ([2891df3](https://github.com/bolt-design-system/bolt/commit/2891df3))
* fix major IE11 rendering issue with device viewer relating to removing the cursor visibility w/ CSS ([d5ba457](https://github.com/bolt-design-system/bolt/commit/d5ba457))
* fix missing trailing comma in webpack config to address build error ([8bbec22](https://github.com/bolt-design-system/bolt/commit/8bbec22))
* Fix package.json versions of local lerna versioned deps. Add example of local JS build using Bolt Build Tools. ([b5493ee](https://github.com/bolt-design-system/bolt/commit/b5493ee))
* fixing async loading path of chunks when loading via @bolt/bolt pre-bundled JS ([9ab7fdd](https://github.com/bolt-design-system/bolt/commit/9ab7fdd))
* fixing broken / updated config schema to use updated props, minor schema updates ([33805ef](https://github.com/bolt-design-system/bolt/commit/33805ef))
* fixing full width params on button component ([8fc21e6](https://github.com/bolt-design-system/bolt/commit/8fc21e6))
* fixing icon fallback ([79d012d](https://github.com/bolt-design-system/bolt/commit/79d012d))
* fixing image paths ([62efbff](https://github.com/bolt-design-system/bolt/commit/62efbff))
* fixing JS rendering by adding missing bolt/core utils added in v0.x; adding temp workaround to images not loading + example pegaworld dummy page. ([9bcbdba](https://github.com/bolt-design-system/bolt/commit/9bcbdba))
* fixing mocha check ([b6944a1](https://github.com/bolt-design-system/bolt/commit/b6944a1))
* fixing npm tag when publishing canary release ([dd6e9cf](https://github.com/bolt-design-system/bolt/commit/dd6e9cf))
* fixing PL compile ([2153149](https://github.com/bolt-design-system/bolt/commit/2153149))
* fixing themes-all version deps ([9f1746c](https://github.com/bolt-design-system/bolt/commit/9f1746c))
* fixing version of webpack being required by button component ([5175d2e](https://github.com/bolt-design-system/bolt/commit/5175d2e))
* fixing video player version number dependencies ([895c000](https://github.com/bolt-design-system/bolt/commit/895c000))
* force hardware accelerated rendering of the UI list border to significantly improve rendering consistantly -- especially inside of Pattern Lab's iframe viewer. ([557ab3a](https://github.com/bolt-design-system/bolt/commit/557ab3a))
* fresh manual merge of product page work, including device viewer template updates + adding a new shared polyfill loader to @bolt/core ([c3e0c26](https://github.com/bolt-design-system/bolt/commit/c3e0c26))
* icon color inherit instead of currentColor ([5a4bf39](https://github.com/bolt-design-system/bolt/commit/5a4bf39))
* make band componentName and baseClass fixed values ([55b4538](https://github.com/bolt-design-system/bolt/commit/55b4538))
* moving check-imports script back for the moment ([b1b81b0](https://github.com/bolt-design-system/bolt/commit/b1b81b0))
* port over bolt core preact renderer base component update from release/0.x branch -- fixes re-rendering component based on data changes ([705f554](https://github.com/bolt-design-system/bolt/commit/705f554))
* re-enable + update Webpack fix for handling breakpoint class suffix with CSS modules enabled in build ([#471](https://github.com/bolt-design-system/bolt/issues/471)) ([2469d70](https://github.com/bolt-design-system/bolt/commit/2469d70))
* remove automatically selecting a text alignment option from the headline component so that text alignment can be inheritted (ex. by a utility class); remove display: flex from headline to fix utility class text align behavior. ([edbd4cc](https://github.com/bolt-design-system/bolt/commit/edbd4cc))
* remove having the grid system automatically make immediate nested children in a flex layout also be rendered as display flex. fixes issue relating to children components (like buttons) automatically growing in size to fill up the grid cell. ([b347cd4](https://github.com/bolt-design-system/bolt/commit/b347cd4))
* remove rem unit from imported spacing unit values; remove non-existant logo from placeholder header ([a473439](https://github.com/bolt-design-system/bolt/commit/a473439))
* remove the flex-grow CSS rule in the card component, just in case the parent container is set to display: flex but not flex-direction: column ([5e98fb4](https://github.com/bolt-design-system/bolt/commit/5e98fb4))
* removing autoload from Images.php ([838d73c](https://github.com/bolt-design-system/bolt/commit/838d73c))
* removing trailing comma ([8da0a20](https://github.com/bolt-design-system/bolt/commit/8da0a20))
* Replace incorrect variables and hard coded value ([99772ce](https://github.com/bolt-design-system/bolt/commit/99772ce))
* revert webpack config update -- no longer needed. ([2a3033f](https://github.com/bolt-design-system/bolt/commit/2a3033f))
* revert webpack config update -- no longer needed. ([f3f387a](https://github.com/bolt-design-system/bolt/commit/f3f387a))
* revert webpack config update -- no longer needed. ([907796e](https://github.com/bolt-design-system/bolt/commit/907796e))
* revert webpack config update -- no longer needed. ([9dcfcff](https://github.com/bolt-design-system/bolt/commit/9dcfcff))
* squash cross browser bug in Safari when content incorrectly overflows due to the border-radius value set. ([8b55f86](https://github.com/bolt-design-system/bolt/commit/8b55f86))
* switch grid system over to using the font-size inline-grid whitespace trick to fix spacing issue in Safari. ([df1daf8](https://github.com/bolt-design-system/bolt/commit/df1daf8))
* temporarily disable additional schema props check ([f83eaf5](https://github.com/bolt-design-system/bolt/commit/f83eaf5))
* Update background shapes svg positioning to support IE (BL-97) ([c4d75d4](https://github.com/bolt-design-system/bolt/commit/c4d75d4))
* update blockquote border radius to use a % instead of static length value. ([7ac4aa0](https://github.com/bolt-design-system/bolt/commit/7ac4aa0))
* update figure component's custom element default CSS to address IE 11 issues w/ vertical alignment ([f96323f](https://github.com/bolt-design-system/bolt/commit/f96323f))
* update image component as workaround to in-progress lazyloading functionality ([81bc78a](https://github.com/bolt-design-system/bolt/commit/81bc78a))
* update image component to use new ratio object params for specifying height and width aspect ratios ([75ffd10](https://github.com/bolt-design-system/bolt/commit/75ffd10))
* update new babel preset config to add required deps for compiling SVG icons when the full Bolt pre-build npm script is getting run ([376590d](https://github.com/bolt-design-system/bolt/commit/376590d))
* update references to point to new Bolt footer folder; remove old package.json ([199b5d1](https://github.com/bolt-design-system/bolt/commit/199b5d1))
* update the card component to now independently vertically fill up the space available (aka equal height cards) when used inside a flex-enabled grid layout ([032e2d7](https://github.com/bolt-design-system/bolt/commit/032e2d7))
* update the flag object's Flexbox flex: 1; rule to be written out in longhand. proactively this approach helps reduce encountering one of the more frequently seen flexbox gotchas / browser quirks in IE10 and IE11. ([a19455e](https://github.com/bolt-design-system/bolt/commit/a19455e))
* Update webcomponentjs shims to address known IE11 errors. Switch on ES7 array.includes shim to address silent error w/ IE11 displaying icons correctly ([591822d](https://github.com/bolt-design-system/bolt/commit/591822d))


### Features

* 1st pass wiring up Bolt custom Grid and Cell tags using new Class based extension system; adding workaround to autoloading, removing old extension tags being replaced ([502f17e](https://github.com/bolt-design-system/bolt/commit/502f17e))
* add babel plugins for dynamic imports in node, transform custom element classes, and transform es2015 classes ([f19a96f](https://github.com/bolt-design-system/bolt/commit/f19a96f))
* add d8 specific JS build. Temporarily disable smooth scroll and sticky JS components for D8; Ratio object JS for everyone till existing IE11 bug addressed. ([a1588da](https://github.com/bolt-design-system/bolt/commit/a1588da))
* add headline helper mixins to new standalone partial ([6139834](https://github.com/bolt-design-system/bolt/commit/6139834))
* add new babel config to collection preset configs ([5e6ca89](https://github.com/bolt-design-system/bolt/commit/5e6ca89))
* add new magnify prop to refactored device viewer Custom Element ([8dfe3f3](https://github.com/bolt-design-system/bolt/commit/8dfe3f3))
* add ShadyDOM / ShadyCSS cross browser support while still using Preact-based rendering. ([b627030](https://github.com/bolt-design-system/bolt/commit/b627030))
* add text alignment (align) config options to headline twig template. add headline demo examples using the new align option. update existing max-width ch headline rule to only apply to much larger font sizes ([9533df6](https://github.com/bolt-design-system/bolt/commit/9533df6))
* adding additional interactive controls to Button component example ([3712bc4](https://github.com/bolt-design-system/bolt/commit/3712bc4))
* enable sourcemaps for minified JS; drop console log messages in minified code. ([a6e41ad](https://github.com/bolt-design-system/bolt/commit/a6e41ad))
* enable Webpack HMR feature -- think livereload but for JavaScript ([14b83b6](https://github.com/bolt-design-system/bolt/commit/14b83b6))
* import new headline mixin partial; remove duplicate code now getting handled from this single partial ([500ba38](https://github.com/bolt-design-system/bolt/commit/500ba38))
* moving utils to new _includes folder; removing component demos accidently re-added ([3e8f0c0](https://github.com/bolt-design-system/bolt/commit/3e8f0c0))
* port over pattern_template Twig function ([580fb7b](https://github.com/bolt-design-system/bolt/commit/580fb7b))
* re-enable ratio object include JavaScript bundles ([e8ff41c](https://github.com/bolt-design-system/bolt/commit/e8ff41c))
* update button component to have standalone CSS output ([d25da65](https://github.com/bolt-design-system/bolt/commit/d25da65))
* update button component to have standalone CSS output ([fcff0b3](https://github.com/bolt-design-system/bolt/commit/fcff0b3))



## [0.4.1](https://github.com/bolt-design-system/bolt/compare/0.4.0...v0.4.1) (2017-11-15)


### Bug Fixes

* action blocks code revision ([4d0eab3](https://github.com/bolt-design-system/bolt/commit/4d0eab3))
* added comments to css ([98273f7](https://github.com/bolt-design-system/bolt/commit/98273f7))
* bug fixes and cleanup for the button theming override, eyebrow icon size; added headline quotes + icon backgrounds ([c717b43](https://github.com/bolt-design-system/bolt/commit/c717b43))
* bug fixes for video player, inline lists, minification issues w/ the prod JS build, theming fixes for ordered and unordered lists. ([d32301d](https://github.com/bolt-design-system/bolt/commit/d32301d))
* docs typo ([69f6052](https://github.com/bolt-design-system/bolt/commit/69f6052))
* fixing composer deps version ([034fec9](https://github.com/bolt-design-system/bolt/commit/034fec9))
* fixing composer install of PL pattern engine so patches work as expected ([5f58c6f](https://github.com/bolt-design-system/bolt/commit/5f58c6f))
* fixing missing (removed?) fontfaceobserver js dependency ([f248920](https://github.com/bolt-design-system/bolt/commit/f248920))
* fixing several persistant issues w/ Pattern Lab involving lineages. ([#143](https://github.com/bolt-design-system/bolt/issues/143)) ([dae2c52](https://github.com/bolt-design-system/bolt/commit/dae2c52))
* fixing stylelint errors, re-enabling and fixing mocha tests ([8f80270](https://github.com/bolt-design-system/bolt/commit/8f80270))
* icon.js ([5a1216c](https://github.com/bolt-design-system/bolt/commit/5a1216c))
* merge conflicts ([e432729](https://github.com/bolt-design-system/bolt/commit/e432729))
* merge some configs ([97ccf76](https://github.com/bolt-design-system/bolt/commit/97ccf76))
* merge some json ([db85d9b](https://github.com/bolt-design-system/bolt/commit/db85d9b))
* minor updates to address overflow scrollbars in Chrome on Windows; update to Action Block headline link color; minor tuning of button shadow colors ([b26f02f](https://github.com/bolt-design-system/bolt/commit/b26f02f))
* ordered list and blockquote revisions ([6d6c7ae](https://github.com/bolt-design-system/bolt/commit/6d6c7ae))
* refactored css and twig, plus color update ([c9f53aa](https://github.com/bolt-design-system/bolt/commit/c9f53aa))
* removing extra whitespace in inline-lists due to using inline-block for list items ([063bca2](https://github.com/bolt-design-system/bolt/commit/063bca2))
* removing sorter composer dependency, adding WIP of alt version of homepage w/ quote ([90e430f](https://github.com/bolt-design-system/bolt/commit/90e430f))
* resource details page demo update (content column widths) ([3dcaf9b](https://github.com/bolt-design-system/bolt/commit/3dcaf9b))
* some random strings ([8b173e1](https://github.com/bolt-design-system/bolt/commit/8b173e1))
* testing possible fix for IE11 on Windows 7 with the Brightcove Video Player; minor update to fix card background colors in themes. ([498eacb](https://github.com/bolt-design-system/bolt/commit/498eacb))
* updating CSS variables being used in Action Blocks, Buttons, Chips, and Icons -- addresses Edge 15 & 16 quirks w/ Current Color; temp CSS button theme hack also added. ([afe735d](https://github.com/bolt-design-system/bolt/commit/afe735d))
* updating default button color, icons, button link color, cards w/ button links, inline list fix ([8fb1c94](https://github.com/bolt-design-system/bolt/commit/8fb1c94))
* vertically center hero area content on resource details page ([63f566f](https://github.com/bolt-design-system/bolt/commit/63f566f))


### Features

* adding patches to 4 latest PL core pull requests ([91405ee](https://github.com/bolt-design-system/bolt/commit/91405ee))
* adding pattern_template function for dynamic template references ([a2d3df8](https://github.com/bolt-design-system/bolt/commit/a2d3df8))
* ordered / unordered list + blockquote cleanup & docs ([1c3452a](https://github.com/bolt-design-system/bolt/commit/1c3452a))



# [0.2.0](https://github.com/bolt-design-system/bolt/compare/v0.2.0-alpha.1...v0.2.0) (2017-09-02)


### Bug Fixes

* adding missing css file ([8d261fc](https://github.com/bolt-design-system/bolt/commit/8d261fc))
* fixing travis build command ([ca89499](https://github.com/bolt-design-system/bolt/commit/ca89499))
* package.json & .snyk to reduce vulnerabilities ([#98](https://github.com/bolt-design-system/bolt/issues/98)) ([d615734](https://github.com/bolt-design-system/bolt/commit/d615734))
* package.json to reduce vulnerabilities ([#108](https://github.com/bolt-design-system/bolt/issues/108)) ([cabf8d6](https://github.com/bolt-design-system/bolt/commit/cabf8d6))
* re-adding pre-commit test hook ([b53e23a](https://github.com/bolt-design-system/bolt/commit/b53e23a))
* re-testing travis build script ([f132e0d](https://github.com/bolt-design-system/bolt/commit/f132e0d))
* removing submodules ([eec33bd](https://github.com/bolt-design-system/bolt/commit/eec33bd))
* resolving merge conflicts ([1586323](https://github.com/bolt-design-system/bolt/commit/1586323))
* temporarily disabling lint precommit hook ([ab7bbfe](https://github.com/bolt-design-system/bolt/commit/ab7bbfe))


### Features

* adding new and improved automatic deployments to now.sh w/ Slack integration ([02d33ca](https://github.com/bolt-design-system/bolt/commit/02d33ca))



# [0.2.0-alpha.1](https://github.com/bolt-design-system/bolt/compare/v0.1.0...v0.2.0-alpha.1) (2017-08-18)


### Bug Fixes

* adding missing files, removing deps not needed ([7556b17](https://github.com/bolt-design-system/bolt/commit/7556b17))
* fixing spacing scale value ([e1defbb](https://github.com/bolt-design-system/bolt/commit/e1defbb))
* merging in latest color work ([e5f125d](https://github.com/bolt-design-system/bolt/commit/e5f125d))
* missing curly bracket ([#95](https://github.com/bolt-design-system/bolt/issues/95)) ([f9fca29](https://github.com/bolt-design-system/bolt/commit/f9fca29))



# [0.1.0](https://github.com/bolt-design-system/bolt/compare/9ba5c1c...v0.1.0) (2017-08-01)


### Bug Fixes

* package.json & .snyk to reduce vulnerabilities ([f610d19](https://github.com/bolt-design-system/bolt/commit/f610d19))
* re-running build to test if travis still fails.. ([52f1d1c](https://github.com/bolt-design-system/bolt/commit/52f1d1c))
* retesting travis config ([5a4f87a](https://github.com/bolt-design-system/bolt/commit/5a4f87a))
* testing fix for travis failing on sharp dependency install / custom compile. ([90c155d](https://github.com/bolt-design-system/bolt/commit/90c155d))
* updating travis config to try to use newer version of NPM ([9ba5c1c](https://github.com/bolt-design-system/bolt/commit/9ba5c1c))
