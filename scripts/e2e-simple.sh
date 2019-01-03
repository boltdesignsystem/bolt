#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!
#
# ******************************************************************************
# This is an end-to-end test intended to run on CI.
# You can also run it locally but it's slow.
# ******************************************************************************

# Start in scripts/ even if run from root directory
cd "$(dirname "$0")"

# clean
echo 'cleaning up from before...'
rm -rf verdaccio/
# killall verdaccio

# App temporary location
# http://unix.stackexchange.com/a/84980
temp_app_path=`mktemp -d 2>/dev/null || mktemp -d -t 'temp_app_path'`
custom_registry_url=http://localhost:4000
original_npm_registry_url=`npm get registry`
original_yarn_registry_url=`yarn config get registry`

function cleanup {
  echo 'Cleaning up.'
  cd "$root_path"
  # Uncomment when snapshot testing is enabled by default:
  # rm ./packages/react-scripts/template/src/__snapshots__/App.test.js.snap
  rm -rf "$temp_app_path"
  # Removing all published npm packages
  rm -rf "$root_path/scripts/verdaccio/"
  # git checkout .
  killall verdaccio || true
  npm set registry "$original_npm_registry_url"
  yarn config set registry "$original_yarn_registry_url"
}

# Error messages are redirected to stderr
function handle_error {
  echo "$(basename $0): ERROR! An error was encountered executing line $1." 1>&2;
  cleanup
  echo 'Exiting with error.' 1>&2;
  exit 1
}

function handle_exit {
  cleanup
  echo 'Exiting without error.' 1>&2;
  exit
}

# Check for the existence of one or more files.
function exists {
  for f in $*; do
    test -e "$f"
  done
}

# Exit the script with a helpful error message when any error is encountered
# trap 'set +x; handle_error $LINENO $BASH_COMMAND' ERR

# # Cleanup before exit on any termination signal
# trap 'set +x; handle_exit' SIGQUIT SIGTERM SIGINT SIGKILL SIGHUP

# # Echo every command being executed
# set -x

# Go to root
cd ..
root_path=$PWD

# if hash npm 2>/dev/null
# then
#   npm i -g npm@latest
# fi

# Bootstrap monorepo
# yarn run setup

# Start local registry
tmp_registry_log=`mktemp`
mkdir -p scripts/verdaccio
# nohup npx verdaccio@3.8.2 -c "$root_path"/scripts/verdaccio.yml &>$tmp_registry_log
# Wait for `verdaccio` to boot
# grep -q 'http address' <(tail -f $tmp_registry_log)
# echo 'Verdaccio booted!'

# # Set registry to local registry
# npm set registry http://localhost:4000
# yarn config set registry http://localhost:4000

# npx npm-auth-to-token@1.0.0 -u "bolt" -p "bolt" -e "bolt@boltdesignsystem.com" -r "$custom_registry_url" && npm whoami

# yarn config set registry http://localhost:4000
# yarn config set registry https://registry.npmjs.org/


# # Login so we can publish packages
# npx npm-auth-to-token@1.0.0 -u "bolt" -p "bolt" -e "me+bolt-bolt@salemghoweri.com" -r "$custom_registry_url"


# echo 'Testing local npm auth...'
# npm whoami

# # ******************************************************************************
# # First, test the development environment.
# # This does not affect our users but makes sure we can develop it.
# # ******************************************************************************

# # Test local build command
# # yarn build
# # Check for expected output
# # exists build/*.html
# # exists build/static/js/*.js
# # exists build/static/css/*.css
# # exists build/static/media/*.svg
# # exists build/favicon.ico

# # Run tests with CI flag
# # CI=true yarn test
# # Uncomment when snapshot testing is enabled by default:
# # exists template/src/__snapshots__/App.test.js.snap

# # Test local start command
# # yarn start --smoke-test

# git status
# echo 'about to clean those ^^^'
# # git clean -df


# # # ******************************************************************************
# # # Install react-scripts prerelease via create-react-app prerelease.
# # # ******************************************************************************

# # # Install the app in a temporary location
# # cd $temp_app_path
# # # npx create-bedrock test-app
# # # cd test-app
# # # npm install
# # # echo 'Install successfull. Building...'
# # npm run build
# # # echo 'Build successfull!'
# # # echo 'Deploying...'
# # # npm i -g now@latest --unsafe-perm
# # # echo 'Hiding now deploy command as it contains a secret'
# # # set +C
# # # now --build-env NPM_TOKEN=@npm-token --token=$NOW_TOKEN --team=basalt --name='create-bedrock' --no-clipboard
# # # set -x

# # echo 'Cleaning up...'
# # # Cleanup
# # cleanup

# rm -rf verdaccio/
# killall verdaccio