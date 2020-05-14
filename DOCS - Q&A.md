# Q&A

## What packages are in the monorepo?

To list out all registered packages in the monorepo being tracked by Lerna (excluding any private packages) run:
```
npx lerna list --json
```

## Do we manually update CHANGELOG.md files...?
No. CHANGELOG.md files are all auto-generated / updated via Lerna + the combination of changelog NPM packages being used.


## What's currently being tested?
- Monorepo-level tests
- Docs site smoke tests
- Package-specific tests
  - Build tools
  - Analytics (auto-link)
  - Component-specific tests
  - Yeoman component generator

<hr>

# How Do I...

## How Do I Install everything (aka NPM + PHP dependencies)?
```
yarn setup
```

## How do I run all Jest tests locally?
```
yarn test:js
```

## How do I run just one (or just a few) Jest tests?
```
npx jest packages/components/bolt-button/__tests__/button.js
```

```
npx jest packages/components/bolt-button/__tests__/button.js packages/components/bolt-card-replacement/__tests__/card-replacement.js
```


## How do I update a Jest test's snapshots and/or visual regression tests?

**Update all Jest tests**
```
npx jest -u
```

**Update one specific component's Jest test**
```
npx jest packages/components/bolt-button/__tests__/button.js -u
```

**Update several component's Jest tests**
```
npx jest packages/components/bolt-button/__tests__/button.js packages/components/bolt-card-replacement/__tests__/card-replacement.js -u
```

## Help - all of my JS-specific Jest tests are failing!
1. Is there a legit JavaScript error?

2. Is something already running on port 4444? If so, you'll need to kill that process in order to run the Jest testing server correctly.

```bash
➜ lsof -i tcp:4444

node    79057 ghows   23u  IPv6 0x95f93430e6df1e75      0t0  TCP *:hbci (LISTEN)

➜ kill -9 79057
```

## How Do I Run Nightwatch Tests Locally?

All Nightwatch tests can be run locally using the `*.e2e.js` test files in the Bolt repo however there's a few different options available:

1. Do you want to run all of the Nightwatch tests available or just some of them?
2. Do you want to test code that's being served on your machine locally or test code on an external server (ex. now.sh, boltdesignsystem.com, etc)?
3. Which browser(s) do you want to test? Just Chrome (which will run the fastest), another browser (Safari, Firefox, Edge, etc), or all browsers we support?
