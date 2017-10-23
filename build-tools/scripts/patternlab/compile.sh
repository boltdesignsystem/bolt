#! /usr/bin/env bash

DIR="$( dirname $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ))"

# Compile Pattern Lab.
cd $DIR/vendor/phase2/pattern-lab-starter
npm install
npm run setup
npm run compile

# Copy the bits we need into the Grav theme.
rm -rf $DIR/app/user/themes/gravpl/fonts
rm -rf $DIR/app/user/themes/gravpl/dest
rm -rf $DIR/app/user/themes/gravpl/templates/_patterns
ln -s $DIR/vendor/phase2/pattern-lab-starter/fonts $DIR/app/user/themes/gravpl/fonts
ln -s $DIR/vendor/phase2/pattern-lab-starter/dest $DIR/app/user/themes/gravpl/dest
ln -s $DIR/vendor/phase2/pattern-lab-starter/source/_patterns $DIR/app/user/themes/gravpl/templates/_patterns
