---
title: Manually Cutting a Bolt Release
---

> Note: all of these instructions take place after you’ve gotten the changes that need to be part of this release merged onto the `release/2.x` branch

## 1. Preflight Checks

```
git checkout release/2.x
npm run setup
npm run lint
npm run test
npm run build # pre-release build for FE assets published to NPM
```

## 2. Pre-publish Tasks

### Auto-update version of Bolt's PHP dependencies

Update PHP packages with the new version we’ll be going up to. Addresses earlier workflow issues where this could only happen after we finished publishing.

```
node scripts/release/update-php-package-versions.js -v 2.5.5
```

Add updated PHP files to Git

```
git commit -m "chore: version bump PHP-related dependencies to v2.5.5"
```

### Get Tokens for Github + Now.sh

#### Github

Grab a token from https://github.com/settings/tokens/new (only public_repo permissions needed).

<figure>
<img src="/images/docs/release_github-token.png" />
</figure>

Export a fresh copy of your Github token.

```
export GITHUB_TOKEN=abc12347496507419bef5928173d759488aa1234
```

### Now.sh

Grab a now.sh token from https://zeit.co/account/tokens.

<figure>
<img src="/images/docs/release_now-token.png" />
</figure>

Export a fresh copy of your now.sh token.

```
export NOW_TOKEN=abcdT6Dfu6T0ZgFN33x2ntAB
```

### Login to Now via CLI

```
npm i -g now # install `now` globally if you haven't already
now login
```

### Alias the new URL we’ll be publishing to in order to minimize the total # of build steps

```
now alias boltdesignsystem.com v2-5-5.boltdesignsystem.com
```

## 3. Publish

```
npm login # login to `npm` if you haven't already
npx lerna publish -m "[skip travis] chore(release): publish %s" 2.5.5
# review + confirm package changes
y # confirm + press enter
```

## 4. Build + Deploy

### Expire the .incache cache by updating the expiresOn date to be in the past

```
npx json -I -f docs-site/.incache -e 'this["bolt-tags"].expiresOn = "2019-06-14T12:30:26.377Z"'
npx json -I -f docs-site/.incache -e 'this["bolt-urls-to-test"].expiresOn = "2019-06-14T12:30:26.377Z"'
```

### Regenerate the docs site using the updated .incache data file + updated package data

```
npm run build
```

### Deploy to now.sh

```
npm run deploy
```

### Alias now.sh Deployment to Custom Domains

```
now alias https://boltdesignsystem-123ab99sz.now.sh boltdesignsystem.com
now alias https://boltdesignsystem-123ab99sz.now.sh www.boltdesignsystem.com
now alias https://boltdesignsystem-123ab99sz.now.sh bolt-design-system.com
now alias https://boltdesignsystem-123ab99sz.now.sh www.bolt-design-system.com
now alias https://boltdesignsystem-123ab99sz.now.sh release-2-x.boltdesignsystem.com
now alias https://boltdesignsystem-123ab99sz.now.sh v2-5-5.boltdesignsystem.com
```

<!-- npm run dependencies:update -->

## 5. Post-deploy updates

```
git add . # add updated .incache to Git
git commit -m "chore(release): publish v2.5.5"
```

### Update git tag

```
git tag -fa v2.5.5 -m v2.5.5
git push --no-verify
git push origin v2.5.5 --no-verify --force ## needed since we updated the tag
```

### Pull updates into master

```
git checkout master
git pull
git merge release/2.x
git commit
git push
```

### Announce The Release

- [ ] Update the Github release notes and add to the `releases` section (make sure to add these to the correct Git tag!)
- [ ] Confirm the live boltdesignsystem.com site is up to date
- [ ] Announce the release on our Slack's `design-system` channel

### Post-release

Make sure tag release on Travis builds and deploys successfully since this is how external PHP git repos get updated: https://travis-ci.com/bolt-design-system/bolt.
