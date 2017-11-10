#!/usr/bin/env bash
DIR="$( dirname $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd ))"

cd $DIR/app
php -S localhost:8000 system/router.php
