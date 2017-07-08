#!/bin/bash
set -e

DIR="$( cd "$( dirname $0 )" && pwd )"

. "$DIR/_build-test-parameter.sh"

( cd "packages/$PACKAGE" && ../../node_modules/node-sass/bin/node-sass --importer ../../node_modules/node-sass-magic-importer/dist/cli.js "test/test.scss" | ../../node_modules/postcss-cli/bin/postcss -o "test/tmp/test.css" )
