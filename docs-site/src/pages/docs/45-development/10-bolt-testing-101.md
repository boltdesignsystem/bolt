---
title: Bolt Testing 101
---


## How do I locally run through all of our Bolt tests? (Jest, Linting, etc)

```
npm run test
```


## How do I run Jest tests everything (components, docs site, etc)?

```
npm run test:js
```


## How do I run Jest tests for just a specific component?

```
npm run test:js -- PATH_TO_TEST_FILE.js
```

```
// for example:
npm run test:js -- packages/components/bolt-button/__tests__/button.js
```


## My test failed! What should I do?

Q. Did the test fail because of an intentional change OR because of an unexpected change?

A. **Unexpected Change?**
  - Fix the issue and the test should pass when the issue has been resolved.
B. **Intentional Change?**
  - Double-check to make sure the test that's failing doesn't accidently have an unexpected issue. If it does, try to address that issue first.
  - Once / if you've determined that all remaining changes are expected and intentional (ex. adding a new CSS class or new template option), add any new Jest tests as needed + update any other existing Jest tests to make sure the latest code snapshots reflect the new expected updates


## Updating A Jest Test

Updating a Jest test is exactly the same as running a Jest test for a specific component + adding an extra paramater to tell Jest to update the component's testing snapshots.

```
npm run test:js -- packages/components/bolt-button/__tests__/button.js -u
```


## Forcing All Tests To Re-Run

Jest tries to be pretty smart and only re-test components that have had changes so your tests run very quickly. You can work around this and force all tests to get re-run just in case by running the test command with the `all` flag added:

```
npm run test:js -- packages/components/bolt-button/__tests__/button.js -u
```
