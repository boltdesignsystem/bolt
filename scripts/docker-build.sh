#!/bin/bash
# Start in this directory even if ran elsewhere
cd "$(dirname "$0")"
# Up to root of repo
cd ..
# Show all commands ran
set -x
# Exit this script if anything else exits
set -e

# Error messages are redirected to stderr
function handle_error {
  echo "$(basename $0): ERROR! An error was encountered executing line $1." 1>&2;
  # cleanup
  echo 'Exiting with error.' 1>&2;
  exit 1
}

function handle_exit {
  # cleanup
  echo 'Exiting without error.' 1>&2;
  exit
}

# Exit the script with a helpful error message when any error is encountered
trap 'set +x; handle_error $LINENO $BASH_COMMAND' ERR

# --oom-kill-disable -memory=2000m
time docker build --tag boltdesignsystem/bolt:latest .
