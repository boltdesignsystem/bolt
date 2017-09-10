#!/usr/bin/env bash
set -x -e

# Example usage
# ./toolbelt/manual-release.sh @blaze-elements/ptoggle 1.1.1

LERNA=./node_modules/.bin/lerna
$LERNA --version # will fail the script if lerna is the wrong version
$LERNA exec -- echo 'testing to make sure lerna is installed correctly'

PKG=$1
VERSION_TYPE=$2
PACKAGE_WITHOUT_SCOPE=${PKG#*/}
RELATIVE_PKG=packages/${PACKAGE_WITHOUT_SCOPE}

[ -z $PKG ] && echo "need to set package" && exit 1
[ -z $NPM_TOKEN ] && echo "need to set NPM_TOKEN" && exit 1
[ -z $VERSION_TYPE ] && echo "need to set VERSION_TYPE" && exit 1

git fetch
git pull

yarn build

pushd $RELATIVE_PKG
npm version $VERSION_TYPE --no-git-tag-version
VERSION=$(node -e "console.log(require('./package.json').version)")
popd

FULL_PACKAGE_NAME="$PKG@$VERSION"

git commit -am"chore(release): manual bump for release of $FULL_PACKAGE_NAME"
git tag $FULL_PACKAGE_NAME

$LERNA exec -- ln -sf ../../.git .git
npm publish packages/${PACKAGE_WITHOUT_SCOPE}
$LERNA exec -- unlink .git

git push --no-verify
git push --tags --no-verify
