#!/usr/bin/env bash
# run from root of repo
cd web/
echo "Dropping DB..."
../vendor/bin/drupal database:drop -y
cd ../
bash scripts/site-setup.sh
