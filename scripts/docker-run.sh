#!/bin/bash
# Start in this directory even if ran elsewhere
cd "$(dirname "$0")"
# Up to root of repo
cd ..

# Show all commands ran
set -x
# Exit this script if anything else exits
set -e

time docker run -p 3123:3123 --tty --rm boltdesignsystem/bolt:latest
