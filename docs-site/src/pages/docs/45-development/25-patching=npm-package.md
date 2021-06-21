---
title: Patching NPM Packages
---

## How it works
Use the [patch-package](https://www.npmjs.com/package/patch-package) npm package to apply small changes to npm package
on the Bolt consumer end (e.g. in a Drupal theme) without the need for a Bolt release. 

## When Patching is helpful
IMPORTANT: Packages should only be patched with changes we intend to add to the Bolt code base.  Ideally, this means
there's an open (or better yet, merged) PR on the Bolt side with the exact changes in your patch.  The intention to get
the problem fixed in Bolt (even if the final upstream code is slightly different) is 100% necessary though.  Changes not
intended to be merged upstream create a maintenance nightmare and should be handled in custom, non-Bolt code instead.

Patches can be useful for:
  1. Testing.  Sometimes, a problem can't be fully replicated in Bolt and therefore needs to be pulled into Drupal to
  confirm the proposed fix works.  Patching allows us to prevent a "guess and check" cycle of multiple hotfix releases.
  2. Urgency.  For example:
      - The fix is blocking additional integration work (e.g. someone needs to do more work on modals after we pull in a
      patch to the modal component).  In this case, the patch allows them to keep working (and validate the proposed
      solution) without waiting for a Bolt release.
      - There's an imminent Drupal release and we have only one or two blockers.  In this case, the patch can be tested
      by QA and even deployed to production without needing an 11th hour Bolt release and full regression testing.
  3. Ease of development.  A bug discovered in Drupal might be easiest to fix and test directly in the Drupal codebase.
  This would be most relevant if you were a Drupal developer and already had the Drupal bug reproduced locally.  The
  patch could then be duplicated as a Bolt PR, or at least used to guide the Bolt development team to the problem. 

## When to avoid patches
- By default.  Unless one of the "When to patch" scenarios applies, lean toward not patching.
- Complicated patches.  If a fix involves more than one component, many lines of code, and/or binary files, lean toward
not patching.
- Changes are not intended to be merged upstream.
