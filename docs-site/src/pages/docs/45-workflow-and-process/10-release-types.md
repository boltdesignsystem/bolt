---
title: Release Types
---

For the most part<sup>**</sup>, Bolt follows the industry standards for semantic versioning (read more about it [here](https://docs.npmjs.com/about-semantic-versioning) or watch short YouTube video from NPM below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/kK4Meix58R4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<sup>**</sup> The main difference is for us, hotfixes (or patch releases) typically happen after a recent Bolt release and _*externally*_ reported bugs are identified as requiring a new Bolt release that can't wait till the next minor release of Bolt. Higher priority bugs might get fixed via a patch release while others might wait till the next minor release. 


## I. Hotfix/Patch Release (e.g. v2.1.1)
A hotfix release contains only bug fixes (no new features).  Because of the stringent limits on code changes, regressions between point releases should be minimal.

**Release Steps**
1. A hotfix branch is created based off of the last previous release branch (ex. `release/2.x`) and is merged directly back into the release branch. (ex. `hotfix/navbar-indicator-color-ie11` → `release/2.x`). If applicable, the hotfix changes should also get merged down to the master branch as well. 
Brief release notes (typically one line describing the bug) are published (for example, see [Bolt v2.2.1's release notes](https://github.com/bolt-design-system/bolt/releases/tag/v2.2.1)))
1. Full regression testing in Bolt is optional for a hotfix and done at the discretion of the Bolt team.

## II. Minor Release (e.g. v2.1.0)
Minor releases are how the bulk of the work produced gets shipped – lower priority bug fixes, new features, new components, non-breaking API changes, etc.

Unlike a major release, all minor releases should strive to maintain full backwards compatibility with the previous Bolt releases in that range (ex. 2.1.0 would maintain support for any 2.x release, 3.4.0 for any 3.x release, etc).  This means that no required parts of the Bolt API should cease to function between minor releases.

Importantly, that's not to say that new parameters, methods, or even entire components can't be added in minor releases.  Additionally, existing parameters can be deprecated (i.e. discouraged for future use and flagged for removal in the next major release), but all existing parameters must still continue to function as originally promised (ex. through the use of internal API adapters)  until the next version of Bolt is released.

**Release Steps**
1. The integration branch (master) is merged into the latest release branch (e.g. release/2.x). 
1. A minor release is published on Bolt
  * *The release is frozen to new features and will accept bug fixes only*.  Any new features should be deferred to a later release. 
  * Release notes are made available in draft form.
1. Regression testing is performed by the QA team in Pattern Lab using the Bolt Version Selector.  Any reported bugs are separated into two categories:
  * Regressions - bugs that DO NOT appear in the previous minor release.  These are considered release blocking and should be addressed before proceeding with the full release.
  * Production bugs - bugs that DO appear in the previous minor release.  These are not considered release blocking and should be triaged based on severity.
1. When a minor release fails QA in Bolt's Pattern Lab
  * Each bug is addressed on a bugfix branch that is based on and merged directly back into the release branch.
  * Once all bugs have been fixed, a hotfix/point release is made.
1. When a minor release passes QA in Pattern Lab
  * it's integrated into a single Drupal site (typically on pega.com first) and staged on a feature branch.
  * As part of this integration, Drupal developers should remove usage of deprecated features to ease the upgrade to the next major release. 
1. Regression testing is performed by QA in Drupal.  As before, any bugs are designated as either regression and production bugs, with regressions given highest priority.
1. For any additional bugs, a new hotfix/point release is made.
1. When a minor release passes QA in the first Drupal site to integrate it
  * The feature branch is merged into the integration branch in Drupal.
  * Bolt release notes are published.
  * A release announcement email is sent.

## III. Major Release (e.g. v3.0.0)
A major release is defined as any release that removes or changes some form of backwards compatibility with the previous releases (ex. APIs previously deprecated will stop working) and some amount of developer work is typically required. Major releases will often also include significant new features or structural changes, though strictly speaking such major features aren't necessary.

**Release Steps**
Major releases follow the same steps as for a minor release with the following differences:

* A new release branch is created for the release (e.g. release/3.x)
  * Major new features are made on feature branches originating from and merging into this branch
  * The previous release branch are periodically merged into this new branch
  * Support for deprecated features is removed on this branch
* A release candidate (or "RC", e.g. v3.0.0-rc0) may be used to evaluate the release and test integration 
  * Unlike a full release, an RC does not start a feature freeze, although significant changes should be minimized at this point
* When a major release is published, the previous major release (e.g. 2.x when 3.x is being published) goes into maintenance mode (no new features – only hotfixes as needed) and the previous major release before that (e.g. 1.x when 3.x is being published) is considered end-of-life and is no longer supported.
