# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.14.0](https://github.com/bolt-design-system/bolt/compare/v2.13.3...v2.14.0) (2020-01-06)


### Bug Fixes

* update testing-helpers package path ([9b431b6](https://github.com/bolt-design-system/bolt/commit/9b431b6))
* update tsconfig path ([af61794](https://github.com/bolt-design-system/bolt/commit/af61794))





# [2.13.0](https://github.com/bolt-design-system/bolt/compare/v2.12.1...v2.13.0) (2019-12-13)


### Bug Fixes

* **editor:** remove false error on editor navigation away from saved content ([790f0f4](https://github.com/bolt-design-system/bolt/commit/790f0f4))
* **editor:** restore pathways editable traits; fix opacity: 0 ([6a1fa98](https://github.com/bolt-design-system/bolt/commit/6a1fa98))


### Features

* **editor:** notice on unload with unsaved changes ([9a163cb](https://github.com/bolt-design-system/bolt/commit/9a163cb))





# [2.12.0](https://github.com/bolt-design-system/bolt/compare/v2.11.4...v2.12.0) (2019-11-26)


### Bug Fixes

* Make the text of buttons added in the editor editable ([d702a5f](https://github.com/bolt-design-system/bolt/commit/d702a5f))
* Remove text and url props from bolt-text component in editor ([f2d55ac](https://github.com/bolt-design-system/bolt/commit/f2d55ac))





## [2.11.4](https://github.com/bolt-design-system/bolt/compare/v2.11.3...v2.11.4) (2019-11-18)


### Bug Fixes

* Pass correct value for html to editor ([7d4b12b](https://github.com/bolt-design-system/bolt/commit/7d4b12b))
* Reset button state on failed save ([bab00bd](https://github.com/bolt-design-system/bolt/commit/bab00bd))
* Update editor state on successful save ([04160e8](https://github.com/bolt-design-system/bolt/commit/04160e8))





## [2.11.3](https://github.com/bolt-design-system/bolt/compare/v2.11.2...v2.11.3) (2019-11-15)


### Bug Fixes

* define handleEditorSave at runtime ([6fd981b](https://github.com/bolt-design-system/bolt/commit/6fd981b))
* update ts ignore comment to fix linting issue ([2e4c142](https://github.com/bolt-design-system/bolt/commit/2e4c142))





## [2.11.2](https://github.com/bolt-design-system/bolt/compare/v2.11.1...v2.11.2) (2019-11-14)

**Note:** Version bump only for package @bolt/components-editor





## [2.11.1](https://github.com/bolt-design-system/bolt/compare/v2.11.0...v2.11.1) (2019-11-14)


### Bug Fixes

* remove unused + undeclared dependency from editor package ([ce5e254](https://github.com/bolt-design-system/bolt/commit/ce5e254))





# [2.11.0](https://github.com/bolt-design-system/bolt/compare/v2.10.0...v2.11.0) (2019-11-14)


### Bug Fixes

* update alert and some linting ([e5a84ac](https://github.com/bolt-design-system/bolt/commit/e5a84ac))


### Features

* **micro-journeys:** starter templates for one and two character ([10bea16](https://github.com/bolt-design-system/bolt/commit/10bea16))





## [2.9.2](https://github.com/bolt-design-system/bolt/compare/v2.9.1...v2.9.2) (2019-10-23)

**Note:** Version bump only for package @bolt/components-editor





# [2.9.0](https://github.com/bolt-design-system/bolt/compare/v2.8.3...v2.9.0) (2019-10-22)

**Note:** Version bump only for package @bolt/components-editor





## [2.8.3](https://github.com/bolt-design-system/bolt/compare/v2.8.2...v2.8.3) (2019-10-18)


### Bug Fixes

* adjust escape strategy to work in Bolt and in Drupal ([33d56b1](https://github.com/bolt-design-system/bolt/commit/33d56b1))
* update editor.twig to help better support Drupal autoescape behavior ([623e38e](https://github.com/bolt-design-system/bolt/commit/623e38e))





## [2.8.1](https://github.com/bolt-design-system/bolt/compare/v2.8.0...v2.8.1) (2019-10-16)

**Note:** Version bump only for package @bolt/components-editor





# [2.8.0](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.6...v2.8.0) (2019-10-11)


### Bug Fixes

* **editor:** make Move Up and Move Down buttons for Steps and Pathways ([da0e8f7](https://github.com/bolt-design-system/bolt/commit/da0e8f7))
* **editor:** syntax error fix -- thank you tests ([408d7b6](https://github.com/bolt-design-system/bolt/commit/408d7b6))
* **editor:** use package name for import ([433b01b](https://github.com/bolt-design-system/bolt/commit/433b01b))
* **micro-journeys:** config for update of parents with event on editor removal; add events for step and pathway removal ([43b6419](https://github.com/bolt-design-system/bolt/commit/43b6419))


### Features

* **editor:** hide pathways image options ([2536517](https://github.com/bolt-design-system/bolt/commit/2536517))
* **micro-journeys:** add icon-group to PL; spelling fixes ([46a8782](https://github.com/bolt-design-system/bolt/commit/46a8782))





# [2.8.0-beta.6](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.5...v2.8.0-beta.6) (2019-10-04)


### Bug Fixes

* **editor:** prevent bug with inserting array of starter elements ([2bf865b](https://github.com/bolt-design-system/bolt/commit/2bf865b))
* **editor:** remove empty <bolt-animate>s on save ([85212df](https://github.com/bolt-design-system/bolt/commit/85212df))
* lint and docs ([df83534](https://github.com/bolt-design-system/bolt/commit/df83534))
* update all micro journey cta to use bolt link over text ([228f659](https://github.com/bolt-design-system/bolt/commit/228f659))


### Features

* add onClick and onClick target to button and link through editor ([fff8cf8](https://github.com/bolt-design-system/bolt/commit/fff8cf8))
* add theme support to interactive-pathways via withContext and defineContext ([eb32484](https://github.com/bolt-design-system/bolt/commit/eb32484))
* expose props to edit the image atop the interactive pathways co… ([#1411](https://github.com/bolt-design-system/bolt/issues/1411)) ([9fe1993](https://github.com/bolt-design-system/bolt/commit/9fe1993))
* remove the connection band options from the character background slot ([#1427](https://github.com/bolt-design-system/bolt/issues/1427)) ([f2a8757](https://github.com/bolt-design-system/bolt/commit/f2a8757))
* **editor:** add url and disabled to button in editor ([0eb9374](https://github.com/bolt-design-system/bolt/commit/0eb9374))





# [2.8.0-beta.4](https://github.com/bolt-design-system/bolt/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2019-09-26)

**Note:** Version bump only for package @bolt/components-editor





# [2.8.0-beta.3](https://github.com/bolt-design-system/bolt/compare/v2.7.1...v2.8.0-beta.3) (2019-09-24)



# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **editor:** add main template file ([0f1afcc](https://github.com/bolt-design-system/bolt/commit/0f1afcc))
* **editor:** adding bolt-animate as new slot ([0aac5fe](https://github.com/bolt-design-system/bolt/commit/0aac5fe))
* **editor:** components extend text by default to allow text editability ([2c50a49](https://github.com/bolt-design-system/bolt/commit/2c50a49))
* **editor:** downgrade grapesjs to restore text editing ([6cc0f54](https://github.com/bolt-design-system/bolt/commit/6cc0f54))
* **editor:** ensure unsaved editor does not reload on prod ([f970484](https://github.com/bolt-design-system/bolt/commit/f970484))
* **editor:** exclude animate show meta attribute ([43407c7](https://github.com/bolt-design-system/bolt/commit/43407c7))
* **editor:** load grapesjs version specific CSS ([5401d40](https://github.com/bolt-design-system/bolt/commit/5401d40))
* **editor:** place trait titles above form element ([24fcaeb](https://github.com/bolt-design-system/bolt/commit/24fcaeb))
* **editor:** remove editor styles on close ([994451c](https://github.com/bolt-design-system/bolt/commit/994451c))
* **editor:** scrollbars in UI ([554dc10](https://github.com/bolt-design-system/bolt/commit/554dc10))
* **editor:** wait for css to load ([cdeca40](https://github.com/bolt-design-system/bolt/commit/cdeca40))
* **editor:** when adding via slotControls, ensure to not select grandchildren slots ([cb3347f](https://github.com/bolt-design-system/bolt/commit/cb3347f))
* **micro-journeys:** correct schema import ([8768622](https://github.com/bolt-design-system/bolt/commit/8768622))
* changing query import so IDEs recognize it ([7513d4b](https://github.com/bolt-design-system/bolt/commit/7513d4b))
* lint fixes ([4abc460](https://github.com/bolt-design-system/bolt/commit/4abc460))
* **micro-journeys:** increase robustness of parent-child components ([84bd753](https://github.com/bolt-design-system/bolt/commit/84bd753))
* **micro-journeys:** show pathways title in non-shadow dom ([7f92bb7](https://github.com/bolt-design-system/bolt/commit/7f92bb7))
* temp disable editor type check ([de67747](https://github.com/bolt-design-system/bolt/commit/de67747))
* text styles for lead text ([b4f79e3](https://github.com/bolt-design-system/bolt/commit/b4f79e3))


### Features

* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add bolt animations to animation-wrapper ([f439a9b](https://github.com/bolt-design-system/bolt/commit/f439a9b))
* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/commit/822face))
* add dropzone for empty slots ([d927a21](https://github.com/bolt-design-system/bolt/commit/d927a21))
* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* add editor ([c3d6d60](https://github.com/bolt-design-system/bolt/commit/c3d6d60))
* **editor:** add layer panel ([451bebc](https://github.com/bolt-design-system/bolt/commit/451bebc))
* **editor:** emit save event ([c8821e5](https://github.com/bolt-design-system/bolt/commit/c8821e5))
* **editor:** ensure only Chrome can open ([ded0dfc](https://github.com/bolt-design-system/bolt/commit/ded0dfc))
* **editor:** highlight droppable slots on block drag ([dc1b411](https://github.com/bolt-design-system/bolt/commit/dc1b411))
* character element now supports either an image or an svg ([7db973f](https://github.com/bolt-design-system/bolt/commit/7db973f))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/commit/8002a26))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add status-bar/dialogue and register with editor ([9e26894](https://github.com/bolt-design-system/bolt/commit/9e26894))
* add three icon group for quick editor slot drop-in ([#1410](https://github.com/bolt-design-system/bolt/issues/1410)) ([0257faf](https://github.com/bolt-design-system/bolt/commit/0257faf))
* create character component, clean BEM on connection ([48a91dc](https://github.com/bolt-design-system/bolt/commit/48a91dc))
* create user config, declare css/js in it ([d0545c0](https://github.com/bolt-design-system/bolt/commit/d0545c0))
* properly register svg-animations to the editor ([b1e242a](https://github.com/bolt-design-system/bolt/commit/b1e242a))
* registar bolt connection with grapes ([528104e](https://github.com/bolt-design-system/bolt/commit/528104e))
* registar bolt-cta with the editor ([90d521b](https://github.com/bolt-design-system/bolt/commit/90d521b))
* registar bolt-links to the editor ([9d58163](https://github.com/bolt-design-system/bolt/commit/9d58163))
* registar link and cta component with grapes ([98596fc](https://github.com/bolt-design-system/bolt/commit/98596fc))
* register animation components in editor ([49ebf6a](https://github.com/bolt-design-system/bolt/commit/49ebf6a))
* setup editor blocks for initial micro journeys ([287463a](https://github.com/bolt-design-system/bolt/commit/287463a))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* **editor:** move buttons on top ([77fc2a4](https://github.com/bolt-design-system/bolt/commit/77fc2a4))
* **editor:** much improved slot dropzones ([7d3bcc0](https://github.com/bolt-design-system/bolt/commit/7d3bcc0))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))





# [2.8.0-beta.2](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.2) (2019-09-18)


### Bug Fixes

* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **editor:** add main template file ([0f1afcc](https://github.com/bolt-design-system/bolt/commit/0f1afcc))
* **editor:** adding bolt-animate as new slot ([0aac5fe](https://github.com/bolt-design-system/bolt/commit/0aac5fe))
* **editor:** components extend text by default to allow text editability ([2c50a49](https://github.com/bolt-design-system/bolt/commit/2c50a49))
* **editor:** downgrade grapesjs to restore text editing ([6cc0f54](https://github.com/bolt-design-system/bolt/commit/6cc0f54))
* **editor:** ensure unsaved editor does not reload on prod ([f970484](https://github.com/bolt-design-system/bolt/commit/f970484))
* **editor:** exclude animate show meta attribute ([43407c7](https://github.com/bolt-design-system/bolt/commit/43407c7))
* **editor:** load grapesjs version specific CSS ([5401d40](https://github.com/bolt-design-system/bolt/commit/5401d40))
* **editor:** place trait titles above form element ([24fcaeb](https://github.com/bolt-design-system/bolt/commit/24fcaeb))
* **editor:** remove editor styles on close ([994451c](https://github.com/bolt-design-system/bolt/commit/994451c))
* **editor:** scrollbars in UI ([554dc10](https://github.com/bolt-design-system/bolt/commit/554dc10))
* **editor:** wait for css to load ([cdeca40](https://github.com/bolt-design-system/bolt/commit/cdeca40))
* **editor:** when adding via slotControls, ensure to not select grandchildren slots ([cb3347f](https://github.com/bolt-design-system/bolt/commit/cb3347f))
* **micro-journeys:** correct schema import ([8768622](https://github.com/bolt-design-system/bolt/commit/8768622))
* changing query import so IDEs recognize it ([7513d4b](https://github.com/bolt-design-system/bolt/commit/7513d4b))
* lint fixes ([4abc460](https://github.com/bolt-design-system/bolt/commit/4abc460))
* **micro-journeys:** increase robustness of parent-child components ([84bd753](https://github.com/bolt-design-system/bolt/commit/84bd753))
* **micro-journeys:** show pathways title in non-shadow dom ([7f92bb7](https://github.com/bolt-design-system/bolt/commit/7f92bb7))
* temp disable editor type check ([de67747](https://github.com/bolt-design-system/bolt/commit/de67747))
* text styles for lead text ([b4f79e3](https://github.com/bolt-design-system/bolt/commit/b4f79e3))


### Features

* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add bolt animations to animation-wrapper ([f439a9b](https://github.com/bolt-design-system/bolt/commit/f439a9b))
* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/commit/822face))
* add dropzone for empty slots ([d927a21](https://github.com/bolt-design-system/bolt/commit/d927a21))
* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* add editor ([c3d6d60](https://github.com/bolt-design-system/bolt/commit/c3d6d60))
* **editor:** add layer panel ([451bebc](https://github.com/bolt-design-system/bolt/commit/451bebc))
* **editor:** emit save event ([c8821e5](https://github.com/bolt-design-system/bolt/commit/c8821e5))
* **editor:** ensure only Chrome can open ([ded0dfc](https://github.com/bolt-design-system/bolt/commit/ded0dfc))
* **editor:** highlight droppable slots on block drag ([dc1b411](https://github.com/bolt-design-system/bolt/commit/dc1b411))
* character element now supports either an image or an svg ([7db973f](https://github.com/bolt-design-system/bolt/commit/7db973f))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/commit/8002a26))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add status-bar/dialogue and register with editor ([9e26894](https://github.com/bolt-design-system/bolt/commit/9e26894))
* add three icon group for quick editor slot drop-in ([#1410](https://github.com/bolt-design-system/bolt/issues/1410)) ([0257faf](https://github.com/bolt-design-system/bolt/commit/0257faf))
* create character component, clean BEM on connection ([48a91dc](https://github.com/bolt-design-system/bolt/commit/48a91dc))
* create user config, declare css/js in it ([d0545c0](https://github.com/bolt-design-system/bolt/commit/d0545c0))
* properly register svg-animations to the editor ([b1e242a](https://github.com/bolt-design-system/bolt/commit/b1e242a))
* registar bolt connection with grapes ([528104e](https://github.com/bolt-design-system/bolt/commit/528104e))
* registar bolt-cta with the editor ([90d521b](https://github.com/bolt-design-system/bolt/commit/90d521b))
* registar bolt-links to the editor ([9d58163](https://github.com/bolt-design-system/bolt/commit/9d58163))
* registar link and cta component with grapes ([98596fc](https://github.com/bolt-design-system/bolt/commit/98596fc))
* register animation components in editor ([49ebf6a](https://github.com/bolt-design-system/bolt/commit/49ebf6a))
* setup editor blocks for initial micro journeys ([287463a](https://github.com/bolt-design-system/bolt/commit/287463a))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
* **editor:** move buttons on top ([77fc2a4](https://github.com/bolt-design-system/bolt/commit/77fc2a4))
* **editor:** much improved slot dropzones ([7d3bcc0](https://github.com/bolt-design-system/bolt/commit/7d3bcc0))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))





# [2.8.0-beta.1](https://github.com/bolt-design-system/bolt/compare/v2.7.0...v2.8.0-beta.1) (2019-09-14)


### Bug Fixes

* **character:** IE11 background slot ([c261314](https://github.com/bolt-design-system/bolt/commit/c261314))
* **editor:** add main template file ([0f1afcc](https://github.com/bolt-design-system/bolt/commit/0f1afcc))
* **editor:** adding bolt-animate as new slot ([0aac5fe](https://github.com/bolt-design-system/bolt/commit/0aac5fe))
* **editor:** components extend text by default to allow text editability ([2c50a49](https://github.com/bolt-design-system/bolt/commit/2c50a49))
* **editor:** downgrade grapesjs to restore text editing ([6cc0f54](https://github.com/bolt-design-system/bolt/commit/6cc0f54))
* **editor:** ensure unsaved editor does not reload on prod ([f970484](https://github.com/bolt-design-system/bolt/commit/f970484))
* **editor:** exclude animate show meta attribute ([43407c7](https://github.com/bolt-design-system/bolt/commit/43407c7))
* **editor:** place trait titles above form element ([24fcaeb](https://github.com/bolt-design-system/bolt/commit/24fcaeb))
* changing query import so IDEs recognize it ([7513d4b](https://github.com/bolt-design-system/bolt/commit/7513d4b))
* **editor:** remove editor styles on close ([994451c](https://github.com/bolt-design-system/bolt/commit/994451c))
* lint fixes ([4abc460](https://github.com/bolt-design-system/bolt/commit/4abc460))
* temp disable editor type check ([de67747](https://github.com/bolt-design-system/bolt/commit/de67747))
* text styles for lead text ([b4f79e3](https://github.com/bolt-design-system/bolt/commit/b4f79e3))
* **editor:** scrollbars in UI ([554dc10](https://github.com/bolt-design-system/bolt/commit/554dc10))
* **editor:** wait for css to load ([cdeca40](https://github.com/bolt-design-system/bolt/commit/cdeca40))
* **editor:** when adding via slotControls, ensure to not select grandchildren slots ([cb3347f](https://github.com/bolt-design-system/bolt/commit/cb3347f))
* **micro-journeys:** correct schema import ([8768622](https://github.com/bolt-design-system/bolt/commit/8768622))
* **micro-journeys:** increase robustness of parent-child components ([84bd753](https://github.com/bolt-design-system/bolt/commit/84bd753))
* **micro-journeys:** show pathways title in non-shadow dom ([7f92bb7](https://github.com/bolt-design-system/bolt/commit/7f92bb7))


### Features

* a few more lorem starters ([664393c](https://github.com/bolt-design-system/bolt/commit/664393c))
* add bolt animations to animation-wrapper ([f439a9b](https://github.com/bolt-design-system/bolt/commit/f439a9b))
* add build in/out order to steps ([#1308](https://github.com/bolt-design-system/bolt/issues/1308)) ([822face](https://github.com/bolt-design-system/bolt/commit/822face))
* add dropzone for empty slots ([d927a21](https://github.com/bolt-design-system/bolt/commit/d927a21))
* **editor:** much improved slot dropzones ([7d3bcc0](https://github.com/bolt-design-system/bolt/commit/7d3bcc0))
* add editor ([c3d6d60](https://github.com/bolt-design-system/bolt/commit/c3d6d60))
* add new property to micro journey character ([3329128](https://github.com/bolt-design-system/bolt/commit/3329128))
* add status-bar/dialogue and register with editor ([9e26894](https://github.com/bolt-design-system/bolt/commit/9e26894))
* **editor:** move buttons on top ([77fc2a4](https://github.com/bolt-design-system/bolt/commit/77fc2a4))
* add three icon group for quick editor slot drop-in ([#1410](https://github.com/bolt-design-system/bolt/issues/1410)) ([0257faf](https://github.com/bolt-design-system/bolt/commit/0257faf))
* **editor:** add layer panel ([451bebc](https://github.com/bolt-design-system/bolt/commit/451bebc))
* **editor:** easier add components to slots ([9220e32](https://github.com/bolt-design-system/bolt/commit/9220e32))
* **editor:** ensure only Chrome can open ([ded0dfc](https://github.com/bolt-design-system/bolt/commit/ded0dfc))
* **editor:** highlight droppable slots on block drag ([dc1b411](https://github.com/bolt-design-system/bolt/commit/dc1b411))
* **editor:** improve slot controls ([8002a26](https://github.com/bolt-design-system/bolt/commit/8002a26))
* **micro-journeys:** add starter templates to step ([bd06ead](https://github.com/bolt-design-system/bolt/commit/bd06ead))
* character element now supports either an image or an svg ([7db973f](https://github.com/bolt-design-system/bolt/commit/7db973f))
* create character component, clean BEM on connection ([48a91dc](https://github.com/bolt-design-system/bolt/commit/48a91dc))
* create user config, declare css/js in it ([d0545c0](https://github.com/bolt-design-system/bolt/commit/d0545c0))
* properly register svg-animations to the editor ([b1e242a](https://github.com/bolt-design-system/bolt/commit/b1e242a))
* registar bolt connection with grapes ([528104e](https://github.com/bolt-design-system/bolt/commit/528104e))
* registar bolt-cta with the editor ([90d521b](https://github.com/bolt-design-system/bolt/commit/90d521b))
* registar bolt-links to the editor ([9d58163](https://github.com/bolt-design-system/bolt/commit/9d58163))
* registar link and cta component with grapes ([98596fc](https://github.com/bolt-design-system/bolt/commit/98596fc))
* register animation components in editor ([49ebf6a](https://github.com/bolt-design-system/bolt/commit/49ebf6a))
* setup editor blocks for initial micro journeys ([287463a](https://github.com/bolt-design-system/bolt/commit/287463a))
* update connection component to use animated svg ([e6fff6e](https://github.com/bolt-design-system/bolt/commit/e6fff6e))
* update starter templates to have bolt-animate for all slots ([2b5ce96](https://github.com/bolt-design-system/bolt/commit/2b5ce96))
