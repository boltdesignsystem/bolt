# Drupal Lab

A sample Drupal 8 site with a Pattern Lab Twig powered theme.

**All commands starting with `bash` are run from root of repo; all that start with `drupal` are ran from `web/`**

## Setup

### Prerequisites

- `composer` installed
- node js installed - supported node versions: 0.12.x, 4.x, 5.x, and 6.x using npm 2.x or 3.x.

### Site Install

		bash scripts/site-setup.sh

When it asks if you want to merge or replace stuff, select merge.

## Usage

### Run Drupal & Pattern Lab Servers

In two Terminal tabs, run:

1. Run `composer run server --timeout=0`
1. **NOT SETUP YET**: Run `npm start` in `web/themes/dashing/`

### Drupal Credentials

- Username: `admin`
- Password: `admin`

### Rebuild

		bash scripts/site-reinstall.sh

### Cache Rebuilds

		composer run cc

### Theme & Pattern Lab

All commands are run from root of theme in `web/themes/dashing/`. An `npm install` was ran in `site-setup.sh` script, run `npm install` if you don't see `node_modules/` or have errors.

To compile theme (CSS & Pattern Lab):

		npm run compile

To execute watches on Scss and Pattern Lab along with a server for Pattern Lab, run:

		npm start

## Configuration

After making changes, run `../vendor/bin/drupal config:export -y` and commit the files. If you just pulled or are deploying, run `../vendor/bin/drupal config:import -y` to pull configuration changes present in the yaml files in `web/sites/default/config/sync/` into the database. Very similar to Features in Drupal 7.

## Install Drupal Modules

To install a new Drupal module, run this:

    composer require drupal/MODULE_NAME:8.*

After enabling, do a `../vendor/bin/drupal config:export -y`.
