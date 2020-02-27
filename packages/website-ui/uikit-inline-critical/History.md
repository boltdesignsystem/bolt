
v5.2.1 / 2019-06-13
===================

  * Test node 12
  * Bump dependencies

v5.2.0 / 2019-03-26
===================

  * Allow to configure noscript position

v5.1.3 / 2019-01-16
===================

  * fix: removed endless loop in getPartials

v5.1.2 / 2019-01-08
===================

  * fix: remove stylesheets on empty replace array

v5.1.1 / 2019-01-02
===================

  * fix: prevent newline in case of 0 noscripts

v5.1.0 / 2019-01-02
===================

  * feature: move noscript links to end of document #139

v5.0.1 / 2019-01-01
===================

  * Tweaked package.json

v5.0.0 / 2018-12-30
===================

  * Switched to jsdom (#240)
  * Bump dependencies
  * fix: prevent multiple loadcss includes
  * feature: compare/check already inlined styles
  * feature: drop cave in favour of postcss-discard
  * Move tests to Jest
  * Change indentation to 2 spaces
  * drop node 6 support

v4.0.7 / 2018-11-29
===================

  * Add temporary fix for breaking svgs
  * Bump dependencies

v4.0.6 / 2018-11-28
===================

  * Add another SVG Test

v4.0.5 / 2018-09-15
===================

  * fix: consider ignore passed as string
  * Bump dependencies

v4.0.4 / 2018-06-13
==================

  * Bump dependencies

v4.0.3 / 2018-04-18
==================

  * Test existance of extracted stylesheets
  * Support minifying extracted css (#237)

v4.0.2 / 2018-03-21
===================

  * Remove type attribute (#236)

v4.0.1 / 2018-03-18
==================

  * Fixes inlining if no scripts & stylesheets are present in head

v4.0.0 / 2018-03-05
===================

  * drop node 4 support
  * Bump deps
  * Fixes minor typos in README.md (#233)

v3.1.0 / 2017-12-15
===================

  * Fix outdated yarn.lock
  * Bump dependencies
  * CI: stop testing non-LTS node.js versions. (#232)
  * Set the `onload` handler to `null`. (#231)

v3.0.0 / 2017-11-29
===================

  * Upgrade loadCSS dep to 2.0.1 and update code and make it work with this version (#229)

v2.4.2 / 2017-07-03
==================

  * Bump dependencies

v2.4.1 / 2017-05-19
===================

  * Bump dependencies

v2.4.0 / 2017-02-26
===================

  * Bump dependencies

v2.3.0 / 2017-02-10
===================

  * Added some badges
  * Update travis
  * bump dependencies

2.2.0 / 2016-09-03
==================

  * add appveyor
  * Minimum node.js version is 4.0 now due to upstream changes.
  * Bump dependencies

v2.1.5 / 2016-04-18
===================

* fixed indent when using extract

v2.1.4 / 2016-04-18
===================

* minor regex fix

v2.1.3 / 2016-04-18
===================

* style tweaks
* trim empty lines in non-minified css

v2.1.2 / 2016-04-18
===================

* republished with stable node version cause of missing files

v2.1.1 / 2016-04-18
===================

* correct process.exit on cli
* handle buffer
* added minify default
* minor fixes

v2.1.0 / 2016-04-17
===================

* bump dependencies
* minify defaults to true
* gitignore tweaks
* keep format & source order

2.0.0 / 2016-04-14
==================

  * Update to loadcss v1.2.0 + cssrelpreload
  * Bump dependencies

1.0.0 / 2015-11-13
==================

  * switched from jshint to xo
  * Bump deps
  * Use loadCSS from node_modules
  * Bump loadCSS

0.3.1 / 2015-07-10
==================

  * loadCSS Tweaks

0.3.0 / 2015-06-25
==================

  * Added CLI tests & bumped loadcss version
  * Added CLI

0.2.2 / 2015-06-10
==================

  * Fix #9

0.2.1 / 2015-06-09
==================

  * fixed tests
  * Update README.md

0.2.0 / 2015-06-09
==================

  * Ignore noscript-wrapped link tags
  * Added ignore option

0.1.4 / 2015-04-30
==================

  * Added test for #8 (skipped)
  * Don't encode entities
  * Removed failing quickfix related to #8
  * Better testcase for #8

0.1.3 / 2015-04-28
==================

  * Added fix for #8
  * bump deps

0.1.2 / 2015-03-30
==================

  * bump deps

0.1.1 / 2015-03-30
==================

  * bump deps

0.1.0 / 2015-02-23
==================

  * minor tweaks
  * fixed #6

0.0.10 / 2015-02-27
==================

  * fixes #7
  * travis tweaks

0.0.9 / 2014-12-08
==================

  * some cleanup
  * Use original loadCSS
  * moved loadcss in the head
  * Updated package.json
