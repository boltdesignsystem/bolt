#!/bin/bash
set -e

while [[ $# -gt 1 ]]
do
key="$1"
case $key in
    -p|--package)
    PACKAGE="$2"
    shift
    ;;
    *)
    ;;
esac
shift
done
