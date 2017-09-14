
#!/bin/bash
set -e

# DIR="$( cd "$( dirname $0 )" && pwd )"

# . "$DIR/scripts/_build-test-parameter.sh"

lerna exec -- npm view $npm_package_name version

# for f in packages/**/*; do
#   if [ -n "$PACKAGE" ] && [ `basename $f` != "$PACKAGE" ]; then
#     continue
#   fi
#
#   if [ -f "$f/package.json" ]; then
#     # mkdir -p "$f/test/tmp"
#     # Build HTML
#     cd "$f" && echo "$f"
#     #npm view $npm_package_name version
#     # Build CSS
#     # bash "$DIR/scripts/build-test-css.sh" --package $(basename $f)
#     # # Test
#     # ( cd "$f" && ../../node_modules/backstopjs/cli/index.js test --configPath=../../backstop.json )
#     # # Cleanup
#     # rm -Rf "$f/test/tmp"
#   fi
# done