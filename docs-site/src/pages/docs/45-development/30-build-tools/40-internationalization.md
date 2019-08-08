---
title: Internationalization 
---

## Optimizing Bolt's Build For Different Languages

> NOTE: add note about compiling Bolt for just one specific language at a time vs compiling for multiple languages


### Step 1. Add a `lang` prop to your `.boltrc` config

This should be an array of the two-character language codes you want to compile optimized builds for.

> Note: currently this only includes `en` and `ja` althouh more language-specific builds could be added in the future.

#### Only Compile Japanese-optimized Build
```
lang: ['ja'], // ex. only compile the ja-optimized build
```

#### Compile Japanese and English optimized Builds (Japanese set as the default)
```
lang: ['ja', 'en'], // ja + en in the same build; ja used by default on docs site
```

#### Compile Japanese and English optimized Builds (English set as the default)
```
lang: ['en', 'ja'], // en + ja in the same build; en used by default on docs site
```

#### Only Compile Japanese Optimized Build (Deprecated String Lang Method)
```
lang: 'ja', //  only ja (old to-be-removed single-lang build)
```

> Note: not defining a lang prop will automatically configure the build to internally use the `en` default


### Step 2. Disable the `@bolt/build-tools` cache

This will get updated in the future but for now, you'll likely need to manually disable the build tools cache for a clean initial build

```
// switch `enableCache` in the `.boltrc` to false
enableCache: false,
```

### Step 3. Enably i18n (If Doing Local Development)

If you are running Bolt locally in dev mode, make sure the `i18n` CLI flag is set to true.

This can be done by either by running `npm run start:lang` in the docs site folder for local Bolt development OR `./node_modules/.bin/bolt start --i18n` for everyone else.

